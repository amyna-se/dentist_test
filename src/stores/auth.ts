// Import necessary libraries and types
import { create } from 'zustand'; // Zustand for state management
import { persist } from 'zustand/middleware'; // Middleware for persisting state
import { User, UserRole } from '../types/user'; // User and role type definitions
import { Course } from '../pages/Dashboard'; // Course type for progress tracking

// Define the interface for the authentication state
interface AuthState {
  isAuthenticated: boolean; // Whether the user is logged in
  user: User | null; // The currently logged-in user
  error: string | null; // Error message for failed operations
  loading: boolean; // Whether an operation is in progress
  users: Record<string, { email: string; password: string; role: UserRole }>; // Registered users
  courseProgress: Record<string, number>; // Tracks progress for each course
  userStats: {
    totalXP: number; // Total experience points
    completedCourses: number; // Number of completed courses
    currentStreak: number; // Current streak of activity
  };
  courses: Course[]; // List of available courses
  isAdmin: boolean; // Whether the current user has admin privileges
  login: (email: string, password: string) => Promise<void>; // Login function
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<void>; // Register function
  logout: () => void; // Logout function
  addUserCredentials: (email: string, password: string, role: UserRole) => void; // Add new user credentials
  updateCourseProgress: (courseId: string, progress: number) => void; // Update course progress
}

// Hardcoded admin credentials for testing/admin login
const ADMIN_CREDENTIALS = {
  email: 'admin@neurostep.com',
  password: 'admin123'
};

// Zustand store for managing authentication state
export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      // Default state
      isAuthenticated: false,
      user: null,
      error: null,
      loading: false,
      users: {}, // All registered users
      courseProgress: {}, // Course progress per user
      userStats: {
        totalXP: 0,
        completedCourses: 0,
        currentStreak: 0
      },
      courses: [],
      isAdmin: false,

      /**
       * Adds a new user's credentials to the `users` store.
       */
      addUserCredentials: (email: string, password: string, role: UserRole) => {
        set((state) => ({
          users: {
            ...state.users,
            [email]: { email, password, role }
          }
        }));
      },

      /**
       * Logs in a user by verifying credentials.
       * Supports both admin and regular users.
       */
      login: async (email: string, password: string) => {
        set({ loading: true, error: null }); // Set loading state
        try {
          // Check if the credentials match the hardcoded admin credentials
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

          // Check if the user exists in the `users` store
          const userCreds = get().users[email];
          if (userCreds && userCreds.password === password) {
            const user: User = {
              id: `user-${Date.now()}`,
              email,
              name: email.split('@')[0], // Extract name from email
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

          // If credentials don't match, throw an error
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

      /**
       * Registers a new user by adding their credentials to the store.
       * Automatically logs them in after registration.
       */
      register: async (email: string, password: string, name: string, role: UserRole = 'patient') => {
        set({ loading: true, error: null });
        try {
          // Add the user's credentials
          get().addUserCredentials(email, password, role);

          // Create a new user object
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

          // Update state to log in the new user
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

      /**
       * Logs out the current user.
       * Resets authentication-related state.
       */
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          error: null,
          loading: false
        });
      },

      /**
       * Updates the user's progress for a specific course.
       * Also updates user stats such as XP and completed courses.
       */
      updateCourseProgress: (courseId: string, progress: number) => {
        set((state) => ({
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
      // Config for persistence
      name: 'auth-storage', // Key for storing the state
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
