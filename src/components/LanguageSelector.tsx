import { useState } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' }
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageChange = (language: typeof languages[0]) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-dark-light hover:bg-dark-lighter transition"
      >
        <Globe className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400">{selectedLanguage.flag}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 rounded-lg bg-dark-light border border-neon-blue/10 shadow-lg z-50"
            >
              {languages.map(language => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-400 hover:bg-dark-lighter transition first:rounded-t-lg last:rounded-b-lg"
                >
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                  {language.code === selectedLanguage.code && (
                    <span className="ml-auto text-neon-blue">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}