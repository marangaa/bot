"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, User, Mail, MessageSquare } from 'lucide-react';

interface ConsultationSlot {
  start: string;
  end: string;
  available: boolean;
}

interface AvailabilityDisplayProps {
  date: string;
  availability: ConsultationSlot[];
  workingHours: string;
  timezone: string;
  onBookSlot?: (slot: ConsultationSlot) => void;
}

export function AvailabilityDisplay({ 
  date, 
  availability, 
  workingHours, 
  timezone,
  onBookSlot 
}: AvailabilityDisplayProps) {
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-blue-600" />
          Available Times - {formatDate(date)}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          <Clock className="w-4 h-4 inline mr-1" />
          Working Hours: {workingHours} ({timezone})
        </p>
      </div>

      <div className="grid gap-2">
        {availability.map((slot, index) => (
          <div 
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              slot.available 
                ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium">
                {formatTime(slot.start)} - {formatTime(slot.end)}
              </div>
              <Badge variant={slot.available ? "default" : "secondary"}>
                {slot.available ? 'Available' : 'Booked'}
              </Badge>
            </div>
            
            {slot.available && onBookSlot && (
              <Button 
                size="sm" 
                onClick={() => onBookSlot(slot)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Book This Slot
              </Button>
            )}
          </div>
        ))}
      </div>

      {availability.every(slot => !slot.available) && (
        <div className="text-center py-4 text-gray-500">
          <p>No available slots for this date.</p>
          <p className="text-sm">Try selecting a different date or contact me directly.</p>
        </div>
      )}
    </Card>
  );
}

interface BookingFormProps {
  selectedSlot: ConsultationSlot;
  onSubmit: (booking: any) => void;
  onCancel: () => void;
}

export function BookingForm({ selectedSlot, onSubmit, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    type: 'technical-consultation' as const,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startTime = new Date(selectedSlot.start);
    const booking = {
      ...formData,
      date: startTime.toISOString().split('T')[0],
      time: startTime.toTimeString().split(' ')[0].slice(0, 5),
      duration: 60
    };
    
    onSubmit(booking);
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Book Consultation
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Selected: {formatTime(selectedSlot.start)} - {formatTime(selectedSlot.end)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.clientName}
            onChange={(e) => setFormData({...formData, clientName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Email Address
          </label>
          <input
            type="email"
            required
            value={formData.clientEmail}
            onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Consultation Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value as any})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="technical-consultation">Technical Consultation</option>
            <option value="project-discussion">Project Discussion</option>
            <option value="code-review">Code Review</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Additional Details (Optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell me about your project or what you'd like to discuss..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
            Book Consultation
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

interface BookingConfirmationProps {
  booking: {
    success: boolean;
    message: string;
    eventId?: string;
    meetingLink?: string;
  };
  onClose: () => void;
}

export function BookingConfirmation({ booking, onClose }: BookingConfirmationProps) {
  return (
    <Card className="p-6">
      <div className="text-center">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          booking.success ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {booking.success ? (
            <CalendarDays className="w-8 h-8 text-green-600" />
          ) : (
            <MessageSquare className="w-8 h-8 text-red-600" />
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">
          {booking.success ? 'Consultation Booked!' : 'Booking Failed'}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {booking.message}
        </p>

        {booking.success && booking.meetingLink && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800 mb-2">
              Google Meet link has been included in your calendar invite
            </p>
            <a 
              href={booking.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Join Meeting Link
            </a>
          </div>
        )}

        <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
          {booking.success ? 'Great, Thanks!' : 'Try Again'}
        </Button>
      </div>
    </Card>
  );
}
