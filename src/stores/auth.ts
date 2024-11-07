import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '../types/user';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  loading: boolean;
  users: Record<string, { email: string; password: string; role: UserRole }>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  addUserCredentials: (email: string, password: string, role: UserRole) => void;
}

const ADMIN_CREDENTIALS = {
  email: 'admin@neurostep.com',
  password: 'admin123'
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      error: null,
      loading: false,
      users: {},

      addUserCredentials: (email: string, password: string, role: UserRole) => {
        set(state => ({
          users: {
            ...state.users,
            [email]: { email, password, role }
          }
        }));
      },

      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          // Check admin credentials
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

          // Check user credentials
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

      register: async (email: string, password: string, name: string, role: UserRole = 'patient') => {
        set({ loading: true, error: null });
        try {
          // Add user credentials
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

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          error: null,
          loading: false
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        users: state.users
      })
    }
  )
);