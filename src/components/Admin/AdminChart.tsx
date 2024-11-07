import { motion } from 'framer-motion';

interface ChartData {
  name: string;
  value: number;
}

interface AdminChartProps {
  data: ChartData[];
}

export function AdminChart({ data }: AdminChartProps) {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={item.name} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{item.name}</span>
            <span className="text-white font-bold">{item.value}</span>
          </div>
          <div className="h-2 bg-dark rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / maxValue) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}