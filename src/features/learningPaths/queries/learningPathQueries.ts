import { LearningPath } from '../../../stores/modules/learningPaths';

export const learningPathQueries = {
  getLearningPaths: async (): Promise<LearningPath[]> => {
    try {
      const response = await fetch('/api/learning-paths');
      if (!response.ok) {
        throw new Error('Failed to fetch learning paths');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getLearningPathById: async (id: string): Promise<LearningPath> => {
    try {
      const response = await fetch(`/api/learning-paths/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch learning path');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getUserLearningPaths: async (userId: string): Promise<LearningPath[]> => {
    try {
      const response = await fetch(`/api/learning-paths/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user learning paths');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getLearningPathProgress: async (pathId: string, userId: string): Promise<number> => {
    try {
      const response = await fetch(`/api/learning-paths/${pathId}/progress/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch learning path progress');
      }
      const data = await response.json();
      return data.progress;
    } catch (error) {
      throw error;
    }
  }
};