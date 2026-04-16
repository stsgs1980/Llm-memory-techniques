'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Target,
  TrendingUp,
  Layers,
  Database,
  FileJson,
  Scissors,
  Zap,
} from 'lucide-react';
import { TECHNIQUES } from '@/lib/constants';

/* ─────────── Types ─────────── */

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'basic' | 'medium' | 'advanced';
  technique: string;
  techniqueId: string;
}

interface TechniqueScore {
  id: string;
  name: string;
  correct: number;
  total: number;
  icon: React.ElementType;
}

/* ─────────── Quiz Data ─────────── */

const QUESTIONS: QuizQuestion[] = [
  // ── Суммаризация ──
  {
    id: 'q1',
    question: 'Какой примерно процент токенов экономит суммаризация?',
    options: ['20–40%', '70–90%', '40–60%', '50–70%'],
    correctIndex: 1,
    explanation:
      'Суммаризация позволяет сэкономить 70–90% токенов за счёт сжатия длинной истории диалога в краткое резюме.',
    difficulty: 'basic',
    technique: 'Суммаризация',
    techniqueId: 'summarization',
  },
  {
    id: 'q2',
    question: 'Какая инфраструктура необходима для суммаризации?',
    options: ['Векторная БД', 'Сервер и БД', 'Только API к LLM', 'Специальный GPU-кластер'],
    correctIndex: 2,
    explanation:
      'Суммаризация — самая простая в развёртывании техника. Нужен только доступ к API LLM для генерации саммари.',
    difficulty: 'basic',
    technique: 'Суммаризация',
    techniqueId: 'summarization',
  },
  {
    id: 'q3',
    question: 'Что такое инкрементальное обновление саммари?',
    options: [
      'Полная пересуммаризация всей истории',
      'Обновление существующего резюме только новыми сообщениями',
      'Удаление старого саммари и создание нового',
      'Хранение нескольких версий саммари',
    ],
    correctIndex: 1,
    explanation:
      'Инкрементальное обновление берёт существующий саммари и добавляет к нему только новую информацию из последних сообщений, что экономит токены.',
    difficulty: 'medium',
    technique: 'Суммаризация',
    techniqueId: 'summarization',
  },

  // ── Иерархическая память ──
  {
    id: 'q4',
    question: 'Из каких двух уровней состоит иерархическая память?',
    options: [
      'Основной и вторичный',
      'Краткосрочная и долгосрочная',
      'Горячий и холодный',
      'Быстрый и медленный',
    ],
    correctIndex: 1,
    explanation:
      'Иерархическая память использует краткосрочную память (последние сообщения) и долгосрочную память (архив с резюме и ключевыми фактами).',
    difficulty: 'basic',
    technique: 'Иерархическая память',
    techniqueId: 'hierarchical',
  },
  {
    id: 'q5',
    question: 'Какой экономии токенов можно достичь с иерархической памятью?',
    options: ['40–60%', '70–90%', '60–80%', '80–95%'],
    correctIndex: 2,
    explanation:
      'Иерархическая память экономит 60–80% токенов за счёт того, что вместо полной истории отправляется только краткосрочная + релевантная часть долгосрочной.',
    difficulty: 'medium',
    technique: 'Иерархическая память',
    techniqueId: 'hierarchical',
  },
  {
    id: 'q6',
    question: 'Какой уровень сложности реализации у иерархической памяти?',
    options: ['Низкий', 'Средний', 'Высокий', 'Очень высокий'],
    correctIndex: 1,
    explanation:
      'Иерархическая память имеет средний уровень сложности — требуется сервер и база данных для хранения двух уровней памяти, но не нужна векторная БД.',
    difficulty: 'basic',
    technique: 'Иерархическая память',
    techniqueId: 'hierarchical',
  },

  // ── RAG ──
  {
    id: 'q7',
    question: 'Что такое RAG?',
    options: [
      'Random Answer Generation — случайная генерация ответов',
      'Retrieval-Augmented Generation — генерация с дополненной выборкой',
      'Real-time Augmented Graphics — графика в реальном времени',
      'Recursive Array Generation — рекурсивная генерация массивов',
    ],
    correctIndex: 1,
    explanation:
      'RAG (Retrieval-Augmented Generation) — это техника, при которой перед генерацией ответа LLM получает релевантные фрагменты из базы данных через векторный поиск.',
    difficulty: 'basic',
    technique: 'RAG (векторный поиск)',
    techniqueId: 'rag',
  },
  {
    id: 'q8',
    question: 'Какая метрика используется для измерения сходства текстов в RAG?',
    options: ['Евклидово расстояние', 'Косинусное сходство', 'Манхэттенское расстояние', 'L2 норма'],
    correctIndex: 1,
    explanation:
      'Косинусное сходство (cosine similarity) измеряет угол между векторами. Чем меньше угол (ближе к 0°), тем больше тексты похожи по смыслу.',
    difficulty: 'medium',
    technique: 'RAG (векторный поиск)',
    techniqueId: 'rag',
  },
  {
    id: 'q9',
    question: 'Какой оптимальный размер чанка (фрагмента) для векторной БД?',
    options: ['50–100 токенов', '200–500 токенов', '1000–2000 токенов', '5000+ токенов'],
    correctIndex: 1,
    explanation:
      'Оптимальный размер чанка составляет 200–500 токенов. Слишком маленькие чанки теряют контекст, слишком большие — снижают точность поиска.',
    difficulty: 'advanced',
    technique: 'RAG (векторный поиск)',
    techniqueId: 'rag',
  },
  {
    id: 'q10',
    question: 'Какой процент экономии токенов возможен с RAG?',
    options: ['40–60%', '60–80%', '70–90%', '80–95%'],
    correctIndex: 3,
    explanation:
      'RAG экономит 80–95% токенов, так как вместо всей истории отправляются только наиболее релевантные фрагменты по запросу.',
    difficulty: 'medium',
    technique: 'RAG (векторный поиск)',
    techniqueId: 'rag',
  },

  // ── Извлечение фактов ──
  {
    id: 'q11',
    question: 'В каком формате извлечение фактов хранит данные о пользователе?',
    options: ['CSV таблица', 'Структурированный JSON', 'Простой текст', 'XML документ'],
    correctIndex: 1,
    explanation:
      'Извлечение фактов сохраняет данные в структурированном JSON-формате, что позволяет удобно обновлять, запрашивать и объединять информацию.',
    difficulty: 'basic',
    technique: 'Извлечение фактов',
    techniqueId: 'fact-extraction',
  },
  {
    id: 'q12',
    question: 'Какая экономия токенов у извлечения фактов?',
    options: ['40–60%', '60–80%', '70–90%', '90–99%'],
    correctIndex: 3,
    explanation:
      'Извлечение фактов экономит 90–99% токенов, так как вместо полной истории отправляется компактный JSON-профиль с ключевыми данными.',
    difficulty: 'medium',
    technique: 'Извлечение фактов',
    techniqueId: 'fact-extraction',
  },
  {
    id: 'q13',
    question: 'Что происходит при конфликте новых и существующих данных в профиле?',
    options: [
      'Старые данные всегда имеют приоритет',
      'Новые данные перезаписывают старые',
      'Обе версии сохраняются для ручной проверки',
      'Конфликтующие данные удаляются',
    ],
    correctIndex: 1,
    explanation:
      'При конфликте новые данные обычно имеют приоритет, а старое значение переносится в историю изменений (superseded). Это можно настроить.',
    difficulty: 'advanced',
    technique: 'Извлечение фактов',
    techniqueId: 'fact-extraction',
  },

  // ── Sliding Window ──
  {
    id: 'q14',
    question: 'Что такое Sliding Window в контексте памяти LLM?',
    options: [
      'Окно для просмотра истории в интерфейсе',
      'Хранение только последних N сообщений (FIFO)',
      'Окно генерации текста по частям',
      'Временной интервал для кэширования',
    ],
    correctIndex: 1,
    explanation:
      'Sliding Window — это простейший подход к управлению памятью: хранится только последние N сообщений, более старые удаляются по принципу FIFO.',
    difficulty: 'basic',
    technique: 'Sliding Window',
    techniqueId: 'sliding-window',
  },
  {
    id: 'q15',
    question: 'Какая инфраструктура нужна для Sliding Window?',
    options: ['Векторная БД', 'Сервер и БД', 'Только API к LLM', 'Не нужна — вообще'],
    correctIndex: 3,
    explanation:
      'Sliding Window — самая простая техника. Дополнительная инфраструктура не требуется — достаточно хранить массив последних сообщений.',
    difficulty: 'basic',
    technique: 'Sliding Window',
    techniqueId: 'sliding-window',
  },
  {
    id: 'q16',
    question: 'Какой главный недостаток Sliding Window?',
    options: [
      'Высокая стоимость реализации',
      'Потеря старого контекста при удалении сообщений',
      'Медленная скорость работы',
      'Требует GPU для работы',
    ],
    correctIndex: 1,
    explanation:
      'Главный недостаток — при сдвиге окна старые сообщения безвозвратно удаляются. Если в них были важные факты или решения, они теряются.',
    difficulty: 'medium',
    technique: 'Sliding Window',
    techniqueId: 'sliding-window',
  },

  // ── Семантический кэш ──
  {
    id: 'q17',
    question: 'На каком принципе работает семантический кэш?',
    options: [
      'Точное совпадение строк',
      'Семантическое сходство запросов через эмбеддинги',
      'Хэширование запросов',
      'Таймер жизни кэша',
    ],
    correctIndex: 1,
    explanation:
      'Семантический кэш использует эмбеддинги для сравнения смысла запросов. Похожие по смыслу запросы получают кэшированный ответ, даже если формулировки отличаются.',
    difficulty: 'medium',
    technique: 'Семантический кэш',
    techniqueId: 'semantic-cache',
  },
  {
    id: 'q18',
    question: 'Для каких задач семантический кэш подходит лучше всего?',
    options: [
      'Креативное письмо',
      'FAQ и поддержка с повторяющимися вопросами',
      'Генерация кода',
      'Перевод документов',
    ],
    correctIndex: 1,
    explanation:
      'Семантический кэш идеален для FAQ и поддержки, где пользователи часто задают одни и те же вопросы в разных формулировках.',
    difficulty: 'basic',
    technique: 'Семантический кэш',
    techniqueId: 'semantic-cache',
  },

  // ── Общие / комбинированные ──
  {
    id: 'q19',
    question: 'Что такое контекстное окно LLM?',
    options: [
      'Интерфейс для просмотра истории',
      'Максимальный объём текста, который LLM может обработать за один запрос',
      'Количество сообщений в чате',
      'Размер кэша процессора',
    ],
    correctIndex: 1,
    explanation:
      'Контекстное окно — это лимит входных токенов для модели. GPT-4o: 128K, Claude 3.5: 200K, Gemini 1.5 Pro: 2M токенов.',
    difficulty: 'basic',
    technique: 'Общие знания',
    techniqueId: 'general',
  },
  {
    id: 'q20',
    question: 'Какая лучшая практика для production-систем?',
    options: [
      'Использовать только одну технику',
      'Комбинировать несколько техник',
      'Не управлять памятью вообще',
      'Использовать только Sliding Window',
    ],
    correctIndex: 1,
    explanation:
      'Лучшая практика — комбинировать техники. Например: Sliding Window + Суммаризация для базового контекста, RAG для поиска по истории, Извлечение фактов для персонализации.',
    difficulty: 'medium',
    technique: 'Комбинированный подход',
    techniqueId: 'combined',
  },
];

