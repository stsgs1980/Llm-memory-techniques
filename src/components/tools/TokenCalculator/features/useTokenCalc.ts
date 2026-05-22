'use client';

import { useState, useMemo } from 'react';
import { MODEL_PRICES, type ModelId } from '@/lib/constants';

// ── Types ───────────────────────────────────────────────────────────
export interface TokenCalcState {
  text: string;
  modelId: ModelId;
}

export interface TokenCalcResult {
  chars: number;
  words: number;
  lines: number;
  lang: string;
  ratio: number;
  tokenMultiplier: number;
  tokens: number;
  model: typeof MODEL_PRICES[ModelId];
  costPerRequest: number;
  cost1000: number;
  cost10000: number;
  cost100000: number;
  contextUsagePercent: number;
  isWarning: boolean;
  isCritical: boolean;
}

export interface ContextBar {
  label: string;
  tokens: number;
  percent: number;
  isOverflow: boolean;
}

// ── Constants ────────────────────────────────────────────────────────
const CONTEXT_WINDOWS = [
  { label: '128K', tokens: 128000 },
  { label: '200K', tokens: 200000 },
  { label: '1M', tokens: 1000000 },
  { label: '2M', tokens: 2000000 },
];

// ── Helpers ──────────────────────────────────────────────────────────
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

export function formatContext(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return String(n);
}

// ── Hook ─────────────────────────────────────────────────────────────
export function useTokenCalc() {
  const [text, setText] = useState('');
  const [modelId, setModelId] = useState<ModelId>('gpt-4o');
  const [copied, setCopied] = useState(false);

  const result = useMemo<TokenCalcResult>(() => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.trim() ? text.split('\n').length : 0;
    const { lang, ratio, tokenMultiplier } = detectLanguage(text);
    const tokens = Math.ceil(chars * tokenMultiplier);

    const model = MODEL_PRICES[modelId];
    const costPerRequest = (tokens / 1_000_000) * model.input;
    const contextUsagePercent = model.context > 0 ? (tokens / model.context) * 100 : 0;

    return {
      chars,
      words,
      lines,
      lang,
      ratio,
      tokenMultiplier,
      tokens,
      model,
      costPerRequest,
      cost1000: costPerRequest * 1000,
      cost10000: costPerRequest * 10000,
      cost100000: costPerRequest * 100000,
      contextUsagePercent,
      isWarning: contextUsagePercent > 80,
      isCritical: contextUsagePercent > 95,
    };
  }, [text, modelId]);

  const contextBars = useMemo<ContextBar[]>(() => {
    return CONTEXT_WINDOWS.map((cw) => ({
      label: cw.label,
      tokens: cw.tokens,
      percent: (result.tokens / cw.tokens) * 100,
      isOverflow: result.tokens > cw.tokens,
    }));
  }, [result.tokens]);

  const handleCopy = async () => {
    const info = `${result.chars} символов, ~${result.tokens} токенов`;
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

  return {
    // State
    text,
    setText,
    modelId,
    setModelId,
    copied,
    // Computed
    result,
    contextBars,
    // Actions
    handleCopy,
    handleClear,
  };
}
