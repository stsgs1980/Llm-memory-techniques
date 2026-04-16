'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GitBranch, ArrowLeft, CheckCircle2 } from 'lucide-react';

type TreeNode = {
  question?: string;
  result?: string;
  desc?: string;
  savings?: string;
  complexity?: string;
  options?: { label: string; next: string; desc: string }[];
};

const TREE: Record<string, TreeNode> = {
  start: {
    question: 'Что вам нужно?',
    options: [
      { label: 'Быстрый прототип', next: 'prototype', desc: 'Минимальная реализация' },
      { label: 'Сэкономить деньги', next: 'save_money', desc: 'Снижение затрат на API' },
      { label: 'Production ассистент', next: 'production', desc: 'Максимальное качество' },
      { label: 'Персонализация на годы', next: 'personalize', desc: 'Долгосрочная память' },
    ],
  },
  prototype: {
    result: 'Sliding Window',
    desc: 'Храните только последние 5-10 сообщений. Одна строка кода.',
    savings: '40–60%',
    complexity: 'Низкая',
  },
  save_money: {
    result: 'Суммаризация',
    desc: 'Сжимайте историю в краткое резюме. Экономия 70-90%.',
    savings: '70–90%',
    complexity: 'Низкая',
  },
  production: {
    question: 'Нужно помнить детали из прошлого?',
    options: [
      { label: 'Да, точные детали', next: 'rag_result', desc: 'Цитаты, факты, контекст' },
      { label: 'Нет, общий контекст', next: 'hier_result', desc: 'Общая картина диалога' },
    ],
  },
  rag_result: {
    result: 'RAG (Векторный поиск)',
    desc: 'Векторная БД + эмбеддинги. Масштабируется на миллионы записей.',
    savings: '80–95%',
    complexity: 'Высокая',
  },
  hier_result: {
    result: 'Иерархическая память',
    desc: 'Краткосрочная + долгосрочная. Баланс контекста.',
    savings: '60–80%',
    complexity: 'Средняя',
  },
  personalize: {
    result: 'Извлечение фактов',
    desc: 'JSON-профиль пользователя. Контекст стабилен годами.',
    savings: '90–99%',
    complexity: 'Высокая',
  },
};

const COMPLEXITY_COLORS: Record<string, string> = {
  Низкая: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Средняя: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Высокая: 'bg-red-500/10 text-red-600 border-red-500/20',
};

export default function DecisionTree() {
  const [currentNode, setCurrentNode] = useState('start');
  const [history, setHistory] = useState<string[]>([]);

  const node = TREE[currentNode];

  const handleSelect = useCallback(
    (next: string) => {
      setHistory((h) => [...h, currentNode]);
      setCurrentNode(next);
    },
    [currentNode]
  );

  const handleBack = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentNode(prev);
  }, [history]);

  const handleReset = useCallback(() => {
    setCurrentNode('start');
    setHistory([]);
  }, []);

  const stepNumber = history.length + 1;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-primary tracking-wider">
          ДЕРЕВО РЕШЕНИЙ
        </h2>
        <p className="text-muted-foreground text-sm">
          Выберите подходящую технику управления памятью, ответив на вопросы
        </p>
      </div>

      {/* Progress */}
      {history.length > 0 && (
        <div className="flex items-center gap-2">
          {history.map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-primary" />
              {i < history.length - 1 && (
                <div className="w-6 h-px bg-primary/30" />
              )}
            </div>
          ))}
          <div className="w-6 h-px bg-border" />
          <div className="size-2 rounded-full bg-border" />
        </div>
      )}

      {/* Card */}
      <div>
        <div className="industrial-card p-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GitBranch className="size-4 text-primary" />
              <span className="font-mono text-xs text-muted-foreground">
                Шаг {stepNumber}
              </span>
            </div>
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="h-7 gap-1.5 text-muted-foreground"
              >
                <ArrowLeft className="size-3.5" />
                <span className="text-xs">Назад</span>
              </Button>
            )}
          </div>

          {/* Question Node */}
          {node.question && (
            <div className="animate-industrial-slide-up">
              <h3 className="text-lg font-semibold text-foreground mb-5 text-center">
                {node.question}
              </h3>
              <div className="space-y-3">
                {node.options!.map((opt) => (
                  <button
                    key={opt.next}
                    onClick={() => handleSelect(opt.next)}
                    className="industrial-btn w-full text-left bg-background border-border hover:border-primary hover:bg-primary/5 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                          {opt.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {opt.desc}
                        </div>
                      </div>
                      <svg
                        className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result Node */}
          {node.result && (
            <div className="animate-industrial-slide-up text-center space-y-4">
              <div className="flex justify-center">
                <div className="size-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <CheckCircle2 className="size-7 text-primary" />
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
                  Рекомендация
                </div>
                <h3 className="text-xl font-bold text-primary">
                  {node.result}
                </h3>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed">
                {node.desc}
              </p>

              <div className="flex items-center justify-center gap-3 pt-2">
                {node.savings && (
                  <Badge
                    variant="outline"
                    className={`${COMPLEXITY_COLORS[node.complexity ?? ''] || ''}`}
                  >
                    {node.savings}
                  </Badge>
                )}
                {node.complexity && (
                  <Badge
                    variant="outline"
                    className={COMPLEXITY_COLORS[node.complexity]}
                  >
                    {node.complexity}
                  </Badge>
                )}
              </div>

              <Button
                onClick={handleReset}
                variant="outline"
                className="mt-4 gap-2"
              >
                <GitBranch className="size-4" />
                Начать заново
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
