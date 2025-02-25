import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { portfolioSections } from '@/lib/portfolio/data';
import { User, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function About() {
  const { about, contact } = portfolioSections;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card/50 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium flex items-center gap-2">
            <User className="h-5 w-5" />
            {about.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <div className="prose prose-neutral dark:prose-invert">
            {about.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-4 pt-6">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            asChild
          >
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            asChild
          >
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            asChild
          >
            <a href={`mailto:${contact.email}`}>
              <Mail className="h-4 w-4" />
              Email
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
