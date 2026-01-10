
import type { Project } from '@/lib/placeholder-images';
import ProjectCard from '@/components/shared/project-card';
import FeaturedProject from '@/components/shared/featured-project';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import type { Locale } from '../../../i18n-config';

const PROJECTS_PER_PAGE = 6;
const CATEGORIES_EN = ['All', 'Web Design', 'E-commerce', 'App Design', 'Development', 'Branding'];
const CATEGORIES_ES = ['Todos', 'Diseño Web', 'E-commerce', 'Diseño App', 'Desarrollo', 'Branding'];

const ProjectsSection = ({ dictionary, lang, arrangedProjects }: { dictionary: any, lang: Locale, arrangedProjects: Project[] }) => {
  
  const CATEGORIES = lang === 'es' ? CATEGORIES_ES : CATEGORIES_EN;

  const FEATURED_PROJECT_IDS = ['21', '24', '23'];

  const { featuredProjects, otherProjects } = (() => {
    const featured: Project[] = [];
    const others: Project[] = [];
    const projectMap = new Map(arrangedProjects.map(p => [p.id, p]));
  
    FEATURED_PROJECT_IDS.forEach(id => {
      const project = projectMap.get(id);
      if (project) {
        featured.push(project);
        projectMap.delete(id);
      }
    });
  
    others.push(...Array.from(projectMap.values()));
    
    // Ensure featured projects have a stable order
    featured.sort((a, b) => FEATURED_PROJECT_IDS.indexOf(a.id) - FEATURED_PROJECT_IDS.indexOf(b.id));

    return { featuredProjects: featured, otherProjects: others };
  })();

  // This is a placeholder for the state that would be managed in a client component
  const activeFilter = lang === 'es' ? 'Todos' : 'All';
  const currentPage = 1;

  const filteredProjects = (() => {
    const filterKey = lang === 'es' ? CATEGORIES_EN[CATEGORIES.indexOf(activeFilter)] || 'All' : activeFilter;
    
    if (filterKey === 'All') {
      return otherProjects;
    }
    return otherProjects.filter(p => p.category === filterKey);
  })();

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const paginatedProjects = (() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, endIndex);
  })();

  // The interactive parts will be re-enabled in a client component wrapper later
  const handlePageChange = (page: number) => {
    // This would be implemented in a client component
  };
  
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

        {/* Client-side interactivity for filters and pagination will be restored */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(tech => (
            <Button
              key={tech}
              variant={activeFilter === tech ? 'default' : 'outline'}
              // onClick={() => setActiveFilter(tech)}
              className="rounded-full transition-all"
            >
              {tech}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedProjects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} dictionary={dictionary} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      href="#"
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    href="#"
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
