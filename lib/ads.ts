import { supabase } from './supabase';

export type AdPlacement =
  | 'hero-banner'
  | 'category-card'
  | 'footer-banner'
  | 'event-takeover'
  | 'newsletter';

export type AdTier = 'free' | 'starter' | 'pro' | 'premium' | 'sponsor';

export interface Ad {
  id: string;
  title: string;
  sponsor_name: string | null;
  body: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_href: string | null;
  placement: AdPlacement;
  target_category: string | null;
  target_slug: string | null;
  tier: AdTier;
  priority: number;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export type NewAd = Omit<Ad, 'id' | 'created_at' | 'updated_at' | 'created_by'>;
export type AdUpdate = Partial<NewAd>;

/**
 * Public-facing: read currently-running ads for a given placement (RLS limits
 * to live ads anonymously). Optionally filter by category or slug target.
 */
export async function getLiveAds(
  placement: AdPlacement,
  opts: { category?: string; slug?: string; limit?: number } = {},
): Promise<Ad[]> {
  if (!supabase) return [];
  let q = supabase
    .from('ads')
    .select('*')
    .eq('placement', placement)
    .eq('is_active', true)
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false });

  if (opts.category) q = q.or(`target_category.eq.${opts.category},target_category.is.null`);
  if (opts.slug)     q = q.or(`target_slug.eq.${opts.slug},target_slug.is.null`);
  if (opts.limit)    q = q.limit(opts.limit);

  const { data, error } = await q;
  if (error) return [];

  // Belt-and-braces date check client-side (in case the DB clock drifts).
  const now = Date.now();
  return (data ?? []).filter((a) => {
    const startOk = !a.starts_at || Date.parse(a.starts_at) <= now;
    const endOk   = !a.ends_at   || Date.parse(a.ends_at)   >  now;
    return startOk && endOk;
  }) as Ad[];
}

/**
 * Admin-only: list every ad (active, scheduled, expired, draft).
 * RLS will silently return nothing if the caller isn't an admin.
 */
export async function listAllAds(): Promise<Ad[]> {
  if (!supabase) throw new Error('supabase-not-configured');
  const { data, error } = await supabase
    .from('ads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Ad[];
}

export async function createAd(input: NewAd): Promise<Ad> {
  if (!supabase) throw new Error('supabase-not-configured');
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) throw new Error('not-signed-in');
  const { data, error } = await supabase
    .from('ads')
    .insert({ ...input, created_by: u.user.id })
    .select('*')
    .single();
  if (error) throw error;
  return data as Ad;
}

export async function updateAd(id: string, patch: AdUpdate): Promise<Ad> {
  if (!supabase) throw new Error('supabase-not-configured');
  const { data, error } = await supabase
    .from('ads')
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as Ad;
}

export async function deleteAd(id: string): Promise<void> {
  if (!supabase) throw new Error('supabase-not-configured');
  const { error } = await supabase.from('ads').delete().eq('id', id);
  if (error) throw error;
}

/** Computed status for the admin UI. */
export type AdStatus = 'live' | 'scheduled' | 'expired' | 'paused';

export function adStatus(ad: Ad, now = Date.now()): AdStatus {
  if (!ad.is_active) return 'paused';
  if (ad.starts_at && Date.parse(ad.starts_at) > now) return 'scheduled';
  if (ad.ends_at && Date.parse(ad.ends_at) <= now) return 'expired';
  return 'live';
}
