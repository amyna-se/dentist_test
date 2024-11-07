import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, format, parse, isWithinInterval } from 'date-fns';

export interface Schedule {
  id: string;
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
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    until: string;
  };
  reminders: Array<{
    type: 'email' | 'notification';
    beforeMinutes: number;
  }>;
}

interface SchedulingState {
  schedules: Record<string, Schedule>;
  addSchedule: (schedule: Schedule) => void;
  updateSchedule: (id: string, schedule: Partial<Schedule>) => void;
  deleteSchedule: (id: string) => void;
  getSchedulesByDateRange: (start: Date, end: Date) => Schedule[];
  getUserSchedules: (userId: string) => Schedule[];
  checkAvailability: (startTime: string, endTime: string, attendees: string[]) => boolean;
}

export const useScheduling = create<SchedulingState>()(
  persist(
    (set, get) => ({
      schedules: {},

      addSchedule: (schedule) => set((state) => ({
        schedules: { ...state.schedules, [schedule.id]: schedule }
      })),

      updateSchedule: (id, updates) => set((state) => ({
        schedules: {
          ...state.schedules,
          [id]: { ...state.schedules[id], ...updates }
        }
      })),

      deleteSchedule: (id) => set((state) => {
        const { [id]: _, ...rest } = state.schedules;
        return { schedules: rest };
      }),

      getSchedulesByDateRange: (start, end) => {
        return Object.values(get().schedules).filter(schedule => {
          const scheduleStart = new Date(schedule.startTime);
          const scheduleEnd = new Date(schedule.endTime);
          
          return isWithinInterval(scheduleStart, { start, end }) ||
                 isWithinInterval(scheduleEnd, { start, end });
        });
      },

      getUserSchedules: (userId) => {
        return Object.values(get().schedules).filter(schedule =>
          schedule.attendees.includes(userId)
        );
      },

      checkAvailability: (startTime, endTime, attendees) => {
        const schedules = Object.values(get().schedules);
        const start = new Date(startTime);
        const end = new Date(endTime);

        return !schedules.some(schedule =>
          schedule.attendees.some(attendee => attendees.includes(attendee)) &&
          isWithinInterval(start, {
            start: new Date(schedule.startTime),
            end: new Date(schedule.endTime)
          }) ||
          isWithinInterval(end, {
            start: new Date(schedule.startTime),
            end: new Date(schedule.endTime)
          })
        );
      }
    }),
    {
      name: 'scheduling-storage'
    }
  )
);