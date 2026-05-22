'use client';

import React from 'react';

export const semanticCacheSteps = [
  {
    title: 'Новый запрос поступает',
    description: 'Пользователь отправляет запрос в систему.',
    tokensBefore: 50,
    tokensAfter: 50,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="bg-orange-500/15 border border-orange-500/30 rounded p-3 text-center">
          <div className="text-[10px] font-mono text-orange-700 dark:text-orange-400 font-medium">💬 Новый запрос</div>
          <div className="text-xs font-mono text-foreground mt-1">"Как настроить тёмную тему в Next.js?"</div>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">50 токенов</div>
      </div>
    ),
  },
  {
    title: 'Вычисление эмбеддинга',
    description: 'Запрос преобразуется в вектор для сравнения с кэшем.',
    tokensBefore: 50,
    tokensAfter: 768,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-orange-600 dark:text-orange-400">"Как настроить тёмную тему в Next.js?"</div>
        <div className="text-[10px] font-mono text-primary text-center">↓ embedding</div>
        <div className="flex gap-0.5 flex-wrap justify-center p-2 bg-muted/30 rounded border border-border">
          {[0.34, -0.12, 0.89, 0.67, -0.23, 0.45, 0.78, -0.56].map((v, i) => (
            <span key={i} className={`text-[9px] font-mono ${v > 0 ? 'text-emerald-500' : 'text-red-400'}`}>{v > 0 ? '+' : ''}{v}</span>
          ))}
          <span className="text-[9px] font-mono text-muted-foreground">...</span>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">Вектор: 768 измерений</div>
      </div>
    ),
  },
  {
    title: 'Сравнение с кэшем',
    description: 'Вектор запроса сравнивается с векторами в кэше.',
    tokensBefore: 768,
    tokensAfter: 768,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-orange-500 font-medium mb-1">🔍 Сравнение с кэшем</div>
        <div className="space-y-1">
          {[
            { q: 'Настройка тёмной темы в Next.js', sim: 0.96 },
            { q: 'Dark mode для React приложения', sim: 0.88 },
            { q: 'Как подключить CSS в Next.js', sim: 0.45 },
            { q: 'API роуты Next.js', sim: 0.21 },
          ].map((c, i) => (
            <div key={i} className={`h-8 rounded flex items-center justify-between px-2 text-[10px] font-mono border ${c.sim > 0.85 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-muted border-border'}`}>
              <span className="text-muted-foreground truncate mr-2">{c.q}</span>
              <span className={c.sim > 0.85 ? 'text-emerald-500' : 'text-muted-foreground'}>{c.sim}</span>
            </div>
          ))}
        </div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">Порог: 0.85</div>
      </div>
    ),
  },
  {
    title: 'Результат: HIT или MISS',
    description: 'Если сходство выше порога — кэш HIT, иначе MISS.',
    tokensBefore: 768,
    tokensAfter: 0,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="bg-emerald-500/15 border-2 border-emerald-500/40 rounded p-4 text-center">
          <div className="text-sm font-mono text-emerald-500 font-bold">✓ CACHE HIT</div>
          <div className="text-[10px] font-mono text-muted-foreground mt-1">Similarity: 0.96 (threshold: 0.85)</div>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">Ответ взят из кэша — LLM не вызывался!</div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="text-center p-2 bg-muted rounded">
            <div className="text-sm font-mono text-muted-foreground font-bold">$0.00</div>
            <div className="text-[10px] font-mono text-muted-foreground">стоимость</div>
          </div>
          <div className="text-center p-2 bg-muted rounded">
            <div className="text-sm font-mono text-muted-foreground font-bold">&lt;10ms</div>
            <div className="text-[10px] font-mono text-muted-foreground">latency</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Возврат ответа',
    description: 'Кэшированный ответ возвращается мгновенно.',
    tokensBefore: 0,
    tokensAfter: 0,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-orange-500 font-medium">КАШ: HIT → мгновенный ответ</div>
        <div className="bg-primary/10 border border-primary/20 rounded p-3">
          <div className="text-[10px] font-mono text-primary font-medium">Кэшированный ответ:</div>
          <div className="text-[10px] font-mono text-muted-foreground mt-1">"Для настройки тёмной темы в Next.js используйте next-themes..."</div>
        </div>
        <div className="text-[10px] font-mono text-emerald-500 text-center font-medium">✓ 0 токенов LLM • $0.00 • &lt;10ms</div>
        <div className="text-[10px] font-mono text-amber-500 text-center">⚠️ При CACHE MISS → обычный запрос к LLM + сохранение в кэш</div>
      </div>
    ),
  },
];

export default semanticCacheSteps;
