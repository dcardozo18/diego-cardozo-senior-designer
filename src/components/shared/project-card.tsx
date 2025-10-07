
'use client';

import Image from 'next/image';
import { ExternalLink, Briefcase, Target, Wrench, Compass } from 'lucide-react';
import type { Project } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';


interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-primary/20">
          <Image
            src={project.imageUrl}
            alt={project.name}
            width={600}
            height={400}
            data-ai-hint={project.imageHint}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white">{project.name}</h3>
            <p className="text-sm text-gray-300">{project.client} / {project.industry}</p>
            <div className="mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
               <p className="text-sm font-semibold text-primary">View Details →</p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-primary">{project.name}</DialogTitle>
          <p className="text-muted-foreground">{project.client} / {project.industry}</p>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            <div>
                 <div className="relative mb-6 aspect-video overflow-hidden rounded-lg">
                    <Image
                        src={project.imageUrl}
                        alt={project.name}
                        fill
                        className="object-cover"
                        data-ai-hint={project.imageHint}
                    />
                </div>
                <p className="text-muted-foreground">{project.description}</p>
            </div>
            <div className="flex flex-col gap-6">
                
                <div className="flex items-start gap-4">
                    <Compass className="h-6 w-6 shrink-0 text-accent" />
                    <div>
                        <h4 className="font-semibold text-lg">Goal</h4>
                        <p className="text-muted-foreground">{project.goal}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Briefcase className="h-6 w-6 shrink-0 text-accent" />
                    <div>
                        <h4 className="font-semibold text-lg">Role</h4>
                        <p className="text-muted-foreground">{project.role}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Wrench className="h-6 w-6 shrink-0 text-accent" />
                    <div>
                        <h4 className="font-semibold text-lg">Tools</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tools.map(tool => (
                                <Badge key={tool} variant="secondary" className="px-2 py-1">{tool}</Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {project.liveSiteUrl && (
                     <Button asChild className="mt-4">
                        <a href={project.liveSiteUrl} target="_blank" rel="noopener noreferrer">
                            View Live Site <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                )}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCard;
