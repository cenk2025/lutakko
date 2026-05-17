# Lutakon Satama — Premium Scrollytelling

A production-ready Next.js 14 + Tailwind + Framer Motion scrollytelling site for **Lutakon Satama**, the festival / dining / marina district of Jyväskylä, Finland.

* **Framework:** Next.js 14 App Router (TypeScript)
* **Styling:** Tailwind CSS, custom Nordic dark theme
* **Animation:** Framer Motion + HTML5 Canvas for the hero scrollytelling sequence
* **Auth:** Supabase Auth (email + password, magic link), client-side only
* **Languages:** Bilingual (FI / EN), toggled live via context
* **Deploy target:** Static export (`output: 'export'`) → Vercel, Netlify, Cloudflare Pages or GitHub Pages.

---

## Install & run

```bash
cd lutakko
npm install
npm run dev          # → http://localhost:3000
npm run build        # static export → ./out
```

A successful build looks like:

```
✓ Compiled successfully
Route (app)                              Size     First Load JS
┌ ○ /                                    57.2 kB         144 kB
└ ○ /_not-found                          875 B            88 kB
```

---

## Page structure

1. **Hero scrollytelling** — `HeroScrolly` ▸ 400vh sticky canvas + 4 animated text beats (driven by `useScroll` → `useTransform`).
   * Frames: **96 jpgs** in `public/images/scrollable/hero/` (`ezgif-frame-145.jpg` … `ezgif-frame-240.jpg`).
   * Beat 1 → Brand title · Beat 2 → "The water makes the place" · Beat 3 → "Stages, steam, lanterns" · Beat 4 → "One block, every season" + CTA.
2. **Three image-driven content sections** (`CategorySection`) — for each: spotlight image, intro copy, 3 mini sub-sections, gallery rail of 3 images, `FeatureGrid` of icon cards + bullet rail + CTA strip. Alternating left/right rhythm.
3. **Footer** — newsletter capture, map preview, socials, credits.

Plus: fixed top `Navbar` (FI/EN toggle, themed border, mobile drawer) and fixed bottom `CategoryDeck` (pill nav on desktop, sidebar dots on mobile).

---

## Hero frame sequence

The 96 frames have already been copied into `public/images/scrollable/hero/`. The sequence config lives in [`data/content.ts`](data/content.ts):

```ts
export const HERO_SEQUENCE = {
  folderPath: 'hero',
  frameCount: 96,
  framePrefix: 'ezgif-frame-',
  frameExt: 'jpg',
  frameStart: 145,
};
```

If you re-export the sequence as `1.webp` … `120.webp`, simply update those fields.

---

## Image mapping (task C — already wired)

The following selections were made from `lutakko/images/` and copied into `public/images/featured/<category>/`. The code references the **target** paths, so nothing further is required to ship. If you want to swap a picture, just replace the file at the target path (filename must stay the same), or change the path in [`data/content.ts`](data/content.ts) → `CATEGORIES[i].assets`.

### `festivals-culture/` — Culture & Rallies (SuomiPop / WRC / Lutakonaukio)

| Role     | Target (in `public/`)                                       | Source (from `lutakko/images/`) |
|----------|-------------------------------------------------------------|---------------------------------|
| hero     | `/images/featured/festivals-culture/hero.jpg`               | `lutakonaukio1.jpg`             |
| gallery-1| `/images/featured/festivals-culture/gallery-1.jpg`          | `lutakonaukioJPG.JPG`           |
| gallery-2| `/images/featured/festivals-culture/gallery-2.jpg`          | `lutakonvalonkaupunki.JPG`      |
| gallery-3| `/images/featured/festivals-culture/gallery-3.jpg`          | `lutakonaukio10.jpg`            |

### `food-sauna/` — Dine & Sauna (Viilu / Gaia / cafés)

| Role     | Target                                                  | Source                       |
|----------|---------------------------------------------------------|------------------------------|
| hero     | `/images/featured/food-sauna/hero.jpg`                  | `viilu.JPG`                  |
| gallery-1| `/images/featured/food-sauna/gallery-1.jpg`             | `viilu3.jpg`                 |
| gallery-2| `/images/featured/food-sauna/gallery-2.jpg`             | `RavintolalaivaGaia.JPG`     |
| gallery-3| `/images/featured/food-sauna/gallery-3.jpg`             | `lutakonterasi.JPG`          |

