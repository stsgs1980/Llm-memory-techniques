'use client';

import { useState, useCallback } from 'react';
import type { CostView, MatrixFiltersState } from '../types';
import { PROVIDERS } from '../constants';

export function useMatrixFilters() {
  const [activeProviders, setActiveProviders] = useState<string[]>(PROVIDERS);
  const [costView, setCostView] = useState<CostView>('monthly');

  const toggleProvider = useCallback((provider: string) => {
    setActiveProviders((prev) =>
      prev.includes(provider) ? prev.filter((p) => p !== provider) : [...prev, provider]
    );
  }, []);

  const resetFilters = useCallback(() => {
    setActiveProviders(PROVIDERS);
    setCostView('monthly');
  }, []);

  return {
    activeProviders,
    costView,
    setCostView,
    toggleProvider,
    resetFilters,
  } satisfies MatrixFiltersState & {
    setCostView: (view: CostView) => void;
    toggleProvider: (provider: string) => void;
    resetFilters: () => void;
  };
}
