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
          className="md:hidden p-2"
          style={{ color: 'var(--zai-color-text-muted)' }}
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        style={{ 
          width: '288px',
          background: 'var(--zai-color-bg-secondary)',
          borderColor: 'var(--zai-color-border-subtle)'
        }}
      >
        <SheetHeader>
          <SheetTitle style={{ 
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--zai-font-size-5)',
            fontStyle: 'italic',
            color: 'var(--zai-color-text-primary)'
          }}>
            Navigation
          </SheetTitle>
        </SheetHeader>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--zai-space-1)', padding: '0 var(--zai-space-4)', marginTop: 'var(--zai-space-6)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOpen(false);
              }}
              style={{
                padding: 'var(--zai-space-3) var(--zai-space-4)',
                textAlign: 'left',
                transition: 'color var(--zai-duration-fast)',
                fontSize: 'var(--zai-font-size-2)',
                color: activeTab === tab.id 
                  ? 'var(--zai-color-text-primary)' 
                  : 'var(--zai-color-text-muted)',
                borderLeft: activeTab === tab.id 
                  ? '2px solid var(--zai-color-accent)' 
                  : 'none',
                paddingLeft: activeTab === tab.id 
                  ? 'var(--zai-space-3)' 
                  : 'var(--zai-space-4)',
                background: 'none',
                cursor: 'pointer'
              }}
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
    <header className="zai-nav">
      <a href="#" className="zai-logo">
        <div className="zai-logo-icon" />
        <span>LLM Memory</span>
      </a>
      
      {!isMobile && (
        <nav className="zai-nav-links">
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
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--zai-space-4)' }}>
        <button
          onClick={() => setSearchOpen(true)}
          style={{ 
            padding: 'var(--zai-space-2)',
            color: 'var(--zai-color-text-muted)',
            transition: 'color var(--zai-duration-fast)',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
        
        <button className="zai-btn-primary hidden sm:inline-flex">
          Get Started
        </button>
        
        <MobileNav />
      </div>
    </header>
  );
}
