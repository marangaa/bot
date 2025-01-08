import { NextRequest } from 'next/server';
import { projects } from '@/lib/portfolio/data';

// Mock technical details based on project type
const getTechnicalDetails = (project: any) => {
  // Detailed technical information based on project category
  if (project.category === 'AI/ML') {
    return {
      architecture: project.longDescription,
      challenges: [
        'Optimizing model inference for production scalability',
        'Managing large-scale training data pipelines',
        'Balancing model accuracy with latency requirements'
      ],
      solutions: [
        'Implemented model quantization and distillation techniques',
        'Built automated data validation and preprocessing pipeline',
        'Developed custom caching layer for frequent queries'
      ]
    };
  }
  
  // Default technical details if category doesn't match
  return {
    architecture: project.longDescription,
    challenges: [],
    solutions: []
  };
};

// Find related projects based on shared technologies
const findRelatedProjects = (currentProject: any, allProjects: any[]) => {
  return allProjects
    .filter(p => 
      p.id !== currentProject.id && 
      p.technologies.some((tech: string) => 
        currentProject.technologies.includes(tech)
      )
    )
    .map(p => p.id)
    .slice(0, 3); // Limit to 3 related projects
};

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const projectId = (await params).projectId;
    const project = projects.find(p => p.id === projectId);

    if (!project) {
      return new Response(JSON.stringify({ error: 'Project not found' }), {
        status: 404,
      });
    }

    const technicalDetails = getTechnicalDetails(project);
    const relatedProjects = findRelatedProjects(project, projects);

    return new Response(JSON.stringify({
      technicalDetails,
      relatedProjects,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in technical details API:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}