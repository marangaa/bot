require('dotenv').config({ path: '.env.local' });

async function testCalendar() {
  try {
    console.log('Testing calendar setup...');
    
    // Test environment variables first
    console.log('Checking environment variables...');
    const hasCredentials = !!process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    const hasCalendarId = !!process.env.GOOGLE_CALENDAR_ID;
    
    console.log('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS:', hasCredentials ? 'SET' : 'MISSING');
    console.log('GOOGLE_CALENDAR_ID:', hasCalendarId ? process.env.GOOGLE_CALENDAR_ID : 'MISSING');
    
    if (!hasCredentials) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS not found in environment');
    }
    
    // Test Google Calendar API directly
    const { google } = require('googleapis');
    
    console.log('1. Testing Google Auth setup...');
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);
    
    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('Invalid credentials format - missing client_email or private_key');
    }
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    const calendar = google.calendar({ version: 'v3', auth });
    console.log('Google Auth initialized successfully');
    
    // Test connection by listing calendars
    console.log('2. Testing calendar connection...');
    const calendarList = await calendar.calendarList.list();
    console.log('Connection SUCCESS - Found', calendarList.data.items?.length || 0, 'calendars');
    
    // List available calendars
    if (calendarList.data.items) {
      console.log('\nAvailable calendars:');
      calendarList.data.items.forEach((cal, index) => {
        console.log(`${index + 1}. ${cal.summary} (${cal.id})`);
      });
    }
    
    // Test availability check on primary calendar
    console.log('\n3. Testing availability check...');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const startOfDay = new Date(tomorrow);
    startOfDay.setHours(9, 0, 0, 0);
    const endOfDay = new Date(tomorrow);
    endOfDay.setHours(17, 0, 0, 0);
    
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    console.log('Checking calendar:', calendarId);
    
    const events = await calendar.events.list({
      calendarId: calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });
    
    console.log('Events query SUCCESS');
    console.log('Found', events.data.items?.length || 0, 'existing events for tomorrow');
    
    // Calculate available slots
    const availableSlots = [];
    for (let hour = 9; hour < 17; hour++) {
      const slotStart = new Date(tomorrow);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(tomorrow);
      slotEnd.setHours(hour + 1, 0, 0, 0);
      
      const isAvailable = !(events.data.items || []).some(event => {
        const eventStart = new Date(event.start?.dateTime || event.start?.date || '');
        const eventEnd = new Date(event.end?.dateTime || event.end?.date || '');
        return (slotStart < eventEnd && slotEnd > eventStart);
      });
      
      if (isAvailable) {
        availableSlots.push(`${hour}:00 - ${hour + 1}:00`);
      }
    }
    
    console.log('Available time slots for tomorrow:', availableSlots.length);
    if (availableSlots.length > 0) {
      console.log('Slots:', availableSlots.join(', '));
    }
    
    console.log('\n✅ All tests passed! Calendar integration is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\nFull error:', error);
    
    if (error.message.includes('credentials')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Check if GOOGLE_SERVICE_ACCOUNT_CREDENTIALS is set in .env.local');
      console.log('2. Verify the service account has Calendar API access');
      console.log('3. Make sure the calendar ID is correct');
    }
    
    if (error.message.includes('403') || error.message.includes('permission')) {
      console.log('\n🔧 Permission issues:');
      console.log('1. Enable Google Calendar API in Google Cloud Console');
      console.log('2. Share your calendar with the service account email:');
      console.log('   chattt@chatt-460921.iam.gserviceaccount.com');
      console.log('3. Give the service account "Make changes to events" permission');
    }
  }
}

testCalendar();
