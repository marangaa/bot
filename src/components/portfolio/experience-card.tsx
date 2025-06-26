import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Experience } from '@/types/portfolio';

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const formatDate = (date: string | Date) => {
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    }
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{experience.title}</h3>
          <div className="flex items-center gap-4 text-muted-foreground mt-1">
            <span className="font-medium">{experience.company}</span>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="text-sm">{experience.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <Calendar className="h-3 w-3" />
            <span>
              {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
            </span>
          </div>
        </div>
        
        <p className="text-muted-foreground">{experience.description}</p>
        
        {experience.achievements && experience.achievements.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Key Achievements</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {experience.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        
        <Badge variant="outline" className="w-fit">
          {experience.type}
        </Badge>
      </div>
    </Card>
  );
}
