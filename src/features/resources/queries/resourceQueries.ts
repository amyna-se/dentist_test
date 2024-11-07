import { Resource } from '../../../stores/modules/resources';

export const resourceQueries = {
  getResources: async (): Promise<Resource[]> => {
    try {
      const response = await fetch('/api/resources');
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getResourceById: async (id: string): Promise<Resource> => {
    try {
      const response = await fetch(`/api/resources/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch resource');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getResourcesByCategory: async (category: string): Promise<Resource[]> => {
    try {
      const response = await fetch(`/api/resources?category=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch resources by category');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  searchResources: async (query: string, filters?: any): Promise<Resource[]> => {
    try {
      const queryParams = new URLSearchParams({
        q: query,
        ...filters
      });
      const response = await fetch(`/api/resources/search?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to search resources');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getUserAccessibleResources: async (userId: string): Promise<Resource[]> => {
    try {
      const response = await fetch(`/api/resources/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user accessible resources');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  checkAccess: async (resourceId: string, userId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/resources/${resourceId}/access/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to check access');
      }
      const data = await response.json();
      return data.hasAccess;
    } catch (error) {
      throw error;
    }
  }
};