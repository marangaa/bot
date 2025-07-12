'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, CheckCircle, Copy, Building } from 'lucide-react';
import { useResumeBuilderStore } from '@/lib/resume-builder-store';
import { GeneratedResumeResponse } from '@/types/resume';

interface PdfExportControlsProps {
  resumeData: GeneratedResumeResponse;
  template: string;
}

export default function PdfExportControls({ resumeData, template }: PdfExportControlsProps) {
  const [loading, setLoading] = useState(false);
  const [exported, setExported] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const { companyName, analysis, personalInfo } = useResumeBuilderStore();

  const generateFileName = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const name = personalInfo.fullName || 'Richard_Maranga';
    const company = companyName 
      ? companyName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')
      : 'Resume';
    return `${name.replace(/\s+/g, '_')}_${company}_${currentDate}.pdf`;
  };

  const exportPdf = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/resume/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          resumeData: resumeData.data || resumeData, 
          template,
          personalInfo: personalInfo // Always use store data
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = generateFileName();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setExported(true);
        setTimeout(() => setExported(false), 3000);
      }
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyFileName = async () => {
    await navigator.clipboard.writeText(generateFileName());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const matchScore = analysis?.fitScore || 0;

  return (
    <Card className="p-6 border-0 shadow-lg">
      {/* Header with Success State */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Resume Complete!</h2>
            <p className="text-sm text-gray-600">Professional, ATS-optimized, and ready to send</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Final Step
        </Badge>
      </div>

      {/* Key Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
        <div className="text-center">
          <div className={`text-2xl font-bold ${matchScore >= 80 ? 'text-green-600' : matchScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
            {matchScore}%
          </div>
          <div className="text-xs text-gray-600 font-medium">Job Match</div>
        </div>
        <div className="text-center border-x border-gray-200">
          <div className="text-2xl font-bold text-blue-600">ATS</div>
          <div className="text-xs text-gray-600 font-medium">Optimized</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">PDF</div>
          <div className="text-xs text-gray-600 font-medium">Ready</div>
        </div>
      </div>

      {/* Company Target Info */}
      {companyName && companyName !== 'job' && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200 mb-6">
          <Building className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">
            Tailored for: <span className="font-semibold">{companyName}</span>
          </span>
          <Badge variant="secondary" className="ml-auto text-xs">
            Auto-detected
          </Badge>
        </div>
      )}

      {/* Export Actions */}
      <div className="space-y-4">
        <Button 
          onClick={exportPdf}
          disabled={loading}
          className="w-full h-12 text-base font-medium"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating your professional PDF...</span>
            </div>
          ) : exported ? (
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span>Successfully Downloaded!</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5" />
              <span>Download Professional Resume</span>
            </div>
          )}
        </Button>

        {/* File Preview */}
        <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-900">File Preview</div>
                <div className="text-xs font-mono text-gray-600 mt-0.5">
                  {generateFileName()}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyFileName}
              className="h-8 px-2 text-xs"
            >
              {copySuccess ? (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-3 h-3" />
                  Copied
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Copy className="w-3 h-3" />
                  Copy
                </div>
              )}
            </Button>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            High-quality PDF • Professional formatting • ATS-compatible
          </div>
        </div>

        {/* Quick Tips */}
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-yellow-900 mb-1">Ready to Apply?</h4>
              <p className="text-xs text-yellow-800 leading-relaxed">
                Your resume is optimized for applicant tracking systems and formatted for professional presentation. 
                Upload the PDF directly to job portals for best results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
