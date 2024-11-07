import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Badge } from '../../stores/modules/badges';

interface BadgeNotificationProps {
  badge: Badge;
  onClose: () => void;
}

export function BadgeNotification({ badge, onClose }: BadgeNotificationProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.5 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className="bg-dark-light rounded-lg p-4 border border-neon-purple/20 shadow-lg flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center">
            <span className="text-2xl" role="img" aria-label="badge icon">
              {badge.icon}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-neon-purple" />
              <h3 className="text-white font-bold">New Badge Earned!</h3>
            </div>
            <p className="text-neon-purple font-semibold">{badge.title}</p>
            <p className="text-sm text-gray-400">{badge.description}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}