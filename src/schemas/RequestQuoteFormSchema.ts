import { z } from "zod";

export const requestQuoteFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  projectDetails: z.string().min(1, "Project details are required"),
  budget: z.string().optional(),
  middleName: z.string().max(0).optional(), // Honeypot field
});

export type RequestQuoteFormData = z.infer<typeof requestQuoteFormSchema>;

