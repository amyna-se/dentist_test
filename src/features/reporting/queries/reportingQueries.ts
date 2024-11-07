import { Report } from '../../../stores/modules/reporting';

export const reportingQueries = {
  getReports: async (): Promise<Report[]> => {
    try {
      const response = await fetch('/api/reports');
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getReportById: async (id: string): Promise<Report> => {
    try {
      const response = await fetch(`/api/reports/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch report');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getReportsByType: async (type: string): Promise<Report[]> => {
    try {
      const response = await fetch(`/api/reports?type=${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reports by type');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getScheduledReports: async (): Promise<any[]> => {
    try {
      const response = await fetch('/api/reports/scheduled');
      if (!response.ok) {
        throw new Error('Failed to fetch scheduled reports');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getReportTemplates: async (): Promise<any[]> => {
    try {
      const response = await fetch('/api/reports/templates');
      if (!response.ok) {
        throw new Error('Failed to fetch report templates');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
};