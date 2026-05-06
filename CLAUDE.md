# CLAUDE.md — Project Guide

> Working notes for AI assistants (and humans) on this repository. Covers what the project is, how it's built, how to run/modify/deploy it, and where to find every important piece.

---

## 1. What this project is

A fast, SEO-optimized **static** website for a Calgary-area landscaping business. The goal is **lead generation** (calls, quote forms) and **local Google ranking** for service + city keyword combinations.

- No backend. No database. Phase 1 is purely static HTML/CSS/JS.
- Hosted on **GitHub Pages** as a subpath (`/<repo>`), free.
- Form submissions go to **Formspree** (third-party).
- Optional **Google Analytics 4**.

## 2. Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) with `output: 'export'` |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + `@tailwindcss/typography` |
| Forms | Formspree (`https://formspree.io/f/<id>`) |
| Analytics | GA4 via `next/script` (loaded only if `NEXT_PUBLIC_GA_ID` is set) |
| SEO | JSON-LD (`LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`), auto `sitemap.xml` + `robots.txt`, per-page metadata |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) |

## 3. Folder structure

```
landscape/
├── .github/workflows/deploy.yml    # CI → GitHub Pages
├── next.config.mjs                 # static export + basePath/assetPrefix
├── tailwind.config.ts              # brand colours + typography
├── postcss.config.cjs
├── tsconfig.json
├── public/
│   ├── .nojekyll                   # required for GH Pages + Next assets
│   └── favicon.svg
└── src/
    ├── app/
    │   ├── layout.tsx              # Global metadata, GA4, JSON-LD, header/footer/sticky CTA
    │   ├── page.tsx                # Home
    │   ├── about/page.tsx
    │   ├── contact/page.tsx
    │   ├── services/page.tsx       # /services overview grid
    │   ├── services/[slug]/page.tsx# Dynamic service landing pages (SSG)
    │   ├── sitemap.ts              # auto /sitemap.xml
    │   ├── robots.ts               # auto /robots.txt
    │   ├── not-found.tsx
    │   └── globals.css             # Tailwind + design tokens
    ├── components/
    │   ├── Header.tsx              # Logo + nav + click-to-call
    │   ├── Footer.tsx              # NAP + services links + social
    │   ├── Hero.tsx
    │   ├── ServiceCard.tsx
    │   ├── FAQ.tsx
    │   ├── CTASection.tsx
    │   ├── QuoteForm.tsx           # Formspree-powered
    │   └── StickyMobileCTA.tsx     # Bottom call/quote bar on mobile
    ├── config/
    │   └── site.ts                 # ★ Single source of truth: NAP + service list
    ├── content/services/
    │   ├── types.ts
    │   ├── index.ts                # registers all services
    │   ├── lawn-care-calgary.ts
    │   ├── lawn-maintenance-calgary.ts
    │   ├── sod-installation-calgary.ts
    │   ├── mulch-and-rock-calgary.ts
    │   ├── fence-and-decks-calgary.ts
    │   ├── snow-removal-calgary.ts
    │   └── yard-cleanup-calgary.ts
    └── lib/
        └── seo.tsx                 # buildMetadata + JSON-LD helpers + <JsonLd>
```

## 4. Quick start (local development)

```bash
# Node 20 recommended
npm install
npm run dev          # http://localhost:3000
```

Production build (static export, output in `./out`):

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
NEXT_PUBLIC_BASE_PATH= \
npm run build

npm run serve:out    # serves ./out at http://localhost:3000
```

To preview the GitHub-Pages-style subpath build locally:

```bash
NEXT_PUBLIC_SITE_URL=https://<user>.github.io/landscape \
NEXT_PUBLIC_BASE_PATH=/landscape \
npm run build
```

## 5. Environment variables

All public (compiled into the static bundle):

| Variable | Purpose | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute base URL — used in canonical, OpenGraph, sitemap, JSON-LD | `https://user.github.io/landscape` |
| `NEXT_PUBLIC_BASE_PATH` | Subpath for GH Pages project sites; empty string for custom domains/root | `/landscape` |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form id (the part after `/f/`) | `xyzabcde` |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID; analytics is omitted if empty | `G-XXXXXXX` |

For local dev, create a `.env.local` (gitignored) with any of the above.

## 6. How to modify common things

### 6.1 Change business name, phone, email, hours, service area, social links

Edit [src/config/site.ts](src/config/site.ts). It's used everywhere — header, footer, contact page, click-to-call, JSON-LD `LocalBusiness`, etc. Keep the phone in two formats:

- `phone`: `+1-403-555-0100` (used in `tel:` links and schema)
- `phoneDisplay`: `(403) 555-0100` (shown to humans)

### 6.2 Edit text on Home / About / Contact / Services overview

