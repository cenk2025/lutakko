import { supabase } from './supabase';
import type { Lang } from '@/data/content';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  preferred_lang: Lang;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdate {
  full_name?: string | null;
  phone?: string | null;
  preferred_lang?: Lang;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;
  return (data as Profile | null) ?? null;
}

export async function updateProfile(input: ProfileUpdate): Promise<Profile> {
  if (!supabase) throw new Error('supabase-not-configured');
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) throw new Error('not-signed-in');

  const patch: Record<string, unknown> = {};
  if ('full_name' in input)      patch.full_name = input.full_name;
  if ('phone' in input)          patch.phone = input.phone;
  if ('preferred_lang' in input) patch.preferred_lang = input.preferred_lang;

  const { data, error } = await supabase
    .from('profiles')
    .update(patch)
    .eq('id', u.user.id)
    .select('*')
    .single();
  if (error) throw error;
  return data as Profile;
}
