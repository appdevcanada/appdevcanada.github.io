# App Dev Canada

Marketing website for App Dev Canada, an independent mobile app studio based in Canada. Built with Next.js App Router, Tailwind CSS, and next-intl.

Live at [appdevcanada.ca](https://appdevcanada.ca).

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v3
- **i18n:** next-intl v3 — locales: `en`, `fr`, `es`, `pt`, `zh` (default `en`)
- **Language:** TypeScript
- **Hosting:** Vercel, deployed from `main`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server redirects `/` to a locale-prefixed route (e.g. `/en`).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # next lint
```

## Project structure

```
app/
  [locale]/                  # all localized pages, wrapped by next-intl
    layout.tsx                # root layout, site-wide metadata, Organization JSON-LD
    page.tsx                  # home page
    presencetracker_details/  # PresenceTracker app details (About + Privacy tabs)
    presencetracker/privacy/  # standalone PresenceTracker privacy policy (App Store URL)
    privacy/                  # website privacy policy
    opengraph-image.tsx       # dynamic per-locale OG image
  presencetracker/get/       # device-aware smart redirect (see below), not locale-scoped
  robots.ts / sitemap.ts / manifest.ts
components/                  # shared React components
i18n/
  routing.ts                 # defineRouting (locales, default locale) — Edge-safe, used by middleware
  navigation.ts               # createNavigation exports (Link, redirect, useRouter, usePathname)
lib/
  seo.ts                     # SITE_URL, canonical/hreflang helpers
  presencetracker-links.ts   # App Store / Google Play URLs
messages/                    # translation JSON, one file per locale
middleware.ts                # next-intl locale routing
```

## Internationalization

- Import `Link`, `redirect`, `useRouter`, `usePathname` from `@/i18n/navigation` in pages/components — never from `next/link` or `next/navigation` directly, so locale prefixes stay correct.
- `i18n/routing.ts` only calls `defineRouting`; it must stay Edge-safe since `middleware.ts` imports it directly.
- Translation strings live in `messages/{locale}.json`, one file per locale, same key structure across all five.

## SEO

- `lib/seo.ts` centralizes the canonical domain and a `localizedAlternates(locale, pathname)` helper that every page's `generateMetadata` uses for canonical + hreflang tags.
- `app/sitemap.ts` and `app/robots.ts` are generated from the same locale list.
- `app/[locale]/opengraph-image.tsx` renders a branded per-locale social share image on the fly via `next/og`.

## PresenceTracker links

- App Store and Google Play URLs live in `lib/presencetracker-links.ts`. Google Play is `null` until Android ships — the badge on the details page renders disabled/dimmed while it is.
- `appdevcanada.ca/presencetracker/get` is a device-aware redirect meant for use in social bios: iPhone visitors go straight to the App Store, everyone else lands on the details page (or Google Play once that URL is set).

## Deployment

- **Host:** Vercel — Framework Preset must be set to **Next.js** (setting it to "Other" causes a `__dirname is not defined` middleware error).
- **Repo:** `github.com/appdevcanada/appdevcanada.github.io`, production branch `main` (`master` is kept as a manually-synced backup).
- **Domain:** registered on Porkbun.

## Contact form

The contact form on the home page submits to a Formspree endpoint and forwards to `contact@appdevcanada.ca`. Email addresses (`contact@`, `support@`, `compliance@`) are Porkbun free forwarding to a Gmail inbox.
