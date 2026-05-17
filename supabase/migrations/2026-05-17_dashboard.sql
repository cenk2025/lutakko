-- 2026-05-17: Dashboard schema — profiles + unified bookings table
--
-- Run this in the Supabase SQL editor (Project → SQL).
-- Idempotent: safe to re-run.

create extension if not exists pgcrypto;

------------------------------------------------------------------------------
-- 1. profiles — one row per auth user
------------------------------------------------------------------------------
create table if not exists public.profiles (
    id              uuid primary key references auth.users(id) on delete cascade,
    email           text,
    full_name       text,
    phone           text,
    preferred_lang  text not null default 'fi' check (preferred_lang in ('fi', 'en')),
    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles self read"   on public.profiles;
drop policy if exists "profiles self insert" on public.profiles;
drop policy if exists "profiles self update" on public.profiles;

create policy "profiles self read"
    on public.profiles for select using (auth.uid() = id);
create policy "profiles self insert"
    on public.profiles for insert with check (auth.uid() = id);
create policy "profiles self update"
    on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, email)
    values (new.id, new.email)
    on conflict (id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- Backfill profiles for users that signed up before this migration.
insert into public.profiles (id, email)
    select id, email from auth.users
on conflict (id) do nothing;

-- updated_at touch trigger
create or replace function public.touch_profile_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch
    before update on public.profiles
    for each row execute function public.touch_profile_updated_at();

------------------------------------------------------------------------------
-- 2. bookings — unified table for activity + sauna reservations
------------------------------------------------------------------------------
do $$ begin
    create type booking_kind as enum ('activity', 'sauna');
exception when duplicate_object then null;
end $$;

do $$ begin
    create type booking_status as enum ('pending', 'confirmed', 'cancelled');
exception when duplicate_object then null;
end $$;

create table if not exists public.bookings (
    id            uuid primary key default gen_random_uuid(),
    user_id       uuid not null references auth.users(id) on delete cascade,
    kind          booking_kind   not null,
    item_key      text           not null,                                -- e.g. 'padel', 'sauna-viilu-private'
    starts_at     timestamptz    not null,
    ends_at       timestamptz    not null,
    party_size    int            not null default 2 check (party_size between 1 and 30),
    notes         text,
    status        booking_status not null default 'confirmed',
    created_at    timestamptz    not null default now(),
    cancelled_at  timestamptz,
    constraint bookings_time_range check (ends_at > starts_at)
);

create index if not exists bookings_user_starts_idx
    on public.bookings (user_id, starts_at desc);

create index if not exists bookings_status_idx
    on public.bookings (status);

alter table public.bookings enable row level security;

drop policy if exists "bookings self read"   on public.bookings;
drop policy if exists "bookings self insert" on public.bookings;
drop policy if exists "bookings self update" on public.bookings;
drop policy if exists "bookings self delete" on public.bookings;

create policy "bookings self read"
    on public.bookings for select using (auth.uid() = user_id);

create policy "bookings self insert"
    on public.bookings for insert with check (auth.uid() = user_id);

create policy "bookings self update"
    on public.bookings for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "bookings self delete"
    on public.bookings for delete using (auth.uid() = user_id);
