# Calgary Landscaping Website

Fast, SEO-optimized static site for a local Calgary landscaping business. Built with **Next.js (App Router) + static export**, **Tailwind CSS**, and deployed to **GitHub Pages** via GitHub Actions.

## Stack

- Next.js 14 App Router, `output: 'export'`
- Tailwind CSS + `@tailwindcss/typography`
- Formspree contact form (no backend)
- Google Analytics 4 (optional)
- JSON-LD: `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`
- Auto-generated `sitemap.xml` and `robots.txt`

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build (static export)

```bash
NEXT_PUBLIC_SITE_URL=https://<user>.github.io/landscape \
NEXT_PUBLIC_BASE_PATH=/landscape \
npm run build
# outputs to ./out
npm run serve:out  # preview the static export locally
```

## Configuration

Edit [src/config/site.ts](src/config/site.ts) to set business name, phone, email, address, hours, social links, and service area. This is the single source of truth used in the header, footer, contact page, and `LocalBusiness` schema.

Environment variables (set as GitHub Actions secrets or in `.env.local` for dev):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute base URL used in canonical, OG, sitemap |
| `NEXT_PUBLIC_BASE_PATH` | URL subpath when hosting at `*.github.io/<repo>` |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID for the quote form |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (optional) |

## Adding / editing service pages

Each service landing page lives in [src/content/services/](src/content/services/) (one file per slug). Edit the metaTitle, metaDescription, H1, sections, pricing, and FAQs. New services: create a file, add it to [src/content/services/index.ts](src/content/services/index.ts), and add a card entry in [src/config/site.ts](src/config/site.ts).

Routes are statically generated from those files via [src/app/services/[slug]/page.tsx](src/app/services/[slug]/page.tsx).

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. (Optional) In **Settings → Secrets and variables → Actions**, add:
   - `NEXT_PUBLIC_FORMSPREE_ID` — your Formspree form ID
   - `NEXT_PUBLIC_GA_ID` — your GA4 measurement ID
4. Push to `main`. The workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml) will build and deploy.
5. Submit the sitemap (`https://<user>.github.io/landscape/sitemap.xml`) to Google Search Console.

### Custom domain

When ready to use a custom domain:

1. Add a `CNAME` file under `public/` containing your domain (e.g. `example.com`).
2. Set `NEXT_PUBLIC_BASE_PATH=""` and `NEXT_PUBLIC_SITE_URL=https://example.com` in the workflow.
3. Configure DNS as per [GitHub Pages docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Global metadata, GA4, JSON-LD, header/footer/sticky CTA
│   ├── page.tsx                # Home
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── services/page.tsx       # Services overview
│   ├── services/[slug]/page.tsx # Dynamic service landing pages
│   ├── sitemap.ts
│   ├── robots.ts
│   └── not-found.tsx
├── components/                 # Header, Footer, Hero, FAQ, QuoteForm, CTASection, etc.
├── config/site.ts              # Business NAP & service definitions
├── content/services/           # Long-form per-service content + FAQs
└── lib/seo.tsx                 # Metadata + JSON-LD helpers
```

## SEO checklist after deploy

- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Verify ownership in Search Console
- [ ] Create / claim Google Business Profile (NAP must match `src/config/site.ts`)
- [ ] Test pages with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Run Lighthouse on the deployed URL (target 90+ in all categories)
- [ ] Submit business to local directories (Yelp, YellowPages.ca, Houzz, BBB)
- [ ] Encourage early Google reviews from real customers
