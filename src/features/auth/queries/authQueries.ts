import { User } from '../../../types/user';

export const authQueries = {
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        return null;
      }
      return response.json();
    } catch (error) {
      return null;
    }
  },

  verifyToken: async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};