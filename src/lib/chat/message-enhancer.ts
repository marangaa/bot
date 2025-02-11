import { projects, skills, experiences } from '@/lib/portfolio/data';
import { ChatMessage, MessageType } from '@/types/chat';

interface MessageMetadata {
    projectId?: string;
    skillId?: string;
    experienceId?: string;
    projectIds?: string[];
    skillIds?: string[];
    experienceIds?: string[];
    primaryProject?: string;
    primarySkill?: string;
    primaryExperience?: string;
    confidence?: number;
    suggestedQuestions?: string[];
}

interface EnhancedContent {
    type?: MessageType;
    metadata?: MessageMetadata;
}

export class MessageEnhancer {
    private static readonly PROJECT_KEYWORDS = [
        'project', 'portfolio', 'work', 'built', 'developed', 'created',
        'implemented', 'designed', 'application', 'app', 'system'
    ];

    private static readonly SKILL_KEYWORDS = [
        'skill', 'technology', 'tech stack', 'programming', 'language',
        'framework', 'tool', 'expertise', 'proficiency', 'experience with'
    ];

    private static readonly EXPERIENCE_KEYWORDS = [
        'work experience', 'job', 'position', 'role', 'company',
        'employment', 'career', 'professional'
    ];

    static enhanceMessage(message: ChatMessage): ChatMessage {
        if (message.role === 'user') return message;

        const content = message.content.toLowerCase();
        const enhanced = this.analyzeContent(content);

        return {
            ...message,
            type: enhanced.type,
            metadata: enhanced.metadata,
        };
    }

    private static analyzeContent(content: string): EnhancedContent {
        // Check for project references
        const projectMatches = this.findProjectReferences(content);
        if (projectMatches.length > 0) {
            return {
                type: projectMatches.length === 1 ? 'project' : 'multi',
                metadata: {
                    projectIds: projectMatches,
                    primaryProject: projectMatches[0],
                },
            };
        }

        // Check for skill references
        const skillMatches = this.findSkillReferences(content);
        if (skillMatches.length > 0) {
            return {
                type: skillMatches.length === 1 ? 'skill' : 'multi',
                metadata: {
                    skillIds: skillMatches,
                    primarySkill: skillMatches[0],
                },
            };
        }

        // Check for experience references
        const experienceMatches = this.findExperienceReferences(content);
        if (experienceMatches.length > 0) {
            return {
                type: experienceMatches.length === 1 ? 'experience' : 'multi',
                metadata: {
                    experienceIds: experienceMatches,
                    primaryExperience: experienceMatches[0],
                },
            };
        }

        return { type: 'text' };
    }

    private static findProjectReferences(content: string): string[] {
        return projects
            .filter(project =>
                this.PROJECT_KEYWORDS.some(keyword => content.includes(keyword)) &&
                content.includes(project.title.toLowerCase())
            )
            .map(project => project.id);
    }

    private static findSkillReferences(content: string): string[] {
        return skills
            .filter(skill =>
                this.SKILL_KEYWORDS.some(keyword => content.includes(keyword)) &&
                content.includes(skill.name.toLowerCase())
            )
            .map(skill => skill.id);
    }

    private static findExperienceReferences(content: string): string[] {
        return experiences
            .filter(exp =>
                this.EXPERIENCE_KEYWORDS.some(keyword => content.includes(keyword)) &&
                (content.includes(exp.company.toLowerCase()) ||
                    content.includes(exp.title.toLowerCase()))
            )
            .map(exp => exp.id);
    }
}