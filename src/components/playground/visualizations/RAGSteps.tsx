'use client';

import React from 'react';

export const ragSteps = [
  {
    title: 'Запрос пользователя',
    description: 'Пользователь отправляет новый запрос в систему.',
    tokensBefore: 50,
    tokensAfter: 50,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="bg-violet-500/15 border border-violet-500/30 rounded p-3 text-center">
          <div className="text-[10px] font-mono text-violet-700 dark:text-violet-400 font-medium">💬 Новый запрос</div>
          <div className="text-xs font-mono text-foreground mt-1">"Как настроить тёмную тему?"</div>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">50 токенов</div>
      </div>
    ),
  },
  {
    title: 'Генерация эмбеддинга',
    description: 'Текст запроса превращается в числовой вектор.',
    tokensBefore: 50,
    tokensAfter: 768,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-violet-600 dark:text-violet-400">"Как настроить тёмную тему?"</div>
        <div className="text-[10px] font-mono text-primary text-center">↓ embedding model</div>
        <div className="flex gap-0.5 flex-wrap justify-center p-2 bg-muted/30 rounded border border-border">
          {[0.12, -0.34, 0.78, 0.56, -0.91, 0.23, 0.67, -0.45, 0.89, 0.11, -0.67, 0.44].map((v, i) => (
            <span key={i} className={`text-[9px] font-mono ${v > 0 ? 'text-emerald-500' : 'text-red-400'}`}>{v > 0 ? '+' : ''}{v}</span>
          ))}
          <span className="text-[9px] font-mono text-muted-foreground">... 756 more</span>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">Вектор: 768 измерений</div>
      </div>
    ),
  },
  {
    title: 'Векторный поиск',
    description: 'Поиск ближайших векторов в базе данных.',
    tokensBefore: 768,
    tokensAfter: 768,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-violet-600 dark:text-violet-400 font-medium mb-1">🔍 Поиск в векторной БД</div>
        <div className="space-y-1">
          {[
            { id: 'chunk_001', sim: 0.95, label: 'Настройка next-themes...' },
            { id: 'chunk_007', sim: 0.87, label: 'Tailwind dark mode...' },
            { id: 'chunk_012', sim: 0.72, label: 'CSS variables для тем...' },
            { id: 'chunk_023', sim: 0.41, label: 'API роутинг в Next.js...' },
          ].map(c => (
            <div key={c.id} className={`h-7 rounded flex items-center justify-between px-2 text-[10px] font-mono ${c.sim > 0.7 ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-muted border border-border'}`}>
              <span className="text-muted-foreground">{c.id}: {c.label}</span>
              <span className={c.sim > 0.7 ? 'text-emerald-500' : 'text-muted-foreground'}>{c.sim}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Извлечение чанков',
    description: 'Топ-N релевантных чанков извлекаются из БД.',
    tokensBefore: 768,
    tokensAfter: 1200,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-emerald-500 font-medium">✓ Извлечено 3 чанка</div>
        <div className="space-y-1.5">
          {[
            { label: 'chunk_001', tokens: 350, text: 'Настройка next-themes в Next.js...' },
            { label: 'chunk_007', tokens: 280, text: 'Tailwind CSS dark mode configuration...' },
            { label: 'chunk_012', tokens: 190, text: 'CSS variables для переключения тем...' },
          ].map(c => (
            <div key={c.label} className="bg-emerald-500/10 border border-emerald-500/20 rounded p-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-emerald-600 dark:text-emerald-400">{c.label}</span>
                <span className="text-muted-foreground">{c.tokens} tok</span>
              </div>
              <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{c.text}</div>
            </div>
          ))}
        </div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">Итого: 820 токенов контекста</div>
      </div>
    ),
  },
  {
    title: 'Генерация ответа с контекстом',
    description: 'LLM получает запрос + извлечённые чанки и генерирует ответ.',
    tokensBefore: 1200,
    tokensAfter: 1300,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-violet-500/10 border border-violet-500/20 rounded p-2">
            <div className="text-[10px] font-mono text-violet-600 dark:text-violet-400 font-medium">Запрос</div>
            <div className="text-[10px] font-mono text-muted-foreground">50 tok</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-2">
            <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">Контекст</div>
            <div className="text-[10px] font-mono text-muted-foreground">820 tok</div>
          </div>
        </div>
        <div className="text-[10px] font-mono text-primary text-center">↓ LLM generate</div>
        <div className="bg-primary/10 border border-primary/20 rounded p-2">
          <div className="text-[10px] font-mono text-primary font-medium">Ответ</div>
          <div className="text-[10px] font-mono text-muted-foreground mt-1">"Для настройки тёмной темы в Next.js..."</div>
        </div>
        <div className="text-[10px] font-mono text-emerald-500 text-center font-medium">✓ Точный ответ на основе 820 токенов контекста</div>
      </div>
    ),
  },
];

export default ragSteps;
