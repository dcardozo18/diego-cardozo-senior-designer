
import { Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const testimonials = [
  {
    quote: "Diego delivered a modern, fast, and easy-to-navigate website that helped us attract more clients. His attention to detail and understanding of user needs made all the difference.",
    name: "Laura Gómez",
    title: "Marketing Director, Legal Group Bogotá",
    avatar: "https://picsum.photos/seed/laura/100/100"
  },
  {
    quote: "Working with Diego was a fantastic experience. He is a true professional with a deep understanding of design and development. The final product exceeded our expectations.",
    name: "Carlos Rivera",
    title: "CEO, Tech Solutions",
    avatar: "https://picsum.photos/seed/carlos/100/100"
  },
  {
    quote: "The new e-commerce site Diego built for us is not only beautiful but also highly functional. Our sales have increased by 30% since the launch. Highly recommended!",
    name: "Ana Torres",
    title: "Founder, Fashion Online",
    avatar: "https://picsum.photos/seed/ana/100/100"
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            What My <span className="text-primary">Clients</span> Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Real feedback from people I've had the pleasure to work with.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="bg-card border-border/50">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
                        <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                      </div>
                      <p className="text-xl italic text-foreground/80 mb-6">
                        "{testimonial.quote}"
                      </p>
                      <div className="font-semibold text-lg text-primary">{testimonial.name}</div>
                      <p className="text-muted-foreground">{testimonial.title}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
