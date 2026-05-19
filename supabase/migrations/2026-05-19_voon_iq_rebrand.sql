-- 2026-05-19: Voon IQ rebrand
--
-- Run this in the Supabase SQL editor AFTER 2026-05-19_admin_and_ads.sql.
-- Replaces the demo-ad CTA mail addresses with the operating company's
-- official contact, info@voon.fi.
--
-- Idempotent: safe to re-run.

update public.ads
   set cta_href = replace(cta_href, 'cenk.yakinlar@hotmail.com', 'info@voon.fi')
 where cta_href is not null
   and cta_href like '%cenk.yakinlar@hotmail.com%';
