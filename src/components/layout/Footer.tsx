'use client';

import React from 'react';
import { useAppStore, type AppTab } from '@/lib/store';
import { TECHNIQUES } from '@/lib/constants';

const FOOTER_NAV: { label: string; tab: AppTab }[] = [
  { label: 'overview', tab: 'overview' },
  { label: 'learn', tab: 'learn' },
  { label: 'tools', tab: 'tools' },
  { label: 'playground', tab: 'playground' },
  { label: 'resources', tab: 'resources' },
];

export function Footer() {
  const { setActiveTab, setSelectedTechnique } = useAppStore();

  const handleTechniqueClick = (techId: string) => {
    setSelectedTechnique(techId);
    setActiveTab('overview');
    setTimeout(() => {
      const el = document.getElementById('technique-overview');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavClick = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto border-t border-border bg-card py-8 px-4 md:px-8 relative">
      {/* Top amber line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div>
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - About */}
          <div className="space-y-3">
            <h3 className="font-mono text-sm font-bold tracking-wider text-primary">
              ./llm-memory-guide
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-mono">
              Interactive terminal guide to LLM memory management. 6 techniques, 34 demos, calculators and tools.
            </p>
          </div>

          {/* Column 2 - Techniques */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
              ./techniques
            </h4>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground font-mono">
              {TECHNIQUES.map((tech, i) => (
                <React.Fragment key={tech.id}>
                  <button
                    onClick={() => handleTechniqueClick(tech.id)}
                    className="hover:text-primary transition-colors cursor-pointer hover:underline underline-offset-2"
                  >
                    {tech.id}
                  </button>
                  {i < TECHNIQUES.length - 1 && (
                    <span className="text-border">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Column 3 - Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
              ./navigation
            </h4>
            <ul className="space-y-1.5">
              {FOOTER_NAV.map((link) => (
                <li key={link.tab}>
                  <button
                    onClick={() => handleNavClick(link.tab)}
                    className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <span className="text-terminal-green mr-1">$</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground font-mono">
            2026 llm-memory-guide
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            Next.js 16 · TypeScript · Tailwind CSS
          </span>
          <span className="text-xs font-mono text-primary">
            Amber-Retro Terminal
          </span>
        </div>
      </div>
    </footer>
  );
}
