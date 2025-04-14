import { GoogleGenerativeAI, GenerativeModel, SchemaType } from '@google/generative-ai';
import { projects, skills, experiences } from '@/lib/portfolio/data';
import type { MessageType } from '@/types/chat';

interface IntentMatch {
  type: MessageType;
  entityId?: string;
  confidence: number;
  keywords: string[];
  relatedIds?: string[];
}

interface LLMIntentResponse {
  intentType: string;
  confidence: number;
  entities: {
    projects?: string[];
    skills?: string[];
    experiences?: string[];
  };
  keywords: string[];
}

export class LLMIntentAnalyzer {
  private model: GenerativeModel;
  
  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Initialize with schema for structured output
    this.model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-lite", // Using a lighter model for quick intent detection
      generationConfig: {
        temperature: 0.1, // Low temperature for more deterministic responses
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            intentType: {
              type: SchemaType.STRING,
              enum: ["project", "skill", "experience", "general"],
              description: "The primary intent of the user's message"
            },
            confidence: {
              type: SchemaType.NUMBER,
              description: "Confidence score between 0-1"
            },
            entities: {
              type: SchemaType.OBJECT,
              properties: {
                projects: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                  description: "Names of specific projects mentioned"
                },
                skills: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                  description: "Names of specific skills mentioned"
                },
                experiences: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                  description: "Names of specific companies or job roles mentioned"
                }
              }
            },
            keywords: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "Important keywords from the message"
            }
          },
          required: ["intentType", "confidence"]
        }
      }
    });
  }

  async analyzeIntent(message: string): Promise<IntentMatch> {
    try {
      // Create a prompt with portfolio context
      const prompt = `
        Analyze the following user message to determine the primary intent and identify any specific entities mentioned.
        
        Available projects: ${projects.map(p => p.title).join(", ")}
        Available skills: ${skills.map(s => s.name).join(", ")}
        Available experiences: ${experiences.map(e => e.company + " (" + e.title + ")").join(", ")}
        
        User message: "${message}"
        
        Return a JSON object with the intent type, confidence score, and any mentioned entities.
      `;

      const result = await this.model.generateContent(prompt);
      const response = JSON.parse(result.response.text()) as LLMIntentResponse;

      // Map the detected entities to IDs
      let entityId: string | undefined;
      let relatedIds: string[] = [];
      
      if (response.entities?.projects?.length) {
        const projectMatches = projects.filter(p => 
          response.entities.projects!.some(name => 
            p.title.toLowerCase().includes(name.toLowerCase()) || 
            name.toLowerCase().includes(p.title.toLowerCase())
          )
        );
        if (projectMatches.length > 0) {
          entityId = projectMatches[0].id;
          relatedIds = projectMatches.map(p => p.id);
        }
      }
      
      if (!entityId && response.entities?.skills?.length) {
        const skillMatches = skills.filter(s => 
          response.entities.skills!.some(name => 
            s.name.toLowerCase().includes(name.toLowerCase()) || 
            name.toLowerCase().includes(s.name.toLowerCase())
          )
        );
        if (skillMatches.length > 0) {
          entityId = skillMatches[0].id;
          relatedIds = skillMatches.map(s => s.id);
        }
      }
      
      if (!entityId && response.entities?.experiences?.length) {
        const expMatches = experiences.filter(e => 
          response.entities.experiences!.some(name => 
            e.company.toLowerCase().includes(name.toLowerCase()) || 
            e.title.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(e.company.toLowerCase()) ||
            name.toLowerCase().includes(e.title.toLowerCase())
          )
        );
        if (expMatches.length > 0) {
          entityId = expMatches[0].id;
          relatedIds = expMatches.map(e => e.id);
        }
      }

      return {
        type: response.intentType as MessageType,
        entityId,
        relatedIds,
        confidence: response.confidence,
        keywords: response.keywords || []
      };
    } catch (error) {
      console.error('LLM Intent analysis error:', error);
      
      // Fallback to a basic analysis if LLM fails
      return {
        type: 'general',
        confidence: 0.5,
        keywords: message.toLowerCase().split(/\s+/).filter(word => word.length > 3)
      };
    }
  }
}

// Singleton instance for app-wide usage
let analyzerInstance: LLMIntentAnalyzer;

export async function analyzeLLMIntent(message: string): Promise<IntentMatch> {
  if (!analyzerInstance) {
    // Initialize on first use
    const apiKey = process.env.GEMINI_API_KEY!;
    analyzerInstance = new LLMIntentAnalyzer(apiKey);
  }
  
  return analyzerInstance.analyzeIntent(message);
}