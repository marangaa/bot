import React from 'react';
import { ResumeDocumentProps } from '@/types/resume';
import { getTemplate } from './templates';

/**
 * Creates a resume document using the specified template
 * Returns a React Document element that can be rendered to PDF
 */
export function createResumeDocument(props: ResumeDocumentProps) {
  const { templateId = 'modern', data, personalInfo } = props;
  
  const template = getTemplate(templateId);
  if (!template) {
    throw new Error(`Template with ID "${templateId}" not found. Available templates: modern, creative, minimal, executive`);
  }
  
  const TemplateComponent = template.component;
  return React.createElement(TemplateComponent, { data, personalInfo });
}
