export interface question {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  type: string;
  difficulty: string;
  regions: string[];
  isNiche: boolean;
}

export interface PageState {
  page: number;
  increasePage: () => void;
  decreasePage: () => void;
  setPage: (page: number) => void;
}

export interface QuestionState {
  selectedAnswer: string | null;
  setSelectedAnswer: (answer: string | null) => void;
  currentAnswerCorrect: boolean;
  setCurrentAnswerCorrect: (correct: boolean) => void;
}

export interface ScoreState {
  score: number;
  increaseScore: () => void;
  decreaseScore: () => void;
  setScore: (score: number) => void;
}
