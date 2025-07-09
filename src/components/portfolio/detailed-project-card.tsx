import React from 'react';
import { ExternalLink, Github, Calendar, MapPin, Users, Lightbulb, Target, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Project } from '@/types/portfolio';

interface DetailedProjectCardProps {
  project: Project;
}

export function DetailedProjectCard({ project }: DetailedProjectCardProps) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card className="p-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(project.createdAt)}
                  {project.updatedAt && ` - ${formatDate(project.updatedAt)}`}
                </div>
                <Badge variant="outline">{project.category}</Badge>
                {project.featured && <Badge variant="default">Featured</Badge>}
              </div>
            </div>
            <div className="flex gap-2">
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-lg text-muted-foreground">{project.description}</p>
            {project.longDescription && (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-sm leading-relaxed">{project.longDescription}</p>
              </div>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        {project.technicalDetails && (
          <div className="space-y-6">
            {/* Architecture */}
            {project.technicalDetails.architecture && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Architecture & Approach
                </h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm leading-relaxed">{project.technicalDetails.architecture}</p>
                </div>
              </div>
            )}

            {/* Challenges & Solutions */}
            <div className="grid md:grid-cols-2 gap-6">
              {project.technicalDetails.challenges && project.technicalDetails.challenges.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Key Challenges
                  </h3>
                  <div className="space-y-2">
                    {project.technicalDetails.challenges.map((challenge, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Target className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                        <span className="leading-relaxed">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.technicalDetails.solutions && project.technicalDetails.solutions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Solutions Implemented
                  </h3>
                  <div className="space-y-2">
                    {project.technicalDetails.solutions.map((solution, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                        <span className="leading-relaxed">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          {project.liveUrl && (
            <Button asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Explore Live Demo
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View Source Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
