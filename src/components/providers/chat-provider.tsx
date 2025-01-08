'use client'
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { ChatMessage, ChatContextType } from '@/types/chat';
import { chatReducer, initialState } from '@/lib/chat/reducer';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const sendMessage = useCallback(async (
    content: string,
    onStream?: (chunk: string) => void
  ) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Add user message
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content,
        role: 'user',
        timestamp: new Date(),
      };
      dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

      if (onStream) {
        // Streaming response
        const response = await fetch('/api/chat/stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: content }),
        });

        if (!response.ok) throw new Error('Failed to send message');

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No reader available');

        let accumulatedContent = '';
        let metadata: any = null;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = new TextDecoder().decode(value);
          
          // Check for metadata in the chunk
          if (chunk.includes('"type":"metadata"')) {
            try {
              const metadataStart = chunk.indexOf('{"type":"metadata"');
              const metadataJson = chunk.slice(metadataStart);
              const parsedMetadata = JSON.parse(metadataJson);
              metadata = parsedMetadata.data;
              continue;
            } catch (e) {
              console.error('Error parsing metadata:', e);
            }
          }

          accumulatedContent += chunk;
          dispatch({ type: 'SET_STREAMING_CONTENT', payload: accumulatedContent });
          onStream(chunk);
        }

        // Add complete message with metadata
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          content: accumulatedContent,
          role: 'assistant',
          timestamp: new Date(),
          type: metadata?.type,
          metadata: metadata?.metadata,
        };
        dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
      } else {
        // Non-streaming response
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: content }),
        });

        if (!response.ok) throw new Error('Failed to send message');

        const data = await response.json();
        dispatch({ type: 'ADD_MESSAGE', payload: {
          ...data.message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        }});
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'An error occurred' 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_STREAMING_CONTENT', payload: null });
    }
  }, []);

  const clearChat = useCallback(() => {
    dispatch({ type: 'CLEAR_CHAT' });
  }, []);

  return (
    <ChatContext.Provider value={{ state, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};