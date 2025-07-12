'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, FileText, Sparkles } from 'lucide-react';
import { useResumeBuilderStore } from '@/lib/resume-builder-store';
import React from 'react';
import { GeneratedResumeResponse, Experience, Project, Education } from '@/types/resume';

interface ResumePreviewProps {
  data: GeneratedResumeResponse;
  template: string;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const { personalInfo } = useResumeBuilderStore();
  
  // Use personal info directly from store, and resume data from generated response
  const resumeData = data.data || data;
  const personalData = personalInfo; // Always use store data

  // Format dates consistently
  const formatDateRange = (dateStr: string) => {
    if (!dateStr) return '';
    if (dateStr.includes(' - ')) {
      const [start, end] = dateStr.split(' - ');
      return `${start} – ${end}`;
    }
    return dateStr;
  };

  return (
    <div className="space-y-4">
      {/* Preview Header */}
      <div className="flex items-center gap-2">
        <Eye className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Resume Preview</h2>
        <Badge variant="secondary" className="ml-auto">
          <Sparkles className="w-3 h-3 mr-1" />
          {template} Template
        </Badge>
      </div>

      {/* HTML Preview - No CSP Issues */}
      <Card className="p-8 bg-white shadow-lg border-0">
        <div className="max-w-none mx-auto space-y-8" style={{ 
          fontFamily: 'system-ui, -apple-system, sans-serif', 
          fontSize: '11pt', 
          lineHeight: '1.5',
          color: '#1f2937'
        }}>
          
          {/* Header */}
          <div className={`text-center pb-6 ${
            template === 'professional' ? 'bg-blue-600 text-white p-6 -m-8 mb-6' :
            template === 'minimal' ? 'border-b border-gray-200' :
            template === 'executive' ? 'bg-gray-900 text-white p-6 -m-8 mb-6' :
            'border-b-2 border-blue-500'
          }`}>
            <h1 className={`font-bold mb-3 ${
              template === 'minimal' ? 'text-2xl text-gray-900 tracking-wide' :
              'text-3xl'
            }`}>
              {template === 'minimal' 
                ? (personalData.fullName || personalData.name || 'your name').toLowerCase()
                : personalData.fullName || personalData.name || 'Your Name'
              }
            </h1>
            <div className={`flex justify-center items-center gap-4 text-sm flex-wrap ${
              template === 'professional' || template === 'executive' ? 'text-white' :
              template === 'minimal' ? 'text-gray-600' :
              'text-gray-600'
            }`}>
              <span>{personalData.email || 'your.email@example.com'}</span>
              <span>•</span>
              <span>{personalData.phone || '+1 (555) 123-4567'}</span>
              <span>•</span>
              <span>{personalData.location || 'Your City, Country'}</span>
              {personalData.linkedIn && (
                <>
                  <span>•</span>
                  <span>LinkedIn</span>
                </>
              )}
              {personalData.portfolio && (
                <>
                  <span>•</span>
                  <span>Portfolio</span>
                </>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className={`font-bold mb-3 ${
              template === 'professional' ? 'text-lg text-blue-600 uppercase tracking-wide border-b border-blue-300 pb-1' :
              template === 'minimal' ? 'text-sm text-gray-700 border-b border-gray-200 pb-2' :
              template === 'executive' ? 'text-lg text-gray-900 border-b-2 border-gray-300 pb-1' :
              'text-lg text-gray-900 border-b border-gray-300 pb-1'
            }`}>
              {template === 'minimal' ? 'about' : 
               template === 'professional' ? 'Executive Summary' :
               'Professional Summary'}
            </h2>
            <p className={`leading-relaxed ${
              template === 'minimal' ? 'text-sm text-gray-600' :
              'text-gray-700'
            }`}>
              {resumeData.summary || 'Professional summary will appear here when generated.'}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h2 className={`font-bold mb-3 ${
              template === 'professional' ? 'text-lg text-blue-600 uppercase tracking-wide border-b border-blue-300 pb-1' :
              template === 'minimal' ? 'text-sm text-gray-700 border-b border-gray-200 pb-2' :
              template === 'executive' ? 'text-lg text-gray-900 border-b-2 border-gray-300 pb-1' :
              'text-lg text-gray-900 border-b border-gray-300 pb-1'
            }`}>
              {template === 'minimal' ? 'skills' : 'Technical Skills'}
            </h2>
            <div className="space-y-2">
              {Array.isArray(resumeData.skills) ? (
                <div className={`${
                  template === 'minimal' ? 'text-sm text-gray-600' : 'text-gray-700'
                }`}>
                  {resumeData.skills.join(' • ')}
                </div>
              ) : (
                <div className={`${
                  template === 'minimal' ? 'text-sm text-gray-600' : 'text-gray-700'
                }`}>
                  Your skills will appear here when resume is generated
                </div>
              )}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className={`font-bold mb-4 ${
              template === 'professional' ? 'text-lg text-blue-600 uppercase tracking-wide border-b border-blue-300 pb-1' :
              template === 'minimal' ? 'text-sm text-gray-700 border-b border-gray-200 pb-2' :
              template === 'executive' ? 'text-lg text-gray-900 border-b-2 border-gray-300 pb-1' :
              'text-lg text-gray-900 border-b border-gray-300 pb-1'
            }`}>
              {template === 'minimal' ? 'experience' : 'Professional Experience'}
            </h2>
            <div className="space-y-6">
              {resumeData.experiences && resumeData.experiences.length > 0 ? (
                resumeData.experiences.map((exp: Experience, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`font-bold ${
                          template === 'minimal' ? 'text-sm text-gray-900' : 'text-base text-gray-900'
                        }`}>
                          {template === 'minimal' ? exp.title?.toLowerCase() : exp.title}
                        </h3>
                        <p className={`font-medium ${
                          template === 'minimal' ? 'text-sm text-gray-600' : 'text-base text-gray-700'
                        }`}>
                          {template === 'minimal' ? exp.company?.toLowerCase() : exp.company}
                        </p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>{formatDateRange(exp.period || exp.duration || '')}</div>
                        <div>{exp.location || personalData.location}</div>
                      </div>
                    </div>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className={`list-disc list-inside space-y-1 ml-4 ${
                        template === 'minimal' ? 'text-sm text-gray-600' : 'text-gray-700'
                      }`}>
                        {exp.highlights.map((highlight: string, i: number) => (
                          <li key={i} className="leading-relaxed">
                            {template === 'minimal' ? highlight.toLowerCase() : highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">
                  Your experience will appear here when resume is generated
                </div>
              )}
            </div>
          </div>

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <div>
              <h2 className={`font-bold mb-4 ${
                template === 'professional' ? 'text-lg text-blue-600 uppercase tracking-wide border-b border-blue-300 pb-1' :
                template === 'minimal' ? 'text-sm text-gray-700 border-b border-gray-200 pb-2' :
                template === 'executive' ? 'text-lg text-gray-900 border-b-2 border-gray-300 pb-1' :
                'text-lg text-gray-900 border-b border-gray-300 pb-1'
              }`}>
                {template === 'minimal' ? 'projects' : 'Key Projects'}
              </h2>
              <div className="space-y-4">
                {resumeData.projects.slice(0, 3).map((project: Project, index: number) => (
                  <div key={index}>
                    <h3 className={`font-bold mb-1 ${
                      template === 'minimal' ? 'text-sm text-gray-900' : 'text-base text-gray-900'
                    }`}>
                      {template === 'minimal' 
                        ? (project.name || project.title || 'untitled project').toLowerCase()
                        : project.name || project.title || 'Project Name'
                      }
                    </h3>
                    <p className={`mb-2 leading-relaxed ${
                      template === 'minimal' ? 'text-sm text-gray-600' : 'text-gray-700'
                    }`}>
                      {template === 'minimal' ? project.description?.toLowerCase() : project.description}
                    </p>
                    <p className={`${
                      template === 'minimal' ? 'text-xs text-gray-500' : 'text-sm text-gray-600'
                    }`}>
                      <span className="font-medium">Technologies:</span> {
                        template === 'minimal' 
                          ? project.technologies?.join(', ').toLowerCase()
                          : project.technologies?.join(', ')
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <h2 className={`font-bold mb-4 ${
                template === 'professional' ? 'text-lg text-blue-600 uppercase tracking-wide border-b border-blue-300 pb-1' :
                template === 'minimal' ? 'text-sm text-gray-700 border-b border-gray-200 pb-2' :
                template === 'executive' ? 'text-lg text-gray-900 border-b-2 border-gray-300 pb-1' :
                'text-lg text-gray-900 border-b border-gray-300 pb-1'
              }`}>
                {template === 'minimal' ? 'education' : 'Education'}
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu: Education, index: number) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-bold ${
                        template === 'minimal' ? 'text-sm text-gray-900' : 'text-base text-gray-900'
                      }`}>
                        {template === 'minimal' ? edu.degree?.toLowerCase() : edu.degree}
                      </h3>
                      <p className={`${
                        template === 'minimal' ? 'text-sm text-gray-600' : 'text-base text-gray-700'
                      }`}>
                        {template === 'minimal' ? edu.institution?.toLowerCase() : edu.institution}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div>{`${edu.startDate} - ${edu.endDate || 'Present'}`}</div>
                      <div>{edu.location || personalData.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </Card>

      {/* Preview Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span>Live preview of {template} template with AI-generated content</span>
        </div>
        <div className="text-right">
          <span className="font-medium">Ready for PDF export</span>
        </div>
      </div>
    </div>
  );
}
