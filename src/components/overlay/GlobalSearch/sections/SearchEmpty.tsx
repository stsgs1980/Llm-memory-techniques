'use client';

import { Search } from 'lucide-react';
import { CommandEmpty } from '@/components/ui/command';

/* ────────────────────────────────────────────
   Empty state for search results
   ──────────────────────────────────────────── */
export function SearchEmpty() {
  return (
    <CommandEmpty className="py-8">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <Search className="size-6 opacity-30" />
        <p className="font-mono text-sm">Ничего не найдено</p>
        <p className="font-mono text-xs opacity-60">Попробуйте другой запрос</p>
      </div>
    </CommandEmpty>
  );
}
