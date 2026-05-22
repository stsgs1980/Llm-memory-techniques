'use client';

import React from 'react';

export const factExtractionSteps = [
  {
    title: 'Пользователь делится информацией',
    description: 'В ходе диалога пользователь раскрывает факты о себе.',
    tokensBefore: 200,
    tokensAfter: 200,
    renderVisualization: () => (
      <div className="space-y-1.5">
        <div className="bg-emerald-500/15 border border-emerald-500/30 rounded p-3 text-center">
          <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-medium">💬 Сообщение пользователя</div>
          <div className="text-xs font-mono text-foreground mt-1">"Привет, я Алексей, работаю с React и TypeScript, сейчас делаю проект на Next.js"</div>
        </div>
      </div>
    ),
  },
  {
    title: 'Извлечение структурированных фактов',
    description: 'LLM анализирует сообщение и извлекает ключевые данные.',
    tokensBefore: 200,
    tokensAfter: 200,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-muted-foreground mb-1">Анализ сообщения...</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded p-2 text-[10px] font-mono text-muted-foreground">
            "Привет, я <span className="text-emerald-500 font-medium">Алексей</span>, работаю с <span className="text-emerald-500 font-medium">React</span> и <span className="text-emerald-500 font-medium">TypeScript</span>..."
          </div>
          <span className="text-primary font-mono text-lg">→</span>
        </div>
        <div className="text-[10px] font-mono text-primary text-center">↓ fact extraction</div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="bg-emerald-500/15 border border-emerald-500/30 rounded p-1.5 text-center">
            <div className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">name</div>
            <div className="text-[10px] font-mono font-medium">Алексей</div>
          </div>
          <div className="bg-emerald-500/15 border border-emerald-500/30 rounded p-1.5 text-center">
            <div className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">stack[0]</div>
            <div className="text-[10px] font-mono font-medium">React</div>
          </div>
          <div className="bg-emerald-500/15 border border-emerald-500/30 rounded p-1.5 text-center">
            <div className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">stack[1]</div>
            <div className="text-[10px] font-mono font-medium">TypeScript</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Сохранение JSON-профиля',
    description: 'Извлечённые факты сохраняются в структурированный профиль.',
    tokensBefore: 200,
    tokensAfter: 200,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="bg-muted/50 rounded border border-border p-2.5">
          <div className="text-[10px] font-mono text-emerald-500 mb-1.5">{'// user_profile.json'}</div>
          <pre className="text-[10px] font-mono text-muted-foreground leading-relaxed">
{`{
  "id": "user_001",
  "name": "Алексей",
  "stack": ["React", "TypeScript", "Next.js"],
  "preferences": {},
  "goals": [],
  "updated": "2026-04-01"
}`}
          </pre>
        </div>
        <div className="text-[10px] font-mono text-emerald-500 text-center font-medium">✓ Профиль сохранён в БД</div>
      </div>
    ),
  },
  {
    title: 'Загрузка профиля в новом диалоге',
    description: 'При новом разговоре профиль автоматически подгружается.',
    tokensBefore: 50,
    tokensAfter: 150,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-primary font-medium">Новый диалог (через неделю)</div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">↓ загрузка профиля</div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-2">
          <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">📋 Контекст для LLM:</div>
          <div className="text-[10px] font-mono text-muted-foreground mt-1">"Пользователь: Алексей. Стек: React, TypeScript, Next.js. Предыдущие цели: ..."</div>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">Только 100 токенов вместо тысяч сообщений</div>
      </div>
    ),
  },
  {
    title: 'Персонализированный контекст',
    description: 'LLM отвечает с учётом накопленных знаний о пользователе.',
    tokensBefore: 150,
    tokensAfter: 200,
    renderVisualization: () => (
      <div className="space-y-2">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-2 mb-1">
          <div className="text-[10px] font-mono text-muted-foreground">[Профиль: Алексей | React, TS, Next.js]</div>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded p-2">
          <div className="text-[10px] font-mono text-primary font-medium">💬 Ответ AI:</div>
          <div className="text-[10px] font-mono text-muted-foreground mt-1">"Привет, Алексей! Раз ты работаешь с Next.js, для решения задачи..."</div>
        </div>
        <div className="text-[10px] font-mono text-emerald-500 text-center font-medium">✓ Персонализация без полного контекста</div>
        <div className="text-[10px] font-mono text-muted-foreground text-center">Экономия: 90-99% токенов</div>
      </div>
    ),
  },
];

export default factExtractionSteps;
