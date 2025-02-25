import { Project } from '@/types/portfolio';

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
        liveUrl: 'https://marangaa.vercel.app/',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2025-01-01'),
        technicalDetails: {
            architecture: `
                Built with Next.js 14, TypeScript, and Gemini AI, this portfolio assistant implements 
                a sophisticated architecture combining server-side streaming, client-side state management, 
                and AI model integration. The system uses a custom prompt engineering pipeline to maintain 
                context and generate coherent responses while optimizing for both performance and user experience.
            `,
            challenges: [
                'Implementing real-time streaming responses with minimal latency',
                'Managing complex state between AI interactions',
                'Optimizing prompt engineering for contextual responses',
                'Handling rate limiting and API quotas efficiently'
            ],
            solutions: [
                'Developed custom streaming implementation using Server-Sent Events',
                'Implemented context-aware state management using React Context',
                'Created dynamic prompt template system with fallback strategies',
                'Built intelligent caching layer for frequent queries'
            ]
        }
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
        technicalDetails: {
            architecture: `
                Developed a comprehensive pipeline for training and deploying LLMs at scale. 
                The system incorporates automated data preprocessing, distributed training infrastructure,
                and sophisticated model evaluation frameworks. Implements a microservices architecture
                for model serving with automated scaling capabilities.
            `,
            challenges: [
                'Scaling training across multiple GPU clusters',
                'Managing large-scale training data pipelines',
                'Optimizing model deployment for production',
                'Implementing robust monitoring and evaluation'
            ],
            solutions: [
                'Built distributed training system using Ray',
                'Developed automated data validation and cleaning pipeline',
                'Created containerized deployment system with Kubernetes',
                'Implemented comprehensive metrics collection and alerting'
            ]
        }
    },
    {
        id: '3',
        title: 'InsuranceBot AI',
        description: 'AI-powered chatbot for insurance customer engagement and policy explanation.',
        longDescription: `
            Intelligent conversational agent that helps insurance companies enhance customer engagement
            through natural language policy explanations, claim processing assistance, and 24/7 support.
        `,
        technologies: [
            'OpenAI GPT-4',
            'Python',
            'FastAPI',
            'Redis',
            'React',
            'PostgreSQL'
        ],
        category: 'AI/ML',
        featured: true,
        createdAt: new Date('2023-08-01'),
        updatedAt: new Date('2023-12-01'),
        technicalDetails: {
            architecture: `
                Microservices architecture with real-time NLP processing, context management,
                and integration with insurance policy databases. Implements sophisticated
                conversation flow management and policy information retrieval systems.
            `,
            challenges: [
                'Complex policy explanation simplification',
                'Maintaining conversation context across sessions',
                'Real-time integration with policy databases'
            ],
            solutions: [
                'Implemented advanced prompt engineering for policy simplification',
                'Built context management system using Redis',
                'Created cached policy information retrieval system'
            ]
        }
    },
    {
        id: '4',
        title: 'FocusFlow',
        description: 'Chrome extension for productivity enhancement and focus management.',
        longDescription: `
            Browser extension that helps users maintain focus by blocking distracting websites,
            providing pomodoro timing, and offering productivity analytics.
        `,
        technologies: [
            'JavaScript',
            'Chrome Extensions API',
            'React',
            'Firebase'
        ],
        category: 'Productivity',
        featured: false,
        githubUrl: 'https://github.com/yourusername/focusflow',
        createdAt: new Date('2023-06-01'),
        technicalDetails: {
            architecture: 'Browser extension with cloud syncing and analytics capabilities',
            challenges: [
                'Real-time website blocking',
                'Cross-device synchronization',
                'Performance optimization'
            ],
            solutions: [
                'Implemented efficient blocking algorithms',
                'Used Firebase for real-time sync',
                'Optimized extension load time'
            ]
        }
    },
    {
        id: '5',
        title: 'CivicEd Platform',
        description: 'Educational platform for civic education and legal awareness.',
        longDescription: `
            Comprehensive platform featuring two main tools: PolicyExplainer for understanding
            government policies and LegalEd for basic legal education and awareness.
        `,
        technologies: [
            'Next.js',
            'TypeScript',
            'MongoDB',
            'Express',
            'D3.js'
        ],
        category: 'Education',
        featured: true,
        liveUrl: 'https://civiced-platform.com',
        createdAt: new Date('2023-04-01'),
        technicalDetails: {
            architecture: 'Full-stack application with interactive learning modules',
            challenges: [
                'Complex legal content simplification',
                'Interactive visualization of legal processes',
                'Content management system'
            ],
            solutions: [
                'Created modular learning system',
                'Implemented interactive process visualizations',
                'Built custom CMS for legal content'
            ]
        },
        updatedAt: undefined
    },
    {
        id: '6',
        title: 'AgentFlow Visualizer',
        description: 'Customer support workflow visualization and management system.',
        longDescription: `
            Interactive platform for visualizing and managing customer support workflows
            with AI agent integration and real-time analytics.
        `,
        technologies: [
            'React',
            'D3.js',
            'Node.js',
            'WebSocket',
            'Redis'
        ],
        category: 'Enterprise',
        featured: true,
        createdAt: new Date('2023-02-01'),
        technicalDetails: {
            architecture: 'Real-time visualization system with agent workflow management',
            challenges: [
                'Complex workflow visualization',
                'Real-time updates handling',
                'Agent state management'
            ],
            solutions: [
                'Custom D3.js visualization engine',
                'WebSocket-based real-time updates',
                'Redis-based state management'
            ]
        }
    },
    {
        id: '7',
        title: 'RealEstate AI',
        description: 'Intelligent real estate platform with AI-powered insights.',
        longDescription: `
            Comprehensive real estate platform featuring AI-powered property valuation,
            market analysis, and investment recommendations.
        `,
        technologies: [
            'Python',
            'TensorFlow',
            'React',
            'PostgreSQL',
            'Docker'
        ],
        category: 'AI/ML',
        featured: true,
        createdAt: new Date('2023-01-01'),
        technicalDetails: {
            architecture: 'ML-powered platform with real-time market analysis',
            challenges: [
                'Real-time property valuation',
                'Market trend analysis',
                'Large-scale data processing'
            ],
            solutions: [
                'Implemented ML-based valuation model',
                'Created market analysis pipeline',
                'Built scalable data processing system'
            ]
        },
        updatedAt: undefined
    }
];
