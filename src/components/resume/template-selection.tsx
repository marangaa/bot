'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Palette, Layout, Crown, Minimize2 } from 'lucide-react';
import { getAllTemplates, getTemplate, TemplateInfo } from '@/lib/resume/templates';

interface TemplateCardProps {
  template: TemplateInfo;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
  onPreview?: (templateId: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  isSelected, 
  onSelect 
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'professional': return <Layout className="w-5 h-5" />;
      case 'creative': return <Palette className="w-5 h-5" />;
      case 'minimal': return <Minimize2 className="w-5 h-5" />;
      case 'executive': return <Crown className="w-5 h-5" />;
      default: return <Layout className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'professional': return 'text-blue-600';
      case 'creative': return 'text-purple-600';
      case 'minimal': return 'text-gray-600';
      case 'executive': return 'text-amber-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div 
      className={`group relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
        isSelected 
          ? 'border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/10' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={() => onSelect(template.id)}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <Check className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Template Icon & Name */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg bg-gray-50 ${getCategoryColor(template.category)}`}>
          {getCategoryIcon(template.category)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{template.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{template.category}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {template.description}
      </p>

      {/* Key Features - Simple list */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {template.features.slice(0, 2).map((feature, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Best For - Single line */}
      <div className="text-xs text-gray-500 mb-6">
        Best for: {template.bestFor.slice(0, 2).join(', ')}
      </div>

      {/* Action - Simple button */}
      <Button
        variant={isSelected ? "default" : "outline"}
        size="sm"
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(template.id);
        }}
      >
        {isSelected ? (
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            Selected
          </div>
        ) : (
          'Select Template'
        )}
      </Button>
    </div>
  );
};

interface TemplateSelectionProps {
  selectedTemplateId: string;
  onTemplateSelect: (templateId: string) => void;
  onTemplatePreview?: (templateId: string) => void;
}

export const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  selectedTemplateId,
  onTemplateSelect,
  onTemplatePreview
}) => {
  const templates = getAllTemplates();
  const selectedTemplate = getTemplate(selectedTemplateId);

  return (
    <div className="space-y-8">
      {/* Simple Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Template</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a professional resume template that matches your style and industry. 
          All templates are ATS-optimized and recruiter-friendly.
        </p>
        {selectedTemplate && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
            <Check className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              {selectedTemplate.name} Selected
            </span>
          </div>
        )}
      </div>

      {/* Clean Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplateId === template.id}
            onSelect={onTemplateSelect}
            onPreview={onTemplatePreview}
          />
        ))}
      </div>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Not sure which template to choose? The <strong>Professional</strong> template works well for most industries.
        </p>
      </div>
    </div>
  );
};
