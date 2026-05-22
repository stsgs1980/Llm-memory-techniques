'use client';

import { CommandGroup, CommandItem, CommandSeparator, CommandList } from '@/components/ui/command';
import type { SearchEntry, SearchGroup } from '../types';

/* ────────────────────────────────────────────
   Props for SearchResults
   ──────────────────────────────────────────── */
interface SearchResultsProps {
  grouped: SearchGroup[];
  onSelect: (entry: SearchEntry) => void;
}

/* ────────────────────────────────────────────
   Search results list with grouped items
   ──────────────────────────────────────────── */
export function SearchResults({ grouped, onSelect }: SearchResultsProps) {
  return (
    <CommandList className="max-h-[420px] overflow-y-auto">
      {grouped.map((group, gi) => (
        <div key={group.key}>
          {gi > 0 && <CommandSeparator />}
          <CommandGroup heading={group.label}>
            {group.items.map((entry) => {
              const Icon = entry.icon;
              return (
                <CommandItem
                  key={entry.id}
                  value={`${entry.label} ${entry.description}`}
                  onSelect={() => onSelect(entry)}
                  className="font-mono text-xs gap-3 px-3 py-2.5 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="size-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {entry.label}
                    </div>
                    <div className="text-muted-foreground truncate mt-0.5 opacity-70">
                      {entry.description}
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground/50 shrink-0 uppercase tracking-wider font-mono">
                    {group.label}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </div>
      ))}
    </CommandList>
  );
}
