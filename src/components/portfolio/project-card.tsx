import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/lib/portfolio/data';
import { Project } from '@/types/portfolio';

// We'll make the interface more flexible to handle both direct data and project ID
interface ProjectCardProps {
    // Allow passing either a project ID or direct project data
    projectId?: string;
    project?: Project;
    showTechnicalDetails?: boolean;
    className?: string;
}

export const ProjectCard = ({
    projectId,
    project: providedProject,
    showTechnicalDetails = false,
    className = ''
}: ProjectCardProps) => {
    // First try to use provided project data, then fall back to looking up by ID
    const project = providedProject || (projectId ? projects.find(p => p.id === projectId) : null);
    
    // Handle the case where no project data is available
    if (!project) {
        console.warn(`Project data not available${projectId ? ` for ID: ${projectId}` : ''}`);
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-lg bg-muted/50 border border-border/50"
            >
                <p className="text-muted-foreground text-sm">
                    Project information is currently unavailable
                </p>
            </motion.div>
        );
    }

    // Destructure project data with default values for optional fields
    const {
        title,
        description,
        technologies = [], // Provide empty array as default
        githubUrl,
        liveUrl,
        image,
        longDescription
    } = project;

    // Animation variants for consistent motion effects
    const hoverAnimation = {
        rest: { y: 0, transition: { duration: 0.2 } },
        hover: { y: -5, transition: { duration: 0.2 } }
    };

    const badgeAnimation = {
        rest: { scale: 1 },
        hover: { scale: 1.1 },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            initial="rest"
            animate={{ opacity: 1, y: 0 }}
            variants={hoverAnimation}
            whileHover="hover"
            className={`rounded-xl overflow-hidden bg-card border border-border/50 shadow-lg ${className}`}
        >
            {image && (
                <motion.div
                    className="relative h-48 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <img
                        src={image}
                        alt={`${title} project preview`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </motion.div>
            )}

            <div className="p-6">
                <motion.h3
                    className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
                >
                    {title}
                </motion.h3>

                <motion.p className="text-muted-foreground mb-4 line-clamp-2">
                    {showTechnicalDetails && longDescription ? longDescription : description}
                </motion.p>

                {technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {technologies.map((tech) => (
                            <motion.div
                                key={tech}
                                variants={badgeAnimation}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <Badge
                                    variant="secondary"
                                    className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                                >
                                    {tech}
                                </Badge>
                            </motion.div>
                        ))}
                    </div>
                )}

                {(githubUrl || liveUrl) && (
                    <div className="flex items-center justify-between mt-4 gap-2">
                        {githubUrl && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center gap-2 hover:bg-primary/5 transition-colors"
                                onClick={() => window.open(githubUrl, '_blank')}
                                aria-label="View project source code"
                            >
                                <Github className="h-4 w-4" />
                                <span>View Code</span>
                            </Button>
                        )}

                        {liveUrl && (
                            <Button
                                variant="default"
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={() => window.open(liveUrl, '_blank')}
                                aria-label="View live project demo"
                            >
                                <ExternalLink className="h-4 w-4" />
                                <span>Live Demo</span>
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};