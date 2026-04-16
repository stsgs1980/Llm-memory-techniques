'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  Calendar,
  ToggleLeft,
  ToggleRight,
  Database,
  Cpu,
  TrendingDown,
  RotateCcw,
} from 'lucide-react';
import { MODEL_PRICES, formatNumber } from '@/lib/constants';

// ── Extended model data ──
interface ModelEntry {
  id: string;
  name: string;
  provider: string;
  providerColor: string;
  context: number;
  input: number;
  output: number;
  maxOutput: number;
  cutoff: string;
  bestFor: string[];
}

const ALL_MODELS: ModelEntry[] = [
  // OpenAI
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', providerColor: 'text-emerald-500', context: 128000, input: 2.5, output: 10.0, maxOutput: 16384, cutoff: 'Окт 2023', bestFor: ['Мультимодальность', 'Скорость', 'Общий задачи'] },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', providerColor: 'text-emerald-500', context: 128000, input: 0.15, output: 0.60, maxOutput: 16384, cutoff: 'Окт 2023', bestFor: ['Бюджет', 'Высокая нагрузка', 'Простые задачи'] },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', providerColor: 'text-emerald-500', context: 128000, input: 10.0, output: 30.0, maxOutput: 4096, cutoff: 'Апр 2023', bestFor: ['Код', 'Аналитика'] },
  { id: 'o1', name: 'o1', provider: 'OpenAI', providerColor: 'text-emerald-500', context: 200000, input: 15.0, output: 60.0, maxOutput: 100000, cutoff: 'Окт 2023', bestFor: ['Сложные рассуждения', 'Математика', 'Наука'] },
  { id: 'o1-mini', name: 'o1-mini', provider: 'OpenAI', providerColor: 'text-emerald-500', context: 128000, input: 3.0, output: 12.0, maxOutput: 65536, cutoff: 'Окт 2023', bestFor: ['Рассуждения', 'Экономия'] },
  { id: 'o3-mini', name: 'o3-mini', provider: 'OpenAI', providerColor: 'text-emerald-500', context: 200000, input: 1.10, output: 4.40, maxOutput: 100000, cutoff: 'Янв 2025', bestFor: ['Рассуждения', 'Код', 'Бюджет'] },

  // Anthropic
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', providerColor: 'text-orange-500', context: 200000, input: 3.0, output: 15.0, maxOutput: 8192, cutoff: 'Апр 2024', bestFor: ['Код', 'Письменность', 'Аналитика'] },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', providerColor: 'text-orange-500', context: 200000, input: 0.80, output: 4.0, maxOutput: 4096, cutoff: 'Авг 2023', bestFor: ['Скорость', 'Бюджет', 'Модерация'] },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', providerColor: 'text-orange-500', context: 200000, input: 15.0, output: 75.0, maxOutput: 4096, cutoff: 'Авг 2023', bestFor: ['Нюансы', 'Сложный анализ', 'Creative'] },

  // Google
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', providerColor: 'text-blue-500', context: 2000000, input: 1.25, output: 5.0, maxOutput: 8192, cutoff: 'Янв 2024', bestFor: ['Огромный контекст', 'Видео', 'Документы'] },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', providerColor: 'text-blue-500', context: 1000000, input: 0.075, output: 0.30, maxOutput: 8192, cutoff: 'Янв 2024', bestFor: ['Скорость', 'Бюджет', 'Мультимодальность'] },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'Google', providerColor: 'text-blue-500', context: 1000000, input: 0.10, output: 0.40, maxOutput: 8192, cutoff: 'Янв 2025', bestFor: ['Агенты', 'Код', 'Скорость'] },

  // Meta
  { id: 'llama-3.1-405b', name: 'Llama 3.1 405B', provider: 'Meta', providerColor: 'text-violet-500', context: 128000, input: 0.0, output: 0.0, maxOutput: 16384, cutoff: 'Дек 2023', bestFor: ['Open Source', 'Self-hosted', 'Custom fine-tuning'] },
  { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', provider: 'Meta', providerColor: 'text-violet-500', context: 128000, input: 0.0, output: 0.0, maxOutput: 8192, cutoff: 'Дек 2023', bestFor: ['Open Source', 'Edge deploy', 'Бюджет'] },

  // Mistral
  { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral', providerColor: 'text-red-500', context: 128000, input: 2.0, output: 6.0, maxOutput: 4096, cutoff: 'Янв 2025', bestFor: ['Мультиязычность', 'EU data', 'Код'] },
  { id: 'mistral-medium', name: 'Mistral Medium', provider: 'Mistral', providerColor: 'text-red-500', context: 32000, input: 0.70, output: 2.10, maxOutput: 4096, cutoff: 'Янв 2025', bestFor: ['Бюджет', 'Баланс', 'Чат'] },
];

type SortKey = 'name' | 'provider' | 'context' | 'input' | 'output' | 'maxOutput' | 'cutoff';
type SortDir = 'asc' | 'desc';

const PROVIDERS = [...new Set(ALL_MODELS.map((m) => m.provider))];

const PROVIDER_COLORS: Record<string, string> = {
  OpenAI: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  Anthropic: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Google: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Meta: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  Mistral: 'bg-red-500/10 text-red-500 border-red-500/20',
};

function formatContext(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return String(n);
}

function formatPrice(n: number): string {
  if (n === 0) return 'Free';
  if (n < 0.01) return `$${n.toFixed(3)}`;
  return `$${n.toFixed(2)}`;
}

function formatMaxOutput(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return String(n);
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (sortKey !== col) return <ArrowUpDown className="size-3 opacity-40" />;
  return sortDir === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />;
}

export default function ApiMatrix() {
  const [sortKey, setSortKey] = useState<SortKey>('provider');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [activeProviders, setActiveProviders] = useState<string[]>(PROVIDERS);
  const [costView, setCostView] = useState<'monthly' | 'daily'>('monthly');

  const toggleProvider = (provider: string) => {
    setActiveProviders((prev) =>
      prev.includes(provider) ? prev.filter((p) => p !== provider) : [...prev, provider]
    );
  };

  const handleReset = () => {
    setActiveProviders(PROVIDERS);
    setSortKey('input');
    setSortDir('asc');
    setCostView('monthly');
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  // Best values (only among paid models with non-zero prices)
  const paidModels = ALL_MODELS.filter((m) => m.input > 0 && m.output > 0);

  const bestInput = useMemo(() => Math.min(...paidModels.map((m) => m.input)), []);
  const bestOutput = useMemo(() => Math.min(...paidModels.map((m) => m.output)), []);
  const bestContext = useMemo(() => Math.max(...ALL_MODELS.map((m) => m.context)), []);
  const bestMaxOutput = useMemo(() => Math.max(...ALL_MODELS.map((m) => m.maxOutput)), []);

  const sortedModels = useMemo(() => {
    const filtered = ALL_MODELS.filter((m) => activeProviders.includes(m.provider));
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name': cmp = a.name.localeCompare(b.name); break;
        case 'provider': cmp = a.provider.localeCompare(b.provider); break;
        case 'context': cmp = a.context - b.context; break;
        case 'input': cmp = a.input - b.input; break;
        case 'output': cmp = a.output - b.output; break;
        case 'maxOutput': cmp = a.maxOutput - b.maxOutput; break;
        case 'cutoff': cmp = a.cutoff.localeCompare(b.cutoff); break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [sortKey, sortDir, activeProviders]);

  // Monthly cost multiplier: 100K tokens/day * 30 days = 3M tokens
  const costMultiplier = costView === 'monthly' ? 3 : 0.1; // 100K tokens for daily

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-mono text-sm text-primary tracking-wider">
            API МАТРИЦА
          </h2>
          <p className="text-muted-foreground text-sm">
            Сравнение провайдеров LLM: цены, контекст, возможности
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground shrink-0"
        >
          <RotateCcw className="size-3.5" />
          Сброс
        </Button>
      </div>

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
                onClick={() => toggleProvider(p)}
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
              onClick={() => setCostView('daily')}
              className="h-7 text-[10px] font-mono"
            >
              /день
            </Button>
            <Button
              variant={costView === 'monthly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCostView('monthly')}
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

      {/* Table */}
      <div className="industrial-card overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto scrollbar-industrial">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead
                  className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => handleSort('provider')}
                >
                  <span className="flex items-center gap-1">
                    <Cpu className="size-3" /> Провайдер <SortIcon col="provider" sortKey={sortKey} sortDir={sortDir} />
                  </span>
                </TableHead>
                <TableHead
                  className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => handleSort('name')}
                >
                  <span className="flex items-center gap-1">
                    Модель <SortIcon col="name" sortKey={sortKey} sortDir={sortDir} />
                  </span>
                </TableHead>
                <TableHead
                  className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none text-right"
                  onClick={() => handleSort('context')}
                >
                  <span className="flex items-center justify-end gap-1">
                    <Database className="size-3" /> Контекст <SortIcon col="context" sortKey={sortKey} sortDir={sortDir} />
                  </span>
                </TableHead>
                <TableHead
                  className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none text-right"
                  onClick={() => handleSort('input')}
                >
                  <span className="flex items-center justify-end gap-1">
                    <TrendingDown className="size-3" /> Вход <SortIcon col="input" sortKey={sortKey} sortDir={sortDir} />
                  </span>
                </TableHead>
                <TableHead
                  className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none text-right"
                  onClick={() => handleSort('output')}
                >
                  <span className="flex items-center justify-end gap-1">
                    Выход <SortIcon col="output" sortKey={sortKey} sortDir={sortDir} />
                  </span>
                </TableHead>
                <TableHead
                  className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none text-right"
                  onClick={() => handleSort('maxOutput')}
                >
                  <span className="flex items-center justify-end gap-1">
                    Max Out <SortIcon col="maxOutput" sortKey={sortKey} sortDir={sortDir} />
                  </span>
                </TableHead>
                <TableHead
                  className="font-mono text-[10px] uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => handleSort('cutoff')}
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
              {sortedModels.map((model) => {
                const isFree = model.input === 0 && model.output === 0;
                const isBestInput = model.input === bestInput && !isFree;
                const isBestOutput = model.output === bestOutput && !isFree;
                const isBestContext = model.context === bestContext;
                const isBestMaxOutput = model.maxOutput === bestMaxOutput;

                // Estimated cost for 100K tokens/day
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

      {/* Footnote */}
      <div className="text-[10px] font-mono text-muted-foreground leading-relaxed">
        * Расчёт для 100K токенов в день (вход + выход). Цены указаны за 1M токенов. Open Source модели — бесплатно при self-hosted, не включают расходы на инфраструктуру.
      </div>
    </section>
  );
}
