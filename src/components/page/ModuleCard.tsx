'use client';

import { LEARNING_MODULES } from '@/data/navigation';

interface ModuleCardProps {
  module: (typeof LEARNING_MODULES)[number];
  index: number;
  onClick: () => void;
}

export function ModuleCard({ module, index, onClick }: ModuleCardProps) {
  const Icon = module.icon;
  const diffColor = module.difficulty === 'Базовый' || module.difficulty === 'Начинающий'
    ? 'border-emerald-500/30 text-emerald-500'
    : module.difficulty === 'Средний'
      ? 'border-amber-500/30 text-amber-500'
      : 'border-red-500/30 text-red-500';

  return (
    <button onClick={onClick} className="industrial-card p-5 flex gap-4 items-start group hover:border-primary/40 text-left w-full">
      <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <Icon className="size-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="font-mono text-sm font-semibold truncate">{module.title}</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{module.desc}</p>
        <div className="flex gap-2 mt-3">
          <span className={`industrial-badge border ${diffColor}`}>{module.difficulty}</span>
          <span className="industrial-badge border border-border text-muted-foreground">{module.time}</span>
        </div>
      </div>
    </button>
  );
}

export function ToolQuickCard({ name, icon: Icon, onClick }: { name: string; icon: React.ElementType; onClick: () => void }) {
  return (
    <button onClick={onClick} className="industrial-card p-3 flex flex-col items-center gap-2 text-center cursor-pointer group w-full">
      <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="size-4 text-primary" />
      </div>
      <span className="text-xs font-mono font-medium">{name}</span>
    </button>
  );
}