### `marina-recreation/` — Marina & Family (vierasvenesatama / sports / kids)

| Role     | Target                                                       | Source                  |
|----------|--------------------------------------------------------------|-------------------------|
| hero     | `/images/featured/marina-recreation/hero.jpg`                | `lutakonsatama.JPG`     |
| gallery-1| `/images/featured/marina-recreation/gallery-1.jpg`           | `lutakonsatama21.JPG`   |
| gallery-2| `/images/featured/marina-recreation/gallery-2.jpg`           | `Lutakkotalvi.JPG`      |
| gallery-3| `/images/featured/marina-recreation/gallery-3.jpg`           | `lutakonsatama22.JPG`   |

**Why these picks**, in short:
* *Festivals/Culture* — only square (Lutakonaukio) and "city of lights" shots, since those frame the events visually best.
* *Food/Sauna* — Viilu's exterior leads, then a Viilu detail, the historic restaurant ship Gaia, and a terrace café.
* *Marina/Family* — opening with the marina shot, then a sunset/spring marina, a winter scene, and a second marina angle for breadth across seasons.
* All `.heic` and `.mov` source files were intentionally skipped — browsers cannot render HEIC, and animated `.mov` clips would defeat the static-export goal.

If you'd rather pick differently, the source pool has these JPG/`jpg` candidates available:

```
Lutakkotalvi.JPG · RavintolalaivaGaia.JPG · RavintolalaivaGaia3.JPG · Satama2032022.JPG ·
lukakonterasi.JPG · lutakko.JPG · lutakonaukio.jpg · lutakonaukio1.jpg · lutakonaukio10.jpg ·
lutakonaukioJPG.JPG · lutakonaukiocenk.JPG · lutakonsatama.JPG · lutakonsatama1.JPG ·
lutakonsatama11.JPG · lutakonsatama15.JPG · lutakonsatama21–27.JPG · lutakonsatama3–6.JPG ·
lutakonsatamaroski.jpg · lutakonterasi.JPG · lutakonvalonkaupunki.JPG · ravintolagaia.JPG ·
satama.JPG · satama_3.jpg · satamasis.JPG · viilu.JPG · viilu10.JPG · viilu3.jpg · viilu4.JPG
```

`SmartImage` (see [`components/SmartImage.tsx`](components/SmartImage.tsx)) gracefully shows a themed gradient if any image is missing or renamed, so swapping is safe.

---

## File map

