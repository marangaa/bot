import { Project, Skill, Experience } from '@/types/portfolio';

export const projects: Project[] = [
    {
        id: '1',
        title: 'AI Portfolio Assistant',
        description: 'An interactive AI-powered portfolio that showcases projects and skills through natural conversation.',
        longDescription: `
      Built with Next.js 14, TypeScript, and Gemini AI, this portfolio assistant 
      demonstrates advanced AI agent capabilities through an interactive chat interface. 
      Features include real-time streaming responses, dynamic content rendering, and 
      seamless portfolio exploration.
    `,
        technologies: [
            'Next.js 14',
            'TypeScript',
            'Gemini AI',
            'TailwindCSS',
            'Framer Motion'
        ],
        category: 'AI/ML',
        featured: true,
        githubUrl: 'https://github.com/yourusername/ai-portfolio',
        liveUrl: 'https://your-portfolio.com',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: '2',
        title: 'LLM Training Pipeline',
        description: 'End-to-end pipeline for fine-tuning and deploying large language models.',
        longDescription: `
      Developed a comprehensive pipeline for training and deploying LLMs at scale. 
      Includes data preprocessing, model fine-tuning, evaluation metrics, and 
      automated deployment workflows.
    `,
        technologies: [
            'PyTorch',
            'Transformers',
            'Docker',
            'MLflow',
            'Ray'
        ],
        category: 'AI/ML',
        featured: true,
        githubUrl: 'https://github.com/yourusername/llm-pipeline',
        createdAt: new Date('2023-12-01'),
        updatedAt: new Date('2023-12-01'),
    }
];

export const skills: Skill[] = [
    {
        id: '1',
        name: 'Large Language Models',
        category: 'AI/ML',
        proficiency: 90,
        description: 'Expert in LLM fine-tuning, prompt engineering, and deployment.',
        yearsOfExperience: 3,
        relatedProjects: ['1', '2'],
    },
    {
        id: '2',
        name: 'Full Stack Development',
        category: 'Web Development',
        proficiency: 85,
        description: 'Building modern web applications with React, Next.js, and Node.js.',
        yearsOfExperience: 5,
        relatedProjects: ['1'],
    },
    {
        id: '3',
        name: 'MLOps',
        category: 'AI/ML',
        proficiency: 88,
        description: 'Designing and implementing ML pipelines and infrastructure.',
        yearsOfExperience: 4,
        relatedProjects: ['2'],
    }
];

export const experiences: Experience[] = [
    {
        id: '1',
        title: 'Senior AI Engineer',
        company: 'AI Tech Corp',
        location: 'San Francisco, CA',
        startDate: new Date('2022-01-01').toISOString(), 
        description: 'Leading AI initiatives and developing LLM-based solutions.',
        achievements: [
            'Developed production LLM systems serving 1M+ users',
            'Reduced inference costs by 40% through optimization',
            'Led team of 5 ML engineers'
        ],
        technologies: [
            'PyTorch',
            'Transformers',
            'AWS',
            'Docker'
        ],
        type: 'work'
    },
    {
        id: '2',
        title: 'Machine Learning Engineer',
        company: 'Tech Startup',
        location: 'Remote',
        startDate: new Date('2020-06-01').toISOString(),
        endDate: new Date('2021-12-31').toISOString(),
        description: 'Built and deployed ML models for production applications.',
        achievements: [
            'Implemented real-time ML prediction system',
            'Improved model accuracy by 25%',
            'Created automated testing framework'
        ],
        technologies: [
            'TensorFlow',
            'Python',
            'GCP',
            'Kubernetes'
        ],
        type: 'work'
    }
];

export const portfolioSections = {
    about: {
        title: 'About Me',
        content: `
      I'm an AI Engineer specialized in developing and deploying large language models
      and building AI-powered applications. With over 5 years of experience in machine
      learning and software development, I focus on creating practical AI solutions
      that solve real-world problems.
    `,
    },
    skills: {
        title: 'Skills & Expertise',
        categories: [
            'AI/ML',
            'Web Development',
            'Cloud & Infrastructure',
            'Software Engineering'
        ],
    },
    contact: {
        email: 'your.email@example.com',
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
    }
};