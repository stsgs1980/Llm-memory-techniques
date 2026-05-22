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
    <footer className="vercel-footer">
      <div className="vercel-footer-content">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-white" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
            <span className="text-lg font-semibold text-white">LLM Memory</span>
          </div>
          <p className="vercel-footer-brand">
            Interactive guide to LLM memory management. Six techniques, interactive demos, calculators and tools.
          </p>
        </div>

        {/* Techniques */}
        <div>
          <h4 className="vercel-footer-title">Techniques</h4>
          <div className="vercel-footer-links">
            {TECHNIQUES.slice(0, 4).map((tech) => (
              <button
                key={tech.id}
                onClick={() => handleTechniqueClick(tech.id)}
              >
                {tech.id}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="vercel-footer-title">Navigation</h4>
          <div className="vercel-footer-links">
            {FOOTER_NAV.map((link) => (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="vercel-footer-title">Legal</h4>
          <div className="vercel-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">License</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <span>© 2026 LLM Memory Guide</span>
        <span>Next.js · TypeScript · Tailwind</span>
        <span className="text-gray-400">Vercel Style</span>
      </div>
    </footer>
  );
}
