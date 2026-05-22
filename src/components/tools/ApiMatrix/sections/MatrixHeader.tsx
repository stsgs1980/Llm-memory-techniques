import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface MatrixHeaderProps {
  onReset: () => void;
}

export function MatrixHeader({ onReset }: MatrixHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-primary tracking-wider">
          API МАТРИЦА
        </h2>
        <p className="text-muted-foreground text-sm">
          Сравнение провайдеров LLM: цены, контекст, возможности
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground shrink-0"
      >
        <RotateCcw className="size-3.5" />
        Сброс
      </Button>
    </div>
  );
}
