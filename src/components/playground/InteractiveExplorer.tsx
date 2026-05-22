'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, SkipForward, Brain, Layers, Database, FileJson, Scissors, Zap } from 'lucide-react';
import { TECHNIQUES } from '@/lib/constants';
import { useInteractiveExplorer } from '@/hooks/useInteractiveExplorer';
import { allTechniqueSteps } from './visualizations';

const TECHNIQUE_ICONS = [Brain, Layers, Database, FileJson, Scissors, Zap];

export default function InteractiveExplorer() {
  const [selectedTechnique, setSelectedTechnique] = useState(0);
  const steps = allTechniqueSteps[selectedTechnique] || [];

  const {
    currentStep,
    isPlaying,
    handleNext,
    handlePrev,
    handleReset,
    togglePlay,
    setCurrentStep,
    setIsPlaying,
  } = useInteractiveExplorer(steps.length);

  const currentStepData = steps[currentStep] || steps[0];

  const handleTechniqueChange = (index: number) => {
    setSelectedTechnique(index);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Technique Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-industrial">
        {TECHNIQUES.map((t, i) => {
          const Icon = TECHNIQUE_ICONS[i];
          return (
            <Button
              key={t.id}
              variant={selectedTechnique === i ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTechniqueChange(i)}
              className={`flex-shrink-0 font-mono text-xs h-8 gap-1.5 ${
                selectedTechnique === i
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:border-primary/50'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.shortName}
            </Button>
          );
        })}
      </div>

      {/* Visualization Area */}
      <Card className="industrial-card flex-1 overflow-hidden">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-mono text-sm text-primary">
                {TECHNIQUES[selectedTechnique]?.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Шаг {currentStep + 1} из {steps.length}: {currentStepData.title}
              </p>
            </div>
            <Badge variant="outline" className="font-mono text-xs">
              {currentStep + 1}/{steps.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="animate-industrial-slide-up">
            <p className="text-sm text-muted-foreground mb-4">{currentStepData.description}</p>

            {/* Visualization */}
            <div className="bg-muted/20 border border-border rounded-md p-4 mb-4">
              {currentStepData.renderVisualization?.()}
            </div>

            {/* Token Counter */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">До:</span>
                <span className="text-amber-500">{currentStepData.tokensBefore?.toLocaleString()}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-emerald-500">После: {currentStepData.tokensAfter?.toLocaleString()}</span>
              </div>
              <div>
                {currentStepData.tokensAfter !== undefined && currentStepData.tokensBefore !== undefined && (
                  <span className={currentStepData.tokensAfter < currentStepData.tokensBefore ? 'text-emerald-500' : 'text-muted-foreground'}>
                    {currentStepData.tokensAfter < currentStepData.tokensBefore
                      ? `−${Math.round((1 - currentStepData.tokensAfter / currentStepData.tokensBefore) * 100)}%`
                      : '−0%'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" onClick={handleReset} className="font-mono text-xs">
          <RotateCcw className="h-4 w-4 mr-1" />
          Сброс
        </Button>
        <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentStep === 0} className="font-mono text-xs">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="default" size="sm" onClick={togglePlay} className="font-mono text-xs min-w-[80px]">
          {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
          {isPlaying ? 'Пауза' : 'Старт'}
        </Button>
        <Button variant="outline" size="sm" onClick={handleNext} disabled={currentStep >= steps.length - 1} className="font-mono text-xs">
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setCurrentStep(steps.length - 1);
            setIsPlaying(false);
          }}
          className="font-mono text-xs"
        >
          <SkipForward className="h-4 w-4 mr-1" />
          Конец
        </Button>
      </div>
    </div>
  );
}
