'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { TECHNIQUES, estimateTokens } from '@/lib/constants';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export const TECHNIQUE_IDS = ['none', ...TECHNIQUES.map(t => t.id)] as const;

export const TECHNIQUE_LABELS: Record<string, string> = {
  none: 'Без техники',
  ...Object.fromEntries(TECHNIQUES.map(t => [t.id, t.shortName])),
};

export const INITIAL_MESSAGES: Message[] = [
  { role: 'user', content: 'Привет, я разработчик, работаю с React и TypeScript.', timestamp: Date.now() - 60000 },
  { role: 'assistant', content: 'Привет! Рад знакомству. Чем могу помочь сегодня?', timestamp: Date.now() - 55000 },
  { role: 'user', content: 'Хочу добавить тёмную тему в свой проект на Next.js.', timestamp: Date.now() - 50000 },
  { role: 'assistant', content: 'Для тёмной темы в Next.js рекомендую next-themes — отлично работает с Tailwind CSS.', timestamp: Date.now() - 45000 },
];

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

export function getContextUsage(technique: string, messageCount: number): number {
  if (technique === 'none') return Math.min(100, messageCount * 8);
  if (technique === 'summarization') return Math.min(60, 20 + messageCount * 2);
  if (technique === 'hierarchical') return Math.min(50, 15 + messageCount * 2);
  if (technique === 'rag') return Math.min(40, 10 + messageCount * 1.5);
  if (technique === 'fact-extraction') return Math.min(30, 10 + messageCount);
  if (technique === 'sliding-window') return Math.min(50, 20 + messageCount * 2);
  if (technique === 'semantic-cache') return Math.min(20, 5 + messageCount);
  return messageCount * 8;
}

export function useChatDemo() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [activeTechnique, setActiveTechnique] = useState('summarization');
  const [showMemory, setShowMemory] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalTokens = messages.reduce((sum, m) => sum + estimateTokens(m.content), 0);
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

  const handleClear = useCallback(() => {
    setMessages([]);
    setInputText('');
  }, []);

  const getMemorySnapshot = useCallback(() => {
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
  }, [activeTechnique, messages.length]);

  return {
    // State
    messages,
    inputText,
    activeTechnique,
    showMemory,
    isTyping,
    scrollRef,
    totalTokens,
    contextUsage,
    savings,
    estimatedCost,

    // Actions
    setInputText,
    setActiveTechnique,
    setShowMemory,
    handleSend,
    handleClear,
    getMemorySnapshot,
  };
}
