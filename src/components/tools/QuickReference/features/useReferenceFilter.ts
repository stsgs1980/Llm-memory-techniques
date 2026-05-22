'use client';

import { useState, useMemo } from 'react';
import { TECHNIQUES } from '@/lib/constants';

export type FilterType = 'all' | 'low' | 'medium' | 'high';
export type InfraFilter = 'all' | 'none' | 'api' | 'db' | 'vector';

export function getInfraCategory(infra: string): InfraFilter {
  const lower = infra.toLowerCase();
  if (lower === 'нет') return 'none';
  if (lower.includes('вектор')) return 'vector';
  if (lower.includes('бд') || lower.includes('sql') || lower.includes('сервер')) return 'db';
  if (lower.includes('api')) return 'api';
  return 'db';
}

export const INFRA_OPTIONS: { value: InfraFilter; label: string }[] = [
  { value: 'all', label: 'Вся' },
  { value: 'none', label: 'Нет' },
  { value: 'api', label: 'API' },
  { value: 'db', label: 'БД' },
  { value: 'vector', label: 'Векторная БД' },
];

export const COMPLEXITY_MAP: Record<string, string> = {
  low: 'Низкая',
  medium: 'Средняя',
  high: 'Высокая',
};

export const COMPLEXITY_COLORS: Record<string, string> = {
  Низкая: 'border-emerald-500/30 text-emerald-600 bg-emerald-500/5',
  Средняя: 'border-amber-500/30 text-amber-600 bg-amber-500/5',
  Высокая: 'border-red-500/30 text-red-600 bg-red-500/5',
};

export function useReferenceFilter() {
  const [complexityFilter, setComplexityFilter] = useState<FilterType>('all');
  const [infraFilter, setInfraFilter] = useState<InfraFilter>('all');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () =>
      TECHNIQUES.filter((t) => {
        if (complexityFilter !== 'all' && t.complexity !== complexityFilter) return false;
        if (infraFilter !== 'all' && getInfraCategory(t.infrastructure) !== infraFilter)
          return false;
        return true;
      }),
    [complexityFilter, infraFilter]
  );

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isCardExpanded = (id: string) => expandedCards.has(id);

  return {
    complexityFilter,
    setComplexityFilter,
    infraFilter,
    setInfraFilter,
    filtered,
    toggleCard,
    isCardExpanded,
  };
}
