
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen min-h-[600px]">
      <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center md:px-6">
        <div className="animate-fade-in-up space-y-4">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Designing Digital
            <span
              className="ml-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Experiences
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Creative developer crafting modern, animated, and user-centric web solutions.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#projects">
                View My Work
                <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="h-10 w-6 rounded-full border-2 border-muted-foreground">
              <div className="mx-auto mt-2 h-2 w-1 animate-bounce rounded-full bg-muted-foreground"></div>
          </div>
      </div>
    </section>
  );
};

export default HeroSection;

