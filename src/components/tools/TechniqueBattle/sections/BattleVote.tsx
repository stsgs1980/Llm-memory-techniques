import { Button } from '@/components/ui/button';
import type { QuickBattle } from '../features/useBattle';

type BattleVoteProps = {
  battles: QuickBattle[];
  onSelect: (battle: QuickBattle) => void;
};

export function BattleVote({ battles, onSelect }: BattleVoteProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-xs font-mono text-muted-foreground self-center mr-1">
        Быстрая битва:
      </span>
      {battles.map((qb) => (
        <Button
          key={qb.label}
          variant="outline"
          size="sm"
          onClick={() => onSelect(qb)}
          className="text-xs"
        >
          {qb.label}
        </Button>
      ))}
    </div>
  );
}
