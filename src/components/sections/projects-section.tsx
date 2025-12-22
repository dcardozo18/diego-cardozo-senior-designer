'use client';

import { useState, useMemo, useEffect } from 'react';
import { smartProjectArrangement, type Project } from '@/ai/flows/smart-project-arrangement';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProjectCard from '@/components/shared/project-card';
import FeaturedProject from '@/components/shared/featured-project';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';

const PROJECTS_PER_PAGE = 6;
const CATEGORIES = ['All', 'Web Design', 'E-commerce', 'App Design', 'Development', 'Branding'];
const FEATURED_PROJECT_IDS = ['21', '24', '23'];


const ProjectsSection = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isArranging, setIsArranging] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
        const sorted = mockProjects.sort((a,b) => (b.engagementScore! + b.visualAppealScore!) - (a.engagementScore! + a.visualAppealScore!));
        setAllProjects(sorted);
      } finally {
        setIsArranging(false);
      }
    };
    arrangeProjects();
  }, []);

  const { featuredProjects, otherProjects } = useMemo(() => {
    const sourceProjects = isArranging ? PlaceHolderImages : allProjects;
    const featured: Project[] = [];
    const others: Project[] = [];

    const sourceProjectMap = new Map(sourceProjects.map(p => [p.id, p]));

    FEATURED_PROJECT_IDS.forEach(id => {
      if (sourceProjectMap.has(id)) {
        featured.push(sourceProjectMap.get(id)!);
      }
    });

    sourceProjects.forEach(p => {
      if (!FEATURED_PROJECT_IDS.includes(p.id)) {
        others.push(p);
      }
    });

    return { featuredProjects: featured, otherProjects: others };
  }, [isArranging, allProjects]);


  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return otherProjects;
    }
    return otherProjects.filter(p => p.category === activeFilter);
  }, [otherProjects, activeFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);
  
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            My Creative <span className="text-primary">Portfolio</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A selection of my best work, showcasing my skills in design and development.
          </p>
        </div>
        
        <div className="flex flex-col gap-20 md:gap-32">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.id} project={project} index={index} />
          ))}
        </div>

        <Separator className="my-20 md:my-32" />

        <div className="mb-12 text-center">
           <h3 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Other <span className="text-primary">Projects</span>
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore more of my work.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(tech => (
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
          {paginatedProjects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1)
                    }} 
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page)
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1)
                    }}
                     aria-disabled={currentPage === totalPages}
                     className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
