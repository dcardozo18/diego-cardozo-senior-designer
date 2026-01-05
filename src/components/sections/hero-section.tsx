'use client';

import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section id="home" className={cn("relative h-screen min-h-[700px] aurora-background overflow-hidden")}>
      <div className="container mx-auto grid md:grid-cols-2 h-full items-center px-4 md:px-6 z-10">
        <div className="animate-fade-in-up space-y-6 text-left">
           <p className="font-headline text-2xl font-semibold tracking-tight text-primary sm:text-3xl md:text-4xl">
            Hi, I’m Diego Cardozo
          </p>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Senior Web & UI/UX Designer
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            I design and build modern, user-focused websites that help brands communicate clearly and grow online. With over 20 years of experience, I blend creativity and functionality to deliver impactful digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-start gap-4">
            <Button size="lg" asChild className="rounded-full">
              <a href="#projects">
                <Eye className="mr-2 h-5 w-5" />
                View My Work
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full">
              <a href="/Diego-Cardozo-UI-UX-Designer.pdf" target='_blank'>
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </a>
            </Button>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center relative">
          <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
             <Image
                src="/hero-image.png"
                alt="Diego Cardozo"
                width={500}
                height={500}
                className="relative object-contain rounded-full"
                priority
              />
          </div>
        </div>
      </div>
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <a href="#about" aria-label="Scroll to about section">
          <div className="h-10 w-6 rounded-full border-2 border-muted-foreground">
              <div className="mx-auto mt-2 h-2 w-1 animate-bounce rounded-full bg-muted-foreground"></div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;