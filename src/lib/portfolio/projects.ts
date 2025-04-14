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
            'Google gemini',
            'javascript',
            'Python',
            'FastAPI',
            'Redis',
            'React',
            'PostgreSQL'
        ],
        liveUrl: 'https://insurance.vertexai.tech/',
        category: 'AI/ML',
        featured: true,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-02-01'),
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
            'Firebase',
            'google gemini'
        ],
        category: 'Productivity',
        featured: true,
        githubUrl: 'https://owlette.vertexai.studio/',
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
        liveUrl: 'https://skika.vercel.app/',
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
        id: '8',
        title: 'Email Tone Converter',
        description: 'AI-powered application that transforms email content into different tones and styles.',
        longDescription: `
            A web application that helps professionals adjust the tone of their emails
            for different contexts and recipients. Converts casual emails to formal ones,
            technical content to simplified language, and adds empathy or assertiveness as needed.
        `,
        technologies: [
            'React',
            'TypeScript',
            'Supabase',
            'Google Gemini',
            'TailwindCSS',
            'Express'
        ],
        category: 'Productivity',
        featured: true,
        liveUrl: 'emailtone.vertexai.studio',
        createdAt: new Date('2023-11-15'),
        updatedAt: new Date('2024-01-10'),
        technicalDetails: {
            architecture: `
                Full-stack application with AI-powered text transformation built on React frontend
                and Express backend. Uses Google Gemini for natural language processing and Supabase
                for user authentication, data storage, and saved templates.
            `,
            challenges: [
                'Accurate tone detection and transformation',
                'Context-aware language adjustments',
                'Processing and maintaining email formatting',
                'User template management'
            ],
            solutions: [
                'Implemented custom prompt engineering for Gemini API',
                'Created pre-processing pipeline for context analysis',
                'Built format-preserving transformation engine',
                'Developed efficient template storage using Supabase'
            ]
        }
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
        liveUrl: 'https://agentflow.vertexai.studio/',
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
        liveUrl: 'https://reina.vertexai.studio/',
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
    },
    {
        id: '9',
        title: 'Resonate',
        description: 'AI-powered platform that transforms standard forms and surveys into engaging, conversational experiences.',
        longDescription: `
            Resonate on Vertex AI Studio is an AI-powered platform focused on transforming standard forms and surveys into engaging, 
            conversational experiences. It leverages artificial intelligence to help businesses collect higher-quality data by 
            mimicking natural dialogue, making the forms feel more like interactive conversations rather than static questionnaires.
        `,
        technologies: [
            'Next.js',
            'TypeScript',
            'Google Gemini',
            'Calendar API',
            'MongoDB',
            'WebSockets',
            'TailwindCSS'
        ],
        category: 'AI/ML',
        featured: true,
        liveUrl: 'https://resonate.vertexai.studio/',
        createdAt: new Date('2023-10-15'),
        updatedAt: new Date('2024-02-20'),
        technicalDetails: {
            architecture: `
                Event-driven architecture with real-time conversational capabilities and AI-powered form
                management. Implements a sophisticated response system with natural language processing and
                intelligent data collection based on user inputs and contextual understanding.
            `,
            challenges: [
                'Creating natural conversational flow from static form fields',
                'Maintaining data integrity while enhancing user experience',
                'Real-time response generation',
                'Adapting to different form types and industries'
            ],
            solutions: [
                'Built dynamic conversation flow engine',
                'Implemented structured data validation with conversational interface',
                'Created response generation system with Gemini AI',
                'Developed template system for industry-specific form conversations'
            ]
        }
    },
    {
        id: '10',
        title: 'Tasky',
        description: 'Voice-powered mobile productivity app with AI task management and smart notifications.',
        longDescription: `
            A cutting-edge mobile productivity application that leverages voice commands and AI to simplify
            task management. Users can record tasks using natural voice commands, while the app automatically
            sets appropriate reminders and prioritizes activities. The intelligent notification system adapts
            to user behavior patterns for optimal productivity.
        `,
        technologies: [
            'React Native',
            'TypeScript',
            'Google Gemini',
            'Push Notifications',
            'Speech Recognition',
            'Redux',
            'Expo'
        ],
        category: 'Productivity',
        featured: true,
        liveUrl: 'https://tasky.vertexai.studio/',
        createdAt: new Date('2023-09-05'),
        updatedAt: new Date('2024-03-10'),
        technicalDetails: {
            architecture: `
                Cross-platform mobile application built with React Native and powered by Google Gemini
                for advanced audio processing and task intelligence. Uses Firebase for backend services
                and implements a sophisticated notification scheduling system based on user habits and
                task priorities.
            `,
            challenges: [
                'Accurate voice recognition in noisy environments',
                'Intelligent task prioritization and categorization',
                'Battery-efficient background processing',
                'Context-aware notification timing'
            ],
            solutions: [
                'Implemented noise-cancellation audio preprocessing',
                'Developed ML model for task importance classification',
                'Created efficient background service architecture',
                'Built adaptive notification system using behavioral patterns'
            ]
        }
    },
    {
        id: '11',
        title: 'Vector Search Test',
        description: 'Comparative analysis of vector search versus traditional text search using a movie dataset.',
        longDescription: `
            A demonstration project that implements vector-based semantic search over traditional text-based
            search methods. Using a comprehensive movie dataset, this project showcases how vector embeddings
            can significantly improve search relevance and handle semantic queries that keyword search
            struggles with.
        `,
        technologies: [
            'MongoDB',
            'Langchain',
            'Vector Embeddings',
            'Next.js',
            'TypeScript',
            'OpenAI Embeddings',
            'Express.js'
        ],
        category: 'Data Science',
        featured: true,
        liveUrl: 'https://vector-search-test.vertexai.studio/',
        createdAt: new Date('2023-08-15'),
        updatedAt: new Date('2023-09-20'),
        technicalDetails: {
            architecture: `
                Full-stack application using Next.js frontend and Express backend with MongoDB Atlas 
                vector search capabilities. Implements a dual-pipeline architecture that processes 
                queries through both traditional text search and vector-based semantic search for 
                side-by-side comparison.
            `,
            challenges: [
                'Optimizing vector embedding generation for large datasets',
                'Implementing efficient nearest-neighbor search algorithms',
                'Balancing search accuracy with performance',
                'Creating meaningful visualization of search result comparisons'
            ],
            solutions: [
                'Built batch processing system for embedding generation',
                'Implemented MongoDB Atlas vector search with optimized indexes',
                'Created composite scoring system combining semantic and lexical matching',
                'Developed interactive visualization dashboard for result comparison'
            ]
        }
    }
];
