'use client';

import { useState, useMemo, useCallback } from 'react';
import { Brain, Layers, Database, FileJson, Scissors, Zap } from 'lucide-react';
import type { QuizQuestion, TechniqueScore, QuizPhase, QuizResults } from '@/types/quiz';
import { QUESTIONS, shuffleArray } from '@/data/quiz-questions';

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

export function useQuizState() {
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

  const handleSelectAnswer = useCallback((questionId: string, index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setAnswers((prev) => new Map(prev).set(questionId, index));
  }, [selectedAnswer]);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= shuffledQuestions.length) {
      setPhase('results');
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  }, [currentIndex, shuffledQuestions.length]);

  const handleBackToIntro = useCallback(() => {
    setPhase('intro');
    setShuffledQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers(new Map());
  }, []);

  const currentQuestion = shuffledQuestions[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const progressPercent = shuffledQuestions.length > 0
    ? ((currentIndex + (isAnswered ? 1 : 0)) / shuffledQuestions.length) * 100
    : 0;

  const results: QuizResults = useMemo(() => {
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

  return {
    // State
    phase,
    shuffledQuestions,
    currentIndex,
    selectedAnswer,
    answers,
    currentQuestion,
    isAnswered,
    progressPercent,
    results,
    totalQuestions: QUESTIONS.length,

    // Actions
    startQuiz,
    handleSelectAnswer,
    handleNext,
    handleBackToIntro,
  };
}
