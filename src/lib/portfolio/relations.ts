import { ProjectRelation, SkillRelation } from '@/types/portfolio';
import { projects } from './projects';
import { skills } from './skills';

export const projectRelations: ProjectRelation[] = [
    {
        sourceId: '1',
        targetId: '2',
        type: 'similar',
        description: 'Both projects involve LLM technologies'
    },
    {
        sourceId: '2',
        targetId: '1',
        type: 'similar',
        description: 'Both projects involve LLM technologies'
    }
];

export function getRelatedProjects(projectId: string) {
    return projectRelations
        .filter(relation => relation.sourceId === projectId)
        .map(relation => projects.find(p => p.id === relation.targetId))
        .filter(Boolean);
}

export function getProjectRelationship(sourceId: string, targetId: string) {
    return projectRelations.find(
        relation => relation.sourceId === sourceId && relation.targetId === targetId
    );
}

export const skillRelations: SkillRelation[] = [
    {
        skillId: '1', // Large Language Models
        projectId: '1', // AI Portfolio Assistant
        type: 'primary',
        proficiencyDemonstrated: 90
    },
    {
        skillId: '1', // Large Language Models
        projectId: '2', // LLM Training Pipeline
        type: 'primary',
        proficiencyDemonstrated: 95
    },
    {
        skillId: '2', // Full Stack Development
        projectId: '1', // AI Portfolio Assistant
        type: 'primary',
        proficiencyDemonstrated: 85
    },
    {
        skillId: '3', // MLOps
        projectId: '2', // LLM Training Pipeline
        type: 'primary',
        proficiencyDemonstrated: 88
    }
];

export function getRelatedSkills(projectId: string) {
    return skillRelations
        .filter(relation => relation.projectId === projectId)
        .map(relation => skills.find(s => s.id === relation.skillId))
        .filter(Boolean);
}

export function getProjectsBySkill(skillId: string) {
    return skillRelations
        .filter(relation => relation.skillId === skillId)
        .map(relation => projects.find(p => p.id === relation.projectId))
        .filter(Boolean);
}
