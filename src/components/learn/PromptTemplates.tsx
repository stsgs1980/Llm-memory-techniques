'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Copy,
  Check,
  ClipboardList,
} from 'lucide-react';
import { TECHNIQUES } from '@/lib/constants';
import { PROMPT_TEMPLATES } from '@/data/prompts';

/* ─────────── Technique filter config ─────────── */

const TECHNIQUE_FILTERS = [
  { id: 'all', name: 'Все', icon: ClipboardList },
  ...TECHNIQUES.map((t) => ({ id: t.id, name: t.shortName, icon: t.icon })),
];

/* ─────────── Component ─────────── */

export default function PromptTemplates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPrompts = useMemo(() => {
    return PROMPT_TEMPLATES.filter((p) => {
      const matchesFilter = activeFilter === 'all' || p.techniqueId === activeFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.techniqueName.toLowerCase().includes(q) ||
        p.variables.some((v) => v.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  const handleCopy = useCallback(async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const highlightVariables = (text: string) => {
    const parts = text.split(/(\{[^}]+\})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        return (
          <span key={i} className="text-primary font-semibold bg-primary/10 px-0.5 rounded-sm">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const getTechniqueColor = (id: string) => {
    const tech = TECHNIQUES.find((t) => t.id === id);
    return tech?.colorClass || 'text-primary';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ClipboardList className="h-4 w-4 text-primary" />
        <span className="font-mono text-sm text-primary tracking-wider">БИБЛИОТЕКА ПРОМПТОВ</span>
        <span className="text-xs text-muted-foreground font-mono">
          ({filteredPrompts.length}/{PROMPT_TEMPLATES.length})
        </span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск промптов по названию, описанию или переменной..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 font-mono text-sm"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {TECHNIQUE_FILTERS.map((f) => {
          const Icon = f.icon;
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-sm border transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <Icon className="size-3" />
              {f.name}
            </button>
          );
        })}
      </div>

      {/* Prompt Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPrompts.map((p) => {
          const TechIcon = p.techniqueIcon;
          const isCopied = copiedId === p.id;
          return (
            <Card key={p.id} className="industrial-card overflow-hidden">
              <CardContent className="p-0">
                {/* Card Header */}
                <div className="p-4 pb-3 border-b border-border">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <TechIcon className={`size-4 shrink-0 ${getTechniqueColor(p.techniqueId)}`} />
                      <h3 className="font-mono text-sm font-semibold truncate">{p.title}</h3>
                    </div>
                    <Badge variant="outline" className="font-mono text-[10px] shrink-0">
                      {p.techniqueName}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                </div>

                {/* Prompt Code Block */}
                <div className="bg-muted/40 p-4 max-h-72 overflow-y-auto scrollbar-industrial">
                  <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap break-words text-foreground/90">
                    {highlightVariables(p.prompt)}
                  </pre>
                </div>

                {/* Footer: Variables + Copy */}
                <div className="p-3 border-t border-border flex items-center justify-between gap-2">
                  <div className="flex gap-1 flex-wrap min-w-0">
                    {p.variables.map((v) => (
                      <span
                        key={v}
                        className="inline-block px-1.5 py-0.5 text-[10px] font-mono bg-primary/10 text-primary rounded-sm"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(p.id, p.prompt)}
                    className="shrink-0 font-mono text-xs h-7 gap-1.5"
                  >
                    {isCopied ? (
                      <>
                        <Check className="size-3 text-emerald-500" />
                        <span className="text-emerald-500">Скопировано</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        Копировать
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm font-mono">Промпты не найдены</p>
          <p className="text-xs font-mono mt-1">Попробуйте изменить фильтры или поисковый запрос</p>
        </div>
      )}
    </div>
  );
}
