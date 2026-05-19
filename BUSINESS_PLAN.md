# Lutakko.info — Business Plan

> **Lutakko.info** is the destination-marketing micro-platform for Jyväskylä's **Lutakon Satama** district, operated by **Voon IQ** (voon.fi · info@voon.fi). Bilingual (FI/EN), built on Next.js + Supabase, deployed on Vercel.

---

## 1. Executive summary

**Vision.** The single digital front door for Lutakon Satama — Finland's most experiential harbour. Every visitor who Googles a Lutakko restaurant, festival, sauna, marina berth, or rally service-park ticket lands here first; every Lutakko business gets a stake in that funnel.

**Business model.** A hybrid of three revenue engines:

1. **Listings & Sponsorships** — venues and event organisers pay annually for prominent placement, dedicated detail pages, lead-capture forms, and analytics.
2. **Bookings & Reservations** — commission on activity, sauna, and table reservations made through the dashboard (already built).
3. **Banner & Native ads** — scheduled, RLS-controlled banner / sponsored-card slots managed by the admin dashboard.

**Why now.** Lutakko is in a content vacuum — most venues only have isolated pages on `jyvaskyla.fi` or generic listings on `visitjyvaskyla.fi`. There is no harbour-focused, bookable destination site. Tourist arrivals to Päijänne are at a 10-year high; OlutSatama, SuomiPop and Secto Rally Finland each pull 10k+ unique visitors to the district between June and August.

**Founders & operations.** Solo-founder (Cenk Yakinlar) with full-stack control. Marketing-style content and visuals already in place; cost base is essentially Vercel ($0–20/mo) + Supabase ($0–25/mo) + domain ($15/yr).

---

## 2. Market & opportunity

### Total Addressable Market (Lutakko-only)

| Segment | # of businesses | Typical annual marketing spend | Realistic SAM share |
|---|---|---|---|
| Restaurants & cafés on the harbour | 12–15 | €3 000 – €8 000 | €500 – €2 000 |
| Restaurant ships / cruises | 4–6 | €5 000 – €20 000 | €1 000 – €4 000 |
| Sauna venues | 3–4 | €2 000 – €5 000 | €500 – €1 500 |
| Festivals / events | 3–5 large + 10–20 small | €10 000 – €100 000 | €1 500 – €10 000 |
| Hotels & accommodation nearby | 4–6 | €10 000 – €30 000 | €1 000 – €3 000 |
| Water sports / activities | 3–5 | €1 000 – €4 000 | €300 – €1 000 |
| Marine retail / breweries | 5–10 | €1 000 – €3 000 | €200 – €600 |

**Lutakko SAM:** ~€80 000 – €150 000 per year on listings/ads.  
**Festival/sponsor SAM:** ~€40 000 – €120 000 per year.  
**Booking commissions (10 % on €500k GMV target year 3):** ~€50 000.

→ Year-3 revenue target: **€100 000 – €200 000** realistic.

### Expansion path

The same template can be re-skinned for other Finnish harbour districts at zero incremental engineering cost — Lahti, Tampere, Lappeenranta, Savonlinna, Kuopio, Mikkeli. Each city is a new instance with its own Supabase + Vercel project.

---

## 3. Product vision

The site already has three foundation layers in production:

1. **Public marketing** — hero scroll-tell, three category sections, footer, bilingual.
2. **User dashboard** — sign-in, profile, activity bookings, sauna bookings (Supabase + RLS).
3. **(NEW)** Admin dashboard — ads with start/end scheduling, sponsor tiers, lead-capture forms.

**Phase 1 (now):**
* Admin ads system (scheduling, tiers, placements).
* Detail pages for every named venue/event (`/venues/<slug>`, `/events/<slug>`) for SEO + sales pitch.
* "Claim this listing" lead form on each detail page → goes to the admin.

**Phase 2 (Q3 2026):**
* Stripe Checkout for ad subscriptions and sponsor packages (one-click renewal).
* Email automation: trial-end, renewal, monthly performance report PDF.
* Per-venue analytics dashboard (visits, click-throughs, booking funnel).
* Newsletter signup → mailing list (already in footer) → monetised inventory.