/* ─────────── Helpers ─────────── */

const DIFFICULTY_CONFIG = {
  basic: { label: 'Базовый', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  medium: { label: 'Средний', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  advanced: { label: 'Продвинутый', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
};

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const TECHNIQUE_ICONS: Record<string, React.ElementType> = {
  summarization: Brain,
  hierarchical: Layers,
  rag: Database,
  'fact-extraction': FileJson,
  'sliding-window': Scissors,
  'semantic-cache': Zap,
  general: Brain,
  combined: Layers,
};

/* ─────────── Component ─────────── */

type QuizPhase = 'intro' | 'playing' | 'results';

export default function QuickQuiz() {
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Map<string, number>>(new Map());

  const startQuiz = useCallback(() => {
    setShuffledQuestions(shuffleArray(QUESTIONS));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers(new Map());
    setPhase('playing');
  }, []);

  const currentQuestion = shuffledQuestions[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const progressPercent = shuffledQuestions.length > 0
    ? ((currentIndex + (isAnswered ? 1 : 0)) / shuffledQuestions.length) * 100
    : 0;

  /* ── Results ── */

  const results = useMemo(() => {
    const techniqueScores = new Map<string, TechniqueScore>();

    shuffledQuestions.forEach((q) => {
      if (!techniqueScores.has(q.techniqueId)) {
        techniqueScores.set(q.techniqueId, {
          id: q.techniqueId,
          name: q.technique,
          correct: 0,
          total: 0,
          icon: TECHNIQUE_ICONS[q.techniqueId] || Brain,
        });
      }
      const score = techniqueScores.get(q.techniqueId)!;
      score.total++;
      if (answers.get(q.id) === q.correctIndex) {
        score.correct++;
      }
    });

    const totalCorrect = Array.from(answers.values()).filter((ansIdx, i) => {
      const q = shuffledQuestions[i];
      return q && ansIdx === q.correctIndex;
    }).length;

    return {
      totalCorrect,
      totalQuestions: shuffledQuestions.length,
      percentage: shuffledQuestions.length > 0
        ? Math.round((totalCorrect / shuffledQuestions.length) * 100)
        : 0,
      techniqueScores: Array.from(techniqueScores.values()),
    };
  }, [shuffledQuestions, answers]);

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setAnswers((prev) => new Map(prev).set(currentQuestion.id, index));
  };

  const handleNext = () => {
    if (currentIndex + 1 >= shuffledQuestions.length) {
      setPhase('results');
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handleBackToIntro = () => {
    setPhase('intro');
    setShuffledQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers(new Map());
  };

  /* ── Render ── */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Brain className="h-4 w-4 text-primary" />
        <span className="font-mono text-sm text-primary tracking-wider">БЫСТРЫЙ КВИЗ</span>
      </div>

      {/* Intro Phase */}
      {phase === 'intro' && (
        <Card className="industrial-card">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Brain className="size-8 text-primary" />
              </div>
              <h3 className="font-mono text-lg font-bold mb-2">
                Проверьте свои знания
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {QUESTIONS.length} вопросов о техниках управления памятью LLM.
                Охватывает все 6 техник: от основ Sliding Window до продвинутого RAG.
              </p>
              <div className="flex gap-2 flex-wrap justify-center mb-6">
                <Badge variant="outline" className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                  {QUESTIONS.filter((q) => q.difficulty === 'basic').length} базовых
                </Badge>
                <Badge variant="outline" className="font-mono text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                  {QUESTIONS.filter((q) => q.difficulty === 'medium').length} средних
                </Badge>
                <Badge variant="outline" className="font-mono text-[10px] bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
                  {QUESTIONS.filter((q) => q.difficulty === 'advanced').length} продвинутых
                </Badge>
              </div>
              <Button
                onClick={startQuiz}
                className="industrial-btn bg-primary text-primary-foreground border-primary font-mono text-sm px-8"
              >
                Начать тест
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Playing Phase */}
      {phase === 'playing' && currentQuestion && (
        <div className="space-y-4 animate-industrial-slide-up">
          {/* Progress + Back button */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToIntro}
                className="gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" />
                Назад
              </Button>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">
                  Вопрос {currentIndex + 1} из {shuffledQuestions.length}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {results.totalCorrect} правильных
                </span>
              </div>
            </div>
            <Progress value={progressPercent} className="h-1.5" />
          </div>

          {/* Question Card */}
          <Card className="industrial-card">
            <CardContent className="p-5">
              {/* Badges */}
              <div className="flex gap-1.5 flex-wrap mb-4">
                <Badge
                  variant="outline"
                  className={`font-mono text-[10px] ${DIFFICULTY_CONFIG[currentQuestion.difficulty].color}`}
                >
                  {DIFFICULTY_CONFIG[currentQuestion.difficulty].label}
                </Badge>
                <Badge variant="outline" className="font-mono text-[10px]">
                  {currentQuestion.technique}
                </Badge>
              </div>

              {/* Question */}
              <h3 className="font-mono text-sm font-semibold leading-relaxed mb-5">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-2">
                {currentQuestion.options.map((option, idx) => {
                  const isCorrect = idx === currentQuestion.correctIndex;
                  const isSelected = idx === selectedAnswer;

                  let optionStyle = 'border-border bg-background hover:border-primary/40 hover:bg-primary/5 cursor-pointer';
                  if (isAnswered) {
                    if (isCorrect) {
                      optionStyle = 'border-emerald-500/50 bg-emerald-500/5';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-red-500/50 bg-red-500/5';
                    } else {
                      optionStyle = 'border-border/50 bg-muted/30 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      disabled={isAnswered}
                      className={`w-full flex items-center gap-3 p-3 rounded-md border text-left transition-all ${optionStyle}`}
                    >
                      <span className="w-6 h-6 rounded-sm border border-border flex items-center justify-center shrink-0 font-mono text-xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-mono text-sm flex-1">{option}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="size-4 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isAnswered && (
                <div className="mt-4 pt-4 border-t border-border animate-industrial-slide-up">
                  <div className="flex items-start gap-2">
                    {selectedAnswer === currentQuestion.correctIndex ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="size-4 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end animate-industrial-slide-up">
              <Button
                onClick={handleNext}
                className="industrial-btn bg-primary text-primary-foreground border-primary font-mono text-sm"
              >
                {currentIndex + 1 >= shuffledQuestions.length ? 'Результаты' : 'Следующий вопрос'}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Results Phase */}
      {phase === 'results' && (
        <div className="space-y-4 animate-industrial-slide-up">
          {/* Back button at top of results */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToIntro}
              className="gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Назад к списку
            </Button>
          </div>

          {/* Score Card */}
          <Card className="industrial-card">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center max-w-md mx-auto">
                <div className="w-20 h-20 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  {results.percentage >= 80 ? (
                    <Trophy className="size-10 text-amber-500" />
                  ) : results.percentage >= 50 ? (
                    <Target className="size-10 text-primary" />
                  ) : (
                    <TrendingUp className="size-10 text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-mono text-lg font-bold mb-1">Тест завершён</h3>
                <p className="font-mono text-3xl font-bold text-primary mb-1">
                  {results.percentage}%
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {results.totalCorrect} из {results.totalQuestions} правильных ответов
                </p>
                <div className="w-full bg-muted/50 rounded-md p-4 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="font-mono text-lg font-bold text-emerald-500">
                        {QUESTIONS.filter((q) => q.difficulty === 'basic').length}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono uppercase">
                        Базовых
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-lg font-bold text-amber-500">
                        {QUESTIONS.filter((q) => q.difficulty === 'medium').length}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono uppercase">
                        Средних
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-lg font-bold text-red-500">
                        {QUESTIONS.filter((q) => q.difficulty === 'advanced').length}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono uppercase">
                        Продвинутых
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={startQuiz}
                  className="industrial-btn bg-primary text-primary-foreground border-primary font-mono text-sm px-8"
                >
                  <RotateCcw className="size-4" />
                  Пройти заново
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Breakdown by Technique */}
          <Card className="industrial-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Award className="size-4 text-primary" />
                <h4 className="font-mono text-sm font-semibold">
                  Результаты по техникам
                </h4>
              </div>
              <div className="space-y-3">
                {results.techniqueScores.map((ts) => {
                  const Icon = ts.icon;
                  const pct = ts.total > 0 ? Math.round((ts.correct / ts.total) * 100) : 0;
                  return (
                    <div key={ts.id} className="flex items-center gap-3">
                      <Icon className="size-4 text-muted-foreground shrink-0" />
                      <span className="font-mono text-xs text-foreground min-w-[120px] truncate">
                        {ts.name}
                      </span>
                      <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            pct >= 80
                              ? 'bg-emerald-500'
                              : pct >= 50
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground min-w-[60px] text-right">
                        {ts.correct}/{ts.total} ({pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Review Answers */}
          <Card className="industrial-card">
            <CardContent className="p-5">
              <h4 className="font-mono text-sm font-semibold mb-4">Обзор ответов</h4>
              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-industrial">
                {shuffledQuestions.map((q, idx) => {
                  const userAnswer = answers.get(q.id);
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className="flex items-start gap-3 p-3 rounded-md border border-border/50 bg-muted/20"
                    >
                      <div className="shrink-0 mt-0.5">
                        {isCorrect ? (
                          <CheckCircle2 className="size-4 text-emerald-500" />
                        ) : (
                          <XCircle className="size-4 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs font-medium leading-relaxed mb-1">
                          {q.question}
                        </p>
                        {!isCorrect && userAnswer !== undefined && (
                          <p className="text-[10px] text-red-500/80 font-mono mb-1">
                            Ваш ответ: {q.options[userAnswer]}
                          </p>
                        )}
                        <p className="text-[10px] text-emerald-500/80 font-mono">
                          Правильно: {q.options[q.correctIndex]}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`font-mono text-[10px] shrink-0 ${DIFFICULTY_CONFIG[q.difficulty].color}`}
                      >
                        {DIFFICULTY_CONFIG[q.difficulty].label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
