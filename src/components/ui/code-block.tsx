'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy, Check, Terminal } from 'lucide-react';
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
  glassmorphism?: boolean;
}

/* ────────────────────────────────────────────
   CodeBlock Component
   VS Code-style with glassmorphism
   Inspired by Vercel/Stripe documentation
   ──────────────────────────────────────────── */

export function CodeBlock({
  code,
  language = 'python',
  showCopy = true,
  showLanguage = true,
  className,
  maxHeight,
  title,
  glassmorphism = true,
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
        'rounded-lg overflow-hidden',
        glassmorphism ? 'glassmorphism-card' : 'bg-card border border-border',
        className
      )}
      role="figure"
      aria-label={title || `Код на языке ${languageLabel}`}
    >
      {/* Title Bar - macOS/VS Code style */}
      <div className={cn(
        'flex items-center justify-between px-4 py-2',
        glassmorphism
          ? 'bg-black/40 border-b border-white/5'
          : 'bg-muted/50 border-b border-border'
      )}>
        {/* Traffic lights */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 transition-all cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 transition-all cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#27CA40] hover:brightness-110 transition-all cursor-pointer" />
        </div>

        {/* Filename/Language */}
        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <Terminal className="size-3.5 text-primary" />
          <span className="text-xs font-mono text-muted-foreground">
            {title || `${language}.${language === 'python' ? 'py' : language === 'javascript' ? 'js' : language}`}
          </span>
        </div>

        {/* Copy button */}
        {showCopy && (
          <button
            onClick={handleCopy}
            className={cn(
              'flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono transition-all',
              copied
                ? 'text-terminal-green bg-terminal-green/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            )}
            aria-label={copied ? 'Код скопирован' : 'Копировать код'}
          >
            {copied ? (
              <>
                <Check className="size-3" />
                <span className="hidden sm:inline">Скопировано</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span className="hidden sm:inline">Копировать</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Code with Syntax Highlighting */}
      <div
        className="overflow-auto scrollbar-amber"
        style={{ maxHeight: maxHeight || '24rem' }}
      >
        <SyntaxHighlighter
          language={language}
          style={{}}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: glassmorphism ? 'transparent' : '#141414',
            borderRadius: 0,
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#4A4A4A',
            textAlign: 'right',
            userSelect: 'none',
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

      {/* Status bar */}
      <div className={cn(
        'flex items-center justify-between px-3 py-1 text-[10px] font-mono',
        glassmorphism
          ? 'bg-black/20 text-muted-foreground border-t border-white/5'
          : 'bg-muted/30 text-muted-foreground border-t border-border'
      )}>
        <div className="flex items-center gap-3">
          <span>{languageLabel}</span>
          <span>{code.split('\n').length} строк</span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span className="text-terminal-green">●</span>
        </div>
      </div>
    </div>
  );
}

export default CodeBlock;
