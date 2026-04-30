/**
 * Homepage hero — overhauled.
 *
 * Composition:
 *  - Two-column on lg+: copy left (7/12), three-phone cascade right (5/12)
 *  - Mobile: copy stacked above the cascade
 *
 * Headline:
 *  - "Lotto played for [WORD]." with [WORD] cycling via TypewriterRotate
 *  - Sized to FIT the column at every breakpoint (no per-word wrapping)
 *  - Two visible lines: "Lotto played for" + "[word]."
 *
 * Visual:
 *  - Three phones in a layered cascade — back-left side menu, back-right
 *    game detail, front-centre dashboard. Subtle rotations give depth.
 *  - Floating "Live draws" annotation card with a pulsing dot
 *  - Soft mesh-gradient background blob behind the cascade
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Smartphone, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PhoneFrame } from "@/components/marketing/PhoneFrame";
import { TypewriterRotate } from "@/components/marketing/TypewriterRotate";

const SCREENSHOTS = {
  dashboard: "/app-screenshot/app-dashboard.jpg",
  sideMenu: "/app-screenshot/app-menu.jpg",
  gameDetail: "/app-screenshot/app-game-detail.jpg",
};

const ROTATING_WORDS = [
  "Real wins.",
  "Real chances.",
  "Instant payout.",
];

export function Hero() {
  return (
    /*
     * IMPORTANT layout choices:
     *  1. No `bg-brand-paper` on the section — the body already supplies the
     *     white surface. With a section background AND children using
     *     negative z-index, the decorative layers get painted behind the
     *     section's own background and disappear (CSS stacking-context rule).
     *  2. Negative top margin + matching top padding pulls the section UP
     *     into the area occupied by the floating glass header, so the
     *     patterns extend all the way to the top of the viewport. The
     *     glassmorphic navbar then sits visually ON the patterns.
     *  3. `overflow-hidden` clips orbs cleanly to the section bounds.
     */
    <section className="relative overflow-hidden -mt-28 md:-mt-32 pt-28 md:pt-32">
      {/*
       * Layer 1: bold mesh gradient — multiple radial colour pools.
       * Inline style sidesteps Tailwind v4's arbitrary-value parser, which
       * can choke on deeply nested commas/parens (was the cause of the
       * patterns rendering as plain white in an earlier iteration).
       */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 92% -10%, rgba(0,185,239,0.45), transparent 60%), radial-gradient(ellipse 60% 70% at 8% 110%, rgba(1,50,153,0.30), transparent 55%), radial-gradient(circle at 60% 95%, rgba(0,185,239,0.18) 0%, transparent 50%), radial-gradient(circle at 28% 18%, rgba(255,255,255,0.85) 0%, transparent 65%)",
        }}
      />

      {/* Layer 2: dot grid (visible — bigger dots, deeper colour) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(1,50,153,0.30) 1.4px, transparent 1.4px)",
          backgroundSize: "30px 30px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 95%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 95%)",
        }}
      />

      {/* Layer 3: blueprint vertical lines on the right */}
      <div
        aria-hidden
        className="absolute right-0 top-0 z-0 w-1/2 h-full"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(1,50,153,0.20) 1px, transparent 1px)",
          backgroundSize: "48px 100%",
          maskImage: "linear-gradient(to left, black 35%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 35%, transparent 100%)",
        }}
      />

      {/*
       * Layer 4: animated glow orbs CLUSTERED behind the phone cascade
       * on the right. They sit at z-0 (below content's z-10) so the phones
       * float on top of a moving aurora-like backdrop.
       *
       * Keyframes live in globals.css under .hero-orb-a/b/c so Tailwind
       * doesn't need to parse arbitrary animation values.
       */}
      {/*
       * Layer 4: animated glow orbs behind the phone cascade. Dialled WAY
       * down (was 0.55–0.85 opacity, blur 70–85px). The cascade was reading
       * as "too much colour" with the phone-frame halos stacking on top.
       * Now a single, quiet ambient wash on the right side.
       */}
      <div
        aria-hidden
        className="hero-orb-b absolute z-0 rounded-full pointer-events-none"
        style={{
          top: "18%",
          right: "12%",
          width: "440px",
          height: "440px",
          background: "rgba(1,50,153,0.20)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="hero-orb-a absolute z-0 rounded-full pointer-events-none"
        style={{
          bottom: "-6%",
          right: "4%",
          width: "320px",
          height: "320px",
          background: "rgba(0,185,239,0.18)",
          filter: "blur(70px)",
        }}
      />

      {/*
       * Layer 5: single decorative ball-cradle prop in the bottom-left,
       * reduced size, half off-screen so the balls feel like they're
       * rolling into frame from below.
       *
       * pointer-events:none + z-0 — sits behind content, doesn't capture clicks.
       */}
      <div
        aria-hidden
        className="absolute -bottom-16 -left-20 md:-left-12 z-0 w-[340px] md:w-[440px] lg:w-[520px] pointer-events-none opacity-95 select-none"
      >
        <Image
          src="/games/ball-shape19-1.webp"
          alt=""
          width={1100}
          height={760}
          priority
          className="w-full h-auto"
        />
      </div>

      <Container>
        {/* relative + z-10 puts the content above the decorative layers.
            Top padding cut down so the headline lands close to the navbar
            instead of floating in empty space. items-start on lg keeps the
            left copy column anchored to the top — without it, the centre
            alignment pushes the copy down to vertically match the taller
            phone cascade and reopens the gap. */}
        <div className="relative z-10 pt-14 md:pt-20 lg:pt-24 pb-16 md:pb-24 lg:pb-28 grid gap-14 lg:gap-10 lg:grid-cols-12 items-center lg:items-start">
          {/* ───── Copy column ───── */}
          <div className="lg:col-span-7">
            {/* Eyebrow now carries the channel callout (was the NLA badge) */}
            <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 px-3.5 py-1.5 rounded-full border border-brand-border bg-brand-paper text-xs font-semibold text-brand-ink mb-7 shadow-soft">
              <span className="inline-flex items-center gap-1.5">
                <Smartphone size={13} strokeWidth={2.25} className="text-brand-primary" />
                Play via the AG mobile app
              </span>
              <span className="text-brand-border">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Phone size={13} strokeWidth={2.25} className="text-brand-primary" />
                Or USSD on any phone
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl text-brand-ink text-balance">
              <span className="block">Real games.</span>
              {/* Typewriter sized one step down so it sits as a subtle accent
                  under the static lead instead of competing with it. */}
              <span className="block text-4xl md:text-5xl xl:text-6xl mt-1">
                <TypewriterRotate
                  words={ROTATING_WORDS}
                  className="text-brand-primary"
                />
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-brand-ink-muted leading-relaxed max-w-xl text-balance">
              Eleven NLA-licensed draws. Audited every year. Proceeds
              directed to schools, clinics, and community work across Ghana.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/results"
                className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white text-base font-semibold hover:bg-[#01277a] transition-all duration-150 shadow-soft"
              >
                View latest results
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/agents"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-brand-primary/40 text-brand-primary text-base font-semibold hover:bg-brand-paper-muted hover:border-brand-primary transition-all duration-150"
              >
                <MapPin size={18} strokeWidth={2} />
                Find an agent
              </Link>
            </div>
          </div>

          {/* ───── Visual column — three-phone cascade ───── */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto flex items-center justify-center min-h-[520px] lg:min-h-[640px]">
              {/* Soft glow blob behind the cascade */}
              <div
                aria-hidden
                className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,185,239,0.20),_transparent_60%),radial-gradient(circle_at_30%_70%,_rgba(1,50,153,0.15),_transparent_60%)] blur-2xl"
              />

              {/* Back-left phone (side menu) — bumped from 170×360 to 220×460 */}
              <div className="absolute hidden md:block -left-4 lg:-left-6 top-10 z-10">
                <PhoneFrame
                  src={SCREENSHOTS.sideMenu}
                  alt="Accurate Giant app side menu"
                  width={220}
                  height={460}
                  tilt={-9}
                />
              </div>

              {/* Back-right phone (game detail) — same bump */}
              <div className="absolute hidden md:block -right-4 lg:-right-6 top-16 z-10">
                <PhoneFrame
                  src={SCREENSHOTS.gameDetail}
                  alt="Accurate Giant game detail screen"
                  width={220}
                  height={460}
                  tilt={9}
                />
              </div>

              {/* Front-centre phone — dashboard */}
              <div className="relative z-20">
                <PhoneFrame
                  src={SCREENSHOTS.dashboard}
                  alt="Accurate Giant mobile app dashboard with NLA games"
                  width={260}
                  height={540}
                  tilt={-2}
                  priority
                />
              </div>

              {/* Floating "Live" annotation card */}
              <div className="absolute right-0 lg:-right-4 bottom-8 z-30 rounded-2xl bg-brand-paper border border-brand-border shadow-lifted px-4 py-3 max-w-[210px] -rotate-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-1">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-brand-success opacity-75 animate-ping" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-brand-success" />
                  </span>
                  Live draws
                </div>
                <p className="text-sm text-brand-ink leading-snug">
                  Results stream straight to your phone the moment they land.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
