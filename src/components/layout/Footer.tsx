'use client';

import React from 'react';
import { useAppStore, type AppTab } from '@/lib/store';
import { TECHNIQUES } from '@/lib/constants';

const FOOTER_NAV: { label: string; tab: AppTab }[] = [
  { label: 'Overview', tab: 'overview' },
  { label: 'Learn', tab: 'learn' },
  { label: 'Tools', tab: 'tools' },
  { label: 'Playground', tab: 'playground' },
  { label: 'Resources', tab: 'resources' },
];

export function Footer() {
  const { setActiveTab, setSelectedTechnique } = useAppStore();

  const handleTechniqueClick = (techId: string) => {
    setSelectedTechnique(techId);
    setActiveTab('playground');
  };

  const handleNavClick = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="max-w-[1120px] mx-auto px-6 md:px-14 py-12 border-t border-line">
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-12">
        {/* Brand */}
        <div>
          <div className="font-serif text-lg italic text-text-dim mb-3">
            LLM<span className="text-accent-bright">Memory</span>
          </div>
          <p className="text-xs text-text-faint font-light leading-relaxed">
            Interactive guide to LLM memory management. Six techniques, interactive demos, calculators and tools.
          </p>
        </div>

        {/* Techniques */}
        <div>
          <strong className="block text-[10px] font-medium tracking-[0.12em] uppercase text-text-dim mb-4">
            Techniques
          </strong>
          <div className="space-y-1">
            {TECHNIQUES.slice(0, 4).map((tech) => (
              <button
                key={tech.id}
                onClick={() => handleTechniqueClick(tech.id)}
                className="block text-xs text-text-faint hover:text-text-dim transition-colors py-0.5"
              >
                {tech.id}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <strong className="block text-[10px] font-medium tracking-[0.12em] uppercase text-text-dim mb-4">
            Navigation
          </strong>
          <div className="space-y-1">
            {FOOTER_NAV.map((link) => (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className="block text-xs text-text-faint hover:text-text-dim transition-colors py-0.5"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <strong className="block text-[10px] font-medium tracking-[0.12em] uppercase text-text-dim mb-4">
            Legal
          </strong>
          <div className="space-y-1">
            <a href="#" className="block text-xs text-text-faint hover:text-text-dim transition-colors py-0.5">
              Privacy
            </a>
            <a href="#" className="block text-xs text-text-faint hover:text-text-dim transition-colors py-0.5">
              Terms
            </a>
            <a href="#" className="block text-xs text-text-faint hover:text-text-dim transition-colors py-0.5">
              License
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-line mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-xs text-text-faint font-light">
          2026 LLM Memory Guide
        </span>
        <span className="text-xs text-text-faint font-light">
          Next.js · TypeScript · Tailwind
        </span>
        <span className="text-xs text-accent-bright">
          Monolith v2
        </span>
      </div>
    </footer>
  );
}
