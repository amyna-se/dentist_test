import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  requiredFor: string[];
  prerequisites: string[];
  modules: string[];
  certificationId?: string;
  estimatedHours: number;
  validityPeriod?: number; // in months
  compliance?: {
    required: boolean;
    renewalPeriod: number; // in months
    regulatoryBody?: string;
  };
}

interface LearningPathState {
  paths: Record<string, LearningPath>;
  addPath: (path: LearningPath) => void;
  updatePath: (id: string, path: Partial<LearningPath>) => void;
  deletePath: (id: string) => void;
  assignPathToUser: (pathId: string, userId: string) => void;
  getUserPaths: (userId: string) => LearningPath[];
}

export const useLearningPaths = create<LearningPathState>()(
  persist(
    (set, get) => ({
      paths: {},
      
      addPath: (path) => set((state) => ({
        paths: { ...state.paths, [path.id]: path }
      })),

      updatePath: (id, updates) => set((state) => ({
        paths: {
          ...state.paths,
          [id]: { ...state.paths[id], ...updates }
        }
      })),

      deletePath: (id) => set((state) => {
        const { [id]: _, ...rest } = state.paths;
        return { paths: rest };
      }),

      assignPathToUser: (pathId, userId) => {
        // Implementation would connect to user management system
        console.log(`Assigning path ${pathId} to user ${userId}`);
      },

      getUserPaths: (userId) => {
        // Implementation would fetch from user's assigned paths
        return Object.values(get().paths);
      }
    }),
    {
      name: 'learning-paths-storage'
    }
  )
);