import { create } from "zustand";
import type { QuizAnswer, QuizQuestion, QuizResult } from "../servies/types";
import { fetchQuizes, submitAnswers } from "../servies/api";

interface QuizState {
  quizess: QuizQuestion[];
  answers: QuizAnswer[];
  result: QuizResult | null;
  loading: boolean;

  loadQuizes: (classLevel: "10" | "12") => Promise<void>;
  selectAnswer: (questionId: string, selectedOptionId: string) => void;
  submit: () => Promise<void>;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  quizess: [],
  answers: [],
  result: null,
  loading: false,

  loadQuizes: async (classLevel) => {
    set({ loading: true });
    try {
      const data = await fetchQuizes(classLevel);
      set({ quizess: data, answers: [], result: null });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  selectAnswer: async (questionId, selectedOptionId) => {
    const { answers } = get();
    const updated = [
      ...answers.filter((a) => a.questionId !== questionId),
      { questionId, selectedOptionId },
    ];
    set({ answers: updated });
  },

  submit: async () => {
    const { answers } = get();
    if (!answers.length) return;

    set({ loading: true });
    try {
      const res = await submitAnswers(answers);
      set({ result: res });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));
