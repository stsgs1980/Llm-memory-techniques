'use client';

import { useBattle } from './features';
import {
  BattleHeader,
  BattleCard,
  VsBadge,
  BattleResults,
  BattleScenario,
  BattleVote,
} from './sections';

export default function TechniqueBattle() {
  const {
    leftTechnique,
    setLeftTechnique,
    rightTechnique,
    setRightTechnique,
    scenario,
    setScenario,
    leftMetrics,
    rightMetrics,
    battleResults,
    handleReset,
    quickBattles,
    handleQuickBattle,
  } = useBattle();

  return (
    <section className="space-y-6">
      <BattleHeader />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <BattleCard
          technique={leftTechnique}
          onTechniqueChange={setLeftTechnique}
          savingsPercent={Math.round(leftMetrics.savingsFactor * 100)}
        />
        <VsBadge />
        <BattleCard
          technique={rightTechnique}
          onTechniqueChange={setRightTechnique}
          savingsPercent={Math.round(rightMetrics.savingsFactor * 100)}
        />
      </div>

      <BattleResults left={battleResults.left} right={battleResults.right} />

      <BattleScenario
        scenario={scenario}
        onScenarioChange={setScenario}
        onReset={handleReset}
      />

      <BattleVote battles={quickBattles} onSelect={handleQuickBattle} />
    </section>
  );
}
