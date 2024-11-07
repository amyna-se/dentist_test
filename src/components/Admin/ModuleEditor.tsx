import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ModuleEditorProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function ModuleEditor({ title, children, onClose }: ModuleEditorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-dark-light rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}