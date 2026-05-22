import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, ArrowUp, ArrowDown, Database, Cpu, TrendingDown, Calendar } from 'lucide-react';
import type { SortKey, SortDir, ModelEntry, CostView } from '../types';
import { PROVIDER_COLORS } from '../constants';
import { formatContext, formatPrice, formatMaxOutput } from '../utils';

interface SortIconProps {
  col: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
}

function SortIcon({ col, sortKey, sortDir }: SortIconProps) {
  if (sortKey !== col) return <ArrowUpDown className="size-3 opacity-40" />;
  return sortDir === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />;
}

interface MatrixGridProps {
  models: ModelEntry[];
  sortKey: SortKey;
  sortDir: SortDir;
  costView: CostView;
  bestValues: {
    bestInput: number;
    bestOutput: number;
    bestContext: number;
    bestMaxOutput: number;
  };
  onSort: (key: SortKey) => void;
}

export function MatrixGrid({
  models,
  sortKey,
  sortDir,
  costView,
  bestValues,
  onSort,
}: MatrixGridProps) {
  const costMultiplier = costView === 'monthly' ? 3 : 0.1;

  return (
    <div className="industrial-card overflow-hidden">
      <div className="max-h-[600px] overflow-y-auto scrollbar-industrial">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead
                className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none"
                onClick={() => onSort('provider')}
              >
                <span className="flex items-center gap-1">
                  <Cpu className="size-3" /> Провайдер <SortIcon col="provider" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </TableHead>
              <TableHead
                className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none"
                onClick={() => onSort('name')}
              >
                <span className="flex items-center gap-1">
                  Модель <SortIcon col="name" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </TableHead>
              <TableHead
                className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none text-right"
                onClick={() => onSort('context')}
              >
                <span className="flex items-center justify-end gap-1">
                  <Database className="size-3" /> Контекст <SortIcon col="context" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </TableHead>
              <TableHead
                className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none text-right"
                onClick={() => onSort('input')}
              >
                <span className="flex items-center justify-end gap-1">
                  <TrendingDown className="size-3" /> Вход <SortIcon col="input" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </TableHead>
              <TableHead
                className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none text-right"
                onClick={() => onSort('output')}
              >
                <span className="flex items-center justify-end gap-1">
                  Выход <SortIcon col="output" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </TableHead>
              <TableHead
                className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none text-right"
                onClick={() => onSort('maxOutput')}
              >
                <span className="flex items-center justify-end gap-1">
                  Max Out <SortIcon col="maxOutput" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </TableHead>
              <TableHead
                className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none"
                onClick={() => onSort('cutoff')}
              >
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" /> Cutoff <SortIcon col="cutoff" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </TableHead>
              <TableHead className="font-mono text-[10px] uppercase tracking-wider text-right">
                {costView === 'monthly' ? '$/мес*' : '$/день*'}
              </TableHead>
              <TableHead className="font-mono text-[10px] uppercase tracking-wider">
                Теги
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model) => {
              const isFree = model.input === 0 && model.output === 0;
              const isBestInput = model.input === bestValues.bestInput && !isFree;
              const isBestOutput = model.output === bestValues.bestOutput && !isFree;
              const isBestContext = model.context === bestValues.bestContext;
              const isBestMaxOutput = model.maxOutput === bestValues.bestMaxOutput;

              const monthlyCost = isFree ? 0 : ((model.input + model.output) / 2 * costMultiplier);
              const costDisplay = isFree ? 'Free' : `$${monthlyCost < 0.01 ? monthlyCost.toFixed(3) : monthlyCost.toFixed(2)}`;

              return (
                <TableRow key={model.id} className="border-border">
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono ${PROVIDER_COLORS[model.provider]}`}
                    >
                      {model.provider}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs font-semibold">{model.name}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-mono text-xs ${isBestContext ? 'text-emerald-500 font-bold' : 'text-muted-foreground'}`}>
                      {formatContext(model.context)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-mono text-xs ${isBestInput ? 'text-emerald-500 font-bold' : isFree ? 'text-muted-foreground/50' : ''}`}>
                      {formatPrice(model.input)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-mono text-xs ${isBestOutput ? 'text-emerald-500 font-bold' : isFree ? 'text-muted-foreground/50' : ''}`}>
                      {formatPrice(model.output)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-mono text-xs ${isBestMaxOutput ? 'text-emerald-500 font-bold' : 'text-muted-foreground'}`}>
                      {formatMaxOutput(model.maxOutput)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-muted-foreground">{model.cutoff}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-mono text-xs ${isFree ? 'text-violet-500 font-bold' : 'text-foreground'}`}>
                      {costDisplay}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-[160px]">
                      {model.bestFor.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono px-1.5 py-0.5 bg-muted/50 text-muted-foreground rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
