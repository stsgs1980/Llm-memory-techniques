import { FilterType, InfraFilter, INFRA_OPTIONS, COMPLEXITY_MAP } from '../features/useReferenceFilter';

interface ReferenceHeaderProps {
  complexityFilter: FilterType;
  onComplexityChange: (filter: FilterType) => void;
  infraFilter: InfraFilter;
  onInfraChange: (filter: InfraFilter) => void;
}

export function ReferenceHeader({
  complexityFilter,
  onComplexityChange,
  infraFilter,
  onInfraChange,
}: ReferenceHeaderProps) {
  return (
    <>
      {/* Title Section */}
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-primary tracking-wider">ШПАРГАЛКА</h2>
        <p className="text-muted-foreground text-sm">
          Быстрый справочник по техникам управления памятью
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            Сложность:
          </span>
          <div className="flex gap-1">
            {(['all', 'low', 'medium', 'high'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => onComplexityChange(f)}
                className={`px-2.5 py-1 text-xs font-mono border rounded-sm transition-all ${
                  complexityFilter === f
                    ? 'border-primary/50 bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-muted-foreground/50'
                }`}
              >
                {f === 'all' ? 'Все' : COMPLEXITY_MAP[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            Инфра:
          </span>
          <div className="flex gap-1">
            {INFRA_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onInfraChange(opt.value)}
                className={`px-2.5 py-1 text-xs font-mono border rounded-sm transition-all ${
                  infraFilter === opt.value
                    ? 'border-primary/50 bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-muted-foreground/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
