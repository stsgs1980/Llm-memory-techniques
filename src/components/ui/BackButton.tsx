'use client';

import { ArrowLeft, ArrowUp, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────
   BackButton Component
   Vercel/Stripe-inspired navigation
   ──────────────────────────────────────────── */

interface BackButtonProps {
  variant?: 'back' | 'top' | 'home';
  label?: string;
  onClick?: () => void;
  className?: string;
  showOnMobile?: boolean;
}

export function BackButton({
  variant = 'back',
  label,
  onClick,
  className,
  showOnMobile = true,
}: BackButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (variant === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (variant === 'home') {
      window.location.href = '/';
    } else {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const icons = {
    back: ArrowLeft,
    top: ArrowUp,
    home: Home,
  };

  const labels = {
    back: 'Назад',
    top: 'Наверх',
    home: 'Главная',
  };

  const Icon = icons[variant];
  const displayLabel = label || labels[variant];

  return (
    <button
      onClick={handleClick}
      className={cn(
        'group inline-flex items-center gap-2 px-3 py-2',
        'text-sm font-mono text-muted-foreground',
        'hover:text-primary transition-all duration-200',
        'rounded-md hover:bg-primary/5',
        'border border-transparent hover:border-primary/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        !showOnMobile && 'hidden sm:inline-flex',
        className
      )}
      aria-label={displayLabel}
    >
      <Icon className="size-4 transition-transform group-hover:-translate-x-0.5" />
      <span className="uppercase tracking-wider text-xs">{displayLabel}</span>
    </button>
  );
}

/* ────────────────────────────────────────────
   ScrollToTop Button
   Fixed position, appears on scroll
   ──────────────────────────────────────────── */

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

export function ScrollToTop({ threshold = 300, className }: ScrollToTopProps) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'w-10 h-10 rounded-full',
        'bg-card/80 backdrop-blur-md border border-border',
        'flex items-center justify-center',
        'text-muted-foreground hover:text-primary',
        'hover:border-primary/30 hover:bg-primary/5',
        'transition-all duration-200',
        'shadow-lg shadow-black/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      aria-label="Прокрутить наверх"
      style={{ opacity: 'var(--scroll-top-opacity, 0)', pointerEvents: 'var(--scroll-top-pointer, none)' }}
    >
      <ArrowUp className="size-4" />
    </button>
  );
}

/* ────────────────────────────────────────────
   Breadcrumb Navigation
   Vercel-style path navigation
   ──────────────────────────────────────────── */

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  return (
    <nav
      className={cn(
        'flex items-center gap-1 text-xs font-mono',
        className
      )}
      aria-label="Навигация"
    >
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && (
            <span className="text-border mx-1">/</span>
          )}
          {item.href || item.onClick ? (
            <button
              onClick={item.onClick}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-primary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default BackButton;
