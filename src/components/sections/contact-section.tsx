'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sendContactMessage } from '@/app/actions';
import { Send, Loader2, Mail, Phone, MapPin, Linkedin, Code } from 'lucide-react';
import { useState } from 'react';

const ContactSection = ({ dictionary }: { dictionary: any }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ContactFormSchema = z.object({
    name: z.string().min(2, { message: dictionary.contact.form.errors.name_min }),
    email: z.string().email({ message: dictionary.contact.form.errors.email_invalid }),
    message: z
      .string()
      .min(10, { message: dictionary.contact.form.errors.message_min })
      .max(500, { message: dictionary.contact.form.errors.message_max }),
  });
  
  type ContactFormValues = z.infer<typeof ContactFormSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await sendContactMessage(data);

      if (result.success) {
        toast({
          title: dictionary.contact.form.success_title,
          description: dictionary.contact.form.success_description,
        });
        form.reset();
      } else {
        throw new Error(result.message || dictionary.contact.form.error_generic);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: dictionary.contact.form.error_title,
        description: error.message || dictionary.contact.form.error_generic,
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-card/20 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            {dictionary.contact.title_part1} <span className="text-primary">{dictionary.contact.title_part2}</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{dictionary.contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-card p-8 rounded-lg border">
            <h3 className="text-2xl font-bold mb-6">{dictionary.contact.form.title}</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dictionary.contact.form.name_label}</FormLabel>
                      <FormControl>
                        <Input placeholder={dictionary.contact.form.name_placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dictionary.contact.form.email_label}</FormLabel>
                      <FormControl>
                        <Input placeholder={dictionary.contact.form.email_placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dictionary.contact.form.message_label}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={dictionary.contact.form.message_placeholder} className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {dictionary.contact.form.sending_button}
                      </>
                    ) : (
                      <>
                        {dictionary.contact.form.submit_button}
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="flex flex-col justify-center">
             <h3 className="text-2xl font-bold mb-6">{dictionary.contact.info_title}</h3>
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h4 className="font-semibold text-lg">{dictionary.contact.email_title}</h4>
                        <a href="mailto:dcardozo18@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">dcardozo18@gmail.com</a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h4 className="font-semibold text-lg">{dictionary.contact.phone_title}</h4>
                        <p className="text-muted-foreground">+57 311 226 1900</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h4 className="font-semibold text-lg">{dictionary.contact.location_title}</h4>
                        <p className="text-muted-foreground">{dictionary.contact.location_text}</p>
                    </div>
                </div>
             </div>
             <div className="mt-8 pt-8 border-t">
                 <h4 className="font-semibold text-lg mb-4">{dictionary.contact.social_title}</h4>
                 <div className="flex gap-4">
                     <Button variant="outline" size="icon" asChild>
                         <a href="https://www.linkedin.com/in/diegocardozosenioruiuxdeisgner/" target="_blank" aria-label="LinkedIn">
                             <Linkedin className="h-5 w-5"/>
                         </a>
                     </Button>
                     <Button variant="outline" size="icon" asChild>
                         <a href="https://www.behance.net/dcardozo18" target="_blank" aria-label="Behance">
                             <Code className="h-5 w-5"/>
                         </a>
                     </Button>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
