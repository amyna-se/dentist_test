import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onComplete,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      {/* Header with logo */}
      <header className="p-6">
        <div className="flex items-center justify-center">
          <Brain className="h-8 w-8 text-neon-blue" />
          <span className="text-2xl font-bold text-neon-blue animate-neon-pulse ml-2">
            NeuroStep
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-light rounded-lg p-8 border border-neon-blue/10 shadow-xl"
            >
              {children}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={onPrev}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition ${
                currentStep === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index + 1 === currentStep
                      ? 'bg-neon-blue'
                      : 'bg-neon-blue/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={currentStep === totalSteps ? onComplete : onNext}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
            >
              <span>{currentStep === totalSteps ? 'Get Started' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}