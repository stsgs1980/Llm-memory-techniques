'use client';

import { Gauge, BarChart3 } from 'lucide-react';
import { formatNumber, formatUSD } from '@/lib/constants';
import type { TokenCalcResult, ContextBar } from '../features/useTokenCalc';

interface CalculatorChartProps {
  result: TokenCalcResult;
  contextBars: ContextBar[];
}

export function CalculatorChart({ result, contextBars }: CalculatorChartProps) {
  const { model, costPerRequest, cost1000, cost10000, cost100000 } = result;

  return (
    <>
      {/* Cost Breakdown */}
      <div className="industrial-card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Gauge className="size-3.5 text-primary" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Стоимость (вход)
          </span>
          <span className="text-[10px] font-mono text-muted-foreground ml-auto">
            ${model.input}/M tok
          </span>
        </div>

        <div className="space-y-2">
          {[
            { label: '1 запрос', cost: costPerRequest },
            { label: '1 000 запросов', cost: cost1000 },
            { label: '10 000 запросов', cost: cost10000 },
            { label: '100 000 запросов', cost: cost100000 },
          ].map((item) => {
            const barWidth = cost100000 > 0 ? Math.max((item.cost / cost100000) * 100, 1) : 0;
            return (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-xs font-mono font-semibold text-foreground">
                    {formatUSD(item.cost)}
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-sm transition-all duration-500"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Context Windows Comparison */}
      <div className="industrial-card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="size-3.5 text-primary" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Использование по размерам окна
          </span>
        </div>

        <div className="space-y-2.5">
          {contextBars.map((cw) => (
            <div key={cw.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {cw.label}
                </span>
                <span className={`text-[10px] font-mono font-bold ${
                  cw.isOverflow ? 'text-red-500' : cw.percent > 80 ? 'text-amber-500' : 'text-emerald-500'
                }`}>
                  {cw.isOverflow ? 'ПЕРЕПОЛНЕН' : `${cw.percent.toFixed(1)}%`}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-sm overflow-hidden">
                <div
                  className={`h-full rounded-sm transition-all duration-300 ${
                    cw.isOverflow
                      ? 'bg-red-500'
                      : cw.percent > 80
                        ? 'bg-amber-500'
                        : 'bg-emerald-500/70'
                  }`}
                  style={{ width: `${Math.min(cw.percent, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
