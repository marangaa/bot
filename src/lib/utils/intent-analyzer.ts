import { projects, skills, experiences } from '@/lib/portfolio/data';
import type { MessageType } from '@/types/chat';

interface IntentMatch {
  type: MessageType;
  entityId?: string;
  confidence: number;
  keywords: string[];
}

interface IntentScore {
  [key: string]: number;
}

export async function analyzeIntent(message: string): Promise<IntentMatch> {
  const normalizedMessage = message.toLowerCase().trim();

  // Initialize scores
  const scores: IntentScore = {
    project_details: 0,
    skill_inquiry: 0,
    experience_details: 0,
    general: 0.1,
  };

  // Define keywords and their weights
  const keywordWeights = {
    project_details: {
      project: 0.4,
      build: 0.3,
      create: 0.3,
      develop: 0.3,
      implement: 0.3,
      architecture: 0.4,
      technical: 0.3,
      github: 0.4,
      demo: 0.3,
      code: 0.3,
      repository: 0.4,
    },
    skill_inquiry: {
      skill: 0.4,
      technology: 0.3,
      'tech stack': 0.4,
      proficiency: 0.4,
      expertise: 0.4,
      experience: 0.3,
      familiar: 0.3,
      knowledge: 0.3,
      learn: 0.2,
      use: 0.2,
    },
    experience_details: {
      work: 0.4,
      job: 0.3,
      role: 0.3,
      company: 0.4,
      position: 0.3,
      responsibility: 0.4,
      achievement: 0.4,
      career: 0.3,
      professional: 0.3,
    },
  };

  // Score based on keyword matches
  Object.entries(keywordWeights).forEach(([intentType, keywords]) => {
    Object.entries(keywords).forEach(([keyword, weight]) => {
      if (normalizedMessage.includes(keyword)) {
        scores[intentType] += weight;
      }
    });
  });

  // Check for specific entity mentions
  let entityId: string | undefined;
  let highestEntityScore = 0;

  // Project mentions
  projects.forEach(project => {
    const titleWords = project.title.toLowerCase().split(/\s+/);
    const matchCount = titleWords.filter(word => normalizedMessage.includes(word)).length;
    const score = matchCount / titleWords.length;
    
    if (score > 0.5 && score > highestEntityScore) {
      scores.project_details += 0.5;
      highestEntityScore = score;
      entityId = project.id;
    }
  });

  // Skill mentions
  skills.forEach(skill => {
    if (normalizedMessage.includes(skill.name.toLowerCase())) {
      scores.skill_inquiry += 0.5;
      if (!entityId) entityId = skill.id;
    }
  });

  // Experience mentions
  experiences.forEach(exp => {
    const companyMatch = normalizedMessage.includes(exp.company.toLowerCase());
    const titleMatch = normalizedMessage.includes(exp.title.toLowerCase());
    
    if (companyMatch || titleMatch) {
      scores.experience_details += 0.5;
      if (!entityId) entityId = exp.id;
    }
  });

  // Determine highest scoring intent
  let maxScore = 0;
  let detectedType: MessageType = 'general';

  Object.entries(scores).forEach(([intent, score]) => {
    if (score > maxScore) {
      maxScore = score;
      detectedType = mapIntentToMessageType(intent);
    }
  });

  // Extract keywords for context
  const keywords = Object.values(keywordWeights)
    .flatMap(group => Object.keys(group))
    .filter(keyword => normalizedMessage.includes(keyword));

  return {
    type: detectedType,
    entityId,
    confidence: Math.min(maxScore, 1),
    keywords: Array.from(new Set(keywords)),
  };
}

function mapIntentToMessageType(intent: string): MessageType {
  switch (intent) {
    case 'project_details':
      return 'project';
    case 'skill_inquiry':
      return 'skill';
    case 'experience_details':
      return 'experience';
    default:
      return 'general';
  }
}