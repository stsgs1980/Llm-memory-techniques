'use client';

import type { TourStep } from '../tour-steps';

interface TourProgressProps {
  steps: TourStep[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export function TourProgress({ steps, currentStep, onStepClick }: TourProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-5">
      {steps.map((s, i) => {
        const SIcon = s.icon;
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        return (
          <button
            key={s.id}
            onClick={() => onStepClick(i)}
            className={`
              flex items-center justify-center rounded-sm border transition-all duration-200
              ${
                isActive
                  ? 'w-8 h-8 bg-primary/10 border-primary/40 shadow-sm'
                  : isCompleted
                    ? 'w-7 h-7 bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10'
                    : 'w-6 h-6 bg-muted/30 border-border cursor-pointer hover:bg-muted/60'
              }
            `}
            aria-label={`Перейти к шагу ${i + 1}: ${s.title}`}
          >
            <SIcon
              className={`transition-all duration-200 ${
                isActive
                  ? `size-4 ${s.accentColor}`
                  : isCompleted
                    ? 'size-3 text-primary/50'
                    : 'size-2.5 text-muted-foreground/40'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
