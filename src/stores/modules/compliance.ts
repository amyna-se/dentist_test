import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  category: string;
  regulatoryBody: string;
  frequency: number; // in months
  requiredCertifications: string[];
  mandatoryTraining: string[];
  documents: {
    id: string;
    title: string;
    type: string;
    url: string;
    validUntil?: string;
  }[];
  auditRequirements?: {
    frequency: number;
    lastAudit?: string;
    nextAudit?: string;
    auditor?: string;
  };
}

interface ComplianceState {
  requirements: Record<string, ComplianceRequirement>;
  userCompliance: Record<string, {
    userId: string;
    requirementId: string;
    status: 'compliant' | 'non_compliant' | 'pending';
    lastVerified: string;
    nextVerification: string;
    documents: string[];
  }>;
  addRequirement: (req: ComplianceRequirement) => void;
  updateRequirement: (id: string, req: Partial<ComplianceRequirement>) => void;
  checkCompliance: (userId: string, requirementId: string) => boolean;
  updateUserCompliance: (userId: string, requirementId: string, status: string) => void;
  getUpcomingDeadlines: (userId: string) => Array<{
    requirementId: string;
    deadline: string;
    type: string;
  }>;
}

export const useCompliance = create<ComplianceState>()(
  persist(
    (set, get) => ({
      requirements: {},
      userCompliance: {},

      addRequirement: (req) => set((state) => ({
        requirements: { ...state.requirements, [req.id]: req }
      })),

      updateRequirement: (id, updates) => set((state) => ({
        requirements: {
          ...state.requirements,
          [id]: { ...state.requirements[id], ...updates }
        }
      })),

      checkCompliance: (userId, requirementId) => {
        const compliance = get().userCompliance[`${userId}-${requirementId}`];
        return compliance?.status === 'compliant';
      },

      updateUserCompliance: (userId, requirementId, status) => {
        const now = new Date();
        const requirement = get().requirements[requirementId];
        const nextVerification = new Date();
        nextVerification.setMonth(now.getMonth() + requirement.frequency);

        set((state) => ({
          userCompliance: {
            ...state.userCompliance,
            [`${userId}-${requirementId}`]: {
              userId,
              requirementId,
              status,
              lastVerified: now.toISOString(),
              nextVerification: nextVerification.toISOString(),
              documents: []
            }
          }
        }));
      },

      getUpcomingDeadlines: (userId) => {
        const userCompliance = Object.values(get().userCompliance)
          .filter(c => c.userId === userId);
        
        return userCompliance.map(c => ({
          requirementId: c.requirementId,
          deadline: c.nextVerification,
          type: 'compliance_renewal'
        }));
      }
    }),
    {
      name: 'compliance-storage'
    }
  )
);