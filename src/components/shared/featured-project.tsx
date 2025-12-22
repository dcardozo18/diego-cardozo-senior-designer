'use client';

import Image from 'next/image';
import { ExternalLink, Briefcase, Compass, Wrench } from 'lucide-react';
import type { Project } from '@/lib/placeholder-images';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';


interface FeaturedProjectProps {
  project: Project;
  index: number;
}

const FeaturedProject = ({ project, index }: FeaturedProjectProps) => {
    const isReversed = index % 2 !== 0;

  return (
    <div className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center",
    )}>
      <div className={cn("relative aspect-video rounded-lg shadow-2xl shadow-primary/10 overflow-hidden", isReversed && "md:order-2")}>
         <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover"
            data-ai-hint={project.imageHint}
        />
      </div>
      <div className={cn("flex flex-col gap-6", isReversed && "md:order-1")}>
        <div>
            <p className="text-primary font-semibold">{project.industry}</p>
            <h3 className="text-3xl font-bold mt-1">{project.name}</h3>
        </div>
        <p className="text-muted-foreground text-lg">{project.description}</p>
        
        <div className="flex flex-col gap-4">
             <div className="flex items-start gap-4">
                <Compass className="h-6 w-6 shrink-0 text-primary mt-1" />
                <div>
                    <h4 className="font-semibold text-lg">Goal</h4>
                    <p className="text-muted-foreground">{project.goal}</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Briefcase className="h-6 w-6 shrink-0 text-primary mt-1" />
                <div>
                    <h4 className="font-semibold text-lg">My Role</h4>
                    <p className="text-muted-foreground">{project.role}</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Wrench className="h-6 w-6 shrink-0 text-primary mt-1" />
                <div>
                    <h4 className="font-semibold text-lg">Tools</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.tools.map(tool => (
                            <Badge key={tool} variant="secondary">{tool}</Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {project.liveSiteUrl && project.liveSiteUrl !== '#' && (
            <div className="mt-2">
                <Button asChild>
                    <a href={project.liveSiteUrl} target="_blank" rel="noopener noreferrer">
                        View Live Site <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProject;
