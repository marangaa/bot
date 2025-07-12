import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DEFAULT_TEMPLATE } from './resume/templates';
import { 
  ResumeBuilderState, 
  JobAnalysis, 
  GeneratedResumeResponse, 
  PersonalInfo 
} from '@/types/resume';
import { portfolioSections } from './portfolio/about';

const initialState = {
  jobDescription: '',
  analysis: null,
  resumeData: null,
  personalInfo: {
    fullName: 'Richard Maranga',
    email: portfolioSections.contact.email,
    phone: portfolioSections.contact.phone,
    location: portfolioSections.contact.location,
  },
  selectedTemplate: DEFAULT_TEMPLATE,
  companyName: '',
  loading: false,
  step: 'input' as const,
  activeTab: 'input' as const,
  completedSections: [],
};

const TOTAL_SECTIONS = ['job-input', 'job-analysis', 'personal-info', 'template-selection', 'resume-generation', 'export'];

export const useResumeBuilderStore = create<ResumeBuilderState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setJobDescription: (description: string) => {
        set({ jobDescription: description });
        // Auto-extract company name when job description changes
        if (description.trim()) {
          get().extractCompanyNameWithAI(description);
          get().markSectionComplete('job-input');
        } else {
          set({ companyName: '' });
          // Remove job-input from completed sections if description is empty
          const completedSections = get().completedSections.filter(s => s !== 'job-input');
          set({ completedSections });
        }
      },
      
      setAnalysis: (analysis: JobAnalysis | null) => {
        set({ analysis });
        if (analysis) {
          get().markSectionComplete('job-analysis');
        }
      },
      
      setResumeData: (data: GeneratedResumeResponse | null) => {
        set({ resumeData: data });
        if (data) {
          get().markSectionComplete('resume-generation');
        }
      },
      
      setPersonalInfo: (info: Partial<PersonalInfo>) => {
        const currentInfo = get().personalInfo;
        const updatedInfo = { ...currentInfo, ...info };
        set({ personalInfo: updatedInfo });
        
        // Check if personal info is complete
        const isComplete = Object.values(updatedInfo).every(value => value.trim() !== '');
        if (isComplete) {
          get().markSectionComplete('personal-info');
        }
      },
      
      setSelectedTemplate: (template: string) => {
        set({ selectedTemplate: template });
        get().markSectionComplete('template-selection');
      },
      
      setCompanyName: (name: string) => set({ companyName: name }),
      
      setLoading: (loading: boolean) => set({ loading }),
      
      setStep: (step: 'input' | 'analysis' | 'generation' | 'export') => set({ step }),
      
      setActiveTab: (tab: 'input' | 'analysis' | 'personal' | 'template' | 'preview' | 'export') => set({ activeTab: tab }),
      
      markSectionComplete: (section: string) => {
        const completedSections = get().completedSections;
        if (!completedSections.includes(section)) {
          set({ completedSections: [...completedSections, section] });
        }
      },
      
      getProgressPercentage: () => {
        const completed = get().completedSections.length;
        const total = TOTAL_SECTIONS.length;
        return Math.round((completed / total) * 100);
      },
      
      getTotalSections: () => TOTAL_SECTIONS.length,
      
      reset: () => set(initialState),
      
      extractCompanyNameWithAI: async (jobDescription: string) => {
        if (!jobDescription.trim()) {
          set({ companyName: '' });
          return;
        }
        
        try {
          const response = await fetch('/api/admin/resume/extract-company', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobDescription }),
          });
          
          if (response.ok) {
            const data = await response.json();
            set({ companyName: data.companyName || '' });
          } else {
            // Fallback to simple extraction
            const simpleExtraction = jobDescription
              .split('\n')[0]
              .replace(/^(.*?)\s*-.*$/, '$1')
              .replace(/[^\w\s&.-]/g, '')
              .trim();
            
            if (simpleExtraction.length > 1 && simpleExtraction.length < 50) {
              set({ companyName: simpleExtraction });
            } else {
              set({ companyName: '' });
            }
          }
        } catch (error) {
          console.error('Company name extraction failed:', error);
          set({ companyName: '' });
        }
      }
    }),
    {
      name: 'resume-builder-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        jobDescription: state.jobDescription,
        analysis: state.analysis,
        resumeData: state.resumeData,
        personalInfo: state.personalInfo,
        selectedTemplate: state.selectedTemplate,
        companyName: state.companyName,
        step: state.step,
        activeTab: state.activeTab,
        completedSections: state.completedSections,
      }),
    }
  )
);
