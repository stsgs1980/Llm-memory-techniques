'use client';

import React from 'react';

export const slidingWindowSteps = [
  {
    title: 'Все сообщения в окне',
    description: 'Начало диалога — все сообщения помещаются в окно.',
    tokensBefore: 400,
    tokensAfter: 400,
    renderVisualization: () => (
      <div className="space-y-1.5">
        <div className="text-[10px] font-mono text-red-500 font-medium mb-1">ОКНО: N = 5</div>
        {[1, 2, 3].map(i => (
          <div key={i} className="h-7 bg-red-500/15 border border-red-500/30 rounded flex items-center px-2 text-[10px] font-mono text-red-700 dark:text-red-400">
            💬 msg{i}
          </div>
        ))}
        <div className="text-[10px] font-mono text-muted-foreground text-center">3/5 сообщений</div>
      </div>
    ),
  },
  {
    title: 'Новые вытесняют старые',
    description: 'Когда окно заполнено, новые сообщения выталкивают старые.',
    tokensBefore: 1000,
    tokensAfter: 1000,
    renderVisualization: () => (
      <div className="space-y-1.5">
        <div className="text-[10px] font-mono text-red-500 font-medium mb-1">ОКНО: N = 5 (FIFO)</div>
        <div className="h-7 bg-red-500/15 border border-red-500/30 rounded flex items-center px-2 text-[10px] font-mono text-red-700 dark:text-red-400 opacity-40 line-through">
          💬 msg1 ← вытеснено
        </div>
        {[2, 3, 4, 5].map(i => (
          <div key={i} className="h-7 bg-red-500/15 border border-red-500/30 rounded flex items-center px-2 text-[10px] font-mono text-red-700 dark:text-red-400">
            💬 msg{i}
          </div>
        ))}
        <div className="h-7 bg-emerald-500/15 border border-emerald-500/30 rounded flex items-center px-2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 animate-industrial-slide-up">
          ✨ msg6 (входит в окно)
        </div>
      </div>
    ),
  },
  {
    title: 'Окно сдвигается вперёд',
    description: 'Окно продолжает двигаться, оставляя только последние N.',
    tokensBefore: 1200,
    tokensAfter: 1000,
    renderVisualization: () => (
      <div className="space-y-1.5">
        <div className="text-[10px] font-mono text-red-500 font-medium mb-1">ОКНО СДВИНУЛО →</div>
        <div className="flex gap-0.5">
          <div className="text-[10px] font-mono text-muted-foreground/30 flex-1 text-center">msg1 ✗</div>
          <div className="text-[10px] font-mono text-muted-foreground/30 flex-1 text-center">msg2 ✗</div>
          <div className="text-[10px] font-mono text-red-500 flex-1 text-center">msg3 ✓</div>
          <div className="text-[10px] font-mono text-red-500 flex-1 text-center">msg4 ✓</div>
          <div className="text-[10px] font-mono text-red-500 flex-1 text-center">msg5 ✓</div>
          <div className="text-[10px] font-mono text-red-500 flex-1 text-center">msg6 ✓</div>
          <div className="text-[10px] font-mono text-red-500 flex-1 text-center">msg7 ✓</div>
        </div>
        <div className="mt-2 space-y-1">
          {[3, 4, 5, 6, 7].map(i => (
            <div key={i} className="h-6 bg-red-500/10 border border-red-500/20 rounded flex items-center px-2 text-[10px] font-mono text-red-600 dark:text-red-400">
              msg{i}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Остаются только последние',
    description: 'Итог: LLM видит только окно последних N сообщений.',
    tokensBefore: 1000,
    tokensAfter: 1000,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center p-2 bg-red-500/5 border border-red-500/10 rounded">
            <div className="text-lg font-mono text-red-500 font-bold">N</div>
            <div className="text-[10px] font-mono text-muted-foreground">фиксированный размер</div>
          </div>
          <div className="text-center p-2 bg-emerald-500/5 border border-emerald-500/10 rounded">
            <div className="text-lg font-mono text-emerald-500 font-bold">O(1)</div>
            <div className="text-[10px] font-mono text-muted-foreground">сложность доступа</div>
          </div>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">
          Простая, предсказуемая, но теряется старый контекст
        </div>
        <div className="text-[10px] font-mono text-amber-500 text-center font-medium">⚠️ msg1, msg2 потеряны навсегда</div>
      </div>
    ),
  },
];

export default slidingWindowSteps;
