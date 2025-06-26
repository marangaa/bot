import React from 'react';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick?: (question: string) => void;
}

export function SuggestedQuestions({ questions, onQuestionClick }: SuggestedQuestionsProps) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
      <h4 className="text-sm font-medium mb-2">You might also ask:</h4>
      <div className="space-y-1">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick?.(question)}
            className="block text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            • {question}
          </button>
        ))}
      </div>
    </div>
  );
}
