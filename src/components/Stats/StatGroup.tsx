import { motion } from 'framer-motion';

interface StatGroupProps {
  title: string;
  data: Record<string, number>;
  delay: number;
}

export function StatGroup({ title, data, delay }: StatGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-dark-light p-6 rounded-lg border border-neon-blue/10"
    >
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {Object.entries(data || {}).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-gray-400">{key}</span>
            <span className="text-white font-medium">{value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}