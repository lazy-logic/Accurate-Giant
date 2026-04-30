/**
 * Agent Locator CTA — closing card on the homepage.
 *
 * Background suggests a city map: a fine dot grid with scattered larger
 * "agent pin" dots. Reads as a quiet hint at the locator without showing
 * a real map (no map tile costs, no privacy concerns at this stage).
 */
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function AgentLocatorCta() {
  return (
    <section className="relative py-24 md:py-32 bg-brand-paper overflow-hidden">
      <Container>
        <div className="relative rounded-3xl border border-brand-border bg-brand-paper-muted p-12 md:p-16 lg:p-20 text-center overflow-hidden">
          {/* Map-suggesting dot grid */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(circle_at_1px_1px,_rgba(91,100,115,0.20)_1px,_transparent_0)] [background-size:20px_20px]"
          />
          {/* Scattered "agent pins" — a few larger dots */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <span className="absolute top-[20%] left-[18%] w-3 h-3 rounded-full bg-brand-primary/80 shadow-[0_0_20px_rgba(1,50,153,0.5)]" />
            <span className="absolute top-[60%] left-[30%] w-2.5 h-2.5 rounded-full bg-brand-secondary shadow-[0_0_16px_rgba(0,185,239,0.5)]" />
            <span className="absolute top-[35%] right-[25%] w-2.5 h-2.5 rounded-full bg-brand-primary/70 shadow-[0_0_16px_rgba(1,50,153,0.4)]" />
            <span className="absolute top-[70%] right-[15%] w-3 h-3 rounded-full bg-brand-secondary shadow-[0_0_20px_rgba(0,185,239,0.5)]" />
            <span className="absolute top-[15%] right-[40%] w-2 h-2 rounded-full bg-brand-primary/60" />
            <span className="absolute top-[80%] left-[45%] w-2 h-2 rounded-full bg-brand-primary/50" />
          </div>
          {/* Soft radial glow */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.85),_transparent_60%)]"
          />

          <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-primary text-white mb-6 shadow-lifted">
            <MapPin size={26} strokeWidth={2} />
          </div>
          <h2 className="text-4xl md:text-5xl xl:text-6xl text-brand-ink max-w-2xl mx-auto text-balance">
            Find a lotto agent near you in Accra.
          </h2>
          <p className="mt-5 text-base md:text-lg text-brand-ink-muted max-w-lg mx-auto">
            Approved agents only. Search by area, see opening hours, plan your visit.
          </p>
          <Link
            href="/agents"
            className="mt-9 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white text-base font-semibold hover:bg-[#01277a] transition-all shadow-soft"
          >
            Open the locator
            <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
