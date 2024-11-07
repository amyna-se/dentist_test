import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import clsx from 'clsx';

interface QuizCardProps {
  question?: string;
  options?: string[];
  correctAnswer?: string;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
  emoji?: string;
  info?: {
    message: string;
    emoji: string;
  };
}

export function QuizCard({
  question,
  options = [],
  correctAnswer,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
  isLastQuestion,
  emoji = '🎯',
  info,
}: QuizCardProps) {
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === correctAnswer;

  // Early return for info cards
  if (info) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
        >
          <div className="flex flex-col items-center text-center gap-6">
            <span className="text-5xl sm:text-6xl" role="img" aria-label="info emoji">
              {info.emoji}
            </span>
            <p className="text-lg sm:text-xl text-white/90">{info.message}</p>
            <button
              onClick={onNextQuestion}
              className="px-6 py-3 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span className="font-semibold">Continue</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Validate required props for question cards
  if (!question || !options.length || !correctAnswer) {
    console.error('Missing required props for QuizCard');
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-dark-light rounded-lg p-4 sm:p-6 border border-neon-blue/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl sm:text-3xl" role="img" aria-label="quiz emoji">
              {emoji}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">{question}</h3>
        </div>

        <div className="space-y-3 mb-6">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectAnswer = option === correctAnswer;
            const showCorrectness = isAnswered;

            return (
              <button
                key={option}
                onClick={() => !isAnswered && onSelectAnswer(option)}
                disabled={isAnswered}
                className={clsx(
                  'w-full p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between',
                  'hover:scale-[1.02] active:scale-[0.98]',
                  !isAnswered && 'hover:bg-neon-blue/10 hover:border-neon-blue/50',
                  isAnswered && isSelected && isCorrect && 'bg-neon-green/10 border-neon-green',
                  isAnswered && isSelected && !isCorrect && 'bg-red-500/10 border-red-500',
                  isAnswered && !isSelected && isCorrectAnswer && 'bg-neon-green/10 border-neon-green',
                  isAnswered && !isSelected && !isCorrectAnswer && 'border-neon-blue/10',
                  !isAnswered && 'border-neon-blue/10'
                )}
              >
                <div className="flex items-center space-x-3 flex-1 text-left">
                  <div
                    className={clsx(
                      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                      !isAnswered && 'bg-neon-blue/10',
                      isAnswered && isSelected && isCorrect && 'bg-neon-green/20',
                      isAnswered && isSelected && !isCorrect && 'bg-red-500/20',
                      isAnswered && !isSelected && isCorrectAnswer && 'bg-neon-green/20',
                      isAnswered && !isSelected && !isCorrectAnswer && 'bg-neon-blue/10'
                    )}
                  >
                    <span className="text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <span className={clsx(
                    'text-sm sm:text-base',
                    isAnswered && isSelected && isCorrect && 'text-neon-green',
                    isAnswered && isSelected && !isCorrect && 'text-red-500',
                    isAnswered && !isSelected && isCorrectAnswer && 'text-neon-green',
                    !isAnswered && 'text-white'
                  )}>
                    {option}
                  </span>
                </div>

                {showCorrectness && (
                  <div className="ml-2 flex-shrink-0">
                    {isSelected && isCorrect && <Check className="w-5 h-5 text-neon-green" />}
                    {isSelected && !isCorrect && <X className="w-5 h-5 text-red-500" />}
                    {!isSelected && isCorrectAnswer && <Check className="w-5 h-5 text-neon-green" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <button
              onClick={onNextQuestion}
              className="px-6 py-3 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span className="font-semibold">
                {isLastQuestion ? 'Complete Quiz 🎉' : 'Next Question'}
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}