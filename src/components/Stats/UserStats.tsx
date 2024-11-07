import { Users, Brain, Trophy, Target } from 'lucide-react';
import { useAuth } from '../../stores/auth';
import { StatCard } from './StatCard';
import { StatGroup } from './StatGroup';

const defaultStats = {
  totalUsers: 0,
  activeUsers: 0,
  completedCourses: 0,
  averageScore: 0,
  userLocations: {
    Stockholm: 0,
    Malmö: 0,
    Göteborg: 0
  },
  userTypes: {
    'Person with diagnosis': 0,
    'Parent': 0,
    'Family member': 0,
    'Spouse': 0
  }
};

export function UserStats() {
  const { userStats } = useAuth();
  const stats = userStats || defaultStats;

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-neon-blue'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: Brain,
      color: 'text-neon-pink'
    },
    {
      title: 'Completed Courses',
      value: stats.completedCourses,
      icon: Trophy,
      color: 'text-neon-green'
    },
    {
      title: 'Average Score',
      value: `${stats.averageScore}%`,
      icon: Target,
      color: 'text-neon-purple'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            index={index}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatGroup
          title="User Locations"
          data={stats.userLocations || {}}
          delay={0.4}
        />
        <StatGroup
          title="User Types"
          data={stats.userTypes || {}}
          delay={0.5}
        />
      </div>
    </div>
  );
}