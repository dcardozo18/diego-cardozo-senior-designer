
'use client';

import Image from 'next/image';
import { ExternalLink, Briefcase, Compass, Wrench, ArrowRight, AlertTriangle, Sparkles, Trophy, Target } from 'lucide-react';
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
import { ScrollArea } from '../ui/scroll-area';


interface ProjectCardProps {
  project: Project;
  dictionary: any;
}

const ProjectCard = ({ project, dictionary }: ProjectCardProps) => {
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
               <span className="underline">{dictionary.projects.view_details}</span>
               <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card text-card-foreground border-border">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6 md:p-10">
            <DialogHeader className="mb-8">
              <Badge className="w-fit mb-2">{project.category}</Badge>
              <DialogTitle className="text-3xl font-bold text-primary">{project.name}</DialogTitle>
              <p className="text-muted-foreground">{project.client} / {project.industry}</p>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                     <div className="relative aspect-video overflow-hidden rounded-xl border shadow-sm">
                        <Image
                            src={project.imageUrl}
                            alt={project.name}
                            fill
                            className="object-cover"
                            data-ai-hint={project.imageHint}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                          <Compass className="h-5 w-5 text-primary" /> {dictionary.projects.overview}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>

                    {project.problem && (
                      <div className="bg-destructive/5 border border-destructive/10 p-5 rounded-xl">
                        <h4 className="font-bold text-destructive mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" /> {dictionary.projects.problem}
                        </h4>
                        <p className="text-sm text-foreground/80">{project.problem}</p>
                      </div>
                    )}
                    
                    {project.objective && (
                      <div className="bg-primary/5 border border-primary/10 p-5 rounded-xl">
                        <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                          <Target className="h-5 w-5" /> {dictionary.projects.objective}
                        </h4>
                        <p className="text-sm text-foreground/80">{project.objective}</p>
                      </div>
                    )}
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                        <Target className="h-6 w-6 shrink-0 text-primary mt-1" />
                        <div>
                            <h4 className="font-semibold text-lg">{dictionary.projects.goal}</h4>
                            <p className="text-muted-foreground">{project.goal}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Briefcase className="h-6 w-6 shrink-0 text-primary mt-1" />
                        <div>
                            <h4 className="font-semibold text-lg">{dictionary.projects.my_role}</h4>
                            <p className="text-muted-foreground">{project.role}</p>
                        </div>
                    </div>

                    {project.uxImprovements && (
                      <div className="flex items-start gap-4">
                        <Sparkles className="h-6 w-6 shrink-0 text-accent mt-1" />
                        <div>
                            <h4 className="font-semibold text-lg">{dictionary.projects.ux_improvements}</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">{project.uxImprovements}</p>
                        </div>
                      </div>
                    )}

                    {project.impact && (
                      <div className="flex items-start gap-4">
                        <Trophy className="h-6 w-6 shrink-0 text-yellow-500 mt-1" />
                        <div>
                            <h4 className="font-semibold text-lg">{dictionary.projects.impact}</h4>
                            <p className="text-muted-foreground text-sm font-medium">{project.impact}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                        <Wrench className="h-6 w-6 shrink-0 text-primary mt-1" />
                        <div>
                            <h4 className="font-semibold text-lg mb-2">{dictionary.projects.tools}</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map(tool => (
                                    <Badge key={tool} variant="secondary" className="bg-primary/10 text-primary border-primary/20">{tool}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {project.liveSiteUrl && project.liveSiteUrl !== '#' && (
                         <Button asChild className="mt-4 rounded-full w-full shadow-lg shadow-primary/20">
                            <a href={project.liveSiteUrl} target="_blank" rel="noopener noreferrer">
                                {dictionary.projects.view_live_site} <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCard;
