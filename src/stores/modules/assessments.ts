import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Assessment {
  id: string;
  title: string;
  type: 'quiz' | 'practical' | 'observation' | 'case_study';
  description: string;
  passingScore: number;
  timeLimit?: number; // in minutes
  attempts: number;
  questions?: Array<{
    id: string;
    type: string;
    content: string;
    options?: string[];
    correctAnswer: string | string[];
    points: number;
  }>;
  practicalTasks?: Array<{
    id: string;
    description: string;
    criteria: string[];
    maxPoints: number;
  }>;
  rubric?: Array<{
    criterion: string;
    levels: Array<{
      score: number;
      description: string;
    }>;
  }>;
}

interface AssessmentState {
  assessments: Record<string, Assessment>;
  results: Record<string, {
    userId: string;
    assessmentId: string;
    score: number;
    passed: boolean;
    completedAt: string;
    answers?: Record<string, any>;
    feedback?: string;
  }>;
  addAssessment: (assessment: Assessment) => void;
  updateAssessment: (id: string, assessment: Partial<Assessment>) => void;
  submitAssessment: (userId: string, assessmentId: string, answers: Record<string, any>) => void;
  getAssessmentResults: (userId: string, assessmentId: string) => any;
  getUserAssessments: (userId: string) => Assessment[];
}

export const useAssessments = create<AssessmentState>()(
  persist(
    (set, get) => ({
      assessments: {},
      results: {},

      addAssessment: (assessment) => set((state) => ({
        assessments: { ...state.assessments, [assessment.id]: assessment }
      })),

      updateAssessment: (id, updates) => set((state) => ({
        assessments: {
          ...state.assessments,
          [id]: { ...state.assessments[id], ...updates }
        }
      })),

      submitAssessment: (userId, assessmentId, answers) => {
        const assessment = get().assessments[assessmentId];
        if (!assessment) return;

        // Calculate score based on assessment type
        let score = 0;
        let passed = false;

        if (assessment.type === 'quiz' && assessment.questions) {
          const totalPoints = assessment.questions.reduce((sum, q) => sum + q.points, 0);
          score = assessment.questions.reduce((sum, q) => {
            const isCorrect = Array.isArray(q.correctAnswer)
              ? q.correctAnswer.every(a => answers[q.id]?.includes(a))
              : answers[q.id] === q.correctAnswer;
            return sum + (isCorrect ? q.points : 0);
          }, 0);
          score = (score / totalPoints) * 100;
        }

        passed = score >= assessment.passingScore;

        set((state) => ({
          results: {
            ...state.results,
            [`${userId}-${assessmentId}`]: {
              userId,
              assessmentId,
              score,
              passed,
              completedAt: new Date().toISOString(),
              answers
            }
          }
        }));
      },

      getAssessmentResults: (userId, assessmentId) => {
        return get().results[`${userId}-${assessmentId}`];
      },

      getUserAssessments: (userId) => {
        // In a real implementation, this would filter based on user's assigned assessments
        return Object.values(get().assessments);
      }
    }),
    {
      name: 'assessments-storage'
    }
  )
);