import { tool } from 'ai';
import { z } from 'zod';
import { calendarService } from './service';
import { checkAvailabilitySchema, bookConsultationSchema, getUpcomingConsultationsSchema } from './schemas';

/**
 * Calendar tools for AI assistant
 */
export const calendarTools = {
  checkAvailability: tool({
    description: 'Check available consultation time slots for a specific date. Call when user asks about availability for a specific date.',
    parameters: checkAvailabilitySchema,
    execute: async ({ date }) => {
      try {
        console.log('[TOOL] checkAvailability called with date:', date);
        
        // Basic date validation
        const requestedDate = new Date(date + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (requestedDate < today) {
          return {
            error: 'Cannot check availability for past dates. Please select a future date.',
            date,
            success: false
          };
        }
        
        // Check weekend
        if (requestedDate.getDay() === 0 || requestedDate.getDay() === 6) {
          return {
            date,
            availability: [],
            message: 'I don\'t work on weekends. Please choose a weekday (Monday-Friday).',
            workingHours: '9:00 AM - 5:00 PM, Monday to Friday',
            success: true
          };
        }
        
        const slots = await calendarService.checkAvailability(date);
        console.log('[TOOL] checkAvailability completed successfully, found', slots.length, 'slots');
        
        return {
          date,
          availability: slots,
          workingHours: '9:00 AM - 5:00 PM (Kenya Time)',
          timezone: 'Africa/Nairobi',
          dayOfWeek: requestedDate.toLocaleDateString('en-US', { weekday: 'long' }),
          success: true
        };
      } catch (error) {
        console.error('[TOOL] checkAvailability failed:', error);
        return {
          error: 'Calendar service is temporarily unavailable. Please contact me directly.',
          date,
          success: false,
          fallback: 'You can email me directly to schedule a consultation.'
        };
      }
    },
  }),

  bookConsultation: tool({
    description: 'Book a consultation session. Call when user wants to schedule a meeting or consultation.',
    parameters: bookConsultationSchema,
    execute: async ({ clientName, clientEmail, date, time, duration, description, type }) => {
      try {
        console.log('[TOOL] bookConsultation called for:', clientName, date, time);
        
        const requestedDate = new Date(date + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (requestedDate < today) {
          return {
            success: false,
            message: 'Cannot book consultations for past dates. Please select a future date.',
            clientName,
            clientEmail,
            date,
            time,
            type
          };
        }
        
        if (requestedDate.getDay() === 0 || requestedDate.getDay() === 6) {
          return {
            success: false,
            message: 'I don\'t work on weekends. Please choose a weekday (Monday-Friday) between 9:00 AM - 5:00 PM.',
            clientName,
            clientEmail,
            date,
            time,
            type
          };
        }
        
        const result = await calendarService.bookConsultation({
          clientName,
          clientEmail,
          date,
          time,
          duration,
          description,
          type
        });
        
        console.log('[TOOL] bookConsultation completed with result:', result.success);
        
        return {
          ...result,
          clientName,
          clientEmail,
          date,
          time,
          type,
          success: result.success
        };
      } catch (error) {
        console.error('[TOOL] bookConsultation failed:', error);
        return {
          success: false,
          message: 'Calendar service is temporarily unavailable. I\'ll contact you personally to schedule.',
          fallback: 'I will reach out to you directly within 24 hours.',
          clientName,
          clientEmail,
          date,
          time,
          type
        };
      }
    },
  }),

  getUpcomingConsultations: tool({
    description: 'Get list of upcoming scheduled consultations. Call when user asks about scheduled meetings or wants to see the calendar.',
    parameters: getUpcomingConsultationsSchema,
    execute: async ({ limit = 5 }) => {
      try {
        console.log('[TOOL] getUpcomingConsultations called with limit:', limit);
        const consultations = await calendarService.getUpcomingConsultations(limit);
        console.log('[TOOL] getUpcomingConsultations completed, found:', consultations.length, 'consultations');
        
        return {
          consultations: consultations.map(event => ({
            id: event.id,
            title: event.summary,
            start: event.start?.dateTime || event.start?.date,
            end: event.end?.dateTime || event.end?.date,
            attendees: event.attendees?.map(attendee => ({
              name: attendee.displayName,
              email: attendee.email
            })) || [],
            meetingLink: event.hangoutLink,
            description: event.description
          })),
          count: consultations.length,
          success: true
        };
      } catch (error) {
        console.error('[TOOL] getUpcomingConsultations failed:', error);
        return {
          error: 'Calendar service is temporarily unavailable. Please contact me directly.',
          consultations: [],
          success: false,
          fallback: 'https://cal.com/rchdmaranga'
        };
      }
    },
  }),

  testCalendarConnection: tool({
    description: 'Test the calendar service connection. Call when troubleshooting calendar issues.',
    parameters: z.object({}),
    execute: async () => {
      try {
        console.log('[TOOL] testCalendarConnection called');
        const isConnected = await calendarService.testConnection();
        console.log('[TOOL] testCalendarConnection result:', isConnected);
        
        return {
          connected: isConnected,
          message: isConnected 
            ? 'Calendar service is working correctly' 
            : 'Calendar service connection failed',
          success: isConnected
        };
      } catch (error) {
        console.error('[TOOL] testCalendarConnection failed:', error);
        return {
          connected: false,
          message: 'Calendar service test failed',
          error: error instanceof Error ? error.message : 'Unknown error',
          success: false
        };
      }
    },
  }),
};
