import { Button } from '@/components/ui/button';
import { Filter, ToggleLeft, ToggleRight } from 'lucide-react';
import type { CostView } from '../types';
import { PROVIDERS, PROVIDER_COLORS } from '../constants';

interface MatrixFiltersProps {
  activeProviders: string[];
  costView: CostView;
  onToggleProvider: (provider: string) => void;
  onSetCostView: (view: CostView) => void;
}

export function MatrixFilters({
  activeProviders,
  costView,
  onToggleProvider,
  onSetCostView,
}: MatrixFiltersProps) {
  return (
    <>
      {/* Controls */}
      <div className="industrial-card p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Provider Filter */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            <Filter className="size-3.5 text-muted-foreground shrink-0" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider shrink-0">
              Провайдер:
            </span>
            {PROVIDERS.map((p) => (
              <button
                key={p}
                onClick={() => onToggleProvider(p)}
                className={`
                  industrial-badge border cursor-pointer transition-all duration-200 text-[10px]
                  ${activeProviders.includes(p) ? PROVIDER_COLORS[p] : 'border-border text-muted-foreground opacity-40'}
                `}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Cost View Toggle */}
          <div className="flex items-center gap-2">
            {costView === 'daily' ? (
              <ToggleLeft className="size-4 text-muted-foreground" />
            ) : (
              <ToggleRight className="size-4 text-primary" />
            )}
            <Button
              variant={costView === 'daily' ? 'outline' : 'default'}
              size="sm"
              onClick={() => onSetCostView('daily')}
              className="h-7 text-[10px] font-mono"
            >
              /день
            </Button>
            <Button
              variant={costView === 'monthly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSetCostView('monthly')}
              className="h-7 text-[10px] font-mono"
            >
              /мес
            </Button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2 rounded-full bg-emerald-500" />
          Лучшее значение
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2 rounded-full bg-muted-foreground/40" />
          Free / Open Source
        </span>
      </div>
    </>
  );
}
