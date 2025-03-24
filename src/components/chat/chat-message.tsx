import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bot, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '../portfolio/project-card';
import SkillsGrid  from '../portfolio/skills-grid';
import { ExperienceCard } from '../portfolio/experience-card';
import { SuggestedQuestions } from './suggested-questions';
import { TechnicalDetails } from '../portfolio/technical-details';
import type { ChatMessage as ChatMessageType } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
  isLast?: boolean;
  isStreaming?: boolean;
  onSuggestedQuestionClick?: (question: string) => void;
}

export function ChatMessage({ 
  message, 
  isLast, 
  isStreaming,
  onSuggestedQuestionClick 
}: ChatMessageProps) {
  const [expanded, setExpanded] = useState(false);
  const [showCursor, setShowCursor] = useState(isStreaming);
  const isUser = message.role === 'user';

  useEffect(() => {
    setShowCursor(isStreaming);
  }, [isStreaming]);

  // Render different content based on message type
  const renderContent = () => {
    switch (message.type) {
      case 'project':
        return message.metadata?.projectIds?.map((projectId: string) => (
          <motion.div
            key={projectId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <ProjectCard 
              projectId={projectId} 
              showTechnicalDetails={expanded}
            />
            {expanded && (
              <TechnicalDetails projectId={projectId} />
            )}
          </motion.div>
        ));

      case 'skill':
        return message.metadata?.skillIds?.map((skillId: string) => {
          const skill = message.metadata?.skills?.[skillId];
          return skill ? (
            <motion.div
              key={skillId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <SkillsGrid skills={[skill]} />
            </motion.div>
          ) : null;
        });

      case 'experience':
        return message.metadata?.experienceIds?.map((experienceId: string) => (
          <motion.div
            key={experienceId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <ExperienceCard 
              experience={message.metadata?.experiences?.[experienceId]}
            />
          </motion.div>
        ));

      case 'multi':
        return (
          <div className="space-y-4 mt-4">
            {message.metadata?.projectIds && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-sm font-medium mb-2">Related Projects</h3>
                {message.metadata.projectIds.map((id: string) => (
                  <ProjectCard 
                    key={id} 
                    projectId={id} 
                    showTechnicalDetails={expanded}
                  />
                ))}
              </motion.div>
            )}
            {message.metadata?.skillIds && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-sm font-medium mb-2">Related Skills</h3>
                <SkillsGrid skillIds={message.metadata.skillIds} />
              </motion.div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'flex w-full mb-4 items-end',
        message.role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="mr-2 flex-shrink-0">
          <Bot className="h-5 w-5 text-primary" />
        </Avatar>
      )}

      <div
        className={cn(
          'flex flex-col space-y-2 rounded-lg px-4 py-3',
          isUser 
            ? 'bg-primary text-primary-foreground w-fit max-w-[85%] sm:max-w-[75%]' 
            : 'bg-muted w-fit max-w-[85%] sm:max-w-[75%]',
          isLast && 'mb-4'
        )}
      >
        <div className="prose prose-sm dark:prose-invert break-words whitespace-normal w-full">
          <p className="m-0 text-pretty overflow-visible">{message.content}</p>
          {showCursor && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-0.5 h-4 bg-primary ml-1 align-middle"
            />
          )}
          {isStreaming && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center ml-2"
            >
              <Loader2 className="h-3 w-3 animate-spin text-muted-foreground/50" />
            </motion.span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {message.type && !isStreaming && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-2"
            >
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>

        {message.metadata?.suggestedQuestions && !isUser && !isStreaming && (
          <SuggestedQuestions
            questions={message.metadata.suggestedQuestions}
            onQuestionClick={onSuggestedQuestionClick}
          />
        )}

        {(message.type === 'project' || message.type === 'experience') && (
          <Button
            variant="ghost"
            size="sm"
            className="self-end mt-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                Less Details <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                More Details <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}

        <motion.div 
          className="flex items-center justify-end gap-2 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {message.metadata?.confidence && (
            <span className="text-xs text-muted-foreground/50">
              Confidence: {Math.round(message.metadata.confidence * 100)}%
            </span>
          )}
          <span className="text-xs text-muted-foreground/50">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </motion.div>
      </div>

      {isUser && (
        <Avatar className="ml-2 flex-shrink-0">
          <User className="h-5 w-5 text-primary" />
        </Avatar>
      )}
    </motion.div>
  );
}