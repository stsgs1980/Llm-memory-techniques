import { useState, useMemo } from 'react';
import { MODEL_PRICES, type ModelId } from '@/lib/constants';
import { TECH_METRICS } from '../constants';

export type Scenario = {
  length: number;
  tokensPerMsg: number;
  monthlyVolume: number;
};

export type BattleSide = {
  tokensPerReq: number;
  monthlyCost: number;
  quality: number;
  latency: number;
};

export type BattleResults = {
  left: BattleSide;
  right: BattleSide;
};

export type QuickBattle = {
  left: string;
  right: string;
  label: string;
};

export function useBattle() {
  const [leftTechnique, setLeftTechnique] = useState('summarization');
  const [rightTechnique, setRightTechnique] = useState('rag');
  const [scenario, setScenario] = useState<Scenario>({
    length: 20,
    tokensPerMsg: 150,
    monthlyVolume: 1000,
  });

  const modelId: ModelId = 'gpt-4o';
  const model = MODEL_PRICES[modelId];

  const leftMetrics = TECH_METRICS[leftTechnique];
  const rightMetrics = TECH_METRICS[rightTechnique];

  const battleResults = useMemo<BattleResults>(() => {
    const leftTokens = scenario.length * scenario.tokensPerMsg * (1 - leftMetrics.savingsFactor);
    const rightTokens = scenario.length * scenario.tokensPerMsg * (1 - rightMetrics.savingsFactor);

    const leftMonthlyCost = (leftTokens * scenario.monthlyVolume / 1_000_000) * model.input;
    const rightMonthlyCost = (rightTokens * scenario.monthlyVolume / 1_000_000) * model.input;

    return {
      left: {
        tokensPerReq: Math.round(leftTokens),
        monthlyCost: leftMonthlyCost,
        quality: leftMetrics.quality,
        latency: leftMetrics.latency,
      },
      right: {
        tokensPerReq: Math.round(rightTokens),
        monthlyCost: rightMonthlyCost,
        quality: rightMetrics.quality,
        latency: rightMetrics.latency,
      },
    };
  }, [leftTechnique, rightTechnique, scenario, leftMetrics, rightMetrics, model.input]);

  const handleReset = () => {
    setLeftTechnique('summarization');
    setRightTechnique('rag');
    setScenario({ length: 20, tokensPerMsg: 150, monthlyVolume: 1000 });
  };

  const quickBattles: QuickBattle[] = [
    { left: 'summarization', right: 'rag', label: 'Суммаризация vs RAG' },
    { left: 'hierarchical', right: 'fact-extraction', label: 'Иерархическая vs Факты' },
    { left: 'summarization', right: 'semantic-cache', label: 'Суммаризация vs Кэш' },
  ];

  const handleQuickBattle = (qb: QuickBattle) => {
    setLeftTechnique(qb.left);
    setRightTechnique(qb.right);
  };

  return {
    leftTechnique,
    setLeftTechnique,
    rightTechnique,
    setRightTechnique,
    scenario,
    setScenario,
    leftMetrics,
    rightMetrics,
    battleResults,
    handleReset,
    quickBattles,
    handleQuickBattle,
  };
}
