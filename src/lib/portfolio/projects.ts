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
        id: '3',
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
        id: '4',
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
        id: '5',
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
        id: '6',
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
    },
    {
        id: '7',
        title: 'Vector Search RAG System',
        description: 'Advanced RAG system combining vector search with semantic understanding for movie dataset exploration.',
        longDescription: `
            Built a sophisticated RAG (Retrieval-Augmented Generation) system that combines vector search 
            with semantic understanding. The system uses movie data to demonstrate advanced search capabilities,
            semantic similarity matching, and contextual information retrieval.
        `,
        technologies: [
            'Next.js',
            'Vector Database',
            'OpenAI Embeddings',
            'RAG Architecture',
            'TypeScript',
            'TailwindCSS'
        ],
        category: 'AI/ML',
        featured: true,
        liveUrl: 'https://vector-search-test.vercel.app/',
        createdAt: new Date('2024-11-01'),
        updatedAt: new Date('2024-12-01'),
        technicalDetails: {
            architecture: `
                Implements a modern RAG architecture with vector embeddings for semantic search.
                Uses advanced chunking strategies, similarity scoring, and contextual retrieval
                to provide accurate and relevant movie information and recommendations.
            `,
            challenges: [
                'Optimizing vector embeddings for movie metadata',
                'Implementing efficient semantic search algorithms',
                'Balancing precision and recall in search results',
                'Managing large-scale movie dataset efficiently'
            ],
            solutions: [
                'Developed multi-dimensional embedding strategy for movie attributes',
                'Implemented hybrid search combining vector and keyword matching',
                'Created intelligent ranking system with user context',
                'Built efficient caching layer for frequent queries'
            ]
        }
    },
    {
        id: '8',
        title: 'RAG Function Calling Studio',
        description: 'Advanced RAG system with function calling, human-in-the-loop workflows, and AI SDK integration.',
        longDescription: `
            Enterprise-grade RAG system featuring advanced function calling capabilities, human-in-the-loop
            validation, and seamless AI SDK integration. Demonstrates sophisticated AI orchestration
            with real-time collaboration and intelligent task routing.
        `,
        technologies: [
            'AI SDK',
            'Function Calling',
            'RAG Architecture',
            'Human-in-the-Loop',
            'Next.js',
            'TypeScript',
            'Real-time Updates'
        ],
        category: 'AI/ML',
        featured: true,
        liveUrl: 'https://rfp.vertexai.studio/chat/',
        createdAt: new Date('2024-10-01'),
        updatedAt: new Date('2024-12-01'),
        technicalDetails: {
            architecture: `
                Advanced RAG system with intelligent function calling and human oversight.
                Implements sophisticated AI workflows with real-time collaboration features,
                automated task routing, and intelligent decision-making capabilities.
            `,
            challenges: [
                'Implementing reliable function calling with AI models',
                'Building efficient human-in-the-loop workflows',
                'Managing complex AI tool orchestration',
                'Ensuring real-time collaboration and updates'
            ],
            solutions: [
                'Built robust function calling framework with error handling',
                'Developed intuitive human oversight interface',
                'Created intelligent task routing and priority system',
                'Implemented real-time WebSocket-based collaboration'
            ]
        }
    },
    {
        id: '9',
        title: 'WhatsApp AI Lead Generation Agent',
        description: 'AI-powered WhatsApp agent that captures leads 24/7, qualifies prospects, and books appointments automatically.',
        longDescription: `
            Deployed AI assistants that revolutionize lead generation through WhatsApp automation.
            The system captures leads around the clock, intelligently qualifies prospects using
            conversational AI, and seamlessly books appointments with integrated calendar systems.
        `,
        technologies: [
            'WhatsApp Business API',
            'Conversational AI',
            'Lead Qualification',
            'Calendar Integration',
            'CRM Integration',
            'Webhook Management',
            'Natural Language Processing'
        ],
        category: 'AI/ML',
        featured: true,
        liveUrl: 'https://whatsapp.vertexai.studio/',
        createdAt: new Date('2024-09-01'),
        updatedAt: new Date('2024-12-01'),
        technicalDetails: {
            architecture: `
                Comprehensive WhatsApp automation system with intelligent lead processing.
                Integrates multiple AI models for conversation handling, lead scoring,
                and automated appointment scheduling with CRM synchronization.
            `,
            challenges: [
                'Managing WhatsApp API rate limits and compliance',
                'Building intelligent conversation flows',
                'Implementing reliable lead qualification logic',
                'Integrating with multiple calendar and CRM systems'
            ],
            solutions: [
                'Developed intelligent message queuing and rate limiting system',
                'Created sophisticated conversation state management',
                'Built AI-powered lead scoring and qualification engine',
                'Implemented universal API integration layer for CRM/calendar systems'
            ]
        }
    },
    {
        id: '10',
        title: 'Resonate Conversational Feedback Platform',
        description: 'Transform feedback collection with conversational AI that captures richer insights and boosts completion rates.',
        longDescription: `
            Revolutionary feedback platform that goes beyond static forms and surveys. Resonate uses
            conversational AI to capture richer, more meaningful feedback while dramatically improving
            completion rates and delivering actionable insights that drive business growth.
        `,
        technologies: [
            'Conversational AI',
            'Feedback Analytics',
            'Natural Language Processing',
            'Sentiment Analysis',
            'Data Visualization',
            'Integration APIs',
            'Real-time Processing'
        ],
        category: 'AI/ML',
        featured: true,
        liveUrl: 'https://resonate.vertexai.studio/',
        createdAt: new Date('2024-08-01'),
        updatedAt: new Date('2024-12-01'),
        technicalDetails: {
            architecture: `
                AI-driven feedback collection platform with advanced natural language processing.
                Features intelligent conversation flows, real-time sentiment analysis,
                and comprehensive analytics dashboard for actionable business insights.
            `,
            challenges: [
                'Creating engaging conversational feedback experiences',
                'Implementing accurate sentiment analysis at scale',
                'Building comprehensive analytics and visualization',
                'Ensuring high completion rates and user engagement'
            ],
            solutions: [
                'Developed adaptive conversation flows based on user responses',
                'Built multi-model sentiment analysis with confidence scoring',
                'Created interactive analytics dashboard with real-time insights',
                'Implemented gamification and engagement optimization strategies'
            ]
        }
    }
];
