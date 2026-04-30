/**
 * Mission Strip — inverse dark-navy section that breaks the visual rhythm
 * after the white hero. Acts as a manifesto callout.
 *
 * Background: --brand-primary with a subtle radial gradient and faint
 * grid overlay. The mission statement uses Montserrat at extra-bold for
 * confidence; the brand-secondary accent on the keyword adds a bright
 * focal point against the dark surface.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function MissionStrip() {
  return (
    <section className="relative py-24 md:py-32 bg-brand-primary text-white overflow-hidden">
      {/* Radial gradient + grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,185,239,0.30),_transparent_60%),radial-gradient(circle_at_15%_50%,_rgba(255,255,255,0.06),_transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,1)_1px,_transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,_transparent_1px)] [background-size:60px_60px]"
      />

      <Container>
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary mb-6">
            Our mission
          </p>
          <p className="font-display font-extrabold text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.025em] text-white text-balance">
            Every cedi played goes further, funding{" "}
            <span className="text-brand-secondary">education</span>,{" "}
            <span className="text-brand-secondary">healthcare</span>, and{" "}
            <span className="text-brand-secondary">community work</span> across Accra.
          </p>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white text-brand-primary text-base font-semibold hover:bg-brand-paper-muted transition-all duration-150"
          >
            How giving works
            <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
