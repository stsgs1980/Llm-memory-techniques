import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RotateCcw } from 'lucide-react';
import type { Scenario } from '../features/useBattle';

type BattleScenarioProps = {
  scenario: Scenario;
  onScenarioChange: (scenario: Scenario) => void;
  onReset: () => void;
};

export function BattleScenario({ scenario, onScenarioChange, onReset }: BattleScenarioProps) {
  return (
    <div className="industrial-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          Параметры сценария
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-7 gap-1.5 text-muted-foreground"
        >
          <RotateCcw className="size-3.5" />
          <span className="text-xs">Сброс</span>
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-foreground/80">
            Длина диалога (сообщений)
          </label>
          <span className="text-xs font-mono text-primary">{scenario.length}</span>
        </div>
        <Slider
          value={[scenario.length]}
          onValueChange={([v]) => onScenarioChange({ ...scenario, length: v })}
          min={5}
          max={100}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-foreground/80">
            Среднее токенов / сообщение
          </label>
          <span className="text-xs font-mono text-primary">{scenario.tokensPerMsg}</span>
        </div>
        <Slider
          value={[scenario.tokensPerMsg]}
          onValueChange={([v]) => onScenarioChange({ ...scenario, tokensPerMsg: v })}
          min={50}
          max={500}
          step={10}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-foreground/80">
            Объём в месяц (запросов)
          </label>
          <span className="text-xs font-mono text-primary">
            {scenario.monthlyVolume.toLocaleString('ru-RU')}
          </span>
        </div>
        <Slider
          value={[scenario.monthlyVolume]}
          onValueChange={([v]) => onScenarioChange({ ...scenario, monthlyVolume: v })}
          min={100}
          max={50000}
          step={100}
        />
      </div>
    </div>
  );
}
