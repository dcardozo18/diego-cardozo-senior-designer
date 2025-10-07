
'use client';

import Image from 'next/image';
import { ExternalLink, Briefcase, Compass, Wrench, ArrowRight } from 'lucide-react';
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
        <div className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:shadow-primary/20 bg-card border border-border/50">
           <div className="aspect-video overflow-hidden">
            <Image
                src={project.imageUrl}
                alt={project.name}
                width={600}
                height={400}
                data-ai-hint={project.imageHint}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
           </div>
          <div className="p-6">
            <p className="text-sm text-muted-foreground">{project.industry}</p>
            <h3 className="text-xl font-bold text-foreground mt-2">{project.name}</h3>
            <div className="mt-4 flex items-center text-primary font-semibold text-sm">
               <span className="underline">View Details</span>
               <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-card text-card-foreground border-border">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-primary">{project.name}</DialogTitle>
          <p className="text-muted-foreground">{project.client} / {project.industry}</p>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 max-h-[80vh] overflow-y-auto">
            <div>
                 <div className="relative mb-6 aspect-video overflow-hidden rounded-lg border">
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
                    <Compass className="h-6 w-6 shrink-0 text-primary" />
                    <div>
                        <h4 className="font-semibold text-lg">Goal</h4>
                        <p className="text-muted-foreground">{project.goal}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Briefcase className="h-6 w-6 shrink-0 text-primary" />
                    <div>
                        <h4 className="font-semibold text-lg">Role</h4>
                        <p className="text-muted-foreground">{project.role}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Wrench className="h-6 w-6 shrink-0 text-primary" />
                    <div>
                        <h4 className="font-semibold text-lg">Tools</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tools.map(tool => (
                                <Badge key={tool} variant="secondary">{tool}</Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {project.liveSiteUrl && (
                     <Button asChild className="mt-4 rounded-full">
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
