import { create } from 'zustand';
import { QuizMetrics } from '../types/quiz';

interface QuizStore {
  metrics: QuizMetrics;
  initQuiz: () => void;
  recordResponse: (questionId: string, responseTime: number) => void;
  completeQuiz: () => void;
  getMetrics: () => QuizMetrics;
}

const initialMetrics: QuizMetrics = {
  startTime: 0,
  responseTime: {},
  correctAnswers: 0,
  totalQuestions: 0,
  averageResponseTime: 0
};

export const useQuiz = create<QuizStore>((set, get) => ({
  metrics: { ...initialMetrics },
  
  initQuiz: () => {
    set({
      metrics: {
        ...initialMetrics,
        startTime: Date.now()
      }
    });
  },

  recordResponse: (questionId: string, responseTime: number) => {
    set((state) => ({
      metrics: {
        ...state.metrics,
        responseTime: {
          ...state.metrics.responseTime,
          [questionId]: responseTime
        }
      }
    }));
  },

  completeQuiz: () => {
    const { metrics } = get();
    const endTime = Date.now();
    const responseTimes = Object.values(metrics.responseTime);
    const averageResponseTime = responseTimes.length 
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
      : 0;

    set((state) => ({
      metrics: {
        ...state.metrics,
        endTime,
        averageResponseTime
      }
    }));
  },

  getMetrics: () => get().metrics
}));