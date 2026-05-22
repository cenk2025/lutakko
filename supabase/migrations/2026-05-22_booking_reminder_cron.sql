-- 2026-05-22: Schedule the booking-reminder Edge Function via pg_cron
--
-- ⚠️ EDIT the two placeholders below before running:
--     <PROJECT_REF>   — your Supabase project ref (the subdomain of *.supabase.co)
--     <CRON_SECRET>   — same long random string you set via
--                        `supabase secrets set CRON_SECRET=...`
--
-- Idempotent: safe to re-run; the previous schedule is removed first.

------------------------------------------------------------------------------
-- 1. Extensions
------------------------------------------------------------------------------
create extension if not exists pg_cron;
create extension if not exists pg_net;

------------------------------------------------------------------------------
-- 2. Drop any previous schedule of the same name (safe if not present)
------------------------------------------------------------------------------
do $$
begin
    perform cron.unschedule('send-booking-reminders');
exception when others then
    null;
end $$;

------------------------------------------------------------------------------
-- 3. Schedule the function to fire every 10 minutes
------------------------------------------------------------------------------
select cron.schedule(
    'send-booking-reminders',
    '*/10 * * * *',
    $cron$
    select net.http_post(
        url     := 'https://<PROJECT_REF>.supabase.co/functions/v1/send-booking-reminders',
        headers := jsonb_build_object(
            'Content-Type',  'application/json',
            'Authorization', 'Bearer <CRON_SECRET>'
        ),
        body                  := '{}'::jsonb,
        timeout_milliseconds  := 30000
    );
    $cron$
);

------------------------------------------------------------------------------
-- 4. (Optional) inspect:
--   select * from cron.job;
--   select * from cron.job_run_details order by start_time desc limit 20;
--   select * from net._http_response order by created desc limit 20;
------------------------------------------------------------------------------
