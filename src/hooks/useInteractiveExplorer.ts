'use client';

import { useState, useEffect, useCallback } from 'react';

export interface StepData {
  title: string;
  description: string;
  tokensBefore: number;
  tokensAfter: number;
}

export function useInteractiveExplorer(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(s => s + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentStep, totalSteps]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (currentStep >= totalSteps - 1) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  }, [currentStep, totalSteps, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < totalSteps - 1) return prev + 1;
        setIsPlaying(false);
        return prev;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps]);

  return {
    currentStep,
    isPlaying,
    handleNext,
    handlePrev,
    handleReset,
    togglePlay,
    setCurrentStep,
    setIsPlaying,
  };
}
