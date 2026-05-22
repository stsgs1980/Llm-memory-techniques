'use client';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────
   Amber-Retro Syntax Highlighter Theme
   WCAG AA compliant colors
   ──────────────────────────────────────────── */

const amberRetroTheme: Record<string, React.CSSProperties> = {
  // Base
  'code[class*="language-"]': {
    color: '#E8DCC8',
    fontFamily: 'var(--font-geist-mono), "IBM Plex Mono", monospace',
    fontSize: '0.8125rem',
    lineHeight: '1.6',
    textShadow: 'none',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    tabSize: '2',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#E8DCC8',
    fontFamily: 'var(--font-geist-mono), "IBM Plex Mono", monospace',
    fontSize: '0.8125rem',
    lineHeight: '1.6',
    textShadow: 'none',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    tabSize: '2',
    hyphens: 'none',
    background: '#141414',
    margin: '0',
    overflow: 'auto',
    padding: '1rem',
  },
  // Comments - muted but readable (WCAG AA)
  comment: { color: '#7A6F5D', fontStyle: 'italic' },
  prolog: { color: '#7A6F5D', fontStyle: 'italic' },
  doctype: { color: '#7A6F5D', fontStyle: 'italic' },
  cdata: { color: '#7A6F5D', fontStyle: 'italic' },
  // Punctuation
  punctuation: { color: '#B8A060' },
  // Properties/Tags
  property: { color: '#FFB000' },
  tag: { color: '#FFB000' },
  boolean: { color: '#FFB000' },
  number: { color: '#FF8C00' },
  constant: { color: '#FF8C00' },
  symbol: { color: '#FFB000' },
  deleted: { color: '#FF4444' },
  // Strings
  string: { color: '#00FF88' },
  char: { color: '#00FF88' },
  regex: { color: '#00FF88' },
  inserted: { color: '#00FF88' },
  // Keywords/Functions
  atrule: { color: '#00FFFF' },
  attr: { color: '#00FFFF' },
  keyword: { color: '#00FFFF', fontWeight: '600' },
  'attr-name': { color: '#00FFFF' },
  selector: { color: '#00FFFF' },
  // Functions
  function: { color: '#FFB000' },
  'function-variable': { color: '#FFB000' },
  variable: { color: '#E8DCC8' },
  // Operators
  operator: { color: '#B8A060' },
  entity: { color: '#FFB000', cursor: 'help' },
  url: { color: '#00FF88' },
  // Backgrounds for selections
  'language-css .token.string': { color: '#00FF88' },
  'style .token.string': { color: '#00FF88' },
  // Bold for important elements
  important: { color: '#FFB000', fontWeight: '600' },
  bold: { fontWeight: '600' },
  italic: { fontStyle: 'italic' },
};

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
      // Fallback for older browsers
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

      {/* Code */}
      <div
        className="overflow-auto scrollbar-amber"
        style={{ maxHeight: maxHeight || '24rem' }}
      >
        <SyntaxHighlighter
          language={language}
          style={amberRetroTheme}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#141414',
            fontSize: '0.8125rem',
            lineHeight: '1.6',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-geist-mono), "IBM Plex Mono", monospace',
            },
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
