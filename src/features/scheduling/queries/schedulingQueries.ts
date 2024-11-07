import { Schedule } from '../../../stores/modules/scheduling';

export const schedulingQueries = {
  getSchedules: async (): Promise<Schedule[]> => {
    try {
      const response = await fetch('/api/scheduling');
      if (!response.ok) {
        throw new Error('Failed to fetch schedules');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getScheduleById: async (id: string): Promise<Schedule> => {
    try {
      const response = await fetch(`/api/scheduling/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch schedule');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getUserSchedules: async (userId: string): Promise<Schedule[]> => {
    try {
      const response = await fetch(`/api/scheduling/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user schedules');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getSchedulesByDateRange: async (start: string, end: string): Promise<Schedule[]> => {
    try {
      const response = await fetch(`/api/scheduling/range?start=${start}&end=${end}`);
      if (!response.ok) {
        throw new Error('Failed to fetch schedules by date range');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  checkAvailability: async (startTime: string, endTime: string, attendees: string[]): Promise<boolean> => {
    try {
      const response = await fetch('/api/scheduling/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startTime, endTime, attendees })
      });
      if (!response.ok) {
        throw new Error('Failed to check availability');
      }
      const data = await response.json();
      return data.available;
    } catch (error) {
      throw error;
    }
  }
};