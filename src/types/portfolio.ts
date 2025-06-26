export interface TechnicalDetails {
    architecture: string;
    challenges: string[];
    solutions: string[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
    category: 'AI/ML' | 'Web Development' | 'Data Science' | 'Education' | 'Productivity' | 'Enterprise';
    featured: boolean;
    createdAt: Date;
    updatedAt?: Date;
    technicalDetails?: TechnicalDetails;
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string | Date; // Allow both string and Date
    endDate?: string | Date;  // Allow both string and Date
    description: string;
    achievements: string[];
    technologies: string[];
    type: 'work' | 'education' | 'volunteer';
}

export interface Skill {
    id: string;
    name: string;
    category: 'AI/ML' | 'Web Development' | 'Data Science' | 'Cloud & Infrastructure' | 'Software Engineering';
    level: number; // Changed from proficiency to level
    description: string;
    yearsOfExperience: number;
}