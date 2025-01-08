export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
    category: 'AI/ML' | 'Web Development' | 'Data Science' | 'Other';
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Skill {
    id: string;
    name: string;
    category: string;
    proficiency: number;
    description: string;
    yearsOfExperience: number;
    relatedProjects: string[]; // Project IDs
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    achievements: string[];
    technologies: string[];
    type: 'work' | 'education' | 'certification';
}