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
        title: 'Britam Insurance WhatsApp Bot',
        description: 'Sophisticated WhatsApp chatbot providing personalized insurance advisory services for Britam Insurance customers.',
        longDescription: `
            Revolutionary WhatsApp chatbot designed to bridge the gap between traditional insurance 
            advisory services and modern digital communication. Features 24/7 availability, 
            context-aware conversations, intelligent lead generation, and comprehensive insurance 
            product knowledge. Leverages Google Gemini AI to deliver personalized advice for health, 
            education, travel, and life insurance products with automatic callback scheduling.
        `,
        technologies: [
            'Node.js',
            'WhatsApp Web.js',
            'Google Gemini 1.5',
            'JavaScript',
            'QR Code Terminal',
            'LocalAuth',
            'Session Management',
            'Insurance APIs'
        ],
        liveUrl: 'https://insurance.vertexai.tech/',
        category: 'AI/ML',
        featured: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-12-01'),
        technicalDetails: {
            architecture: `
                Microservices architecture with WhatsApp Web.js client, Google Gemini AI service, 
                session management, and insight analyzer. Implements sophisticated conversation 
                flow management with persistent context, insurance policy database integration, 
                and automated lead qualification with callback scheduling. Features advanced 
                session persistence with LocalAuth and comprehensive conversation analytics.
            `,
            challenges: [
                'Complex insurance product explanation simplification for customers',
                'Maintaining conversation context across multiple sessions and topics',
                'Real-time integration with insurance policy databases and systems',
                'Intelligent lead scoring and qualification automation',
                'Personalized conversation flow management for different customer types'
            ],
            solutions: [
                'Developed advanced prompt engineering system for policy simplification',
                'Built comprehensive session management with Redis-based context storage',
                'Created cached policy information retrieval system with real-time updates',
                'Implemented AI-powered lead scoring with 1-10 interest level classification',
                'Built adaptive conversation flows based on customer profile and insurance needs'
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
        id: '7',
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
        id: '8',
        title: 'Chatt-v3: Enterprise WhatsApp AI Platform',
        description: 'Enterprise-grade WhatsApp automation platform that transforms WhatsApp into a powerful AI-driven customer engagement and business management tool.',
        longDescription: `
            Revolutionary WhatsApp business automation platform that combines WhatsApp Web integration, 
            advanced AI capabilities, and comprehensive business features. Features multi-device session 
            management, intelligent lead capture, appointment scheduling, and personalized knowledge base 
            integration. Handles up to 10,000+ conversations monthly with enterprise-grade security and 
            24/7 availability.
        `,
        technologies: [
            'Next.js 15',
            'TypeScript',
            'Google Gemini 2.0',
            'WhatsApp Web.js',
            'MongoDB',
            'Supabase',
            'Socket.IO',
            'Google Calendar API',
            'Firecrawl',
            'RAG System'
        ],
        category: 'AI/ML',
        featured: true,
        liveUrl: 'https://whatsapp.vertexai.studio/',
        createdAt: new Date('2024-09-01'),
        updatedAt: new Date('2025-01-01'),
        technicalDetails: {
            architecture: `
                Microservices architecture with Next.js 15 frontend, Node.js/Express backend, 
                and multi-database storage (MongoDB for sessions, Supabase for business data). 
                Implements real-time WebSocket communication, AI-powered conversation processing, 
                and enterprise-grade security with user-based session isolation. Supports up to 
                4 concurrent WhatsApp device connections per user with automatic session persistence.
            `,
            challenges: [
                'Multi-device WhatsApp session management with automatic recovery',
                'Real-time AI conversation processing with sub-second response times',
                'Enterprise-grade security with user-based session isolation',
                'Knowledge base RAG implementation with PDF and web content processing',
                'Intelligent lead scoring and qualification automation'
            ],
            solutions: [
                'Built custom WhatsApp session manager with MongoDB persistence and QR code rotation',
                'Implemented Google Gemini 2.0 integration with function calling for business operations',
                'Created comprehensive user authentication system with Supabase and encrypted storage',
                'Developed RAG system using Firecrawl for web content extraction and PDF processing',
                'Built AI-powered lead detection with 1-10 scoring system and automated appointment booking'
            ]
        }
    },
    {
        id: '9',
        title: 'Resonate: AI-Powered Conversational Survey Platform',
        description: 'Revolutionary feedback platform that transforms boring surveys into engaging conversations with 3-5x higher completion rates.',
        longDescription: `
            Next-generation survey and feedback platform that fundamentally reimagines how businesses 
            collect insights. Instead of static forms, Resonate creates intelligent conversations that 
            adapt in real-time based on each respondent's unique answers. Features conversational AI, 
            dynamic question generation, sentiment analysis, and anonymous-first design. Achieves 
            65-85% completion rates compared to traditional 15-25% industry standard.
        `,
        technologies: [
            'Next.js 15',
            'React 19',
            'TypeScript',
            'Azure OpenAI',
            'Google AI SDK',
            'MongoDB',
            'Prisma ORM',
            'NextAuth.js',
            'Tailwind CSS',
            'Resend',
            'Real-time Streaming'
        ],
        category: 'AI/ML',
        featured: true,
        liveUrl: 'https://resonate.vertexai.studio/',
        createdAt: new Date('2024-08-01'),
        updatedAt: new Date('2024-12-01'),
        technicalDetails: {
            architecture: `
                Modern full-stack application with Next.js 15, React 19, and TypeScript. 
                Implements sophisticated AI pipeline with Azure OpenAI and Google AI SDK for 
                conversational intelligence. Features MongoDB with Prisma ORM for flexible 
                data modeling, NextAuth.js for multi-provider authentication, and real-time 
                streaming for instant response generation. Includes comprehensive analytics 
                dashboard with sentiment analysis and automated theme detection.
            `,
            challenges: [
                'Creating engaging conversational survey experiences that feel natural',
                'Implementing accurate sentiment analysis at scale with real-time processing',
                'Building comprehensive analytics and visualization for actionable insights',
                'Ensuring high completion rates while maintaining data quality and privacy',
                'Developing adaptive question flows that respond to user context and industry'
            ],
            solutions: [
                'Built adaptive conversation flows using Azure OpenAI with custom prompt engineering',
                'Implemented multi-model sentiment analysis with confidence scoring and validation',
                'Created interactive analytics dashboard with real-time insights and trend detection',
                'Developed gamification and engagement optimization strategies with A/B testing',
                'Built industry-specific AI models with specialized terminology and communication styles'
            ]
        }
    }
];
