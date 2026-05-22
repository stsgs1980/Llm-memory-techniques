'use client';

import { Brain } from 'lucide-react';
import { useQuizState } from '@/hooks/useQuizState';
import { QuizIntro } from './sections/QuizIntro';
import { QuizProgress } from './sections/QuizProgress';
import { QuizQuestion, QuizNextButton } from './sections/QuizQuestion';
import { QuizResult } from './sections/QuizResult';

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
        <QuizIntro
          totalQuestions={totalQuestions}
          onStart={startQuiz}
        />
      )}

      {/* Playing Phase */}
      {phase === 'playing' && currentQuestion && (
        <div className="space-y-4 animate-industrial-slide-up">
          <QuizProgress
            currentIndex={currentIndex}
            totalQuestions={shuffledQuestions.length}
            correctCount={results.totalCorrect}
            progressPercent={progressPercent}
            onBack={handleBackToIntro}
          />

          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            onSelectAnswer={handleSelectAnswer}
            onNext={handleNext}
            isLastQuestion={currentIndex + 1 >= shuffledQuestions.length}
          />

          <QuizNextButton
            isAnswered={isAnswered}
            isLastQuestion={currentIndex + 1 >= shuffledQuestions.length}
            onNext={handleNext}
          />
        </div>
      )}

      {/* Results Phase */}
      {phase === 'results' && (
        <div className="animate-industrial-slide-up">
          <QuizResult
            results={results}
            shuffledQuestions={shuffledQuestions}
            answers={answers}
            onRestart={startQuiz}
            onBack={handleBackToIntro}
          />
        </div>
      )}
    </div>
  );
}
