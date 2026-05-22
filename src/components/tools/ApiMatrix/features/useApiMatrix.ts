'use client';

import { useState, useMemo, useCallback } from 'react';
import type { SortKey, SortDir, ModelEntry } from '../types';
import { ALL_MODELS } from '../constants';

export function useApiMatrix(activeProviders: string[]) {
  const [sortKey, setSortKey] = useState<SortKey>('provider');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = useCallback((key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }, [sortKey]);

  const resetSort = useCallback(() => {
    setSortKey('input');
    setSortDir('asc');
  }, []);

  const sortedModels = useMemo(() => {
    const filtered = ALL_MODELS.filter((m) => activeProviders.includes(m.provider));
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name': cmp = a.name.localeCompare(b.name); break;
        case 'provider': cmp = a.provider.localeCompare(b.provider); break;
        case 'context': cmp = a.context - b.context; break;
        case 'input': cmp = a.input - b.input; break;
        case 'output': cmp = a.output - b.output; break;
        case 'maxOutput': cmp = a.maxOutput - b.maxOutput; break;
        case 'cutoff': cmp = a.cutoff.localeCompare(b.cutoff); break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [sortKey, sortDir, activeProviders]);

  // Best values (only among paid models with non-zero prices)
  const bestValues = useMemo(() => {
    const paidModels = ALL_MODELS.filter((m) => m.input > 0 && m.output > 0);
    return {
      bestInput: Math.min(...paidModels.map((m) => m.input)),
      bestOutput: Math.min(...paidModels.map((m) => m.output)),
      bestContext: Math.max(...ALL_MODELS.map((m) => m.context)),
      bestMaxOutput: Math.max(...ALL_MODELS.map((m) => m.maxOutput)),
    };
  }, []);

  return {
    sortKey,
    sortDir,
    handleSort,
    resetSort,
    sortedModels,
    bestValues,
  };
}
