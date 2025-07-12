import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { portfolioSections } from '@/lib/portfolio/about';
import { experiences } from '@/lib/portfolio/experiences';
import { projects } from '@/lib/portfolio/projects';
import { skills } from '@/lib/portfolio/skills';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, analysis } = await request.json();

    if (!jobDescription || !analysis) {
      return NextResponse.json(
        { error: 'Job description and analysis are required' },
        { status: 400 }
      );
    }

    const portfolioPersonalInfo = {
      fullName: 'Richard Maranga',
      email: portfolioSections.contact.email,
      phone: portfolioSections.contact.phone,
      location: portfolioSections.contact.location,
    };

    // Format experiences with proper dates
    const formattedExperiences = experiences.map(exp => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate ? new Date(exp.endDate) : null;
      
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${year}/${month}`;
      };
      
      const period = endDate 
        ? `${formatDate(startDate)} – ${formatDate(endDate)}`
        : `${formatDate(startDate)} – present`;
      
      return {
        title: exp.title,
        company: exp.company,
        location: exp.location,
        period,
        highlights: exp.achievements,
      };
    });

    // Get all skills as flat array
    const allSkills = skills.map(skill => skill.name);

    // Get featured projects
    const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

    // Use AI ONLY to generate a tailored summary and optimize skill keywords
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `
You are a resume optimization expert. Your job is to analyze the job description and optimize:

1. A compelling professional summary (2-3 sentences)
2. A prioritized list of relevant skills from the candidate's skillset
3. Select and optimize the most relevant experiences for this specific job

IMPORTANT: Only include experiences that are relevant to the target job. Filter out irrelevant roles.

CANDIDATE'S ACTUAL PROFILE:
- About: ${portfolioSections.about}
- All Available Skills: ${allSkills.join(', ')}

ACTUAL EXPERIENCES:
${formattedExperiences.map((e) => `
${e.title} at ${e.company} (${e.period}) - ${e.location}
Current achievements:
${e.highlights?.map((h: string) => `- ${h}`).join('\n')}
`).join('\n')}

- Projects: ${featuredProjects.map((p: { title?: string; name?: string }) => p.title || p.name).join(', ')}

TARGET JOB DESCRIPTION:
${jobDescription}

JOB FIT ANALYSIS:
${JSON.stringify(analysis, null, 2)}

Generate ONLY:
{
  "summary": "2-3 sentence professional summary that positions the candidate for this specific role",
  "skills": ["List of 8-12 most relevant skills from the candidate's actual skillset, prioritized for this job"],
  "experiences": [
    {
      "title": "exact same title",
      "company": "exact same company", 
      "location": "exact same location",
      "period": "exact same period",
      "highlights": ["2-4 optimized achievement bullets that emphasize skills and results relevant to the target job, using keywords from job description naturally"]
    }
  ]
}

CRITICAL RULES:
- ONLY include experiences that are relevant to the target job role
- If a role is not relevant, exclude it entirely from the experiences array
- Keep all company names, job titles, locations, and dates EXACTLY the same for included roles
- Only rewrite the achievement bullets to be more relevant to the target job
- Use keywords from the job description naturally in the achievements
- Focus on quantifiable results and relevant skills
- Only use skills from the "All Available Skills" list above
- Maximum 4 achievements per role, prioritize most relevant ones
- Aim for 2-4 most relevant experiences total

Return only the JSON, no other text.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }

    const aiOptimizations = JSON.parse(jsonMatch[0]);

    // Combine AI optimizations with actual portfolio data
    const finalResumeData = {
      summary: aiOptimizations.summary,
      experiences: aiOptimizations.experiences, // Use AI-optimized experiences (filtered and enhanced)
      skills: aiOptimizations.skills, // Use AI-optimized skill selection
      projects: featuredProjects, // Use actual projects
      education: portfolioSections.education // Use actual education
    };

    return NextResponse.json({ 
      resume: {
        data: finalResumeData,
        personalInfo: portfolioPersonalInfo // Always use actual personal info
      }
    });

  } catch (error) {
    console.error('Resume generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate resume' },
      { status: 500 }
    );
  }
}
