import { NextRequest, NextResponse } from 'next/server';
import { renderToStream, DocumentProps } from '@react-pdf/renderer';
import { createResumeDocument } from '@/lib/resume/pdf-generator';
import { ResumeData, PersonalInfo } from '@/types/resume';
import React from 'react';

export async function POST(request: NextRequest) {
  try {
    const { resumeData, template, personalInfo } = await request.json() as { 
      resumeData: ResumeData; 
      template: string;
      personalInfo?: PersonalInfo;
    };

    // Debug logging
    console.log('PDF Export - Personal Info received:', personalInfo);
    console.log('PDF Export - Resume data summary:', {
      hasExperiences: !!resumeData.experiences?.length,
      hasProjects: !!resumeData.projects?.length,
      hasEducation: !!resumeData.education?.length,
      template
    });

    if (!resumeData) {
      return NextResponse.json(
        { error: 'Resume data is required' },
        { status: 400 }
      );
    }

    // Generate PDF buffer with template selection
    const pdfDocument = createResumeDocument({
      data: resumeData,
      personalInfo,
      templateId: template
    });
    
    // Generate PDF stream using the proper React PDF API
    const pdfStream = await renderToStream(
      pdfDocument as React.ReactElement<DocumentProps>
    );
    
    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of pdfStream) {
      if (chunk instanceof Buffer) {
        chunks.push(chunk);
      } else {
        chunks.push(Buffer.from(chunk));
      }
    }
    const pdfBuffer = Buffer.concat(chunks);

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume-${new Date().toISOString().split('T')[0]}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
