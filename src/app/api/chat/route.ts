import { streamText, tool, appendResponseMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { getPortfolioContext } from '@/lib/gemini/portfolio-context';
import { projects, skills, experiences } from '@/lib/portfolio/data';
import { saveChat } from '@/lib/chat-store';
import { 
  ProjectKnowledgeBase, 
  PROJECT_TEMPLATES, 
  TECH_STACK_PATTERNS,
  type ProjectTemplate,
  type TechStackPattern 
} from '@/lib/gemini/project-knowledge';

const model = google('gemini-1.5-flash-latest');

export async function POST(req: Request) {
  const { messages, id } = await req.json();

  console.log('[API] POST request received', { messagesCount: messages.length, id });

  try {
    const result = streamText({
      model,
      messages,
      system: getPortfolioContext(),
      maxSteps: 5, // Enable multi-step tool calls
      async onFinish({ response }) {
        console.log('[API] StreamText finished', { responseMessagesCount: response.messages.length });
        if (id) {
          await saveChat({
            id,
            messages: appendResponseMessages({
              messages,
              responseMessages: response.messages,
            }),
          });
          console.log('[API] Chat saved successfully');
        }
      },
    tools: {
      showProjects: tool({
        description: 'MANDATORY: Always call this tool when user mentions: projects, portfolio, work, builds, made, created, developed, coding, programming, apps, websites, software. Do NOT respond with text about projects without calling this tool first.',
        parameters: z.object({}),
        execute: async () => {
          // Sort projects to show featured/cool ones first, then by creation date (newest first)
          const sortedProjects = [...projects].sort((a, b) => {
            // Featured projects come first
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            
            // If both are featured or both are not featured, sort by creation date (newest first)
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          
          return {
            projects: sortedProjects
          };
        },
      }),
      
      showSpecificProject: tool({
        description: 'Show detailed information about a specific project when user asks about a particular project by name, technology, or concept. Use when user mentions specific projects like WhatsApp automation, chatbots, surveys, vector search, etc.',
        parameters: z.object({
          projectId: z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9']).describe('The ID of the project to show. Choose based on user intent: 1=AI Portfolio, 2=Britam Insurance Bot, 3=FocusFlow, 4=AgentFlow, 5=Tasky, 6=Vector Search RAG, 7=RAG Function Calling, 8=Chatt-v3 WhatsApp Platform, 9=Resonate Survey Platform')
        }),
        execute: async ({ projectId }) => {
          const foundProject = projects.find(project => project.id === projectId);
          
          return {
            project: foundProject,
            projectId: projectId
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
      analyzeBusinessRequirement: tool({
        description: 'Analyze business requirements and suggest technical solutions. Call when user describes a business problem, needs analysis, or wants technical recommendations.',
        parameters: z.object({
          businessDescription: z.string().describe('Description of the business or problem'),
          industry: z.string().describe('Industry or sector (e.g., fintech, e-commerce, healthcare, education, etc.)'),
          challenges: z.array(z.string()).describe('Main challenges or pain points mentioned by the user'),
          budgetRange: z.enum(['startup', 'small-business', 'medium-enterprise', 'large-enterprise']).describe('Budget range based on company size and context'),
          urgency: z.enum(['exploratory', 'planning', 'urgent', 'immediate']).describe('Timeline urgency based on user context')
        }),
        execute: async ({ businessDescription, industry, challenges, budgetRange, urgency }) => {
          // Use knowledge base to find relevant project templates
          const relevantTemplate = ProjectKnowledgeBase.findProjectTemplate(
            [industry, businessDescription], 
            challenges
          );
          
          const industryPattern = ProjectKnowledgeBase.findIndustryPattern(businessDescription);
          
          // Generate intelligent solutions based on knowledge base
          const recommendedSolutions = challenges.map(challenge => {
            const template = relevantTemplate || PROJECT_TEMPLATES[0]; // fallback to first template
            
            const timeline = urgency === 'immediate' ? '2-4 weeks' : 
                           urgency === 'urgent' ? '4-8 weeks' : '8-16 weeks';
            
            return {
              challenge,
              solution: template.solution,
              technologies: template.technologies,
              complexity: template.complexity,
              timeline,
              referenceProject: template.referenceProject
            };
          });

          // Dynamic cost estimation based on budget range
          const costEstimates: Record<string, string> = {
            'startup': '$5,000-$15,000',
            'small-business': '$15,000-$50,000', 
            'medium-enterprise': '$50,000-$150,000',
            'large-enterprise': '$150,000+'
          };

          return {
            analysis: {
              businessDescription,
              industry,
              challenges,
              budgetRange,
              urgency,
              recommendedSolutions,
              estimatedCost: costEstimates[budgetRange],
              industryInsights: industryPattern ? {
                commonChallenges: industryPattern.commonChallenges,
                complianceRequirements: industryPattern.complianceRequirements,
                budgetExpectations: industryPattern.budgetExpectations
              } : null,
              keyRecommendations: [
                'Start with MVP to validate core assumptions',
                'Leverage proven AI technologies from my successful projects',
                'Focus on measurable business impact and user experience',
                'Plan for scalability and enterprise-grade security',
                `Consider ${urgency === 'immediate' ? 'rapid prototyping' : 'iterative development'} approach`
              ]
            }
          };
        },
      }),
      generateImplementationPlan: tool({
        description: 'Generate detailed technical implementation plan based on my real project experience. Call when user wants to know how to build something or needs a development roadmap.',
        parameters: z.object({
          projectType: z.enum(['web-app', 'mobile-app', 'ai-chatbot', 'whatsapp-automation', 'survey-platform', 'rag-system', 'chrome-extension', 'enterprise-platform']).describe('Type of project to build'),
          features: z.array(z.string()).describe('Required features mentioned by user'),
          complexity: z.enum(['mvp', 'standard', 'advanced', 'enterprise']).describe('Project complexity level'),
          teamSize: z.enum(['solo', 'small-team', 'medium-team', 'large-team']).describe('Development team size')
        }),
        execute: async ({ projectType, features, complexity, teamSize }) => {
          // Find matching tech stack pattern from knowledge base
          const techStackPattern = ProjectKnowledgeBase.findTechStackPattern(
            projectType, 
            features
          );
          
          // Find relevant project template
          const projectTemplate = PROJECT_TEMPLATES.find(
            template => template.techStackPattern === techStackPattern?.id
          );
          
          // Use knowledge base for dynamic planning
          const calculatedComplexity = ProjectKnowledgeBase.calculateComplexity(
            features, 
            'medium-scale' // default scaling
          );
          
          const finalComplexity = complexity || calculatedComplexity;
          
          // Dynamic phase planning based on template and complexity
          const complexityMultipliers = {
            'mvp': 0.5,
            'standard': 1.0,
            'advanced': 1.5,
            'enterprise': 2.0
          };

          const teamMultipliers = {
            'solo': 1.5,
            'small-team': 1.0,
            'medium-team': 0.8,
            'large-team': 0.6
          };

          const baseWeeks = projectTemplate?.timelineWeeks[finalComplexity] || 8;
          const adjustedWeeks = Math.round(baseWeeks * teamMultipliers[teamSize]);

          const phases = [
            {
              phase: 'Planning & Architecture',
              duration: `${Math.round(adjustedWeeks * 0.15)} weeks`,
              tasks: [
                'Requirements analysis and documentation',
                'Technical architecture design',
                'Database schema and API design',
                'UI/UX wireframes and prototyping'
              ]
            },
            {
              phase: 'Development Setup',
              duration: `${Math.round(adjustedWeeks * 0.1)} weeks`,
              tasks: [
                'Development environment configuration',
                'CI/CD pipeline setup',
                'Project structure and tooling',
                'Authentication and security setup'
              ]
            },
            {
              phase: 'Core Feature Development',
              duration: `${Math.round(adjustedWeeks * 0.6)} weeks`,
              tasks: features.map(feature => `Implement ${feature}`).concat([
                'API endpoints and business logic',
                'Frontend components and state management',
                'Third-party integrations'
              ])
            },
            {
              phase: 'Testing & Optimization',
              duration: `${Math.round(adjustedWeeks * 0.1)} weeks`,
              tasks: [
                'Unit and integration testing',
                'Performance optimization',
                'Security audit and fixes',
                'Cross-browser/device testing'
              ]
            },
            {
              phase: 'Deployment & Launch',
              duration: `${Math.round(adjustedWeeks * 0.05)} weeks`,
              tasks: [
                'Production deployment setup',
                'Monitoring and analytics',
                'Documentation and handover',
                'Launch and post-launch support'
              ]
            }
          ];

          // Use risk factors from knowledge base
          const riskFactors = projectTemplate?.riskFactors || [
            'Third-party API rate limits and changes',
            'User adoption and feedback integration'
          ];

          return {
            implementationPlan: {
              projectType,
              features,
              complexity: finalComplexity,
              teamSize,
              recommendedTechStack: techStackPattern?.frontend.concat(
                techStackPattern.backend,
                techStackPattern.ai,
                techStackPattern.database
              ) || ['Next.js', 'TypeScript', 'Node.js'],
              phases,
              totalTimeline: `${adjustedWeeks} weeks`,
              riskFactors,
              successMetrics: projectTemplate?.successMetrics || [
                'User engagement and retention rates',
                'Performance benchmarks (load time, responsiveness)',
                'System reliability (uptime, error rates)',
                'Business KPI achievement'
              ],
              referenceProject: projectTemplate?.referenceProject || 'Portfolio projects'
            }
          };
        },
      }),
      
      estimateProjectCost: tool({
        description: 'Provide intelligent project cost estimation based on my real project experience. Call when user asks about pricing, budget, or wants to know how much something would cost.',
        parameters: z.object({
          projectType: z.enum(['simple-website', 'web-app', 'mobile-app', 'ai-chatbot', 'whatsapp-automation', 'survey-platform', 'rag-system', 'chrome-extension', 'enterprise-platform']).describe('Type of project based on user requirements'),
          scope: z.enum(['mvp', 'standard', 'advanced', 'enterprise']).describe('Project scope and complexity level'),
          features: z.array(z.string()).describe('Specific features requested by user'),
          timeframe: z.enum(['asap', 'standard', 'flexible']).describe('Project timeline urgency'),
          supportLevel: z.enum(['basic', 'standard', 'premium', 'enterprise']).describe('Level of ongoing support needed')
        }),
        execute: async ({ projectType, scope, features, timeframe, supportLevel }) => {
          // Find matching project template from knowledge base
          const projectTemplate = PROJECT_TEMPLATES.find(
            template => template.id.includes(projectType.replace('-', '-')) || 
                       template.type === projectType
          );
          
          // Use knowledge base for intelligent cost calculation
          const baseCost = projectTemplate?.costRange[scope] || 10000;
          
          // Feature complexity analysis using knowledge base
          const calculatedComplexity = ProjectKnowledgeBase.calculateComplexity(
            features, 
            'medium-scale'
          );
          
          const featureCostMultipliers: Record<string, number> = {
            'ai': 1.5, 'machine-learning': 1.5, 'automation': 1.3,
            'real-time': 1.4, 'streaming': 1.4, 'websocket': 1.3,
            'integration': 1.2, 'api': 1.1, 'webhook': 1.2,
            'dashboard': 1.2, 'analytics': 1.3, 'reporting': 1.2,
            'authentication': 1.1, 'security': 1.2, 'encryption': 1.3
          };

          let featureMultiplier = 1.0;
          features.forEach(feature => {
            const featureLower = feature.toLowerCase();
            Object.entries(featureCostMultipliers).forEach(([keyword, multiplier]) => {
              if (featureLower.includes(keyword)) {
                featureMultiplier *= multiplier;
              }
            });
          });

          // Timeline urgency adjustments
          const timeframeMultipliers: Record<string, number> = {
            'asap': 1.5,      // Rush job premium
            'standard': 1.0,   // Normal timeline
            'flexible': 0.9    // Flexible timeline discount
          };

          const adjustedCost = Math.round(baseCost * featureMultiplier * timeframeMultipliers[timeframe]);

          // Support and maintenance costs
          const supportCosts: Record<string, number> = {
            'basic': adjustedCost * 0.10,      // 10% annually
            'standard': adjustedCost * 0.15,   // 15% annually  
            'premium': adjustedCost * 0.20,    // 20% annually
            'enterprise': adjustedCost * 0.25  // 25% annually
          };

          // Dynamic cost breakdown
          const breakdown = {
            'Core Development': Math.round(adjustedCost * 0.55),
            'AI/ML Integration': Math.round(adjustedCost * (featureMultiplier > 1.3 ? 0.20 : 0.10)),
            'Design & UX': Math.round(adjustedCost * 0.15),
            'Testing & QA': Math.round(adjustedCost * 0.10),
            'Deployment & Setup': Math.round(adjustedCost * 0.05),
            'Project Management': Math.round(adjustedCost * 0.05)
          };

          // Payment options based on project size
          const getPaymentOptions = (cost: number): string[] => {
            if (cost < 10000) {
              return ['50% upfront, 50% on completion', 'Full payment upfront (5% discount)'];
            } else if (cost < 50000) {
              return ['30% upfront, 30% at milestone, 40% on completion', '50% upfront, 50% on completion'];
            } else {
              return ['25% upfront, 25% at each milestone (4 payments)', '30% upfront, 30% at milestone, 40% on completion', 'Monthly installments available'];
            }
          };

          // What's included based on scope
          const getIncludedServices = (scope: string): string[] => {
            const base = [
              'Source code and full ownership',
              'Technical documentation',
              'Basic training and handover',
              '30-day bug fix guarantee'
            ];

            const advanced = [
              ...base,
              'Performance optimization',
              'Security audit',
              'Deployment assistance',
              '90-day extended support'
            ];

            const enterprise = [
              ...advanced,
              'Custom integrations',
              'Load testing and optimization',
              'Comprehensive documentation',
              '6-month priority support',
              'Team training sessions'
            ];

            if (scope === 'enterprise') return enterprise;
            if (scope === 'advanced') return advanced;
            return base;
          };

          const getDeliveryEstimate = (scope: string, timeframe: string): string => {
            const baseWeeks: Record<string, number> = {
              'mvp': 4,
              'standard': 8, 
              'advanced': 16,
              'enterprise': 24
            };

            const timeframeAdjustment: Record<string, number> = {
              'asap': 0.7,      // Faster but more resources
              'standard': 1.0,
              'flexible': 1.3   // More time, better planning
            };

            const weeks = Math.round(baseWeeks[scope] * timeframeAdjustment[timeframe]);
            return `${weeks} weeks (${Math.round(weeks / 4)} months)`;
          };

          const getSimilarProjectExamples = (projectType: string): string => {
            const examples: Record<string, string> = {
              'whatsapp-automation': 'Similar to my Chatt-v3 platform that handles 10,000+ messages monthly',
              'survey-platform': 'Similar to my Resonate platform with 3-5x higher completion rates',
              'rag-system': 'Similar to my Vector Search RAG system for intelligent data retrieval',
              'ai-chatbot': 'Similar to this AI Portfolio Assistant with advanced conversation capabilities',
              'mobile-app': 'Similar to my Tasky app with voice recognition and smart notifications'
            };

            return examples[projectType] || 'Based on my portfolio of enterprise-grade applications';
          };

          return {
            estimation: {
              projectType,
              scope,
              features,
              timeframe,
              baseCost,
              featureComplexityMultiplier: Math.round(featureMultiplier * 100) / 100,
              totalCost: adjustedCost,
              annualSupportCost: Math.round(supportCosts[supportLevel]),
              breakdown,
              paymentOptions: getPaymentOptions(adjustedCost),
              included: getIncludedServices(scope),
              deliveryTimeline: getDeliveryEstimate(scope, timeframe),
              similarProjects: getSimilarProjectExamples(projectType),
              knowledgeBaseInsights: projectTemplate ? {
                referenceProject: projectTemplate.referenceProject,
                successMetrics: projectTemplate.successMetrics,
                riskFactors: projectTemplate.riskFactors
              } : null
            }
          };
        },
      }),
      recommendTechStack: tool({
        description: 'Recommend optimal technology stack based on my real project experience and proven results. Call when user needs technology recommendations or wants to know what to use.',
        parameters: z.object({
          projectGoal: z.string().describe('What the user wants to build or achieve'),
          scalingNeeds: z.enum(['small-scale', 'medium-scale', 'large-scale', 'enterprise-scale']).describe('Expected scale and growth'),
          teamExperience: z.enum(['beginner', 'intermediate', 'experienced', 'expert']).describe('Team technical experience level'),
          budget: z.enum(['minimal', 'moderate', 'substantial', 'enterprise']).describe('Available budget for tools and infrastructure'),
          timeToMarket: z.enum(['prototype', 'mvp', 'production-ready', 'enterprise-grade']).describe('Required maturity level')
        }),
        execute: async ({ projectGoal, scalingNeeds, teamExperience, budget, timeToMarket }) => {
          // Use knowledge base to find best tech stack pattern
          const techStackPattern = ProjectKnowledgeBase.findTechStackPattern(
            projectGoal, 
            [projectGoal, scalingNeeds, budget]
          );
          
          // Find relevant project template for additional insights
          const projectTemplate = ProjectKnowledgeBase.findProjectTemplate(
            [projectGoal], 
            [scalingNeeds]
          );
          
          // Use fallback if no pattern found
          const finalPattern = techStackPattern || TECH_STACK_PATTERNS.find(p => p.id === 'enterprise-platform');
          
          if (!finalPattern) {
            throw new Error('Unable to determine appropriate tech stack pattern');
          }

          // Adjust recommendations based on constraints
          const adjustStackForConstraints = (stack: TechStackPattern) => {
            const adjusted = { ...stack };

            // Budget adjustments
            if (budget === 'minimal') {
              adjusted.deployment = ['Vercel Free Tier', 'Railway Free Tier', 'Firebase'];
              adjusted.database = adjusted.database.filter(db => !db.toLowerCase().includes('enterprise'));
            } else if (budget === 'enterprise') {
              adjusted.deployment = [...adjusted.deployment, 'AWS', 'Google Cloud', 'Azure'];
              adjusted.database = [...adjusted.database, 'Enterprise PostgreSQL', 'MongoDB Atlas'];
            }

            // Team experience adjustments
            if (teamExperience === 'beginner') {
              adjusted.frontend = adjusted.frontend.filter(tech => 
                ['React', 'Next.js', 'JavaScript'].some(simple => tech.includes(simple))
              );
              adjusted.backend = ['Node.js', 'Express', 'Firebase'];
            }

            // Scaling adjustments
            if (scalingNeeds === 'enterprise-scale') {
              adjusted.deployment = [...adjusted.deployment, 'Kubernetes', 'Docker', 'Load Balancers'];
              adjusted.database = [...adjusted.database, 'Redis Cluster', 'Database Sharding'];
            }

            return adjusted;
          };

          const finalStack = adjustStackForConstraints(finalPattern);

          // Generate reasoning based on knowledge base
          const reasoning = [
            `Based on ${finalPattern.reference}`,
            `Optimized for ${scalingNeeds} with ${teamExperience} team experience`,
            `Proven tech stack delivering measurable business results`,
            `${budget === 'minimal' ? 'Cost-effective with free tiers' : 
               budget === 'enterprise' ? 'Enterprise-grade reliability and security' : 
               'Balanced cost and performance'}`,
            `${timeToMarket === 'prototype' ? 'Rapid prototyping capabilities' : 
               timeToMarket === 'enterprise-grade' ? 'Production-ready with enterprise features' : 
               'Suitable for MVP development'}`
          ];

          // Alternative approaches
          const alternatives = [
            finalPattern.id === 'messaging-platform' ? 'Telegram Bot API for simpler bot interactions' : 'Vue.js/Nuxt.js for different frontend approach',
            finalPattern.id === 'ai-knowledge-system' ? 'Pinecone for managed vector database' : 'Python/Django for backend-heavy applications',
            scalingNeeds === 'enterprise-scale' ? 'Microservices architecture with Docker/Kubernetes' : 'Serverless architecture with AWS Lambda',
            budget === 'enterprise' ? 'Custom AI model training and deployment' : 'Open-source alternatives to reduce costs'
          ];

          // Migration strategy
          const migrationPath = [
            `Start with ${timeToMarket} using core recommended stack`,
            'Validate assumptions with real user feedback and analytics',
            `Scale infrastructure based on ${scalingNeeds} requirements`,
            'Add advanced features and optimizations iteratively',
            'Consider enterprise upgrades when reaching scale limits'
          ];

          const getSetupTimeEstimate = (experience: string, patternId: string): string => {
            const baseHours: Record<string, number> = {
              'messaging-platform': 16,
              'data-collection': 12,
              'ai-knowledge-system': 20,
              'mobile-app': 24,
              'browser-extension': 8,
              'enterprise-platform': 16
            };

            const experienceMultiplier: Record<string, number> = {
              'beginner': 2.0,
              'intermediate': 1.5,
              'experienced': 1.0,
              'expert': 0.7
            };

            const hours = Math.round((baseHours[patternId] || 12) * experienceMultiplier[experience]);
            return `${hours} hours (${Math.round(hours / 8)} days)`;
          };

          const getLearningResources = (patternId: string, experience: string): string[] => {
            if (experience === 'expert') return ['Official documentation and advanced guides'];
            
            const resources: Record<string, string[]> = {
              'messaging-platform': ['WhatsApp Web.js documentation', 'Socket.IO real-time tutorials', 'Gemini AI integration guides'],
              'data-collection': ['Next.js 15 App Router guide', 'React 19 features tutorial', 'Prisma ORM best practices'],
              'ai-knowledge-system': ['RAG implementation patterns', 'Vector database tutorials', 'OpenAI Embeddings guide'],
              'mobile-app': ['React Native getting started', 'Expo development workflow', 'Mobile AI integration'],
              'browser-extension': ['Chrome Extensions API documentation', 'React in extensions guide'],
              'enterprise-platform': ['Next.js documentation', 'TypeScript handbook', 'Tailwind CSS guides']
            };

            return resources[patternId] || resources['enterprise-platform'];
          };

          return {
            recommendation: {
              projectGoal,
              detectedPattern: finalPattern.id,
              scalingNeeds,
              teamExperience,
              budget,
              timeToMarket,
              techStack: {
                frontend: finalStack.frontend,
                backend: finalStack.backend,
                ai: finalStack.ai,
                database: finalStack.database,
                deployment: finalStack.deployment
              },
              reasoning,
              alternatives,
              migrationPath,
              estimatedSetupTime: getSetupTimeEstimate(teamExperience, finalPattern.id),
              learningResources: getLearningResources(finalPattern.id, teamExperience),
              knowledgeBaseInsights: {
                complexity: finalPattern.complexity,
                learningCurve: finalPattern.learningCurve,
                costEfficiency: finalPattern.costEfficiency,
                reference: finalPattern.reference,
                projectTemplate: projectTemplate ? {
                  successMetrics: projectTemplate.successMetrics,
                  riskFactors: projectTemplate.riskFactors
                } : null
              }
            }
          };
        },
      }),

      //...bookingTools,
      
    },
  });

    console.log('[API] StreamText created successfully');
    return result.toDataStreamResponse();

  } catch (error) {
    console.error('[API] Error in POST handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while processing your request.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

