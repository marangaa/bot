import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/portfolio/projects';
import { getRelatedProjects, getRelatedSkills } from '@/lib/portfolio/relations';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const project = projects.find(p => p.id === projectId);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const relatedProjects = getRelatedProjects(projectId);
    const relatedSkills = getRelatedSkills(projectId);

    return NextResponse.json({
      technicalDetails: project.technicalDetails || {
        architecture: project.longDescription,
        challenges: [],
        solutions: []
      },
      relatedProjects: relatedProjects.map(p => p?.id),
      relatedSkills: relatedSkills.map(s => ({
        id: s?.id,
        name: s?.name,
        proficiency: s?.proficiency
      }))
    });

  } catch (error) {
    console.error('Error in technical details API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
