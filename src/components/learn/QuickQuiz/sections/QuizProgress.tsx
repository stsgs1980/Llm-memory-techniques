'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';

interface QuizProgressProps {
  currentIndex: number;
  totalQuestions: number;
  correctCount: number;
  progressPercent: number;
  onBack: () => void;
}

export function QuizProgress({
  currentIndex,
  totalQuestions,
  correctCount,
  progressPercent,
  onBack,
}: QuizProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Назад
        </Button>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">
            Вопрос {currentIndex + 1} из {totalQuestions}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {correctCount} правильных
          </span>
        </div>
      </div>
      <Progress value={progressPercent} className="h-1.5" />
    </div>
  );
}
