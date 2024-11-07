import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SpacedRepetitionItem {
  id: string;
  courseId: string;
  questionId: string;
  nextReview: Date;
  interval: number;
  easeFactor: number;
}

interface LearningState {
  spacedRepetitionItems: SpacedRepetitionItem[];
  dailyStreak: number;
  lastStudyDate: string;
  comboStreak: number;
  skillPoints: Record<string, number>;
  scheduleReview: (itemId: string, quality: number) => void;
  updateStreak: () => void;
  updateCombo: (correct: boolean) => void;
  addSkillPoints: (skillId: string, points: number) => void;
}

export const useLearning = create<LearningState>()(
  persist(
    (set, get) => ({
      spacedRepetitionItems: [],
      dailyStreak: 0,
      lastStudyDate: '',
      comboStreak: 0,
      skillPoints: {},

      scheduleReview: (itemId: string, quality: number) => {
        const items = get().spacedRepetitionItems;
        const item = items.find(i => i.id === itemId);
        
        if (item) {
          const newInterval = calculateNextInterval(item.interval, quality);
          const newEaseFactor = calculateNewEaseFactor(item.easeFactor, quality);
          
          set({
            spacedRepetitionItems: items.map(i => 
              i.id === itemId 
                ? {
                    ...i,
                    interval: newInterval,
                    easeFactor: newEaseFactor,
                    nextReview: new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000)
                  }
                : i
            )
          });
        }
      },

      updateStreak: () => {
        const { lastStudyDate, dailyStreak } = get();
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (lastStudyDate === yesterday) {
          set({ dailyStreak: dailyStreak + 1, lastStudyDate: today });
        } else if (lastStudyDate !== today) {
          set({ dailyStreak: 1, lastStudyDate: today });
        }
      },

      updateCombo: (correct: boolean) => {
        if (correct) {
          set(state => ({ comboStreak: state.comboStreak + 1 }));
        } else {
          set({ comboStreak: 0 });
        }
      },

      addSkillPoints: (skillId: string, points: number) => {
        set(state => ({
          skillPoints: {
            ...state.skillPoints,
            [skillId]: (state.skillPoints[skillId] || 0) + points
          }
        }));
      }
    }),
    {
      name: 'learning-storage'
    }
  )
);

function calculateNextInterval(currentInterval: number, quality: number): number {
  if (quality < 3) return 1;
  if (currentInterval === 0) return 1;
  if (currentInterval === 1) return 6;
  return Math.round(currentInterval * 2.5);
}

function calculateNewEaseFactor(oldEaseFactor: number, quality: number): number {
  const newEaseFactor = oldEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  return Math.max(1.3, newEaseFactor);
}