**Phase 3 (2027):**
* Native mobile app (Expo) reusing the same data layer.
* "Lutakko Pass" — bundled tickets/discounts for visitors.
* White-label deployments to other harbour cities.

---

## 4. Revenue streams (detailed)

### A. Listing subscriptions

Annual or quarterly. Auto-renews via Stripe.

| Tier | Annual price | Includes |
|---|---|---|
| **Free** | €0 | One bullet line + small mention in category section. No CTA, no analytics. |
| **Starter** | **€590** (or €69/mo) | Own `/venues/<slug>` detail page, 5 photos, contact CTA, opening hours, link to website. |
| **Pro** | **€1 490** (or €149/mo) | Everything in Starter + featured card in category section, monthly analytics PDF, priority sort, 1 sponsored banner / month included. |
| **Premium** | **€3 990** (or €399/mo) | Everything in Pro + hero rotation slot, dedicated launch newsletter, custom photographer-shoot package, takeover ad on event detail page (e.g. sponsor SuomiPop page during festival week). |

### B. Banner / sponsored-card ads (scheduled)

Sold separately to anyone — venues on the harbour, non-Lutakko sponsors (insurance, energy, financial services). Managed entirely through the admin dashboard with start/end dates.

| Placement | Format | Suggested price |
|---|---|---|
| **Hero banner** (full-width band below hero) | 1600×400 image + CTA | €490 / week, €1 490 / month |
| **Sponsored card** in a category section | Image card with "Sponsored" tag | €290 / week, €890 / month |
| **Footer banner** | 1200×200 strip | €150 / week, €450 / month |
| **Event takeover** (`/events/suomipop`) | Hero + sidebar during event window | €1 990 / week, €4 990 for full event run |
| **Newsletter slot** | 600×300 image + 60-word copy | €290 / send |

### C. Booking commissions

Already-built Supabase `bookings` table is the backbone. Commission on every paid booking goes via Stripe Connect:

| Booking type | Commission |
|---|---|
| Sauna sessions | 10 % |
| Marina berths | 8 % |
| Sports / activities | 12 % |
| Cruise tickets (M/S Rhea, Hilja, Flamia) | 10 % |
| Restaurant table reservations | flat €1 / cover (when integrated with restaurant POS) |

### D. Affiliate revenue

Cross-promotional partnerships:
* **Visit Jyväskylä / Jyväskylä Region tourism board**: paid content placement, co-branded campaigns.
* **Päijänne cruise operators (MatkaRhea)**: 10 % affiliate on referred ticket sales.
* **Hotel chains** (Solo Sokos Paviljonki, Original Sokos Alexandra): kickback on referred bookings.

### E. Data & insights (Year 2+)

Aggregated, anonymised visitor data dashboard for partners (Visit Jyväskylä, city tourism office, district businesses): origin, season, search terms. Sold as B2B SaaS, €99 – €490 / month.

---

## 5. Pricing strategy & sales process

* **Founding-member offer (first 10 sign-ups):** 50 % off Starter for year 1 (€295) in exchange for a testimonial + photo rights.
* **Bundle:** Starter + 12-week sponsored-card placement → 20 % discount.
* **Seasonal-only restaurants** (e.g. Morton, summer-only): Apr–Oct package at 75 % of annual list.
* **Festival sponsor packages:** SuomiPop (July), Secto Rally Finland (Aug), OlutSatama (June) — sold as 2-month windows at 1.5× monthly rate.
* **Free trial:** 30-day free trial on Starter; auto-converts unless cancelled. Ad-management UI lets us downgrade automatically when trial ends.

### Sales process

1. **Land the dashboard URL** (`lutakko.vercel.app/dashboard/`) on every detail page.
2. **"Claim this listing"** form on each `/venues/<slug>` page goes into the admin's inbox.
3. Founder reaches out within 24 h with a tailored proposal.
4. Stripe Checkout link sent via email → instant publish.
5. Customer logs into their own dashboard to upload media and tweak copy (Phase 2).

---

## 6. Customer segments — early outreach list

**Highest-priority (Phase-1 outreach):**

