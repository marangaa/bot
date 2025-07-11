import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuggestedQuestionsProps {
    onQuestionSelect: (question: string) => void;
    className?: string;
}

export function SuggestedQuestions({ onQuestionSelect, className = '' }: SuggestedQuestionsProps) {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const categories = [
        {
            id: 'portfolio',
            title: 'Portfolio & Skills',
            emoji: '💼',
            questions: [
                "Show me your projects",
                "What technologies do you work with?",
                "Tell me about your experience"
            ]
        },
        {
            id: 'business',
            title: 'Business Solutions',
            emoji: '🚀',
            questions: [
                "I need help with lead generation",
                "How can AI improve my business?",
                "I want to automate my WhatsApp",
                "My e-commerce needs better conversion"
            ]
        },
        {
            id: 'technical',
            title: 'Technical Planning',
            emoji: '⚡',
            questions: [
                "Help me plan a SaaS product",
                "What's the best tech stack for AI?",
                "I need a mobile app for my business",
                "How would you build a chatbot?"
            ]
        },
        {
            id: 'consultation',
            title: 'Pricing & Consultation',
            emoji: '📅',
            questions: [
                "I want to schedule a consultation",
                "What times are you available this week?",
                "How much would a chatbot cost?",
                "What's your pricing for web apps?"
            ]
        }
    ];

    const quickStarters = [
        "What makes your AI solutions different?",
        "what projects do you have?",
        "I need a solution that works 24/7"
        
    ];

    const toggleCategory = (categoryId: string) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`space-y-6 ${className}`}
        >
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                        How can I help you today?
                    </h3>
                </div>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    I&apos;m Richard, an AI engineer and consultant. Ask me anything about technology, business automation, or my work.
                </p>
            </div>

            {/* Quick Starters */}
            <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground text-center">
                    Quick Start
                </h4>
                <div className="grid gap-2">
                    {quickStarters.map((question, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-between text-left h-auto py-3 px-4 group hover:border-primary/50 hover:bg-primary/5"
                                onClick={() => onQuestionSelect(question)}
                            >
                                <span className="text-sm">{question}</span>
                                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Expandable Categories */}
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground text-center">
                    Explore More Topics
                </h4>
                
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="border border-border rounded-lg overflow-hidden"
                    >
                        <Button
                            variant="ghost"
                            className="w-full justify-between p-4 h-auto hover:bg-muted/50"
                            onClick={() => toggleCategory(category.id)}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{category.emoji}</span>
                                <span className="font-medium text-foreground">{category.title}</span>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </motion.div>
                        </Button>

                        <AnimatePresence>
                            {expandedCategory === category.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="border-t border-border"
                                >
                                    <div className="p-3 space-y-2">
                                        {category.questions.map((question, qIndex) => (
                                            <motion.div
                                                key={qIndex}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: qIndex * 0.05 }}
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-full justify-start text-left h-auto py-2 px-3 text-sm hover:bg-primary/10 hover:text-primary"
                                                    onClick={() => onQuestionSelect(question)}
                                                >
                                                    <MessageCircle className="w-3 h-3 mr-2 flex-shrink-0" />
                                                    {question}
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center pt-4"
            >
                <p className="text-xs text-muted-foreground">
                    💡 I can analyze your business, create implementation plans, and provide accurate cost estimates
                </p>
            </motion.div>
        </motion.div>
    );
}
