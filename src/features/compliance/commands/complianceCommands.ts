import { ComplianceRequirement } from '../../../stores/modules/compliance';

interface CreateRequirementCommand {
  title: string;
  description: string;
  category: string;
  regulatoryBody: string;
  frequency: number;
  requiredCertifications: string[];
  mandatoryTraining: string[];
  documents: Array<{
    title: string;
    type: string;
    url: string;
    validUntil?: string;
  }>;
  auditRequirements?: {
    frequency: number;
    auditor?: string;
  };
}

interface UpdateRequirementCommand extends Partial<CreateRequirementCommand> {
  id: string;
}

export const complianceCommands = {
  createRequirement: async (command: CreateRequirementCommand): Promise<ComplianceRequirement> => {
    try {
      const response = await fetch('/api/compliance/requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to create compliance requirement');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  updateRequirement: async (command: UpdateRequirementCommand): Promise<ComplianceRequirement> => {
    try {
      const response = await fetch(`/api/compliance/requirements/${command.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });

      if (!response.ok) {
        throw new Error('Failed to update compliance requirement');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  deleteRequirement: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/compliance/requirements/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete compliance requirement');
      }
    } catch (error) {
      throw error;
    }
  },

  updateUserCompliance: async (userId: string, requirementId: string, status: string): Promise<void> => {
    try {
      const response = await fetch(`/api/compliance/users/${userId}/requirements/${requirementId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update user compliance');
      }
    } catch (error) {
      throw error;
    }
  },

  scheduleAudit: async (requirementId: string, date: string, auditor: string): Promise<void> => {
    try {
      const response = await fetch(`/api/compliance/requirements/${requirementId}/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, auditor })
      });

      if (!response.ok) {
        throw new Error('Failed to schedule audit');
      }
    } catch (error) {
      throw error;
    }
  }
};