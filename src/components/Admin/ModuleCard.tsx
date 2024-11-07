import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  stats: {
    label: string;
    value: string | number;
  }[];
  onEdit?: () => void;
  color?: string;
}

export function ModuleCard({
  title,
  description,
  icon: Icon,
  stats,
  onEdit,
  color = 'blue'
}: ModuleCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-dark-light rounded-lg p-6 border border-neon-${color}/10`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className={`w-12 h-12 rounded-lg bg-neon-${color}/10 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-neon-${color}`} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className={`text-xl font-bold text-neon-${color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {onEdit && (
        <button
          onClick={onEdit}
          className={`w-full px-4 py-2 rounded-lg bg-neon-${color}/20 text-neon-${color} hover:bg-neon-${color}/30 transition`}
        >
          Manage
        </button>
      )}
    </motion.div>
  );
}