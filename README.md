# Oak & Linen — Next.js business website (white + beige)

Next.js 15 (App Router) + TypeScript. No UI library, no database. Light theme, image-led: illustrated arched room scenes (swappable for photos). Pages: Home, Services, About, Reviews, Contact (lead form + booking request), Privacy.

## Run
```bash
npm install
cp .env.example .env.local   # fill in lead delivery (see below)
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Make it yours (30 minutes)
1. Edit `src/lib/site.ts`: name, phone, WhatsApp number (digits only), address, hours, areas served, services, prices, reviews, FAQs. Every page, schema and the WhatsApp links read from this one file.
2. Replace `public/llms.txt` details and the sample team on `/about`.
3. Replace sample reviews with real ones, and set `googleReviewUrl`.
4. Set `NEXT_PUBLIC_SITE_URL` to your live domain.
5. Swap illustrations for real photos: add a `photo: "/projects/living.jpg"` field to any item in `projects` (site.ts) or pass `photo="…"` to `<Room>`. Files go in `public/projects/`. Photos render through `next/image` (AVIF/WebP, lazy-loaded); the arched frames crop them automatically. Use portrait photos (4:5) for best results.

## Lead flow
Form → `POST /api/lead` → validated, rate-limited, honeypot-checked → emailed via Resend and/or sent to a webhook (Zapier, Make, n8n, CRM). In production the API returns an error if no delivery is configured, so you never lose a lead silently. The success screen offers a WhatsApp follow-up. UTM parameters and the source page are attached to each lead.

## SEO
- Unique title, description and canonical per page (`src/lib/seo.ts`)
- `sitemap.xml`, `robots.txt`, Open Graph image (generated), favicon
- JSON-LD: LocalBusiness/ProfessionalService (address, geo, hours, areaServed, service catalogue), FAQPage, BreadcrumbList
- Server-rendered HTML, one `h1` per page, semantic landmarks, descriptive link text

## GEO (local + AI answer engines)
- Local: consistent name/address/phone, `areaServed`, `geo`, city named in titles and copy. Also claim a Google Business Profile with identical details; it matters more than anything else here.
- AI search: answer-first copy (prices, timelines, how to book stated plainly), FAQ markup, `public/llms.txt`, AI crawlers explicitly allowed in `robots.ts`. Remove any bot there you do not want.
- `aggregateRating` markup is deliberately not used: Google ignores or penalises self-published review ratings. Collect reviews on Google/Houzz.

## Performance
Static prerendering for all content pages, self-hosted fonts via `next/font` (no render-blocking requests), ~105 kB first-load JS, no client JS except the menu and form, AVIF/WebP image config, long-lived caching for static assets, reduced-motion respected.

## Security
Headers in `next.config.mjs`: CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP. `X-Powered-By` removed. The lead API enforces same-origin, size limit, input sanitising, per-IP rate limiting and a honeypot. Secrets stay server-side. The in-memory rate limiter is per instance; use Upstash/Redis or your host's WAF for multi-instance deployments. Keep dependencies updated (`npm audit`).

## Deploy
Vercel (zero config), or any Node host with `npm run build && npm start`. Add the env vars from `.env.example`, then submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Placeholders to replace before launch
All phone numbers, the address, team names, reviews, social URLs and privacy text are samples.
