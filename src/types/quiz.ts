export interface QuestionBase {
  id: string;
  type: 'multiple-choice' | 'text-input' | 'info';
  emoji?: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface TextInputQuestion extends QuestionBase {
  type: 'text-input';
  question: string;
  correctAnswer: string;
  placeholder?: string;
  caseSensitive?: boolean;
}

export interface InfoCard extends QuestionBase {
  type: 'info';
  message: string;
  emoji: string;
}

export type Question = MultipleChoiceQuestion | TextInputQuestion | InfoCard;

export interface QuizMetrics {
  startTime: number;
  endTime?: number;
  responseTime: Record<string, number>;
  correctAnswers: number;
  totalQuestions: number;
  averageResponseTime: number;
}