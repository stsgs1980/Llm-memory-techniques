'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy, Check, Play, RefreshCw, Maximize2, Minimize2, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────
   VS Code-Style Code Editor
   Glassmorphism + Live Preview
   Inspired by Vercel/Stripe documentation
   ──────────────────────────────────────────── */

interface VSCodeEditorProps {
  code: string;
  language?: string;
  title?: string;
  filename?: string;
  showLineNumbers?: boolean;
  showCopy?: boolean;
  showRun?: boolean;
  onRun?: () => void;
  maxHeight?: string;
  className?: string;
  editable?: boolean;
  onChange?: (code: string) => void;
  preview?: React.ReactNode;
  glassmorphism?: boolean;
}

export function VSCodeEditor({
  code,
  language = 'python',
  title,
  filename,
  showLineNumbers = true,
  showCopy = true,
  showRun = false,
  onRun,
  maxHeight = '24rem',
  className,
  editable = false,
  onChange,
  preview,
  glassmorphism = true,
}: VSCodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const editorRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  }, [code]);

  // File extension from language
  const extensions: Record<string, string> = {
    python: '.py',
    javascript: '.js',
    typescript: '.ts',
    bash: '.sh',
    json: '.json',
    css: '.css',
    html: '.html',
    markdown: '.md',
  };

  const displayFilename = filename || `${language}${extensions[language] || '.txt'}`;

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden',
        glassmorphism && 'glassmorphism-card',
        !glassmorphism && 'bg-card border border-border',
        fullscreen && 'fixed inset-4 z-50',
        className
      )}
      role="figure"
      aria-label={title || `Код на языке ${language}`}
    >
      {/* Title Bar - macOS style */}
      <div className={cn(
        'flex items-center justify-between px-4 py-2',
        glassmorphism
          ? 'bg-black/40 border-b border-white/5'
          : 'bg-muted/50 border-b border-border'
      )}>
        {/* Traffic lights */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 transition-all" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 transition-all" />
          <div className="w-3 h-3 rounded-full bg-[#27CA40] hover:brightness-110 transition-all" />
        </div>

        {/* Filename */}
        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <Terminal className="size-3.5 text-primary" />
          <span className="text-xs font-mono text-muted-foreground">
            {displayFilename}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {showRun && (
            <button
              onClick={onRun}
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono transition-all',
                'text-terminal-green hover:bg-terminal-green/10',
                'border border-terminal-green/20 hover:border-terminal-green/40'
              )}
              aria-label="Выполнить код"
            >
              <Play className="size-3" />
              <span>Run</span>
            </button>
          )}
          {showCopy && (
            <button
              onClick={handleCopy}
              className={cn(
                'p-1.5 rounded transition-all',
                copied
                  ? 'text-terminal-green bg-terminal-green/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
              aria-label={copied ? 'Скопировано' : 'Копировать'}
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </button>
          )}
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className={cn(
              'p-1.5 rounded transition-all',
              'text-muted-foreground hover:text-foreground hover:bg-white/5'
            )}
            aria-label={fullscreen ? 'Свернуть' : 'Развернуть'}
          >
            {fullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
          </button>
        </div>
      </div>

      {/* Tabs (if preview exists) */}
      {preview && (
        <div className={cn(
          'flex items-center border-b',
          glassmorphism
            ? 'bg-black/20 border-white/5'
            : 'bg-muted/30 border-border'
        )}>
          <button
            onClick={() => setActiveTab('code')}
            className={cn(
              'px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all',
              activeTab === 'code'
                ? 'text-primary border-b-2 border-primary bg-primary/5'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Code
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={cn(
              'px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all',
              activeTab === 'preview'
                ? 'text-primary border-b-2 border-primary bg-primary/5'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Preview
          </button>
        </div>
      )}

      {/* Code / Preview Content */}
      <div ref={editorRef} className="relative">
        {activeTab === 'code' ? (
          <div
            className="overflow-auto scrollbar-amber"
            style={{ maxHeight: fullscreen ? 'calc(100vh - 10rem)' : maxHeight }}
          >
            <SyntaxHighlighter
              language={language}
              style={{}}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: glassmorphism ? 'transparent' : '#141414',
                borderRadius: 0,
                fontSize: '0.8125rem',
                lineHeight: '1.6',
              }}
              showLineNumbers={showLineNumbers}
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
        ) : (
          <div
            className={cn(
              'p-4',
              glassmorphism ? 'bg-black/20' : 'bg-muted/30'
            )}
            style={{ maxHeight: fullscreen ? 'calc(100vh - 10rem)' : maxHeight, overflow: 'auto' }}
          >
            {preview}
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Live Code Preview Panel
   Side-by-side code and output
   ──────────────────────────────────────────── */

interface LiveCodePreviewProps {
  code: string;
  language?: string;
  output?: React.ReactNode;
  title?: string;
  className?: string;
}

export function LiveCodePreview({
  code,
  language = 'python',
  output,
  title,
  className,
}: LiveCodePreviewProps) {
  return (
    <div className={cn('grid md:grid-cols-2 gap-4', className)}>
      {/* Code Editor */}
      <VSCodeEditor
        code={code}
        language={language}
        title={title}
        glassmorphism
        maxHeight="20rem"
      />

      {/* Output Panel */}
      <div className="glassmorphism-card rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-terminal-green animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Output
          </span>
        </div>
        <div className="p-4 text-sm font-mono text-secondary-foreground bg-black/20 min-h-[12rem]">
          {output || (
            <span className="text-muted-foreground italic">Запустите код для просмотра результата...</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Inline Code Snippet
   For small code pieces in documentation
   ──────────────────────────────────────────── */

interface InlineSnippetProps {
  children: string;
  language?: string;
  className?: string;
}

export function InlineSnippet({ children, className }: InlineSnippetProps) {
  return (
    <code
      className={cn(
        'px-1.5 py-0.5 rounded',
        'bg-primary/10 border border-primary/20',
        'text-primary text-[0.8em] font-mono',
        className
      )}
    >
      {children}
    </code>
  );
}

export default VSCodeEditor;
