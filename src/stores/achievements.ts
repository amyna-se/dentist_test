import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

interface AchievementsState {
  achievements: Achievement[];
  unlockedAchievements: string[];
  unlockAchievement: (id: string) => void;
  checkAchievement: (condition: string, value: any) => void;
}

const achievements: Achievement[] = [
  {
    id: 'first_quiz',
    title: 'First Steps',
    description: 'Complete your first quiz',
    icon: '🎯'
  },
  {
    id: 'perfect_score',
    title: 'Perfect Mind',
    description: 'Get a perfect score on any quiz',
    icon: '🏆'
  },
  {
    id: 'streak_3',
    title: 'On Fire',
    description: 'Maintain a 3-day learning streak',
    icon: '🔥'
  },
  {
    id: 'all_courses',
    title: 'Knowledge Seeker',
    description: 'Start all available courses',
    icon: '📚'
  },
  {
    id: 'level_10',
    title: 'Rising Star',
    description: 'Reach level 10',
    icon: '⭐'
  }
];

export const useAchievements = create<AchievementsState>()(
  persist(
    (set, get) => ({
      achievements,
      unlockedAchievements: [],
      unlockAchievement: (id: string) => {
        const { unlockedAchievements } = get();
        if (!unlockedAchievements.includes(id)) {
          set({
            unlockedAchievements: [...unlockedAchievements, id]
          });
        }
      },
      checkAchievement: (condition: string, value: any) => {
        const { unlockAchievement } = get();
        
        switch (condition) {
          case 'quiz_complete':
            unlockAchievement('first_quiz');
            if (value === 100) {
              unlockAchievement('perfect_score');
            }
            break;
          case 'level_up':
            if (value >= 10) {
              unlockAchievement('level_10');
            }
            break;
          case 'courses_started':
            if (value === 4) { // Total number of courses
              unlockAchievement('all_courses');
            }
            break;
          case 'daily_streak':
            if (value >= 3) {
              unlockAchievement('streak_3');
            }
            break;
        }
      }
    }),
    {
      name: 'achievements-storage'
    }
  )
);