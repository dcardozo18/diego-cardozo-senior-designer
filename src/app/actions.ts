
'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export type FormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  } | null;
} | null;

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Couldn't send message. Please check the errors.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Simulate sending an email or saving to a database
  console.log('New contact form submission:', parsed.data);
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    success: true,
    message: 'Your message has been sent successfully!',
    errors: null,
  };
}
