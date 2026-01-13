'use server';

import { z } from 'zod';

// Define the schema for contact form validation
const ContactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

type ContactFormState = {
  success: boolean;
  message: string;
};

/**
 * Server action to handle the contact form submission.
 * @param data The validated form data.
 * @returns A state object indicating success or failure.
 */
export async function sendContactMessage(data: unknown): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse(data);

  // If form validation fails, return an error
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check your entries and try again.',
    };
  }

  const { name, email, message } = validatedFields.data;

  // --- In a real application, you would integrate an email service here ---
  // For example, using Nodemailer, Resend, or SendGrid.
  //
  // Example:
  //
  // try {
  //   await resend.emails.send({
  //     from: 'onboarding@resend.dev',
  //     to: 'your-email@example.com',
  //     subject: `New message from ${name} via your portfolio`,
  //     html: `<p>You received a new message from ${email}:</p><p>${message}</p>`,
  //   });
  //
  //   return { success: true, message: 'Your message has been sent successfully!' };
  //
  // } catch (error) {
  //   console.error('Email sending error:', error);
  //   return { success: false, message: 'There was a problem sending your message.' };
  // }
  // -----------------------------------------------------------------------

  // For this demo, we'll just log the data and simulate a successful submission.
  console.log('Received contact form submission:');
  console.log({ name, email, message });

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: 'Your message has been received!',
  };
}
