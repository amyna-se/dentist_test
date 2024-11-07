import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EducationalMaterial {
  id: string;
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
  metadata: {
    author: string;
    lastUpdated: string;
    version: string;
    reviewedBy?: string[];
  };
  interactions?: {
    hasQuiz: boolean;
    hasFeedback: boolean;
    hasInteractiveElements: boolean;
  };
}

interface PatientEducationState {
  materials: Record<string, EducationalMaterial>;
  categories: string[];
  languages: string[];
  addMaterial: (material: EducationalMaterial) => void;
  updateMaterial: (id: string, material: Partial<EducationalMaterial>) => void;
  deleteMaterial: (id: string) => void;
  searchMaterials: (query: string, filters?: any) => EducationalMaterial[];
  getMaterialsByLanguage: (language: string) => EducationalMaterial[];
}

export const usePatientEducation = create<PatientEducationState>()(
  persist(
    (set, get) => ({
      materials: {},
      categories: [
        'Preventive Care',
        'Treatment Procedures',
        'Post-Treatment Care',
        'Oral Hygiene',
        'Nutrition'
      ],
      languages: ['English', 'Spanish', 'French', 'German', 'Swedish'],

      addMaterial: (material) => set((state) => ({
        materials: { ...state.materials, [material.id]: material }
      })),

      updateMaterial: (id, updates) => set((state) => ({
        materials: {
          ...state.materials,
          [id]: { ...state.materials[id], ...updates }
        }
      })),

      deleteMaterial: (id) => set((state) => {
        const { [id]: _, ...rest } = state.materials;
        return { materials: rest };
      }),

      searchMaterials: (query, filters) => {
        const materials = Object.values(get().materials);
        return materials.filter(material => {
          const matchesQuery = material.title.toLowerCase().includes(query.toLowerCase());
          
          if (!filters) return matchesQuery;

          const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (key === 'category') return material.category === value;
            if (key === 'language') return material.targetAudience.languages.includes(value);
            if (key === 'type') return material.type === value;
            return true;
          });

          return matchesQuery && matchesFilters;
        });
      },

      getMaterialsByLanguage: (language) => {
        return Object.values(get().materials).filter(
          material => material.targetAudience.languages.includes(language)
        );
      }
    }),
    {
      name: 'patient-education-storage'
    }
  )
);