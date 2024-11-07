import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Check } from 'lucide-react';

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00'
];

interface BookingCalendarProps {
  onBooking?: (date: Date, time: string) => void;
}

export function BookingCalendar({ onBooking }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = () => {
    if (selectedDate && selectedTime && onBooking) {
      const [hours, minutes] = selectedTime.split(':');
      const bookingDate = new Date(selectedDate);
      bookingDate.setHours(parseInt(hours), parseInt(minutes));
      
      onBooking(bookingDate, selectedTime);
      setIsBooked(true);
    }
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-blue/10">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center">
          <CalendarIcon className="w-6 h-6 text-neon-blue" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Book a Session</h3>
          <p className="text-gray-400">Select a date and time for your session</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={{ before: new Date() }}
            className="bg-dark rounded-lg p-4"
            classNames={{
              day_selected: "bg-neon-blue text-white",
              day_today: "text-neon-purple font-bold",
              day: "hover:bg-neon-blue/20 rounded-lg transition"
            }}
          />
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-4 h-4 text-neon-purple" />
            <span className="text-gray-400">Available Time Slots</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-lg transition ${
                  selectedTime === time
                    ? 'bg-neon-purple text-white'
                    : 'bg-dark text-gray-400 hover:bg-neon-purple/20'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedDate && selectedTime && !isBooked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-dark rounded-lg border border-neon-blue/10"
        >
          <p className="text-gray-400">
            Selected slot: {format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
          </p>
          <button
            onClick={handleBooking}
            className="mt-4 w-full px-6 py-3 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center justify-center space-x-2"
          >
            <span>Confirm Booking</span>
          </button>
        </motion.div>
      )}

      {isBooked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-neon-green/10 rounded-lg border border-neon-green"
        >
          <div className="flex items-center space-x-2 text-neon-green">
            <Check className="w-5 h-5" />
            <p className="font-semibold">Booking Confirmed!</p>
          </div>
          <p className="text-gray-400 mt-2">
            Your session is scheduled for {format(selectedDate!, 'MMMM d, yyyy')} at {selectedTime}
          </p>
        </motion.div>
      )}
    </div>
  );
}