import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Globe, Bell, Moon, Sun } from 'lucide-react';
import { LanguageSelector } from '../LanguageSelector';

interface UserSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserSettings({ isOpen, onClose }: UserSettingsProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-dark-light rounded-lg p-6 max-w-md w-full"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-neon-purple" />
          <h2 className="text-xl font-bold text-white">User Settings</h2>
        </div>

        <div className="space-y-6">
          {/* Language Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Language
            </h3>
            <div className="flex items-center justify-between p-3 bg-dark rounded-lg">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-neon-blue" />
                <span className="text-white">Select Language</span>
              </div>
              <LanguageSelector />
            </div>
          </div>

          {/* Theme Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Theme
            </h3>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center justify-between p-3 bg-dark rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-neon-purple" />
                ) : (
                  <Sun className="w-5 h-5 text-neon-yellow" />
                )}
                <span className="text-white">
                  {darkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
              <div className={`w-10 h-6 rounded-full transition ${
                darkMode ? 'bg-neon-purple/20' : 'bg-neon-yellow/20'
              }`}>
                <div className={`w-4 h-4 rounded-full transition transform ${
                  darkMode ? 'translate-x-5 bg-neon-purple' : 'translate-x-1 bg-neon-yellow'
                }`} />
              </div>
            </button>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Notifications
            </h3>
            <button
              onClick={() => setNotifications(!notifications)}
              className="w-full flex items-center justify-between p-3 bg-dark rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-neon-green" />
                <span className="text-white">Enable Notifications</span>
              </div>
              <div className={`w-10 h-6 rounded-full transition ${
                notifications ? 'bg-neon-green/20' : 'bg-gray-700'
              }`}>
                <div className={`w-4 h-4 rounded-full transition transform ${
                  notifications ? 'translate-x-5 bg-neon-green' : 'translate-x-1 bg-gray-500'
                }`} />
              </div>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}