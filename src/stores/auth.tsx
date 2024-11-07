import { create } from 'zustand';

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  completedCourses: number;
  averageScore: number;
  totalXP: number;
  currentStreak: number;
  lastLoginDate: string;
  userLocations: {
    Stockholm: number;
    Malmö: number;
    Göteborg: number;
  };
  userTypes: {
    'Person with diagnosis': number;
    'Parent': number;
    'Family member': number;
    'Spouse': number;
  };
}

interface CourseProgress {
  [courseId: string]: number;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: any | null;
  userStats: UserStats | null;
  courseProgress: CourseProgress;
  login: (userData: any) => void;
  logout: () => void;
  updateUserStats: (stats: Partial<UserStats>) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  userStats: {
    totalUsers: 0,
    activeUsers: 0,
    completedCourses: 0,
    averageScore: 0,
    totalXP: 0,
    currentStreak: 0,
    lastLoginDate: new Date().toISOString(),
    userLocations: {
      Stockholm: 0,
      Malmö: 0,
      Göteborg: 0
    },
    userTypes: {
      'Person with diagnosis': 0,
      'Parent': 0,
      'Family member': 0,
      'Spouse': 0
    }
  },
  courseProgress: {},
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
  updateUserStats: (stats) =>
    set((state) => ({
      userStats: state.userStats ? { ...state.userStats, ...stats } : stats
    })),
  updateCourseProgress: (courseId, progress) =>
    set((state) => ({
      courseProgress: { ...state.courseProgress, [courseId]: progress }
    }))
}));