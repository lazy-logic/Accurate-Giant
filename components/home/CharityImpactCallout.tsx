/**
 * Charity Impact Callout — the heaviest moment on the homepage.
 *
 * Updated 2026-04-30: removed the "GHS [TBC]" big-number placeholder. The
 * section now communicates the commitment around audited giving without
 * pinning to a specific figure. When the audited annual figure is supplied
 * by the owner, it can return as a small pull-quote in the About page —
 * keeping the homepage focused on the principle rather than the number.
 *
 * Layout: centred manifesto headline + CTA, with a three-pillar grid
 * underneath visualising what "audited annual giving" actually means in
 * practice.
 */
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function CharityImpactCallout() {
  return (
    <section className="relative py-24 md:py-32 bg-brand-primary text-white overflow-hidden">
      {/* Mesh gradient pools */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_60%_at_80%_30%,_rgba(0,185,239,0.35),_transparent_60%),radial-gradient(ellipse_50%_60%_at_20%_80%,_rgba(255,255,255,0.10),_transparent_55%),radial-gradient(circle_at_50%_50%,_rgba(0,185,239,0.08),_transparent_70%)]"
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,1)_1px,_transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,_transparent_1px)] [background-size:80px_80px]"
      />

      <Container>
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary mb-5">
            <Sparkles size={14} strokeWidth={2} />
            Audited annual giving
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.025em] text-white text-balance">
            Every cedi played,{" "}
            <span className="text-brand-secondary">accounted for.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed text-balance max-w-xl mx-auto">
            We publish where the giving goes, not just that we give. Independent
            audits, named programmes, transparent reporting — every year.
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white text-brand-primary text-base font-semibold hover:bg-brand-paper-muted transition-all"
          >
            Read about our charity work
            <ArrowRight
              size={18}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
