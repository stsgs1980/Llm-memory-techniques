'use client';

import { DollarSign, Zap } from 'lucide-react';
import { formatNumber, formatUSD } from '@/lib/constants';
import type { CostSimulatorResults } from '@/hooks/useCostSimulator';

export interface SimulatorOutputProps {
  results: CostSimulatorResults;
}

export default function SimulatorOutput({ results }: SimulatorOutputProps) {
  return (
    <>
      {/* Without Management */}
      <div className="industrial-card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-sm bg-destructive/10 flex items-center justify-center">
            <DollarSign className="size-4 text-destructive" />
          </div>
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Без управления
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] text-muted-foreground font-mono uppercase">
              Всего токенов
            </div>
            <div className="text-xl font-bold font-mono text-foreground mt-0.5">
              {formatNumber(results.tokensWithout)}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground font-mono uppercase">
              Стоимость
            </div>
            <div className="text-xl font-bold font-mono text-destructive mt-0.5">
              {formatUSD(results.costWithout)}
            </div>
          </div>
        </div>
      </div>

      {/* With Technique */}
      <div className="industrial-card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-sm bg-emerald-500/10 flex items-center justify-center">
            <Zap className="size-4 text-emerald-500" />
          </div>
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            С техникой
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] text-muted-foreground font-mono uppercase">
              Токенов
            </div>
            <div className="text-xl font-bold font-mono text-foreground mt-0.5">
              {formatNumber(results.tokensWith)}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground font-mono uppercase">
              Стоимость
            </div>
            <div className="text-xl font-bold font-mono text-emerald-500 mt-0.5">
              {formatUSD(results.costWith)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
