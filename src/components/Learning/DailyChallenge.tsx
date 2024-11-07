import { motion } from 'framer-motion';
import { Calendar, Star } from 'lucide-react';
import { useState } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
}

const dailyChallenges: Challenge[] = [
  {
    id: 'daily-1',
    title: 'Quick Learner',
    description: 'Complete 3 lessons today',
    xpReward: 100,
    completed: false
  },
  {
    id: 'daily-2',
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    xpReward: 200,
    completed: false
  },
  {
    id: 'daily-3',
    title: 'Study Streak',
    description: 'Study for 15 minutes',
    xpReward: 50,
    completed: false
  }
];

export function DailyChallenge() {
  const [challenges] = useState<Challenge[]>(dailyChallenges);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-neon-blue" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Daily Challenges</h3>
          <p className="text-gray-400">Complete challenges to earn bonus XP</p>
        </div>
      </div>

      <div className="space-y-4">
        {challenges.map(challenge => (
          <div
            key={challenge.id}
            className={`p-4 rounded-lg border ${
              challenge.completed
                ? 'border-neon-green bg-neon-green/10'
                : 'border-neon-blue/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white">{challenge.title}</h4>
                <p className="text-gray-400">{challenge.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-neon-purple" />
                <span className="text-neon-purple font-bold">
                  {challenge.xpReward} XP
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}