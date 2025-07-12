import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription || typeof jobDescription !== 'string') {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
Extract the company information from this job posting. If the company name is not explicitly mentioned, try to infer it from context clues like email domains, website URLs, or other identifying information.

Job Posting:
${jobDescription.substring(0, 2000)}

Return the data in this exact JSON format:
{
  "companyName": "company name or empty string",
  "industry": "industry type or empty string", 
  "companySize": "startup|small|medium|large|enterprise or empty string",
  "confidence": number (0-1 scale for extraction accuracy)
}

Return the company name, industry (if mentioned), estimated company size, and your confidence in the extraction (0-1 scale).
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const extractedData = JSON.parse(response.text());

    // Validate the extraction confidence
    if (extractedData.confidence < 0.3) {
      return NextResponse.json({
        companyName: '',
        industry: extractedData.industry || '',
        companySize: extractedData.companySize || '',
        confidence: extractedData.confidence,
        warning: 'Low confidence extraction'
      });
    }

    return NextResponse.json({
      companyName: extractedData.companyName || '',
      industry: extractedData.industry || '',
      companySize: extractedData.companySize || '',
      confidence: extractedData.confidence || 0
    });

  } catch (error) {
    console.error('Company extraction error:', error);
    
    // Fallback extraction in case AI fails
    const { jobDescription } = await request.json();
    let fallbackName = '';
    
    // Simple regex patterns as fallback
    const patterns = [
      /(?:at|@|for)\s+([A-Z][a-zA-Z\s&.,]+?)(?:\s|,|\.|\n|$)/,
      /([A-Z][a-zA-Z\s&.,]+?)\s+(?:is looking|seeks|hiring)/i,
      /Company:\s*([A-Z][a-zA-Z\s&.,]+?)(?:\s|,|\.|\n|$)/i,
    ];
    
    for (const pattern of patterns) {
      const match = jobDescription.match(pattern);
      if (match && match[1]) {
        fallbackName = match[1].trim().replace(/[.,]$/, '');
        break;
      }
    }

    return NextResponse.json({
      companyName: fallbackName,
      industry: '',
      companySize: '',
      confidence: fallbackName ? 0.5 : 0,
      fallback: true
    });
  }
}
