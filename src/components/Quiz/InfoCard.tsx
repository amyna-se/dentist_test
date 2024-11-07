import { motion } from 'framer-motion';
import { DrAttention } from '../Onboarding/DrAttention';

interface InfoCardProps {
  info: {
    message: string;
    emoji: string;
  };
  onComplete: () => void;
}

export function InfoCard({ info, onComplete }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
    >
      <DrAttention message={info.message} emoji={info.emoji} />
      
      <div className="mt-8 flex justify-end">
        <button
          onClick={onComplete}
          className="px-6 py-3 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
        >
          Start Question
        </button>
      </div>
    </motion.div>
  );
}