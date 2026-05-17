import { supabase } from './supabase';
import type { BookingKind, BookingStatus } from '@/data/dashboard';

export interface Booking {
  id: string;
  user_id: string;
  kind: BookingKind;
  item_key: string;
  starts_at: string;
  ends_at: string;
  party_size: number;
  notes: string | null;
  status: BookingStatus;
  created_at: string;
  cancelled_at: string | null;
}

export interface NewBooking {
  kind: BookingKind;
  item_key: string;
  starts_at: string;
  ends_at: string;
  party_size: number;
  notes?: string | null;
}

export async function listBookings(): Promise<Booking[]> {
  if (!supabase) throw new Error('supabase-not-configured');
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('starts_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Booking[];
}

export async function createBooking(input: NewBooking): Promise<Booking> {
  if (!supabase) throw new Error('supabase-not-configured');
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) throw new Error('not-signed-in');

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      user_id: u.user.id,
      kind: input.kind,
      item_key: input.item_key,
      starts_at: input.starts_at,
      ends_at: input.ends_at,
      party_size: input.party_size,
      notes: input.notes ?? null,
    })
    .select('*')
    .single();
  if (error) throw error;
  return data as Booking;
}

export async function cancelBooking(id: string): Promise<void> {
  if (!supabase) throw new Error('supabase-not-configured');
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteBooking(id: string): Promise<void> {
  if (!supabase) throw new Error('supabase-not-configured');
  const { error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) throw error;
}
