import { motion } from 'framer-motion';
import { Clock, Target, Zap } from 'lucide-react';

interface PerformanceMetricsProps {
  metrics: {
    averageResponseTime: number;
    accuracyRate: number;
    completionRate: number;
    fastestResponse: number;
    slowestResponse: number;
    totalTimeSpent: number;
  };
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <div className="bg-dark-light rounded-lg p-6 border border-neon-blue/10">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-5 h-5 text-neon-blue" />
          <h3 className="text-lg font-semibold text-white">Response Times</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Average</span>
            <span className="text-white font-medium">
              {Math.round(metrics.averageResponseTime / 1000)}s
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Fastest</span>
            <span className="text-neon-green font-medium">
              {Math.round(metrics.fastestResponse / 1000)}s
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Slowest</span>
            <span className="text-neon-purple font-medium">
              {Math.round(metrics.slowestResponse / 1000)}s
            </span>
          </div>
        </div>
      </div>

      <div className="bg-dark-light rounded-lg p-6 border border-neon-blue/10">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-5 h-5 text-neon-purple" />
          <h3 className="text-lg font-semibold text-white">Accuracy</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Success Rate</span>
            <span className="text-white font-medium">
              {Math.round(metrics.accuracyRate * 100)}%
            </span>
          </div>
          <div className="h-2 bg-dark rounded-full overflow-hidden">
            <div 
              className="h-full bg-neon-purple transition-all duration-500"
              style={{ width: `${metrics.accuracyRate * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-dark-light rounded-lg p-6 border border-neon-blue/10">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-5 h-5 text-neon-green" />
          <h3 className="text-lg font-semibold text-white">Time Investment</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Total Time</span>
            <span className="text-white font-medium">
              {Math.round(metrics.totalTimeSpent / 60000)}m
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Completion</span>
            <span className="text-neon-green font-medium">
              {Math.round(metrics.completionRate * 100)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}