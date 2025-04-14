import { GeminiClient } from "@/lib/gemini/client";
import { analyzeLLMIntent } from "@/lib/utils/llm-intent-analyzer";
import { ApiResponse, ChatMetadata } from "@/types/chat";
import { NextResponse } from "next/server";

const geminiClient = new GeminiClient(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
    const encoder = new TextEncoder();
  
    try {
      const { message } = await request.json();
  
      if (!message) {
        return NextResponse.json<ApiResponse>(
          { error: 'Message is required' },
          { status: 400 }
        );
      }
  
      // Create stream
      const stream = new TransformStream();
      const writer = stream.writable.getWriter();
  
      try {
        // Use LLM-based intent analyzer
        const intent = await analyzeLLMIntent(message);
        
        const handleChunk = async (chunk: string) => {
          await writer.write(encoder.encode(chunk));
        };
        
        await geminiClient.streamMessage(message, handleChunk);
        
        // Create metadata ensuring data property exists
        const metadata: ChatMetadata = {
          type: intent.type,
          confidence: intent.confidence,
          suggestedQuestions: generateSuggestedQuestions(intent.type),
          // Initialize data property with empty arrays
          data: {
            projectIds: [],
            skillIds: [],
            experienceIds: [],
            highlightedTechnologies: []
          }
        };
        
        // Add IDs based on intent type and include related IDs if available
        if (intent.type === 'project' && metadata.data) {
          metadata.data.projectIds = intent.relatedIds || (intent.entityId ? [intent.entityId] : []);
        } else if (intent.type === 'skill' && metadata.data) {
          metadata.data.skillIds = intent.relatedIds || (intent.entityId ? [intent.entityId] : []);
        } else if (intent.type === 'experience' && metadata.data) {
          metadata.data.experienceIds = intent.relatedIds || (intent.entityId ? [intent.entityId] : []);
        }
        
        if (intent.keywords?.length && metadata.data) {
          metadata.data.highlightedTechnologies = intent.keywords
            .filter(kw => kw.length > 3)
            .slice(0, 5);
        }
        
        await writer.write(
          encoder.encode(`\n${JSON.stringify({ type: 'metadata', data: metadata })}`)
        );
        
        await writer.close();
        
        return new NextResponse(stream.readable, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      } catch (streamError) {
        await writer.abort(streamError);
        throw streamError;
      }
    } catch (error) {
      console.error('Request Error:', error);
      return NextResponse.json<ApiResponse>(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
}

// Helper function to generate contextual suggested questions
function generateSuggestedQuestions(type: string): string[] {
  const baseQuestions = [
    "What are your main skills in AI development?",
    "Tell me about your most challenging project",
    "What kind of work experience do you have?"
  ];

  const contextQuestions: Record<string, string[]> = {
    project: [
      "What technologies did you use for this project?",
      "What were the main challenges you faced?",
      "How did you architect the solution?"
    ],
    skill: [
      "How have you applied this skill in your projects?",
      "How did you learn this technology?",
      "What related skills do you have?"
    ],
    experience: [
      "What were your main achievements in this role?",
      "What technologies did you work with there?",
      "How did this experience shape your career?"
    ],
    general: [
      "What areas of AI engineering are you most interested in?",
      "Can you tell me about your background?",
      "What programming languages do you use most?"
    ]
  };

  return [...(contextQuestions[type] || contextQuestions.general), ...baseQuestions].slice(0, 3);
}