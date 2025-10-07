
import { smartProjectArrangement, type Project } from '@/ai/flows/smart-project-arrangement';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProjectCard from '@/components/shared/project-card';
import { Briefcase } from 'lucide-react';

const ProjectsSection = async () => {
  // Mock data for projects
  const mockProjects: Project[] = PlaceHolderImages.map((p, index) => ({
    name: p.description.split(' for ')[0],
    imageUrl: p.imageUrl,
    description: p.description,
    // Assign pseudo-random scores for demonstration
    engagementScore: Math.floor(Math.random() * (95 - 70 + 1) + 70), // Score between 70-95
    visualAppealScore: Math.floor(Math.random() * (98 - 75 + 1) + 75), // Score between 75-98
  }));

  let arrangedProjects: Project[] = [];
  try {
    // Call the GenAI flow to arrange projects
    arrangedProjects = await smartProjectArrangement({ projects: mockProjects });
  } catch (error) {
    console.error("AI flow failed, using mock data as is:", error);
    // Fallback to original mock data if AI flow fails
    arrangedProjects = mockProjects.sort((a,b) => (b.engagementScore + b.visualAppealScore) - (a.engagementScore + a.visualAppealScore));
  }


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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {arrangedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
