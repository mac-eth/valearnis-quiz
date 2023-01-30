import { create } from 'zustand'
import type { PageState, QuestionState, ScoreState } from '@/types'

export const usePageStore = create<PageState>()((set) => ({
  page: 0,
  increasePage: () => set((state) => ({ page: state.page + 1 })),
  decreasePage: () => set((state) => ({ page: state.page - 1 })),
  setPage: (page: number) => set(() => ({ page })),
}))

export const useQuestionStore = create<QuestionState>()((set) => ({
  selectedAnswer: null,
  setSelectedAnswer: (answer: string | null) => set(() => ({ selectedAnswer: answer })),
  currentAnswerCorrect: false,
  setCurrentAnswerCorrect: (correct: boolean) => set(() => ({ currentAnswerCorrect: correct })),
}))

export const useScoreStore = create<ScoreState>()((set) => ({
  score: 0,
  increaseScore: () => set((state) => ({ score: state.score + 1 })),
  decreaseScore: () => set((state) => ({ score: state.score - 1 })),
  setScore: (score: number) => set(() => ({ score })),
}))

