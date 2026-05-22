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
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      
      {/* Tab Navigation - Vercel Style */}
      <div className="pt-16" />
      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 py-1">
            {TAB_CONFIG.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)} 
                  className={`
                    px-4 py-3 text-sm font-medium border-b-2 transition-all
                    ${isActive 
                      ? 'border-white text-white' 
                      : 'border-transparent text-gray-500 hover:text-gray-300'
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
      <main className="flex-1">
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
