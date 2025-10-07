'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating project descriptions.
 *
 * - generateProjectDescriptions - A function that generates project descriptions using GenAI.
 * - GenerateProjectDescriptionsInput - The input type for the generateProjectDescriptions function.
 * - GenerateProjectDescriptionsOutput - The return type for the generateProjectDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectDescriptionsInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectType: z.string().describe('The type of project (e.g., website, mobile app, graphic design).'),
  projectTechnologies: z.string().describe('The technologies used in the project (e.g., React, Node.js, Tailwind CSS).'),
  projectFeatures: z.string().describe('Key features or highlights of the project.'),
  portfolioStyle: z.string().describe('The desired style for the generated project descriptions (e.g., modern, professional, creative).'),
});
export type GenerateProjectDescriptionsInput = z.infer<typeof GenerateProjectDescriptionsInputSchema>;

const GenerateProjectDescriptionsOutputSchema = z.object({
  projectDescription: z.string().describe('A compelling description of the project.'),
});
export type GenerateProjectDescriptionsOutput = z.infer<typeof GenerateProjectDescriptionsOutputSchema>;

export async function generateProjectDescriptions(input: GenerateProjectDescriptionsInput): Promise<GenerateProjectDescriptionsOutput> {
  return generateProjectDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionsPrompt',
  input: {schema: GenerateProjectDescriptionsInputSchema},
  output: {schema: GenerateProjectDescriptionsOutputSchema},
  prompt: `You are a creative copywriter specializing in crafting engaging project descriptions for online portfolios.

  Based on the project details provided, generate a compelling and concise description that captures the essence of the project and highlights its key features and technologies.
  The description should be tailored to the specified portfolio style.

  Project Name: {{{projectName}}}
  Project Type: {{{projectType}}}
  Technologies Used: {{{projectTechnologies}}}
  Key Features: {{{projectFeatures}}}
  Portfolio Style: {{{portfolioStyle}}}

  Description:`, // Ensure this is not blank.
});

const generateProjectDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionsFlow',
    inputSchema: GenerateProjectDescriptionsInputSchema,
    outputSchema: GenerateProjectDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
