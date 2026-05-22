'use client';

import { CommandDialog, CommandInput } from '@/components/ui/command';
import { useGlobalSearch } from './features/useGlobalSearch';
import { SearchEmpty } from './sections/SearchEmpty';
import { SearchResults } from './sections/SearchResults';
import { SearchFooter } from './sections/SearchFooter';

/* ────────────────────────────────────────────
   GlobalSearch Composer
   Main search dialog with command palette
   ──────────────────────────────────────────── */
export default function GlobalSearch() {
  const { searchOpen, setSearchOpen, handleSelect, grouped } = useGlobalSearch();

  return (
    <CommandDialog
      open={searchOpen}
      onOpenChange={setSearchOpen}
      title="Глобальный поиск"
      description="Поиск по всем разделам приложения"
      className="sm:max-w-xl"
    >
      <CommandInput
        placeholder="Введите запрос для поиска..."
        className="font-mono text-sm h-12"
      />
      
      <SearchResults grouped={grouped} onSelect={handleSelect} />
      <SearchEmpty />
      
      <SearchFooter />
    </CommandDialog>
  );
}
