import { User, UserRole } from '../../../types/user';

export const userQueries = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getUsersByRole: async (role: UserRole): Promise<User[]> => {
    try {
      const response = await fetch(`/api/users?role=${role}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users by role');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  searchUsers: async (query: string): Promise<User[]> => {
    try {
      const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search users');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
};