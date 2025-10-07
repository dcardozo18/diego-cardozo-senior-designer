
'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

import { submitContactForm, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});


const ContactSection = () => {
  const { toast } = useToast();
  const [state, formAction] = useFormState<FormState, FormData>(submitContactForm, null);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    if (state?.success === true) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      form.reset();
    } else if (state?.success === false) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: state.message,
      });
    }
  }, [state, toast, form]);

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
             Let’s build something great <span className="text-primary">together.</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            I’m currently available for remote design opportunities across Latin America and beyond.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:your-email@example.com" className="hover:text-primary">your-email@example.com</a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Based in Bogotá, Colombia</span>
            </div>
          </div>
          <div className="mt-8">
            <Button size="lg" asChild>
              <a href="mailto:your-email@example.com">Let's Connect</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
