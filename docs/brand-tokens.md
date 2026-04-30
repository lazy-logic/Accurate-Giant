# Brand Tokens — Accurate Giant Company Ltd.

**Status:** Brand colours and primary logo supplied by the project owner on 2026-04-29. Type pairing and supporting tokens remain placeholders until further input.

**Source asset:** [public/brand/ag-logo.png](../public/brand/ag-logo.png) — full lockup (monogram + wordmark) on transparent background.

---

## 1. Colour tokens

Two brand colours are supplied. Both render as CSS custom properties so the rest of the system flows from them.

| Token | Hex | Role |
|-------|-----|------|
| `--brand-primary` | `#013299` | Deep blue. Primary brand colour. Used for the "G" of the monogram and the "ACCURATE GIANT" wordmark. |
| `--brand-secondary` | `#00B9EF` | Cyan. Secondary brand colour. Used for the "A" of the monogram and "COMPANY LTD." wordmark. |

### Extended palette — neutrals confirmed as grey / dark grey

Owner confirmed 2026-04-29 that the two brand blues blend with a fine grey + dark-grey neutral system. State colours remain DRAFT.

| Token | Hex | Role |
|-------|-----|------|
| `--brand-ink` | `#1A1F2B` | Primary text. Dark grey with a faint warm tilt — sits cleanly next to `--brand-primary` without competing for attention. |
| `--brand-ink-muted` | `#5B6473` | Secondary text, captions, metadata. Mid grey. |
| `--brand-paper` | `#FFFFFF` | Page background. |
| `--brand-paper-muted` | `#F5F6F8` | Section dividers, subtle surfaces, table zebra rows. Light grey. |
| `--brand-paper-sunken` | `#ECEEF2` | Inset surfaces (skeleton states, code blocks, draw-archive backdrop). |
| `--brand-border` | `#D9DDE5` | Hairlines, card outlines. |
| `--brand-border-strong` | `#A7AEBC` | Form-input borders, hover affordance on cards. |
| `--brand-success` | `#0E8C4D` | Winning-number highlight, positive states. (DRAFT) |
| `--brand-warning` | `#C77A00` | Responsible-play notices. (DRAFT) |
| `--brand-danger` | `#C0392B` | Errors. (DRAFT) |

> Greys are tuned cool-neutral so they sit calmly next to `#013299` without picking up a competing tint. Owner to confirm the three state colours or supply substitutes; the two brand blues and the grey ramp are locked.

### Accessibility check (preliminary)

| Foreground | Background | Contrast ratio | WCAG AA |
|------------|------------|----------------|---------|
| `--brand-primary` (#013299) | white | ~12.6 : 1 | Pass for body and large |
| `--brand-secondary` (#00B9EF) | white | ~2.6 : 1 | **Fails AA for body text** |
| `--brand-secondary` (#00B9EF) | `--brand-primary` (#013299) | ~4.8 : 1 | Pass for large text only |
| white | `--brand-primary` (#013299) | ~12.6 : 1 | Pass |

**Implication:** the cyan `--brand-secondary` is **not safe for body text on white**. Reserve it for:
- Decorative accents (the stacked "A" of the lockup, illustrated motifs)
- Active / hover state on solid-blue surfaces
- Filled badges / chips where the cyan is the *background* and white sits on it

For accent body text on white, use `--brand-primary` (the deep navy blue).

---

## 2. Logo usage

**Primary lockup:** [public/brand/ag-logo.png](../public/brand/ag-logo.png) — full monogram + wordmark. **Format: PNG only for now per owner direction (2026-04-29). Do not generate or substitute an SVG.**

### Format handling

- The supplied PNG is the only approved logo file. Use it as-is everywhere it appears.
- Do **not** invert, recolour, trace, or auto-vectorise it. If a darker-surface treatment is needed, place the PNG on `--brand-paper` (white) or `--brand-paper-muted` inside its container instead of altering the file.
- Use `next/image` so the PNG is served at appropriately scaled sizes per viewport (avoids excess bytes on mobile and keeps it crisp on retina without an SVG).
- Header rendering: 32–40 px tall on desktop, 28 px on mobile.
- Mobile-first containers should reserve the full-lockup width to avoid wordmark crowding.

### Still needed (owner)

- **Mono / inverse PNG variants.** Useful for: footer on a dark surface, single-colour stamps, favicons. Until supplied, the dark / inverse treatment is "place the colour PNG on a light tile" rather than recolouring.
- **Monogram-only PNG.** For favicon and Open Graph share card. Without it we ship a placeholder favicon at launch.
- **Clear-space and minimum-size guidelines.** If a brand book exists, share it; otherwise we'll define internal rules and document under `docs/decisions/`.

---

## 3. Typography — locked (updated 2026-04-30)

| Role | Family | Loaded via | Weights |
|------|--------|------------|---------|
| Display (h1, h2, h3, big numerals) | **Montserrat** | `next/font/google` | 400, 600, 700, 800, 900 |
| Body / UI | **Inter** | `next/font/google` | 400, 500, 600, 700 |

Default heading weights are heavy by design (h1 = 800, h2 = 700, h3 = 700) — Montserrat at 400 reads thin and unconvincing at display sizes. See [ADR 0009](decisions/0009-montserrat-inter-type-pair.md) for the move from Fraunces.

Type scale ratio is **1.333** (perfect fourth) — bigger steps than the previous 1.250 so display sizes feel confidently large. Full scale in [docs/design-system.md §1.2](design-system.md).

---

## 4. CSS custom-property contract

All colour tokens above are exposed at `:root` so the brand swap is a single-file change, per super prompt §10. Implementation will live in `app/globals.css` once the build phase begins:

```css
:root {
  /* Brand — locked */
  --brand-primary: #013299;
  --brand-secondary: #00B9EF;

  /* Neutral grey ramp — locked (owner-confirmed) */
  --brand-ink: #1A1F2B;
  --brand-ink-muted: #5B6473;
  --brand-paper: #FFFFFF;
  --brand-paper-muted: #F5F6F8;
  --brand-paper-sunken: #ECEEF2;
  --brand-border: #D9DDE5;
  --brand-border-strong: #A7AEBC;

  /* State — DRAFT, owner to confirm */
  --brand-success: #0E8C4D;
  --brand-warning: #C77A00;
  --brand-danger: #C0392B;
}
```

No component is allowed to hardcode `#013299` or `#00B9EF` — always reference the token.

---

## 5. Outstanding owner decisions

1. Mono / inverse logo variants — **PNG only, no SVG** per 2026-04-29 direction.
2. Monogram-only PNG for favicon / OG.
3. Confirm or substitute the three DRAFT state colours (`--brand-success` / `--brand-warning` / `--brand-danger`).
4. Confirm typography pairing (Inter + Fraunces by default).
5. Brand-book / clear-space rules (if any).
6. Photography direction beyond the super-prompt note ("real Ghanaian people and locations").
