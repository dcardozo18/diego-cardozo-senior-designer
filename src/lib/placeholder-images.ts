
import data from './placeholder-images.json';
import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  client: z.string(),
  industry: z.string(),
  description: z.string(),
  goal: z.string(),
  role: z.string(),
  tools: z.array(z.string()),
  liveSiteUrl: z.string().url().or(z.literal('#')),
  imageUrl: z.string(),
  imageHint: z.string(),
  // Optional scores for AI arrangement
  engagementScore: z.number().optional(),
  visualAppealScore: z.number().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const PlaceHolderImages: Project[] = data.placeholderImages.map(p => ({
  ...p,
  id: String(p.id)
}));