1. Saunaravintola Sataman Viilu (`satamanviilu.fi`)
2. Tanssisali Lutakko / Jelmu ry (`jelmu.net`)
3. M/S Musta Magia — Limanda (`mustamagia.fi`)
4. Konttiravintola Morton (`morton.fi`)
5. MatkaRhea (operates `Sataman Kahvila`, M/S Rhea, Hilja — `msrhea.fi`)
6. OlutSatama (`olutsatama.fi`) — event sponsor partnership
7. SuomiPop Festival Jyväskylä (`suomipopfestivaali.fi`)
8. Secto Rally Finland organisers (`sectorallyfinland.fi`)
9. Ravintolalaiva Gaia
10. Gr8 Wake water-sports
11. HIISI-panimo (`hiisi.beer`)
12. Solo Sokos Hotel Paviljonki

**Tier-2 (Phase-2 outreach):**
* Trattoria Aukio, Waves, Ilokivi, Päijänne-Risteilyt Hilden, jet-ski rentals, padel halls, beach-volley operators.

**Adjacent (sponsorship/ad, not listing):**
* OP Bank, S-Pankki (event sponsorship)
* IF Vakuutus, LähiTapiola (boating insurance ads on marina page)
* Local energy: Elenia, Alva (sustainability messaging)

---

## 7. Roadmap

| Quarter | Milestone | Revenue target |
|---|---|---|
| **2026 Q2** (now) | Build admin + ad system + 10 detail pages. Onboard 3 paying Starters. | €1 500 |
| **2026 Q3** | Stripe Checkout live. Festival sponsor packages sold for SuomiPop + Secto Rally + OlutSatama. | €15 000 |
| **2026 Q4** | 8 active listing subs + winter ad inventory. Newsletter to 500+ subs. | €30 000 |
| **2027 Q1** | Booking commissions live, 25 active subs. | €70 000 (annualised) |
| **2027 Q2-Q3** | Mobile app + Lutakko Pass + first sister-city deployment. | €150 000 (annualised) |

---

## 8. Costs

| Item | Monthly | Annual |
|---|---|---|
| Vercel Pro | €20 | €240 |
| Supabase Pro | €25 | €300 |
| Domain + email | €5 | €60 |
| Stock photography credits | €20 | €240 |
| Stripe fees (2 % avg) | scales with revenue | – |
| Email service (Postmark/Resend) | €15 | €180 |
| Founder time (opportunity cost) | – | – |
| **Total fixed** | **€85** | **€1 020** |

**Margin profile:** ~90 % gross at Phase-1 scale; ~85 % at Phase-3 (after Stripe + email + photography).

---

## 9. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Local venues refuse to pay | Free tier always available + show measurable referral traffic via UTM links in dashboard. |
| Visit Jyväskylä builds a competing official portal | Differentiate on bookings + speed + bilingual depth + ad-free user experience. |
| Seasonality (60 % of revenue in Jun–Aug) | Q4 winter campaigns: Lutakkotalvi (Lutakko Winter) — ice-bar, sauna, winter cruise. |
| Single-founder bus-factor | Codebase documented in `README.md` and `CLAUDE.md`; Supabase is portable; build is reproducible. |
| Ad fatigue / bad UX | Strict slot limits (≤1 hero banner + ≤1 sponsored card per category). Admin enforces minimum CPM, never floods. |
| Stripe / payments compliance | Use Stripe Checkout (PCI-compliant out of the box). |

---

## 10. Key decisions for founder

1. **Pricing anchor:** Are we positioning *premium* (€1 490/yr Pro) or *accessible* (€590/yr Starter as the headline)? Recommendation: lead with Starter to maximise sign-up rate, upsell to Pro after 60 days of usage data.
2. **Booking depth:** Build native checkout in Q3, or stay at "request a booking" until volume justifies Stripe Connect KYC pain?
3. **Sales hire timing:** Year-2 part-time business-development hire when MRR > €5k. Until then, founder-led outreach.
4. **Sister cities:** Open up a Lahti or Tampere deployment in 2027 — same code, separate Supabase project. Pricing per-city to be set after Jyväskylä cashflow stabilises.

---

*Last updated: 2026-05-19. Maintained alongside the codebase in this repo.*
