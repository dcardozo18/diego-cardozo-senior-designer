
import { z } from 'zod';
import type { Locale } from '../../i18n-config';

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  client: z.string(),
  industry: z.string(),
  description: z.string(),
  goal: z.string(),
  role: z.string(),
  tools: z.array(z.string()),
  liveSiteUrl: z.string(),
  imageUrl: z.string(),
  imageHint: z.string(),
  category: z.string(),
  // Optional scores for AI arrangement
  engagementScore: z.number().optional(),
  visualAppealScore: z.number().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

const projectData = {
  en: () => import('./placeholder-images.json').then(module => module.default),
  es: () => import('./placeholder-images.es.json').then(module => module.default),
};

export const getProjects = async (locale: Locale): Promise<Project[]> => {
  const loader = projectData[locale] || projectData.en;
  const data = await loader();
  return data.placeholderImages.map(p => ({
    ...p,
    id: String(p.id)
  }));
};
