import { streamText, tool, appendResponseMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { getPortfolioContext } from '@/lib/gemini/portfolio-context';
import { projects, skills, experiences } from '@/lib/portfolio/data';
import { saveChat } from '@/lib/chat-store';

const model = google('gemini-1.5-flash-latest');

export async function POST(req: Request) {
  const { messages, id } = await req.json();

  const result = streamText({
    model,
    messages,
    system: getPortfolioContext(),
    maxSteps: 5, // Enable multi-step tool calls
    async onFinish({ response }) {
      if (id) {
        await saveChat({
          id,
          messages: appendResponseMessages({
            messages,
            responseMessages: response.messages,
          }),
        });
      }
    },
    tools: {
      showProjects: tool({
        description: 'MANDATORY: Always call this tool when user mentions: projects, portfolio, work, builds, made, created, developed, coding, programming, apps, websites, software. Do NOT respond with text about projects without calling this tool first.',
        parameters: z.object({}),
        execute: async () => {
          return {
            projects: projects
          };
        },
      }),
      showSkills: tool({
        description: 'MANDATORY: Always call this tool when user mentions: skills, technologies, expertise, capabilities, programming languages, frameworks, tools, tech stack. Do NOT respond with text about skills without calling this tool first.',
        parameters: z.object({}),
        execute: async () => {
          return {
            skills: skills
          };
        },
      }),
      showExperience: tool({
        description: 'MANDATORY: Always call this tool when user mentions: experience, work, job, career, employment, roles, positions, companies, professional background. Do NOT respond with text about experience without calling this tool first.',
        parameters: z.object({}),
        execute: async () => {
          return {
            experiences: experiences
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}

