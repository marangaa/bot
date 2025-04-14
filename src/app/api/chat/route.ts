import { NextResponse } from 'next/server';
import { analyzeLLMIntent } from '@/lib/utils/llm-intent-analyzer';
import type { ApiResponse, ChatMessage } from '@/types/chat';
import { GeminiClient } from '@/lib/gemini/client';

const geminiClient = new GeminiClient(process.env.GEMINI_API_KEY!);

// Add type mapping helper

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json<ApiResponse>(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Analyze user intent using LLM-based analyzer
    const intent = await analyzeLLMIntent(message);

    try {
      let chatMessage: ChatMessage;

      switch (intent.type) {
        case 'project':
          if (intent.entityId) {
            const details = await geminiClient.getProjectDetails(intent.entityId);
            chatMessage = {
              id: crypto.randomUUID(),
              role: 'assistant',
              content: details.content,
              timestamp: new Date(),
              type: details.responseType,
              metadata: {
                ...details.metadata,
                ...details.data
              }
            };
          } else {
            chatMessage = await geminiClient.sendMessage(message);
          }
          break;
        case 'skill':
          if (intent.entityId) {
            const details = await geminiClient.getSkillDetails(intent.entityId);
            chatMessage = {
              id: crypto.randomUUID(),
              role: 'assistant',
              content: details.content,
              timestamp: new Date(),
              type: details.responseType,
              metadata: {
                ...details.metadata,
                ...details.data
              }
            };
          } else {
            chatMessage = await geminiClient.sendMessage(message);
          }
          break;
        case 'experience':
          if (intent.entityId) {
            const details = await geminiClient.getExperienceDetails(intent.entityId);
            chatMessage = {
              id: crypto.randomUUID(),
              role: 'assistant',
              content: details.content,
              timestamp: new Date(),
              type: details.responseType,
              metadata: {
                ...details.metadata,
                ...details.data
              }
            };
          } else {
            chatMessage = await geminiClient.sendMessage(message);
          }
          break;
        default:
          chatMessage = await geminiClient.sendMessage(message);
      }

      // Add related IDs if available
      if (intent.relatedIds?.length) {
        if (!chatMessage.metadata) chatMessage.metadata = {};
        
        switch (intent.type) {
          case 'project':
            chatMessage.metadata.projectIds = intent.relatedIds;
            break;
          case 'skill':
            chatMessage.metadata.skillIds = intent.relatedIds;
            break;
          case 'experience':
            chatMessage.metadata.experienceIds = intent.relatedIds;
            break;
        }
      }

      return NextResponse.json<ApiResponse>({ message: chatMessage });

    } catch (error) {
      console.error('Gemini API Error:', error);
      return NextResponse.json<ApiResponse>(
        { 
          message: {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'I apologize, but I encountered an error processing your request. Please try again.',
            timestamp: new Date(),
            type: 'general'
          }
        },
        { status: 200 } // Still return 200 for client handling
      );
    }
  } catch (error) {
    console.error('Request Error:', error);
    return NextResponse.json<ApiResponse>(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

