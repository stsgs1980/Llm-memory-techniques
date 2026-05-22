'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────
   Language map for display
   ──────────────────────────────────────────── */

const LANGUAGE_LABELS: Record<string, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  bash: 'Bash',
  json: 'JSON',
  css: 'CSS',
  html: 'HTML',
  markdown: 'MD',
  text: 'TXT',
};

/* ────────────────────────────────────────────
   Props interface
   ──────────────────────────────────────────── */

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  showLanguage?: boolean;
  className?: string;
  maxHeight?: string;
  title?: string;
}

/* ────────────────────────────────────────────
   CodeBlock Component
   Uses CSS classes from globals.css for theming
   ──────────────────────────────────────────── */

export function CodeBlock({
  code,
  language = 'python',
  showCopy = true,
  showLanguage = true,
  className,
  maxHeight,
  title,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  const languageLabel = LANGUAGE_LABELS[language] || language.toUpperCase();

  return (
    <div
      className={cn(
        'rounded-sm border border-border overflow-hidden bg-card',
        className
      )}
      role="figure"
      aria-label={title || `Код на языке ${languageLabel}`}
    >
      {/* Header */}
      {(showLanguage || showCopy || title) && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            {title ? (
              <span className="text-xs font-mono text-foreground font-medium">
                {title}
              </span>
            ) : showLanguage ? (
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                {languageLabel}
              </span>
            ) : null}
          </div>
          {showCopy && (
            <button
              onClick={handleCopy}
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded-sm text-xs font-mono transition-colors',
                'hover:bg-background/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                copied
                  ? 'text-terminal-green'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label={copied ? 'Код скопирован' : 'Копировать код'}
            >
              {copied ? (
                <>
                  <Check className="size-3" aria-hidden="true" />
                  <span>Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" aria-hidden="true" />
                  <span>Копировать</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Code with Syntax Highlighting */}
      <div
        className="overflow-auto scrollbar-amber"
        style={{ maxHeight: maxHeight || '24rem' }}
      >
        <SyntaxHighlighter
          language={language}
          // Using empty object - CSS classes from globals.css handle theming
          style={{}}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#141414',
            borderRadius: 0,
          }}
          codeTagProps={{
            className: 'language-' + language,
          }}
          PreTag="div"
          CodeTag="code"
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeBlock;
