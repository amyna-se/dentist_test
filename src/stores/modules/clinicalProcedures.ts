import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ClinicalProcedure {
  id: string;
  title: string;
  category: string;
  riskLevel: 'low' | 'medium' | 'high';
  requiredCertifications: string[];
  steps: Array<{
    id: string;
    title: string;
    description: string;
    duration: number;
    criticalPoints?: string[];
    media?: {
      type: 'image' | 'video';
      url: string;
    }[];
  }>;
  equipment: Array<{
    id: string;
    name: string;
    quantity: number;
    specifications?: string;
  }>;
  safetyProtocols: string[];
  contraindications: string[];
  references: Array<{
    title: string;
    url: string;
    type: 'guideline' | 'research' | 'standard';
  }>;
}

interface ClinicalProcedureState {
  procedures: Record<string, ClinicalProcedure>;
  categories: string[];
  addProcedure: (procedure: ClinicalProcedure) => void;
  updateProcedure: (id: string, procedure: Partial<ClinicalProcedure>) => void;
  deleteProcedure: (id: string) => void;
  searchProcedures: (query: string, filters?: any) => ClinicalProcedure[];
  checkUserAuthorization: (userId: string, procedureId: string) => boolean;
}

export const useClinicalProcedures = create<ClinicalProcedureState>()(
  persist(
    (set, get) => ({
      procedures: {},
      categories: [
        'Diagnostic',
        'Preventive',
        'Restorative',
        'Surgical',
        'Emergency'
      ],

      addProcedure: (procedure) => set((state) => ({
        procedures: { ...state.procedures, [procedure.id]: procedure }
      })),

      updateProcedure: (id, updates) => set((state) => ({
        procedures: {
          ...state.procedures,
          [id]: { ...state.procedures[id], ...updates }
        }
      })),

      deleteProcedure: (id) => set((state) => {
        const { [id]: _, ...rest } = state.procedures;
        return { procedures: rest };
      }),

      searchProcedures: (query, filters) => {
        const procedures = Object.values(get().procedures);
        return procedures.filter(procedure => {
          const matchesQuery = procedure.title.toLowerCase().includes(query.toLowerCase());
          
          if (!filters) return matchesQuery;

          const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (key === 'category') return procedure.category === value;
            if (key === 'riskLevel') return procedure.riskLevel === value;
            return true;
          });

          return matchesQuery && matchesFilters;
        });
      },

      checkUserAuthorization: (userId, procedureId) => {
        // In a real implementation, this would check user certifications
        // against procedure requirements
        return true;
      }
    }),
    {
      name: 'clinical-procedures-storage'
    }
  )
);