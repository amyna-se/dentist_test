import { Schedule } from '../../../stores/modules/scheduling';

interface CreateScheduleCommand {
  type: 'training' | 'assessment' | 'meeting';
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  location?: {
    type: 'online' | 'physical';
    details: string;
  };
  reminders?: Array<{
    type: 'email' | 'notification';
    beforeMinutes: number;
  }>;
}

interface UpdateScheduleCommand extends Partial<CreateScheduleCommand> {
  id: string;
}

export const schedulingCommands = {
  createSchedule: async (command: CreateScheduleCommand): Promise<Schedule> => {
    try {
      const response = await fetch('/api/scheduling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to create schedule');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  updateSchedule: async (command: UpdateScheduleCommand): Promise<Schedule> => {
    try {
      const response = await fetch(`/api/scheduling/${command.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to update schedule');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  deleteSchedule: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/scheduling/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete schedule');
      }
    } catch (error) {
      throw error;
    }
  },

  addAttendee: async (scheduleId: string, userId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/scheduling/${scheduleId}/attendees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        throw new Error('Failed to add attendee');
      }
    } catch (error) {
      throw error;
    }
  },

  removeAttendee: async (scheduleId: string, userId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/scheduling/${scheduleId}/attendees/${userId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to remove attendee');
      }
    } catch (error) {
      throw error;
    }
  }
};