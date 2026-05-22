'use client';

import React from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useAppStore, type AppTab } from '@/lib/store';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const tabs: { id: AppTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'learn', label: 'Learn' },
  { id: 'tools', label: 'Tools' },
  { id: 'playground', label: 'Playground' },
  { id: 'resources', label: 'Resources' },
];

function MobileNav() {
  const { activeTab, setActiveTab } = useAppStore();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button 
          className="md:hidden p-2 text-[#a0a0a0] hover:text-white transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 bg-black border-[#1a1a1a]">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-white">
            Navigation
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOpen(false);
              }}
              className={`
                px-4 py-3 text-left transition-colors text-sm
                ${activeTab === tab.id
                  ? 'text-white bg-[#111111] rounded-lg'
                  : 'text-[#a0a0a0] hover:text-white hover:bg-[#111111]/50'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  const { activeTab, setActiveTab, setSearchOpen } = useAppStore();
  const isMobile = useIsMobile();

  return (
    <header className="vercel-nav">
      <a href="#" className="vercel-logo">
        <div className="vercel-logo-icon" />
        <span>LLM Memory</span>
      </a>
      
      {!isMobile && (
        <nav className="vercel-nav-links">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'active' : ''}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 text-[#a0a0a0] hover:text-white transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
        
        <button className="btn-primary hidden sm:inline-flex">
          Get Started
        </button>
        
        <MobileNav />
      </div>
    </header>
  );
}
