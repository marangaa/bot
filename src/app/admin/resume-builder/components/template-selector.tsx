'use client';

import { Badge } from '@/components/ui/badge';
import { Palette, CheckCircle, Star, Code, Briefcase } from 'lucide-react';

interface TemplateSelectorProps {
  selected: string;
  onSelect: (template: string) => void;
}

const templates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean, ATS-friendly design',
    preview: 'Classic layout with clear sections',
    icon: Briefcase,
    badge: 'Recommended',
    badgeColor: 'bg-green-100 text-green-800'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with subtle colors',
    preview: 'Modern layout with visual elements',
    icon: Palette,
    badge: 'Popular',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Optimized for engineering roles',
    preview: 'Code-focused with project highlights',
    icon: Code,
    badge: 'Developer',
    badgeColor: 'bg-purple-100 text-purple-800'
  }
];

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {templates.map((template) => {
          const IconComponent = template.icon;
          const isSelected = selected === template.id;
          
          return (
            <div
              key={template.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onSelect(template.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <IconComponent className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{template.name}</h3>
                    <Badge className={`text-xs ${template.badgeColor}`}>
                      {template.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{template.description}</p>
                  <p className="text-xs text-muted-foreground">{template.preview}</p>
                </div>
                
                <div className="flex items-center">
                  {isSelected ? (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <Star className="w-3 h-3 inline mr-1" />
          All templates are ATS-optimized and recruiter-friendly
        </p>
      </div>
    </div>
  );
}
