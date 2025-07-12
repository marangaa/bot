import { Skill } from '@/types/portfolio';

export const skills: Skill[] = [
    {
        id: '1',
        name: 'Software Development',
        category: 'Web Development',
        level: 90,
        description: 'TypeScript, Python, Next.js, full-stack web development, REST APIs, product ownership',
        yearsOfExperience: 5
    },
    {
        id: '2',
        name: 'AI/LLM Tools',
        category: 'AI/ML',
        level: 85,
        description: 'OpenAI API, Ollama, LangChain, Postgres Vector Store, Prompt Engineering, Data Analysis, LLM security',
        yearsOfExperience: 3
    },
    {
        id: '3',
        name: 'Communication Skills',
        category: 'Soft Skills',
        level: 88,
        description: 'Collaborative mindset, can work across teams, happy to ship, iterate, and adapt fast',
        yearsOfExperience: 5
    },
    {
        id: '4',
        name: 'Tools & Practices',
        category: 'Software Engineering',
        level: 92,
        description: 'Git, REST APIs, UI Prototyping, Testing, Agile, Solo Project Ownership',
        yearsOfExperience: 4
    }
];
