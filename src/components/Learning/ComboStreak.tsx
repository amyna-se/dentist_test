import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useLearning } from '../../stores/learning';

export function ComboStreak() {
  const { comboStreak } = useLearning();

  if (comboStreak === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="fixed bottom-4 right-4 bg-dark-light rounded-lg p-4 border border-neon-purple/20"
      >
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-neon-purple" />
          <span className="text-2xl font-bold text-neon-purple">
            {comboStreak}x
          </span>
          <span className="text-gray-400">Combo!</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}