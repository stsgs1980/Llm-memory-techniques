'use client';

import { useTokenCalc } from './features/useTokenCalc';
import { CalculatorInput } from './sections/CalculatorInput';
import { CalculatorResult } from './sections/CalculatorResult';
import { CalculatorChart } from './sections/CalculatorChart';

export default function TokenCalculator() {
  const {
    text,
    setText,
    modelId,
    setModelId,
    copied,
    result,
    contextBars,
    handleCopy,
    handleClear,
  } = useTokenCalc();

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-primary tracking-wider">
          КАЛЬКУЛЯТОР ТОКЕНОВ
        </h2>
        <p className="text-muted-foreground text-sm">
          Вставьте текст для подсчёта токенов и оценки стоимости
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Panel — Input */}
        <CalculatorInput
          text={text}
          onTextChange={setText}
          modelId={modelId}
          onModelChange={setModelId}
          copied={copied}
          onCopy={handleCopy}
          onClear={handleClear}
          chars={result.chars}
          words={result.words}
          lines={result.lines}
          lang={result.lang}
          ratio={result.ratio}
        />

        {/* Right Panel — Results */}
        <div className="lg:col-span-2 space-y-4">
          <CalculatorResult result={result} />
          <CalculatorChart result={result} contextBars={contextBars} />
        </div>
      </div>
    </section>
  );
}
