'use client';

import React from 'react';

export const hierarchicalSteps = [
  {
    title: 'Краткосрочная память',
    description: 'Последние сообщения хранятся в быстром буфере.',
    tokensBefore: 1200,
    tokensAfter: 1200,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-cyan-500 font-medium mb-2">⚡ КРАТКОСРОЧНАЯ ПАМЯТЬ</div>
        {['msg8', 'msg9', 'msg10'].map(m => (
          <div key={m} className="h-7 bg-cyan-500/15 border border-cyan-500/30 rounded flex items-center px-2 text-[10px] font-mono text-cyan-700 dark:text-cyan-400">
            💬 {m} (активный)
          </div>
        ))}
        <div className="text-[10px] font-mono text-muted-foreground mt-2">Быстрый доступ, ограниченный объём</div>
      </div>
    ),
  },
  {
    title: 'Извлечение ключевой информации',
    description: 'Из краткосрочной памяти извлекаются важные факты.',
    tokensBefore: 1200,
    tokensAfter: 1200,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded p-2">
          <div className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-medium mb-1">Краткосрочная → Анализ</div>
          {[8, 9, 10].map(i => (
            <div key={i} className="text-[10px] font-mono text-muted-foreground ml-2">• msg{i}: → {['React/TS', 'Next.js', 'тёмная тема'][i - 8]}</div>
          ))}
        </div>
        <div className="text-[10px] font-mono text-primary text-center">↓ извлечение фактов</div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded p-2">
          <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-medium">Ключевые факты:</div>
          <div className="text-[10px] font-mono text-muted-foreground">• Стек: React, TypeScript</div>
          <div className="text-[10px] font-mono text-muted-foreground">• Фреймворк: Next.js</div>
          <div className="text-[10px] font-mono text-muted-foreground">• Цель: тёмная тема</div>
        </div>
      </div>
    ),
  },
  {
    title: 'Сохранение в долгосрочную память',
    description: 'Ключевые факты переносятся в архив с индексацией.',
    tokensBefore: 1200,
    tokensAfter: 600,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-amber-500/10 border border-amber-500/20 rounded p-2">
            <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-medium">📦 Долгосрочная память</div>
            <div className="text-[10px] font-mono text-muted-foreground mt-1">entry_001: {`{name: "dev", stack: ["React", "TS"]}`}</div>
            <div className="text-[10px] font-mono text-muted-foreground">entry_002: {`{framework: "Next.js", goal: "dark theme"}`}</div>
          </div>
        </div>
        <div className="text-[10px] font-mono text-emerald-500 text-center font-medium">✓ Индексировано и сохранено</div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-emerald-500" style={{ width: '15%' }} />
        </div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">Контекст: 15% от полного объёма</div>
      </div>
    ),
  },
  {
    title: 'Реконструкция контекста',
    description: 'При новом запросе контекст собирается из двух уровней.',
    tokensBefore: 600,
    tokensAfter: 800,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-cyan-500 font-medium">КРАТКОСРОЧНАЯ ↓</div>
        {['msg11', 'msg12'].map(m => (
          <div key={m} className="h-6 bg-cyan-500/15 border border-cyan-500/30 rounded flex items-center px-2 text-[10px] font-mono text-cyan-700 dark:text-cyan-400">
            💬 {m}
          </div>
        ))}
        <div className="text-[10px] font-mono text-amber-500 font-medium mt-2">ДОЛГОСРОЧНАЯ ↓</div>
        <div className="h-6 bg-amber-500/15 border border-amber-500/30 rounded flex items-center px-2 text-[10px] font-mono text-amber-700 dark:text-amber-400">
          📋 entry_001, entry_002 (100 токенов)
        </div>
        <div className="text-[10px] font-mono text-primary text-center mt-1 font-medium">= Полный контекст для LLM</div>
      </div>
    ),
  },
  {
    title: 'Векторный поиск в долгосрочной',
    description: 'Поиск релевантных записей из архива по семантике.',
    tokensBefore: 800,
    tokensAfter: 600,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-primary mb-1">Запрос: "как добавить тему"</div>
        <div className="bg-muted/50 rounded p-2 border border-border">
          <div className="text-[10px] font-mono text-muted-foreground space-y-0.5">
            <div>entry_001 (sim: 0.82) ✓</div>
            <div>entry_002 (sim: 0.95) ✓ ← лучший</div>
            <div>entry_003 (sim: 0.31) ✗</div>
          </div>
        </div>
        <div className="text-[10px] font-mono text-emerald-500 text-center font-medium">✓ Извлечено 2 релевантных записи (200 токенов)</div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">Только релевантное, ничего лишнего</div>
      </div>
    ),
  },
];

export default hierarchicalSteps;
