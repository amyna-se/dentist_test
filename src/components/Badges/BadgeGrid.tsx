import { motion } from 'framer-motion';
import { BadgeDisplay } from './BadgeDisplay';
import { useBadges } from '../../stores/modules/badges';
import { useState } from 'react';

interface BadgeGridProps {
  userId: string;
}

export function BadgeGrid({ userId }: BadgeGridProps) {
  const { badges, getUserBadges } = useBadges();
  const [filter, setFilter] = useState<'all' | 'earned' | 'progress'>('all');
  const userBadges = getUserBadges(userId);

  const filteredBadges = Object.values(badges).filter(badge => {
    if (filter === 'earned') {
      return userBadges.some(ub => ub.id === badge.id);
    }
    if (filter === 'progress') {
      return userBadges.some(ub => ub.id === badge.id && ub.progress && ub.progress < 100);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Badges & Achievements</h2>
        <div className="flex gap-2">
          {(['all', 'earned', 'progress'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === option
                  ? 'bg-neon-purple text-white'
                  : 'bg-dark-light text-gray-400 hover:bg-neon-purple/20'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredBadges.map((badge) => {
          const userBadge = userBadges.find(ub => ub.id === badge.id);
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <BadgeDisplay
                badge={badge}
                earned={!!userBadge?.earnedAt}
                progress={userBadge?.progress || 0}
                showDetails
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}