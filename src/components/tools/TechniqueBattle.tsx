'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Swords, Trophy, RotateCcw } from 'lucide-react';
import { TECHNIQUES, MODEL_PRICES, formatUSD, type ModelId } from '@/lib/constants';

const TECH_METRICS: Record<
  string,
  { savingsFactor: number; quality: number; latency: number; complexity: number }
> = {
  none: { savingsFactor: 0, quality: 30, latency: 0, complexity: 0 },
  summarization: { savingsFactor: 0.8, quality: 60, latency: 150, complexity: 2 },
  hierarchical: { savingsFactor: 0.7, quality: 75, latency: 200, complexity: 5 },
  rag: { savingsFactor: 0.9, quality: 85, latency: 100, complexity: 8 },
  'fact-extraction': { savingsFactor: 0.95, quality: 70, latency: 50, complexity: 7 },
  'sliding-window': { savingsFactor: 0.5, quality: 20, latency: 10, complexity: 1 },
  'semantic-cache': { savingsFactor: 0.9, quality: 55, latency: 5, complexity: 4 },
};

const TECH_NAMES: Record<string, string> = {
  none: 'Без управления',
  summarization: 'Суммаризация',
  hierarchical: 'Иерархическая',
  rag: 'RAG',
  'fact-extraction': 'Факты',
  'sliding-window': 'Sliding Window',
  'semantic-cache': 'Сем. кэш',
};

const TECH_COLORS: Record<string, string> = {
  none: 'text-muted-foreground',
  summarization: 'text-amber-500',
  hierarchical: 'text-cyan-500',
  rag: 'text-violet-500',
  'fact-extraction': 'text-emerald-500',
  'sliding-window': 'text-red-500',
  'semantic-cache': 'text-orange-500',
};

const TECH_BG: Record<string, string> = {
  none: 'bg-muted-foreground/10',
  summarization: 'bg-amber-500/10',
  hierarchical: 'bg-cyan-500/10',
  rag: 'bg-violet-500/10',
  'fact-extraction': 'bg-emerald-500/10',
  'sliding-window': 'bg-red-500/10',
  'semantic-cache': 'bg-orange-500/10',
};

function getTechniqueIcon(id: string) {
  const t = TECHNIQUES.find((t) => t.id === id);
  if (!t) return null;
  const Icon = t.icon;
  return <Icon className="size-5" />;
}

type MetricKey = 'tokensPerReq' | 'monthlyCost' | 'quality' | 'latency';

type BattleSide = {
  tokensPerReq: number;
  monthlyCost: number;
  quality: number;
  latency: number;
};

function MetricRow({
  label,
  leftValue,
  rightValue,
  metric,
  format,
}: {
  label: string;
  leftValue: number;
  rightValue: number;
  metric: MetricKey;
  format: (v: number) => string;
}) {
  let winner: 'left' | 'right' | 'tie' = 'tie';
  if (metric === 'quality') {
    if (leftValue > rightValue) winner = 'left';
    else if (rightValue > leftValue) winner = 'right';
  } else {
    if (leftValue < rightValue) winner = 'left';
    else if (rightValue < leftValue) winner = 'right';
  }
  const leftWin = winner === 'left';
  const rightWin = winner === 'right';
  return (
    <div className="flex items-center gap-2 py-2 border-b border-border/50 last:border-0">
      <div className="flex-1 text-right">
        <span
          className={`text-sm font-mono font-medium transition-colors ${
            leftWin ? 'text-emerald-500' : 'text-foreground/70'
          }`}
        >
          {format(leftValue)}
        </span>
        {leftWin && <Trophy className="size-3 text-emerald-500 inline ml-1" />}
      </div>
      <div className="w-20 text-center">
        <span className="text-[10px] font-mono text-muted-foreground uppercase">
          {label}
        </span>
      </div>
      <div className="flex-1 text-left">
        {rightWin && <Trophy className="size-3 text-emerald-500 inline mr-1" />}
        <span
          className={`text-sm font-mono font-medium transition-colors ${
            rightWin ? 'text-emerald-500' : 'text-foreground/70'
          }`}
        >
          {format(rightValue)}
        </span>
      </div>
    </div>
  );
}

