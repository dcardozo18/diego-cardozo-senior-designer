
'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

import { submitContactForm, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

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
        variant: 'default',
        className: 'bg-primary text-primary-foreground',
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
        </div>

        <div className="grid md:grid-cols-3 gap-12">
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
            </div>
            <div className="md:col-span-2">
                <form action={formAction} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <Input 
                            {...form.register('name')} 
                            placeholder="Your Name"
                            className="bg-card border-border h-12"
                         />
                        <Input 
                            {...form.register('email')}
                            placeholder="Your Email"
                            type="email"
                            className="bg-card border-border h-12"
                        />
                    </div>
                    <Textarea 
                        {...form.register('message')}
                        placeholder="Your Message"
                        rows={6}
                        className="bg-card border-border"
                    />
                    <div className="text-right">
                        <Button size="lg" type="submit" disabled={form.formState.isSubmitting}>
                            <span>Let's Connect</span>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                    {state?.success === false && (
                        <p className="text-destructive text-sm mt-4">{state.message}</p>
                    )}
                </form>
            </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
