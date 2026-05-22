import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TECHNIQUES } from '@/lib/constants';
import { TECH_NAMES, TECH_COLORS, TECH_BG, getTechniqueIcon } from '../constants';

type BattleCardProps = {
  technique: string;
  onTechniqueChange: (value: string) => void;
  savingsPercent: number;
};

export function BattleCard({ technique, onTechniqueChange, savingsPercent }: BattleCardProps) {
  return (
    <div className="industrial-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Select value={technique} onValueChange={onTechniqueChange}>
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Без управления</SelectItem>
            {TECHNIQUES.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="text-center space-y-2">
        <div className={`inline-flex size-12 rounded-lg ${TECH_BG[technique]} ${TECH_COLORS[technique]} items-center justify-center`}>
          {getTechniqueIcon(technique) || <span className="text-lg">?</span>}
        </div>
        <div className={`text-lg font-bold ${TECH_COLORS[technique]}`}>
          {TECH_NAMES[technique]}
        </div>
        <div className="text-[10px] font-mono text-muted-foreground">
          Экономия {savingsPercent}%
        </div>
      </div>
    </div>
  );
}
