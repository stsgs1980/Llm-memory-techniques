'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, SkipForward, Brain, Layers, Database, FileJson, Scissors, Zap } from 'lucide-react';
import { TECHNIQUES } from '@/lib/constants';

interface Step {
  title: string;
  description: string;
  tokensBefore: number;
  tokensAfter: number;
  visualization: React.ReactNode;
}

const TECHNIQUE_ICONS = [Brain, Layers, Database, FileJson, Scissors, Zap];

function buildSteps(techniqueIndex: number): Step[] {
  switch (techniqueIndex) {
    case 0: // Summarization
      return [
        {
          title: 'Сообщения накапливаются',
          description: 'Диалог продолжается, сообщения заполняют контекстное окно.',
          tokensBefore: 800,
          tokensAfter: 800,
          visualization: (
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
          visualization: (
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
          visualization: (
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
          visualization: (
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
          visualization: (
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
    case 1: // Hierarchical
      return [
        {
          title: 'Краткосрочная память',
          description: 'Последние сообщения хранятся в быстром буфере.',
          tokensBefore: 1200,
          tokensAfter: 1200,
          visualization: (
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
          visualization: (
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
          visualization: (
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
          visualization: (
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
          visualization: (
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-primary mb-1">Запрос: &quot;как добавить тему&quot;</div>
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
    case 2: // RAG
      return [
        {
          title: 'Запрос пользователя',
          description: 'Пользователь отправляет новый запрос в систему.',
          tokensBefore: 50,
          tokensAfter: 50,
          visualization: (
            <div className="space-y-2">
              <div className="bg-violet-500/15 border border-violet-500/30 rounded p-3 text-center">
                <div className="text-[10px] font-mono text-violet-700 dark:text-violet-400 font-medium">💬 Новый запрос</div>
                <div className="text-xs font-mono text-foreground mt-1">&quot;Как настроить тёмную тему?&quot;</div>
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
          visualization: (
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-violet-600 dark:text-violet-400">&quot;Как настроить тёмную тему?&quot;</div>
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
          visualization: (
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
          visualization: (
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
          visualization: (
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
                <div className="text-[10px] font-mono text-muted-foreground mt-1">&quot;Для настройки тёмной темы в Next.js...&quot;</div>
              </div>
              <div className="text-[10px] font-mono text-emerald-500 text-center font-medium">✓ Точный ответ на основе 820 токенов контекста</div>
            </div>
          ),
        },
      ];
    case 3: // Fact Extraction
      return [
        {
          title: 'Пользователь делится информацией',
          description: 'В ходе диалога пользователь раскрывает факты о себе.',
          tokensBefore: 200,
          tokensAfter: 200,
          visualization: (
            <div className="space-y-1.5">
              <div className="bg-emerald-500/15 border border-emerald-500/30 rounded p-3 text-center">
                <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-medium">💬 Сообщение пользователя</div>
                <div className="text-xs font-mono text-foreground mt-1">&quot;Привет, я Алексей, работаю с React и TypeScript, сейчас делаю проект на Next.js&quot;</div>
              </div>
            </div>
          ),
        },
        {
          title: 'Извлечение структурированных фактов',
          description: 'LLM анализирует сообщение и извлекает ключевые данные.',
          tokensBefore: 200,
          tokensAfter: 200,
          visualization: (
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-muted-foreground mb-1">Анализ сообщения...</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded p-2 text-[10px] font-mono text-muted-foreground">
                  &quot;Привет, я <span className="text-emerald-500 font-medium">Алексей</span>, работаю с <span className="text-emerald-500 font-medium">React</span> и <span className="text-emerald-500 font-medium">TypeScript</span>...&quot;
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
          visualization: (
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
          visualization: (
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-primary font-medium">Новый диалог (через неделю)</div>
              <div className="text-[10px] font-mono text-muted-foreground text-center">↓ загрузка профиля</div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-2">
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">📋 Контекст для LLM:</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">&quot;Пользователь: Алексей. Стек: React, TypeScript, Next.js. Предыдущие цели: ...&quot;</div>
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
          visualization: (
            <div className="space-y-2">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-2 mb-1">
                <div className="text-[10px] font-mono text-muted-foreground">[Профиль: Алексей | React, TS, Next.js]</div>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded p-2">
                <div className="text-[10px] font-mono text-primary font-medium">💬 Ответ AI:</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">&quot;Привет, Алексей! Раз ты работаешь с Next.js, для решения задачи...&quot;</div>
              </div>
              <div className="text-[10px] font-mono text-emerald-500 text-center font-medium">✓ Персонализация без полного контекста</div>
              <div className="text-[10px] font-mono text-muted-foreground text-center">Экономия: 90-99% токенов</div>
            </div>
          ),
        },
      ];
    case 4: // Sliding Window
      return [
        {
          title: 'Все сообщения в окне',
          description: 'Начало диалога — все сообщения помещаются в окно.',
          tokensBefore: 400,
          tokensAfter: 400,
          visualization: (
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
          visualization: (
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
          visualization: (
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
          visualization: (
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
    case 5: // Semantic Cache
      return [
        {
          title: 'Новый запрос поступает',
          description: 'Пользователь отправляет запрос в систему.',
          tokensBefore: 50,
          tokensAfter: 50,
          visualization: (
            <div className="space-y-2">
              <div className="bg-orange-500/15 border border-orange-500/30 rounded p-3 text-center">
                <div className="text-[10px] font-mono text-orange-700 dark:text-orange-400 font-medium">💬 Новый запрос</div>
                <div className="text-xs font-mono text-foreground mt-1">&quot;Как настроить тёмную тему в Next.js?&quot;</div>
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
          visualization: (
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-orange-600 dark:text-orange-400">&quot;Как настроить тёмную тему в Next.js?&quot;</div>
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
          visualization: (
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
          visualization: (
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
          visualization: (
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-orange-500 font-medium">КАШ: HIT → мгновенный ответ</div>
              <div className="bg-primary/10 border border-primary/20 rounded p-3">
                <div className="text-[10px] font-mono text-primary font-medium">Кэшированный ответ:</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">&quot;Для настройки тёмной темы в Next.js используйте next-themes...&quot;</div>
              </div>
              <div className="text-[10px] font-mono text-emerald-500 text-center font-medium">✓ 0 токенов LLM • $0.00 • &lt;10ms</div>
              <div className="text-[10px] font-mono text-amber-500 text-center">⚠️ При CACHE MISS → обычный запрос к LLM + сохранение в кэш</div>
            </div>
          ),
        },
      ];
    default:
      return [];
  }
}

export default function InteractiveExplorer() {
  const [selectedTechnique, setSelectedTechnique] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = buildSteps(selectedTechnique);
  const currentStepData = steps[currentStep] || steps[0];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying, handleNext]);

  const togglePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Technique Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-industrial">
        {TECHNIQUES.map((t, i) => {
          const Icon = TECHNIQUE_ICONS[i];
          return (
            <Button
              key={t.id}
              variant={selectedTechnique === i ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedTechnique(i);
                setCurrentStep(0);
                setIsPlaying(false);
              }}
              className={`flex-shrink-0 font-mono text-xs h-8 gap-1.5 ${
                selectedTechnique === i
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:border-primary/50'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.shortName}
            </Button>
          );
        })}
      </div>

      {/* Visualization Area */}
      <Card className="industrial-card flex-1 overflow-hidden">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-mono text-sm text-primary">
                {TECHNIQUES[selectedTechnique]?.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Шаг {currentStep + 1} из {steps.length}: {currentStepData.title}
              </p>
            </div>
            <Badge variant="outline" className="font-mono text-xs">
              {currentStep + 1}/{steps.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="animate-industrial-slide-up">
            <p className="text-sm text-muted-foreground mb-4">{currentStepData.description}</p>

            {/* Visualization */}
            <div className="bg-muted/20 border border-border rounded-md p-4 mb-4">
              {currentStepData.visualization}
            </div>

            {/* Token Counter */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">До:</span>
                <span className="text-amber-500">{currentStepData.tokensBefore.toLocaleString()}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-emerald-500">После: {currentStepData.tokensAfter.toLocaleString()}</span>
              </div>
              <div>
                {currentStepData.tokensAfter < currentStepData.tokensBefore ? (
                  <span className="text-emerald-500">
                    −{Math.round((1 - currentStepData.tokensAfter / currentStepData.tokensBefore) * 100)}%
                  </span>
                ) : currentStepData.tokensAfter > currentStepData.tokensBefore ? (
                  <span className="text-amber-500">
                    +{Math.round(((currentStepData.tokensAfter - currentStepData.tokensBefore) / currentStepData.tokensBefore) * 100)}%
                  </span>
                ) : (
                  <span className="text-muted-foreground">=</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" onClick={handleReset} className="h-8 px-2">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentStep === 0} className="h-8 px-2">
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button variant="default" size="sm" onClick={togglePlay} className="h-8 px-3 gap-1.5 bg-primary text-primary-foreground">
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isPlaying ? 'Пауза' : 'Авто'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleNext} disabled={currentStep >= steps.length - 1} className="h-8 px-2">
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setCurrentStep(steps.length - 1); setIsPlaying(false); }} className="h-8 px-2">
            <SkipForward className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-1">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentStep
                  ? 'bg-primary w-4'
                  : i < currentStep
                    ? 'bg-primary/40'
                    : 'bg-muted-foreground/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
