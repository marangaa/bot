import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
    const encoder = new TextEncoder();

    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
            },
        });

        // Create a TransformStream for the response
        const stream = new TransformStream();
        const writer = stream.writable.getWriter();

        try {
            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: "You are an AI portfolio assistant. Here is the context: " + message }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "I understand. I'll help showcase the portfolio through our conversation." }],
                    },
                ],
            });

            // Send message and get streaming response
            const result = await chat.sendMessageStream(message);
            let accumulatedText = '';

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                accumulatedText += chunkText;
                await writer.write(encoder.encode(chunkText));
            }

            // After streaming is complete, check for enhanced content
            const enhancedMessage = MessageEnhancer.enhanceMessage({
                id: crypto.randomUUID(),
                role: 'assistant',
                content: accumulatedText,
                timestamp: new Date(),
            });

            // Send enhancement metadata as a special chunk if available
            if (enhancedMessage.type || enhancedMessage.metadata) {
                const metadataChunk = JSON.stringify({
                    type: 'metadata',
                    data: {
                        type: enhancedMessage.type,
                        metadata: enhancedMessage.metadata,
                    },
                });
                await writer.write(encoder.encode(`\n${metadataChunk}`));
            }

            writer.close();
        } catch (error) {
            console.error('Streaming error:', error);
            writer.abort(error);
            throw error;
        }

        return new NextResponse(stream.readable, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error: any) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}