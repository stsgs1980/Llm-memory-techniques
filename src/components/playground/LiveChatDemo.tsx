'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Trash2, Brain, Eye, EyeOff, Bot, User } from 'lucide-react';
import { TECHNIQUES, estimateTokens } from '@/lib/constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const INITIAL_MESSAGES: Message[] = [
  { role: 'user', content: 'Привет, я разработчик, работаю с React и TypeScript.', timestamp: Date.now() - 60000 },
  { role: 'assistant', content: 'Привет! Рад знакомству. Чем могу помочь сегодня?', timestamp: Date.now() - 55000 },
  { role: 'user', content: 'Хочу добавить тёмную тему в свой проект на Next.js.', timestamp: Date.now() - 50000 },
  { role: 'assistant', content: 'Для тёмной темы в Next.js рекомендую next-themes — отлично работает с Tailwind CSS.', timestamp: Date.now() - 45000 },
];

const TECHNIQUE_IDS = ['none', ...TECHNIQUES.map(t => t.id)];
const TECHNIQUE_LABELS: Record<string, string> = {
  none: 'Без техники',
  ...Object.fromEntries(TECHNIQUES.map(t => [t.id, t.shortName])),
};

const SIMULATED_RESPONSES: Record<string, string[]> = {
  summarization: [
    '[Контекст: саммари предыдущих сообщений — пользователь разработчик React/TS, хочет тёмную тему в Next.js]\n\nОтличный выбор! Для next-themes:\n1. `npm install next-themes`\n2. Оберните приложение в ThemeProvider\n3. Добавьте toggle кнопку',
    '[Контекст: саммари — обсуждение тёмной темы, используется Tailwind CSS]\n\nТакже добавьте `darkMode: "class"` в tailwind.config и используйте класс `dark:` для стилей.',
    '[Контекст: саммари — пользователь реализует тёмную тему с next-themes и Tailwind]\n\nДля плавного перехода добавьте transition на background-color в CSS.',
  ],
  hierarchical: [
    '[Краткосрочная: последние 3 | Долгосрочная: архив — разработчик React/TS, тёмная тема]\n\nРекомендую начать с next-themes. Это самый простой путь.',
    '[Краткосрочная: последние 3 | Долгосрочная: архив — опыт с Tailwind CSS]\n\nДобавьте класс `dark:` к вашим компонентам для автоматического переключения.',
    '[Краткосрочная: последние 3 | Долгосрочная: архив — реализация progress]\n\nДля системной темы используйте `attribute="class"` и `defaultTheme="system"` в ThemeProvider.',
  ],
  rag: [
    '[Найдено 3 релевантных чанка: next-themes setup, Tailwind dark mode, ThemeProvider]\n\nНа основе найденных данных — вот пошаговая инструкция для next-themes.',
    '[Найдено 2 релевантных чанка: CSS transitions, dark mode toggle]\n\nВот пример реализации toggle кнопки с иконками солнца/луны.',
    '[Найдено 1 релевантный чанк: theme persistence]\n\nnext-themes автоматически сохраняет предпочтения в localStorage.',
  ],
  'fact-extraction': [
    '[Профиль: {имя: «разработчик», стек: «React, TypeScript, Next.js», цель: «тёмная тема»}]\n\nУчитывая ваш стек, next-themes — идеальное решение для Next.js + Tailwind.',
    '[Профиль: {имя: «разработчик», стек: «React, TypeScript, Next.js, Tailwind», цель: «тёмная тема»}]\n\nВаш стек идеально подходит для этой задачи. Tailwind нативно поддерживает dark mode.',
    '[Профиль: {имя: «разработчик», стек: «React, TS, Next.js, Tailwind, next-themes»}]\n\nОтлично, вы уже подключили next-themes! Теперь нужен toggle.',
  ],
  'sliding-window': [
    '[Окно: последние 10 сообщений]\n\nДля тёмной темы в Next.js рекомендую next-themes. Установка простая.',
    '[Окно: последние 10 сообщений]\n\nTailwind CSS имеет встроенную поддержку тёмной темы через префикс `dark:`.',
    '[Окно: последние 10 сообщений]\n\nДобавьте toggle кнопку — пользователь сможет переключать тему вручную.',
  ],
  none: [
    'Отличный выбор! Для тёмной темы в Next.js рекомендую next-themes — отлично работает с Tailwind CSS. Вот пошаговая инструкция:\n1. npm install next-themes\n2. ThemeProvider в layout.tsx\n3. Toggle компонент',
    'Tailwind CSS имеет встроенную поддержку тёмной темы через префикс dark:. Настройте darkMode: "class" в конфиге.',
    'Для плавного переключения темы добавьте transition: background-color 0.2s ease в глобальные стили.',
  ],
};

