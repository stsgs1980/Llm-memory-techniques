'use client';

import React from 'react';
import { Search, Compass, Menu, Layers, Terminal } from 'lucide-react';
import { useAppStore, type AppTab } from '@/lib/store';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const tabs: { id: AppTab; label: string }[] = [
  { id: 'overview', label: 'overview' },
  { id: 'learn', label: 'learn' },
  { id: 'tools', label: 'tools' },
  { id: 'playground', label: 'playground' },
  { id: 'resources', label: 'resources' },
];

function MobileNav() {
  const { activeTab, setActiveTab } = useAppStore();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-primary hover:text-primary hover:bg-primary/10">
          <Menu className="size-4" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 bg-card border-border">
        <SheetHeader>
          <SheetTitle className="font-mono text-sm tracking-wider text-primary">
            ./navigation
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOpen(false);
              }}
              className={`
                px-3 py-2.5 rounded-sm text-sm font-mono font-medium transition-colors text-left cursor-pointer border
                ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary border-primary'
                    : 'text-muted-foreground hover:text-primary hover:border-primary/50 border-transparent'
                }
              `}
            >
              <span className="text-terminal-green mr-2">$</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  const { setSearchOpen, setTourOpen } = useAppStore();
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top amber line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="flex items-center justify-between h-full px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 border border-primary flex items-center justify-center" style={{ boxShadow: '0 0 10px rgba(255, 176, 0, 0.3)' }}>
            <Layers className="size-4 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-primary text-sm amber-glow">
              llm-memory
            </span>
            <span className="text-muted-foreground text-xs tracking-widest uppercase hidden sm:inline font-mono">
              guide
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 font-mono"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="size-3.5" />
                  {!isMobile && (
                    <span className="hidden lg:inline">
                      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-card px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                        ⌘K
                      </kbd>
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-card border-border">
                <p className="font-mono text-xs">./search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                  onClick={() => setTourOpen(true)}
                >
                  <Compass className="size-3.5" />
                  <span className="sr-only">Tour</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-card border-border">
                <p className="font-mono text-xs">./tour</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Mobile hamburger */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
