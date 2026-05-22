'use client';

import { Calculator, AlertTriangle } from 'lucide-react';
import { formatNumber } from '@/lib/constants';
import type { TokenCalcResult } from '../features/useTokenCalc';

interface CalculatorResultProps {
  result: TokenCalcResult;
}

export function CalculatorResult({ result }: CalculatorResultProps) {
  const {
    tokens,
    lang,
    tokenMultiplier,
    model,
    contextUsagePercent,
    isWarning,
    isCritical,
  } = result;

  return (
    <div className="industrial-card p-5 space-y-4 industrial-glow">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Calculator className="size-4 text-primary" />
        </div>
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          Результат
        </span>
      </div>

      <div className="text-center space-y-1">
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          Оценка токенов
        </div>
        <div className="text-4xl font-bold font-mono text-primary">
          ~{formatNumber(tokens)}
        </div>
        <div className="text-[10px] font-mono text-muted-foreground">
          ×{tokenMultiplier} {lang === 'Русский' ? '(кириллица)' : lang === 'English' ? '(латиница)' : ''}
        </div>
      </div>

      {/* Context Window Usage */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            Окно контекста ({model.name})
          </span>
          <span className={`text-[10px] font-mono font-bold ${
            isCritical ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-emerald-500'
          }`}>
            {contextUsagePercent.toFixed(1)}%
          </span>
        </div>
        <div className="h-3 bg-muted rounded-sm overflow-hidden">
          <div
            className={`h-full rounded-sm transition-all duration-300 ${
              isCritical
                ? 'bg-red-500'
                : isWarning
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(contextUsagePercent, 100)}%` }}
          />
        </div>
        <div className="text-[10px] font-mono text-muted-foreground text-right">
          {formatNumber(tokens)} / {formatNumber(model.context)} токенов
        </div>
      </div>

      {isWarning && (
        <div className={`flex items-start gap-2 p-2 rounded-sm border ${
          isCritical
            ? 'bg-red-500/10 border-red-500/20'
            : 'bg-amber-500/10 border-amber-500/20'
        }`}>
          <AlertTriangle className={`size-3.5 shrink-0 mt-0.5 ${
            isCritical ? 'text-red-500' : 'text-amber-500'
          }`} />
          <span className={`text-[10px] font-mono ${
            isCritical ? 'text-red-500' : 'text-amber-500'
          }`}>
            {isCritical
              ? `Превышение лимита! Текст не поместится в контекстное окно ${model.name}.`
              : `Подходите к лимиту контекста. Оставалось ${formatNumber(model.context - tokens)} токенов.`}
          </span>
        </div>
      )}
    </div>
  );
}
