'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrendingUp, AlertTriangle, CheckCircle, Lightbulb, Target, Building, Briefcase } from 'lucide-react';

interface JobAnalysis {
  fitScore: number;
  recommendation: 'apply' | 'skip' | 'maybe';
  requiredSkills: string[];
  missingSkills: string[];
  keyOptimizations: string[];
  reasoning: string;
  companyInfo?: {
    name: string;
    industry?: string;
    size?: string;
  };
  roleDetails?: {
    level: string;
    department?: string;
    responsibilities: string[];
  };
}

interface JobAnalysisPanelProps {
  analysis: JobAnalysis;
  onProceed: () => void;
  loading: boolean;
}

export default function JobAnalysisPanel({ analysis, onProceed, loading }: JobAnalysisPanelProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getRecommendationConfig = (rec: string) => {
    switch (rec) {
      case 'apply': 
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          icon: CheckCircle,
          text: 'APPLY NOW'
        };
      case 'maybe': 
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
          icon: AlertTriangle,
          text: 'CONSIDER'
        };
      case 'skip': 
        return { 
          color: 'bg-red-100 text-red-800 border-red-200', 
          icon: AlertTriangle,
          text: 'SKIP'
        };
      default: 
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          icon: AlertTriangle,
          text: 'UNKNOWN'
        };
    }
  };

  const recConfig = getRecommendationConfig(analysis.recommendation);
  const RecommendationIcon = recConfig.icon;

  return (
    <div className="h-full flex flex-col">
      <Card className="p-6 flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-4 flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Job Analysis</h2>
        </div>
        
        {/* Key Metrics - Fixed Header */}
        <div className="grid grid-cols-2 gap-4 mb-6 flex-shrink-0">
          {/* Fit Score */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Match Score</span>
            </div>
            <div className="space-y-2">
              <span className={`text-2xl font-bold ${getScoreColor(analysis.fitScore)}`}>
                {analysis.fitScore}%
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${getScoreBgColor(analysis.fitScore)}`}
                  style={{ width: `${analysis.fitScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Recommendation</span>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-medium text-xs ${recConfig.color}`}>
              <RecommendationIcon className="w-3 h-3" />
              {recConfig.text}
            </div>
          </div>
        </div>

        {/* Company & Role Info - Fixed */}
        {(analysis.companyInfo || analysis.roleDetails) && (
          <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/30 rounded-lg flex-shrink-0">
            {analysis.companyInfo && (
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Building className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Company</span>
                </div>
                <div className="text-sm font-medium">{analysis.companyInfo.name}</div>
                {analysis.companyInfo.industry && (
                  <div className="text-xs text-muted-foreground">{analysis.companyInfo.industry}</div>
                )}
              </div>
            )}
            {analysis.roleDetails && (
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Role</span>
                </div>
                <div className="text-sm font-medium capitalize">{analysis.roleDetails.level} Level</div>
                {analysis.roleDetails.department && (
                  <div className="text-xs text-muted-foreground">{analysis.roleDetails.department}</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Scrollable Content Area */}
        <div className="flex-1 min-h-0 -mx-2">
          <ScrollArea className="h-full px-2">
            <div className="space-y-4 pr-3">
              {/* Skills Analysis */}
              <div className="space-y-3">
                {/* Required Skills */}
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    Required ({analysis.requiredSkills.length})
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {analysis.requiredSkills.slice(0, 6).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border-green-200">
                        {skill}
                      </Badge>
                    ))}
                    {analysis.requiredSkills.length > 6 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        +{analysis.requiredSkills.length - 6}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Missing Skills */}
                {analysis.missingSkills.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                      Missing ({analysis.missingSkills.length})
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {analysis.missingSkills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="destructive" className="text-xs px-2 py-0.5 bg-red-50 text-red-700 border-red-200">
                          {skill}
                        </Badge>
                      ))}
                      {analysis.missingSkills.length > 4 && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5">
                          +{analysis.missingSkills.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* AI Analysis - Scrollable */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">AI Analysis</h3>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground leading-relaxed">{analysis.reasoning}</p>
                </div>
              </div>

              {/* Optimization Tips */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Lightbulb className="w-3 h-3 text-yellow-600" />
                  Key Tips
                </h3>
                <div className="space-y-1">
                  {analysis.keyOptimizations.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/30 transition-colors">
                      <div className="w-1 h-1 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Action Button - Fixed at bottom */}
        <div className="pt-4 mt-4 border-t flex-shrink-0">
          <Button 
            onClick={onProceed}
            disabled={loading}
            className="w-full"
            size="lg"
            variant={analysis.recommendation === 'skip' ? 'outline' : 'default'}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating Resume...
              </div>
            ) : (
              'Generate Tailored Resume'
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