```
lutakko/
├── app/
│   ├── globals.css        ← design tokens, hidden scrollbars, ::selection
│   ├── layout.tsx         ← next/font + LanguageProvider + AuthProvider
│   ├── page.tsx           ← orchestrates Hero + 3 CategorySections + Footer
│   └── auth/
│       └── callback/
│           └── page.tsx   ← static page for email-confirm + magic-link redirects
├── components/
│   ├── HarborCanvasScroll.tsx   ← generic sticky-canvas scroll engine
│   ├── HeroScrolly.tsx          ← hero canvas + 4-beat animated text overlay
│   ├── CategorySection.tsx      ← spotlight image + gallery + FeatureGrid
│   ├── FeatureGrid.tsx          ← whileInView icon cards + bullet rail + CTA
│   ├── SmartImage.tsx           ← <img> w/ graceful gradient fallback
│   ├── Navbar.tsx               ← blurred top nav, FI/EN, Sign-in + account menu
│   ├── AuthModal.tsx            ← themed login / signup / magic-link modal
│   ├── CategoryDeck.tsx         ← bottom pill nav + mobile sidebar dots
│   └── Footer.tsx               ← newsletter, map preview, links, socials
├── context/
│   ├── LanguageContext.tsx      ← global FI/EN state w/ localStorage
│   └── AuthContext.tsx          ← Supabase session, signIn/Up/Out, magic link
├── data/
│   └── content.ts               ← HERO_SEQUENCE, HERO_TEXT, CATEGORIES, AUTH_COPY
├── lib/
│   └── supabase.ts              ← tolerant Supabase client (no creds → no crash)
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── scrollable/hero/     ← 96 hero frames (already populated)
│       └── featured/<id>/       ← 4 photos per content section (already populated)
├── .env.example                 ← NEXT_PUBLIC_SUPABASE_* keys to fill in
├── next.config.mjs              ← output: 'export', images.unoptimized: true
├── tailwind.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## Customising

* **Copy:** All FI/EN strings live in `data/content.ts`. Update there — the page picks up changes automatically.
* **Theme accents:** Each category exposes `themeColor`, `themeRgb`, `themeRgbSecondary`, `gradient`. They drive the navbar pill, glow halos, CTA buttons and the cross-fading global background.
* **Hero frames:** Change `HERO_SEQUENCE` (count, prefix, extension, start index, folder).
* **Fonts:** Swap `Plus_Jakarta_Sans` for `Outfit` in `app/layout.tsx` if you prefer.

---

## Authentication (Supabase)

The whole auth flow is client-side, so it works perfectly with `output: 'export'`.

* Sign in / Sign up (email + password) and **Magic link** are all wired up — see [`components/AuthModal.tsx`](components/AuthModal.tsx) and [`context/AuthContext.tsx`](context/AuthContext.tsx).
* The "Sign in" button in the navbar opens the modal; once authenticated, it turns into an account chip with email + sign-out.
* Email confirmation and magic-link redirects land on the static page [`/auth/callback/`](app/auth/callback/page.tsx), which exchanges the PKCE code (or reads the implicit-flow hash) and bounces home.
* **Before credentials are added** the page renders normally; clicking Sign in shows a friendly "Sign-in opens up shortly" notice. No crashes, no blank screens.

### Setting up Supabase

1. Create a new project at https://supabase.com.
2. Settings ▸ API → copy the **Project URL** and the **anon / public** key.
3. Locally: copy `.env.example` → `.env.local` and fill them in.
4. On Vercel: Project Settings ▸ Environment Variables, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL       = https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY  = eyJhbGciOi...
   ```
5. In Supabase ▸ Authentication ▸ URL Configuration, add your production origin (e.g. `https://lutakko.vercel.app`) to **Site URL** and the callback (e.g. `https://lutakko.vercel.app/auth/callback`) to **Redirect URLs**. Add `http://localhost:3000` and `http://localhost:3000/auth/callback` for local dev.
6. (Optional, recommended) Enable the email confirmation flow under Authentication ▸ Providers ▸ Email.

That's it — auth lights up the next time the page reloads. No code change needed.

---

## Deploying to Vercel

The project is already configured for static export, so Vercel will just publish the `out/` folder.

```bash
# From the project root:
git init
git add .
git commit -m "Initial commit — Lutakon Satama scrollytelling + auth scaffold"
git branch -M main
git remote add origin https://github.com/cenk2025/lutakko.git
git push -u origin main
```

Then on Vercel:
1. **Import** the `cenk2025/lutakko` repo.
2. **Framework preset**: Next.js (auto-detected).
3. **Build command** / **Output directory**: leave defaults (`npm run build` → `out`).
4. **Environment variables**: paste the two `NEXT_PUBLIC_SUPABASE_*` values.
5. Deploy. Subsequent pushes to `main` will redeploy automatically.

> **Note:** if you later want SSR / API routes / image optimisation, remove `output: 'export'` from `next.config.mjs` and let Vercel host Next.js natively. Everything in this project will still work.

---

## Notes on the canvas engine

`HarborCanvasScroll` preloads every frame at mount and ties scroll progress (via `useScroll` / `useTransform` on a `400vh` sticky wrapper) directly to a `requestAnimationFrame` draw call. Frames are drawn with manual `object-fit: cover/contain` math so high-DPR screens stay sharp without doubling memory.

While images stream in, the component renders a thin progress shimmer and falls back to the nearest loaded frame, so scrolling is never blocked.
