'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block';
import { TECHNIQUES } from '@/lib/constants';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CODE_SNIPPETS: Record<string, { title: string; code: string }> = {
  summarization: {
    title: 'Суммаризация',
    code: `# Сжатие истории в краткое резюме
def summarize_context(messages: list, max_tokens: int = 500) -> list:
    if len(messages) <= 10:
        return messages
    
    # Суммаризируем старые сообщения
    old_messages = messages[:-10]
    summary_prompt = f"Суммаризируй диалог:\\n{old_messages}"
    summary = llm.invoke(summary_prompt)
    
    # Добавляем резюме + последние сообщения
    summary_msg = {"role": "system", "content": f"Контекст: {summary}"}
    return [summary_msg] + messages[-10:]`,
  },
  hierarchical: {
    title: 'Иерархическая память',
    code: `# Двухуровневая система памяти
class HierarchicalMemory:
    def __init__(self):
        self.short_term = []     # Последние сообщения
        self.long_term = ""      # Долгосрочное резюме
    
    def build_context(self, messages: list) -> str:
        self.short_term = messages[-5:]
        
        if len(messages) > 20:
            # Сжимаем старые сообщения в long_term
            old = messages[:-20]
            self.long_term = llm.invoke(
                f"Обнови резюме на основе:\\n{old}\\nТекущее резюме:\\n{self.long_term}"
            )
        
        return self.long_term + "\\n\\n" + str(self.short_term)`,
  },
  rag: {
    title: 'RAG (векторный поиск)',
    code: `# Поиск релевантных фрагментов из истории
from chromadb import Client

client = Client()
collection = client.create_collection("chat_history")

def retrieve_context(query: str, top_k: int = 5) -> list:
    # Векторный поиск по истории
    results = collection.query(
        query_texts=[query],
        n_results=top_k
    )
    
    # Возвращаем релевантные фрагменты
    return [doc for doc in results["documents"][0]]

# Сохраняем новые сообщения в БД
def store_message(msg: str, metadata: dict):
    collection.add(
        documents=[msg],
        metadatas=[metadata],
        ids=[f"msg_{uuid4()}"]
    )`,
  },
  'fact-extraction': {
    title: 'Извлечение фактов',
    code: `# Извлечение ключевых фактов в JSON-профиль
def extract_facts(messages: list) -> dict:
    prompt = """Извлеки ключевые факты из диалога в JSON:
    - имя, предпочтения, контекст работы
    - важные решения и дедлайны
    JSON формат: {"name": "", "prefs": [], "facts": []}"""
    
    result = llm.invoke(prompt + str(messages))
    return json.loads(result)

# Обновление профиля при каждом диалоге
def update_user_profile(user_id: str, messages: list):
    current = db.get_profile(user_id) or {}
    new_facts = extract_facts(messages)
    
    # Сливаем старый и новый профиль
    merged = merge_profiles(current, new_facts)
    db.save_profile(user_id, merged)
    
    return merged`,
  },
  'sliding-window': {
    title: 'Sliding Window',
    code: `# Самый простой подход — последние N сообщений
def sliding_window_context(messages: list, window_size: int = 10) -> list:
    """
    FIFO: сохраняем только последние window_size сообщений.
    Одна строка, нулевая инфраструктура.
    """
    return messages[-window_size:]

# Использование
context = sliding_window_context(conversation_history)
response = llm.invoke(context)`,
  },
  'semantic-cache': {
    title: 'Семантический кэш',
    code: `# Кэширование по семантическому сходству
import numpy as np
from sentence_transformers import SentenceTransformer

encoder = SentenceTransformer("all-MiniLM-L6-v2")
cache = {}  # {embedding: response}

def semantic_cache_lookup(query: str, threshold: float = 0.95) -> str | None:
    query_emb = encoder.encode(query)
    
    for cached_emb, response in cache.items():
        similarity = np.dot(query_emb, cached_emb) / (
            np.linalg.norm(query_emb) * np.linalg.norm(cached_emb)
        )
        if similarity >= threshold:
            return response  # Кэш-хит!
    
    return None  # Промах — идём к LLM`,
  },
};

