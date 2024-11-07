import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'select' | 'radio' | 'checkbox';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface OnboardingStep {
  id: string;
  type: 'welcome' | 'form' | 'info' | 'calendar' | 'guide';
  title: string;
  content: string;
  emoji?: string;
  formFields?: FormField[];
}

interface OnboardingState {
  steps: OnboardingStep[];
  currentStep: number;
  formData: Record<string, any>;
  addStep: (step: OnboardingStep) => void;
  updateStep: (id: string, step: OnboardingStep) => void;
  deleteStep: (id: string) => void;
  reorderSteps: (fromIndex: number, toIndex: number) => void;
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Record<string, any>) => void;
}

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set) => ({
      steps: [
        {
          id: 'welcome',
          type: 'welcome',
          title: 'Welcome to NeuroStep! 👋',
          content: "Hi! I'm Dr. Attention AI, your guide in understanding neurodiversity.",
          emoji: '🤖'
        },
        {
          id: 'form',
          type: 'form',
          title: 'Tell us about yourself',
          content: 'Help us personalize your learning experience',
          formFields: [
            {
              id: 'name',
              type: 'text',
              label: 'Full Name',
              required: true,
              placeholder: 'Enter your name'
            },
            {
              id: 'email',
              type: 'email',
              label: 'Email Address',
              required: true,
              placeholder: 'Enter your email'
            },
            {
              id: 'interest',
              type: 'select',
              label: 'Primary Interest',
              required: true,
              options: ['Autism', 'ADHD', 'Both']
            }
          ]
        }
      ],
      currentStep: 0,
      formData: {},

      addStep: (step) => set((state) => ({
        steps: [...state.steps, step]
      })),

      updateStep: (id, updatedStep) => set((state) => ({
        steps: state.steps.map((step) =>
          step.id === id ? updatedStep : step
        )
      })),

      deleteStep: (id) => set((state) => ({
        steps: state.steps.filter((step) => step.id !== id)
      })),

      reorderSteps: (fromIndex, toIndex) => set((state) => {
        const newSteps = Array.from(state.steps);
        const [removed] = newSteps.splice(fromIndex, 1);
        newSteps.splice(toIndex, 0, removed);
        return { steps: newSteps };
      }),

      setCurrentStep: (step) => set({ currentStep: step }),

      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      }))
    }),
    {
      name: 'onboarding-storage'
    }
  )
);