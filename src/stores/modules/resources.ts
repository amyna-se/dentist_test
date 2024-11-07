import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Resource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'audio' | 'link' | 'procedure';
  category: string;
  tags: string[];
  content: {
    url?: string;
    markdown?: string;
    duration?: number;
    fileSize?: number;
    lastUpdated: string;
  };
  access: {
    roles: string[];
    departments?: string[];
    requiresCertification?: string[];
  };
  metadata: {
    author: string;
    version: string;
    language: string;
    reviewDate?: string;
  };
}

interface ResourceState {
  resources: Record<string, Resource>;
  categories: string[];
  tags: string[];
  addResource: (resource: Resource) => void;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  searchResources: (query: string, filters?: any) => Resource[];
  getUserAccessibleResources: (userId: string) => Resource[];
}

export const useResources = create<ResourceState>()(
  persist(
    (set, get) => ({
      resources: {},
      categories: [
        'Clinical Procedures',
        'Equipment Manuals',
        'Safety Protocols',
        'Patient Care',
        'Compliance',
        'Training Materials'
      ],
      tags: [],

      addResource: (resource) => set((state) => ({
        resources: { ...state.resources, [resource.id]: resource },
        tags: [...new Set([...state.tags, ...resource.tags])]
      })),

      updateResource: (id, updates) => set((state) => ({
        resources: {
          ...state.resources,
          [id]: { ...state.resources[id], ...updates }
        }
      })),

      deleteResource: (id) => set((state) => {
        const { [id]: _, ...rest } = state.resources;
        return { resources: rest };
      }),

      searchResources: (query, filters) => {
        const resources = Object.values(get().resources);
        return resources.filter(resource => {
          const matchesQuery = resource.title.toLowerCase().includes(query.toLowerCase()) ||
            resource.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
          
          if (!filters) return matchesQuery;

          const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (key === 'category') return resource.category === value;
            if (key === 'type') return resource.type === value;
            if (key === 'tags') return value.some((tag: string) => resource.tags.includes(tag));
            return true;
          });

          return matchesQuery && matchesFilters;
        });
      },

      getUserAccessibleResources: (userId) => {
        // In a real implementation, this would check user roles and permissions
        return Object.values(get().resources);
      }
    }),
    {
      name: 'resources-storage'
    }
  )
);