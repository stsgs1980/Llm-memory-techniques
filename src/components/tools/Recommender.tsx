'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ClipboardCheck,
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Zap,
  Trophy,
  Brain,
  Layers,
  Database,
  FileJson,
  Scissors,
} from 'lucide-react';
import { TECHNIQUES } from '@/lib/constants';

// ── Question types ──
interface QuestionOption {
  label: string;
  value: string;
  desc: string;
}

interface Question {
  id: string;
  title: string;
  options: QuestionOption[];
}

const QUESTIONS: Question[] = [
  {
    id: 'project_type',
    title: 'Какой у вас тип проекта?',
    options: [
      { label: 'Чат-бот', value: 'chatbot', desc: 'Ответы на вопросы, поддержка' },
      { label: 'Ассистент', value: 'assistant', desc: 'Продвинутый AI-помощник' },
      { label: 'Аналитика', value: 'analytics', desc: 'Обработка данных, отчёты' },
      { label: 'Персонализация', value: 'personalization', desc: 'Рекомендации, профиль' },
    ],
  },
  {
    id: 'dialog_volume',
    title: 'Каков объём диалогов?',
    options: [
      { label: 'Короткие (<10 сообщений)', value: 'short', desc: 'Быстрые вопросы' },
      { label: 'Средние (10–50)', value: 'medium', desc: 'Типичная сессия' },
      { label: 'Длинные (50+)', value: 'long', desc: 'Глубокие разговоры' },
      { label: 'Очень длинные (1000+)', value: 'very_long', desc: 'Архивные истории' },
    ],
  },
  {
    id: 'priority',
    title: 'Что важнее?',
    options: [
      { label: 'Экономия стоимости', value: 'cost', desc: 'Минимизировать затраты' },
      { label: 'Качество ответов', value: 'quality', desc: 'Максимальная точность' },
      { label: 'Скорость', value: 'speed', desc: 'Быстрое время отклика' },
      { label: 'Персонализация', value: 'personal', desc: 'Запоминать пользователя' },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Какая инфраструктура доступна?',
    options: [
      { label: 'Только API', value: 'api_only', desc: 'Нет своего сервера' },
      { label: 'Сервер + БД', value: 'server_db', desc: 'Базовая инфраструктура' },
      { label: 'Полный стек', value: 'full_stack', desc: 'Контролируемое окружение' },
      { label: 'Векторная БД', value: 'vector_db', desc: 'Pinecone, Qdrant и т.д.' },
    ],
  },
  {
    id: 'memory_precision',
    title: 'Нужна ли точная память о деталях?',
    options: [
      { label: 'Да, цитаты и факты', value: 'exact', desc: 'Точные воспоминания' },
      { label: 'Нет, общий контекст', value: 'general', desc: 'Общая картина' },
      { label: 'Не важно', value: 'dont_care', desc: 'Не приоритет' },
    ],
  },
  {
    id: 'budget',
    title: 'Бюджет на разработку?',
    options: [
      { label: 'Минимум (1 день)', value: 'minimal', desc: 'Быстрый старт' },
      { label: 'Средний (1 неделя)', value: 'medium', desc: 'Баланс времени/качества' },
      { label: 'Большой (1 месяц+)', value: 'large', desc: 'Продвинутая реализация' },
    ],
  },
];

// ── Scoring weights per technique per answer ──
// Each question's answer adds a score to techniques
type TechniqueId = 'sliding-window' | 'summarization' | 'hierarchical' | 'rag' | 'fact-extraction' | 'semantic-cache';

const SCORING: Record<string, Record<string, Record<TechniqueId, number>>> = {
  project_type: {
    chatbot: {
      'sliding-window': 3,
      summarization: 2,
      hierarchical: 2,
      rag: 2,
      'fact-extraction': 1,
      'semantic-cache': 4,
    },
    assistant: {
      'sliding-window': 1,
      summarization: 3,
      hierarchical: 4,
      rag: 3,
      'fact-extraction': 3,
      'semantic-cache': 2,
    },
    analytics: {
      'sliding-window': 1,
      summarization: 3,
      hierarchical: 2,
      rag: 4,
      'fact-extraction': 4,
      'semantic-cache': 1,
    },
    personalization: {
      'sliding-window': 1,
      summarization: 2,
      hierarchical: 3,
      rag: 3,
      'fact-extraction': 5,
      'semantic-cache': 2,
    },
  },
  dialog_volume: {
    short: {
      'sliding-window': 5,
      summarization: 1,
      hierarchical: 1,
      rag: 1,
      'fact-extraction': 1,
      'semantic-cache': 3,
    },
    medium: {
      'sliding-window': 3,
      summarization: 3,
      hierarchical: 3,
      rag: 2,
      'fact-extraction': 2,
      'semantic-cache': 3,
    },
    long: {
      'sliding-window': 1,
      summarization: 4,
      hierarchical: 4,
      rag: 3,
      'fact-extraction': 3,
      'semantic-cache': 2,
    },
    very_long: {
      'sliding-window': 0,
      summarization: 3,
      hierarchical: 3,
      rag: 5,
      'fact-extraction': 4,
      'semantic-cache': 1,
    },
  },
  priority: {
    cost: {
      'sliding-window': 4,
      summarization: 4,
      hierarchical: 3,
      rag: 2,
      'fact-extraction': 2,
      'semantic-cache': 5,
    },
    quality: {
      'sliding-window': 1,
      summarization: 3,
      hierarchical: 4,
      rag: 5,
      'fact-extraction': 4,
      'semantic-cache': 2,
    },
    speed: {
      'sliding-window': 5,
      summarization: 2,
      hierarchical: 2,
      rag: 1,
      'fact-extraction': 2,
      'semantic-cache': 5,
    },
    personal: {
      'sliding-window': 0,
      summarization: 2,
      hierarchical: 3,
      rag: 3,
      'fact-extraction': 5,
      'semantic-cache': 2,
    },
  },
  infrastructure: {
    api_only: {
      'sliding-window': 5,
      summarization: 4,
      hierarchical: 1,
      rag: 0,
      'fact-extraction': 0,
      'semantic-cache': 1,
    },
    server_db: {
      'sliding-window': 3,
      summarization: 4,
      hierarchical: 4,
      rag: 2,
      'fact-extraction': 3,
      'semantic-cache': 2,
    },
    full_stack: {
      'sliding-window': 2,
      summarization: 3,
      hierarchical: 5,
      rag: 4,
      'fact-extraction': 5,
      'semantic-cache': 3,
    },
    vector_db: {
      'sliding-window': 1,
      summarization: 2,
      hierarchical: 3,
      rag: 5,
      'fact-extraction': 4,
      'semantic-cache': 5,
    },
  },
  memory_precision: {
    exact: {
      'sliding-window': 0,
      summarization: 2,
      hierarchical: 3,
      rag: 5,
      'fact-extraction': 5,
      'semantic-cache': 2,
    },
    general: {
      'sliding-window': 3,
      summarization: 4,
      hierarchical: 4,
      rag: 2,
      'fact-extraction': 1,
      'semantic-cache': 3,
    },
    dont_care: {
      'sliding-window': 5,
      summarization: 3,
      hierarchical: 2,
      rag: 1,
      'fact-extraction': 1,
      'semantic-cache': 4,
    },
  },
  budget: {
    minimal: {
      'sliding-window': 5,
      summarization: 4,
      hierarchical: 1,
      rag: 0,
      'fact-extraction': 0,
      'semantic-cache': 2,
    },
    medium: {
      'sliding-window': 3,
      summarization: 4,
      hierarchical: 4,
      rag: 3,
      'fact-extraction': 2,
      'semantic-cache': 3,
    },
    large: {
      'sliding-window': 1,
      summarization: 3,
      hierarchical: 4,
      rag: 5,
      'fact-extraction': 5,
      'semantic-cache': 4,
    },
  },
};

// ── Recommendation reasons ──
const REASONS: Record<TechniqueId, string> = {
  'sliding-window': 'Минимальная реализация — просто храните последние N сообщений. Идеально для прототипов и проектов с ограниченным бюджетом.',
  summarization: 'Автоматическое сжатие истории в краткое резюме. Отличная экономия токенов с сохранением контекста диалога.',
  hierarchical: 'Двухуровневая система с краткосрочной и долгосрочной памятью. Баланс между качеством и сложностью реализации.',
  rag: 'Векторный поиск по истории — находит релевантные фрагменты из миллионов записей. Масштабируемость без компромиссов.',
  'fact-extraction': 'Структурированный JSON-профиль с ключевыми фактами о пользователе. Лучший выбор для персонализации.',
  'semantic-cache': 'Кэширование по смыслу запросов — мгновенные ответы на повторяющиеся вопросы с максимальной экономией.',
};

// ── Technique icons ──
const TECHNIQUE_ICONS: Record<TechniqueId, React.ElementType> = {
  'sliding-window': Scissors,
  summarization: Brain,
  hierarchical: Layers,
  rag: Database,
  'fact-extraction': FileJson,
  'semantic-cache': Zap,
};

const TECHNIQUE_COMPLEXITY: Record<TechniqueId, { label: string; color: string }> = {
  'sliding-window': { label: 'Низкая', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  summarization: { label: 'Низкая', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  hierarchical: { label: 'Средняя', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  rag: { label: 'Высокая', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  'fact-extraction': { label: 'Высокая', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  'semantic-cache': { label: 'Средняя', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
};

interface ScoreResult {
  id: TechniqueId;
  name: string;
  score: number;
  maxScore: number;
  percent: number;
  reason: string;
  savings: string;
  complexity: { label: string; color: string };
  icon: React.ElementType;
}

export default function Recommender() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentStep];

  const handleAnswer = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: value };
      return updated;
    });
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResults(true);
    }
  }, [currentStep, totalQuestions]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  }, []);

  const isCurrentAnswered = currentQuestion ? !!answers[currentQuestion.id] : false;

  // Calculate scores
  const results = useMemo((): ScoreResult[] => {
    if (Object.keys(answers).length === 0) return [];

    const techniqueIds: TechniqueId[] = [
      'sliding-window',
      'summarization',
      'hierarchical',
      'rag',
      'fact-extraction',
      'semantic-cache',
    ];

    const scored = techniqueIds.map((id) => {
      let score = 0;
      let maxScore = 0;

      Object.entries(answers).forEach(([qId, aValue]) => {
        const questionScores = SCORING[qId]?.[aValue];
        if (questionScores) {
          score += questionScores[id] ?? 0;
          // Max possible for any technique in this question
          maxScore += Math.max(...Object.values(questionScores));
        }
      });

      const technique = TECHNIQUES.find((t) => t.id === id);

      return {
        id,
        name: technique?.name ?? id,
        score,
        maxScore,
        percent: maxScore > 0 ? (score / maxScore) * 100 : 0,
        reason: REASONS[id],
        savings: technique?.savings ?? '',
        complexity: TECHNIQUE_COMPLEXITY[id],
        icon: TECHNIQUE_ICONS[id],
      };
    });

    return scored.sort((a, b) => b.score - a.score);
  }, [answers]);

  const topResults = results.slice(0, 3);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-mono text-sm text-primary tracking-wider">
          СОВЕТНИК
        </h2>
        <p className="text-muted-foreground text-sm">
          Ответьте на 6 вопросов — получите персональную рекомендацию по технике управления памятью
        </p>
      </div>

      {/* Progress Bar */}
      {!showResults && (
        <div className="industrial-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Прогресс
            </span>
            <span className="text-[10px] font-mono text-primary font-bold">
              {currentStep + 1} / {totalQuestions}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-sm overflow-hidden">
            <div
              className="h-full bg-primary/70 rounded-sm transition-all duration-500"
              style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
            />
          </div>
          <div className="flex gap-1 mt-2">
            {QUESTIONS.map((q, i) => (
              <div
                key={q.id}
                className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                  i < currentStep
                    ? 'bg-primary'
                    : i === currentStep
                      ? 'bg-primary/50'
                      : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Questionnaire */}
      {!showResults && (
        <div className="industrial-card p-6 animate-industrial-slide-up" key={currentStep}>
          {/* Step Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="size-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ClipboardCheck className="size-4 text-primary" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Вопрос {currentStep + 1}
              </div>
              <h3 className="text-lg font-semibold font-mono">
                {currentQuestion.title}
              </h3>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestion.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                  className={`industrial-btn w-full text-left group ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'bg-background border-border hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground/30 group-hover:border-primary/50'
                        }`}
                      >
                        {isSelected && (
                          <div className="size-1.5 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                      <div>
                        <div className={`font-medium text-sm transition-colors ${
                          isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                        }`}>
                          {opt.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="size-4 text-primary shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="h-8 gap-1.5 text-muted-foreground"
            >
              <span className="text-xs">Назад</span>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={handleReset}
                className="h-8 gap-1.5 text-muted-foreground"
              >
                <RotateCcw className="size-3.5" />
                <span className="text-xs">Сброс</span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isCurrentAnswered}
                className="h-8 gap-1.5"
              >
                {currentStep === totalQuestions - 1 ? (
                  <>
                    <Sparkles className="size-3.5" />
                    <span className="text-xs">Результат</span>
                  </>
                ) : (
                  <>
                    <span className="text-xs">Далее</span>
                    <ArrowRight className="size-3.5" />
                  </>
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
            {/* Best Match Banner */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Trophy className="size-5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-primary uppercase tracking-wider">
                  Лучшее совпадение
                </div>
                <h3 className="text-xl font-bold font-mono text-primary">
                  {topResults[0].name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {topResults[0].reason}
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className={topResults[0].complexity.color}>
                Сложность: {topResults[0].complexity.label}
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Совпадение: {topResults[0].percent.toFixed(0)}%
              </Badge>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                Экономия: {topResults[0].savings}
              </Badge>
            </div>

            {/* Score bar */}
            <div className="mt-4">
              <div className="h-2 bg-muted rounded-sm overflow-hidden">
                <div
                  className="h-full bg-primary rounded-sm transition-all duration-700"
                  style={{ width: `${topResults[0].percent}%` }}
                />
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
                <div
                  key={result.id}
                  className={`industrial-card p-4 space-y-3 ${
                    isBest ? 'border-primary/40' : ''
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`size-7 rounded-sm flex items-center justify-center ${
                        isBest
                          ? 'bg-primary/10 border border-primary/20'
                          : 'bg-muted border border-border'
                      }`}>
                        <Icon className={`size-4 ${isBest ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono font-bold ${
                          isBest ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          #{index + 1}
                        </span>
                        <h4 className="text-xs font-mono font-semibold">{result.name}</h4>
                      </div>
                    </div>
                    <span className={`text-lg font-bold font-mono ${
                      isBest ? 'text-primary' : 'text-foreground/60'
                    }`}>
                      {result.percent.toFixed(0)}%
                    </span>
                  </div>

                  {/* Score bar */}
                  <div className="h-1.5 bg-muted rounded-sm overflow-hidden">
                    <div
                      className={`h-full rounded-sm transition-all duration-700 ${
                        isBest ? 'bg-primary' : 'bg-primary/40'
                      }`}
                      style={{ width: `${result.percent}%` }}
                    />
                  </div>

                  {/* Reason (truncated) */}
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
                    {result.reason}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={`text-[9px] ${result.complexity.color}`}>
                      {result.complexity.label}
                    </Badge>
                    <span className="text-[9px] font-mono text-emerald-500">
                      −{result.savings}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Start Over */}
          <div className="flex justify-center">
            <Button
              onClick={handleReset}
              variant="outline"
              className="gap-2 font-mono"
            >
              <RotateCcw className="size-4" />
              Начать заново
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
