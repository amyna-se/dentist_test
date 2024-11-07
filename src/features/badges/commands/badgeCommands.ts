import { Badge } from '../../../stores/modules/badges';

interface CreateBadgeCommand {
  title: string;
  description: string;
  icon: string;
  type: 'achievement' | 'completion' | 'skill' | 'mastery';
  criteria: {
    type: string;
    value?: number;
    condition?: string;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const badgeCommands = {
  createBadge: async (command: CreateBadgeCommand): Promise<Badge> => {
    try {
      const response = await fetch('/api/badges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to create badge');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  awardBadge: async (badgeId: string, userId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/badges/${badgeId}/award`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        throw new Error('Failed to award badge');
      }
    } catch (error) {
      throw error;
    }
  },

  updateProgress: async (badgeId: string, userId: string, progress: number): Promise<void> => {
    try {
      const response = await fetch(`/api/badges/${badgeId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, progress })
      });

      if (!response.ok) {
        throw new Error('Failed to update badge progress');
      }
    } catch (error) {
      throw error;
    }
  }
};