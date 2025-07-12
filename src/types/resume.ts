export interface PersonalInfo {
  fullName?: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  portfolio?: string;
}

export interface Experience {
  title: string;
  company: string;
  period?: string;
  duration?: string;
  location?: string;
  highlights?: string[];
  achievements?: string[];
}

export interface Project {
  title?: string;
  name?: string;
  description: string;
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  startDate?: string;
  endDate?: string | null;
  status?: string;
}

export interface ResumeData {
  summary: string;
  experiences: Experience[];
  skills: string[] | Record<string, string[]>;
  projects: Project[];
  education?: Education[];
}

// Generated resume response structure from API
export interface GeneratedResumeResponse {
  data: ResumeData;
  personalInfo?: PersonalInfo;
}

// Template-related types
export interface TemplateProps {
  data: ResumeData;
  personalInfo?: PersonalInfo;
}

export interface ResumeDocumentProps extends TemplateProps {
  templateId?: string;
}

// Job analysis types
export interface JobAnalysis {
  fitScore: number;
  recommendation: 'apply' | 'skip' | 'maybe';
  requiredSkills: string[];
  missingSkills: string[];
  keyOptimizations: string[];
  reasoning: string;
}

// Store state types
export type TabId = 'input' | 'analysis' | 'template' | 'personal' | 'preview' | 'export';
export type Step = 'input' | 'analysis' | 'generation' | 'export';

export interface ResumeBuilderState {
  // Input data
  jobDescription: string;
  analysis: JobAnalysis | null;
  resumeData: GeneratedResumeResponse | null;
  selectedTemplate: string;
  personalInfo: PersonalInfo;
  companyName: string;
  
  // UI state
  loading: boolean;
  step: Step;
  activeTab: TabId;
  
  // Progress tracking
  completedSections: string[];
  
  // Actions
  setJobDescription: (description: string) => void;
  setAnalysis: (analysis: JobAnalysis) => void;
  setResumeData: (data: GeneratedResumeResponse) => void;
  setSelectedTemplate: (template: string) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setCompanyName: (name: string) => void;
  setLoading: (loading: boolean) => void;
  setStep: (step: Step) => void;
  setActiveTab: (tab: TabId) => void;
  
  // Progress methods
  markSectionComplete: (section: string) => void;
  getProgressPercentage: () => number;
  getTotalSections: () => number;
  
  // Utility methods
  extractCompanyNameWithAI: (jobDescription: string) => Promise<void>;
  reset: () => void;
}
