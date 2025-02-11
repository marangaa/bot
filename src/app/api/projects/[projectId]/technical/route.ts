import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/portfolio/data';

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

    return NextResponse.json({
      technicalDetails: project.technicalDetails || {
        architecture: project.longDescription,
        challenges: [],
        solutions: []
      },
      relatedProjects: project.relatedProjects || []
    });

  } catch (error) {
    console.error('Error in technical details API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}