import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '../types/user';

interface UsersState {
  users: Record<string, User>;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  assignLearningPath: (userId: string, pathId: string) => void;
  updatePathProgress: (userId: string, pathId: string, progress: number) => void;
  getUsersByRole: (role: UserRole) => User[];
}

export const useUsers = create<UsersState>()(
  persist(
    (set, get) => ({
      users: {},

      addUser: (user) => {
        // Remove password from stored user data
        const { password, ...userWithoutPassword } = user;
        set((state) => ({
          users: { ...state.users, [user.id]: userWithoutPassword }
        }));
      },

      updateUser: (id, updates) => {
        // Remove password from stored user data if it exists in updates
        const { password, ...updatesWithoutPassword } = updates;
        set((state) => ({
          users: {
            ...state.users,
            [id]: { ...state.users[id], ...updatesWithoutPassword }
          }
        }));
      },

      deleteUser: (id) => set((state) => {
        const { [id]: _, ...rest } = state.users;
        return { users: rest };
      }),

      assignLearningPath: (userId, pathId) => set((state) => {
        const user = state.users[userId];
        if (!user) return state;

        return {
          users: {
            ...state.users,
            [userId]: {
              ...user,
              profile: {
                ...user.profile,
                assignedPaths: [...(user.profile?.assignedPaths || []), pathId]
              }
            }
          }
        };
      }),

      updatePathProgress: (userId, pathId, progress) => set((state) => {
        const user = state.users[userId];
        if (!user) return state;

        return {
          users: {
            ...state.users,
            [userId]: {
              ...user,
              profile: {
                ...user.profile,
                progress: {
                  ...(user.profile?.progress || {}),
                  [pathId]: progress
                }
              }
            }
          }
        };
      }),

      getUsersByRole: (role) => {
        return Object.values(get().users).filter(user => user.role === role);
      }
    }),
    {
      name: 'users-storage',
      partialize: (state) => ({
        // Never persist passwords
        users: Object.fromEntries(
          Object.entries(state.users).map(([id, user]) => {
            const { password, ...userWithoutPassword } = user;
            return [id, userWithoutPassword];
          })
        )
      })
    }
  )
);