import { Swords, Trophy } from 'lucide-react';
import { formatUSD } from '@/lib/constants';
import type { BattleSide } from '../features/useBattle';

type MetricKey = 'tokensPerReq' | 'monthlyCost' | 'quality' | 'latency';

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

type BattleResultsProps = {
  left: BattleSide;
  right: BattleSide;
};

export function BattleResults({ left, right }: BattleResultsProps) {
  return (
    <div className="industrial-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <Swords className="size-4 text-primary" />
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          Результаты боя
        </span>
      </div>
      <MetricRow
        label="Токенов/запрос"
        leftValue={left.tokensPerReq}
        rightValue={right.tokensPerReq}
        metric="tokensPerReq"
        format={(v) => v.toLocaleString('ru-RU')}
      />
      <MetricRow
        label="Стоимость/мес"
        leftValue={left.monthlyCost}
        rightValue={right.monthlyCost}
        metric="monthlyCost"
        format={(v) => formatUSD(v)}
      />
      <MetricRow
        label="Качество"
        leftValue={left.quality}
        rightValue={right.quality}
        metric="quality"
        format={(v) => `${v}/100`}
      />
      <MetricRow
        label="Задержка"
        leftValue={left.latency}
        rightValue={right.latency}
        metric="latency"
        format={(v) => `${v}ms`}
      />
    </div>
  );
}
