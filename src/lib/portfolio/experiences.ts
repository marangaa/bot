import { Experience } from '@/types/portfolio';

export const experiences: Experience[] = [
    {
        id: '1',
        title: 'Software Engineer',
        company: 'Chpter',
        location: 'Nairobi',
        startDate: new Date('2025-04-01').toISOString(),
        description: 'Building and maintaining fullstack features using TypeScript, Next.js, and Node.',
        achievements: [
            'Building and maintaining fullstack features using TypeScript, Next.js, and Node',
            'Contributed to internal tooling and product optimizations',
            'Supported quick iteration cycles with tight feedback loops'
        ],
        technologies: [
            'TypeScript',
            'Next.js',
            'Node.js',
            'React',
            'PostgreSQL'
        ],
        type: 'work'
    },
    {
        id: '2',
        title: 'Software Engineer',
        company: 'Freelance',
        location: 'Nairobi, Kenya',
        startDate: new Date('2023-01-01').toISOString(),
        description: 'Designed and shipped custom web applications end-to-end for clients.',
        achievements: [
            'Designed and shipped custom web applications end-to-end for clients',
            'Built fullstack prototypes and internal tools for early-stage ideas',
            'Integrated AI features (e.g., GPT-4, local inference with Ollama) into client workflows'
        ],
        technologies: [
            'TypeScript',
            'React',
            'Node.js',
            'OpenAI API',
            'Ollama',
            'Next.js'
        ],
        type: 'work'
    },
    {
        id: '3',
        title: 'Data Specialist',
        company: 'Avala AI',
        location: 'Nairobi, Kenya',
        startDate: new Date('2024-02-01').toISOString(),
        endDate: new Date('2024-09-01').toISOString(),
        description: 'Annotated and QA\'d large-scale datasets for AI model training.',
        achievements: [
            'Annotated and QA\'d large-scale datasets for AI model training',
            'Reduced annotation error rate by 15% with updated QA workflows',
            'Collaborated on refining model outputs and feedback systems'
        ],
        technologies: [
            'Python',
            'Data Annotation',
            'Quality Assurance',
            'Machine Learning',
            'PyTorch'
        ],
        type: 'work'
    },
    {
        id: '4',
        title: 'Data Scientist',
        company: 'Everything Data',
        location: 'Nairobi, Kenya',
        startDate: new Date('2024-01-01').toISOString(),
        endDate: new Date('2024-12-01').toISOString(),
        description: 'Developed machine learning models and automated pipelines.',
        achievements: [
            'Developed machine learning models (e.g., churn prediction, classification)',
            'Built automated pipelines and analytics dashboards',
            'Mentored junior contributors on model design and performance tuning'
        ],
        technologies: [
            'Python',
            'Scikit-learn',
            'Pandas',
            'Machine Learning',
            'Data Analytics'
        ],
        type: 'work'
    }
];
