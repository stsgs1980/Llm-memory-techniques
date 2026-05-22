'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppStore, type AppTab } from '@/lib/store';
import type { TourStep } from '../tour-steps';

const TOTAL_STEPS = 6;

export interface UseTourReturn {
  currentStep: number;
  step: TourStep;
  isFirst: boolean;
  isLast: boolean;
  tourOpen: boolean;
  goNext: () => void;
  goPrev: () => void;
  handleSkip: () => void;
  handleOpenChange: (open: boolean) => void;
  goToStep: (index: number) => void;
}

export function useTour(steps: TourStep[]): UseTourReturn {
  const { tourOpen, setTourOpen, setTourCompleted, setActiveTab } = useAppStore();
  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === TOTAL_STEPS - 1;

  // Navigate to the corresponding tab when step changes
  useEffect(() => {
    if (tourOpen) {
      setActiveTab(step.tab);
    }
  }, [currentStep, tourOpen, step.tab, setActiveTab]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setTourOpen(open);
      if (open) {
        setCurrentStep(0);
      }
    },
    [setTourOpen],
  );

  const goNext = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setTourCompleted(true);
    }
  }, [currentStep, setTourCompleted]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    setTourCompleted(true);
  }, [setTourCompleted]);

  const goToStep = useCallback((index: number) => {
    setCurrentStep(index);
  }, []);

  return {
    currentStep,
    step,
    isFirst,
    isLast,
    tourOpen,
    goNext,
    goPrev,
    handleSkip,
    handleOpenChange,
    goToStep,
  };
}
