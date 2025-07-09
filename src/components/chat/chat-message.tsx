import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Loader2, CheckCircle, Wrench, Calendar, DollarSign, Target, Lightbulb, Users, CalendarDays, Clock } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Message } from '@ai-sdk/react';
import { ProjectCard } from '@/components/portfolio/project-card';
import { DetailedProjectCard } from '@/components/portfolio/detailed-project-card';
import { SkillCard } from '@/components/portfolio/skill-card';
import { ExperienceCard } from '@/components/portfolio/experience-card';
import { Project, Skill, Experience } from '@/types/portfolio';
import { AvailabilityDisplay, BookingConfirmation } from './calendar-booking';

interface BusinessAnalysis {
  businessDescription: string;
  industry: string;
  challenges: string[];
  budget: string;
  timeline: string;
  recommendedSolutions: Array<{
    challenge: string;
    solution: string;
    technologies: string[];
    complexity: string;
    timeline: string;
  }>;
  estimatedCost: string;
  keyRecommendations: string[];
}

interface ImplementationPlan {
  projectType: string;
  features: string[];
  techStack: string[];
  team: string;
  phases: Array<{
    phase: string;
    duration: string;
    tasks: string[];
  }>;
  totalTimeline: string;
  riskFactors: string[];
  successMetrics: string[];
}

interface Consultation {
  name: string;
  email: string;
  projectType: string;
  urgency: string;
  preferredTime: string;
  status: string;
  calendarLink: string;
  confirmationMessage: string;
  nextSteps: string[];
}

interface ProjectEstimation {
  projectType: string;
  complexity: string;
  features: string[];
  timeline: string;
  baseCost: number;
  featureCost: number;
  totalCost: number;
  maintenanceCost: number;
  breakdown: Record<string, number>;
  paymentOptions: string[];
  included: string[];
}

interface TechStackRecommendation {
  projectType: string;
  requirements: string[];
  team: string;
  budget: string;
  performance: string;
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    deployment: string[];
    ai: string[];
  };
  reasoning: string[];
  alternatives: string[];
  migrationPath: string[];
}

interface ConsultationSlot {
  start: string;
  end: string;
  available: boolean;
}

interface CalendarConsultation {
  id: string;
  summary: string;
  start: string;
  end: string;
  attendees: string[];
  meetingLink?: string;
}

interface ToolResult {
  projects?: Project[];
  project?: Project;
  query?: string;
  skills?: Skill[];
  experiences?: Experience[];
  analysis?: BusinessAnalysis;
  implementationPlan?: ImplementationPlan;
  consultation?: Consultation;
  estimation?: ProjectEstimation;
  recommendation?: TechStackRecommendation;
  // Calendar-specific results
  date?: string;
  availability?: ConsultationSlot[];
  workingHours?: string;
  timezone?: string;
  consultations?: CalendarConsultation[];
  success?: boolean;
  message?: string;
  eventId?: string;
  meetingLink?: string;
  error?: string;
}

interface ToolInvocation {
  toolName: string;
  result: ToolResult;
}

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
  isStreaming?: boolean;
}

