-- 2026-05-19: Admin role + scheduled ads
--
-- Run this in the Supabase SQL editor.
-- Idempotent: safe to re-run.

------------------------------------------------------------------------------
-- 1. Add is_admin flag to profiles + promote founding admin
------------------------------------------------------------------------------
alter table public.profiles
    add column if not exists is_admin boolean not null default false;

-- Promote the founder.
update public.profiles
    set is_admin = true
    where email = 'cenk.yakinlar@hotmail.com';

------------------------------------------------------------------------------
-- 2. ads table — scheduled banner / sponsored-card inventory
------------------------------------------------------------------------------
do $$ begin
    create type ad_placement as enum (
        'hero-banner',        -- full-width band below hero
        'category-card',      -- sponsored card in a category section
        'footer-banner',      -- narrow strip in footer
        'event-takeover',     -- big slot on an event detail page
        'newsletter'          -- placeholder, displayed on newsletter form
    );
exception when duplicate_object then null;
end $$;

do $$ begin
    create type ad_tier as enum ('free', 'starter', 'pro', 'premium', 'sponsor');
exception when duplicate_object then null;
end $$;

create table if not exists public.ads (
    id           uuid primary key default gen_random_uuid(),
    title        text not null,
    sponsor_name text,
    body         text,                                      -- short marketing copy
    image_url    text,                                      -- /images/ads/... or external https
    cta_label    text,
    cta_href     text,                                      -- https:// or mailto:
    placement    ad_placement not null default 'category-card',
    /* Categories where a category-card ad should appear (festivals-culture,
       food-sauna, marina-recreation). null = appear everywhere relevant.   */
    target_category text,
    /* When event-takeover, slug of the event/venue this targets             */
    target_slug  text,
    tier         ad_tier not null default 'sponsor',
    priority     int  not null default 0,                   -- higher = shown first
    is_active    boolean not null default true,
    starts_at    timestamptz,                               -- null = effective immediately
    ends_at      timestamptz,                               -- null = no end date
    created_at   timestamptz not null default now(),
    updated_at   timestamptz not null default now(),
    created_by   uuid references auth.users(id) on delete set null,
    constraint ads_time_range check (
        ends_at is null or starts_at is null or ends_at > starts_at
    )
);

create index if not exists ads_active_window_idx
    on public.ads (placement, is_active, starts_at, ends_at);
create index if not exists ads_target_category_idx
    on public.ads (target_category);
create index if not exists ads_target_slug_idx
    on public.ads (target_slug);

------------------------------------------------------------------------------
-- 3. RLS — public reads only currently-running ads; admins read/write all
------------------------------------------------------------------------------
alter table public.ads enable row level security;

drop policy if exists "ads public read live"   on public.ads;
drop policy if exists "ads admin read all"     on public.ads;
drop policy if exists "ads admin write"        on public.ads;

-- Public + signed-in users see ads that are active AND within their window.
create policy "ads public read live"
    on public.ads for select
    using (
        is_active = true
        and (starts_at is null or starts_at <= now())
        and (ends_at   is null or ends_at   >  now())
    );

-- Admins see every ad (including expired / draft) for management.
create policy "ads admin read all"
    on public.ads for select
    using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.is_admin = true
        )
    );

-- Admins are the only ones who can insert/update/delete ads.
create policy "ads admin write"
    on public.ads for all
    using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.is_admin = true
        )
    )
    with check (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.is_admin = true
        )
    );

-- Bump updated_at automatically.
create or replace function public.touch_ads_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists ads_touch on public.ads;
create trigger ads_touch
    before update on public.ads
    for each row execute function public.touch_ads_updated_at();

------------------------------------------------------------------------------
-- 4. Storage bucket for ad images (optional; run in Storage UI as well)
------------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
    values ('ad-images', 'ad-images', true)
on conflict (id) do nothing;

drop policy if exists "ad-images public read" on storage.objects;
create policy "ad-images public read" on storage.objects
    for select using (bucket_id = 'ad-images');

drop policy if exists "ad-images admin write" on storage.objects;
create policy "ad-images admin write" on storage.objects
    for all using (
        bucket_id = 'ad-images' and exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.is_admin = true
        )
    ) with check (
        bucket_id = 'ad-images' and exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.is_admin = true
        )
    );

------------------------------------------------------------------------------
-- 5. Seed: a couple of demo ads so the homepage immediately shows
--    something to admins / stakeholders.
------------------------------------------------------------------------------
insert into public.ads (title, sponsor_name, body, image_url, cta_label, cta_href, placement, target_category, tier, priority, starts_at, ends_at)
values
    (
        'Premium-mainospaikka — vapaa',
        'Lutakon Satama',
        'Tavoita kymmenet tuhannet kävijät kesäkauden 2026 aikana. Hero-bannerin sopiminen 1 viikoksi tai kuukaudeksi.',
        null,
        'Ota yhteyttä',
        'mailto:cenk.yakinlar@hotmail.com?subject=Hero-mainospaikka',
        'hero-banner',
        null,
        'sponsor',
        100,
        now(),
        now() + interval '120 days'
    ),
    (
        'Vakuutuskumppanuus haetaan',
        'Lutakon Satama',
        'Veneilijät, festivaalikävijät, satamavieraat — yli 60 000 kävijää kesäkaudessa. Etsimme vakuutuskumppania satamasivulle.',
        null,
        'Tutustu pakettiin',
        'mailto:cenk.yakinlar@hotmail.com?subject=Vakuutuskumppanuus',
        'category-card',
        'marina-recreation',
        'sponsor',
        100,
        now(),
        now() + interval '120 days'
    )
on conflict do nothing;
