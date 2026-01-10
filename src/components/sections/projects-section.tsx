
'use client';

import { useState } from 'react';
import type { Project } from '@/lib/placeholder-images';
import ProjectCard from '@/components/shared/project-card';
import FeaturedProject from '@/components/shared/featured-project';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import type { Locale } from '../../../i18n-config';

const PROJECTS_PER_PAGE = 6;
const CATEGORIES_EN = ['All', 'Web Design', 'E-commerce', 'App Design', 'Development', 'Branding', 'Game App Design'];
const CATEGORIES_ES = ['Todos', 'Diseño Web', 'E-commerce', 'Diseño App', 'Desarrollo', 'Branding', 'Diseño App Juego'];

const ProjectsSection = ({ dictionary, lang, arrangedProjects }: { dictionary: any, lang: Locale, arrangedProjects: Project[] }) => {
  const [activeFilter, setActiveFilter] = useState(lang === 'es' ? 'Todos' : 'All');
  const [currentPage, setCurrentPage] = useState(1);
  
  const CATEGORIES = lang === 'es' ? CATEGORIES_ES : CATEGORIES_EN;
  const FEATURED_PROJECT_IDS = ['21', '24', '23'];

  // This logic now runs on the client with the server-provided arrangedProjects
  const featuredProjects: Project[] = [];
  const otherProjects: Project[] = [];

  if (arrangedProjects && arrangedProjects.length > 0) {
    const featuredIdsSet = new Set(FEATURED_PROJECT_IDS);
    arrangedProjects.forEach(p => {
      if (featuredIdsSet.has(p.id)) {
        featuredProjects.push(p);
      } else {
        otherProjects.push(p);
      }
    });
    // Ensure featured projects have a stable order, even if AI changes it
    featuredProjects.sort((a, b) => FEATURED_PROJECT_IDS.indexOf(a.id) - FEATURED_PROJECT_IDS.indexOf(b.id));
  }
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredProjects = (() => {
    if (activeFilter === (lang === 'es' ? 'Todos' : 'All')) {
      return otherProjects;
    }
    const filterKey = lang === 'es' ? CATEGORIES_EN[CATEGORIES_ES.indexOf(activeFilter)] || 'All' : activeFilter;
    
    return otherProjects.filter(p => {
        // Handle multiple categories or aliases for filtering
        const categoryMatch = p.category === filterKey;
        const aliasMatch = (p.category === 'Corporate Website' && filterKey === 'Development');
        return categoryMatch || aliasMatch;
    });
  })();

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );
  
  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            {dictionary.projects.title_part1} <span className="text-primary">{dictionary.projects.title_part2}</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {dictionary.projects.subtitle}
          </p>
        </div>
        
        <div className="flex flex-col gap-20 md:gap-32">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.id} project={project} index={index} dictionary={dictionary} />
          ))}
        </div>

        <Separator className="my-20 md:my-32" />

        <div className="mb-12 text-center">
           <h3 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.projects.other_projects_title_part1} <span className="text-primary">{dictionary.projects.other_projects_title_part2}</span>
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {dictionary.projects.other_projects_subtitle}
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(tech => (
            <Button
              key={tech}
              variant={activeFilter === tech ? 'default' : 'outline'}
              onClick={() => handleFilterChange(tech)}
              className="rounded-full transition-all"
            >
              {tech}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} dictionary={dictionary} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                     onClick={() => handlePageChange(currentPage + 1)}
                     aria-disabled={currentPage === totalPages}
                     className={currentPage === totalPages ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer'}
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