function getRandomResponse(technique: string): string {
  const responses = SIMULATED_RESPONSES[technique] || SIMULATED_RESPONSES.none;
  return responses[Math.floor(Math.random() * responses.length)];
}

function getContextUsage(technique: string, messageCount: number): number {
  if (technique === 'none') return Math.min(100, messageCount * 8);
  if (technique === 'summarization') return Math.min(60, 20 + messageCount * 2);
  if (technique === 'hierarchical') return Math.min(50, 15 + messageCount * 2);
  if (technique === 'rag') return Math.min(40, 10 + messageCount * 1.5);
  if (technique === 'fact-extraction') return Math.min(30, 10 + messageCount);
  if (technique === 'sliding-window') return Math.min(50, 20 + messageCount * 2);
  if (technique === 'semantic-cache') return Math.min(20, 5 + messageCount);
  return messageCount * 8;
}

export default function LiveChatDemo() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [activeTechnique, setActiveTechnique] = useState('summarization');
  const [showMemory, setShowMemory] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalTokens = messages.reduce((sum, m) => sum + estimateTokens(m.content), 0);
  const noTechniqueTokens = messages.reduce((sum, m) => {
    return sum + estimateTokens(m.content) + (m.role === 'assistant' ? 50 : 0);
  }, 0);
  const contextUsage = getContextUsage(activeTechnique, messages.length);
  const savings = activeTechnique === 'none' ? 0 : Math.round((1 - contextUsage / 100) * 100);
  const estimatedCost = (totalTokens / 1_000_000) * 2.5;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = useCallback(() => {
    if (!inputText.trim() || isTyping) return;

    const userMsg: Message = {
      role: 'user',
      content: inputText.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getRandomResponse(activeTechnique);
      const assistantMsg: Message = {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 500);
  }, [inputText, isTyping, activeTechnique]);

  const handleClear = () => {
    setMessages([]);
    setInputText('');
  };

  const getMemorySnapshot = () => {
    switch (activeTechnique) {
      case 'summarization':
        return messages.length > 4
          ? '[Summary: Разработчик React/TS обсуждает тёмную тему для Next.js с Tailwind CSS]'
          : '[Summary: Диалог только начинается...]';
      case 'hierarchical':
        return `[Short-term: ${messages.slice(-3).length} сообщений]\n[Long-term: Архив ${Math.max(0, messages.length - 3)} сообщений]`;
      case 'rag':
        return `[Vector DB: ${Math.min(messages.length, 5)} чанков проиндексировано]\n[Retrieved: 3 релевантных фрагмента]`;
      case 'fact-extraction':
        return `{\n  "name": "Разработчик",\n  "stack": ["React", "TypeScript", "Next.js"],\n  "goal": "Тёмная тема"\n}`;
      case 'sliding-window':
        return `[Window: последние ${Math.min(messages.length, 10)} из ${messages.length}]`;
      case 'semantic-cache':
        return `[Cache: ${Math.floor(messages.length / 3)} записей]\n[Hits: ${Math.floor(messages.length / 4)}]`;
      default:
        return `[All ${messages.length} messages in context]`;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full min-h-[600px]">
      {/* Chat Panel */}
      <div className="lg:w-2/3 flex flex-col industrial-card overflow-hidden">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="font-mono text-sm text-primary flex items-center gap-2">
              <Bot className="h-4 w-4" />
              LIVE ЧАТ
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleClear} className="h-7 w-7">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMemory(!showMemory)}
                className="h-7 w-7"
              >
                {showMemory ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>

          {/* Technique Selector */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {TECHNIQUE_IDS.map(id => (
              <Button
                key={id}
                variant={activeTechnique === id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTechnique(id)}
                className={`text-xs font-mono h-7 px-2.5 ${
                  activeTechnique === id ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                {TECHNIQUE_LABELS[id]}
              </Button>
            ))}
          </div>
        </CardHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-industrial-slide-up`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-md p-3 ${
                    msg.role === 'user'
                      ? 'bg-primary/10 border border-primary/20'
                      : 'bg-card border border-border'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {msg.role === 'user' ? (
                      <User className="h-3 w-3 text-primary" />
                    ) : (
                      <Bot className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      {msg.role === 'user' ? 'Вы' : 'AI'}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      ~{estimateTokens(msg.content)} токенов
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground/50">
                      {new Date(msg.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-industrial-pulse">
                <div className="bg-card border border-border rounded-md p-3">
                  <div className="flex items-center gap-1.5">
                    <Brain className="h-3 w-3 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground">Думает...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-3 border-t border-border">
          <div className="flex gap-2">
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Введите сообщение..."
              rows={1}
              className="flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono min-h-[36px] max-h-[120px]"
            />
            <Button
              onClick={handleSend}
              disabled={!inputText.trim() || isTyping}
              size="sm"
              className="bg-primary text-primary-foreground h-[36px] px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Memory Monitor Panel */}
      {showMemory && (
        <div className="lg:w-1/3 flex flex-col gap-4">
          <Card className="industrial-card">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-xs text-primary flex items-center gap-2">
                <Brain className="h-3.5 w-3.5" />
                МОНИТОР ПАМЯТИ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Active Technique */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">Техника</span>
                <Badge variant="outline" className="font-mono text-xs">
                  {TECHNIQUE_LABELS[activeTechnique]}
                </Badge>
              </div>

              {/* Token Counter */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-muted-foreground">Токены</span>
                  <span className="text-xs font-mono font-medium">
                    ~{totalTokens}
                    {activeTechnique !== 'none' && (
                      <span className="text-emerald-500 ml-1">(экономия: {savings}%)</span>
                    )}
                  </span>
                </div>
                {/* Context Usage Bar */}
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${contextUsage}%`,
                      backgroundColor:
                        contextUsage > 80
                          ? '#ef4444'
                          : contextUsage > 50
                            ? '#f59e0b'
                            : '#22c55e',
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] font-mono text-muted-foreground">0</span>
                  <span className="text-[10px] font-mono text-muted-foreground">128K</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded bg-muted/50">
                  <div className="text-sm font-mono font-medium">{messages.length}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">Сообщений</div>
                </div>
                <div className="text-center p-2 rounded bg-muted/50">
                  <div className="text-sm font-mono font-medium">~{totalTokens}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">Токенов</div>
                </div>
                <div className="text-center p-2 rounded bg-muted/50">
                  <div className="text-sm font-mono font-medium">${estimatedCost.toFixed(4)}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">Стоимость</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Memory Snapshot */}
          <Card className="industrial-card flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-xs text-primary flex items-center gap-2">
                <Eye className="h-3.5 w-3.5" />
                СНЕПШОТ ПАМЯТИ
              </CardTitle>
              <p className="text-[10px] text-muted-foreground">Что «видит» LLM прямо сейчас</p>
            </CardHeader>
            <CardContent>
              <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap bg-muted/30 rounded p-3 max-h-[240px] overflow-y-auto scrollbar-industrial border border-border/50">
                {getMemorySnapshot()}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
