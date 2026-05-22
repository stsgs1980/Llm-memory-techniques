'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';
import { DIFFICULTY_CONFIG } from '@/data/quiz-questions';
import type { QuizQuestion } from '@/types/quiz';

interface AnswerReviewProps {
  shuffledQuestions: QuizQuestion[];
  answers: Map<string, number>;
}

export function AnswerReview({ shuffledQuestions, answers }: AnswerReviewProps) {
  return (
    <Card className="industrial-card">
      <CardContent className="p-5">
        <h4 className="font-mono text-sm font-semibold mb-4">Обзор ответов</h4>
        <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-industrial">
          {shuffledQuestions.map((q) => {
            const userAnswer = q ? (q.id ? answers.get(q.id) : undefined) : undefined;
            const isCorrect = userAnswer === q?.correctIndex;
            if (!q) return null;
            return (
              <div
                key={q.id}
                className="flex items-start gap-3 p-3 rounded-md border border-border/50 bg-muted/20"
              >
                <div className="shrink-0 mt-0.5">
                  {isCorrect ? (
                    <CheckCircle2 className="size-4 text-emerald-500" />
                  ) : (
                    <XCircle className="size-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs font-medium leading-relaxed mb-1">
                    {q.question}
                  </p>
                  {!isCorrect && userAnswer !== undefined && (
                    <p className="text-[10px] text-red-500/80 font-mono mb-1">
                      Ваш ответ: {q.options[userAnswer]}
                    </p>
                  )}
                  <p className="text-[10px] text-emerald-500/80 font-mono">
                    Правильно: {q.options[q.correctIndex]}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`font-mono text-[10px] shrink-0 ${DIFFICULTY_CONFIG[q.difficulty].color}`}
                >
                  {DIFFICULTY_CONFIG[q.difficulty].label}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
