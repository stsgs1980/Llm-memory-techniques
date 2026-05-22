import type { LucideIcon } from 'lucide-react';

/* ────────────────────────────────────────────
   Search entry type
   ──────────────────────────────────────────── */
export interface SearchEntry {
  id: string;
  label: string;
  description: string;
  category: string;
  categoryKey: string;
  icon: LucideIcon;
  action: () => void;
}

/* ────────────────────────────────────────────
   Grouped search result type
   ──────────────────────────────────────────── */
export interface SearchGroup {
  key: string;
  label: string;
  items: SearchEntry[];
}
