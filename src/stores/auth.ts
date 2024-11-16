import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '../types/user';
import { Course } from '../pages/Dashboard';

// Interface for authentication state
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  loading: boolean;
  users: Record<string, { email: string; password: string; role: UserRole }>;
  courseProgress: Record<string, number>;
  userStats: {
    totalXP: number;
    completedCourses: number;
    currentStreak: number;
  };
  courses: Course[];
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  addUserCredentials: (email: string, password: string, role: UserRole) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
}

// Admin credentials for login
const ADMIN_CREDENTIALS = {
  email: 'admin@neurostep.com',
  password: 'admin123'
};

// Zustand store for authentication
export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      error: null,
      loading: false,
      users: {},
      courseProgress: {},
      userStats: {
        totalXP: 0,
        completedCourses: 0,
        currentStreak: 0
      },
      courses: [],
      isAdmin: false,

      // Add user credentials to the store
      addUserCredentials: (email: string, password: string, role: UserRole) => {
        set(state => ({
          users: {
            ...state.users,
            [email]: { email, password, role }
          }
        }));
      },

      // Handle user login
      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            const adminUser: User = {
              id: 'admin-1',
              email,
              name: 'Admin User',
              role: 'admin',
              createdAt: new Date().toISOString(),
              profile: {
                type: 'admin',
                assignedPaths: [],
                completedPaths: [],
                progress: {}
              }
            };
            set({
              isAuthenticated: true,
              user: adminUser,
              loading: false
            });
            return;
          }

          const userCreds = get().users[email];
          if (userCreds && userCreds.password === password) {
            const user: User = {
              id: `user-${Date.now()}`,
              email,
              name: email.split('@')[0],
              role: userCreds.role,
              createdAt: new Date().toISOString(),
              profile: {
                type: userCreds.role,
                assignedPaths: [],
                completedPaths: [],
                progress: {}
              }
            };
            set({
              isAuthenticated: true,
              user,
              loading: false
            });
            return;
          }

          throw new Error('Invalid credentials');
        } catch (error: any) {
          set({
            error: error.message || 'Authentication failed',
            loading: false,
            isAuthenticated: false,
            user: null
          });
          throw error;
        }
      },

      // Handle user registration
      register: async (email: string, password: string, name: string, role: UserRole = 'patient') => {
        set({ loading: true, error: null });
        try {
          get().addUserCredentials(email, password, role);

          const user: User = {
            id: `user-${Date.now()}`,
            email,
            name,
            role,
            createdAt: new Date().toISOString(),
            profile: {
              type: role,
              assignedPaths: [],
              completedPaths: [],
              progress: {}
            }
          };

          set({
            isAuthenticated: true,
            user,
            loading: false
          });
        } catch (error: any) {
          set({
            error: error.message || 'Registration failed',
            loading: false,
            isAuthenticated: false,
            user: null
          });
          throw error;
        }
      },

      // Handle user logout
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          error: null,
          loading: false
        });
      },

      // Update course progress for a user
      updateCourseProgress: (courseId: string, progress: number) => {
        set(state => ({
          courseProgress: {
            ...state.courseProgress,
            [courseId]: progress
          },
          userStats: {
            ...state.userStats,
            completedCourses: progress === 100
              ? state.userStats.completedCourses + 1
              : state.userStats.completedCourses,
            totalXP: state.userStats.totalXP + Math.floor(progress / 10)
          }
        }));
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        users: state.users,
        courseProgress: state.courseProgress,
        userStats: state.userStats,
        courses: state.courses,
        isAdmin: state.isAdmin
      })
    }
  )
);