'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const TERMS = [
  { term: 'Токен (Token)', definition: 'Минимальная единица текста для LLM. ~4 символа в английском, ~2-3 в русском.', difficulty: 'Базовый', related: 'Все техники' },
  { term: 'Контекстное окно', definition: 'Максимальный объём текста для обработки за один запрос. GPT-4o: 128K, Claude: 200K.', difficulty: 'Базовый', related: 'Суммаризация' },
  { term: 'Эмбеддинг', definition: 'Числовое представление текста в векторном пространстве. Похожие тексты — близкие векторы.', difficulty: 'Средний', related: 'RAG' },
  { term: 'Векторная БД', definition: 'База данных для хранения и поиска эмбеддингов. Pinecone, Chroma, Qdrant.', difficulty: 'Средний', related: 'RAG' },
  { term: 'RAG', definition: 'Retrieval-Augmented Generation. Поиск релевантных фрагментов перед генерацией ответа.', difficulty: 'Средний', related: 'RAG' },
  { term: 'Суммаризация', definition: 'Сжатие длинной истории в краткое резюме. Экономия 70-90% токенов.', difficulty: 'Базовый', related: 'Суммаризация' },
  { term: 'Sliding Window', definition: 'Хранение только последних N сообщений. FIFO очередь.', difficulty: 'Базовый', related: 'Sliding Window' },
  { term: 'Извлечение фактов', definition: 'Автоматическое извлечение структурированных данных (имя, предпочтения) из диалога.', difficulty: 'Продвинутый', related: 'Факты' },
  { term: 'Иерархическая память', definition: 'Двухуровневая система: краткосрочная (последние сообщения) + долгосрочная (резюме).', difficulty: 'Средний', related: 'Иерархия' },
  { term: 'Промпт', definition: 'Текстовый запрос к LLM. Состоит из системного промпта и истории сообщений.', difficulty: 'Базовый', related: 'Все техники' },
  { term: 'Косинусное сходство', definition: 'Метрика близости векторов. 0° = идентичны, 90° = ортогональны.', difficulty: 'Продвинутый', related: 'RAG' },
  { term: 'Чанк (Chunk)', definition: 'Фрагмент текста для разбиения и хранения в векторной БД. Оптимально 200-500 токенов.', difficulty: 'Средний', related: 'RAG' },
];

const DIFFICULTIES = ['Все', 'Базовый', 'Средний', 'Продвинутый'] as const;

const DIFFICULTY_COLORS: Record<string, string> = {
  'Базовый': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'Средний': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'Продвинутый': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
};

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('Все');
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const filteredTerms = useMemo(() => {
    return TERMS.filter(term => {
      const matchesSearch =
        searchQuery === '' ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.related.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'Все' || term.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, difficultyFilter]);

  const toggleTerm = (term: string) => {
    setExpandedTerms(prev => {
      const next = new Set(prev);
      if (next.has(term)) {
        next.delete(term);
      } else {
        next.add(term);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" />
        <span className="font-mono text-sm text-primary tracking-wider">ГЛОССАРИЙ</span>
        <span className="text-xs text-muted-foreground font-mono">({filteredTerms.length}/{TERMS.length})</span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск терминов..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-9 font-mono text-sm"
        />
      </div>

      {/* Difficulty Filter */}
      <div className="flex gap-1.5 flex-wrap">
        {DIFFICULTIES.map(d => (
          <button
            key={d}
            onClick={() => setDifficultyFilter(d)}
            className={`px-3 py-1 text-xs font-mono rounded-sm border transition-colors ${
              difficultyFilter === d
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredTerms.map(term => {
          const isExpanded = expandedTerms.has(term.term);
          return (
            <Card
              key={term.term}
              className="industrial-card cursor-pointer"
              onClick={() => toggleTerm(term.term)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-mono text-sm font-medium text-foreground truncate">
                      {term.term}
                    </h3>
                    <div className="flex gap-1.5 mt-1.5">
                      <Badge
                        variant="outline"
                        className={`font-mono text-[10px] ${DIFFICULTY_COLORS[term.difficulty] || ''}`}
                      >
                        {term.difficulty}
                      </Badge>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {term.related}
                      </Badge>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleTerm(term.term); }}
                    className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-border animate-industrial-slide-up">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {term.definition}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm font-mono">Ничего не найдено</p>
          <p className="text-xs font-mono mt-1">Попробуйте изменить фильтры</p>
        </div>
      )}
    </div>
  );
}
