// Import necessary libraries
import { create } from 'zustand'; // Zustand for state management
import { QuizMetrics } from '../types/quiz'; // TypeScript interface for quiz metrics

// Define the interface for the quiz store
interface QuizStore {
  metrics: QuizMetrics; // Stores all quiz-related metrics
  initQuiz: () => void; // Initializes quiz metrics at the start
  recordResponse: (questionId: string, responseTime: number) => void; // Records the user's response time for a question
  completeQuiz: () => void; // Finalizes quiz metrics at the end
  getMetrics: () => QuizMetrics; // Retrieves the current quiz metrics
}

// Define the initial state of quiz metrics
const initialMetrics: QuizMetrics = {
  startTime: 0, // Timestamp for when the quiz starts
  responseTime: {}, // Object to store response times for each question (keyed by question ID)
  correctAnswers: 0, // Number of correct answers (could be updated elsewhere)
  totalQuestions: 0, // Total number of questions in the quiz (set elsewhere)
  averageResponseTime: 0 // Average time taken to answer questions
};

// Zustand store for quiz state management
export const useQuiz = create<QuizStore>((set, get) => ({
  // Initialize state with a copy of the initial metrics
  metrics: { ...initialMetrics },

  /**
   * Initializes the quiz metrics at the start of the quiz.
   * - Resets all metrics to their initial values.
   * - Sets the `startTime` to the current timestamp.
   */
  initQuiz: () => {
    set({
      metrics: {
        ...initialMetrics, // Reset all metrics
        startTime: Date.now() // Record the quiz start time
      }
    });
  },

  /**
   * Records the user's response time for a specific question.
   * - Stores the response time in the `responseTime` object, keyed by the question ID.
   * 
   * @param questionId - The ID of the question answered.
   * @param responseTime - The time taken by the user to respond (in milliseconds).
   */
  recordResponse: (questionId: string, responseTime: number) => {
    set((state) => ({
      metrics: {
        ...state.metrics, // Retain existing metrics
        responseTime: {
          ...state.metrics.responseTime, // Retain existing response times
          [questionId]: responseTime // Add/update the response time for the given question
        }
      }
    }));
  },

  /**
   * Finalizes the quiz metrics when the quiz is completed.
   * - Calculates the average response time for all answered questions.
   * - Stores the `endTime` and `averageResponseTime` in the metrics.
   */
  completeQuiz: () => {
    const { metrics } = get(); // Retrieve the current state of metrics
    const endTime = Date.now(); // Record the end time of the quiz
    const responseTimes = Object.values(metrics.responseTime); // Extract all response times as an array

    // Calculate the average response time, handling the case of no responses
    const averageResponseTime = responseTimes.length 
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length // Sum and divide by the number of responses
      : 0;

    set((state) => ({
      metrics: {
        ...state.metrics, // Retain existing metrics
        endTime, // Record the end time
        averageResponseTime // Store the calculated average response time
      }
    }));
  },

  /**
   * Retrieves the current quiz metrics.
   * - Useful for components or logic that need access to the metrics.
   * 
   * @returns The current state of quiz metrics.
   */
  getMetrics: () => get().metrics
}));