export function ChatMessage({ 
  message, 
  isLast, 
  isStreaming
}: ChatMessageProps) {
  const isUser = message.role === 'user';

  // Render tool results based on the tool name and result
  const renderToolResult = (toolInvocation: ToolInvocation) => {
    const { toolName, result } = toolInvocation;

    if (!result || typeof result !== 'object') return null;

    switch (toolName) {
      case 'showProjects':
        if (result.projects && result.projects.length > 0) {
          return (
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                My Projects
              </h3>
              <div className="space-y-4">
                {result.projects.map((project: Project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          );
        }
        break;
        
      case 'showSpecificProject':
        if (result.project) {
          return (
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                Project Details
              </h3>
              <DetailedProjectCard project={result.project} />
            </div>
          );
        } else {
          return (
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
              <p className="text-amber-800 dark:text-amber-200">
                I couldn&apos;t find a specific project matching &quot;{result.query}&quot;. Let me show you all my projects instead.
              </p>
            </div>
          );
        }
        break;
        
      case 'showSkills':
        if (result.skills && result.skills.length > 0) {
          return (
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                My Skills & Technologies
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {result.skills.map((skill: Skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          );
        }
        break;
        
      case 'showExperience':
        if (result.experiences && result.experiences.length > 0) {
          return (
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                My Work Experience
              </h3>
              <div className="space-y-4">
                {result.experiences.map((experience: Experience) => (
                  <ExperienceCard key={experience.id} experience={experience} />
                ))}
              </div>
            </div>
          );
        }
        break;

      case 'analyzeBusinessRequirement':
        if (result.analysis) {
          const analysis = result.analysis;
          return (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-6 border border-blue-200/60 dark:border-blue-800/60">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Business Analysis</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Industry & Overview</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{analysis.industry} - {analysis.businessDescription}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Key Challenges</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {analysis.challenges.map((challenge, idx) => (
                      <li key={idx}>{challenge}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Recommended Solutions</h4>
                  <div className="space-y-3">
                    {analysis.recommendedSolutions.map((solution, idx) => (
                      <div key={idx} className="bg-white dark:bg-gray-800 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900 dark:text-gray-100">{solution.challenge}</h5>
                          <Badge variant="outline">{solution.complexity}</Badge>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{solution.solution}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {solution.technologies.map((tech, techIdx) => (
                            <Badge key={techIdx} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Timeline: {solution.timeline}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Estimated Investment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{analysis.budget} budget, {analysis.timeline} timeline</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">{analysis.estimatedCost}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Key Recommendations</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {analysis.keyRecommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        }
        break;

      case 'generateImplementationPlan':
        if (result.implementationPlan) {
          const plan = result.implementationPlan;
          return (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg p-6 border border-green-200/60 dark:border-green-800/60">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Implementation Plan</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Project Type</h4>
                    <Badge variant="outline">{plan.projectType}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Team Size</h4>
                    <Badge variant="outline">{plan.team}</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {plan.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary">{feature}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Technology Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    {plan.techStack.map((tech, idx) => (
                      <Badge key={idx} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Development Phases</h4>
                  <div className="space-y-3">
                    {plan.phases.map((phase, idx) => (
                      <div key={idx} className="bg-white dark:bg-gray-800 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium text-gray-900 dark:text-gray-100">{phase.phase}</h5>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          {phase.tasks.map((task, taskIdx) => (
                            <li key={taskIdx}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Total Timeline: {plan.totalTimeline}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Risk Factors</h5>
                      <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        {plan.riskFactors.map((risk, idx) => (
                          <li key={idx}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Success Metrics</h5>
                      <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        {plan.successMetrics.map((metric, idx) => (
                          <li key={idx}>{metric}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        break;

      case 'scheduleConsultation':
        if (result.consultation) {
          const consultation = result.consultation;
          return (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg p-6 border border-purple-200/60 dark:border-purple-800/60">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Consultation Scheduled</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Consultation Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Contact:</strong> {consultation.name} ({consultation.email})</div>
                    <div><strong>Project Type:</strong> {consultation.projectType}</div>
                    <div><strong>Urgency:</strong> {consultation.urgency}</div>
                    <div><strong>Preferred Time:</strong> {consultation.preferredTime}</div>
                    <div><strong>Status:</strong> <Badge variant="outline">{consultation.status}</Badge></div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/30 rounded-md p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-200 mb-3">{consultation.confirmationMessage}</p>
                  <a 
                    href={consultation.calendarLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Now
                  </a>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Next Steps</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {consultation.nextSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        }
        break;

      case 'estimateProjectCost':
        if (result.estimation) {
          const estimation = result.estimation;
          return (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-lg p-6 border border-orange-200/60 dark:border-orange-800/60">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Project Cost Estimation</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Project Type</h4>
                    <Badge variant="outline">{estimation.projectType}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Complexity</h4>
                    <Badge variant="outline">{estimation.complexity}</Badge>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Cost Breakdown</h4>
                  <div className="space-y-2">
                    {Object.entries(estimation.breakdown).map(([category, cost]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                        <span className="font-medium">${cost.toLocaleString()}</span>
                      </div>
                    ))}
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 dark:text-gray-100">Total Cost</span>
                      <span className="text-xl font-bold text-orange-600 dark:text-orange-400">${estimation.totalCost.toLocaleString()}</span>
                    </div>
                    {estimation.maintenanceCost > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Annual Maintenance</span>
                        <span className="font-medium">${estimation.maintenanceCost.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Payment Options</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {estimation.paymentOptions.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">What&apos;s Included</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {estimation.included.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        }
        break;

      case 'checkAvailability':
        if (result.availability && result.date) {
          return (
            <div className="mt-4">
              <AvailabilityDisplay
                date={result.date}
                availability={result.availability}
                workingHours={result.workingHours || '9:00 AM - 5:00 PM'}
                timezone={result.timezone || 'Africa/Nairobi'}
              />
            </div>
          );
        }
        if (result.error) {
          return (
            <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 border border-red-200 dark:border-red-800">
              <p className="text-red-800 dark:text-red-200">{result.error}</p>
            </div>
          );
        }
        break;

      case 'bookConsultation':
        if (result.success !== undefined) {
          return (
            <div className="mt-4">
              <BookingConfirmation
                booking={{
                  success: result.success,
                  message: result.message || '',
                  eventId: result.eventId,
                  meetingLink: result.meetingLink
                }}
                onClose={() => {}}
              />
            </div>
          );
        }
        break;

      case 'getUpcomingConsultations':
        if (result.consultations) {
          return (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg p-6 border border-indigo-200/60 dark:border-indigo-800/60">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">Upcoming Consultations</h3>
              </div>
              
              {result.consultations.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                  No upcoming consultations scheduled.
                </p>
              ) : (
                <div className="space-y-3">
                  {result.consultations.map((consultation) => (
                    <div key={consultation.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                            {consultation.summary}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(consultation.start).toLocaleString()}
                            </div>
                            {consultation.attendees.length > 0 && (
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {consultation.attendees.join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                        {consultation.meetingLink && (
                          <a
                            href={consultation.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Join Meeting
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }
        if (result.error) {
          return (
            <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 border border-red-200 dark:border-red-800">
              <p className="text-red-800 dark:text-red-200">{result.error}</p>
            </div>
          );
        }
        break;

      case 'recommendTechStack':
        if (result.recommendation) {
          const recommendation = result.recommendation;
          return (
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-lg p-6 border border-cyan-200/60 dark:border-cyan-800/60">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-lg font-semibold text-cyan-900 dark:text-cyan-100">Technology Stack Recommendation</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Project Type</h4>
                    <Badge variant="outline">{recommendation.projectType}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Team Size</h4>
                    <Badge variant="outline">{recommendation.team}</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Recommended Stack</h4>
                  <div className="space-y-3">
                    {Object.entries(recommendation.techStack).map(([category, technologies]) => (
                      <div key={category} className="bg-white dark:bg-gray-800 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2 capitalize">{category}</h5>
                        <div className="flex flex-wrap gap-1">
                          {technologies.map((tech, idx) => (
                            <Badge key={idx} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Why This Stack?</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {recommendation.reasoning.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Alternatives</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {recommendation.alternatives.map((alt, idx) => (
                        <li key={idx}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Migration Path</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {recommendation.migrationPath.map((path, idx) => (
                        <li key={idx}>{path}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        break;
        
      default:
        return (
          <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <Badge variant="outline">{toolName}</Badge>
            </div>
            <pre className="text-xs text-muted-foreground overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        );
    }
    
    return null;
  };

  // Render different part types from the AI SDK
  const renderMessageParts = () => {
    if (!message.parts || message.parts.length === 0) {
      // Fallback to content if no parts
      return <p className="leading-7 text-current">{message.content}</p>;
    }

    return message.parts.map((part, index) => {
      switch (part.type) {
        case 'text':
          return (
            <p key={index} className="leading-7 [&:not(:first-child)]:mt-3 text-current">
              {part.text}
            </p>
          );

        case 'tool-invocation':
          const { toolInvocation } = part;
          switch (toolInvocation.state) {
            case 'partial-call':
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 bg-blue-50/80 dark:bg-blue-950/30 rounded-xl border border-blue-200/60 dark:border-blue-800/60 mt-3"
                >
                  <Wrench className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Preparing {toolInvocation.toolName}...
                  </span>
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400 ml-auto" />
                </motion.div>
              );
              
            case 'call':
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 bg-blue-50/80 dark:bg-blue-950/30 rounded-xl border border-blue-200/60 dark:border-blue-800/60 mt-3"
                >
                  <Wrench className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Using {toolInvocation.toolName}...
                  </span>
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400 ml-auto" />
                </motion.div>
              );
              
            case 'result':
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  {renderToolResult(toolInvocation)}
                </motion.div>
              );
              
            default:
              return null;
          }

        case 'step-start':
          return index > 0 ? (
            <div key={index} className="text-gray-500 my-2">
              <hr className="border-gray-300" />
            </div>
          ) : null;

        default:
          return null;
      }
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'flex w-full mb-4 items-start',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="mr-3 flex-shrink-0">
          <Bot className="h-5 w-5 text-primary" />
        </Avatar>
      )}

      <div
        className={cn(
          'flex flex-col space-y-3 rounded-2xl px-5 py-4 shadow-sm',
          isUser 
            ? 'bg-primary text-primary-foreground max-w-[85%] sm:max-w-[75%] rounded-br-md' 
            : 'bg-card border border-border max-w-[85%] sm:max-w-[75%] rounded-bl-md',
          isLast && 'mb-6'
        )}
      >
        <div className={cn(
          "text-sm leading-relaxed tracking-wide font-medium",
          isUser ? "text-primary-foreground" : "text-foreground"
        )}>
          {renderMessageParts()}
          {isStreaming && isLast && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-0.5 h-5 bg-current ml-1 align-text-bottom"
            />
          )}
        </div>
      </div>

      {isUser && (
        <Avatar className="ml-3 flex-shrink-0">
          <User className="h-5 w-5" />
        </Avatar>
      )}
    </motion.div>
  );
}
