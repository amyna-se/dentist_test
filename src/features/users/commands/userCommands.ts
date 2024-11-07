import { User, UserRole } from '../../../types/user';

interface CreateUserCommand {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

interface UpdateUserCommand {
  id: string;
  email?: string;
  name?: string;
  role?: UserRole;
}

export const userCommands = {
  createUser: async (command: CreateUserCommand): Promise<User> => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (command: UpdateUserCommand): Promise<User> => {
    try {
      const response = await fetch(`/api/users/${command.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      throw error;
    }
  },

  assignRole: async (userId: string, role: UserRole): Promise<void> => {
    try {
      const response = await fetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });

      if (!response.ok) {
        throw new Error('Failed to assign role');
      }
    } catch (error) {
      throw error;
    }
  }
};