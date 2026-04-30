# Super Prompt — Accurate Giant Company Ltd. Website

> Hand this entire document to a developer, Cursor, or Claude Code. It is self-contained.

---

## 1. Mission

Build a modern, brand-defining marketing and information website for **Accurate Giant Company Ltd.**, a Ghanaian charity organisation fully licensed by the National Lottery Authority (NLA) to run lotto in Accra. The site must:

- Communicate the charity mission clearly.
- Showcase every NLA-licensed game on offer.
- Display recent winning numbers in a contemporary, design-led way.
- Meet Ghana's lottery / gaming regulatory requirements.

The reference brand is in the lottery space, but the visual language should feel like a **modern fintech / consumer brand** — calm, premium, optimistic — not the noisy "scratch-card" aesthetic of legacy lottery sites. The site should *speak modern*.

---

## 2. Reference research — study these and extract before designing

Before writing a line of UI, study the following sites and produce a `docs/design-brief.md` capturing what to keep, what to discard, and what to modernise. Save every screenshot, hero image, illustration, and useful piece of copy into `public/inspiration/<source>/` organised by source folder.

| Reference | What to mine |
|-----------|--------------|
| https://myalphaonline.com | **Content and concept only.** The design is dated — extract their information architecture, page list, copy patterns, charity narrative, agent / locations model. Do NOT reuse visuals. |
| https://theluckiestafrica.com | Mood, tone of voice for an Africa-focused lotto brand, photography direction. |
| https://www.agentlotto.com/en/home/ | Product catalogue layout, results display patterns, agent / how-to-play sections. |
| https://www.nla.com.gh/products | **Authoritative source for the games catalogue.** Replicate the full product list (all NLA-licensed games) — names, descriptions, draw schedules, ticket prices. |
| https://www.nla.com.gh | **Authoritative source for the winning-numbers display.** Mirror the data structure and freshness, then re-imagine the visual treatment in a modern way. |

**Discovery output before any design work begins:**

- `docs/design-brief.md` — what we're keeping, what we're modernising, IA decisions.
- `docs/content-inventory.md` — every game, every page, every copy block we'll need.
- `docs/nla-compliance.md` — regulatory notes (license display, responsible play, 18+, charity disclosure, NLA logo usage).
- `public/inspiration/` — all extracted reference imagery, organised by source.

---

## 3. Brand and visual direction

- Brand assets (logo, colours, type) will be supplied separately. **Until they arrive, design with a neutral premium palette** (deep navy / off-white / one accent) and clearly mark all colour tokens as `--brand-*` CSS custom properties so swapping in the real brand is a one-file change.
- **Type pairing:** clean modern sans (Inter, Geist, or Satoshi) for body, and one expressive display face (Fraunces, Playfair, or a custom display) for headlines. Configure both via `next/font`.
- **Motion language:** tasteful, not gimmicky. Numbers reveal one digit at a time on the results page. Hero has a subtle parallax. Page transitions use a single shared element across navigation. Respect `prefers-reduced-motion`.
- **Imagery:** real Ghanaian people and locations where possible (placeholders until photography is sourced). Avoid generic stock-money imagery.

---

## 4. Information architecture

| Page | Purpose |
|------|---------|
| `/` Home | Hero, charity mission line, latest results widget, featured games (3 highest-volume), trust strip (NLA license, 18+, responsible play), winners stories, agent locator CTA. |
| `/games` | Full product catalogue mirroring `nla.com.gh/products`. Each game has its own detail page. |
| `/games/[slug]` | Game rules, draw schedule, ticket price, how to play, recent results for that game. |
| `/results` | Modern winning-numbers display. Filterable by game and date. Auto-refreshes. |
| `/about` | Charity mission, leadership, NLA license, audited annual giving. |
| `/how-to-play` | Step-by-step. Includes the agent network model. |
| `/agents` | Locator / list of approved agents in Accra. |
| `/responsible-play` | Mandatory regulatory page — links to support resources, self-exclusion, age verification messaging. |
| `/news` | Charity outcomes and big-winner stories. Lightweight blog. |
| `/contact` | Contact form + office address + license number. |
| `/legal/*` | Terms, Privacy, License & Regulation, Cookie Policy. |

---

## 5. Technical stack — make these decisions

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript (strict).
- **Styling:** Tailwind CSS v4 with brand colour custom properties + shadcn/ui as the component baseline.
- **Animation:** Framer Motion for component-level motion, GSAP for the results reveal.
- **Forms:** React Hook Form + Zod.
- **Icons:** Lucide React.
- **Fonts:** `next/font` for Inter + display face.
- **Images:** `next/image` with AVIF; all imagery served from `/public` (organised — see structure below).
- **CMS / data layer:** Supabase (Postgres) for `games`, `draws`, `winning_numbers`, `agents`, and `posts` tables. Server components fetch directly via the Supabase client; ISR for marketing pages, on-demand revalidation for results.
- **Auth (admin only):** Supabase Auth, locked to a single admin role, used for an internal `/admin` route to publish results and stories.
- **Deploy:** Vercel for frontend, Supabase for database.
- **Quality:** ESLint, Prettier, Playwright E2E for the results page and game catalogue, `axe-core` for accessibility, Lighthouse budgets in CI (LCP < 2.0s on 4G, CLS < 0.05).
- **i18n:** English first; structure routes with `next-intl` so French / local languages can be added without refactor.

