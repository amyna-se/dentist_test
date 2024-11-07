import { ClinicalProcedure } from '../../../stores/modules/clinicalProcedures';

interface CreateProcedureCommand {
  title: string;
  category: string;
  riskLevel: 'low' | 'medium' | 'high';
  requiredCertifications: string[];
  steps: Array<{
    title: string;
    description: string;
    duration: number;
    criticalPoints?: string[];
    media?: Array<{
      type: 'image' | 'video';
      url: string;
    }>;
  }>;
  equipment: Array<{
    name: string;
    quantity: number;
    specifications?: string;
  }>;
  safetyProtocols: string[];
  contraindications: string[];
}

interface UpdateProcedureCommand extends Partial<CreateProcedureCommand> {
  id: string;
}

export const procedureCommands = {
  createProcedure: async (command: CreateProcedureCommand): Promise<ClinicalProcedure> => {
    try {
      const response = await fetch('/api/procedures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to create procedure');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  updateProcedure: async (command: UpdateProcedureCommand): Promise<ClinicalProcedure> => {
    try {
      const response = await fetch(`/api/procedures/${command.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to update procedure');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  deleteProcedure: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/procedures/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete procedure');
      }
    } catch (error) {
      throw error;
    }
  },

  addStep: async (procedureId: string, step: any): Promise<void> => {
    try {
      const response = await fetch(`/api/procedures/${procedureId}/steps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(step)
      });

      if (!response.ok) {
        throw new Error('Failed to add step');
      }
    } catch (error) {
      throw error;
    }
  },

  updateEquipment: async (procedureId: string, equipment: any[]): Promise<void> => {
    try {
      const response = await fetch(`/api/procedures/${procedureId}/equipment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equipment })
      });

      if (!response.ok) {
        throw new Error('Failed to update equipment');
      }
    } catch (error) {
      throw error;
    }
  }
};