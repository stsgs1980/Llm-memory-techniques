'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DollarSign, TrendingDown, Zap, RotateCcw } from 'lucide-react';
import { MODEL_PRICES, TECHNIQUES, formatNumber, formatUSD, type ModelId } from '@/lib/constants';
import { useCostSimulator } from '@/hooks/useCostSimulator';

export default function CostSimulator() {
  const {
    modelId,
    techniqueId,
    messagesPerDay,
    avgTokensPerMsg,
    daysPeriod,
    results,
    barWidths,
    setModelId,
    setTechniqueId,
    setMessagesPerDay,
    setAvgTokensPerMsg,
    setDaysPeriod,
    handleReset,
  } = useCostSimulator();

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-primary tracking-wider">
          СИМУЛЯТОР ЗАТРАТ
        </h2>
        <p className="text-muted-foreground text-sm">
          Настройте параметры и узнайте, сколько вы можете сэкономить
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {/* Left Panel - Controls */}
        <div className="md:col-span-3">
          <div className="industrial-card p-5 space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                Параметры
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-7 gap-1.5 text-muted-foreground"
              >
                <RotateCcw className="size-3.5" />
                <span className="text-xs">Сброс</span>
              </Button>
            </div>

            {/* Model Select */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground/80">
                Модель
              </label>
              <Select value={modelId} onValueChange={(v) => setModelId(v as ModelId)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите модель" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.entries(MODEL_PRICES) as [ModelId, typeof MODEL_PRICES[ModelId]][]).map(
                    ([id, model]) => (
                      <SelectItem key={id} value={id}>
                        <span className="flex items-center gap-2">
                          <span>{model.name}</span>
                          <span className="text-muted-foreground text-xs">
                            ${model.input}/M tok
                          </span>
                        </span>
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Technique Select */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground/80">
                Техника управления памятью
              </label>
              <Select value={techniqueId} onValueChange={setTechniqueId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите технику" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">
                    <span className="flex items-center gap-2">
                      <span>Без управления</span>
                      <span className="text-muted-foreground text-xs">0%</span>
                    </span>
                  </SelectItem>
                  {TECHNIQUES.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      <span className="flex items-center gap-2">
                        <span>{t.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {t.savings}
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Messages per day */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground/80">
                  Сообщений / день
                </label>
                <Input
                  type="number"
                  value={messagesPerDay}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v >= 1 && v <= 100000) setMessagesPerDay(v);
                  }}
                  className="w-20 h-7 text-xs text-right font-mono"
                  min={1}
                  max={100000}
                />
              </div>
              <Slider
                value={[messagesPerDay]}
                onValueChange={([v]) => setMessagesPerDay(v)}
                min={10}
                max={10000}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>10</span>
                <span>10 000</span>
              </div>
            </div>

            {/* Avg tokens per message */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground/80">
                  Среднее токенов / сообщение
                </label>
                <Input
                  type="number"
                  value={avgTokensPerMsg}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v >= 1 && v <= 10000) setAvgTokensPerMsg(v);
                  }}
                  className="w-20 h-7 text-xs text-right font-mono"
                  min={1}
                  max={10000}
                />
              </div>
              <Slider
                value={[avgTokensPerMsg]}
                onValueChange={([v]) => setAvgTokensPerMsg(v)}
                min={50}
                max={500}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>50</span>
                <span>500</span>
              </div>
            </div>

            {/* Period Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground/80">
                Период
              </label>
              <div className="flex gap-2">
                <Button
                  variant={daysPeriod === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDaysPeriod('month')}
                  className="flex-1"
                >
                  Месяц
                </Button>
                <Button
                  variant={daysPeriod === 'year' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDaysPeriod('year')}
                  className="flex-1"
                >
                  Год
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="md:col-span-3 space-y-4">
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

          {/* Visual Bar Comparison */}
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
        </div>
      </div>
    </section>
  );
}
