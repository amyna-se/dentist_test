import { EducationalMaterial } from '../../../stores/modules/patientEducation';

export const educationQueries = {
  getMaterials: async (): Promise<EducationalMaterial[]> => {
    try {
      const response = await fetch('/api/patient-education');
      if (!response.ok) {
        throw new Error('Failed to fetch educational materials');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getMaterialById: async (id: string): Promise<EducationalMaterial> => {
    try {
      const response = await fetch(`/api/patient-education/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch educational material');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getMaterialsByCategory: async (category: string): Promise<EducationalMaterial[]> => {
    try {
      const response = await fetch(`/api/patient-education?category=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch materials by category');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getMaterialsByLanguage: async (language: string): Promise<EducationalMaterial[]> => {
    try {
      const response = await fetch(`/api/patient-education?language=${language}`);
      if (!response.ok) {
        throw new Error('Failed to fetch materials by language');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  searchMaterials: async (query: string, filters?: any): Promise<EducationalMaterial[]> => {
    try {
      const queryParams = new URLSearchParams({
        q: query,
        ...filters
      });
      const response = await fetch(`/api/patient-education/search?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to search materials');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getTranslations: async (materialId: string): Promise<Record<string, any>> => {
    try {
      const response = await fetch(`/api/patient-education/${materialId}/translations`);
      if (!response.ok) {
        throw new Error('Failed to fetch translations');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
};