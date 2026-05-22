'use client';

import { useState, useMemo, useCallback } from 'react';
import { QUESTIONS, SCORING, REASONS, TECHNIQUE_COMPLEXITY, TECHNIQUE_IDS, TechniqueId } from '@/data/recommender';
import { TECHNIQUES } from '@/lib/constants';
import { Scissors, Brain, Layers, Database, FileJson, Zap } from 'lucide-react';

const TECHNIQUE_ICONS: Record<TechniqueId, React.ElementType> = {
  'sliding-window': Scissors,
  summarization: Brain,
  hierarchical: Layers,
  rag: Database,
  'fact-extraction': FileJson,
  'semantic-cache': Zap,
};

export interface ScoreResult {
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

export function useRecommender() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentStep];

  const handleAnswer = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResults(true);
    }
  }, [currentStep, totalQuestions]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  }, []);

  const isCurrentAnswered = currentQuestion ? !!answers[currentQuestion.id] : false;

  const results = useMemo((): ScoreResult[] => {
    if (Object.keys(answers).length === 0) return [];

    const scored = TECHNIQUE_IDS.map((id) => {
      let score = 0;
      let maxScore = 0;

      Object.entries(answers).forEach(([qId, aValue]) => {
        const questionScores = SCORING[qId]?.[aValue];
        if (questionScores) {
          score += questionScores[id] ?? 0;
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

  return {
    currentStep,
    currentQuestion,
    answers,
    showResults,
    totalQuestions,
    isCurrentAnswered,
    results,
    topResults,
    handleAnswer,
    handleNext,
    handleBack,
    handleReset,
  };
}
