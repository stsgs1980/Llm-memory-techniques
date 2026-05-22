import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────
   InlineCode - for inline code snippets
   WCAG AA compliant with good contrast
   ──────────────────────────────────────────── */

interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'amber' | 'cyan' | 'green';
}

export function InlineCode({
  children,
  className,
  variant = 'default',
}: InlineCodeProps) {
  const variantStyles = {
    default: 'bg-muted/60 text-foreground border-border',
    muted: 'bg-muted/40 text-muted-foreground border-border',
    amber: 'bg-primary/10 text-primary border-primary/30',
    cyan: 'bg-cyan/10 text-cyan border-cyan/30',
    green: 'bg-terminal-green/10 text-terminal-green border-terminal-green/30',
  };

  return (
    <code
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 rounded-sm border font-mono text-[0.875em] leading-none',
        'break-words hyphens-auto',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </code>
  );
}

export default InlineCode;
