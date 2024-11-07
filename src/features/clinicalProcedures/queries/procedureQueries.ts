import { ClinicalProcedure } from '../../../stores/modules/clinicalProcedures';

export const procedureQueries = {
  getProcedures: async (): Promise<ClinicalProcedure[]> => {
    try {
      const response = await fetch('/api/procedures');
      if (!response.ok) {
        throw new Error('Failed to fetch procedures');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getProcedureById: async (id: string): Promise<ClinicalProcedure> => {
    try {
      const response = await fetch(`/api/procedures/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch procedure');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getProceduresByCategory: async (category: string): Promise<ClinicalProcedure[]> => {
    try {
      const response = await fetch(`/api/procedures?category=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch procedures by category');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getProceduresByRiskLevel: async (riskLevel: string): Promise<ClinicalProcedure[]> => {
    try {
      const response = await fetch(`/api/procedures?riskLevel=${riskLevel}`);
      if (!response.ok) {
        throw new Error('Failed to fetch procedures by risk level');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  searchProcedures: async (query: string): Promise<ClinicalProcedure[]> => {
    try {
      const response = await fetch(`/api/procedures/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search procedures');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  checkUserAuthorization: async (userId: string, procedureId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/procedures/${procedureId}/authorization/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to check authorization');
      }
      const data = await response.json();
      return data.authorized;
    } catch (error) {
      throw error;
    }
  }
};