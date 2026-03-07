
'use client';

import Image from 'next/image';
import { 
  ExternalLink, 
  Briefcase, 
  Compass, 
  Wrench, 
  Info, 
  AlertTriangle, 
  Target, 
  Zap, 
  Layout, 
  Eye, 
  Lightbulb,
  BarChart3,
  CheckCircle2,
  Layers,
  Search,
  PenTool,
  Trophy
} from 'lucide-react';
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
import { Card, CardContent } from '../ui/card';

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
        </div>

        <div className="flex flex-wrap gap-4 mt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="default" className="rounded-full px-8">
                <Eye className="mr-2 h-5 w-5" />
                {dictionary.projects.view_details}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl h-[92vh] p-0 overflow-hidden bg-background border-border">
              <ScrollArea className="h-full">
                <div className="pb-20">
                  {/* HERO SECTION - TIPO BANNER DE LA IMAGEN */}
                  <div className="relative h-[40vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden">
                    <Image src={project.imageUrl} alt={project.name} fill className="object-cover opacity-20 blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
                    <div className="relative z-10 text-center px-6">
                      <Badge className="mb-4 px-4 py-1 text-sm bg-primary/20 text-primary border-primary/30 uppercase tracking-widest">{project.industry}</Badge>
                      <DialogTitle className="text-4xl md:text-6xl font-black text-foreground mb-4 drop-shadow-sm">{project.name}</DialogTitle>
                      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">{project.client} • {dictionary.projects.case_study}</p>
                    </div>
                  </div>

                  <div className="container max-w-5xl mx-auto px-6 space-y-24 mt-12">
                    
                    {/* SECTION 1: ESTRATEGIA - DISEÑO EN FILAS Y COLUMNAS COMO "RECURSOS" */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
                         <Layers className="h-8 w-8 text-primary" />
                         <h3 className="text-3xl font-bold">{dictionary.projects.overview}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                          <p className="text-xl leading-relaxed text-muted-foreground">{project.overview}</p>
                          <div className="bg-card/50 p-6 rounded-2xl border border-dashed border-border flex items-center gap-4">
                            <Briefcase className="h-10 w-10 text-primary shrink-0" />
                            <div>
                               <h4 className="font-bold text-lg">{dictionary.projects.my_role}</h4>
                               <p className="text-muted-foreground">{project.role}</p>
                            </div>
                          </div>
                        </div>
                        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border">
                           <Image src={project.imageUrl} alt={project.name} fill className="object-cover" />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: ENTREGABLES / TOOLS - ESTILO "RECURSOS PARA INVERSIONISTAS" */}
                    <div className="space-y-10">
                       <div className="text-center">
                          <h3 className="text-3xl font-bold mb-4">{dictionary.projects.tools} & {dictionary.projects.strategy}</h3>
                          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {project.tools.slice(0, 4).map((tool, i) => (
                            <Card key={tool} className="border-border/50 bg-card hover:border-primary/50 transition-all duration-300 group">
                              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                  {i === 0 ? <Search className="h-6 w-6" /> : i === 1 ? <PenTool className="h-6 w-6" /> : i === 2 ? <Layout className="h-6 w-6" /> : <Code2 className="h-6 w-6" />}
                                </div>
                                <h4 className="font-bold text-foreground">{tool}</h4>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{dictionary.projects.tools}</p>
                              </CardContent>
                            </Card>
                          ))}
                       </div>
                    </div>

                    {/* SECTION 3: EL VIAJE (PROBLEM -> OBJECTIVE) - DISEÑO INFOGRÁFICO DE PASOS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="bg-destructive/5 border border-destructive/20 p-8 rounded-3xl space-y-4">
                          <div className="flex items-center gap-3 text-destructive mb-2">
                            <AlertTriangle className="h-8 w-8" />
                            <h4 className="text-2xl font-bold">{dictionary.projects.problem}</h4>
                          </div>
                          <p className="text-lg text-foreground/80 leading-relaxed">{project.problem}</p>
                       </div>
                       <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl space-y-4">
                          <div className="flex items-center gap-3 text-primary mb-2">
                            <Target className="h-8 w-8" />
                            <h4 className="text-2xl font-bold">{dictionary.projects.objective}</h4>
                          </div>
                          <p className="text-lg text-foreground/80 leading-relaxed">{project.objective}</p>
                       </div>
                    </div>

                    {/* SECTION 4: MÉTRICAS E IMPACTO - ESTILO "NUESTRAS CIFRAS" */}
                    <div className="bg-card rounded-[40px] p-8 md:p-12 border border-border/50 shadow-sm overflow-hidden relative">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                       <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                          <div className="md:col-span-2 space-y-6">
                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                               <Trophy className="h-3 w-3" /> {dictionary.projects.impact}
                             </div>
                             <h3 className="text-4xl font-black">{dictionary.projects.impact}</h3>
                             <p className="text-lg text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-4">
                               "{project.impact}"
                             </p>
                          </div>
                          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                             {/* MOCK METRICS BASED ON THE IMAGE STYLE */}
                             <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                   <BarChart3 className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                   <p className="text-3xl font-black text-foreground">+35%</p>
                                   <p className="text-xs text-muted-foreground uppercase font-bold">Conversion Rate</p>
                                </div>
                             </div>
                             <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                   <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                   <p className="text-3xl font-black text-foreground">-40%</p>
                                   <p className="text-xs text-muted-foreground uppercase font-bold">Checkout Friction</p>
                                </div>
                             </div>
                             <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                   <CheckCircle2 className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                   <p className="text-3xl font-black text-foreground">90%</p>
                                   <p className="text-xs text-muted-foreground uppercase font-bold">User Satisfaction</p>
                                </div>
                             </div>
                             <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                   <Eye className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                   <p className="text-3xl font-black text-foreground">60%</p>
                                   <p className="text-xs text-muted-foreground uppercase font-bold">Mobile Growth</p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* SECTION 5: DECISIONES CLAVE - ESTILO "ÚLTIMAS NOTICIAS" O BANNER FINAL */}
                    {project.decisions && (
                      <div className="bg-primary p-1 rounded-[32px]">
                         <div className="bg-background rounded-[30px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                               <Lightbulb className="h-10 w-10 text-primary" />
                            </div>
                            <div className="flex-1 space-y-4">
                               <h4 className="text-2xl font-bold">{dictionary.projects.key_decisions}</h4>
                               <p className="text-lg text-muted-foreground leading-relaxed">{project.decisions}</p>
                            </div>
                            {project.liveSiteUrl && project.liveSiteUrl !== '#' && (
                              <Button asChild size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20 shrink-0">
                                <a href={project.liveSiteUrl} target="_blank" rel="noopener noreferrer">
                                  {dictionary.projects.view_live_site} <ExternalLink className="ml-2 h-5 w-5" />
                                </a>
                              </Button>
                            )}
                         </div>
                      </div>
                    )}

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

// Helper to make the code compile without the missing import
const Code2 = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
