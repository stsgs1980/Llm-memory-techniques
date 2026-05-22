'use client';

import React from 'react';

export const summarizationSteps = [
  {
    title: 'Сообщения накапливаются',
    description: 'Диалог продолжается, сообщения заполняют контекстное окно.',
    tokensBefore: 800,
    tokensAfter: 800,
    renderVisualization: () => (
      <div className="space-y-1.5">
        {['msg1', 'msg2', 'msg3', 'msg4', 'msg5', 'msg6', 'msg7'].map((m, i) => (
          <div key={m} className={`h-7 rounded flex items-center px-2 text-[10px] font-mono ${i < 3 ? 'bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-400' : 'bg-primary/10 border border-primary/20 text-primary'}`}>
            {i < 3 ? `💬 Сообщение ${i + 1} (старое)` : `💬 Сообщение ${i + 1}`}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Порог превышен',
    description: 'Контекст приближается к лимиту. Система обнаруживает переполнение.',
    tokensBefore: 9500,
    tokensAfter: 9500,
    renderVisualization: () => (
      <div className="space-y-1.5">
        <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1">⚠️ КОНТЕКСТ: 9500 / 10000 токенов</div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-amber-500" style={{ width: '95%' }} />
        </div>
        <div className="space-y-1.5 mt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <div key={i} className={`h-6 rounded flex items-center px-2 text-[10px] font-mono ${i > 6 ? 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 animate-industrial-pulse' : 'bg-muted border border-border text-muted-foreground'}`}>
              msg{i}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'LLM генерирует саммари',
    description: 'Старые сообщения сжимаются LLM в краткое резюме.',
    tokensBefore: 9500,
    tokensAfter: 1200,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
          <span>Старые сообщения</span>
          <span className="text-primary">→</span>
          <span className="text-amber-600 dark:text-amber-400 font-medium">LLM Summarize</span>
          <span className="text-primary">→</span>
          <span>Саммари</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1 opacity-50">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-5 bg-muted border border-border rounded text-[9px] font-mono text-muted-foreground flex items-center px-2">msg{i} (600 tok)</div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-amber-500/15 border border-amber-500/30 rounded p-3 text-center">
              <div className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-medium">📋 Саммари</div>
              <div className="text-[10px] font-mono text-muted-foreground mt-1">200 токенов</div>
              <div className="text-[9px] font-mono text-emerald-500 mt-1">−87% токенов</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Старые сообщения заменены',
    description: 'Контекст теперь содержит саммари вместо старых сообщений.',
    tokensBefore: 9500,
    tokensAfter: 2500,
    renderVisualization: () => (
      <div className="space-y-1.5">
        <div className="h-10 bg-amber-500/15 border border-amber-500/30 rounded flex items-center px-3 text-[10px] font-mono text-amber-700 dark:text-amber-400">
          📋 Саммари: Пользователь — разработчик, обсуждает тёмную тему...
        </div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">↓</div>
        {[6, 7, 8].map(i => (
          <div key={i} className="h-7 bg-primary/10 border border-primary/20 rounded flex items-center px-2 text-[10px] font-mono text-primary">
            💬 Сообщение {i} (последнее)
          </div>
        ))}
        <div className="text-[10px] font-mono text-emerald-500 text-center mt-2 font-medium">✓ Контекст: 2500 токенов (−73%)</div>
      </div>
    ),
  },
  {
    title: 'Диалог продолжается',
    description: 'Новые сообщения добавляются к сжатому контексту.',
    tokensBefore: 2500,
    tokensAfter: 3200,
    renderVisualization: () => (
      <div className="space-y-1.5">
        <div className="h-10 bg-amber-500/15 border border-amber-500/30 rounded flex items-center px-3 text-[10px] font-mono text-amber-700 dark:text-amber-400">
          📋 Саммари (200 токенов)
        </div>
        {[6, 7, 8].map(i => (
          <div key={i} className="h-7 bg-primary/10 border border-primary/20 rounded flex items-center px-2 text-[10px] font-mono text-primary">
            💬 msg{i}
          </div>
        ))}
        <div className="h-7 bg-primary/15 border border-primary/30 rounded flex items-center px-2 text-[10px] font-mono text-primary font-medium animate-industrial-slide-up">
          ✨ Новое сообщение
        </div>
        <div className="text-[10px] font-mono text-emerald-500 text-center mt-1 font-medium">✓ Контекст стабильный, цикл повторяется при необходимости</div>
      </div>
    ),
  },
];

export default summarizationSteps;
