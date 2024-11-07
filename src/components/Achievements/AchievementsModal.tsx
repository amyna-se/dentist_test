import { motion } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import { useAchievements, Achievement } from '../../stores/achievements';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const { achievements, unlockedAchievements } = useAchievements();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark-light rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-neon-purple" />
            <h2 className="text-2xl font-bold text-white">Achievements</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement: Achievement) => {
            const isUnlocked = unlockedAchievements.includes(achievement.id);
            
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  isUnlocked
                    ? 'border-neon-purple bg-neon-purple/10'
                    : 'border-gray-700 bg-dark/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isUnlocked ? 'bg-neon-purple/20' : 'bg-gray-800'
                  }`}>
                    <span className="text-2xl" role="img" aria-label="achievement icon">
                      {isUnlocked ? achievement.icon : '🔒'}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-bold ${
                      isUnlocked ? 'text-neon-purple' : 'text-gray-400'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {achievement.description}
                    </p>
                    {isUnlocked && achievement.unlockedAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}