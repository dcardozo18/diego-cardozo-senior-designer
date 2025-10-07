
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Brush, Code, Server } from 'lucide-react';

const designSkills = ['Figma', 'Adobe Creative Suite', 'Canva', 'Framer', 'Webflow'];
const frontendSkills = ['HTML', 'CSS', 'Tailwind', 'Angular', 'JavaScript'];
const platformSkills = ['WordPress', 'Shopify', 'Magento'];

const AboutSection = () => {
  return (
    <section id="about" className="bg-card/50 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
              About <span className="text-primary">Me</span>
            </h2>
        </div>
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2 flex items-center justify-center">
             <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl shadow-primary/20">
               <Image
                src="https://picsum.photos/seed/profile/400/400"
                alt="Profile picture for Diego Cardozo"
                fill
                data-ai-hint="professional portrait"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col justify-center">
            
            <p className="mt-6 text-lg text-muted-foreground">
              I’m a Colombian Web and UI/UX Designer with over 20 years of experience creating digital solutions for corporate, legal, and e-commerce clients.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              I specialize in designing and developing responsive, high-performing websites using Figma, WordPress (Elementor & DIVI), Shopify, and Magento. My focus is always on blending creativity and functionality to deliver intuitive user experiences that support real business goals.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              I’ve collaborated with developers, marketing teams, and agencies to turn ideas into digital products that look great and perform even better.
            </p>
          </div>
          
        </div>
        <div className="mt-16">
          <h3 className="mb-8 text-center text-3xl font-bold">Core Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg bg-card p-6 border border-transparent hover:border-primary transition-colors duration-300">
              <div className="flex items-center gap-4 mb-4">
                <Brush className="h-8 w-8 text-primary" />
                <h4 className="text-xl font-semibold">Design Tools</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {designSkills.map(skill => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-card p-6 border border-transparent hover:border-primary transition-colors duration-300">
               <div className="flex items-center gap-4 mb-4">
                <Code className="h-8 w-8 text-primary" />
                <h4 className="text-xl font-semibold">Front-end</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {frontendSkills.map(skill => (
                   <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-card p-6 border border-transparent hover:border-primary transition-colors duration-300">
               <div className="flex items-center gap-4 mb-4">
                <Server className="h-8 w-8 text-primary" />
                <h4 className="text-xl font-semibold">Platforms</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {platformSkills.map(skill => (
                   <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
