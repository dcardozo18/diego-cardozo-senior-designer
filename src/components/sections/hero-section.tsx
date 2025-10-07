
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen min-h-[700px]">
      <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center md:px-6">
        <div className="animate-fade-in-up space-y-6">
           <p className="font-headline text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Hi, I’m Diego Cardozo
          </p>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Senior Web & UI/UX Designer
            <span
              className="block mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              20+ Years of Experience
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            I design and build modern, user-focused websites that help brands communicate clearly and grow online.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#projects">
                View My Work
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <a href="#projects" aria-label="Scroll to projects">
          <div className="h-10 w-6 rounded-full border-2 border-muted-foreground">
              <div className="mx-auto mt-2 h-2 w-1 animate-bounce rounded-full bg-muted-foreground"></div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
