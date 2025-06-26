import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Loader2, CheckCircle, Wrench } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Message } from '@ai-sdk/react';
import { ProjectCard } from '@/components/portfolio/project-card';
import { SkillCard } from '@/components/portfolio/skill-card';
import { ExperienceCard } from '@/components/portfolio/experience-card';

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
  const renderToolResult = (toolInvocation: any) => {
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
                {result.projects.map((project: any) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
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
                {result.skills.map((skill: any) => (
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
                {result.experiences.map((experience: any) => (
                  <ExperienceCard key={experience.id} experience={experience} />
                ))}
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
