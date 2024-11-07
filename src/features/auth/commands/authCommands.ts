import { User, UserRole } from '../../../types/user';

interface RegisterCommand {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

interface LoginCommand {
  email: string;
  password: string;
}

export const authCommands = {
  register: async (command: RegisterCommand): Promise<User> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  login: async (command: LoginCommand): Promise<User> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      throw error;
    }
  }
};