import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AdminMetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export function AdminMetricCard({ title, value, icon: Icon, color }: AdminMetricCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-dark-light rounded-lg p-6 border border-neon-${color}/10`}
    >
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-lg bg-neon-${color}/10 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-neon-${color}`} />
        </div>
        <div>
          <p className="text-gray-400">{title}</p>
          <p className={`text-2xl font-bold text-neon-${color}`}>
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}