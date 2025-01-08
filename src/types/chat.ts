export interface ChatMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
    type?: 'text' | 'project' | 'skill' | 'experience';
    metadata?: {
        projectId?: string;
        skillId?: string;
        experienceId?: string;
        [key: string]: any;
    };
}

export interface ChatState {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
}

export interface ChatContextType {
    state: ChatState;
    sendMessage: (content: string) => Promise<void>;
    clearChat: () => void;
}
