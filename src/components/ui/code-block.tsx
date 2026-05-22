'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────
   Amber-Retro Syntax Highlighter Theme
   Based on VSC Dark Plus with Amber-Retro colors
   ──────────────────────────────────────────── */

const amberRetroTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#141414',
    color: '#E8DCC8',
    fontFamily: 'var(--font-geist-mono), "IBM Plex Mono", monospace',
    fontSize: '0.8125rem',
    lineHeight: '1.6',
    margin: 0,
    padding: '1rem',
    borderRadius: 0,
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: 'transparent',
    color: '#E8DCC8',
    fontFamily: 'var(--font-geist-mono), "IBM Plex Mono", monospace',
    fontSize: '0.8125rem',
    lineHeight: '1.6',
    textShadow: 'none',
  },
  // Comments
  comment: { color: '#6B705C', fontStyle: 'italic' },
  prolog: { color: '#6B705C', fontStyle: 'italic' },
  doctype: { color: '#6B705C', fontStyle: 'italic' },
  cdata: { color: '#6B705C', fontStyle: 'italic' },
  // Punctuation
  punctuation: { color: '#B8A060' },
  // Keywords: def, class, if, else, return, import, from, etc.
  keyword: { color: '#00FFFF', fontWeight: '600' },
  'keyword.module': { color: '#00FFFF' },
  'keyword.control': { color: '#00FFFF' },
  'keyword.operator': { color: '#00FFFF' },
  'keyword.other': { color: '#00FFFF' },
  // Built-ins: len, print, list, dict, etc.
  builtin: { color: '#FFB000' },
  'builtin.function': { color: '#FFB000' },
  'builtin.type': { color: '#FFB000' },
  // Functions: def names
  function: { color: '#FFB000', fontWeight: '500' },
  'function.definition': { color: '#FFB000' },
  'function.call': { color: '#FFB000' },
  // Strings
  string: { color: '#00FF88' },
  'string.quoted': { color: '#00FF88' },
  'string.template': { color: '#00FF88' },
  // Numbers
  number: { color: '#FF8C00' },
  'number.integer': { color: '#FF8C00' },
  'number.float': { color: '#FF8C00' },
  // Operators
  operator: { color: '#B8A060' },
  'operator.assignment': { color: '#B8A060' },
  'operator.arithmetic': { color: '#B8A060' },
  'operator.comparison': { color: '#B8A060' },
  // Variables
  variable: { color: '#E8DCC8' },
  'variable.parameter': { color: '#FFB000' },
  'variable.other': { color: '#E8DCC8' },
  // Class names
  'class-name': { color: '#00FFFF' },
  'class.definition': { color: '#00FFFF' },
  // Property
  property: { color: '#FFB000' },
  // Constants
  constant: { color: '#FF8C00' },
  'constant.language': { color: '#00FFFF' },
  'constant.numeric': { color: '#FF8C00' },
  // Decorators
  decorator: { color: '#FFB000' },
  annotation: { color: '#FFB000' },
  // Special
  important: { color: '#FFB000', fontWeight: '600' },
  // Boolean
  boolean: { color: '#00FFFF' },
  // Null/None
  'constant.language.null': { color: '#00FFFF' },
  // Imports
  'namespace': { color: '#E8DCC8' },
  'module': { color: '#E8DCC8' },
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
          style={amberRetroTheme}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#141414',
            fontSize: '0.8125rem',
            lineHeight: '1.6',
            borderRadius: 0,
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
