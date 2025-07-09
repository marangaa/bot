/**
 * Project Knowledge Base - Comprehensive reference for AI tools
 * This serves as the central knowledge repository for intelligent project analysis,
 * cost estimation, tech stack recommendations, and implementation planning.
 */

export interface ProjectTemplate {
  id: string;
  name: string;
  type: string;
  complexity: 'mvp' | 'standard' | 'advanced' | 'enterprise';
  keywords: string[];
  solution: string;
  technologies: string[];
  industries: string[];
  scalability: 'small-scale' | 'medium-scale' | 'large-scale' | 'enterprise-scale';
  successMetrics: string[];
  referenceProject: string;
  costRange: {
    mvp: number;
    standard: number;
    advanced: number;
    enterprise: number;
  };
  timelineWeeks: {
    mvp: number;
    standard: number;
    advanced: number;
    enterprise: number;
  };
  riskFactors: string[];
  techStackPattern: string;
}

export interface TechStackPattern {
  id: string;
  name: string;
  keywords: string[];
  frontend: string[];
  backend: string[];
  ai: string[];
  database: string[];
  deployment: string[];
  reference: string;
  complexity: number; // 1-5 scale
  learningCurve: 'easy' | 'moderate' | 'challenging' | 'expert';
  costEfficiency: 'low' | 'moderate' | 'high' | 'premium';
}

