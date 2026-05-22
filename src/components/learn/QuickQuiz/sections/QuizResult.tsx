'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Award,
  ArrowLeft,
  Trophy,
  Target,
  TrendingUp,
} from 'lucide-react';
import { QUESTIONS } from '@/data/quiz-questions';
import type { QuizQuestion, QuizResults } from '@/types/quiz';
import { AnswerReview } from './AnswerReview';

interface QuizResultProps {
  results: QuizResults;
  shuffledQuestions: QuizQuestion[];
  answers: Map<string, number>;
  onRestart: () => void;
  onBack: () => void;
}

export function QuizResult({
  results,
  shuffledQuestions,
  answers,
  onRestart,
  onBack,
}: QuizResultProps) {
  return (
    <div className="space-y-4">
      {/* Back button at top of results */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Назад к списку
        </Button>
      </div>

      {/* Score Card */}
      <Card className="industrial-card">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              {results.percentage >= 80 ? (
                <Trophy className="size-10 text-amber-500" />
              ) : results.percentage >= 50 ? (
                <Target className="size-10 text-primary" />
              ) : (
                <TrendingUp className="size-10 text-muted-foreground" />
              )}
            </div>
            <h3 className="font-mono text-lg font-bold mb-1">Тест завершён</h3>
            <p className="font-mono text-3xl font-bold text-primary mb-1">
              {results.percentage}%
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {results.totalCorrect} из {results.totalQuestions} правильных ответов
            </p>
            <div className="w-full bg-muted/50 rounded-md p-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-mono text-lg font-bold text-emerald-500">
                    {QUESTIONS.filter((q) => q.difficulty === 'basic').length}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono uppercase">
                    Базовых
                  </p>
                </div>
                <div>
                  <p className="font-mono text-lg font-bold text-amber-500">
                    {QUESTIONS.filter((q) => q.difficulty === 'medium').length}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono uppercase">
                    Средних
                  </p>
                </div>
                <div>
                  <p className="font-mono text-lg font-bold text-red-500">
                    {QUESTIONS.filter((q) => q.difficulty === 'advanced').length}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono uppercase">
                    Продвинутых
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={onRestart}
              className="industrial-btn bg-primary text-primary-foreground border-primary font-mono text-sm px-8"
            >
              <RotateCcw className="size-4" />
              Пройти заново
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown by Technique */}
      <TechniqueBreakdown techniqueScores={results.techniqueScores} />

      {/* Review Answers */}
      <AnswerReview
        shuffledQuestions={shuffledQuestions}
        answers={answers}
      />
    </div>
  );
}

interface TechniqueBreakdownProps {
  techniqueScores: Array<{
    id: string;
    name: string;
    correct: number;
    total: number;
    icon: React.ElementType;
  }>;
}

function TechniqueBreakdown({ techniqueScores }: TechniqueBreakdownProps) {
  return (
    <Card className="industrial-card">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Award className="size-4 text-primary" />
          <h4 className="font-mono text-sm font-semibold">
            Результаты по техникам
          </h4>
        </div>
        <div className="space-y-3">
          {techniqueScores.map((ts) => {
            const Icon = ts.icon;
            const pct = ts.total > 0 ? Math.round((ts.correct / ts.total) * 100) : 0;
            return (
              <div key={ts.id} className="flex items-center gap-3">
                <Icon className="size-4 text-muted-foreground shrink-0" />
                <span className="font-mono text-xs text-foreground min-w-[120px] truncate">
                  {ts.name}
                </span>
                <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      pct >= 80
                        ? 'bg-emerald-500'
                        : pct >= 50
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-muted-foreground min-w-[60px] text-right">
                  {ts.correct}/{ts.total} ({pct}%)
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
