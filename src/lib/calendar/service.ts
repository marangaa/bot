import { getCalendarClient, WORKING_HOURS, CONSULTATION_DURATION } from './client';
import { calendar_v3 } from 'googleapis';

export interface ConsultationSlot {
  start: string;
  end: string;
  available: boolean;
}

export interface BookingRequest {
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  duration?: number;
  description?: string;
  type: 'technical-consultation' | 'project-discussion' | 'code-review';
}

export interface BookingResponse {
  success: boolean;
  eventId?: string;
  message: string;
  meetingLink?: string;
}

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary';

export class CalendarService {
  private calendar: calendar_v3.Calendar | null = null;

  private getCalendar(): calendar_v3.Calendar {
    if (!this.calendar) {
      console.log('[CALENDAR] Initializing calendar client...');
      try {
        this.calendar = getCalendarClient();
        console.log('[CALENDAR] Calendar client initialized successfully');
      } catch (error) {
        console.error('[CALENDAR] Failed to initialize calendar client:', error);
        throw error; // Re-throw to let the tool handle it
      }
    }
    return this.calendar;
  }

  /**
   * Test calendar connection
   */
  async testConnection(): Promise<boolean> {
    try {
      console.log('[CALENDAR] Testing calendar connection...');
      const calendar = this.getCalendar();
      
      // Try to list calendars to test the connection
      const response = await calendar.calendarList.list();
      console.log('[CALENDAR] Connection test successful. Found', response.data.items?.length || 0, 'calendars');
      return true;
    } catch (error) {
      console.error('[CALENDAR] Connection test failed:', error);
      return false;
    }
  }

  /**
   * Check availability for a specific date
   */
  async checkAvailability(date: string): Promise<ConsultationSlot[]> {
    try {
      console.log('[CALENDAR] Checking availability for date:', date);
      const calendar = this.getCalendar();
      
      // Create timezone-aware date objects
      const startOfDay = new Date(`${date}T00:00:00.000+03:00`); // Kenya timezone
      startOfDay.setHours(WORKING_HOURS.start, 0, 0, 0);
      
      const endOfDay = new Date(`${date}T00:00:00.000+03:00`); // Kenya timezone
      endOfDay.setHours(WORKING_HOURS.end, 0, 0, 0);

      // Get existing events for the day
      const response = await calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      });

      const existingEvents = response.data.items || [];
      const slots: ConsultationSlot[] = [];

      // Generate time slots with proper timezone
      for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour++) {
        const slotStart = new Date(`${date}T00:00:00.000+03:00`);
        slotStart.setHours(hour, 0, 0, 0);
        
        const slotEnd = new Date(`${date}T00:00:00.000+03:00`);
        slotEnd.setHours(hour + 1, 0, 0, 0);

        // Check if slot conflicts with existing events
        const isAvailable = !existingEvents.some(event => {
          const eventStart = new Date(event.start?.dateTime || event.start?.date || '');
          const eventEnd = new Date(event.end?.dateTime || event.end?.date || '');
          
          return (slotStart < eventEnd && slotEnd > eventStart);
        });

        slots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          available: isAvailable
        });
      }

      return slots;
    } catch (error) {
      console.error('Error checking availability:', error);
      throw new Error('Failed to check calendar availability');
    }
  }

  /**
   * Book a consultation
   */
  async bookConsultation(booking: BookingRequest): Promise<BookingResponse> {
    try {
      console.log('[CALENDAR] Booking consultation for:', booking.clientName, booking.date, booking.time);
      const calendar = this.getCalendar();
      
      // Parse the time with proper timezone handling
      const [hours, minutes] = booking.time.split(':').map(Number);
      const startTime = new Date(`${booking.date}T00:00:00.000+03:00`);
      startTime.setHours(hours, minutes, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + (booking.duration || CONSULTATION_DURATION));

      // Check if slot is available
      const slots = await this.checkAvailability(booking.date);
      const requestedSlot = slots.find(slot => 
        new Date(slot.start).getTime() === startTime.getTime()
      );

      if (!requestedSlot || !requestedSlot.available) {
        return {
          success: false,
          message: 'The requested time slot is not available. Please choose a different time.'
        };
      }

      // Create calendar event
      const event: calendar_v3.Schema$Event = {
        summary: `Technical Consultation - ${booking.clientName}`,
        description: `
        Technical Consultation Session

        Client: ${booking.clientName}
        Email: ${booking.clientEmail}
        Type: ${booking.type}

        ${booking.description || 'Technical consultation and discussion'}

        ---
        This consultation was scheduled through my AI portfolio assistant.
        `.trim(),
        start: {
          dateTime: startTime.toISOString(),
          timeZone: WORKING_HOURS.timezone
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: WORKING_HOURS.timezone
        },
        attendees: [
          {
            email: booking.clientEmail,
            displayName: booking.clientName
          }
        ],
        conferenceData: {
          createRequest: {
            requestId: `consultation-${Date.now()}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 24 hours
            { method: 'popup', minutes: 30 }       // 30 minutes
          ]
        }
      };

      const response = await calendar.events.insert({
        calendarId: CALENDAR_ID,
        requestBody: event,
        conferenceDataVersion: 1,
        sendUpdates: 'all'
      });

      return {
        success: true,
        eventId: response.data.id || undefined,
        message: `Consultation booked successfully! I've sent a calendar invite to ${booking.clientEmail}.`,
        meetingLink: response.data.hangoutLink || undefined
      };

    } catch (error) {
      console.error('Error booking consultation:', error);
      return {
        success: false,
        message: 'Failed to book consultation. Please try again or contact me directly.'
      };
    }
  }

  /**
   * Get upcoming consultations
   */
  async getUpcomingConsultations(limit: number = 5): Promise<calendar_v3.Schema$Event[]> {
    try {
      console.log('[CALENDAR] Getting upcoming consultations, limit:', limit);
      const calendar = this.getCalendar();
      
      const now = new Date();
      const response = await calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin: now.toISOString(),
        maxResults: limit,
        singleEvents: true,
        orderBy: 'startTime'
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Error fetching upcoming consultations:', error);
      return [];
    }
  }

  /**
   * Cancel a consultation
   */
  async cancelConsultation(eventId: string): Promise<boolean> {
    try {
      console.log('[CALENDAR] Cancelling consultation:', eventId);
      const calendar = this.getCalendar();
      
      await calendar.events.delete({
        calendarId: CALENDAR_ID,
        eventId,
        sendUpdates: 'all'
      });
      return true;
    } catch (error) {
      console.error('Error canceling consultation:', error);
      return false;
    }
  }
}

export const calendarService = new CalendarService();