export interface IndustryPattern {
  id: string;
  name: string;
  keywords: string[];
  commonChallenges: string[];
  preferredSolutions: string[];
  complianceRequirements: string[];
  budgetExpectations: 'startup' | 'small-business' | 'medium-enterprise' | 'large-enterprise';
}

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'whatsapp-automation',
    name: 'WhatsApp Business Automation Platform',
    type: 'messaging-platform',
    complexity: 'advanced',
    keywords: ['whatsapp', 'automation', 'messaging', 'bot', 'customer service', 'chat', 'communication'],
    solution: 'AI-powered WhatsApp automation platform with real-time messaging, customer management, and intelligent responses',
    technologies: ['Next.js', 'Node.js', 'WhatsApp Web.js', 'Google Gemini', 'MongoDB', 'Socket.IO'],
    industries: ['retail', 'e-commerce', 'customer-service', 'marketing', 'sales'],
    scalability: 'enterprise-scale',
    successMetrics: ['10,000+ messages monthly', '95% uptime', '50% response time reduction', 'automated customer support'],
    referenceProject: 'Chatt-v3 Enterprise WhatsApp Platform',
    costRange: { mvp: 8000, standard: 20000, advanced: 40000, enterprise: 80000 },
    timelineWeeks: { mvp: 6, standard: 12, advanced: 20, enterprise: 28 },
    riskFactors: ['WhatsApp API changes', 'Message rate limits', 'Privacy compliance', 'User adoption'],
    techStackPattern: 'messaging-platform'
  },
  {
    id: 'survey-platform',
    name: 'AI-Powered Conversational Survey Platform',
    type: 'data-collection',
    complexity: 'advanced',
    keywords: ['survey', 'feedback', 'forms', 'data collection', 'conversational ai', 'analytics', 'insights'],
    solution: 'Interactive survey platform with AI-driven conversations for higher engagement and completion rates',
    technologies: ['Next.js 15', 'Azure OpenAI', 'MongoDB', 'Real-time Streaming', 'NextAuth.js'],
    industries: ['market-research', 'hr', 'education', 'healthcare', 'product-management'],
    scalability: 'large-scale',
    successMetrics: ['3-5x higher completion rates', 'real-time analytics', 'adaptive questioning', 'sentiment analysis'],
    referenceProject: 'Resonate: AI-Powered Conversational Survey Platform',
    costRange: { mvp: 10000, standard: 25000, advanced: 50000, enterprise: 120000 },
    timelineWeeks: { mvp: 8, standard: 16, advanced: 24, enterprise: 32 },
    riskFactors: ['AI accuracy', 'Data privacy', 'Response quality', 'Integration complexity'],
    techStackPattern: 'data-collection'
  },
  {
    id: 'rag-knowledge-system',
    name: 'RAG-Powered Knowledge Management System',
    type: 'ai-knowledge-system',
    complexity: 'advanced',
    keywords: ['rag', 'vector search', 'knowledge base', 'search', 'ai', 'embeddings', 'documents'],
    solution: 'Intelligent document search and knowledge retrieval system using RAG architecture',
    technologies: ['Next.js', 'Vector Database', 'OpenAI Embeddings', 'RAG Architecture', 'Redis'],
    industries: ['enterprise', 'education', 'legal', 'healthcare', 'research'],
    scalability: 'enterprise-scale',
    successMetrics: ['semantic search accuracy', 'sub-second query response', 'document relevance scoring', 'knowledge discovery'],
    referenceProject: 'Vector Search RAG System',
    costRange: { mvp: 12000, standard: 30000, advanced: 60000, enterprise: 150000 },
    timelineWeeks: { mvp: 10, standard: 18, advanced: 28, enterprise: 36 },
    riskFactors: ['Vector database costs', 'Embedding quality', 'Search relevance', 'Data processing pipeline'],
    techStackPattern: 'ai-knowledge-system'
  },
  {
    id: 'productivity-mobile-app',
    name: 'AI-Enhanced Productivity Mobile Application',
    type: 'mobile-app',
    complexity: 'standard',
    keywords: ['mobile', 'productivity', 'tasks', 'voice', 'ai assistant', 'notifications', 'efficiency'],
    solution: 'Voice-powered mobile productivity app with AI task management and smart notifications',
    technologies: ['React Native', 'Expo', 'Firebase', 'Voice Recognition', 'Push Notifications'],
    industries: ['productivity', 'business', 'personal-development', 'time-management'],
    scalability: 'medium-scale',
    successMetrics: ['voice recognition accuracy', 'task completion rates', 'user engagement', 'daily active users'],
    referenceProject: 'Tasky - Voice-Powered Productivity App',
    costRange: { mvp: 12000, standard: 25000, advanced: 50000, enterprise: 100000 },
    timelineWeeks: { mvp: 10, standard: 16, advanced: 24, enterprise: 32 },
    riskFactors: ['App store approval', 'Voice API costs', 'Cross-platform compatibility', 'User retention'],
    techStackPattern: 'mobile-app'
  },
  {
    id: 'browser-extension',
    name: 'Productivity Enhancement Browser Extension',
    type: 'browser-extension',
    complexity: 'standard',
    keywords: ['browser extension', 'productivity', 'focus', 'chrome', 'workflow', 'automation'],
    solution: 'Browser extension for enhanced productivity, focus management, and workflow optimization',
    technologies: ['JavaScript', 'Chrome Extensions API', 'React', 'Firebase'],
    industries: ['productivity', 'education', 'remote-work', 'digital-wellness'],
    scalability: 'medium-scale',
    successMetrics: ['active users', 'productivity metrics', 'focus time increase', 'user ratings'],
    referenceProject: 'FocusFlow - Productivity Enhancement Extension',
    costRange: { mvp: 4000, standard: 8000, advanced: 15000, enterprise: 30000 },
    timelineWeeks: { mvp: 4, standard: 8, advanced: 12, enterprise: 16 },
    riskFactors: ['Browser API changes', 'Store policies', 'Privacy concerns', 'Cross-browser support'],
    techStackPattern: 'browser-extension'
  },
  {
    id: 'enterprise-web-app',
    name: 'Enterprise Web Application Platform',
    type: 'enterprise-platform',
    complexity: 'enterprise',
    keywords: ['enterprise', 'dashboard', 'analytics', 'workflow', 'management', 'reporting', 'scalable'],
    solution: 'Comprehensive enterprise platform with advanced analytics, workflow management, and reporting',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    industries: ['enterprise', 'finance', 'healthcare', 'government', 'large-corporations'],
    scalability: 'enterprise-scale',
    successMetrics: ['system reliability', 'user adoption', 'performance benchmarks', 'security compliance'],
    referenceProject: 'AgentFlow Visualizer - Customer Support Workflow',
    costRange: { mvp: 20000, standard: 50000, advanced: 100000, enterprise: 250000 },
    timelineWeeks: { mvp: 12, standard: 24, advanced: 36, enterprise: 48 },
    riskFactors: ['Scalability requirements', 'Security compliance', 'Integration complexity', 'User training'],
    techStackPattern: 'enterprise-platform'
  }
];

