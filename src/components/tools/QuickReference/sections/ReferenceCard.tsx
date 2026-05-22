'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { COMPLEXITY_MAP, COMPLEXITY_COLORS } from '../features/useReferenceFilter';
import type { LucideIcon } from 'lucide-react';

interface ReferenceCardProps {
  id: string;
  name: string;
  description: string;
  complexity: string;
  infrastructure: string;
  bestFor: string;
  color: string;
  icon: LucideIcon;
  isExpanded: boolean;
  onToggle: () => void;
  codeSnippet?: { title: string; code: string };
}

export function ReferenceCard({
  id,
  name,
  description,
  complexity,
  infrastructure,
  bestFor,
  color,
  icon: Icon,
  isExpanded,
  onToggle,
  codeSnippet,
}: ReferenceCardProps) {
  return (
    <div className="industrial-card overflow-hidden">
      <div className="p-5 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color}15`, color: color }}
            >
              <Icon className="size-5" />
            </div>
            <div>
              <div className="font-semibold text-foreground text-sm">{name}</div>
              <div className="text-xs text-muted-foreground">{description}</div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={COMPLEXITY_COLORS[COMPLEXITY_MAP[complexity]]}
          >
            Сложность: {COMPLEXITY_MAP[complexity]}
          </Badge>
          <Badge variant="outline" className="border-border text-muted-foreground">
            Инфраструктура: {infrastructure}
          </Badge>
        </div>

        {/* Best For */}
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground/60">Лучше всего для: </span>
          {bestFor}
        </div>

        {/* Expand toggle */}
        {codeSnippet && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="size-3.5" />
                Скрыть код
              </>
            ) : (
              <>
                <ChevronDown className="size-3.5" />
                Показать пример кода
              </>
            )}
          </Button>
        )}
      </div>

      {/* Code Snippet with Syntax Highlighting */}
      {isExpanded && codeSnippet && (
        <div className="border-t border-border">
          <CodeBlock
            code={codeSnippet.code}
            language="python"
            title={codeSnippet.title}
            showCopy={true}
            showLanguage={true}
            maxHeight="16rem"
            className="border-0 rounded-none"
          />
        </div>
      )}
    </div>
  );
}
