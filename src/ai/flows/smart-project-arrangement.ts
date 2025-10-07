'use server';

/**
 * @fileOverview Arranges portfolio projects based on visual appeal and user engagement metrics.
 *
 * - smartProjectArrangement - A function that arranges portfolio projects.
 * - SmartProjectArrangementInput - The input type for the smartProjectArrangement function.
 * - SmartProjectArrangementOutput - The return type for the smartProjectArrangement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { ProjectSchema } from '@/lib/placeholder-images';

export type Project = z.infer<typeof ProjectSchema>;

const SmartProjectArrangementInputSchema = z.object({
  projects: z.array(ProjectSchema).describe('An array of portfolio projects.'),
});
export type SmartProjectArrangementInput = z.infer<typeof SmartProjectArrangementInputSchema>;

const SmartProjectArrangementOutputSchema = z.object({
  arrangedProjects: z.array(ProjectSchema).describe(
    'An array of portfolio projects arranged by visual appeal and user engagement metrics.'
  )
});

export type SmartProjectArrangementOutput = z.infer<typeof SmartProjectArrangementOutputSchema>;


export async function smartProjectArrangement(
  input: SmartProjectArrangementInput
): Promise<Project[]> {
  const result = await smartProjectArrangementFlow(input);
  return result.arrangedProjects;
}

const prompt = ai.definePrompt({
  name: 'smartProjectArrangementPrompt',
  input: {schema: SmartProjectArrangementInputSchema},
  output: {schema: SmartProjectArrangementOutputSchema},
  prompt: `You are an expert web designer specializing in portfolio optimization.

You will receive a list of portfolio projects with their image URLs, descriptions, engagement scores, and visual appeal scores.

Your task is to rearrange the projects in the array to maximize visual appeal and user engagement, ensuring that the most captivating projects are displayed first.

Return the rearranged array of projects.

Projects:
{{#each projects}}
  - Name: {{this.name}}
    Image URL: {{this.imageUrl}}
    Description: {{this.description}}
    Engagement Score: {{this.engagementScore}}
    Visual Appeal Score: {{this.visualAppealScore}}
{{/each}}`,
});

const smartProjectArrangementFlow = ai.defineFlow(
  {
    name: 'smartProjectArrangementFlow',
    inputSchema: SmartProjectArrangementInputSchema,
    outputSchema: SmartProjectArrangementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
