import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client — tolerates missing env vars so the site still builds and
 * renders before credentials are provided. When NEXT_PUBLIC_SUPABASE_URL and
 * NEXT_PUBLIC_SUPABASE_ANON_KEY are set in Vercel (or .env.local), auth turns
 * on automatically without code changes.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = supabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'lutakko.auth',
        flowType: 'pkce',
      },
    })
  : null;
