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
    <footer className="zai-footer">
      <div className="zai-footer-content">
        {/* Brand */}
        <div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--zai-space-3)',
            marginBottom: 'var(--zai-space-4)'
          }}>
            <div style={{
              width: 24,
              height: 24,
              background: 'var(--zai-color-accent)',
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
            }} />
            <span style={{
              fontSize: 'var(--zai-font-size-4)',
              fontWeight: 600,
              color: 'var(--zai-color-text-primary)'
            }}>LLM Memory</span>
          </div>
          <p className="zai-footer-brand">
            Interactive guide to LLM memory management. Six techniques, interactive demos, calculators and tools.
          </p>
        </div>

        {/* Techniques */}
        <div>
          <h4 className="zai-footer-title">Techniques</h4>
          <div className="zai-footer-links">
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
          <h4 className="zai-footer-title">Navigation</h4>
          <div className="zai-footer-links">
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
          <h4 className="zai-footer-title">Legal</h4>
          <div className="zai-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">License</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{
        maxWidth: '1200px',
        margin: 'var(--zai-space-8) auto 0',
        paddingTop: 'var(--zai-space-8)',
        borderTop: '1px solid var(--zai-color-border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--zai-space-4)',
        fontSize: 'var(--zai-font-size-2)',
        color: 'var(--zai-color-text-muted)'
      }}>
        <span>© 2026 LLM Memory Guide</span>
        <span>Next.js · TypeScript · Tailwind</span>
        <span style={{ color: 'var(--zai-color-text-secondary)' }}>ZAI UI-Kit</span>
      </div>
    </footer>
  );
}
