export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'text-input' | 'info';
  question?: string;
  options?: string[];
  correctAnswer?: string;
  message?: string;
  emoji?: string;
  placeholder?: string;
  caseSensitive?: boolean;
}

export interface QuizCourse {
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const quizData: Record<string, QuizCourse> = {
  'autism-101': {
    title: 'Autism 101',
    description: 'Introduction to Autism',
    questions: [
      { id: 'q1', type: 'multiple-choice', question: 'What is Autism?', options: ['A', 'B', 'C'], correctAnswer: 'A' },
      // Add more questions here
    ]
  },
  'adhd-101': {
    title: 'ADHD 101',
    description: 'Understanding ADHD',
    questions: [
      { id: 'q1', type: 'multiple-choice', question: 'What is ADHD?', options: ['A', 'B', 'C'], correctAnswer: 'B' },
      // Add more questions here
    ]
  },
  'relationships-101': {
    title: 'Relationships 101',
    description: 'Building Healthy Relationships',
    questions: [
      { id: 'q1', type: 'multiple-choice', question: 'What is a healthy relationship?', options: ['A', 'B', 'C'], correctAnswer: 'C' },
      // Add more questions here
    ]
  },
  // Add other courses as needed
};