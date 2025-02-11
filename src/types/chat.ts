import { Experience, Project, Skill } from "./portfolio";

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

// Remove duplicate Project interface since we're importing it from portfolio

export interface ChatMetadata {
  type?: string;
  confidence?: number;
  suggestedQuestions?: string[];
  data?: {
    projectIds?: string[];
    skillIds?: string[];
    experienceIds?: string[];
    highlightedTechnologies?: string[];
  };
}

export interface StreamChunk {
  type: 'text' | 'metadata';
  content?: string;
  data?: ChatMetadata;
}

interface ChatMessageMetadata {
  projectIds?: string[];
  skillIds?: string[];
  experienceIds?: string[];
  highlightedTechnologies?: string[];
  confidence?: number;
  suggestedQuestions?: string[];
  projects?: Record<string, Project>;
  experiences?: Record<string, Experience>;
  skills?: Record<string, Skill>;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: MessageType;
  metadata?: ChatMessageMetadata;
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