import { Experience } from '@/types/portfolio';

export const experiences: Experience[] = [
    {
        id: '1',
        title: 'Data Engineer (AI/ML Annotation Systems)',
        company: 'Avala ai',
        location: 'Nairobi, KE',
        startDate: new Date('2024-01-01').toISOString(),
        endDate: new Date('2024-07-01').toISOString(),
        description: 'Engineered scalable infrastructure for high-volume data annotation pipelines powering LLM training.',
        achievements: [
            'Reduced manual annotation effort by 60% via active learning-driven QA workflows',
            'Optimized preprocessing workflows to cut dataset preparation time by 45%'
        ],
        technologies: [
            'PyTorch',
            'Transformers',
            'AWS (S3, Lambda, SageMaker)',
            'Docker',
            'Annotation Tools' 
        ],
        type: 'work'
    },
    
    {
        id: '2',
        title: 'Software Engineer',
        company: 'freelance',
        location: 'Remote',
        startDate: new Date('2023-06-01').toISOString(),
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
    },
    {
        id: '3',
        title: 'Data Scientist',
        company: 'Everything Data',
        location: 'Nairobi, KE',
        startDate: new Date('2025-01-01').toISOString(),
        description: 'Led data science initiatives focusing on predictive analytics and machine learning solutions.',
        achievements: [
            'Developed predictive models achieving 85% accuracy for customer churn prediction',
            'Implemented automated data pipeline reducing processing time by 70%',
            'mentored 3 junior data scientists on multiple projects'
        ],
        technologies: [
            'Python',
            'Scikit-learn',
            'PostgreSQL',
            'Pandas',
            'Jupyter',
            'Git'
        ],
        type: 'work'
    },
    {
        id: '4',
        title: 'Software Engineer',
        company: 'Freelance',
        location: 'Remote',
        startDate: new Date('2021-01-01').toISOString(),
        endDate: new Date('2022-02-01').toISOString(),
        description: 'Delivered custom software solutions for multiple clients across different industries.',
        achievements: [
            'Built and deployed 5+ full-stack web applications',
            'Implemented CI/CD pipelines reducing deployment time by 40%',
            'Maintained 95% client satisfaction rate'
        ],
        technologies: [
            'React',
            'Node.js',
            'MongoDB',
            'Docker',
            'AWS',
            'TypeScript'
        ],
        type: 'work'
    }
];
