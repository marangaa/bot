import { Experience, Skill } from "./portfolio";

export type MessageType = 
  | 'text' 
  | 'project' 
  | 'skill' 
  | 'experience' 
  | 'multi' 
  | 'general'
  | 'project_details'
  | 'skill_inquiry'
  | 'experience_details';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: MessageType;
  metadata?: {
    projectIds?: string[];
    skillIds?: string[];
    experienceIds?: string[];
    highlightedTechnologies?: string[];
    confidence?: number;
    suggestedQuestions?: string[];
    projects?: Record<string, Project>;
    experiences?: Record<string, Experience>;
    skills?: Record<string, Skill>;
    [key: string]: any;
  };
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  streamingContent?: string | null;
}

export interface ChatContextType {
  state: ChatState;
  sendMessage: (content: string, onStream?: (chunk: string) => void) => Promise<void>;
  clearChat: () => void;
}

export interface StructuredResponse {
  responseType: MessageType;
  content: string;
  data?: {
    projectIds?: string[];
    skillIds?: string[];
    experienceIds?: string[];
    highlightedTechnologies?: string[];
  };
  metadata?: {
    confidence: number;
    suggestedQuestions: string[];
  };
}

export interface ApiResponse {
  message?: ChatMessage;
  error?: string;
}