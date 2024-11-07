import { motion } from 'framer-motion';
import { Target, Award } from 'lucide-react';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

export function QuizProgress({ currentQuestion, totalQuestions, score }: QuizProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-neon-blue" />
          <span className="text-gray-400">
            Question <span className="text-neon-blue font-bold">{currentQuestion}</span> of{' '}
            <span className="text-neon-blue font-bold">{totalQuestions}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-neon-purple" />
          <span className="text-gray-400">
            Score: <span className="text-neon-purple font-bold">{score}</span>
          </span>
        </div>
      </div>
      <div className="h-2 bg-dark rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}