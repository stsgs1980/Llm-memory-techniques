'use client';

import React from 'react';
import { Search, Menu } from 'lucide-react';
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
          className="md:hidden p-2 text-text-dim hover:text-text transition-colors"
          aria-label="Menu"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 bg-bg-raised border-border">
        <SheetHeader>
          <SheetTitle className="font-serif text-lg italic text-text">
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
                px-4 py-3 text-left transition-colors font-sans text-sm
                ${activeTab === tab.id
                  ? 'text-accent-bright border-l-2 border-accent pl-3'
                  : 'text-text-dim hover:text-text'
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
    <header className="nav">
      <a href="#" className="logo">
        LLM<span>Memory</span>
      </a>
      
      {!isMobile && (
        <ul className="nav-links">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={activeTab === tab.id ? 'text-accent-bright' : ''}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 text-text-dim hover:text-text transition-colors"
          aria-label="Search"
        >
          <Search className="size-4" />
        </button>
        
        <button className="nav-cta hidden sm:inline-flex">
          Get Started
        </button>
        
        <MobileNav />
      </div>
    </header>
  );
}
