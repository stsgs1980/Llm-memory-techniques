'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ClipboardCheck,
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Trophy,
} from 'lucide-react';
import { QUESTIONS } from '@/data/recommender';
import { useRecommender } from '@/hooks/useRecommender';

export default function Recommender() {
  const {
    currentStep,
    currentQuestion,
    answers,
    showResults,
    totalQuestions,
    isCurrentAnswered,
    topResults,
    handleAnswer,
    handleNext,
    handleBack,
    handleReset,
  } = useRecommender();

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-primary tracking-wider">СОВЕТНИК</h2>
        <p className="text-muted-foreground text-sm">
          Ответьте на 6 вопросов — получите персональную рекомендацию по технике управления памятью
        </p>
      </div>

      {/* Progress Bar */}
      {!showResults && (
        <div className="industrial-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Прогресс</span>
            <span className="text-[10px] font-mono text-primary font-bold">{currentStep + 1} / {totalQuestions}</span>
          </div>
          <div className="h-2 bg-muted rounded-sm overflow-hidden">
            <div className="h-full bg-primary/70 rounded-sm transition-all duration-500" style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }} />
          </div>
          <div className="flex gap-1 mt-2">
            {QUESTIONS.map((q, i) => (
              <div key={q.id} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i < currentStep ? 'bg-primary' : i === currentStep ? 'bg-primary/50' : 'bg-muted'}`} />
            ))}
          </div>
        </div>
      )}

      {/* Questionnaire */}
      {!showResults && currentQuestion && (
        <div className="industrial-card p-6 animate-industrial-slide-up" key={currentStep}>
          <div className="flex items-center gap-3 mb-6">
            <div className="size-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ClipboardCheck className="size-4 text-primary" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Вопрос {currentStep + 1}</div>
              <h3 className="text-lg font-semibold font-mono">{currentQuestion.title}</h3>
            </div>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestion.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                  className={`industrial-btn w-full text-left group ${isSelected ? 'border-primary bg-primary/10 text-primary' : 'bg-background border-border hover:border-primary/50 hover:bg-primary/5'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`size-4 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30 group-hover:border-primary/50'}`}>
                        {isSelected && <div className="size-1.5 rounded-full bg-primary-foreground" />}
                      </div>
                      <div>
                        <div className={`font-medium text-sm transition-colors ${isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{opt.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="size-4 text-primary shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
            <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0} className="h-8 gap-1.5 text-muted-foreground">
              <span className="text-xs">Назад</span>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={handleReset} className="h-8 gap-1.5 text-muted-foreground">
                <RotateCcw className="size-3.5" />
                <span className="text-xs">Сброс</span>
              </Button>
              <Button onClick={handleNext} disabled={!isCurrentAnswered} className="h-8 gap-1.5">
                {currentStep === totalQuestions - 1 ? (
                  <><Sparkles className="size-3.5" /><span className="text-xs">Результат</span></>
                ) : (
                  <><span className="text-xs">Далее</span><ArrowRight className="size-3.5" /></>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && topResults.length > 0 && (
        <div className="space-y-6 animate-industrial-slide-up">
          {/* Best Match Card */}
          <div className="industrial-card p-6 industrial-glow relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Trophy className="size-5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-primary uppercase tracking-wider">Лучшее совпадение</div>
                <h3 className="text-xl font-bold font-mono text-primary">{topResults[0].name}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{topResults[0].reason}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className={topResults[0].complexity.color}>Сложность: {topResults[0].complexity.label}</Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Совпадение: {topResults[0].percent.toFixed(0)}%</Badge>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Экономия: {topResults[0].savings}</Badge>
            </div>
            <div className="mt-4">
              <div className="h-2 bg-muted rounded-sm overflow-hidden">
                <div className="h-full bg-primary rounded-sm transition-all duration-700" style={{ width: `${topResults[0].percent}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1">
                <span>Совпадение {topResults[0].percent.toFixed(0)}%</span>
                <span>Счёт: {topResults[0].score}/{topResults[0].maxScore}</span>
              </div>
            </div>
          </div>

          {/* All Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topResults.map((result, index) => {
              const Icon = result.icon;
              const isBest = index === 0;
              return (
                <div key={result.id} className={`industrial-card p-4 space-y-3 ${isBest ? 'border-primary/40' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`size-7 rounded-sm flex items-center justify-center ${isBest ? 'bg-primary/10 border border-primary/20' : 'bg-muted border border-border'}`}>
                        <Icon className={`size-4 ${isBest ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono font-bold ${isBest ? 'text-primary' : 'text-muted-foreground'}`}>#{index + 1}</span>
                        <h4 className="text-xs font-mono font-semibold">{result.name}</h4>
                      </div>
                    </div>
                    <span className={`text-lg font-bold font-mono ${isBest ? 'text-primary' : 'text-foreground/60'}`}>{result.percent.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-sm overflow-hidden">
                    <div className={`h-full rounded-sm transition-all duration-700 ${isBest ? 'bg-primary' : 'bg-primary/40'}`} style={{ width: `${result.percent}%` }} />
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">{result.reason}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={`text-[9px] ${result.complexity.color}`}>{result.complexity.label}</Badge>
                    <span className="text-[9px] font-mono text-emerald-500">−{result.savings}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button onClick={handleReset} variant="outline" className="gap-2 font-mono">
              <RotateCcw className="size-4" />
              Начать заново
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
