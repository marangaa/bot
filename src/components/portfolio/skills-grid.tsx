import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Cloud, Database, Globe } from 'lucide-react';
import type { Skill } from '@/types/portfolio';
import { skills as portfolioSkills } from '@/lib/portfolio/data';

interface SkillsGridProps {
    skillIds?: string[];
    skills?: Skill[];
}

// Icon mapping for different skill categories
const getSkillIcon = (category: string) => {
    switch (category) {
        case 'AI/ML':
            return <Brain className="h-5 w-5" />;
        case 'Web Development':
            return <Globe className="h-5 w-5" />;
        case 'Cloud & Infrastructure':
            return <Cloud className="h-5 w-5" />;
        case 'Software Engineering':
            return <Database className="h-5 w-5" />;
        default:
            return <Code className="h-5 w-5" />;
    }
};

const SkillCard = ({ skill }: { skill: Skill }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, rotateY: 10 }}
            className="relative p-6 rounded-xl bg-card border border-border/50 overflow-hidden"
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-br opacity-10" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/5">
                        {getSkillIcon(skill.category)}
                    </div>
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                    {skill.description}
                </p>

                <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-primary to-primary/80"
                    />
                </div>
                <span className="text-xs text-muted-foreground mt-2 block">
          Proficiency: {skill.proficiency}%
        </span>
            </div>
        </motion.div>
    );
};

const SkillsGrid = ({ skillIds, skills: propSkills }: SkillsGridProps) => {
    // If skillIds are provided, fetch from portfolio data, otherwise use provided skills
    const skills = skillIds 
        ? skillIds.map(id => portfolioSkills.find(s => s.id === id)).filter(Boolean) as Skill[]
        : propSkills || [];

    // Group skills by category
    const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <div className="space-y-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                    <h2 className="text-xl font-semibold mb-4">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categorySkills.map((skill) => (
                            <SkillCard key={skill.id} skill={skill} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default SkillsGrid;