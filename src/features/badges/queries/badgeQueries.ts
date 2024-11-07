import { Badge } from '../../../stores/modules/badges';

export const badgeQueries = {
  getBadges: async (): Promise<Badge[]> => {
    try {
      const response = await fetch('/api/badges');
      if (!response.ok) {
        throw new Error('Failed to fetch badges');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getUserBadges: async (userId: string): Promise<Badge[]> => {
    try {
      const response = await fetch(`/api/badges/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user badges');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getBadgeProgress: async (badgeId: string, userId: string): Promise<number> => {
    try {
      const response = await fetch(`/api/badges/${badgeId}/progress/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch badge progress');
      }
      const data = await response.json();
      return data.progress;
    } catch (error) {
      throw error;
    }
  },

  checkEligibility: async (badgeId: string, userId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/badges/${badgeId}/eligibility/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to check badge eligibility');
      }
      const data = await response.json();
      return data.eligible;
    } catch (error) {
      throw error;
    }
  }
};