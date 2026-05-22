'use client';

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import type { TourStep } from '../tour-steps';
import { TOTAL_STEPS } from '../tour-steps';

interface TourStepUIProps {
  step: TourStep;
  currentStep: number;
  onSkip: () => void;
}

export function TourStepUI({ step, currentStep, onSkip }: TourStepUIProps) {
  const StepIcon = step.icon;

  return (
    <>
      {/* Header band */}
      <div className="relative border-b border-border">
        {/* Decorative top accent line */}
        <div className="h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

        <div className="px-6 pt-6 pb-4">
          <DialogHeader className="text-left space-y-0">
            {/* Step counter */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Тур · Шаг {currentStep + 1}/{TOTAL_STEPS}
              </span>
              <button
                onClick={onSkip}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm hover:bg-muted"
                aria-label="Закрыть тур"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Title + Icon */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <StepIcon className={`size-5 ${step.accentColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="font-mono text-base font-semibold leading-tight">
                  {step.title}
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Progress bar */}
        <div className="px-6 pb-0">
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <DialogDescription className="text-sm text-muted-foreground leading-relaxed font-sans">
          {step.description}
        </DialogDescription>
      </div>
    </>
  );
}
