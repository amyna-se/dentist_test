import { ComplianceRequirement } from '../../../stores/modules/compliance';

export const complianceQueries = {
  getRequirements: async (): Promise<ComplianceRequirement[]> => {
    try {
      const response = await fetch('/api/compliance/requirements');
      if (!response.ok) {
        throw new Error('Failed to fetch compliance requirements');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getRequirementById: async (id: string): Promise<ComplianceRequirement> => {
    try {
      const response = await fetch(`/api/compliance/requirements/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch compliance requirement');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getUserCompliance: async (userId: string): Promise<any> => {
    try {
      const response = await fetch(`/api/compliance/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user compliance');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getUpcomingDeadlines: async (userId: string): Promise<any[]> => {
    try {
      const response = await fetch(`/api/compliance/users/${userId}/deadlines`);
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming deadlines');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getAuditSchedule: async (requirementId: string): Promise<any> => {
    try {
      const response = await fetch(`/api/compliance/requirements/${requirementId}/audit`);
      if (!response.ok) {
        throw new Error('Failed to fetch audit schedule');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  checkCompliance: async (userId: string, requirementId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/compliance/check/${userId}/${requirementId}`);
      if (!response.ok) {
        throw new Error('Failed to check compliance');
      }
      const data = await response.json();
      return data.compliant;
    } catch (error) {
      throw error;
    }
  }
};