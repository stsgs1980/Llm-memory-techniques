'use client';

import { useCostSimulator } from '@/hooks/useCostSimulator';
import SimulatorInput from './sections/SimulatorInput';
import SimulatorOutput from './sections/SimulatorOutput';
import SimulatorChart from './sections/SimulatorChart';

export default function CostSimulator() {
  const {
    modelId,
    techniqueId,
    messagesPerDay,
    avgTokensPerMsg,
    daysPeriod,
    results,
    barWidths,
    setModelId,
    setTechniqueId,
    setMessagesPerDay,
    setAvgTokensPerMsg,
    setDaysPeriod,
    handleReset,
  } = useCostSimulator();

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-primary tracking-wider">
          СИМУЛЯТОР ЗАТРАТ
        </h2>
        <p className="text-muted-foreground text-sm">
          Настройте параметры и узнайте, сколько вы можете сэкономить
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {/* Left Panel - Controls */}
        <SimulatorInput
          modelId={modelId}
          techniqueId={techniqueId}
          messagesPerDay={messagesPerDay}
          avgTokensPerMsg={avgTokensPerMsg}
          daysPeriod={daysPeriod}
          onModelChange={setModelId}
          onTechniqueChange={setTechniqueId}
          onMessagesPerDayChange={setMessagesPerDay}
          onAvgTokensPerMsgChange={setAvgTokensPerMsg}
          onDaysPeriodChange={setDaysPeriod}
          onReset={handleReset}
        />

        {/* Right Panel - Results */}
        <div className="md:col-span-3 space-y-4">
          <SimulatorOutput results={results} />
          <SimulatorChart
            results={results}
            barWidths={barWidths}
            daysPeriod={daysPeriod}
          />
        </div>
      </div>
    </section>
  );
}
