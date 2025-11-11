
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  return (
    <section id="home" className={cn("relative h-screen min-h-[700px] aurora-background")}>
      <div className="container mx-auto flex h-full flex-col items-start justify-center px-4 text-left md:px-6 z-10">
        <div className="animate-fade-in-up space-y-6 max-w-3xl">
           <p className="font-headline text-2xl font-semibold tracking-tight text-primary sm:text-3xl md:text-4xl">
            Hi, I’m Diego Cardozo
          </p>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Senior Web & UI/UX Designer
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
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
              <a href="#">
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </a>
            </Button>
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
