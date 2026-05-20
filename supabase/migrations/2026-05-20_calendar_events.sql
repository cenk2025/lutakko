-- 2026-05-20: Calendar + custom events + (future) email reminders
--
-- Run this in the Supabase SQL editor.
-- Idempotent: safe to re-run.

------------------------------------------------------------------------------
-- 1. bookings: add columns for the new calendar UX
------------------------------------------------------------------------------
-- `title`           — free-text title for custom events (e.g. "SuomiPop with Mikko").
--                     Null for system bookings (sauna / activity), where the
--                     item_key + lookup tables drive the displayed name.
-- `remind_email`    — user-opted email reminder one hour before the event.
-- `notification_sent_at` — set by the (future) reminder Edge Function once an
--                          email has been dispatched, so we never double-send.

alter table public.bookings
    add column if not exists title                 text,
    add column if not exists remind_email          boolean      not null default false,
    add column if not exists notification_sent_at  timestamptz;

-- Index used by the future reminder job — quickly find unprocessed reminders
-- whose start time is in the near future.
create index if not exists bookings_reminder_due_idx
    on public.bookings (starts_at)
    where remind_email = true
      and notification_sent_at is null
      and status <> 'cancelled';

------------------------------------------------------------------------------
-- 2. Allow 'event' kind so calendar entries are distinguishable from
--    activity / sauna bookings even if they share the same table.
------------------------------------------------------------------------------
do $$ begin
    alter type booking_kind add value if not exists 'event';
exception when others then null;
end $$;
