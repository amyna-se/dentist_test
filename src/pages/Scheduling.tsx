import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Users, Video } from 'lucide-react';
import { BookingCalendar } from '../components/Calendar/BookingCalendar';
import { useScheduling } from '../stores/modules/scheduling';
import { format } from 'date-fns';

export function Scheduling() {
  const { schedules, addSchedule } = useScheduling();
  const [showBooking, setShowBooking] = useState(false);

  const handleBooking = (date: Date, time: string) => {
    const schedule = {
      id: `schedule-${Date.now()}`,
      type: 'training',
      title: 'Training Session',
      startTime: date.toISOString(),
      endTime: new Date(date.getTime() + 60 * 60 * 1000).toISOString(), // 1 hour duration
      attendees: ['user1'],
      location: {
        type: 'online',
        details: 'Zoom meeting link will be provided'
      },
      reminders: [
        {
          type: 'email',
          beforeMinutes: 60
        }
      ]
    };

    addSchedule(schedule);
  };

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neon-blue">Schedule</h1>
            <p className="text-gray-400 mt-2">Manage your training sessions and meetings</p>
          </div>
          <button
            onClick={() => setShowBooking(!showBooking)}
            className="px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition"
          >
            Book Session
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-dark-light rounded-lg p-6 border border-neon-blue/10">
              <h2 className="text-xl font-bold text-white mb-6">Upcoming Sessions</h2>
              <div className="space-y-4">
                {Object.values(schedules).map((schedule) => (
                  <motion.div
                    key={schedule.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark rounded-lg p-4 border border-neon-blue/10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                          {schedule.location?.type === 'online' ? (
                            <Video className="w-5 h-5 text-neon-blue" />
                          ) : (
                            <Users className="w-5 h-5 text-neon-blue" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{schedule.title}</h3>
                          <p className="text-gray-400">
                            {format(new Date(schedule.startTime), 'MMM d, yyyy')} at{' '}
                            {format(new Date(schedule.startTime), 'h:mm a')}
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-400">
                        {schedule.location?.type === 'online' ? 'Online' : 'In Person'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {showBooking && (
            <div className="lg:col-span-1">
              <BookingCalendar onBooking={handleBooking} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}