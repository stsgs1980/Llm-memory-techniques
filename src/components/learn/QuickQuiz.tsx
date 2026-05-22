'use client';

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
} from 'lucide-react';
import { useQuizState } from '@/hooks/useQuizState';
import { QUESTIONS, DIFFICULTY_CONFIG } from '@/data/quiz-questions';

/* ─────────── Component ─────────── */

export default function QuickQuiz() {
  const {
    phase,
    shuffledQuestions,
    currentIndex,
    selectedAnswer,
    answers,
    currentQuestion,
    isAnswered,
    progressPercent,
    results,
    totalQuestions,
    startQuiz,
    handleSelectAnswer,
    handleNext,
    handleBackToIntro,
  } = useQuizState();

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
                {totalQuestions} вопросов о техниках управления памятью LLM.
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
                      onClick={() => handleSelectAnswer(currentQuestion.id, idx)}
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
                {shuffledQuestions.map((q) => {
                  const userAnswer = q ? (q.id ? answers.get(q.id) : undefined) : undefined;
                  const isCorrect = userAnswer === q?.correctIndex;
                  if (!q) return null;
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
