import { calendarService } from './service';

async function testCalendarIntegration() {
  try {
    console.log('Testing calendar integration...');
    
    // Test checking availability for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    
    console.log(`Checking availability for ${dateString}...`);
    const availability = await calendarService.checkAvailability(dateString);
    console.log('Availability check successful:', availability.length, 'slots found');
    
    // Test getting upcoming consultations
    console.log('Getting upcoming consultations...');
    const upcoming = await calendarService.getUpcomingConsultations(3);
    console.log('Upcoming consultations:', upcoming.length, 'found');
    
    console.log('Calendar integration test completed successfully!');
    return true;
  } catch (error) {
    console.error('Calendar integration test failed:', error);
    return false;
  }
}

export { testCalendarIntegration };
