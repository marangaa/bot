import { NextResponse } from 'next/server';
import { analyzeIntent } from '@/lib/utils/intent-analyzer';
import type { ApiResponse, MessageType } from '@/types/chat';
import { GeminiClient } from '@/lib/gemini/client';

const geminiClient = new GeminiClient(process.env.GEMINI_API_KEY!);

// Add type mapping helper
const mapIntentToMessageType = (intentType: string): MessageType => {
  switch (intentType) {
    case 'project_details':
      return 'project';
    case 'skill_inquiry':
      return 'skill';
    case 'experience_details':
      return 'experience';
    default:
      return 'general';
  }
};

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json<ApiResponse>(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Analyze user intent
    const intent = await analyzeIntent(message);
    let response;

    try {
      switch (mapIntentToMessageType(intent.type)) {
        case 'project':
          if (intent.entityId) {
            response = await geminiClient.getProjectDetails(intent.entityId);
          } else {
            response = await geminiClient.sendMessage(message);
          }
          break;
        case 'skill':
          if (intent.entityId) {
            response = await geminiClient.getSkillDetails(intent.entityId);
          } else {
            response = await geminiClient.sendMessage(message);
          }
          break;
        case 'experience':
          if (intent.entityId) {
            response = await geminiClient.getExperienceDetails(intent.entityId);
          } else {
            response = await geminiClient.sendMessage(message);
          }
          break;
        default:
          response = await geminiClient.sendMessage(message);
      }

      return NextResponse.json<ApiResponse>({ message: response });
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

