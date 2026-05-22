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
      
      {/* Tab Navigation - Terminal Style */}
      <nav className="border-b border-border bg-card/30 sticky top-14 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0.5 overflow-x-auto scrollbar-amber -mb-px">
            {TAB_CONFIG.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)} 
                  className={`
                    flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap
                    ${isActive 
                      ? 'border-primary text-primary bg-primary/5' 
                      : 'border-transparent text-muted-foreground hover:text-primary hover:border-primary/30'
                    }
                  `}
                >
                  <Icon className="size-3.5" />
                  <span>{tab.id}</span>
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
