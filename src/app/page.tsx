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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Tab Navigation - Monolith Style */}
      <div className="fwd" />
      <nav className="sticky top-[60px] z-40 bg-bg/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1120px] mx-auto px-6 md:px-14">
          <div className="flex gap-1 overflow-x-auto -mb-px">
            {TAB_CONFIG.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)} 
                  className={`
                    px-4 py-3 text-xs font-sans font-light border-b transition-all whitespace-nowrap
                    ${isActive 
                      ? 'border-accent text-accent-bright' 
                      : 'border-transparent text-text-dim hover:text-text'
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-1 relative z-10">
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
