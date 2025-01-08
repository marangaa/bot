export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface ChatResponse {
    message: ChatMessage;
    status: 'success' | 'error';
    error?: string;
}