import { google } from 'googleapis';

// Initialize Google Calendar client with service account
export function getCalendarClient() {
  try {
    console.log('[CALENDAR-CLIENT] Attempting to initialize calendar client...');
    
    // Check if credentials exist
    const credentialsEnv = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    if (!credentialsEnv) {
      console.error('[CALENDAR-CLIENT] No GOOGLE_SERVICE_ACCOUNT_CREDENTIALS found in environment');
      throw new Error('Calendar credentials not configured');
    }
    
    console.log('[CALENDAR-CLIENT] Credentials found, parsing JSON...');
    const credentials = JSON.parse(credentialsEnv);
    
    if (!credentials.client_email || !credentials.private_key) {
      console.error('[CALENDAR-CLIENT] Invalid credentials format - missing client_email or private_key');
      throw new Error('Invalid calendar credentials format');
    }
    
    console.log('[CALENDAR-CLIENT] Creating Google Auth with credentials...');
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    console.log('[CALENDAR-CLIENT] Creating calendar client...');
    const calendar = google.calendar({ version: 'v3', auth });
    
    console.log('[CALENDAR-CLIENT] Calendar client initialized successfully');
    return calendar;
  } catch (error) {
    console.error('[CALENDAR-CLIENT] Failed to initialize Google Calendar client:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[CALENDAR-CLIENT] Error details:', errorMessage);
    throw new Error(`Calendar service unavailable: ${errorMessage}`);
  }
}

// Working hours configuration
export const WORKING_HOURS = {
  start: 9, // 9 AM
  end: 17,  // 5 PM
  timezone: 'Africa/Nairobi', // Kenya timezone
  workingDays: [1, 2, 3, 4, 5] // Monday to Friday
};

export const CONSULTATION_DURATION = 60; // 60 minutes default
