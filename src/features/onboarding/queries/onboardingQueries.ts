import { OnboardingStep } from '../../../stores/onboarding';

export const onboardingQueries = {
  getSteps: async (): Promise<OnboardingStep[]> => {
    try {
      const response = await fetch('/api/onboarding/steps');
      if (!response.ok) {
        throw new Error('Failed to fetch onboarding steps');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getStepById: async (id: string): Promise<OnboardingStep> => {
    try {
      const response = await fetch(`/api/onboarding/steps/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch onboarding step');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getUserProgress: async (userId: string): Promise<{
    currentStep: number;
    completed: boolean;
    formData: Record<string, any>;
  }> => {
    try {
      const response = await fetch(`/api/onboarding/progress/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user progress');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getFormData: async (userId: string, stepId: string): Promise<Record<string, any>> => {
    try {
      const response = await fetch(`/api/onboarding/form-data/${userId}/${stepId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch form data');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
};