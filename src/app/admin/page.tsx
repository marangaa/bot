'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useResumeBuilderStore } from '@/lib/resume-builder-store';

export default function AdminDashboard() {
  const { 
    jobDescription, 
    analysis, 
    resumeData, 
    companyName, 
    step,
    getProgressPercentage
  } = useResumeBuilderStore();

  // Calculate stats from current session
  const hasJobDescription = !!jobDescription.trim();
  const hasAnalysis = !!analysis;
  const hasResume = !!resumeData;
  const currentFitScore = analysis?.fitScore || 0;
  const progressPercentage = getProgressPercentage();
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">AI Resume Builder</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate tailored, ATS-optimized resumes from job descriptions using AI
          </p>
        </div>

        {/* Current Progress */}
        {(hasJobDescription || hasAnalysis || hasResume) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="font-semibold text-blue-900">Resume in Progress</h3>
                <div className="flex items-center gap-2 mt-1">
                  {companyName && companyName !== 'job' && (
                    <Badge variant="secondary">{companyName}</Badge>
                  )}
                  <span className="text-sm text-blue-700">
                    {step === 'input' && 'Job description ready'}
                    {step === 'analysis' && 'Analysis completed'}
                    {step === 'generation' && 'Resume generated'}
                    {step === 'export' && 'Ready for export'}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-200 rounded-full h-2 flex-1 max-w-32">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-blue-600 font-medium">
                      {progressPercentage}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                {hasAnalysis && (
                  <div className="text-2xl font-bold text-blue-600">
                    {currentFitScore}%
                  </div>
                )}
                <div className="text-xs text-blue-600">
                  {hasAnalysis ? 'Job Match' : 'Processing'}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <Link href="/admin/resume-builder">
          <Button size="lg" className="text-lg px-8 py-4">
            {hasJobDescription ? 'Continue Building' : 'Start Building Resume'}
          </Button>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="p-6 text-center border-dashed">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-6 h-6 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
              />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Smart Analysis</h3>
          <p className="text-sm text-muted-foreground">
            AI analyzes job requirements and calculates your fit score
          </p>
        </Card>

        <Card className="p-6 text-center border-dashed">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-6 h-6 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">ATS Optimized</h3>
          <p className="text-sm text-muted-foreground">
            Resumes formatted to pass applicant tracking systems
          </p>
        </Card>

        <Card className="p-6 text-center border-dashed">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-6 h-6 text-purple-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">PDF Export</h3>
          <p className="text-sm text-muted-foreground">
            Professional PDFs ready for immediate application
          </p>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        <div className="text-center">
          <div className={`text-3xl font-bold ${hasResume ? 'text-green-600' : 'text-blue-600'}`}>
            {hasResume ? '1' : '0'}
          </div>
          <div className="text-sm text-muted-foreground">Resumes</div>
        </div>
        <div className="text-center">
          <div className={`text-3xl font-bold ${hasAnalysis ? 'text-green-600' : 'text-blue-600'}`}>
            {hasAnalysis ? '1' : '0'}
          </div>
          <div className="text-sm text-muted-foreground">Jobs Analyzed</div>
        </div>
        <div className="text-center">
          <div className={`text-3xl font-bold ${hasAnalysis ? 'text-green-600' : 'text-blue-600'}`}>
            {currentFitScore}%
          </div>
          <div className="text-sm text-muted-foreground">Current Fit</div>
        </div>
        <div className="text-center">
          <div className={`text-3xl font-bold ${progressPercentage === 100 ? 'text-green-600' : 'text-blue-600'}`}>
            {progressPercentage}%
          </div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>
    </div>
  );
}
