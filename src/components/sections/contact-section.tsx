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
import { Send, Loader2 } from 'lucide-react';
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
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{dictionary.contact.subtitle}</p>
        </div>

        <div className="mx-auto max-w-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <Textarea placeholder={dictionary.contact.form.message_placeholder} className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit" size="lg" disabled={isSubmitting}>
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
      </div>
    </section>
  );
};

export default ContactSection;