export const TECH_STACK_PATTERNS: TechStackPattern[] = [
  {
    id: 'messaging-platform',
    name: 'Real-time Messaging Platform',
    keywords: ['whatsapp', 'chat', 'messaging', 'real-time', 'bot', 'communication'],
    frontend: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Socket.IO Client'],
    backend: ['Node.js', 'WhatsApp Web.js', 'Socket.IO', 'Express'],
    ai: ['Google Gemini 2.0', 'AI SDK', 'Function Calling'],
    database: ['MongoDB', 'Redis'],
    deployment: ['Vercel', 'Railway', 'Docker'],
    reference: 'Chatt-v3 Enterprise WhatsApp Platform - handling 10,000+ messages monthly',
    complexity: 4,
    learningCurve: 'challenging',
    costEfficiency: 'high'
  },
  {
    id: 'data-collection',
    name: 'Interactive Data Collection Platform',
    keywords: ['survey', 'forms', 'feedback', 'data', 'collection', 'analytics'],
    frontend: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Node.js', 'Prisma ORM', 'NextAuth.js'],
    ai: ['Azure OpenAI', 'Google AI SDK', 'Real-time Streaming'],
    database: ['MongoDB', 'PostgreSQL'],
    deployment: ['Vercel', 'Supabase'],
    reference: 'Resonate Survey Platform - achieving 3-5x higher completion rates',
    complexity: 3,
    learningCurve: 'moderate',
    costEfficiency: 'high'
  },
  {
    id: 'ai-knowledge-system',
    name: 'AI-Powered Knowledge System',
    keywords: ['rag', 'vector', 'search', 'knowledge', 'ai', 'embeddings', 'documents'],
    frontend: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
    backend: ['Node.js', 'FastAPI', 'Vector Database APIs'],
    ai: ['OpenAI Embeddings', 'RAG Architecture', 'Function Calling'],
    database: ['Vector Database', 'PostgreSQL', 'Redis'],
    deployment: ['Vercel', 'AWS', 'Google Cloud'],
    reference: 'Vector Search RAG System - intelligent movie dataset exploration',
    complexity: 5,
    learningCurve: 'expert',
    costEfficiency: 'premium'
  },
  {
    id: 'mobile-app',
    name: 'Cross-Platform Mobile Application',
    keywords: ['mobile', 'app', 'react native', 'ios', 'android', 'cross-platform'],
    frontend: ['React Native', 'Expo', 'TypeScript', 'Redux Toolkit'],
    backend: ['Node.js', 'Firebase Functions', 'Express'],
    ai: ['Google Gemini', 'Speech Recognition', 'Push Notifications'],
    database: ['Firebase Firestore', 'SQLite'],
    deployment: ['Expo Application Services', 'App Store', 'Google Play'],
    reference: 'Tasky - voice-powered productivity app with AI task management',
    complexity: 3,
    learningCurve: 'moderate',
    costEfficiency: 'moderate'
  },
  {
    id: 'browser-extension',
    name: 'Browser Extension Platform',
    keywords: ['extension', 'browser', 'chrome', 'productivity', 'automation'],
    frontend: ['JavaScript', 'React', 'Chrome Extensions API', 'Tailwind CSS'],
    backend: ['Firebase Functions', 'Node.js'],
    ai: ['Google Gemini', 'Browser AI APIs'],
    database: ['Firebase Firestore', 'Chrome Storage API'],
    deployment: ['Chrome Web Store', 'Firefox Add-ons'],
    reference: 'FocusFlow - productivity enhancement and focus management',
    complexity: 2,
    learningCurve: 'easy',
    costEfficiency: 'high'
  },
  {
    id: 'enterprise-platform',
    name: 'Enterprise-Grade Platform',
    keywords: ['enterprise', 'scalable', 'dashboard', 'analytics', 'workflow', 'management'],
    frontend: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Node.js', 'Prisma', 'NextAuth.js'],
    ai: ['Google Gemini', 'AI SDK', 'Streaming'],
    database: ['PostgreSQL', 'Redis'],
    deployment: ['AWS', 'Google Cloud', 'Kubernetes', 'Docker'],
    reference: 'AgentFlow Visualizer - customer support workflow visualization',
    complexity: 5,
    learningCurve: 'expert',
    costEfficiency: 'premium'
  }
];

