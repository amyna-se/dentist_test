import { LearningPath } from '../../../stores/modules/learningPaths';

interface CreateLearningPathCommand {
  title: string;
  description: string;
  category: string;
  prerequisites: string[];
  modules: string[];
  estimatedHours: number;
}

interface UpdateLearningPathCommand extends CreateLearningPathCommand {
  id: string;
}

export const learningPathCommands = {
  createLearningPath: async (command: CreateLearningPathCommand): Promise<LearningPath> => {
    try {
      const response = await fetch('/api/learning-paths', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to create learning path');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  updateLearningPath: async (command: UpdateLearningPathCommand): Promise<LearningPath> => {
    try {
      const response = await fetch(`/api/learning-paths/${command.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to update learning path');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  assignToUser: async (pathId: string, userId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/learning-paths/${pathId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        throw new Error('Failed to assign learning path');
      }
    } catch (error) {
      throw error;
    }
  },

  updateProgress: async (pathId: string, userId: string, progress: number): Promise<void> => {
    try {
      const response = await fetch(`/api/learning-paths/${pathId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, progress })
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }
    } catch (error) {
      throw error;
    }
  }
};