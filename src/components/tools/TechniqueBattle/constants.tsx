import { TECHNIQUES } from '@/lib/constants';

export const TECH_METRICS: Record<
  string,
  { savingsFactor: number; quality: number; latency: number; complexity: number }
> = {
  none: { savingsFactor: 0, quality: 30, latency: 0, complexity: 0 },
  summarization: { savingsFactor: 0.8, quality: 60, latency: 150, complexity: 2 },
  hierarchical: { savingsFactor: 0.7, quality: 75, latency: 200, complexity: 5 },
  rag: { savingsFactor: 0.9, quality: 85, latency: 100, complexity: 8 },
  'fact-extraction': { savingsFactor: 0.95, quality: 70, latency: 50, complexity: 7 },
  'sliding-window': { savingsFactor: 0.5, quality: 20, latency: 10, complexity: 1 },
  'semantic-cache': { savingsFactor: 0.9, quality: 55, latency: 5, complexity: 4 },
};

export const TECH_NAMES: Record<string, string> = {
  none: 'Без управления',
  summarization: 'Суммаризация',
  hierarchical: 'Иерархическая',
  rag: 'RAG',
  'fact-extraction': 'Факты',
  'sliding-window': 'Sliding Window',
  'semantic-cache': 'Сем. кэш',
};

export const TECH_COLORS: Record<string, string> = {
  none: 'text-muted-foreground',
  summarization: 'text-amber-500',
  hierarchical: 'text-cyan-500',
  rag: 'text-violet-500',
  'fact-extraction': 'text-emerald-500',
  'sliding-window': 'text-red-500',
  'semantic-cache': 'text-orange-500',
};

export const TECH_BG: Record<string, string> = {
  none: 'bg-muted-foreground/10',
  summarization: 'bg-amber-500/10',
  hierarchical: 'bg-cyan-500/10',
  rag: 'bg-violet-500/10',
  'fact-extraction': 'bg-emerald-500/10',
  'sliding-window': 'bg-red-500/10',
  'semantic-cache': 'bg-orange-500/10',
};

export function getTechniqueIcon(id: string) {
  const t = TECHNIQUES.find((t) => t.id === id);
  if (!t) return null;
  const Icon = t.icon;
  return <Icon className="size-5" />;
}
