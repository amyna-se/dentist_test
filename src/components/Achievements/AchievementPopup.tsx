import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Achievement } from '../../stores/achievements';

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.5 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className="bg-dark-light rounded-lg p-4 border border-neon-purple/20 shadow-lg flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center">
              <span className="text-2xl" role="img" aria-label="achievement icon">
                {achievement.icon}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-neon-purple" />
                <h3 className="text-white font-bold">Achievement Unlocked!</h3>
              </div>
              <p className="text-neon-purple font-semibold">{achievement.title}</p>
              <p className="text-sm text-gray-400">{achievement.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}