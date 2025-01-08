import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Experience } from '@/types/portfolio';
import { experiences } from '@/lib/portfolio/data';

interface ExperienceCardProps {
  experienceId?: string;
  experience?: Experience;
}

export function ExperienceCard({ experienceId, experience: propExperience }: ExperienceCardProps) {
  const experience = experienceId 
    ? experiences.find(e => e.id === experienceId)
    : propExperience;

  if (!experience) {
    return null;
  }

  const formatDate = (date: Date | string) => {
    // Ensure we have a valid Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Check if date is valid before formatting
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
    }).format(dateObj);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <Card className="bg-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-bold">{experience.title}</CardTitle>
              <CardDescription className="flex items-center mt-1 space-x-2">
                <Briefcase className="w-4 h-4" />
                <span>{experience.company}</span>
                <span>•</span>
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(experience.startDate)} -{' '}
                {experience.endDate ? formatDate(experience.endDate) : 'Present'}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {experience.description}
          </p>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Key Achievements</h4>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-2 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 mt-1 text-primary" />
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {experience.technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="bg-primary/5 text-primary">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}