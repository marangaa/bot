'use client'
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatInputProps {
    className?: string;
    onSubmit?: (e: React.FormEvent) => void;
    disabled?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ChatInput({ className, onSubmit, disabled, value, onChange }: ChatInputProps) {
    const inputRef = useRef<HTMLTextAreaElement>(null);

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
        if (!value?.trim() || disabled) return;

        try {
            await onSubmit?.(e);
        } catch (error) {
            console.error('Error sending message:', error);
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
                className="relative flex items-end justify-center gap-3 p-2"
            >
                <div className="relative flex flex-1 items-center max-w-4xl">
                    <TextareaAutosize
                        ref={inputRef}
                        tabIndex={0}
                        rows={1}
                        value={value || ''}
                        onChange={onChange}
                        placeholder="Ask about my projects, skills, or experience... (⌘K to focus)"
                        spellCheck={false}
                        className={cn(
                            "flex w-full rounded-xl border-2 bg-background/90 px-5 py-4 text-sm font-medium leading-relaxed tracking-wide outline-none placeholder:text-muted-foreground/70 placeholder:font-normal",
                            "focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-200",
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
                        {!disabled && (value?.length ?? 0) > 0 && (
                            <span className="text-xs text-muted-foreground font-medium">Press ⏎ to send</span>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    size="icon"
                    disabled={disabled || !value?.trim().length}
                    className={cn(
                        'shrink-0 h-12 w-12 rounded-xl shadow-lg transition-all duration-200',
                        'hover:shadow-xl hover:scale-105',
                        (disabled) && 'cursor-not-allowed opacity-60'
                    )}
                >
                    {disabled ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                </Button>
            </form>
        </motion.div>
    );
}