-- 2026-05-22: Switch contact addresses to the new lutakko.info mailboxes
--
-- Run this in the Supabase SQL editor.
-- Idempotent: safe to re-run.
--
-- The new e-mail layout:
--   business@lutakko.info  → sponsor, ad and revenue enquiries
--   info@lutakko.info      → general inbox
--   news@lutakko.info      → events / newsletter
--
-- Previous addresses (info@voon.fi, cenk.yakinlar@hotmail.com) are
-- being phased out from public-facing CTAs.

update public.ads
   set cta_href = replace(cta_href, 'info@voon.fi', 'business@lutakko.info')
 where cta_href is not null
   and cta_href like '%info@voon.fi%';

update public.ads
   set cta_href = replace(cta_href, 'cenk.yakinlar@hotmail.com', 'business@lutakko.info')
 where cta_href is not null
   and cta_href like '%cenk.yakinlar@hotmail.com%';
