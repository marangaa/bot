import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skill } from '@/types/portfolio';

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold">{skill.name}</h4>
          <Badge variant="outline" className="mt-1">
            {skill.category}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Level</span>
            <span>{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">{skill.description}</p>
        
        <div className="text-xs text-muted-foreground">
          {skill.yearsOfExperience} years experience
        </div>
      </div>
    </Card>
  );
}
