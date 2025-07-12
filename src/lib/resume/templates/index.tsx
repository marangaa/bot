import { ModernTemplate } from './modern-template';
import { CreativeTemplate } from './creative-template';
import { MinimalTemplate } from './minimal-template';
import { ExecutiveTemplate } from './executive-template';
import { TemplateProps } from '@/types/resume';

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  category: 'professional' | 'creative' | 'minimal' | 'executive';
  preview: string; // URL to preview image
  component: React.FC<TemplateProps>;
  features: string[];
  bestFor: string[];
}

export const resumeTemplates: Record<string, TemplateInfo> = {
  modern: {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean two-column layout with blue accent colors and modern typography',
    category: 'professional',
    preview: '/templates/modern-preview.png',
    component: ModernTemplate,
    features: [
      'Two-column layout',
      'Blue accent colors',
      'Clean typography',
      'Skills badges',
      'Professional styling'
    ],
    bestFor: [
      'Software engineers',
      'Tech professionals', 
      'Modern companies',
      'Startups',
      'Digital roles'
    ]
  },
  creative: {
    id: 'creative',
    name: 'Creative Professional',
    description: 'Vibrant card-based design with colorful accents and modern layout',
    category: 'creative',
    preview: '/templates/creative-preview.png',
    component: CreativeTemplate,
    features: [
      'Card-based design',
      'Colorful accents',
      'Modern gradients',
      'Visual hierarchy',
      'Creative styling'
    ],
    bestFor: [
      'Designers',
      'Creative professionals',
      'Marketing roles',
      'Digital agencies',
      'Creative industries'
    ]
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Ultra-clean design with subtle typography and efficient space usage',
    category: 'minimal',
    preview: '/templates/minimal-preview.png',
    component: MinimalTemplate,
    features: [
      'Ultra-clean design',
      'Minimal styling',
      'Efficient layout',
      'Easy to read',
      'ATS-friendly'
    ],
    bestFor: [
      'Traditional industries',
      'Academic roles',
      'Conservative companies',
      'Legal professionals',
      'Finance sector'
    ]
  },
  executive: {
    id: 'executive',
    name: 'Executive Leader',
    description: 'Sophisticated design with gold accents for senior leadership roles',
    category: 'executive',
    preview: '/templates/executive-preview.png',
    component: ExecutiveTemplate,
    features: [
      'Sophisticated design',
      'Gold accent colors',
      'Executive styling',
      'Leadership focus',
      'Premium appearance'
    ],
    bestFor: [
      'C-level executives',
      'Senior management',
      'Directors',
      'VPs',
      'Leadership roles'
    ]
  }
};

// Get template by ID
export const getTemplate = (templateId: string): TemplateInfo | null => {
  return resumeTemplates[templateId] || null;
};

// Get all templates
export const getAllTemplates = (): TemplateInfo[] => {
  return Object.values(resumeTemplates);
};

// Get templates by category
export const getTemplatesByCategory = (category: TemplateInfo['category']): TemplateInfo[] => {
  return Object.values(resumeTemplates).filter(template => template.category === category);
};

// Default template
export const DEFAULT_TEMPLATE = 'modern';