---

## 6. Folder structure

```
accurate-giant/
├── app/                              # Next.js routes
│   ├── (marketing)/
│   ├── games/
│   ├── results/
│   ├── about/
│   ├── how-to-play/
│   ├── agents/
│   ├── responsible-play/
│   ├── news/
│   ├── legal/
│   ├── admin/                        # Supabase-auth gated
│   └── api/
├── components/
│   ├── ui/                           # shadcn/ui primitives
│   ├── results/                      # WinningNumbersCard, ResultsTimeline
│   ├── games/                        # GameTile, GameDetail
│   └── layout/
├── lib/                              # supabase client, utils, schemas
├── content/
│   └── pages/                        # MDX for slow-changing copy
├── public/
│   ├── brand/                        # Logo and brand assets (placeholder until supplied)
│   ├── inspiration/                  # Extracted reference imagery
│   │   ├── myalphaonline/
│   │   ├── theluckiestafrica/
│   │   ├── agentlotto/
│   │   ├── nla-products/
│   │   └── nla-results/
│   ├── games/                        # Per-game art (final)
│   └── photography/                  # Hero and editorial photography
├── docs/
│   ├── design-brief.md               # Output of reference research
│   ├── content-inventory.md          # Every page + every copy block
│   ├── nla-compliance.md             # Regulatory notes
│   └── decisions/                    # ADRs
├── supabase/
│   └── migrations/                   # games, draws, winning_numbers, agents, posts
└── tests/
```

---

## 7. Regulatory and trust requirements (non-negotiable)

- The NLA license number must appear in the **footer of every page** and on the About / License pages.
- "18+ only" badge in the footer and at every game / results entry point.
- A `/responsible-play` page is mandatory and must link to nationally recognised support resources.
- Disclose the **charity status** of Accurate Giant Company Ltd. clearly on the homepage and About page.
- Use of the **official NLA logo** is permitted only with written permission and only on the License & About pages — confirm and document the permission before deploy.
- Read the NLA regulatory guidelines (and any Gaming Commission of Ghana guidance) before launch and capture the required disclosures in `docs/nla-compliance.md`. Build a checklist; do not deploy until every item is signed off.
- Cookie consent banner. Privacy policy compliant with Ghana's Data Protection Act (Act 843).

---

## 8. Deliverables — in this order

1. **Discovery output** — `docs/design-brief.md`, `docs/content-inventory.md`, `docs/nla-compliance.md`, `public/inspiration/` populated.
2. **Design system foundations** — colour tokens (placeholder palette), type scale, spacing, motion principles.
3. **Wireframes** for Home, Games, Game Detail, Results, About, Responsible Play.
4. **High-fidelity design** for the same six pages, with a stand-in logo until brand assets land.
5. **Frontend implementation** — pages above, fully responsive (320px → 1920px), accessible to WCAG 2.1 AA.
6. **Supabase schema + admin** — `games`, `draws`, `winning_numbers`, `agents`, `posts`. Seed with the full nla.com.gh game list.
7. **Results pipeline** — way to ingest official NLA draw results (manual at first, scheduled later) and publish them to `/results` within minutes.
8. **Content load** — ship every page populated with real copy from the discovery phase, not Lorem ipsum.
9. **Pre-launch compliance pass** — checklist from `docs/nla-compliance.md` complete and signed off.
10. **Launch on Vercel + Supabase**, with monitoring and an admin runbook in `docs/`.

---

## 9. Do NOT do these yet

- Do not finalise the colour palette or typography until the brand logo is supplied.
- Do not display the NLA logo anywhere until written usage permission is documented.
- Do not deploy to production until the regulatory checklist is complete.
- Do not scrape live winning numbers from `nla.com.gh` on every page request — mirror the data with permission and a documented refresh cadence.
- Do not build a ticket-purchase flow in this phase. This site is **brochure + results display + agent locator**, not a transactional gambling platform. Selling tickets directly online is a separate licensing question.

---

## 10. Acceptance criteria

- Lighthouse Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95 on mobile.
- Core Web Vitals in the green on a mid-tier Android device on 4G.
- Every page passes `axe-core` automated accessibility checks.
- Results page renders the 5 most recent draws within 1.5 seconds of navigation.
- Brand colour swap is a single CSS file edit.
- All regulatory disclosures present on every page where required.
- The site reads as **modern Ghanaian charity fintech**, not "lottery website circa 2014."

---

## 11. First steps for the build agent

When you receive this prompt, your first three actions are:

1. Visit each reference URL in §2, capture screenshots and useful imagery, and save them under `public/inspiration/<source>/`.
2. Produce `docs/design-brief.md`, `docs/content-inventory.md`, and `docs/nla-compliance.md`.
3. Stop and check in with the project owner before any high-fidelity design work — confirm IA, content inventory, and the regulatory checklist are accurate.

Do **not** start building components before the discovery deliverables in §8 step 1 are approved.

---

*Prepared for Accurate Giant Company Ltd. — a Ghanaian charity licensed by the NLA to run lotto in Accra.*
