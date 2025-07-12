'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, FileText, Sparkles } from 'lucide-react';
import { useResumeBuilderStore } from '@/lib/resume-builder-store';
import { PDFViewer } from '@react-pdf/renderer';
import { getTemplate } from '@/lib/resume/templates';
import { GeneratedResumeResponse } from '@/types/resume';

interface ResumePreviewProps {
  data: GeneratedResumeResponse;
  template: string;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const { personalInfo } = useResumeBuilderStore();
  
  // Combine personal info from store with any passed in data
  const combinedPersonalInfo = {
    ...personalInfo,
    ...data.personalInfo
  };

  // Use the actual data structure from AI response
  const resumeData = data.data || data;

  try {
    // Get the template component directly
    const templateInfo = getTemplate(template);
    
    if (!templateInfo) {
      throw new Error(`Template ${template} not found`);
    }
    
    const TemplateComponent = templateInfo.component;

    return (
      <div className="space-y-4">
        {/* Preview Header */}
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Resume Preview</h2>
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Generated • {template}
          </Badge>
        </div>

        {/* PDF Preview */}
        <Card className="p-4 bg-white shadow-lg border-0">
          <div className="w-full h-[800px] border border-gray-200 rounded-lg overflow-hidden">
            <PDFViewer 
              width="100%" 
              height="100%"
              showToolbar={false}
              className="border-0"
            >
              <TemplateComponent 
                data={resumeData} 
                personalInfo={combinedPersonalInfo} 
              />
            </PDFViewer>
          </div>
        </Card>

        {/* Preview Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Live preview using {template} template • Data: {resumeData.experiences?.length || 0} experiences, {resumeData.projects?.length || 0} projects</span>
          </div>
          <div className="text-right">
            <span className="font-medium">Ready for PDF export</span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Preview render error:', error);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Resume Preview</h2>
          <Badge variant="destructive">
            Error Loading
          </Badge>
        </div>

        <Card className="p-8 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-red-900">Preview Error</h3>
              <p className="text-red-700 mb-4">
                Unable to render preview with current data
              </p>
              <details className="text-left text-xs text-gray-600 bg-gray-100 p-3 rounded">
                <summary className="cursor-pointer font-medium">Error Details</summary>
                <pre className="mt-2 whitespace-pre-wrap">{error?.toString()}</pre>
              </details>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
