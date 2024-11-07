import { OnboardingStep } from '../../../stores/onboarding';

interface CreateStepCommand {
  type: 'welcome' | 'form' | 'info' | 'calendar' | 'guide';
  title: string;
  content: string;
  emoji?: string;
  formFields?: Array<{
    id: string;
    type: string;
    label: string;
    required?: boolean;
    options?: string[];
  }>;
}

interface UpdateStepCommand extends Partial<CreateStepCommand> {
  id: string;
}

export const onboardingCommands = {
  createStep: async (command: CreateStepCommand): Promise<OnboardingStep> => {
    try {
      const response = await fetch('/api/onboarding/steps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to create onboarding step');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  updateStep: async (command: UpdateStepCommand): Promise<OnboardingStep> => {
    try {
      const response = await fetch(`/api/onboarding/steps/${command.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to update onboarding step');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  deleteStep: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/onboarding/steps/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete onboarding step');
      }
    } catch (error) {
      throw error;
    }
  },

  reorderSteps: async (stepIds: string[]): Promise<void> => {
    try {
      const response = await fetch('/api/onboarding/steps/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepIds })
      });

      if (!response.ok) {
        throw new Error('Failed to reorder steps');
      }
    } catch (error) {
      throw error;
    }
  },

  submitFormData: async (stepId: string, userId: string, formData: Record<string, any>): Promise<void> => {
    try {
      const response = await fetch(`/api/onboarding/steps/${stepId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, formData })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }
    } catch (error) {
      throw error;
    }
  }
};