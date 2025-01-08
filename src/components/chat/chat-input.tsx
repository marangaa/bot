import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Command } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '@/components/ui/button';
import { useChat } from '@/components/providers/chat-provider';
import { cn } from '@/lib/utils';

interface ChatInputProps {
    className?: string;
    onSubmit?: (value: string) => void;
    disabled?: boolean;
}

export function ChatInput({ className, onSubmit, disabled }: ChatInputProps) {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { state } = useChat();
    const isLoading = state.isLoading;

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || disabled) return;

        try {
            await onSubmit?.(input);
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
            // You could add toast notification here
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                'relative flex flex-col w-full max-w-4xl mx-auto bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60',
                className
            )}
        >
            <form
                onSubmit={handleSubmit}
                className="relative flex items-center justify-center gap-2 p-4"
            >
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute left-4 hidden md:flex"
                    tabIndex={-1}
                >
                    <Command className="h-4 w-4 text-muted-foreground" />
                </Button>

                <div className="relative flex flex-1 items-center max-w-3xl">
                    <TextareaAutosize
                        ref={inputRef}
                        tabIndex={0}
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Message the AI portfolio assistant... (Press ⌘K to focus)"
                        spellCheck={false}
                        className={cn(
                            "flex w-full rounded-lg border bg-background px-12 py-3 text-sm outline-none placeholder:text-muted-foreground",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            disabled && "cursor-not-allowed opacity-50"
                        )}
                        style={{ resize: 'none' }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        disabled={disabled}
                    />
                    <div className="absolute right-4 flex items-center space-x-2">
                        {!isLoading && input.length > 0 && (
                            <span className="text-xs text-muted-foreground">Press ⏎ to send</span>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || input.trim().length === 0 || disabled}
                    className={cn(
                        'shrink-0',
                        (isLoading || disabled) && 'cursor-not-allowed opacity-60'
                    )}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                </Button>
            </form>
        </motion.div>
    );
}