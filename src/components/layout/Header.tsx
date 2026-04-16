'use client';

import React from 'react';
import { Search, Compass, Menu } from 'lucide-react';
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
  { id: 'overview', label: 'Обзор' },
  { id: 'learn', label: 'Обучение' },
  { id: 'tools', label: 'Инструменты' },
  { id: 'playground', label: 'Песочница' },
  { id: 'resources', label: 'Ресурсы' },
];

function MobileNav() {
  const { activeTab, setActiveTab } = useAppStore();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-4" />
          <span className="sr-only">Меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="font-mono text-sm tracking-wider">
            Навигация
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
                px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left cursor-pointer
                ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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
  const { setSearchOpen, setTourOpen } = useAppStore();
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-full px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono font-bold text-primary text-sm">
            LLM MEM
          </span>
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-muted-foreground text-xs tracking-widest uppercase hidden sm:inline">
            GUIDE
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="size-3.5" />
                  {!isMobile && (
                    <span className="hidden lg:inline">
                      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                        ⌘K
                      </kbd>
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Глобальный поиск</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setTourOpen(true)}
                >
                  <Compass className="size-3.5" />
                  <span className="sr-only">Обзорный тур</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Обзорный тур</p>
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
