import type { ReactNode } from 'react';

interface ReferenceGridProps {
  children: ReactNode;
}

export function ReferenceGrid({ children }: ReferenceGridProps) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

interface EmptyStateProps {
  show: boolean;
}

export function EmptyState({ show }: EmptyStateProps) {
  if (!show) return null;

  return (
    <div className="text-center py-12 text-muted-foreground text-sm">
      Нет техник, соответствующих выбранным фильтрам
    </div>
  );
}