export const INDUSTRY_PATTERNS: IndustryPattern[] = [
  {
    id: 'e-commerce',
    name: 'E-commerce & Retail',
    keywords: ['ecommerce', 'retail', 'shopping', 'sales', 'inventory', 'customers'],
    commonChallenges: ['customer engagement', 'inventory management', 'order processing', 'customer support'],
    preferredSolutions: ['whatsapp-automation', 'survey-platform', 'enterprise-web-app'],
    complianceRequirements: ['PCI DSS', 'GDPR', 'data protection'],
    budgetExpectations: 'medium-enterprise'
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    keywords: ['healthcare', 'medical', 'patients', 'doctors', 'health', 'clinical'],
    commonChallenges: ['patient communication', 'data management', 'compliance', 'workflow optimization'],
    preferredSolutions: ['rag-knowledge-system', 'survey-platform', 'enterprise-web-app'],
    complianceRequirements: ['HIPAA', 'GDPR', 'medical data protection'],
    budgetExpectations: 'large-enterprise'
  },
  {
    id: 'education',
    name: 'Education & Training',
    keywords: ['education', 'learning', 'students', 'teachers', 'training', 'courses'],
    commonChallenges: ['student engagement', 'content delivery', 'assessment', 'knowledge management'],
    preferredSolutions: ['rag-knowledge-system', 'survey-platform', 'browser-extension'],
    complianceRequirements: ['FERPA', 'COPPA', 'student privacy'],
    budgetExpectations: 'small-business'
  },
  {
    id: 'fintech',
    name: 'Financial Technology',
    keywords: ['fintech', 'finance', 'banking', 'payments', 'investment', 'financial'],
    commonChallenges: ['security', 'compliance', 'user experience', 'real-time processing'],
    preferredSolutions: ['enterprise-web-app', 'whatsapp-automation', 'rag-knowledge-system'],
    complianceRequirements: ['PCI DSS', 'SOX', 'KYC', 'AML'],
    budgetExpectations: 'large-enterprise'
  },
  {
    id: 'productivity',
    name: 'Productivity & Workplace',
    keywords: ['productivity', 'workplace', 'efficiency', 'workflow', 'team', 'collaboration'],
    commonChallenges: ['workflow optimization', 'team collaboration', 'time management', 'task automation'],
    preferredSolutions: ['productivity-mobile-app', 'browser-extension', 'enterprise-web-app'],
    complianceRequirements: ['data privacy', 'workplace regulations'],
    budgetExpectations: 'small-business'
  }
];

/**
 * Intelligent pattern matching functions
 */
export class ProjectKnowledgeBase {
  static findProjectTemplate(keywords: string[], requirements: string[]): ProjectTemplate | null {
    const allTerms = [...keywords, ...requirements].join(' ').toLowerCase();
    
    let bestMatch: ProjectTemplate | null = null;
    let bestScore = 0;
    
    for (const template of PROJECT_TEMPLATES) {
      let score = 0;
      
      // Check keyword matches
      for (const keyword of template.keywords) {
        if (allTerms.includes(keyword.toLowerCase())) {
          score += 2;
        }
      }
      
      // Check partial matches
      for (const keyword of template.keywords) {
        const keywordWords = keyword.split(' ');
        for (const word of keywordWords) {
          if (allTerms.includes(word.toLowerCase()) && word.length > 3) {
            score += 1;
          }
        }
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = template;
      }
    }
    
    return bestScore > 2 ? bestMatch : null;
  }
  
  static findTechStackPattern(projectType: string, keywords: string[]): TechStackPattern | null {
    const allTerms = [...keywords, projectType].join(' ').toLowerCase();
    
    let bestMatch: TechStackPattern | null = null;
    let bestScore = 0;
    
    for (const pattern of TECH_STACK_PATTERNS) {
      let score = 0;
      
      for (const keyword of pattern.keywords) {
        if (allTerms.includes(keyword.toLowerCase())) {
          score += 2;
        }
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = pattern;
      }
    }
    
    return bestMatch;
  }
  
  static findIndustryPattern(description: string): IndustryPattern | null {
    const descLower = description.toLowerCase();
    
    for (const industry of INDUSTRY_PATTERNS) {
      for (const keyword of industry.keywords) {
        if (descLower.includes(keyword)) {
          return industry;
        }
      }
    }
    
    return null;
  }
  
  static calculateComplexity(features: string[], scalingNeeds: string): 'mvp' | 'standard' | 'advanced' | 'enterprise' {
    let complexityScore = 0;
    
    const complexKeywords = ['ai', 'machine learning', 'real-time', 'enterprise', 'scalable', 'integration'];
    
    for (const feature of features) {
      const featureLower = feature.toLowerCase();
      for (const keyword of complexKeywords) {
        if (featureLower.includes(keyword)) {
          complexityScore++;
        }
      }
    }
    
    if (scalingNeeds === 'enterprise-scale') complexityScore += 2;
    if (scalingNeeds === 'large-scale') complexityScore += 1;
    
    if (complexityScore >= 5) return 'enterprise';
    if (complexityScore >= 3) return 'advanced';
    if (complexityScore >= 1) return 'standard';
    return 'mvp';
  }
}