- Home: [src/app/page.tsx](src/app/page.tsx)
- About: [src/app/about/page.tsx](src/app/about/page.tsx)
- Contact: [src/app/contact/page.tsx](src/app/contact/page.tsx)
- Services overview: [src/app/services/page.tsx](src/app/services/page.tsx)

Each page has a `metadata` export (built via `buildMetadata`) — update title/description there for SEO.

### 6.3 Edit a service landing page

All service-page copy lives in `src/content/services/<slug>.ts`, e.g. [src/content/services/lawn-care-calgary.ts](src/content/services/lawn-care-calgary.ts). Each exports a `ServiceContent` object with:

- `metaTitle` (≤60 chars) and `metaDescription` (≤160 chars) — the search snippet
- `h1` — visible H1
- `intro` — hero subtitle paragraph
- `included` — bullet list of "What's included"
- `sections` — array of `{ heading, paragraphs[] }` (rendered as H2 + paragraphs)
- `pricing` — `{ title, notes[] }`
- `faqs` — `{ q, a }[]` (also emitted as FAQPage JSON-LD)
- `related` — slugs of related services for the sidebar

Just edit the file. No template changes needed.

### 6.4 Add a brand-new service page

1. Create `src/content/services/<new-slug>.ts` exporting a `ServiceContent` (copy an existing file as a template).
2. Register it in [src/content/services/index.ts](src/content/services/index.ts) (import + push into `allServiceContent`).
3. Add a card entry in `services` array in [src/config/site.ts](src/config/site.ts) so it shows up on the services grid + footer.
4. Done — the dynamic route auto-generates the page; sitemap auto-includes it.

### 6.5 Change colours / fonts / design

- Brand colours and theme: [tailwind.config.ts](tailwind.config.ts) (`brand`, `earth` palettes).
- Reusable component classes (`btn-primary`, `card`, `h1`, etc.): [src/app/globals.css](src/app/globals.css).
- Header/Footer layout: [src/components/Header.tsx](src/components/Header.tsx), [src/components/Footer.tsx](src/components/Footer.tsx).

### 6.6 Change where the contact form sends submissions

