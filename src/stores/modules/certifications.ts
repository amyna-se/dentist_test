import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Certificate {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  modules: number;
  credits: number;
  requirements: string[];
  expiresAt?: string;
}

interface CertificationProgress {
  started: boolean;
  completed: boolean;
  progress: number;
  startedAt?: string;
  completedAt?: string;
}

interface CertificationsState {
  certificates: Certificate[];
  progress: Record<string, CertificationProgress>;
  startCertification: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  completeCertification: (id: string) => void;
  downloadCertificate: (id: string) => void;
}

export const useCertifications = create<CertificationsState>()(
  persist(
    (set, get) => ({
      certificates: [
        {
          id: 'dental-hygiene-2024',
          title: 'Advanced Dental Hygiene',
          description: 'Comprehensive certification in modern dental hygiene practices',
          category: 'Clinical Practice',
          duration: '20 hours',
          modules: 8,
          credits: 20,
          requirements: ['Basic Dental Knowledge', 'Clinical Experience'],
          expiresAt: '2025-12-31'
        },
        {
          id: 'patient-care-2024',
          title: 'Patient Care Excellence',
          description: 'Best practices in patient care and communication',
          category: 'Patient Care',
          duration: '15 hours',
          modules: 6,
          credits: 15,
          requirements: ['Basic Communication Skills']
        },
        {
          id: 'infection-control-2024',
          title: 'Infection Control',
          description: 'Latest protocols in dental infection control',
          category: 'Safety',
          duration: '10 hours',
          modules: 4,
          credits: 10,
          requirements: ['Basic Safety Training'],
          expiresAt: '2025-06-30'
        }
      ],
      progress: {},

      startCertification: (id) => set((state) => ({
        progress: {
          ...state.progress,
          [id]: {
            started: true,
            completed: false,
            progress: 0,
            startedAt: new Date().toISOString()
          }
        }
      })),

      updateProgress: (id, progress) => set((state) => ({
        progress: {
          ...state.progress,
          [id]: {
            ...state.progress[id],
            progress: Math.min(100, Math.max(0, progress))
          }
        }
      })),

      completeCertification: (id) => set((state) => ({
        progress: {
          ...state.progress,
          [id]: {
            ...state.progress[id],
            completed: true,
            progress: 100,
            completedAt: new Date().toISOString()
          }
        }
      })),

      downloadCertificate: (id) => {
        const certificate = get().certificates.find(c => c.id === id);
        const progress = get().progress[id];
        
        if (!certificate || !progress?.completed) {
          console.error('Certificate not found or not completed');
          return;
        }

        // Implementation for certificate download
        console.log(`Downloading certificate: ${certificate.title}`);
      }
    }),
    {
      name: 'certifications-storage'
    }
  )
);