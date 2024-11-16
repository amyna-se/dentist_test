// Define the structure of an individual quiz question
export interface QuizQuestion {
  id: string; // Unique identifier for the question
  type: 'multiple-choice' | 'text-input' | 'info'; // Type of question (e.g., multiple-choice, text input, informational)
  question?: string; // The question text (optional for informational questions)
  options?: string[]; // Possible answer options (required for multiple-choice questions)
  correctAnswer?: string; // The correct answer (optional for informational questions)
  message?: string; // Informational message (used for type 'info')
  emoji?: string; // Optional emoji to display alongside the question
  placeholder?: string; // Placeholder text for text-input questions
  caseSensitive?: boolean; // Whether answers should be case-sensitive (for text-input questions)
}

// Define the structure of a quiz course
export interface QuizCourse {
  title: string; // Title of the course
  description: string; // Short description of the course
  questions: QuizQuestion[]; // Array of questions for the course
}

// Mock data for quizzes, keyed by course ID
export const quizData: Record<string, QuizCourse> = {
  // Autism 101 course
  'autism-101': {
    title: 'Autism 101', // Course title
    description: 'Introduction to Autism', // Course description
    questions: [
      {
        id: 'q1', // Unique question ID
        type: 'multiple-choice', // Type of question
        question: 'What is Autism?', // Question text
        options: ['A', 'B', 'C'], // Possible answer options
        correctAnswer: 'A' // Correct answer
      }
      // Add more questions here
    ]
  },
  // ADHD 101 course
  'adhd-101': {
    title: 'ADHD 101',
    description: 'Understanding ADHD',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What is ADHD?',
        options: ['A', 'B', 'C'],
        correctAnswer: 'B'
      }
      // Add more questions here
    ]
  },
  // Relationships 101 course
  'relationships-101': {
    title: 'Relationships 101',
    description: 'Building Healthy Relationships',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What is a healthy relationship?',
        options: ['A', 'B', 'C'],
        correctAnswer: 'C'
      }
      // Add more questions here
    ]
  }
  // Add other courses as needed
};
