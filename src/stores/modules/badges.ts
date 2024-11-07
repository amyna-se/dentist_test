import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'achievement' | 'completion' | 'skill' | 'mastery';
  criteria: {
    type: 'course' | 'path' | 'assessment' | 'streak';
    id?: string;
    value?: number;
    condition?: string;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  metadata: {
    createdAt: string;
    updatedAt: string;
    version: string;
  };
}

interface UserBadge extends Badge {
  earnedAt: string;
  progress?: number;
}

interface BadgeState {
  badges: Record<string, Badge>;
  userBadges: Record<string, Record<string, UserBadge>>;
  addBadge: (badge: Badge) => void;
  updateBadge: (id: string, badge: Partial<Badge>) => void;
  deleteBadge: (id: string) => void;
  awardBadge: (userId: string, badgeId: string) => void;
  updateBadgeProgress: (userId: string, badgeId: string, progress: number) => void;
  getUserBadges: (userId: string) => UserBadge[];
  checkBadgeEligibility: (userId: string, badgeId: string) => boolean;
}

export const useBadges = create<BadgeState>()(
  persist(
    (set, get) => ({
      badges: {
        'course-master': {
          id: 'course-master',
          title: 'Course Master',
          description: 'Complete all courses in a learning path',
          icon: '🎓',
          type: 'completion',
          criteria: {
            type: 'path',
            condition: 'complete_all_courses'
          },
          rarity: 'epic',
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: '1.0'
          }
        },
        'perfect-score': {
          id: 'perfect-score',
          title: 'Perfect Score',
          description: 'Achieve 100% on any assessment',
          icon: '⭐',
          type: 'achievement',
          criteria: {
            type: 'assessment',
            value: 100,
            condition: 'score_equals'
          },
          rarity: 'rare',
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: '1.0'
          }
        },
        'learning-streak': {
          id: 'learning-streak',
          title: 'Learning Streak',
          description: 'Maintain a 7-day learning streak',
          icon: '🔥',
          type: 'achievement',
          criteria: {
            type: 'streak',
            value: 7,
            condition: 'days_consecutive'
          },
          rarity: 'common',
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: '1.0'
          }
        }
      },
      userBadges: {},

      addBadge: (badge) => set((state) => ({
        badges: { ...state.badges, [badge.id]: badge }
      })),

      updateBadge: (id, updates) => set((state) => ({
        badges: {
          ...state.badges,
          [id]: { ...state.badges[id], ...updates }
        }
      })),

      deleteBadge: (id) => set((state) => {
        const { [id]: _, ...rest } = state.badges;
        return { badges: rest };
      }),

      awardBadge: (userId, badgeId) => set((state) => {
        const badge = state.badges[badgeId];
        if (!badge) return state;

        return {
          userBadges: {
            ...state.userBadges,
            [userId]: {
              ...state.userBadges[userId],
              [badgeId]: {
                ...badge,
                earnedAt: new Date().toISOString(),
                progress: 100
              }
            }
          }
        };
      }),

      updateBadgeProgress: (userId, badgeId, progress) => set((state) => {
        const userBadge = state.userBadges[userId]?.[badgeId];
        if (!userBadge) return state;

        return {
          userBadges: {
            ...state.userBadges,
            [userId]: {
              ...state.userBadges[userId],
              [badgeId]: {
                ...userBadge,
                progress
              }
            }
          }
        };
      }),

      getUserBadges: (userId) => {
        const state = get();
        return Object.values(state.userBadges[userId] || {});
      },

      checkBadgeEligibility: (userId, badgeId) => {
        const state = get();
        const badge = state.badges[badgeId];
        if (!badge) return false;

        // Implement badge criteria checking logic here
        // This would connect with other stores to verify conditions
        return false;
      }
    }),
    {
      name: 'badges-storage'
    }
  )
);