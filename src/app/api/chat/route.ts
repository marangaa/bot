import { streamText, tool, appendResponseMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { getPortfolioContext } from '@/lib/gemini/portfolio-context';
import { projects, skills, experiences } from '@/lib/portfolio/data';
import { saveChat } from '@/lib/chat-store';
import { calendarService } from '@/lib/calendar/service';
import { 
  checkAvailabilitySchema, 
  bookConsultationSchema, 
  getUpcomingConsultationsSchema 
} from '@/lib/calendar/schemas';

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
      analyzeBusinessRequirement: tool({
        description: 'Analyze business requirements and suggest technical solutions. Call when user describes a business problem, needs analysis, or wants technical recommendations.',
        parameters: z.object({
          businessDescription: z.string().describe('Description of the business or problem'),
          industry: z.string().describe('Industry or sector'),
          challenges: z.array(z.string()).describe('Main challenges or pain points'),
          budget: z.enum(['startup', 'small', 'medium', 'enterprise']).describe('Budget range'),
          timeline: z.enum(['rush', 'normal', 'flexible']).describe('Timeline requirements')
        }),
        execute: async ({ businessDescription, industry, challenges, budget, timeline }) => {
          // AI-powered business analysis
          const solutions = challenges.map(challenge => ({
            challenge,
            solution: `AI-powered solution for ${challenge}`,
            technologies: ['Next.js', 'AI SDK', 'TypeScript'],
            complexity: 'Medium',
            timeline: '4-6 weeks'
          }));

          return {
            analysis: {
              businessDescription,
              industry,
              challenges,
              budget,
              timeline,
              recommendedSolutions: solutions,
              estimatedCost: budget === 'startup' ? '$5,000-$15,000' :
                             budget === 'small' ? '$15,000-$50,000' :
                             budget === 'medium' ? '$50,000-$150,000' : '$150,000+',
              keyRecommendations: [
                'Start with MVP to validate core assumptions',
                'Implement AI-powered automation for efficiency',
                'Focus on user experience and conversion optimization',
                'Plan for scalability from day one'
              ]
            }
          };
        },
      }),
      generateImplementationPlan: tool({
        description: 'Generate detailed technical implementation plan. Call when user wants to know how to build something or needs a development roadmap.',
        parameters: z.object({
          projectType: z.enum(['web-app', 'mobile-app', 'ai-chatbot', 'ecommerce', 'saas-platform', 'automation-tool']).describe('Type of project'),
          features: z.array(z.string()).describe('Required features'),
          techStack: z.array(z.string()).describe('Preferred technologies'),
          team: z.enum(['solo', 'small', 'medium', 'large']).describe('Team size')
        }),
        execute: async ({ projectType, features, techStack, team }) => {
          const phases = [
            {
              phase: 'Planning & Design',
              duration: '1-2 weeks',
              tasks: ['Requirements gathering', 'Technical architecture', 'UI/UX design', 'Database schema']
            },
            {
              phase: 'Development Setup',
              duration: '3-5 days',
              tasks: ['Development environment', 'CI/CD pipeline', 'Database setup', 'Authentication system']
            },
            {
              phase: 'Core Development',
              duration: '4-8 weeks',
              tasks: features.map(feature => `Implement ${feature}`)
            },
            {
              phase: 'Testing & Deployment',
              duration: '1-2 weeks',
              tasks: ['Unit testing', 'Integration testing', 'Performance optimization', 'Production deployment']
            }
          ];

          return {
            implementationPlan: {
              projectType,
              features,
              techStack,
              team,
              phases,
              totalTimeline: team === 'solo' ? '12-16 weeks' : 
                      team === 'small' ? '8-12 weeks' :
                      team === 'medium' ? '6-10 weeks' : '4-8 weeks',
              riskFactors: [
                'Third-party API dependencies',
                'Complex AI integration requirements',
                'Scalability considerations',
                'Security compliance needs'
              ],
              successMetrics: [
                'User engagement rates',
                'Performance benchmarks',
                'Error rates and uptime',
                'Business KPI achievement'
              ]
            }
          };
        },
      }),
      /*
      checkAvailability: tool({
        description: 'Check available consultation time slots for a specific date. Call when user wants to see what times are available for booking.',
        parameters: checkAvailabilitySchema,
        execute: async ({ date }) => {
          try {
            console.log('[TOOL] checkAvailability called with date:', date);
            const slots = await calendarService.checkAvailability(date);
            console.log('[TOOL] checkAvailability completed successfully');
            return {
              date,
              availability: slots,
              workingHours: '9:00 AM - 5:00 PM (Kenya Time)',
              timezone: 'Africa/Nairobi'
            };
          } catch (error) {
            console.error('[TOOL] checkAvailability failed:', error);
            return {
              error: 'Calendar service is temporarily unavailable. Please try again later or contact me directly.',
              date,
              directContact: 'https://cal.com/rchdmaranga'
            };
          }
        },
      }),
      bookConsultation: tool({
        description: 'Book a consultation appointment with real calendar integration. Call when user wants to actually schedule a meeting.',
        parameters: bookConsultationSchema,
        execute: async ({ clientName, clientEmail, date, time, duration, description, type }) => {
          try {
            console.log('[TOOL] bookConsultation called for:', clientName, date, time);
            const result = await calendarService.bookConsultation({
              clientName,
              clientEmail,
              date,
              time,
              duration,
              description,
              type
            });
            console.log('[TOOL] bookConsultation completed:', result.success ? 'SUCCESS' : 'FAILED');
            return result;
          } catch (error) {
            console.error('[TOOL] bookConsultation failed:', error);
            return {
              success: false,
              message: 'Calendar service is temporarily unavailable. Please contact me directly to schedule.',
              directContact: 'https://cal.com/rchdmaranga'
            };
          }
        },
      }),
      getUpcomingConsultations: tool({
        description: 'Get list of upcoming scheduled consultations. Call when user asks about scheduled meetings or wants to see the calendar.',
        parameters: getUpcomingConsultationsSchema,
        execute: async ({ limit = 5 }) => {
          try {
            console.log('[TOOL] getUpcomingConsultations called with limit:', limit);
            const consultations = await calendarService.getUpcomingConsultations(limit);
            console.log('[TOOL] getUpcomingConsultations completed, found:', consultations.length, 'consultations');
            return {
              consultations: consultations.map((event: any) => ({
                id: event.id,
                summary: event.summary,
                start: event.start?.dateTime || event.start?.date,
                end: event.end?.dateTime || event.end?.date,
                attendees: event.attendees?.map((a: any) => a.email) || [],
                meetingLink: event.hangoutLink
              }))
            };
          } catch (error) {
            console.error('[TOOL] getUpcomingConsultations failed:', error);
            return {
              error: 'Calendar service is temporarily unavailable. Please contact me directly.',
              consultations: [],
              directContact: 'https://cal.com/rchdmaranga'
            };
          }
        },
      }),
      suggestAvailableTimes: tool({
        description: 'Suggest available consultation times for the next few days. Call when user wants to schedule but needs to see available options.',
        parameters: z.object({
          daysAhead: z.number().optional().describe('Number of days to look ahead (default: 7)')
        }),
        execute: async ({ daysAhead = 7 }) => {
          try {
            console.log('[TOOL] suggestAvailableTimes called with daysAhead:', daysAhead);
            const suggestions = [];
            const today = new Date();
            
            for (let i = 1; i <= daysAhead; i++) {
              const checkDate = new Date(today);
              checkDate.setDate(today.getDate() + i);
              
              // Skip weekends
              if (checkDate.getDay() === 0 || checkDate.getDay() === 6) continue;
              
              try {
                const slots = await calendarService.checkAvailability(checkDate.toISOString().split('T')[0]);
                const availableSlots = slots.filter(slot => slot.available);
                
                if (availableSlots.length > 0) {
                  suggestions.push({
                    date: checkDate.toISOString().split('T')[0],
                    dayName: checkDate.toLocaleDateString('en-US', { weekday: 'long' }),
                    availableSlots: availableSlots.slice(0, 3).map(slot => ({
                      time: new Date(slot.start).toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      }),
                      slot24h: new Date(slot.start).toTimeString().split(' ')[0].slice(0, 5)
                    }))
                  });
                }
              } catch (error) {
                console.error('[TOOL] suggestAvailableTimes - Error checking date:', checkDate.toISOString().split('T')[0], error);
                // Skip this day if there's an error
                continue;
              }
              
              // Limit to 3 days with availability
              if (suggestions.length >= 3) break;
            }
            
            console.log('[TOOL] suggestAvailableTimes completed, found', suggestions.length, 'days with availability');
            return {
              suggestions,
              message: suggestions.length > 0 
                ? 'Here are some available consultation times:' 
                : 'I\'m quite busy this week. Let me check for more availability or contact me directly.',
              timezone: 'Africa/Nairobi (EAT)'
            };
          } catch (error) {
            console.error('[TOOL] suggestAvailableTimes failed:', error);
            return {
              suggestions: [],
              message: 'Calendar service is temporarily unavailable. Please contact me directly to schedule.',
              directContact: 'https://cal.com/rchdmaranga'
            };
          }
        },
      }),
      scheduleConsultation: tool({
        description: 'Schedule a technical consultation call with real calendar integration. Call when user wants to discuss a project, needs detailed advice, or wants to work together.',
        parameters: z.object({
          name: z.string().describe('Contact name'),
          email: z.string().email().describe('Email address'),
          projectType: z.string().describe('Type of project or consultation needed'),
          urgency: z.enum(['urgent', 'normal', 'flexible']).describe('How urgent is this consultation'),
          preferredTime: z.enum(['morning', 'afternoon', 'evening']).describe('Preferred time of day'),
          date: z.string().optional().describe('Specific date for consultation (YYYY-MM-DD format)'),
          time: z.string().optional().describe('Specific time for consultation (HH:MM format)')
        }),
        execute: async ({ name, email, projectType, urgency, preferredTime, date, time }) => {
          try {
            console.log('[TOOL] scheduleConsultation called for:', name, email, projectType);
            // If specific date and time provided, book directly
            if (date && time) {
              console.log('[TOOL] scheduleConsultation - attempting direct booking for:', date, time);
              const result = await calendarService.bookConsultation({
                clientName: name,
                clientEmail: email,
                date,
                time,
                duration: 60,
                description: `${projectType} consultation - ${urgency} priority`,
                type: 'technical-consultation'
              });
              
              console.log('[TOOL] scheduleConsultation - booking result:', result.success ? 'SUCCESS' : 'FAILED');
              return {
                consultation: {
                  name,
                  email,
                  projectType,
                  urgency,
                  preferredTime,
                  status: result.success ? 'booked' : 'pending',
                  bookingResult: result,
                  confirmationMessage: result.success 
                    ? `Perfect! Your consultation is confirmed for ${date} at ${time}. ${result.message}`
                    : `I'll reach out to schedule your ${projectType} consultation based on your ${preferredTime} preference.`,
                  nextSteps: result.success ? [
                    'Check your email for the calendar invite with Google Meet link',
                    'Prepare specific questions about your project',
                    'Gather any existing documentation or requirements',
                    'Join the meeting using the Google Meet link in your calendar'
                  ] : [
                    'I will contact you within 24 hours to schedule',
                    'Prepare specific questions about your project',
                    'Gather any existing documentation or requirements',
                    'Think about your timeline and budget constraints'
                  ]
                }
              };
            } else {
              // Fallback to manual scheduling
              console.log('[TOOL] scheduleConsultation - using manual scheduling fallback');
              return {
                consultation: {
                  name,
                  email,
                  projectType,
                  urgency,
                  preferredTime,
                  status: 'pending',
                  calendarLink: 'https://cal.com/rchdmaranga',
                  confirmationMessage: `Thank you ${name}! I'll send you a calendar invite to ${email} within 24 hours. We'll discuss your ${projectType} project and how I can help bring your vision to life.`,
                  nextSteps: [
                    'Check your email for calendar invite',
                    'Prepare specific questions about your project',
                    'Gather any existing documentation or requirements',
                    'Think about your timeline and budget constraints'
                  ]
                }
              };
            }
          } catch (error) {
            console.error('[TOOL] scheduleConsultation failed:', error);
            return {
              consultation: {
                name,
                email,
                projectType,
                urgency,
                preferredTime,
                status: 'error',
                confirmationMessage: `Hi ${name}, I encountered an issue with the automated booking. I'll personally reach out to ${email} within 24 hours to schedule your ${projectType} consultation.`,
                nextSteps: [
                  'I will contact you personally within 24 hours',
                  'Prepare specific questions about your project',
                  'Consider your timeline and budget requirements'
                ],
                directContact: 'https://cal.com/rchdmaranga'
              }
            };
          }
        },
      }),
      */
      estimateProjectCost: tool({
        description: 'Provide project cost estimation. Call when user asks about pricing, budget, or wants to know how much something would cost.',
        parameters: z.object({
          projectType: z.enum(['simple-website', 'web-app', 'mobile-app', 'ai-chatbot', 'ecommerce', 'saas-platform', 'automation-tool', 'custom-solution']).describe('Type of project'),
          complexity: z.enum(['basic', 'intermediate', 'advanced', 'enterprise']).describe('Project complexity'),
          features: z.array(z.string()).describe('Required features'),
          timeline: z.enum(['rush', 'normal', 'flexible']).describe('Timeline requirements'),
          maintenance: z.boolean().describe('Whether ongoing maintenance is needed')
        }),
        execute: async ({ projectType, complexity, features, timeline, maintenance }) => {
          const baseCosts = {
            'simple-website': { basic: 3000, intermediate: 6000, advanced: 12000, enterprise: 25000 },
            'web-app': { basic: 8000, intermediate: 18000, advanced: 40000, enterprise: 80000 },
            'mobile-app': { basic: 15000, intermediate: 30000, advanced: 60000, enterprise: 120000 },
            'ai-chatbot': { basic: 5000, intermediate: 12000, advanced: 25000, enterprise: 50000 },
            'ecommerce': { basic: 10000, intermediate: 25000, advanced: 50000, enterprise: 100000 },
            'saas-platform': { basic: 20000, intermediate: 50000, advanced: 100000, enterprise: 200000 },
            'automation-tool': { basic: 6000, intermediate: 15000, advanced: 30000, enterprise: 60000 },
            'custom-solution': { basic: 10000, intermediate: 25000, advanced: 50000, enterprise: 100000 }
          };

          const baseCost = baseCosts[projectType][complexity];
          const featureCost = features.length * 1000; // $1000 per additional feature
          const timelineMultiplier = timeline === 'rush' ? 1.5 : timeline === 'normal' ? 1.0 : 0.9;
          const totalCost = (baseCost + featureCost) * timelineMultiplier;

          return {
            estimation: {
              projectType,
              complexity,
              features,
              timeline,
              baseCost,
              featureCost,
              totalCost: Math.round(totalCost),
              maintenanceCost: maintenance ? Math.round(totalCost * 0.15) : 0,
              breakdown: {
                'Core Development': Math.round(totalCost * 0.6),
                'Design & UX': Math.round(totalCost * 0.2),
                'Testing & QA': Math.round(totalCost * 0.1),
                'Deployment & Setup': Math.round(totalCost * 0.1)
              },
              paymentOptions: [
                '50% upfront, 50% on completion',
                '30% upfront, 30% at milestone, 40% on completion',
                'Monthly installments available for enterprise projects'
              ],
              included: [
                'Source code and full ownership',
                'Technical documentation',
                'Basic training and handover',
                '30-day bug fix guarantee',
                'Performance optimization'
              ]
            }
          };
        },
      }),
      recommendTechStack: tool({
        description: 'Recommend optimal technology stack for a project. Call when user needs technology recommendations or wants to know what to use.',
        parameters: z.object({
          projectType: z.enum(['web-app', 'mobile-app', 'ai-solution', 'ecommerce', 'saas', 'automation']).describe('Type of project'),
          requirements: z.array(z.string()).describe('Specific requirements'),
          team: z.enum(['solo', 'small', 'medium', 'large']).describe('Team size'),
          budget: z.enum(['low', 'medium', 'high', 'enterprise']).describe('Budget constraints'),
          performance: z.enum(['standard', 'high', 'critical']).describe('Performance requirements')
        }),
        execute: async ({ projectType, requirements, team, budget, performance }) => {
          const recommendations = {
            'web-app': {
              frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
              backend: ['Node.js', 'Express', 'Prisma'],
              database: ['PostgreSQL', 'Redis'],
              deployment: ['Vercel', 'Railway', 'AWS'],
              ai: ['OpenAI', 'Google Gemini', 'AI SDK']
            },
            'mobile-app': {
              frontend: ['React Native', 'Expo'],
              backend: ['Node.js', 'Express', 'Supabase'],
              database: ['PostgreSQL', 'SQLite'],
              deployment: ['App Store', 'Google Play'],
              ai: ['OpenAI', 'Google ML Kit']
            },
            'ai-solution': {
              frontend: ['Next.js', 'React', 'TypeScript'],
              backend: ['Python', 'FastAPI', 'Node.js'],
              database: ['Vector DB', 'PostgreSQL', 'Redis'],
              deployment: ['Vercel', 'AWS', 'Google Cloud'],
              ai: ['OpenAI', 'Google Gemini', 'Anthropic Claude']
            },
            'ecommerce': {
              frontend: ['Next.js', 'React', 'TypeScript'],
              backend: ['Node.js', 'Shopify API', 'Stripe'],
              database: ['PostgreSQL', 'Redis'],
              deployment: ['Vercel', 'Shopify', 'AWS'],
              ai: ['OpenAI', 'Recommendation Engine']
            },
            'saas': {
              frontend: ['Next.js', 'React', 'TypeScript'],
              backend: ['Node.js', 'Express', 'Prisma'],
              database: ['PostgreSQL', 'Redis'],
              deployment: ['Vercel', 'AWS', 'Google Cloud'],
              ai: ['OpenAI', 'Analytics', 'Monitoring']
            },
            'automation': {
              frontend: ['React', 'TypeScript', 'Dashboard'],
              backend: ['Node.js', 'Python', 'Webhooks'],
              database: ['PostgreSQL', 'Queue System'],
              deployment: ['AWS', 'Google Cloud', 'Docker'],
              ai: ['OpenAI', 'ML Models', 'Automation']
            }
          };

          return {
            recommendation: {
              projectType,
              requirements,
              team,
              budget,
              performance,
              techStack: recommendations[projectType] || recommendations['web-app'],
              reasoning: [
                'Scalability and performance optimized',
                'Developer experience and maintainability',
                'Cost-effective for your budget range',
                'Strong community support and documentation',
                'Future-proof technology choices'
              ],
              alternatives: [
                'Vue.js/Nuxt.js for different frontend approach',
                'Django/Flask for Python backend preference',
                'MongoDB for document-based data requirements',
                'Docker/Kubernetes for containerization needs'
              ],
              migrationPath: [
                'Start with MVP using recommended stack',
                'Validate core assumptions with users',
                'Scale and optimize based on real usage',
                'Consider advanced features and integrations'
              ]
            }
          };
        },
      }),      
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

