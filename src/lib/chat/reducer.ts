import { ChatState, ChatMessage } from '@/types/chat';

type ChatAction =
    | { type: 'ADD_MESSAGE'; payload: ChatMessage }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_STREAMING_CONTENT'; payload: string | null }
    | { type: 'UPDATE_LAST_MESSAGE'; payload: Partial<ChatMessage> }
    | { type: 'CLEAR_CHAT' };

export const initialState: ChatState = {
    messages: [],
    isLoading: false,
    error: null,
    streamingContent: null,
};

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
                streamingContent: null,
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'SET_STREAMING_CONTENT':
            return {
                ...state,
                streamingContent: action.payload,
            };
        case 'UPDATE_LAST_MESSAGE':
            return {
                ...state,
                messages: state.messages.map((msg, idx) =>
                    idx === state.messages.length - 1
                        ? { ...msg, ...action.payload }
                        : msg
                ),
            };
        case 'CLEAR_CHAT':
            return initialState;
        default:
            return state;
    }
}