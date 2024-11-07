import { motion } from 'framer-motion';
import { Badge } from '../../stores/modules/badges';

interface BadgeDisplayProps {
  badge: Badge;
  earned?: boolean;
  progress?: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export function BadgeDisplay({
  badge,
  earned = false,
  progress = 0,
  size = 'md',
  showDetails = false
}: BadgeDisplayProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-yellow-600'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <div
        className={`${sizeClasses[size]} rounded-full relative ${
          earned ? 'bg-gradient-to-br' : 'bg-gray-800'
        } ${earned ? rarityColors[badge.rarity] : ''} flex items-center justify-center`}
      >
        {!earned && progress > 0 && (
          <svg className="absolute inset-0" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${progress}, 100`}
              className="text-neon-blue"
            />
          </svg>
        )}
        <span className={`text-${size === 'sm' ? '2xl' : size === 'md' ? '3xl' : '4xl'}`}>
          {badge.icon}
        </span>
      </div>

      {showDetails && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-dark-light rounded-lg p-3 border border-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <h4 className="font-bold text-white mb-1">{badge.title}</h4>
          <p className="text-sm text-gray-400">{badge.description}</p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className={`text-${earned ? 'neon-green' : 'gray-400'}`}>
              {earned ? 'Earned' : `${progress}% Progress`}
            </span>
            <span className={`text-${
              badge.rarity === 'legendary' ? 'yellow' :
              badge.rarity === 'epic' ? 'purple' :
              badge.rarity === 'rare' ? 'blue' : 'gray'
            }-400 capitalize`}>
              {badge.rarity}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}