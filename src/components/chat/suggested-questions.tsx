import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick?: (question: string) => void;
}

export function SuggestedQuestions({ questions, onQuestionClick }: SuggestedQuestionsProps) {
  if (!questions?.length) return null;

  const handleClick = (question: string) => {
    onQuestionClick?.(question);
    // Find and focus the chat input
    const chatInput = document.querySelector('textarea');
    if (chatInput) {
      chatInput.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 space-y-2"
    >
      <p className="text-xs text-muted-foreground font-medium">
        Suggested Follow-up Questions:
      </p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <motion.div
            key={question}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="secondary"
              size="sm"
              className="text-xs bg-primary/5 hover:bg-primary/10"
              onClick={() => handleClick(question)}
            >
              <MessageSquarePlus className="mr-1 h-3 w-3" />
              {question}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}