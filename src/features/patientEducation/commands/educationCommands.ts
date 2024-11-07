import { EducationalMaterial } from '../../../stores/modules/patientEducation';

interface CreateMaterialCommand {
  title: string;
  type: 'video' | 'document' | 'interactive';
  category: string;
  content: {
    description: string;
    url?: string;
    markdown?: string;
    duration?: number;
  };
  targetAudience: {
    age?: string[];
    conditions?: string[];
    languages: string[];
  };
  interactions?: {
    hasQuiz: boolean;
    hasFeedback: boolean;
    hasInteractiveElements: boolean;
  };
}

interface UpdateMaterialCommand extends Partial<CreateMaterialCommand> {
  id: string;
}

export const educationCommands = {
  createMaterial: async (command: CreateMaterialCommand): Promise<EducationalMaterial> => {
    try {
      const response = await fetch('/api/patient-education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to create educational material');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  updateMaterial: async (command: UpdateMaterialCommand): Promise<EducationalMaterial> => {
    try {
      const response = await fetch(`/api/patient-education/${command.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to update educational material');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  deleteMaterial: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/patient-education/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete educational material');
      }
    } catch (error) {
      throw error;
    }
  },

  addTranslation: async (materialId: string, language: string, content: any): Promise<void> => {
    try {
      const response = await fetch(`/api/patient-education/${materialId}/translations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, content })
      });

      if (!response.ok) {
        throw new Error('Failed to add translation');
      }
    } catch (error) {
      throw error;
    }
  },

  updateInteractions: async (materialId: string, interactions: any): Promise<void> => {
    try {
      const response = await fetch(`/api/patient-education/${materialId}/interactions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(interactions)
      });

      if (!response.ok) {
        throw new Error('Failed to update interactions');
      }
    } catch (error) {
      throw error;
    }
  }
};