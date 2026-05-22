/* ─────────── Quiz Types ─────────── */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'basic' | 'medium' | 'advanced';
  technique: string;
  techniqueId: string;
}

export interface TechniqueScore {
  id: string;
  name: string;
  correct: number;
  total: number;
  icon: React.ElementType;
}

export type QuizPhase = 'intro' | 'playing' | 'results';

export interface QuizResults {
  totalCorrect: number;
  totalQuestions: number;
  percentage: number;
  techniqueScores: TechniqueScore[];
}

export interface QuizState {
  phase: QuizPhase;
  shuffledQuestions: QuizQuestion[];
  currentIndex: number;
  selectedAnswer: number | null;
  answers: Map<string, number>;
}
