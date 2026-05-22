'use client';

import { useEffect, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OverviewTab, LearnTab, ToolsTab, PlaygroundTab, ResourcesTab } from '@/components/page/TabComponents';
import GlobalSearch from '@/components/overlay/GlobalSearch';
import GuidedTour from '@/components/overlay/GuidedTour';
import { TAB_CONFIG } from '@/data/navigation';

export default function Home() {
  const { activeTab, setActiveTab, setSearchOpen } = useAppStore();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen(true);
    }
  }, [setSearchOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="zai-page-shell">
      <Header />
      
      {/* Tab Navigation */}
      <div style={{ paddingTop: '64px' }} />
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'var(--zai-glass-bg)',
        backdropFilter: 'blur(var(--zai-glass-blur))',
        borderBottom: '1px solid var(--zai-color-border-subtle)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 var(--zai-space-8)'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--zai-space-1)', 
            padding: 'var(--zai-space-1) 0' 
          }}>
            {TAB_CONFIG.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)} 
                  style={{
                    padding: 'var(--zai-space-3) var(--zai-space-4)',
                    fontSize: 'var(--zai-font-size-2)',
                    fontWeight: 500,
                    border: 'none',
                    borderBottom: '2px solid',
                    borderColor: isActive ? 'var(--zai-color-accent)' : 'transparent',
                    color: isActive ? 'var(--zai-color-text-primary)' : 'var(--zai-color-text-muted)',
                    background: 'none',
                    cursor: 'pointer',
                    transition: 'all var(--zai-duration-fast)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main id="main-content" style={{ flex: 1 }}>
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'learn' && <LearnTab />}
        {activeTab === 'tools' && <ToolsTab />}
        {activeTab === 'playground' && <PlaygroundTab />}
        {activeTab === 'resources' && <ResourcesTab />}
      </main>
      
      <Footer />
      <GlobalSearch />
      <GuidedTour />
    </div>
  );
}
