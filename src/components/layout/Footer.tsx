'use client';

import React from 'react';
import { useAppStore, type AppTab } from '@/lib/store';
import { TECHNIQUES } from '@/lib/constants';

const FOOTER_NAV: { label: string; tab: AppTab }[] = [
  { label: 'Обзор', tab: 'overview' },
  { label: 'Обучение', tab: 'learn' },
  { label: 'Инструменты', tab: 'tools' },
  { label: 'Песочница', tab: 'playground' },
  { label: 'Ресурсы', tab: 'resources' },
];

export function Footer() {
  const { setActiveTab, setSelectedTechnique } = useAppStore();

  const handleTechniqueClick = (techId: string) => {
    setSelectedTechnique(techId);
    setActiveTab('overview');
    // Scroll to technique overview section
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
    <footer className="mt-auto border-t border-border bg-card py-8 px-4 md:px-8">
      <div>
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - About */}
          <div className="space-y-3">
            <h3 className="font-mono text-sm font-bold tracking-wider text-foreground">
              LLM MEMORY GUIDE
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Интерактивный гид по управлению памятью LLM. 6 техник, 34 демо,
              калькуляторы и инструменты.
            </p>
          </div>

          {/* Column 2 - Techniques */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Техники
            </h4>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
              {TECHNIQUES.map((tech, i) => (
                <React.Fragment key={tech.id}>
                  <button
                    onClick={() => handleTechniqueClick(tech.id)}
                    className="hover:text-primary transition-colors cursor-pointer hover:underline underline-offset-2"
                  >
                    {tech.name}
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
            <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Навигация
            </h4>
            <ul className="space-y-1.5">
              {FOOTER_NAV.map((link) => (
                <li key={link.tab}>
                  <button
                    onClick={() => handleNavClick(link.tab)}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:underline underline-offset-2"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">
            2026 LLM Memory Guide
          </span>
          <span className="text-xs text-muted-foreground">
            Next.js 16 · TypeScript · Tailwind CSS
          </span>
          <span className="text-xs font-mono text-primary">
            Industrial Minimalism
          </span>
        </div>
      </div>
    </footer>
  );
}
