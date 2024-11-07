import { Report } from '../../../stores/modules/reporting';

interface GenerateReportCommand {
  type: 'compliance' | 'progress' | 'certification' | 'audit';
  title: string;
  dateRange: {
    start: string;
    end: string;
  };
  filters: Record<string, any>;
  format: 'pdf' | 'excel' | 'json';
}

interface ScheduleReportCommand {
  templateId: string;
  schedule: {
    frequency: string;
    recipients: string[];
    nextRun: string;
  };
}

export const reportingCommands = {
  generateReport: async (command: GenerateReportCommand): Promise<Report> => {
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  scheduleReport: async (command: ScheduleReportCommand): Promise<void> => {
    try {
      const response = await fetch('/api/reports/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to schedule report');
      }
    } catch (error) {
      throw error;
    }
  },

  deleteReport: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/reports/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete report');
      }
    } catch (error) {
      throw error;
    }
  },

  exportReport: async (id: string, format: string): Promise<string> => {
    try {
      const response = await fetch(`/api/reports/${id}/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format })
      });

      if (!response.ok) {
        throw new Error('Failed to export report');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      throw error;
    }
  }
};