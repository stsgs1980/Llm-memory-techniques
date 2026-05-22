'use client';

import { TrendingDown } from 'lucide-react';
import { formatUSD } from '@/lib/constants';
import type { CostSimulatorResults } from '@/hooks/useCostSimulator';

export interface SimulatorChartProps {
  results: CostSimulatorResults;
  barWidths: { withoutBarWidth: number; withBarWidth: number };
  daysPeriod: 'month' | 'year';
}

export default function SimulatorChart({
  results,
  barWidths,
  daysPeriod,
}: SimulatorChartProps) {
  return (
    <div className="industrial-card p-5 space-y-3">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-sm bg-primary/10 flex items-center justify-center">
          <TrendingDown className="size-4 text-primary" />
        </div>
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          Экономия
        </span>
      </div>

      {/* Bar Chart */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-muted-foreground w-16 shrink-0">
            БЕЗ
          </span>
          <div className="flex-1 h-4 bg-muted rounded-sm overflow-hidden">
            <div
              className="h-full bg-destructive/60 rounded-sm transition-all duration-500"
              style={{ width: `${barWidths.withoutBarWidth}%` }}
            />
          </div>
          <span className="text-xs font-mono text-foreground w-16 text-right">
            {formatUSD(results.costWithout)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-muted-foreground w-16 shrink-0">
            С ТЕХ.
          </span>
          <div className="flex-1 h-4 bg-muted rounded-sm overflow-hidden">
            <div
              className="h-full bg-emerald-500/60 rounded-sm transition-all duration-500"
              style={{ width: `${barWidths.withBarWidth}%` }}
            />
          </div>
          <span className="text-xs font-mono text-emerald-500 w-16 text-right">
            {formatUSD(results.costWith)}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
        <div className="text-center p-2 bg-muted/50 rounded-sm">
          <div className="text-2xl font-bold font-mono text-primary">
            {results.savedPercent.toFixed(1)}%
          </div>
          <div className="text-[10px] text-muted-foreground font-mono uppercase mt-0.5">
            Сэкономлено
          </div>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded-sm">
          <div className="text-2xl font-bold font-mono text-primary">
            {formatUSD(results.savedAmount)}
          </div>
          <div className="text-[10px] text-muted-foreground font-mono uppercase mt-0.5">
            За {daysPeriod === 'month' ? 'месяц' : 'год'}
          </div>
        </div>
      </div>

      {daysPeriod === 'month' && results.yearlySaved > 0 && (
        <div className="text-center p-2 bg-primary/5 border border-primary/20 rounded-sm">
          <div className="text-[10px] text-muted-foreground font-mono uppercase">
            Проекция на год
          </div>
          <div className="text-lg font-bold font-mono text-primary mt-0.5">
            {formatUSD(results.yearlySaved)}
          </div>
        </div>
      )}
    </div>
  );
}
