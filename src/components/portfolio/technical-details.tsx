import React from 'react';
import { motion } from 'framer-motion';
import { Code2, GitBranch, Bug, Lightbulb } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/lib/portfolio/data';
import { TechnicalDetails as TechnicalDetailsType } from '@/types/portfolio';

interface ProjectTechnicalDetails {
  technicalDetails: TechnicalDetailsType;
  relatedProjects: string[];
}

interface TechnicalDetailsProps {
  projectId: string;
}

export function TechnicalDetails({ projectId }: TechnicalDetailsProps) {
  const [details, setDetails] = React.useState<ProjectTechnicalDetails | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDetails = async () => {
      try {
        // First try to get detailed info from the API
        const response = await fetch(`/api/projects/${projectId}/technical`);
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching technical details:', error);
        // Fallback to basic project info if API fails
        const project = projects.find(p => p.id === projectId);
        if (project) {
          setDetails({
            technicalDetails: {
              architecture: project.longDescription || 'Technical details not available',
              challenges: [],
              solutions: [],
            },
            relatedProjects: [],
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [projectId]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4 mt-4">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-2/3" />
      </div>
    );
  }

  if (!details) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 space-y-4"
    >
      {/* Architecture Section */}
      <Card className="bg-card/50 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Code2 className="h-4 w-4 mr-2" />
            Architecture & Implementation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>{details.technicalDetails.architecture}</p>
        </CardContent>
      </Card>

      {/* Challenges Section */}
      {details.technicalDetails.challenges.length > 0 && (
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bug className="h-4 w-4 mr-2" />
              Technical Challenges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {details.technicalDetails.challenges.map((challenge: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-2 text-sm"
                >
                  <span className="text-muted-foreground">•</span>
                  <span>{challenge}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Solutions Section */}
      {details.technicalDetails.solutions.length > 0 && (
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Lightbulb className="h-4 w-4 mr-2" />
              Solutions & Approaches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {details.technicalDetails.solutions.map((solution: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-2 text-sm"
                >
                  <span className="text-muted-foreground">•</span>
                  <span>{solution}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Related Projects */}
      {details.relatedProjects?.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <GitBranch className="h-4 w-4 mr-2" />
            Related Projects
          </h4>
          <div className="flex flex-wrap gap-2">
            {details.relatedProjects.map((relatedId: string) => {
              const relatedProject = projects.find(p => p.id === relatedId);
              if (!relatedProject) return null;
              return (
                <Badge
                  key={relatedId}
                  variant="secondary"
                  className="bg-primary/5 hover:bg-primary/10 cursor-pointer"
                >
                  {relatedProject.title}
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}