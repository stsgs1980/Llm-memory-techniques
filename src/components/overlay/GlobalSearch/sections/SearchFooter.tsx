'use client';

/* ────────────────────────────────────────────
   Footer with keyboard hints
   ──────────────────────────────────────────── */
export function SearchFooter() {
  return (
    <div className="border-t border-border px-3 py-2 flex items-center justify-between">
      <span className="text-[10px] text-muted-foreground font-mono">
        <span className="inline-flex items-center gap-1">
          <kbd className="inline-flex h-4 select-none items-center rounded border bg-muted px-1 font-mono text-[9px] text-muted-foreground">
            ↑↓
          </kbd>
          навигация
        </span>
      </span>
      <span className="text-[10px] text-muted-foreground font-mono">
        <span className="inline-flex items-center gap-1">
          <kbd className="inline-flex h-4 select-none items-center rounded border bg-muted px-1 font-mono text-[9px] text-muted-foreground">
            ↵
          </kbd>
          выбрать
        </span>
      </span>
      <span className="text-[10px] text-muted-foreground font-mono">
        <span className="inline-flex items-center gap-1">
          <kbd className="inline-flex h-4 select-none items-center rounded border bg-muted px-1 font-mono text-[9px] text-muted-foreground">
            esc
          </kbd>
          закрыть
        </span>
      </span>
    </div>
  );
}
