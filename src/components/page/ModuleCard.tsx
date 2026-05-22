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
    ? 'text-green-400 border-green-400/30'
    : module.difficulty === 'Средний'
      ? 'text-yellow-400 border-yellow-400/30'
      : 'text-red-400 border-red-400/30';

  return (
    <button onClick={onClick} className="vercel-card p-6 flex gap-4 items-start group text-left w-full hover:border-[#333333]">
      <div className="w-12 h-12 rounded-lg bg-[#111111] border border-[#222222] flex items-center justify-center shrink-0 group-hover:border-[#333333] transition-colors">
        <Icon className="w-5 h-5 text-[#a0a0a0]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs text-[#808080] font-mono">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="text-sm font-semibold text-white truncate">{module.title}</h3>
        </div>
        <p className="text-sm text-[#a0a0a0] leading-relaxed">{module.desc}</p>
        <div className="flex gap-2 mt-4">
          <span className={`px-3 py-1 text-xs font-medium border rounded-full ${diffColor}`}>{module.difficulty}</span>
          <span className="px-3 py-1 text-xs font-medium text-[#a0a0a0] border border-[#222222] rounded-full">{module.time}</span>
        </div>
      </div>
    </button>
  );
}

export function ToolQuickCard({ name, icon: Icon, onClick }: { name: string; icon: React.ElementType; onClick: () => void }) {
  return (
    <button onClick={onClick} className="vercel-card p-4 flex flex-col items-center gap-2 text-center cursor-pointer group w-full hover:border-[#333333]">
      <div className="w-8 h-8 rounded-lg bg-[#111111] border border-[#222222] flex items-center justify-center group-hover:border-[#333333] transition-colors">
        <Icon className="w-4 h-4 text-[#a0a0a0]" />
      </div>
      <span className="text-xs font-medium text-[#a0a0a0]">{name}</span>
    </button>
  );
}
