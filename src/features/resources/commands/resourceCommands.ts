import { Resource } from '../../../stores/modules/resources';

interface CreateResourceCommand {
  title: string;
  type: 'document' | 'video' | 'audio' | 'link';
  category: string;
  tags: string[];
  content: {
    url?: string;
    markdown?: string;
    duration?: number;
    fileSize?: number;
  };
  access: {
    roles: string[];
    departments?: string[];
    requiresCertification?: string[];
  };
}

interface UpdateResourceCommand extends Partial<CreateResourceCommand> {
  id: string;
}

export const resourceCommands = {
  createResource: async (command: CreateResourceCommand): Promise<Resource> => {
    try {
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to create resource');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  updateResource: async (command: UpdateResourceCommand): Promise<Resource> => {
    try {
      const response = await fetch(`/api/resources/${command.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to update resource');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  deleteResource: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/resources/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }
    } catch (error) {
      throw error;
    }
  },

  updateAccess: async (resourceId: string, access: any): Promise<void> => {
    try {
      const response = await fetch(`/api/resources/${resourceId}/access`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(access)
      });

      if (!response.ok) {
        throw new Error('Failed to update access');
      }
    } catch (error) {
      throw error;
    }
  }
};