1. Sign in at [formspree.io](https://formspree.io), create a form, copy its ID.
2. Either set `NEXT_PUBLIC_FORMSPREE_ID` env var (preferred), or change the fallback in [src/config/site.ts](src/config/site.ts).
3. Verify your sender email when Formspree asks (one-time).

### 6.7 Add Google Analytics

1. Create a GA4 property, copy the measurement ID (`G-XXXXXXX`).
2. Set `NEXT_PUBLIC_GA_ID` in your GitHub Actions secrets (or `.env.local` for dev).
3. The script in [src/app/layout.tsx](src/app/layout.tsx) loads only when this var is set.

### 6.8 Update images / replace the hero illustration

Drop optimized **WebP** files into `public/images/` and reference them with absolute paths (e.g. `/images/hero.webp`). Use `<Image>` from `next/image` with explicit `width`/`height`; `images.unoptimized` is on (required for static export).

The current hero in [src/components/Hero.tsx](src/components/Hero.tsx) is a placeholder gradient — swap it for an `<Image>` once you have real photography.

## 7. SEO architecture (what's already done)

- **Per-page metadata** via `buildMetadata({ title, description, path })` in [src/lib/seo.tsx](src/lib/seo.tsx): sets `<title>`, meta description, canonical, OG, Twitter card.
- **JSON-LD**:
  - `LocalBusiness` is rendered in the root layout on every page.
  - `Service` + `FAQPage` + `BreadcrumbList` are rendered on each `/services/<slug>/` page.
- **Sitemap** at `/sitemap.xml` (generated by [src/app/sitemap.ts](src/app/sitemap.ts)).
- **robots.txt** at `/robots.txt` (generated by [src/app/robots.ts](src/app/robots.ts)).
- **Trailing slashes** enabled in [next.config.mjs](next.config.mjs) — required for static hosting and consistency.
- **Service URLs** follow the `<keyword>-<city>` pattern (e.g. `/services/lawn-care-calgary/`) which is what we want to rank for.

After deploy, submit `sitemap.xml` in [Google Search Console](https://search.google.com/search-console) and validate a few pages with the [Rich Results Test](https://search.google.com/test/rich-results).

## 8. Deployment

### 8.1 First-time GitHub Pages setup

1. Push the repo to GitHub.
2. **Settings → Pages → Source: GitHub Actions**.
3. **Settings → Secrets and variables → Actions → New repository secret**:
   - `NEXT_PUBLIC_FORMSPREE_ID` — your Formspree form ID
   - `NEXT_PUBLIC_GA_ID` — (optional) GA4 ID
4. Push to `main` (or run the workflow manually). The workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds, exports, and publishes.
5. Site is live at `https://<user>.github.io/<repo>/`.
6. Submit `https://<user>.github.io/<repo>/sitemap.xml` in Search Console.

### 8.2 Subsequent deploys

Just push to `main`. The workflow handles the rest.

To manually re-run a deploy: **Actions tab → "Deploy to GitHub Pages" → Run workflow**.

### 8.3 Switching to a custom domain

1. In your DNS, add the GitHub-Pages records (A records pointing to GitHub Pages IPs, plus a CNAME for `www`).
2. Create `public/CNAME` containing the bare domain (e.g. `calgarylandscaping.example`).
3. In [.github/workflows/deploy.yml](.github/workflows/deploy.yml), change:
   - `NEXT_PUBLIC_BASE_PATH:` to empty (`""` or remove the line)
   - `NEXT_PUBLIC_SITE_URL:` to `https://yourdomain.example`
4. Commit + push. In **Settings → Pages**, set the custom domain and enable "Enforce HTTPS" once the cert provisions.

## 9. Verifying a deploy

After every meaningful change:

1. `npm run build` locally — must succeed with no type/lint errors.
2. `npm run serve:out` and click around — focus on the service pages.
3. View-source on a service page → confirm:
   - Unique `<title>` reflecting the service + Calgary
   - `<meta name="description">` < 160 chars
   - JSON-LD blocks for `Service`, `FAQPage`, `BreadcrumbList`, `LocalBusiness`
4. Open `out/sitemap.xml` and confirm all routes are present with correct base URL.
5. (After deploy) Run [PageSpeed Insights](https://pagespeed.web.dev/) — target Performance ≥ 90 on mobile.
6. (After deploy) Run [Rich Results Test](https://search.google.com/test/rich-results) on a service page.

## 10. Performance principles to preserve

- Keep client-side JavaScript near zero. **Do not** add `'use client'` unless absolutely necessary — every component currently is a Server Component.
- Inline SVG / emoji for icons; avoid icon-font libraries.
- All images: WebP, explicit `width` + `height`, `loading="lazy"` for below-the-fold.
- Avoid heavy npm dependencies. If something can be done in 30 lines of vanilla code, do that.

## 11. Common pitfalls (read before debugging)

- **Asset 404s on GitHub Pages** → almost always a missing/incorrect `NEXT_PUBLIC_BASE_PATH`. It must equal `/<repo>` for project-pages, and empty for user-pages or custom domains.
- **`Image` errors at build time** → ensure `images.unoptimized: true` stays set in `next.config.mjs`. Static export does not support the optimizer.
- **`fetch` / dynamic data** → not allowed in this site without changes; everything is statically generated. Service pages enforce this with `dynamicParams = false`.
- **Trailing-slash mismatches** → always link to `/services/<slug>/` (with trailing slash). The Next.js `<Link>` honors `trailingSlash: true` from config.
- **Forms not delivering** → verify your Formspree form is **active** (not pending email confirmation) and that `NEXT_PUBLIC_FORMSPREE_ID` is set in the deploy environment.
- **GA4 not loading** → it intentionally only injects when `NEXT_PUBLIC_GA_ID` is set; check the secret in GitHub Actions.

## 12. Roadmap (phase 2+, not implemented)

- Blog (`/blog`) for SEO content marketing — keep statically generated from MDX.
- Real photography swap-in across hero + service pages.
- CMS integration (Sanity or Contentful) so the business owner can self-edit copy.
- Reviews carousel pulling from Google Business Profile.
- City expansion: clone service pages for nearby cities (Airdrie, Cochrane) once Calgary ranks.
- Move to Vercel only if a feature genuinely requires SSR or ISR.

## 13. Useful commands

```bash
npm run dev          # local dev server
npm run lint         # next lint
npm run build        # production static export → ./out
npm run serve:out    # preview ./out

# Inspect a page's title + JSON-LD types after build:
grep -oE '<title>[^<]+</title>|"@type":"[A-Za-z]+"' out/services/lawn-care-calgary/index.html
```

## 14. Where to ask follow-up questions

When the business owner asks for a change, the answer is almost always one of:

| Request | File to edit |
| --- | --- |
| Update phone / email / hours | [src/config/site.ts](src/config/site.ts) |
| Add / remove a service | [src/config/site.ts](src/config/site.ts) + [src/content/services/](src/content/services/) |
| Edit service page copy | [src/content/services/<slug>.ts](src/content/services/) |
| Change home page sections | [src/app/page.tsx](src/app/page.tsx) |
| Update About story | [src/app/about/page.tsx](src/app/about/page.tsx) |
| Adjust contact form fields | [src/components/QuoteForm.tsx](src/components/QuoteForm.tsx) |
| Change colours / typography | [tailwind.config.ts](tailwind.config.ts) + [src/app/globals.css](src/app/globals.css) |
| Modify nav links | [src/components/Header.tsx](src/components/Header.tsx) |
| Modify footer | [src/components/Footer.tsx](src/components/Footer.tsx) |
| Tweak deploy settings | [.github/workflows/deploy.yml](.github/workflows/deploy.yml) |
