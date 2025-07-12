'use client';

import { ArrowLeft, Sparkles, FileText, Download, Eye, BarChart3, Maximize2, User, Palette } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import JobAnalysisPanel from './components/job-analysis-panel';
import PersonalInfoPanel from './components/personal-info-panel';
import ResumePreview from './components/resume-preview-new';
import { TemplateSelection } from '@/components/resume/template-selection';
import PdfExportControls from './components/pdf-export-controls';
import Link from 'next/link';
import { useResumeBuilderStore } from '@/lib/resume-builder-store';
import { TabId } from '@/types/resume';

export default function ResumeBuilder() {
  const {
    jobDescription,
    analysis,
    resumeData,
    selectedTemplate,
    companyName,
    loading,
    step,
    activeTab,
    setJobDescription,
    setAnalysis,
    setResumeData,
    setSelectedTemplate,
    setLoading,
    setStep,
    setActiveTab,
    reset
  } = useResumeBuilderStore();

  const analyzeJob = async () => {
    if (!jobDescription.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/admin/resume/analyze-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data.analysis);
        setStep('analysis');
        setActiveTab('analysis');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateResume = async () => {
    if (!analysis) return;
    
    setLoading(true);
    try {
      const { personalInfo } = useResumeBuilderStore.getState();
      const response = await fetch('/api/admin/resume/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          jobDescription, 
          analysis,
          template: selectedTemplate,
          personalInfo: personalInfo
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResumeData(data.resume);
        setStep('generation');
        setActiveTab('preview');
      }
    } catch (error) {
      console.error('Resume generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const startOver = () => {
    reset();
  };

  const tabs = [
    {
      id: 'input',
      label: 'Job Input',
      icon: FileText,
      disabled: false,
      completed: !!analysis
    },
    {
      id: 'analysis',
      label: 'Analysis',
      icon: BarChart3,
      disabled: !analysis,
      completed: !!resumeData
    },
    {
      id: 'template',
      label: 'Template',
      icon: Palette,
      disabled: !analysis,
      completed: !!selectedTemplate
    },
    {
      id: 'personal',
      label: 'Personal Info',
      icon: User,
      disabled: !analysis,
      completed: false
    },
    {
      id: 'preview',
      label: 'Preview',
      icon: Eye,
      disabled: !resumeData,
      completed: false
    },
    {
      id: 'export',
      label: 'Export',
      icon: Download,
      disabled: !resumeData,
      completed: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold">AI Resume Builder</h1>
          </div>
        </div>

        {step !== 'input' && (
          <Button onClick={startOver} variant="outline" size="sm">
            Start New Resume
          </Button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            const isDisabled = tab.disabled;
            
            return (
              <button
                key={tab.id}
                onClick={() => !isDisabled && setActiveTab(tab.id as TabId)}
                disabled={isDisabled}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : isDisabled
                    ? 'border-transparent text-gray-400 cursor-not-allowed'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.label}
                {tab.completed && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Job Input Tab */}
        {activeTab === 'input' && (
          <div className="space-y-6">
            {/* Header Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Job Description</h2>
                  <Badge variant="outline" className="text-xs">
                    Step 1 of 6
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {companyName && (
                    <Badge variant="secondary">
                      {companyName}
                    </Badge>
                  )}
                  <Maximize2 className="w-4 h-4" />
                  Full-width editor
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Paste the complete job description for best analysis results. The AI will automatically extract the company name and analyze requirements.
              </p>
            </Card>

            {/* Textarea Card */}
            <Card className="p-8">
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here...
                    Example:
                    Software Engineer - Frontend Development
                    Google

                    We are looking for a talented Frontend Developer to join our team...

                    Requirements:
                    - 3+ years of React experience
                    - TypeScript proficiency
                    - Experience with modern build tools..."
                className="min-h-[500px] resize-none text-sm border-0 shadow-none p-0 focus-visible:ring-0 bg-transparent"
                style={{ fontSize: '14px', lineHeight: '1.6' }}
              />
            </Card>

            {/* Action Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Ready to analyze?</p>
                  <p className="text-xs text-muted-foreground">
                    {jobDescription.length} characters • {jobDescription.split(/\s+/).filter(Boolean).length} words
                  </p>
                </div>
                
                <Button 
                  onClick={analyzeJob}
                  disabled={!jobDescription.trim() || loading}
                  size="lg"
                  className="px-8"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Analyze Job
                    </div>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && analysis && (
          <JobAnalysisPanel 
            analysis={analysis}
            onProceed={() => setActiveTab('template')}
            loading={loading}
          />
        )}

        {/* Template Selection Tab */}
        {activeTab === 'template' && analysis && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Select Resume Template</h2>
                  <Badge variant="outline" className="text-xs">
                    Step 3 of 6
                  </Badge>
                </div>
                <Button 
                  onClick={generateResume}
                  disabled={!selectedTemplate || loading}
                  size="sm"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </div>
                  ) : (
                    'Continue to Resume'
                  )}
                </Button>
              </div>
              
              <TemplateSelection
                selectedTemplateId={selectedTemplate}
                onTemplateSelect={setSelectedTemplate}
              />
            </Card>
          </div>
        )}

        {/* Personal Info Tab */}
        {activeTab === 'personal' && analysis && (
          <PersonalInfoPanel />
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && resumeData && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold">Resume Preview</h2>
                <Badge variant="secondary">
                  Template: {selectedTemplate}
                </Badge>
              </div>
              <Button onClick={() => setActiveTab('export')} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
            <ResumePreview 
              data={resumeData}
              template={selectedTemplate}
            />
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && resumeData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <PdfExportControls 
                resumeData={resumeData}
                template={selectedTemplate}
              />
            </div>
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Resume Summary</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Match Score</div>
                      <div className="text-xl font-bold text-blue-600">
                        {analysis?.fitScore}%
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Template</div>
                      <div className="text-lg font-semibold capitalize">
                        {selectedTemplate}
                      </div>
                    </div>
                  </div>

                  {companyName && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-800 font-medium">Target Company</div>
                      <div className="text-lg font-semibold text-blue-900">{companyName}</div>
                      <div className="text-xs text-blue-600 mt-1">
                        Automatically detected from job description
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Key Optimizations Applied</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {analysis?.keyOptimizations.slice(0, 3).map((opt, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></span>
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Empty State for disabled tabs */}
        {((activeTab === 'analysis' && !analysis) ||
          (activeTab === 'template' && !analysis) || 
          (activeTab === 'personal' && !analysis) ||
          (activeTab === 'preview' && !resumeData) || 
          (activeTab === 'export' && !resumeData)) && (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Complete Previous Steps</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'analysis' && 'Analyze a job description first'}
                  {activeTab === 'template' && 'Analyze a job description first'}
                  {activeTab === 'personal' && 'Analyze a job description first'}
                  {activeTab === 'preview' && 'Generate your resume to see the preview'}
                  {activeTab === 'export' && 'Generate your resume to export as PDF'}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
