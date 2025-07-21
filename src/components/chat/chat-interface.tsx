'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Command } from 'lucide-react';
import { useChat, Message } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { CommandPalette } from './command-palette';
import { SuggestedQuestions } from './suggested-questions';

interface ChatInterfaceProps {
  id?: string;
  initialMessages?: Message[];
}

export function ChatInterface({ id, initialMessages = [] }: ChatInterfaceProps) {
    const [commandOpen, setCommandOpen] = useState(false);
    
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        status,
        error,
    } = useChat({
        api: '/api/chat',
        id, // Pass the chat ID for persistence
        initialMessages, // Load initial messages
        maxSteps: 10, // Allow multi-step tool usage
        sendExtraMessageFields: true, // Send id and createdAt for each message
    });

    const handleSuggestedQuestion = (question: string) => {
        // Set the input value and trigger submit
        handleInputChange({ target: { value: question } } as React.ChangeEvent<HTMLInputElement>);
        
        // Use setTimeout to ensure the state update happens first
        setTimeout(() => {
            const form = document.querySelector('form');
            if (form) {
                form.requestSubmit();
            }
        }, 0);
    };

    // Handle keyboard shortcuts
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen(true);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <>
            <div className="flex flex-col h-screen w-full mx-auto bg-background/60 backdrop-blur-md sm:max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 sm:p-4 border-b"
                >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-primary/10">
                            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </Avatar>
                        <div>
                            <h2 className="text-base sm:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                                Portfolio Assistant
                            </h2>
                            <p className="text-[10px] sm:text-xs text-muted-foreground">AI Engineer | Always Online</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl hover:bg-primary/5"
                        onClick={() => setCommandOpen(true)}
                    >
                        <Command className="h-4 w-4" />
                    </Button>
                </motion.div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-2 sm:p-4 w-full">
                    <div className="w-full flex flex-col">
                        {messages.length === 0 ? (
                            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                                <SuggestedQuestions onQuestionSelect={handleSuggestedQuestion} />
                            </div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {messages.map((message, index) => (
                                    <ChatMessage
                                        key={message.id}
                                        message={message}
                                        isLast={index === messages.length - 1}
                                        isStreaming={status === 'streaming' && index === messages.length - 1}
                                    />
                                ))}
                            </AnimatePresence>
                        )}
                        
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-sm p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
                            >
                                Error: {error.message}
                            </motion.div>
                        )}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t bg-background/60 backdrop-blur-md p-2 sm:p-4">
                    <ChatInput
                        onSubmit={handleSubmit}
                        className="w-full mx-auto"
                        disabled={status !== 'ready'}
                        value={input}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
            </div>

            {/* Command Palette */}
            <CommandPalette
                open={commandOpen}
                onClose={() => setCommandOpen(false)}
            />
        </>
    );
}