'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw } from 'lucide-react';
import { MODEL_PRICES, TECHNIQUES, type ModelId } from '@/lib/constants';

export interface SimulatorInputProps {
  modelId: ModelId;
  techniqueId: string;
  messagesPerDay: number;
  avgTokensPerMsg: number;
  daysPeriod: 'month' | 'year';
  onModelChange: (id: ModelId) => void;
  onTechniqueChange: (id: string) => void;
  onMessagesPerDayChange: (v: number) => void;
  onAvgTokensPerMsgChange: (v: number) => void;
  onDaysPeriodChange: (period: 'month' | 'year') => void;
  onReset: () => void;
}

export default function SimulatorInput({
  modelId, techniqueId, messagesPerDay, avgTokensPerMsg, daysPeriod,
  onModelChange, onTechniqueChange, onMessagesPerDayChange, onAvgTokensPerMsgChange, onDaysPeriodChange, onReset,
}: SimulatorInputProps) {
  return (
    <div className="md:col-span-3">
      <div className="industrial-card p-5 space-y-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Параметры</span>
          <Button variant="ghost" size="sm" onClick={onReset} className="h-7 gap-1.5 text-muted-foreground">
            <RotateCcw className="size-3.5" />
            <span className="text-xs">Сброс</span>
          </Button>
        </div>

        {/* Model Select */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-foreground/80">Модель</label>
          <Select value={modelId} onValueChange={(v) => onModelChange(v as ModelId)}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Выберите модель" /></SelectTrigger>
            <SelectContent>
              {(Object.entries(MODEL_PRICES) as [ModelId, typeof MODEL_PRICES[ModelId]][]).map(([id, model]) => (
                <SelectItem key={id} value={id}>
                  <span className="flex items-center gap-2">
                    <span>{model.name}</span>
                    <span className="text-muted-foreground text-xs">${model.input}/M tok</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Technique Select */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-foreground/80">Техника управления памятью</label>
          <Select value={techniqueId} onValueChange={onTechniqueChange}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Выберите технику" /></SelectTrigger>
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
                    <span className="text-muted-foreground text-xs">{t.savings}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Messages per day */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-foreground/80">Сообщений / день</label>
            <Input
              type="number" value={messagesPerDay}
              onChange={(e) => { const v = parseInt(e.target.value, 10); if (!isNaN(v) && v >= 1 && v <= 100000) onMessagesPerDayChange(v); }}
              className="w-20 h-7 text-xs text-right font-mono" min={1} max={100000}
            />
          </div>
          <Slider value={[messagesPerDay]} onValueChange={([v]) => onMessagesPerDayChange(v)} min={10} max={10000} step={10} className="w-full" />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono"><span>10</span><span>10 000</span></div>
        </div>

        {/* Avg tokens per message */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-foreground/80">Среднее токенов / сообщение</label>
            <Input
              type="number" value={avgTokensPerMsg}
              onChange={(e) => { const v = parseInt(e.target.value, 10); if (!isNaN(v) && v >= 1 && v <= 10000) onAvgTokensPerMsgChange(v); }}
              className="w-20 h-7 text-xs text-right font-mono" min={1} max={10000}
            />
          </div>
          <Slider value={[avgTokensPerMsg]} onValueChange={([v]) => onAvgTokensPerMsgChange(v)} min={50} max={500} step={10} className="w-full" />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono"><span>50</span><span>500</span></div>
        </div>

        {/* Period Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-foreground/80">Период</label>
          <div className="flex gap-2">
            <Button variant={daysPeriod === 'month' ? 'default' : 'outline'} size="sm" onClick={() => onDaysPeriodChange('month')} className="flex-1">Месяц</Button>
            <Button variant={daysPeriod === 'year' ? 'default' : 'outline'} size="sm" onClick={() => onDaysPeriodChange('year')} className="flex-1">Год</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
