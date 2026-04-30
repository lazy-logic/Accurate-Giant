# Accurate Giant Company Ltd. — website

A modern, charity-led marketing and information site for an NLA-licensed Ghanaian lotto operator. Built per the spec in [AccurateGiant_SuperPrompt.md](AccurateGiant_SuperPrompt.md).

> **Status:** §8 step 4 of the super-prompt deliverables. The six wireframed pages (Home, Games, Game Detail, Results, About, Responsible Play) are implemented in high-fidelity. Other routes (How to play, Agents, News, Contact, Legal/\*) are stubbed with a shared `StubPage` component so navigation never 404s. Supabase (step 6) and the results pipeline (step 7) come next.

---

## Quick start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

> **First time after `git clone`?** Until you run `npm install`, your IDE will show "Cannot find module 'next/link'" and "JSX element implicitly has type 'any'" errors throughout the codebase. That's expected — the source assumes its dependencies are installed. Run install once and the diagnostics clear.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Local dev server with hot reload (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint (Next.js default config — to be tuned) |
| `npm run typecheck` | `tsc --noEmit` — should run clean before any PR |

## Stack

Per super-prompt §5:

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS v4 with `--brand-*` custom properties (CSS-first config — see [app/globals.css](app/globals.css))
- **Animation:** Framer Motion (GSAP arrives later for the GSAP-specific digit reveal — see [components/results/NumberChip.tsx](components/results/NumberChip.tsx))
- **Icons:** Lucide React
- **Fonts:** `next/font/google` — Fraunces (display) + Inter (body)
- **Images:** `next/image` with AVIF/WebP

Not yet wired (deferred to later super-prompt steps):

- shadcn/ui (currently using lightweight in-house primitives in `components/ui/`)
- Supabase (mock data in `lib/games.ts` and `lib/results.ts`)
- React Hook Form + Zod (forms come with the contact route build-out)
- Playwright + axe-core (CI gate before launch)
- next-intl (English-first; structure left intact for later French / local-language)

## Project layout

```
ACCURATE_GAINT/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout — fonts, Header, Footer
│   ├── globals.css            # Tailwind v4 + design tokens
│   ├── page.tsx               # Home (composed from components/home/*)
│   ├── games/
│   ├── results/
│   ├── about/
│   ├── responsible-play/
│   ├── how-to-play/           # Stub
│   ├── agents/                # Stub
│   ├── news/                  # Stub
│   ├── contact/               # Stub
│   ├── legal/{terms,privacy,license,cookies}/  # Stubs
│   └── not-found.tsx
├── components/
│   ├── layout/                # Header, Footer, Container, TrustStrip, StubPage
│   ├── ui/                    # Button, Badge (in-house primitives)
│   ├── games/                 # GameTile
│   ├── results/               # NumberChip, NumberRow, LatestDrawCard
│   └── home/                  # Hero, MissionStrip, ResultsWidget, FeaturedGames, …
├── lib/
│   ├── utils.ts               # cn(), date formatters
│   ├── games.ts               # 15-game seed catalogue
│   └── results.ts             # Mock winning numbers
├── public/
│   ├── brand/ag-logo.png      # Supplied logo (PNG only — no SVG, per owner)
│   └── inspiration/           # Discovery-phase reference research
└── docs/                      # Discovery + design deliverables
    ├── design-brief.md
    ├── content-inventory.md
    ├── nla-compliance.md
    ├── brand-tokens.md
    ├── design-system.md
    └── wireframes.md
```

## How to read the codebase

Every file has a header comment describing its role. Specifically:

- **Design tokens.** Single source of truth is the `@theme` block in [app/globals.css](app/globals.css). Never hardcode hex values, font families, or radius pixels — always reference a `--color-brand-*`, `--font-*`, or `--radius-*` token. If you need a new one, add it there first.
- **The `cn()` helper** in [lib/utils.ts](lib/utils.ts) is how every component composes Tailwind classes. It de-duplicates conflicting utilities (e.g. `px-2 px-4` → `px-4`).
- **Game data** flows from [lib/games.ts](lib/games.ts). The `featured: true` flag drives the Home page Featured Games strip — flip it on/off there, not in the component.
- **Results data** flows from [lib/results.ts](lib/results.ts). When Supabase is wired, the helper signatures stay the same so call-sites don't change.
- **Disclosures.** The footer renders MANDATORY regulatory disclosures on every page (NLA license, 18+, Responsible play, charity-status). Don't remove them — see [docs/nla-compliance.md](docs/nla-compliance.md).

## Outstanding owner-supplied content

Marked as `[OWNER]` or `[TBC]` in the codebase. Tracked in [docs/content-inventory.md §4](docs/content-inventory.md):

1. NLA license number (renders in footer + about page)
2. Audited annual giving figure (renders in homepage callout + about page)
3. Leadership names + photos + bios (about page)
4. Approved Accra agent list (agent locator page)
5. Per-game ticket prices, exact draw times, prize structures (NLA-sourced)
6. Self-exclusion mechanism (responsible-play page)
7. Ghana-specific support helplines (responsible-play page)
8. Real winners' photography (homepage stories strip)
9. Office address + phone numbers (footer + about + contact)
10. Privacy / Terms / License / Cookies copy (legal review)

## Compliance gate (must pass before launch)

See [docs/nla-compliance.md §9](docs/nla-compliance.md) for the full pre-launch checklist. Short version:

- ✅ License number, 18+ badge, and Responsible play link are in the global footer
- ✅ `/responsible-play` exists and is keyboard / screen-reader accessible
- ⏳ NLA logo permission documented (the logo MUST NOT appear until then)
- ⏳ Results-data permission + refresh cadence documented
- ⏳ Privacy / Terms / License / Cookies reviewed by counsel

## Where things go next

Per the super prompt's deliverable order ([§8](AccurateGiant_SuperPrompt.md)):

- **Step 6 — Supabase schema + admin.** Migrate `games`, `draws`, `winning_numbers`, `agents`, `posts`, plus the Supabase-Auth-gated `/admin` route.
- **Step 7 — Results pipeline.** Manual ingest first, scheduled poll later. Critical: per [docs/nla-compliance.md §5](docs/nla-compliance.md), do NOT scrape `nla.com.gh` per-request — mirror with permission and a documented refresh cadence.
- **Step 8 — Content load.** Replace every `[OWNER]` and `[TBC]` placeholder with real copy.
- **Step 9 — Pre-launch compliance pass.** Walk the checklist with the owner and counsel.
- **Step 10 — Launch on Vercel + Supabase**, plus an admin runbook in `docs/`.
