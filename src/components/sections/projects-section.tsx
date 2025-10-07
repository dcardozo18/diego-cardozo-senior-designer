
'use client';

import { useState, useMemo, useEffect } from 'react';
import { smartProjectArrangement, type Project } from '@/ai/flows/smart-project-arrangement';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProjectCard from '@/components/shared/project-card';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isArranging, setIsArranging] = useState(true);

  useEffect(() => {
    const arrangeProjects = async () => {
      setIsArranging(true);
      const mockProjects: Project[] = PlaceHolderImages.map((p) => ({
        ...p,
        engagementScore: Math.floor(Math.random() * (95 - 70 + 1) + 70),
        visualAppealScore: Math.floor(Math.random() * (98 - 75 + 1) + 75),
      }));

      try {
        const arranged = await smartProjectArrangement({ projects: mockProjects });
        setAllProjects(arranged);
      } catch (error) {
        console.error("AI flow failed, using mock data as is:", error);
        const sorted = mockProjects.sort((a,b) => (b.engagementScore + b.visualAppealScore) - (a.engagementScore + a.visualAppealScore));
        setAllProjects(sorted);
      } finally {
        setIsArranging(false);
      }
    };
    arrangeProjects();
  }, []);

  const technologies = useMemo(() => {
    const allTechs = PlaceHolderImages.flatMap(p => p.tools);
    return ['All', ...Array.from(new Set(allTechs))];
  }, []);

  const filteredProjects = useMemo(() => {
    const sourceProjects = isArranging ? PlaceHolderImages : allProjects;
    if (activeFilter === 'All') {
      return sourceProjects;
    }
    return sourceProjects.filter(p => p.tools.includes(activeFilter));
  }, [allProjects, activeFilter, isArranging]);

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            My Creative <span className="text-primary">Portfolio</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A selection of my projects, thoughtfully arranged for visual harmony.
          </p>
        </div>
        
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {technologies.map(tech => (
            <Button
              key={tech}
              variant={activeFilter === tech ? 'default' : 'outline'}
              onClick={() => setActiveFilter(tech)}
              className="rounded-full transition-all"
            >
              {tech}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
