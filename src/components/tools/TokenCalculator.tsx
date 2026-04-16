'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calculator,
  Copy,
  Check,
  Trash2,
  AlertTriangle,
  Languages,
  Hash,
  DollarSign,
  BarChart3,
  Gauge,
} from 'lucide-react';
import {
  MODEL_PRICES,
  formatNumber,
  formatUSD,
  estimateTokens,
  type ModelId,
} from '@/lib/constants';

// ── Language detection (simple heuristic) ──
function detectLanguage(text: string): { lang: string; ratio: number; tokenMultiplier: number } {
  if (!text.trim()) return { lang: 'Неизвестно', ratio: 0, tokenMultiplier: 0.4 };

  const cyrillic = text.match(/[\u0400-\u04FF]/g)?.length ?? 0;
  const latin = text.match(/[a-zA-Z]/g)?.length ?? 0;
  const total = cyrillic + latin;

  if (total === 0) return { lang: 'Символы', ratio: 0, tokenMultiplier: 0.4 };

  const cyrillicRatio = cyrillic / total;

  if (cyrillicRatio > 0.3) {
    return { lang: 'Русский', ratio: cyrillicRatio, tokenMultiplier: 0.25 };
  }
  return { lang: 'English', ratio: 1 - cyrillicRatio, tokenMultiplier: 0.4 };
}

// ── Context window presets ──
const CONTEXT_WINDOWS = [
  { label: '128K', tokens: 128000 },
  { label: '200K', tokens: 200000 },
  { label: '1M', tokens: 1000000 },
  { label: '2M', tokens: 2000000 },
];

export default function TokenCalculator() {
  const [text, setText] = useState('');
  const [modelId, setModelId] = useState<ModelId>('gpt-4o');
  const [copied, setCopied] = useState(false);

  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.trim() ? text.split('\n').length : 0;
  const { lang, ratio, tokenMultiplier } = detectLanguage(text);
  const tokens = Math.ceil(chars * tokenMultiplier);

  const handleCopy = async () => {
    const info = `${chars} символов, ~${tokens} токенов`;
    try {
      await navigator.clipboard.writeText(info);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleClear = () => {
    setText('');
  };

  const model = MODEL_PRICES[modelId];

  // Cost calculations
  const costPerRequest = (tokens / 1_000_000) * model.input;
  const cost1000 = costPerRequest * 1000;
  const cost10000 = costPerRequest * 10000;
  const cost100000 = costPerRequest * 100000;

  // Context window usage for selected model
  const contextUsagePercent = model.context > 0 ? (tokens / model.context) * 100 : 0;

  const contextBars = CONTEXT_WINDOWS.map((cw) => ({
    label: cw.label,
    tokens: cw.tokens,
    percent: (tokens / cw.tokens) * 100,
    isOverflow: tokens > cw.tokens,
  }));

  const isWarning = contextUsagePercent > 80;
  const isCritical = contextUsagePercent > 95;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-primary tracking-wider">
          КАЛЬКУЛЯТОР ТОКЕНОВ
        </h2>
        <p className="text-muted-foreground text-sm">
          Вставьте текст для подсчёта токенов и оценки стоимости
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Panel — Input */}
        <div className="lg:col-span-3 space-y-4">
          {/* Textarea */}
          <div className="industrial-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Textarea className="size-0 p-0 border-0 opacity-0 absolute -z-10" aria-hidden />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Текст
                </span>
                {lang !== 'Неизвестно' && (
                  <Badge variant="outline" className="text-[10px] font-mono gap-1">
                    <Languages className="size-3" />
                    {lang} {Math.round(ratio * 100)}%
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  disabled={chars === 0}
                  className="h-7 gap-1.5 text-muted-foreground"
                >
                  {copied ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span className="text-[10px]">{copied ? 'Скопировано' : 'Копировать'}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  disabled={chars === 0}
                  className="h-7 gap-1.5 text-muted-foreground"
                >
                  <Trash2 className="size-3.5" />
                  <span className="text-[10px]">Очистить</span>
                </Button>
              </div>
            </div>

            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Вставьте или введите текст для анализа...&#10;&#10;Поддерживается автоматическое определение языка (EN/RU) и расчёт стоимости по выбранной модели."
              className="min-h-[220px] font-mono text-sm resize-y bg-muted/30 border-border"
            />

            {/* Text Stats */}
            <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1">
                <Hash className="size-3" />
                {formatNumber(chars)} символов
              </span>
              <span className="flex items-center gap-1">
                <BarChart3 className="size-3" />
                {formatNumber(words)} слов
              </span>
              <span>{formatNumber(lines)} строк</span>
            </div>
          </div>

          {/* Model Selector */}
          <div className="industrial-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="size-3.5 text-primary" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                Модель для расчёта стоимости
              </span>
            </div>
            <Select value={modelId} onValueChange={(v) => setModelId(v as ModelId)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите модель" />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(MODEL_PRICES) as [ModelId, typeof MODEL_PRICES[ModelId]][]).map(
                  ([id, m]) => (
                    <SelectItem key={id} value={id}>
                      <span className="flex items-center gap-2">
                        <span>{m.name}</span>
                        <span className="text-muted-foreground text-xs">
                          ${m.input}/M in · ${m.output}/M out · {formatContext(m.context)}
                        </span>
                      </span>
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Panel — Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Token Count Card */}
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
        </div>
      </div>
    </section>
  );
}

function formatContext(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return String(n);
}
