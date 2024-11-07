import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface DrAttentionProps {
  message: string;
  emoji?: string;
}

export function DrAttention({ message, emoji = '🤖' }: DrAttentionProps) {
  return (
    <div className="flex items-start space-x-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="flex-shrink-0"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-neon-blue/20 flex items-center justify-center overflow-hidden">
            <span className="text-5xl" role="img" aria-label="Dr Attention">
              {emoji}
            </span>
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-neon-purple flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Brain className="w-5 h-5 text-white" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-grow"
      >
        <div className="bg-dark rounded-lg p-6 border border-neon-blue/10 relative">
          <div className="absolute left-0 top-6 -ml-3 w-3 h-3 bg-dark border-l border-t border-neon-blue/10 transform rotate-45" />
          <p className="text-lg text-gray-200 leading-relaxed">{message}</p>
        </div>
      </motion.div>
    </div>
  );
}