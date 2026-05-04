import { supabase } from './supabase';

// Types for bookings
export interface Booking {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  customer_name: string | null;
  customer_email: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  owner_id: string | null;
  owner_name: string | null;
}

export interface CreateBookingInput {
  date: string;
  start_time: string;
  end_time: string;
  customer_name?: string;
  customer_email?: string;
  notes?: string;
  owner_id?: string;
  owner_name?: string;
}

export interface UpdateBookingInput {
  date?: string;
  start_time?: string;
  end_time?: string;
  customer_name?: string;
  customer_email?: string;
  notes?: string;
}

// Fetch all bookings
export async function getBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching bookings:', error);
    return null;
  }
  return data as Booking[];
}

// Fetch bookings for a specific date
export async function getBookingsByDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('date', date)
    .order('start_time', { ascending: true });

  if (error) {
    console.error('Error fetching bookings for date:', error);
    return null;
  }
  return data as Booking[];
}

// Fetch bookings for a date range
export async function getBookingsByDateRange(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true })
    .order('start_time', { ascending: true });

  if (error) {
    console.error('Error fetching bookings for date range:', error);
    return null;
  }
  return data as Booking[];
}

// Create a new booking
export async function createBooking(booking: CreateBookingInput) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    return null;
  }
  return data as Booking;
}

// Update an existing booking
export async function updateBooking(id: string, updates: UpdateBookingInput) {
  const { data, error } = await supabase
    .from('bookings')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating booking:', error);
    return null;
  }
  return data as Booking;
}

// Delete a booking
export async function deleteBooking(id: string) {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
  return true;
}

// Check if time slot is available
export async function isTimeSlotAvailable(date: string, startTime: string, endTime: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('date', date)
    .or(`and(start_time.lt.${endTime},end_time.gt.${startTime})`);

  if (error) {
    console.error('Error checking availability:', error);
    return false;
  }
  return data && data.length === 0;
}

// Get available time slots for a date
export async function getAvailableSlots(date: string, slotDurationMinutes: number = 60) {
  const bookings = await getBookingsByDate(date);
  if (!bookings) return [];

  const bookedSlots = bookings.map(b => ({
    start: timeToMinutes(b.start_time),
    end: timeToMinutes(b.end_time),
  }));

  const availableSlots: { start: string; end: string }[] = [];
  const dayStart = 0; // 00:00
  const dayEnd = 24 * 60; // 24:00
  let currentTime = dayStart;

  for (const slot of bookedSlots.sort((a, b) => a.start - b.start)) {
    if (currentTime < slot.start) {
      availableSlots.push({
        start: minutesToTime(currentTime),
        end: minutesToTime(slot.start),
      });
    }
    currentTime = Math.max(currentTime, slot.end);
  }

  if (currentTime < dayEnd) {
    availableSlots.push({
      start: minutesToTime(currentTime),
      end: minutesToTime(dayEnd),
    });
  }

  return availableSlots;
}

// Helper function to convert time string to minutes
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// Helper function to convert minutes to time string
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// Real-time subscription to bookings changes
export function subscribeToBookings(callback: (booking: Booking[]) => void) {
  return supabase
    .from('bookings')
    .on('*', (payload) => {
      getBookings().then((bookings) => {
        if (bookings) callback(bookings);
      });
    })
    .subscribe();
}
