import { z } from 'zod';

export const checkAvailabilitySchema = z.object({
  date: z.string().describe('Date to check availability for (YYYY-MM-DD format)')
});

export const bookConsultationSchema = z.object({
  clientName: z.string().describe('Full name of the client'),
  clientEmail: z.string().email().describe('Email address of the client'),
  date: z.string().describe('Date for the consultation (YYYY-MM-DD format)'),
  time: z.string().describe('Time for the consultation (HH:MM format, 24-hour)'),
  duration: z.number().optional().describe('Duration in minutes (default: 60)'),
  description: z.string().optional().describe('Additional details about the consultation'),
  type: z.enum(['technical-consultation', 'project-discussion', 'code-review'])
    .describe('Type of consultation session')
});

export const getUpcomingConsultationsSchema = z.object({
  limit: z.number().optional().describe('Maximum number of consultations to return (default: 5)')
});

export type CheckAvailabilityInput = z.infer<typeof checkAvailabilitySchema>;
export type BookConsultationInput = z.infer<typeof bookConsultationSchema>;
export type GetUpcomingConsultationsInput = z.infer<typeof getUpcomingConsultationsSchema>;
