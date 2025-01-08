import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildSystemContext, RESPONSE_PROMPTS } from './portfolio-context';
import type { ChatMessage, MessageType } from '@/types/chat';
import { experiences, projects, skills } from '../portfolio/data';
import { analyzeIntent } from '../utils/intent-analyzer';
import type { Project, Skill, Experience } from '@/types/portfolio';

export class GeminiClient {
  private model: any;
  private genAI: any;
  private systemContext: string;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.systemContext = buildSystemContext();

    // Initialize without schema for more flexible responses
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.5,
        topK: 40,
        topP: 0.95,
      },
    });
  }

  private async initializeChat() {
    return this.model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You will act as this portfolio's AI representative. Here is your context: " + this.systemContext }],
        },
        {
          role: "model",
          parts: [{ text: "I understand completely. I am now your portfolio's AI representative and will speak about your projects, skills, and experience from a first-person perspective." }],
        },
      ],
    });
  }

  async sendMessage(message: string): Promise<ChatMessage> {
    try {
      const chat = await this.initializeChat();
      const intent = await analyzeIntent(message);
      
      const enhancedPrompt = `
        Context: ${intent.type} inquiry about ${intent.keywords?.join(', ')}
        
        Share your experience and insights in a conversational way, while:
        - Connecting relevant projects, skills, and experiences
        - Including specific examples and metrics
        - Maintaining a natural flow
        - Being concise but informative
        - Suggesting logical follow-up areas
        
        User Query: ${message}
      `;

      const result = await chat.sendMessage(enhancedPrompt);
      const response = await result.response;
      const text = response.text();
  
      // Generate dynamic suggested questions based on the response
      const suggestedQuestions = generateSuggestedQuestions(text, intent.type);
  
      // Create metadata based on intent
      const metadata: {
        confidence: number;
        suggestedQuestions: string[];
        projectIds?: string[];
        skillIds?: string[];
        experienceIds?: string[];
        projects?: Record<string, Project>;
        skills?: Record<string, Skill>;
        experiences?: Record<string, Experience>;
      } = {
        confidence: intent.confidence,
        suggestedQuestions,
      };
  
      // Add relevant IDs based on intent type
      switch (intent.type) {
        case 'project':
          metadata.projectIds = intent.entityId ? [intent.entityId] : 
            projects.filter(p => text.toLowerCase().includes(p.title.toLowerCase())).map(p => p.id);
          metadata.projects = projects.reduce<Record<string, Project>>((acc, project) => {
            if (metadata.projectIds?.includes(project.id)) {
              acc[project.id] = project;
            }
            return acc;
          }, {});
          break;
        case 'skill':
          metadata.skillIds = intent.entityId ? [intent.entityId] :
            skills.filter(s => text.toLowerCase().includes(s.name.toLowerCase())).map(s => s.id);
          metadata.skills = skills.reduce<Record<string, Skill>>((acc, skill) => {
            if (metadata.skillIds?.includes(skill.id)) {
              acc[skill.id] = skill;
            }
            return acc;
          }, {});
          break;
        case 'experience':
          metadata.experienceIds = intent.entityId ? [intent.entityId] :
            experiences.filter(e => 
              text.toLowerCase().includes(e.company.toLowerCase()) || 
              text.toLowerCase().includes(e.title.toLowerCase())
            ).map(e => e.id);
          metadata.experiences = experiences.reduce<Record<string, Experience>>((acc, exp) => {
            if (metadata.experienceIds?.includes(exp.id)) {
              acc[exp.id] = exp;
            }
            return acc;
          }, {});
          break;
      }
  
      return {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
        type: intent.type,
        metadata
      };
    } catch (error) {
      console.error('Gemini API Error:', error);
      return {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
        type: 'general',
      };
    }
  }

  async streamMessage(message: string, onChunk: (chunk: string) => void): Promise<void> {
    try {
      const chat = await this.initializeChat();
      const result = await chat.sendMessageStream(message);
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        onChunk(chunkText);
      }
    } catch (error) {
      console.error('Gemini Streaming Error:', error);
      throw error;
    }
  }

  async getProjectDetails(projectId: string): Promise<any> {
    try {
      const chat = await this.initializeChat();
      const result = await chat.sendMessage(RESPONSE_PROMPTS.PROJECT(projectId));
      const response = await result.response;
      return {
        type: 'project',
        content: response.text(),
        projectId
      };
    } catch (error) {
      console.error('Error getting project details:', error);
      throw error;
    }
  }

  async getSkillDetails(skillId: string): Promise<any> {
    try {
      const chat = await this.initializeChat();
      const result = await chat.sendMessage(RESPONSE_PROMPTS.SKILL(skillId));
      const response = await result.response;
      return {
        type: 'skill',
        content: response.text(),
        skillId
      };
    } catch (error) {
      console.error('Error getting skill details:', error);
      throw error;
    }
  }

  async getExperienceDetails(experienceId: string): Promise<any> {
    try {
      const chat = await this.initializeChat();
      const result = await chat.sendMessage(RESPONSE_PROMPTS.EXPERIENCE(experienceId));
      const response = await result.response;
      return {
        type: 'experience',
        content: response.text(),
        experienceId
      };
    } catch (error) {
      console.error('Error getting experience details:', error);
      throw error;
    }
  }
}

// Add this helper function
function generateSuggestedQuestions(response: string, type: MessageType): string[] {
  const baseQuestions = [
    "Can you tell me more about your technical skills?",
    "What was your most challenging project?",
    "Could you describe your work experience?"
  ];

  const contextQuestions: Record<MessageType, string[]> = {
    project: [
      "What technologies did you use?",
      "What were the main challenges?",
      "Can you show me the technical details?"
    ],
    skill: [
      "How did you apply this in your projects?",
      "What's your experience level?",
      "What related technologies do you know?"
    ],
    experience: [
      "What were your main achievements?",
      "What technologies did you work with?",
      "What was your role in the team?"
    ],
    // Add other types as needed...
  };

  return [...(contextQuestions[type] || []), ...baseQuestions].slice(0, 3);
}