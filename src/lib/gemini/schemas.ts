import { SchemaType } from '@google/generative-ai';

export const portfolioResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    responseType: {
      type: SchemaType.STRING,
      enum: ["project", "skill", "experience", "general", "multi"],
    },
    content: {
      type: SchemaType.STRING,
    },
    data: {
      type: SchemaType.OBJECT,
      properties: {
        projectIds: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING }
        },
        skillIds: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING }
        },
        experienceIds: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING }
        }
      }
    },
    metadata: {
      type: SchemaType.OBJECT,
      properties: {
        confidence: {
          type: SchemaType.NUMBER
        },
        suggestedQuestions: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING }
        }
      }
    }
  },
  required: ["responseType", "content"]
};