export default function TechniqueBattle() {
  const [leftTechnique, setLeftTechnique] = useState('summarization');
  const [rightTechnique, setRightTechnique] = useState('rag');
  const [scenario, setScenario] = useState({
    length: 20,
    tokensPerMsg: 150,
    monthlyVolume: 1000,
  });

  const modelId: ModelId = 'gpt-4o';
  const model = MODEL_PRICES[modelId];

  const leftMetrics = TECH_METRICS[leftTechnique];
  const rightMetrics = TECH_METRICS[rightTechnique];

  const battleResults = useMemo(() => {
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

  const quickBattles = [
    { left: 'summarization', right: 'rag', label: 'Суммаризация vs RAG' },
    { left: 'hierarchical', right: 'fact-extraction', label: 'Иерархическая vs Факты' },
    { left: 'summarization', right: 'semantic-cache', label: 'Суммаризация vs Кэш' },
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-primary tracking-wider">
          БИТВА ТЕХНИК
        </h2>
        <p className="text-muted-foreground text-sm">
          Сравните техники управления памятью LLM в бою
        </p>
      </div>

      {/* Fighter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        {/* Left Fighter */}
        <div className="industrial-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Select value={leftTechnique} onValueChange={setLeftTechnique}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Без управления</SelectItem>
                {TECHNIQUES.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-center space-y-2">
            <div className={`inline-flex size-12 rounded-lg ${TECH_BG[leftTechnique]} ${TECH_COLORS[leftTechnique]} items-center justify-center`}>
              {getTechniqueIcon(leftTechnique) || <span className="text-lg">?</span>}
            </div>
            <div className={`text-lg font-bold ${TECH_COLORS[leftTechnique]}`}>
              {TECH_NAMES[leftTechnique]}
            </div>
            <div className="text-[10px] font-mono text-muted-foreground">
              Экономия {Math.round(leftMetrics.savingsFactor * 100)}%
            </div>
          </div>
        </div>

        {/* VS Badge */}
        <div className="flex items-center justify-center">
          <div className="size-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <span className="font-mono font-bold text-primary text-sm">VS</span>
          </div>
        </div>

        {/* Right Fighter */}
        <div className="industrial-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Select value={rightTechnique} onValueChange={setRightTechnique}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Без управления</SelectItem>
                {TECHNIQUES.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-center space-y-2">
            <div className={`inline-flex size-12 rounded-lg ${TECH_BG[rightTechnique]} ${TECH_COLORS[rightTechnique]} items-center justify-center`}>
              {getTechniqueIcon(rightTechnique) || <span className="text-lg">?</span>}
            </div>
            <div className={`text-lg font-bold ${TECH_COLORS[rightTechnique]}`}>
              {TECH_NAMES[rightTechnique]}
            </div>
            <div className="text-[10px] font-mono text-muted-foreground">
              Экономия {Math.round(rightMetrics.savingsFactor * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Battle Results */}
      <div className="industrial-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Swords className="size-4 text-primary" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Результаты боя
          </span>
        </div>
        <MetricRow
          label="Токенов/запрос"
          leftValue={battleResults.left.tokensPerReq}
          rightValue={battleResults.right.tokensPerReq}
          metric="tokensPerReq"
          format={(v) => v.toLocaleString('ru-RU')}
        />
        <MetricRow
          label="Стоимость/мес"
          leftValue={battleResults.left.monthlyCost}
          rightValue={battleResults.right.monthlyCost}
          metric="monthlyCost"
          format={(v) => formatUSD(v)}
        />
        <MetricRow
          label="Качество"
          leftValue={battleResults.left.quality}
          rightValue={battleResults.right.quality}
          metric="quality"
          format={(v) => `${v}/100`}
        />
        <MetricRow
          label="Задержка"
          leftValue={battleResults.left.latency}
          rightValue={battleResults.right.latency}
          metric="latency"
          format={(v) => `${v}ms`}
        />
      </div>

      {/* Scenario Params */}
      <div className="industrial-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Параметры сценария
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-7 gap-1.5 text-muted-foreground"
          >
            <RotateCcw className="size-3.5" />
            <span className="text-xs">Сброс</span>
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-foreground/80">
              Длина диалога (сообщений)
            </label>
            <span className="text-xs font-mono text-primary">{scenario.length}</span>
          </div>
          <Slider
            value={[scenario.length]}
            onValueChange={([v]) => setScenario((s) => ({ ...s, length: v }))}
            min={5}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-foreground/80">
              Среднее токенов / сообщение
            </label>
            <span className="text-xs font-mono text-primary">{scenario.tokensPerMsg}</span>
          </div>
          <Slider
            value={[scenario.tokensPerMsg]}
            onValueChange={([v]) => setScenario((s) => ({ ...s, tokensPerMsg: v }))}
            min={50}
            max={500}
            step={10}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-foreground/80">
              Объём в месяц (запросов)
            </label>
            <span className="text-xs font-mono text-primary">
              {scenario.monthlyVolume.toLocaleString('ru-RU')}
            </span>
          </div>
          <Slider
            value={[scenario.monthlyVolume]}
            onValueChange={([v]) => setScenario((s) => ({ ...s, monthlyVolume: v }))}
            min={100}
            max={50000}
            step={100}
          />
        </div>
      </div>

      {/* Quick Battle Buttons */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-mono text-muted-foreground self-center mr-1">
          Быстрая битва:
        </span>
        {quickBattles.map((qb) => (
          <Button
            key={qb.label}
            variant="outline"
            size="sm"
            onClick={() => {
              setLeftTechnique(qb.left);
              setRightTechnique(qb.right);
            }}
            className="text-xs"
          >
            {qb.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
