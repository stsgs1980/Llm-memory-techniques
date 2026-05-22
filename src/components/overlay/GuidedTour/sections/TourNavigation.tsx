'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Rocket } from 'lucide-react';

interface TourNavigationProps {
  isFirst: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export function TourNavigation({
  isFirst,
  isLast,
  onPrev,
  onNext,
  onSkip,
}: TourNavigationProps) {
  return (
    <div className="border-t border-border px-6 py-4 flex items-center justify-between gap-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrev}
        disabled={isFirst}
        className="gap-1.5 text-xs font-mono disabled:opacity-30"
      >
        <ChevronLeft className="size-3.5" />
        Назад
      </Button>

      <div className="flex items-center gap-2">
        {!isFirst && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="text-xs font-mono text-muted-foreground hover:text-foreground"
          >
            Пропустить
          </Button>
        )}

        <Button
          size="sm"
          onClick={onNext}
          className="gap-1.5 text-xs font-mono"
        >
          {isLast ? (
            <>
              Начать
              <Rocket className="size-3.5" />
            </>
          ) : (
            <>
              Далее
              <ChevronRight className="size-3.5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
