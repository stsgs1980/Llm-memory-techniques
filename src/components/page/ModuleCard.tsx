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
    ? { color: '#22C55E', border: 'rgba(34, 197, 94, 0.3)' }
    : module.difficulty === 'Средний'
      ? { color: '#F59E0B', border: 'rgba(245, 158, 11, 0.3)' }
      : { color: '#EF4444', border: 'rgba(239, 68, 68, 0.3)' };

  return (
    <button 
      onClick={onClick} 
      className="zai-card zai-card-lift"
      style={{
        padding: 'var(--zai-space-6)',
        display: 'flex',
        gap: 'var(--zai-space-4)',
        alignItems: 'flex-start',
        textAlign: 'left',
        width: '100%'
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 'var(--zai-radius-lg)',
        background: 'var(--zai-color-bg-secondary)',
        border: '1px solid var(--zai-color-border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Icon style={{ 
          width: 20, 
          height: 20, 
          color: 'var(--zai-color-text-muted)' 
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'var(--zai-space-3)',
          marginBottom: 'var(--zai-space-2)'
        }}>
          <span style={{
            fontSize: 'var(--zai-font-size-1)',
            fontFamily: 'var(--font-geist-mono)',
            color: 'var(--zai-color-text-muted)'
          }}>{String(index + 1).padStart(2, '0')}</span>
          <h3 style={{
            fontSize: 'var(--zai-font-size-2)',
            fontWeight: 600,
            color: 'var(--zai-color-text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>{module.title}</h3>
        </div>
        <p style={{
          fontSize: 'var(--zai-font-size-2)',
          color: 'var(--zai-color-text-secondary)',
          lineHeight: 1.6
        }}>{module.desc}</p>
        <div style={{ display: 'flex', gap: 'var(--zai-space-2)', marginTop: 'var(--zai-space-4)' }}>
          <span style={{
            padding: '4px var(--zai-space-3)',
            fontSize: 'var(--zai-font-size-1)',
            fontWeight: 500,
            color: diffColor.color,
            border: `1px solid ${diffColor.border}`,
            borderRadius: 'var(--zai-radius-full)'
          }}>{module.difficulty}</span>
          <span style={{
            padding: '4px var(--zai-space-3)',
            fontSize: 'var(--zai-font-size-1)',
            fontWeight: 500,
            color: 'var(--zai-color-text-muted)',
            background: 'var(--zai-color-bg-secondary)',
            border: '1px solid var(--zai-color-border-subtle)',
            borderRadius: 'var(--zai-radius-full)'
          }}>{module.time}</span>
        </div>
      </div>
    </button>
  );
}

export function ToolQuickCard({ name, icon: Icon, onClick }: { name: string; icon: React.ElementType; onClick: () => void }) {
  return (
    <button 
      onClick={onClick} 
      className="zai-card"
      style={{
        padding: 'var(--zai-space-4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--zai-space-2)',
        textAlign: 'center',
        cursor: 'pointer',
        width: '100%'
      }}
    >
      <div style={{
        width: 32,
        height: 32,
        borderRadius: 'var(--zai-radius-md)',
        background: 'var(--zai-color-bg-secondary)',
        border: '1px solid var(--zai-color-border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon style={{ 
          width: 16, 
          height: 16, 
          color: 'var(--zai-color-text-muted)' 
        }} />
      </div>
      <span style={{
        fontSize: 'var(--zai-font-size-1)',
        fontWeight: 500,
        color: 'var(--zai-color-text-muted)'
      }}>{name}</span>
    </button>
  );
}
