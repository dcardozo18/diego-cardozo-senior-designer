
'use client';

import Image from 'next/image';
import { ExternalLink, Briefcase, Compass, Wrench, Info, AlertTriangle, Target, Zap, Layout, Eye, Lightbulb } from 'lucide-react';
import type { Project } from '@/lib/placeholder-images';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FeaturedProjectProps {
  project: Project;
  index: number;
  dictionary: any;
}

const FeaturedProject = ({ project, index, dictionary }: FeaturedProjectProps) => {
  const isReversed = index % 2 !== 0;

  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center",
    )}>
      <div className={cn("relative aspect-video rounded-lg shadow-2xl shadow-primary/10 overflow-hidden group", isReversed && "md:order-2")}>
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={project.imageHint}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Badge variant="secondary" className="text-lg px-4 py-1">Featured Project</Badge>
        </div>
      </div>
      <div className={cn("flex flex-col gap-6", isReversed && "md:order-1")}>
        <div>
          <p className="text-primary font-semibold tracking-wider uppercase text-sm">{project.industry}</p>
          <h3 className="text-3xl md:text-4xl font-bold mt-1">{project.name}</h3>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed">{project.description}</p>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <Compass className="h-6 w-6 shrink-0 text-primary mt-1" />
            <div>
              <h4 className="font-semibold text-lg">{dictionary.projects.goal}</h4>
              <p className="text-muted-foreground">{project.goal}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Wrench className="h-6 w-6 shrink-0 text-primary mt-1" />
            <div>
              <h4 className="font-semibold text-lg">{dictionary.projects.tools}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tools.map(tool => (
                  <Badge key={tool} variant="secondary">{tool}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="default" className="rounded-full px-8">
                <Eye className="mr-2 h-5 w-5" />
                {dictionary.projects.view_details}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden bg-card border-border">
              <ScrollArea className="h-full">
                <div className="p-6 md:p-10">
                  <DialogHeader className="mb-8">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Layout className="h-5 w-5" />
                      <span className="font-bold uppercase tracking-widest text-sm">{dictionary.projects.case_study}</span>
                    </div>
                    <DialogTitle className="text-4xl md:text-5xl font-extrabold text-foreground">{project.name}</DialogTitle>
                    <p className="text-xl text-muted-foreground mt-2">{project.client} • {project.industry}</p>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Visual & Impact */}
                    <div className="md:col-span-1 flex flex-col gap-6">
                      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border">
                        <Image src={project.imageUrl} alt={project.name} fill className="object-cover" />
                      </div>
                      
                      <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
                        <div className="flex items-center gap-3 text-primary mb-3">
                          <Zap className="h-6 w-6 fill-current" />
                          <h4 className="text-xl font-bold">{dictionary.projects.impact}</h4>
                        </div>
                        <p className="text-foreground font-medium leading-relaxed italic">
                          "{project.impact}"
                        </p>
                      </div>

                      {project.decisions && (
                        <div className="bg-accent/5 p-6 rounded-2xl border border-accent/20">
                          <div className="flex items-center gap-3 text-accent mb-3">
                            <Lightbulb className="h-6 w-6 text-yellow-500" />
                            <h4 className="text-xl font-bold text-foreground">{dictionary.projects.key_decisions}</h4>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {project.decisions}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-lg flex items-center gap-2">
                          <Wrench className="h-5 w-5 text-primary" />
                          {dictionary.projects.tools}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map(tool => (
                            <Badge key={tool} variant="outline" className="bg-background">{tool}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Strategy & Details */}
                    <div className="md:col-span-2 flex flex-col gap-8">
                      <div className="grid grid-cols-1 gap-8">
                        <div className="flex gap-4">
                          <div className="bg-card border rounded-full p-3 h-fit mt-1 shadow-sm">
                            <Info className="h-6 w-6 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold mb-2">{dictionary.projects.overview}</h4>
                            <p className="text-muted-foreground text-lg leading-relaxed">{project.overview}</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                           <div className="bg-card border rounded-full p-3 h-fit mt-1 shadow-sm">
                            <AlertTriangle className="h-6 w-6 text-red-500" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold mb-2">{dictionary.projects.problem}</h4>
                            <p className="text-muted-foreground text-lg leading-relaxed">{project.problem}</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                           <div className="bg-card border rounded-full p-3 h-fit mt-1 shadow-sm">
                            <Target className="h-6 w-6 text-green-500" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold mb-2">{dictionary.projects.objective}</h4>
                            <p className="text-muted-foreground text-lg leading-relaxed">{project.objective}</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                           <div className="bg-card border rounded-full p-3 h-fit mt-1 shadow-sm">
                            <Briefcase className="h-6 w-6 text-purple-500" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold mb-2">{dictionary.projects.my_role}</h4>
                            <p className="text-muted-foreground text-lg leading-relaxed">{project.role}</p>
                          </div>
                        </div>

                        <div className="bg-secondary/30 p-8 rounded-3xl border border-dashed border-border flex gap-6">
                           <div className="bg-primary text-primary-foreground rounded-2xl p-4 h-fit hidden sm:flex shadow-lg shadow-primary/20">
                            <Layout className="h-8 w-8" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold mb-3">{dictionary.projects.strategy}</h4>
                            <p className="text-foreground/90 text-lg leading-relaxed font-medium">
                              {project.strategy}
                            </p>
                          </div>
                        </div>
                      </div>

                      {project.liveSiteUrl && project.liveSiteUrl !== '#' && (
                        <div className="mt-4 flex justify-end">
                          <Button asChild size="lg" className="rounded-full px-10 shadow-xl shadow-primary/20">
                            <a href={project.liveSiteUrl} target="_blank" rel="noopener noreferrer">
                              {dictionary.projects.view_live_site} <ExternalLink className="ml-2 h-5 w-5" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {project.liveSiteUrl && project.liveSiteUrl !== '#' && (
            <Button variant="outline" size="lg" asChild className="rounded-full px-8">
              <a href={project.liveSiteUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" />
                {dictionary.projects.view_live_site}
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
