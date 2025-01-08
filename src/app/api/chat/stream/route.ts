import { GeminiClient } from "@/lib/gemini/client";
import { analyzeIntent } from "@/lib/utils/intent-analyzer";
import { ApiResponse } from "@/types/chat";
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
  const intent = await analyzeIntent(message);
  
  const handleChunk = async (chunk: string) => {
    await writer.write(encoder.encode(chunk));
  };
  
  await geminiClient.streamMessage(message, handleChunk);
  
  // Add metadata with relevant IDs
  const metadata = {
    type: intent.type,
    confidence: intent.confidence,
    projectIds: intent.entityId && intent.type === 'project' ? [intent.entityId] : undefined,
    skillIds: intent.entityId && intent.type === 'skill' ? [intent.entityId] : undefined,
    experienceIds: intent.entityId && intent.type === 'experience' ? [intent.entityId] : undefined
  };
  
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