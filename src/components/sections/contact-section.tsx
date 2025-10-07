'use client';

import { Button } from '@/components/ui/button';
import { Mail, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-card/50 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
             Let’s build something great <span className="text-primary">together.</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            I’m currently available for remote design opportunities across Latin America and beyond.
          </p>
        </div>

        <div className="mx-auto max-w-lg">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card">
                  <div className="p-3 rounded-md bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a href="mailto:your-email@example.com" className="text-muted-foreground hover:text-primary transition-colors">your-email@example.com</a>
                  </div>
                </div>
                 <div className="flex items-center gap-4 p-4 rounded-lg bg-card">
                  <div className="p-3 rounded-md bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-muted-foreground">Based in Bogotá, Colombia</p>
                  </div>
                </div>
                 <div className="text-center mt-8">
                    <Button size="lg" asChild>
                        <a href="mailto:your-email@example.com">
                            <span>Let's Connect</span>
                            <Send className="h-5 w-5" />
                        </a>
                    </Button>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
