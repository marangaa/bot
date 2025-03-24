import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { CommandPalette } from './command-palette';
import { useChat } from '@/components/providers/chat-provider';
import { useChatScroll } from '@/hooks/use-chat-scroll';

export function ChatInterface() {
    const { state, sendMessage } = useChat();
    const [commandOpen, setCommandOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useChatScroll({
        messages: state.messages,
    });

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

    const handleSendMessage = async (content: string) => {
        await sendMessage(content);
    };

    const handleSuggestedQuestionClick = (question: string) => {
        setInputValue(question);
    };

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
                        <AnimatePresence mode="popLayout">
                            {state.messages.map((message, index) => (
                                <ChatMessage
                                    key={message.id}
                                    message={message}
                                    isLast={index === state.messages.length - 1}
                                    onSuggestedQuestionClick={handleSuggestedQuestionClick}
                                />
                            ))}

                            {/* Streaming content */}
                            {state.streamingContent && (
                                <ChatMessage
                                    message={{
                                        id: 'streaming',
                                        role: 'assistant',
                                        content: state.streamingContent,
                                        timestamp: new Date(),
                                    }}
                                    isLast={true}
                                    isStreaming={true}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                    <div ref={scrollRef} />
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t bg-background/60 backdrop-blur-md p-2 sm:p-4">
                    <ChatInput
                        onSubmit={handleSendMessage}
                        className="w-full mx-auto"
                        disabled={state.isLoading}
                        value={inputValue}
                        onChange={setInputValue}
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