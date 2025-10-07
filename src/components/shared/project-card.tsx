
'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/ai/flows/smart-project-arrangement';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:shadow-primary/20 hover:scale-105">
      <Image
        src={project.imageUrl}
        alt={project.name}
        width={600}
        height={400}
        data-ai-hint="project image"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-16">
          {project.name}
        </h3>
        <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-sm text-gray-200 mt-2">{project.description}</p>
          <a
            href="#"
            className="mt-4 inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-white"
          >
            View Project <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
