import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

// Import your existing portfolio data
import { portfolioSections } from '@/lib/portfolio/about';
import { experiences } from '@/lib/portfolio/experiences';
import { projects } from '@/lib/portfolio/projects';
import { skills } from '@/lib/portfolio/skills';

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
Analyze this job description and provide a comprehensive assessment for the candidate. Extract company information, role details, and provide a detailed fit analysis.

CANDIDATE PROFILE:
About: ${portfolioSections.about}

Skills: ${skills.map(s => s.name).join(', ')}

Experience:
${experiences.map(exp => {
  const startYear = new Date(exp.startDate).getFullYear();
  const endYear = exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present';
  const duration = exp.endDate ? `${startYear} - ${endYear}` : `${startYear} - Present`;
  return `- ${exp.title} at ${exp.company} (${duration}): ${exp.description}`;
}).join('\n')}

Projects:
${projects.map(proj => `- ${proj.title}: ${proj.description} (${proj.technologies.join(', ')})`).join('\n')}

JOB DESCRIPTION:
${jobDescription}

Provide a thorough analysis in this exact JSON format:
{
  "fitScore": number (0-100),
  "recommendation": "apply" | "skip" | "maybe", 
  "requiredSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "keyOptimizations": ["tip1", "tip2", "tip3"],
  "reasoning": "detailed explanation",
  "companyInfo": {
    "name": "company name",
    "industry": "industry type",
    "size": "startup|small|medium|large|enterprise"
  },
  "roleDetails": {
    "level": "entry|junior|mid|senior|lead|principal|executive",
    "department": "department name",
    "responsibilities": ["responsibility1", "responsibility2"]
  }
}

Consider:
1. Technical skill alignment and gaps
2. Experience level and seniority match  
3. Industry and domain relevance
4. Growth potential and learning opportunities
5. Role responsibilities vs candidate background
6. Company culture and size fit

Extract company information including name, industry, and estimated size. Determine the role level and key responsibilities. Be honest about gaps but highlight strengths and provide specific, actionable optimization tips.
`;

    const result = await model.generateContent(prompt);
    const analysis = JSON.parse(result.response.text());

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('Job analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze job' },
      { status: 500 }
    );
  }
}
