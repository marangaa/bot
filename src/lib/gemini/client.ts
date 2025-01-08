import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiClient {
    private model: any;
    private chat: any;
    private context: string;

    constructor(apiKey: string) {
        const genAI = new GoogleGenerativeAI(apiKey);
        this.model = genAI.getGenerativeModel({ model: GEMINI_CONFIG.model });
        this.context = PORTFOLIO_CONTEXT;
        this.initChat();
    }

    private async initChat() {
        this.chat = this.model.startChat({
            history: [{
                role: 'assistant',
                content: this.context
            }],
            generationConfig: {
                temperature: GEMINI_CONFIG.temperature,
                topK: GEMINI_CONFIG.topK,
                topP: GEMINI_CONFIG.topP,
                maxOutputTokens: GEMINI_CONFIG.maxOutputTokens,
            },
        });
    }

    async sendMessage(message: string): Promise<ChatResponse> {
        try {
            const result = await this.chat.sendMessage(message);
            const response = await result.response;
            const text = response.text();

            return {
                message: {
                    role: 'assistant',
                    content: text,
                    timestamp: new Date(),
                },
                status: 'success',
            };
        } catch (error: any) {
            console.error('Gemini API Error:', error);
            return {
                message: {
                    role: 'assistant',
                    content: 'I apologize, but I encountered an error. Please try again.',
                    timestamp: new Date(),
                },
                status: 'error',
                error: error.message,
            };
        }
    }

    async streamMessage(message: string, onChunk: (chunk: string) => void): Promise<void> {
        try {
            const result = await this.chat.sendMessage(message, { stream: true });
            for await (const chunk of result.stream) {
                const text = chunk.text();
                onChunk(text);
            }
        } catch (error) {
            console.error('Gemini Streaming Error:', error);
            throw error;
        }
    }
}