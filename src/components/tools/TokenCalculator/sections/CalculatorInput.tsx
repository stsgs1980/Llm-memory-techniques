'use client';

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
import { Copy, Check, Trash2, Languages, Hash, BarChart3, DollarSign } from 'lucide-react';
import { MODEL_PRICES, formatNumber, type ModelId } from '@/lib/constants';
import { formatContext } from '../features/useTokenCalc';

interface CalculatorInputProps {
  text: string;
  onTextChange: (value: string) => void;
  modelId: ModelId;
  onModelChange: (value: ModelId) => void;
  copied: boolean;
  onCopy: () => void;
  onClear: () => void;
  chars: number;
  words: number;
  lines: number;
  lang: string;
  ratio: number;
}

export function CalculatorInput({
  text,
  onTextChange,
  modelId,
  onModelChange,
  copied,
  onCopy,
  onClear,
  chars,
  words,
  lines,
  lang,
  ratio,
}: CalculatorInputProps) {
  return (
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
              onClick={onCopy}
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
              onClick={onClear}
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
          onChange={(e) => onTextChange(e.target.value)}
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
        <Select value={modelId} onValueChange={(v) => onModelChange(v as ModelId)}>
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
  );
}
