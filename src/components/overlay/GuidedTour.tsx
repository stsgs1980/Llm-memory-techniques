'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppStore, type AppTab } from '@/lib/store';
import type { LucideIcon } from 'lucide-react';
import {
  BookMarked,
  GraduationCap,
  Wrench,
  Play,
  Library,
  Rocket,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';

/* ────────────────────────────────────────────
   Tour step definition
   ──────────────────────────────────────────── */
interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tab: AppTab;
  accentColor: string;
}

/* ────────────────────────────────────────────
   Tour steps
   ──────────────────────────────────────────── */
const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: 'Добро пожаловать в LLM Memory Guide',
    description:
      'Интерактивный справочник по техникам управления памятью для больших языковых моделей. Здесь вы найдёте 6 техник, от простых до продвинутых, с визуализациями, калькуляторами и живыми примерами. Давайте познакомимся!',
    icon: Sparkles,
    tab: 'overview',
    accentColor: 'text-amber-500',
  },
  {
    id: 'techniques',
    title: '6 Техник Управления Памятью',
    description:
      'Sliding Window, Суммаризация, Иерархическая память, RAG, Извлечение фактов и Семантический кэш. Каждая техника имеет свою сложность, экономию токенов и область применения. Изучите их пошагово с интерактивными визуализациями.',
    icon: GraduationCap,
    tab: 'learn',
    accentColor: 'text-cyan-500',
  },
  {
    id: 'tools',
    title: 'Интерактивные Инструменты',
    description:
      'Симулятор затрат — рассчитайте стоимость API для вашего проекта. Битва техник — сравните подходы 1v1. Дерево решений — выберите оптимальную технику по сценарию. Бенчмарки — сравнение по ключевым метрикам.',
    icon: Wrench,
    tab: 'tools',
    accentColor: 'text-emerald-500',
  },
  {
    id: 'playground',
    title: 'Живая Песочница',
    description:
      'Попробуйте каждую технику в действии! Переключайте подходы в реальном чате и наблюдайте, как меняется поведение модели. Пошаговый проводник покажет внутреннюю механику каждого метода.',
    icon: Play,
    tab: 'playground',
    accentColor: 'text-violet-500',
  },
  {
    id: 'resources',
    title: 'Ресурсы и Сообщество',
    description:
      'Глоссарий из 12+ терминов, FAQ с 8 популярными вопросами, дорожная карта развития памяти LLM и советы от сообщества. Всё, что нужно для глубокого погружения.',
    icon: Library,
    tab: 'resources',
    accentColor: 'text-orange-500',
  },
  {
    id: 'complete',
    title: 'Вы готовы!',
    description:
      'Теперь вы знаете всё о навигации и возможностях LLM Memory Guide. Используйте ⌘K для быстрого поиска по всему приложению. Начните с раздела «Обучение» или сразу перейдите к инструментам. Удачи в освоении!',
    icon: Rocket,
    tab: 'overview',
    accentColor: 'text-primary',
  },
];

const TOTAL_STEPS = TOUR_STEPS.length;

/* ────────────────────────────────────────────
   GuidedTour component
   ──────────────────────────────────────────── */
export default function GuidedTour() {
  const { tourOpen, setTourOpen, setTourCompleted, setActiveTab } = useAppStore();
  const [currentStep, setCurrentStep] = useState(0);

  const step = TOUR_STEPS[currentStep];
  const StepIcon = step.icon;
  const isFirst = currentStep === 0;
  const isLast = currentStep === TOTAL_STEPS - 1;

  // Navigate to the corresponding tab when step changes
  useEffect(() => {
    if (tourOpen) {
      setActiveTab(step.tab);
    }
  }, [currentStep, tourOpen, step.tab, setActiveTab]);

  // Reset step when tour opens (via dialog onOpenChange)
  const handleOpenChange = useCallback(
    (open: boolean) => {
      setTourOpen(open);
      if (open) {
        setCurrentStep(0);
      }
    },
    [setTourOpen],
  );

  const goNext = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setTourCompleted(true);
    }
  }, [currentStep, setTourCompleted]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    setTourCompleted(true);
  }, [setTourCompleted]);

  return (
    <Dialog open={tourOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-md industrial-card border-border p-0 overflow-hidden"
        showCloseButton={false}
      >
        {/* Header band */}
        <div className="relative border-b border-border">
          {/* Decorative top accent line */}
          <div className="h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

          <div className="px-6 pt-6 pb-4">
            <DialogHeader className="text-left space-y-0">
              {/* Step counter */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Тур · Шаг {currentStep + 1}/{TOTAL_STEPS}
                </span>
                <button
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm hover:bg-muted"
                  aria-label="Закрыть тур"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              {/* Title + Icon */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <StepIcon className={`size-5 ${step.accentColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <DialogTitle className="font-mono text-base font-semibold leading-tight">
                    {step.title}
                  </DialogTitle>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Progress bar */}
          <div className="px-6 pb-0">
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed font-sans">
            {step.description}
          </DialogDescription>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {TOUR_STEPS.map((s, i) => {
              const SIcon = s.icon;
              const isActive = i === currentStep;
              const isCompleted = i < currentStep;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(i)}
                  className={`
                    flex items-center justify-center rounded-sm border transition-all duration-200
                    ${
                      isActive
                        ? 'w-8 h-8 bg-primary/10 border-primary/40 shadow-sm'
                        : isCompleted
                          ? 'w-7 h-7 bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10'
                          : 'w-6 h-6 bg-muted/30 border-border cursor-pointer hover:bg-muted/60'
                    }
                  `}
                  aria-label={`Перейти к шагу ${i + 1}: ${s.title}`}
                >
                  <SIcon
                    className={`transition-all duration-200 ${
                      isActive
                        ? `size-4 ${s.accentColor}`
                        : isCompleted
                          ? 'size-3 text-primary/50'
                          : 'size-2.5 text-muted-foreground/40'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={goPrev}
            disabled={isFirst}
            className="gap-1.5 text-xs font-mono disabled:opacity-30"
          >
            <ChevronLeft className="size-3.5" />
            Назад
          </Button>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-xs font-mono text-muted-foreground hover:text-foreground"
              >
                Пропустить
              </Button>
            )}

            <Button
              size="sm"
              onClick={goNext}
              className="gap-1.5 text-xs font-mono"
            >
              {isLast ? (
                <>
                  Начать
                  <Rocket className="size-3.5" />
                </>
              ) : (
                <>
                  Далее
                  <ChevronRight className="size-3.5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
