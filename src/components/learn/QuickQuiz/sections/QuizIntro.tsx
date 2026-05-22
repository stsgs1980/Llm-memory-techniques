'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, ArrowRight } from 'lucide-react';
import { QUESTIONS } from '@/data/quiz-questions';

interface QuizIntroProps {
  totalQuestions: number;
  onStart: () => void;
}

export function QuizIntro({ totalQuestions, onStart }: QuizIntroProps) {
  return (
    <Card className="industrial-card">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
            <Brain className="size-8 text-primary" />
          </div>
          <h3 className="font-mono text-lg font-bold mb-2">
            Проверьте свои знания
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {totalQuestions} вопросов о техниках управления памятью LLM.
            Охватывает все 6 техник: от основ Sliding Window до продвинутого RAG.
          </p>
          <div className="flex gap-2 flex-wrap justify-center mb-6">
            <Badge variant="outline" className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
              {QUESTIONS.filter((q) => q.difficulty === 'basic').length} базовых
            </Badge>
            <Badge variant="outline" className="font-mono text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
              {QUESTIONS.filter((q) => q.difficulty === 'medium').length} средних
            </Badge>
            <Badge variant="outline" className="font-mono text-[10px] bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
              {QUESTIONS.filter((q) => q.difficulty === 'advanced').length} продвинутых
            </Badge>
          </div>
          <Button
            onClick={onStart}
            className="industrial-btn bg-primary text-primary-foreground border-primary font-mono text-sm px-8"
          >
            Начать тест
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
