'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { DIFFICULTY_CONFIG } from '@/data/quiz-questions';
import type { QuizQuestion as QuizQuestionType } from '@/types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onSelectAnswer: (questionId: string, index: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export function QuizQuestion({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer,
  onNext,
  isLastQuestion,
}: QuizQuestionProps) {
  return (
    <Card className="industrial-card">
      <CardContent className="p-5">
        {/* Badges */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          <Badge
            variant="outline"
            className={`font-mono text-[10px] ${DIFFICULTY_CONFIG[question.difficulty].color}`}
          >
            {DIFFICULTY_CONFIG[question.difficulty].label}
          </Badge>
          <Badge variant="outline" className="font-mono text-[10px]">
            {question.technique}
          </Badge>
        </div>

        {/* Question */}
        <h3 className="font-mono text-sm font-semibold leading-relaxed mb-5">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((option, idx) => {
            const isCorrect = idx === question.correctIndex;
            const isSelected = idx === selectedAnswer;

            let optionStyle = 'border-border bg-background hover:border-primary/40 hover:bg-primary/5 cursor-pointer';
            if (isAnswered) {
              if (isCorrect) {
                optionStyle = 'border-emerald-500/50 bg-emerald-500/5';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'border-red-500/50 bg-red-500/5';
              } else {
                optionStyle = 'border-border/50 bg-muted/30 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => onSelectAnswer(question.id, idx)}
                disabled={isAnswered}
                className={`w-full flex items-center gap-3 p-3 rounded-md border text-left transition-all ${optionStyle}`}
              >
                <span className="w-6 h-6 rounded-sm border border-border flex items-center justify-center shrink-0 font-mono text-xs">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-mono text-sm flex-1">{option}</span>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="size-4 text-red-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className="mt-4 pt-4 border-t border-border animate-industrial-slide-up">
            <div className="flex items-start gap-2">
              {selectedAnswer === question.correctIndex ? (
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="size-4 text-red-500 shrink-0 mt-0.5" />
              )}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface QuizNextButtonProps {
  isAnswered: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
}

export function QuizNextButton({ isAnswered, isLastQuestion, onNext }: QuizNextButtonProps) {
  if (!isAnswered) return null;

  return (
    <div className="flex justify-end animate-industrial-slide-up">
      <Button
        onClick={onNext}
        className="industrial-btn bg-primary text-primary-foreground border-primary font-mono text-sm"
      >
        {isLastQuestion ? 'Результаты' : 'Следующий вопрос'}
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
