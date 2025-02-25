import React from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings,
    Code,
    Brain,
    Briefcase,
    FileText,
    Github,
    Linkedin,
} from 'lucide-react';

interface CommandPaletteProps {
    open: boolean;
    onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
    const [value, setValue] = React.useState('');

    const runCommand = React.useCallback((command: () => void) => {
        command();
        onClose();
    }, [onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                >
                    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg overflow-hidden rounded-xl border bg-popover shadow-lg sm:rounded-xl"
                        >
                            <Command
                                value={value}
                                onValueChange={(value) => setValue(value)}
                                className="relative h-full max-h-[60vh] overflow-hidden rounded-xl bg-transparent"
                            >
                                <div className="border-b px-3">
                                    <Command.Input
                                        placeholder="Type a command or search..."
                                        className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                    />
                                </div>

                                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                                    <Command.Empty>No results found.</Command.Empty>

                                    <Command.Group heading="Portfolio">
                                        <Command.Item
                                            onSelect={() => runCommand(() => console.log('View Projects'))}
                                            className="flex items-center gap-2 px-2 py-1 text-sm rounded-lg hover:bg-accent"
                                        >
                                            <Code className="h-4 w-4" />
                                            View Projects
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => runCommand(() => console.log('View Skills'))}
                                            className="flex items-center gap-2 px-2 py-1 text-sm rounded-lg hover:bg-accent"
                                        >
                                            <Brain className="h-4 w-4" />
                                            View Skills
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => runCommand(() => console.log('View Experience'))}
                                            className="flex items-center gap-2 px-2 py-1 text-sm rounded-lg hover:bg-accent"
                                        >
                                            <Briefcase className="h-4 w-4" />
                                            View Experience
                                        </Command.Item>
                                    </Command.Group>

                                    <Command.Group heading="Navigation">
                                        <Command.Item
                                            onSelect={() => runCommand(() => console.log('View Resume'))}
                                            className="flex items-center gap-2 px-2 py-1 text-sm rounded-lg hover:bg-accent"
                                        >
                                            <FileText className="h-4 w-4" />
                                            View Resume
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => window.open('https://github.com/marangaa', '_blank')}
                                            className="flex items-center gap-2 px-2 py-1 text-sm rounded-lg hover:bg-accent"
                                        >
                                            <Github className="h-4 w-4" />
                                            GitHub Profile
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => window.open('https://www.linkedin.com/in/richard-marangaa/', '_blank')}
                                            className="flex items-center gap-2 px-2 py-1 text-sm rounded-lg hover:bg-accent"
                                        >
                                            <Linkedin className="h-4 w-4" />
                                            LinkedIn Profile
                                        </Command.Item>
                                    </Command.Group>

                                    <Command.Group heading="Theme">
                                        <Command.Item
                                            onSelect={() => runCommand(() => console.log('Toggle Theme'))}
                                            className="flex items-center gap-2 px-2 py-1 text-sm rounded-lg hover:bg-accent"
                                        >
                                            <Settings className="h-4 w-4" />
                                            Toggle Theme
                                        </Command.Item>
                                    </Command.Group>
                                </Command.List>
                            </Command>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}