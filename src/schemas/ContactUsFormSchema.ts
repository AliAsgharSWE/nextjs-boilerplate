import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email format"),
  companyName: z.string().min(1, "Company Name is required"),
  serviceType: z
    .array(z.string())
    .min(1, "At least one Service Type is required"),
  message: z.string().min(1, "Message is required"),
  middleName: z.string().max(0).optional(), // Honeypot field (hidden from users, spam protection)
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
