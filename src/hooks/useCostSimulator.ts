'use client';

import { useState, useMemo, useCallback } from 'react';
import { MODEL_PRICES, type ModelId } from '@/lib/constants';

export const SAVINGS_MAP: Record<string, number> = {
  summarization: 0.8,
  hierarchical: 0.7,
  rag: 0.9,
  'fact-extraction': 0.95,
  'sliding-window': 0.5,
  'semantic-cache': 0.9,
  none: 0,
};

export interface CostSimulatorState {
  modelId: ModelId;
  techniqueId: string;
  messagesPerDay: number;
  avgTokensPerMsg: number;
  daysPeriod: 'month' | 'year';
}

export interface CostSimulatorResults {
  tokensWithout: number;
  tokensWith: number;
  costWithout: number;
  costWith: number;
  savedAmount: number;
  savedPercent: number;
  yearlySaved: number;
}

export function useCostSimulator() {
  const [modelId, setModelId] = useState<ModelId>('gpt-4o');
  const [techniqueId, setTechniqueId] = useState('summarization');
  const [messagesPerDay, setMessagesPerDay] = useState(100);
  const [avgTokensPerMsg, setAvgTokensPerMsg] = useState(150);
  const [daysPeriod, setDaysPeriod] = useState<'month' | 'year'>('month');

  const daysInPeriod = daysPeriod === 'month' ? 30 : 365;

  const results: CostSimulatorResults = useMemo(() => {
    const model = MODEL_PRICES[modelId];
    const savingsFactor = SAVINGS_MAP[techniqueId] ?? 0;

    const tokensWithout = messagesPerDay * avgTokensPerMsg * daysInPeriod;
    const tokensWith = tokensWithout * (1 - savingsFactor);

    const costWithout = (tokensWithout / 1_000_000) * model.input;
    const costWith = (tokensWith / 1_000_000) * model.input;

    const savedAmount = costWithout - costWith;
    const savedPercent = costWithout > 0 ? (savedAmount / costWithout) * 100 : 0;
    const yearlySaved = savedAmount * (365 / daysInPeriod);

    return {
      tokensWithout,
      tokensWith,
      costWithout,
      costWith,
      savedAmount,
      savedPercent,
      yearlySaved,
    };
  }, [modelId, techniqueId, messagesPerDay, avgTokensPerMsg, daysInPeriod]);

  const barWidths = useMemo(() => {
    const maxCost = Math.max(results.costWithout, 0.01);
    const withoutBarWidth = 100;
    const withBarWidth = maxCost > 0 ? (results.costWith / maxCost) * 100 : 0;
    return { withoutBarWidth, withBarWidth };
  }, [results]);

  const handleReset = useCallback(() => {
    setModelId('gpt-4o');
    setTechniqueId('summarization');
    setMessagesPerDay(100);
    setAvgTokensPerMsg(150);
    setDaysPeriod('month');
  }, []);

  return {
    // State
    modelId,
    techniqueId,
    messagesPerDay,
    avgTokensPerMsg,
    daysPeriod,
    daysInPeriod,
    results,
    barWidths,

    // Actions
    setModelId,
    setTechniqueId,
    setMessagesPerDay,
    setAvgTokensPerMsg,
    setDaysPeriod,
    handleReset,
  };
}
