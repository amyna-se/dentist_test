import { motion } from 'framer-motion';
import { Trophy, Star, Award, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import clsx from 'clsx';

interface QuizCompleteProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

const confetti = {
  light: {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 100,
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 0.2,
      },
    },
  },
  medium: {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 100,
      opacity: [0, 1, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatDelay: 0.3,
      },
    },
  },
  heavy: {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 100,
      opacity: [0, 1, 0],
      transition: {
        duration: 1.6,
        repeat: Infinity,
        repeatDelay: 0.4,
      },
    },
  },
};

export function QuizComplete({ score, totalQuestions, onRetry }: QuizCompleteProps) {
  const navigate = useNavigate();
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfect = percentage === 100;
  const isGood = percentage >= 80;
  const isPassing = percentage >= 60;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-dark-light rounded-lg p-8 border border-neon-blue/10 text-center relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-purple/5 animate-pulse" />

      {/* Confetti animation for perfect score */}
      {isPerfect && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? '#00f3ff' : i % 3 === 1 ? '#bf00ff' : '#00ff9d',
              }}
              variants={i % 3 === 0 ? confetti.light : i % 3 === 1 ? confetti.medium : confetti.heavy}
              initial="hidden"
              animate="visible"
            />
          ))}
        </>
      )}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-purple/10 flex items-center justify-center relative"
      >
        <Trophy className="w-12 h-12 text-neon-purple" />
        {isPerfect && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-neon-purple/30"
          />
        )}
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-white mb-2"
      >
        Quiz Complete!
      </motion.h2>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.4 }}
        className="text-6xl font-bold mb-4"
      >
        <span
          className={clsx(
            'text-neon-blue',
            isPerfect && 'text-neon-purple animate-neon-pulse',
            !isPassing && 'text-red-500'
          )}
        >
          {percentage}%
        </span>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center space-x-2 mb-8"
      >
        <Star className="w-5 h-5 text-neon-green" />
        <p className="text-gray-400">
          You got <span className="text-neon-green font-bold">{score}</span> out of{' '}
          <span className="text-neon-green font-bold">{totalQuestions}</span> questions correct
        </p>
        <Star className="w-5 h-5 text-neon-green" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="space-y-4"
      >
        {isPerfect ? (
          <div className="flex items-center justify-center space-x-2 text-neon-purple">
            <Award className="w-6 h-6" />
            <p className="font-bold">Perfect score! You're a master! 🏆</p>
            <Award className="w-6 h-6" />
          </div>
        ) : isGood ? (
          <p className="text-neon-green font-bold">Great job! Keep up the good work! 🌟</p>
        ) : isPassing ? (
          <p className="text-neon-blue font-bold">Good effort! Room for improvement! 💪</p>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-red-500">
            <Zap className="w-6 h-6" />
            <p className="font-bold">Keep practicing! You'll get better! 🎯</p>
            <Zap className="w-6 h-6" />
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-gray-400 mt-4"
        >
          Redirecting to dashboard...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}