const COMPLEXITY_MAP: Record<string, string> = {
  low: 'Низкая',
  medium: 'Средняя',
  high: 'Высокая',
};

const COMPLEXITY_COLORS: Record<string, string> = {
  Низкая: 'border-emerald-500/30 text-emerald-600 bg-emerald-500/5',
  Средняя: 'border-amber-500/30 text-amber-600 bg-amber-500/5',
  Высокая: 'border-red-500/30 text-red-600 bg-red-500/5',
};

type FilterType = 'all' | 'low' | 'medium' | 'high';
type InfraFilter = 'all' | 'none' | 'api' | 'db' | 'vector';

function getInfraCategory(infra: string): InfraFilter {
  const lower = infra.toLowerCase();
  if (lower === 'нет') return 'none';
  if (lower.includes('вектор')) return 'vector';
  if (lower.includes('бд') || lower.includes('sql') || lower.includes('сервер')) return 'db';
  if (lower.includes('api')) return 'api';
  return 'db';
}

const INFRA_OPTIONS: { value: InfraFilter; label: string }[] = [
  { value: 'all', label: 'Вся' },
  { value: 'none', label: 'Нет' },
  { value: 'api', label: 'API' },
  { value: 'db', label: 'БД' },
  { value: 'vector', label: 'Векторная БД' },
];

export default function QuickReference() {
  const [complexityFilter, setComplexityFilter] = useState<FilterType>('all');
  const [infraFilter, setInfraFilter] = useState<InfraFilter>('all');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const filtered = TECHNIQUES.filter((t) => {
    if (complexityFilter !== 'all' && t.complexity !== complexityFilter) return false;
    if (infraFilter !== 'all' && getInfraCategory(t.infrastructure) !== infraFilter)
      return false;
    return true;
  });

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-primary tracking-wider">
          ШПАРГАЛКА
        </h2>
        <p className="text-muted-foreground text-sm">
          Быстрый справочник по техникам управления памятью
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            Сложность:
          </span>
          <div className="flex gap-1">
            {(['all', 'low', 'medium', 'high'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setComplexityFilter(f)}
                className={`px-2.5 py-1 text-xs font-mono border rounded-sm transition-all ${
                  complexityFilter === f
                    ? 'border-primary/50 bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-muted-foreground/50'
                }`}
              >
                {f === 'all' ? 'Все' : COMPLEXITY_MAP[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            Инфра:
          </span>
          <div className="flex gap-1">
            {INFRA_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setInfraFilter(opt.value)}
                className={`px-2.5 py-1 text-xs font-mono border rounded-sm transition-all ${
                  infraFilter === opt.value
                    ? 'border-primary/50 bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-muted-foreground/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Technique Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t) => {
          const isExpanded = expandedCards.has(t.id);
          const snippet = CODE_SNIPPETS[t.id];
          const Icon = t.icon;

          return (
            <div key={t.id} className="industrial-card overflow-hidden">
              <div className="p-5 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${t.color}15`, color: t.color }}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {t.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t.description}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className={COMPLEXITY_COLORS[COMPLEXITY_MAP[t.complexity]]}
                  >
                    Сложность: {COMPLEXITY_MAP[t.complexity]}
                  </Badge>
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    Инфраструктура: {t.infrastructure}
                  </Badge>
                </div>

                {/* Best For */}
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/60">Лучше всего для: </span>
                  {t.bestFor}
                </div>

                {/* Expand toggle */}
                {snippet && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCard(t.id)}
                    className="w-full justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="size-3.5" />
                        Скрыть код
                      </>
                    ) : (
                      <>
                        <ChevronDown className="size-3.5" />
                        Показать пример кода
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Code Snippet with Syntax Highlighting */}
              {isExpanded && snippet && (
                <div className="border-t border-border">
                  <CodeBlock
                    code={snippet.code}
                    language="python"
                    title={snippet.title}
                    showCopy={true}
                    showLanguage={true}
                    maxHeight="16rem"
                    className="border-0 rounded-none"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Нет техник, соответствующих выбранным фильтрам
        </div>
      )}
    </section>
  );
}
