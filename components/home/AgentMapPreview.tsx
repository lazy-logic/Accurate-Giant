/**
 * Homepage agent locator — full-bleed map section.
 *
 * Replaces the old AgentLocatorCta. Breaks out of the standard Container
 * to span the entire viewport width. Map is non-interactive on the homepage
 * (a preview) — clicking the CTA opens the full /agents experience.
 *
 * Layout:
 *  - Full-width map fills the section
 *  - Floating "card overlay" on the left with copy + CTA
 *  - On mobile, the overlay stacks above the map for legibility
 */
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { AgentMap } from "@/components/agents/AgentMap";
import { agents } from "@/lib/agents";

export function AgentMapPreview() {
  return (
    /*
     * No bottom padding — the section closes at the map's bottom edge so
     * the Footer attaches directly underneath with no visual gap.
     */
    <section className="relative bg-brand-paper">
      {/* Section eyebrow — sits above the map */}
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-4">
              Agent network
            </p>
            <h2 className="text-4xl md:text-5xl xl:text-6xl text-balance">
              Locate our agents.
            </h2>
          </div>
          <p className="text-base md:text-lg text-brand-ink-muted max-w-md md:justify-self-end">
            Search by area, see opening hours, plan your visit. Approved agents
            only. Every retailer ID is NLA-verified.
          </p>
        </div>
      </div>

      {/* Full-bleed map */}
      <div className="relative w-full h-[480px] md:h-[560px] lg:h-[620px] overflow-hidden">
        <AgentMap agents={agents} interactive={false} showControls={false} />

        {/* Floating glass overlay — sits on top of the map */}
        <div className="pointer-events-none absolute inset-0 flex items-end md:items-center px-4 md:px-12 lg:px-20">
          <div className="pointer-events-auto bg-brand-paper/95 backdrop-blur-md border border-brand-border shadow-lifted rounded-2xl p-6 md:p-8 max-w-md w-full mb-6 md:mb-0">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary text-white mb-4">
              <MapPin size={22} strokeWidth={2} />
            </div>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-brand-ink leading-tight tracking-[-0.02em]">
              Find a lotto agent near you.
            </h3>
            <p className="mt-3 text-sm text-brand-ink-muted">
              Live map of every approved Accurate Giant agent. Filter by area,
              get directions, see hours.
            </p>
            <Link
              href="/agents"
              className="group mt-5 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-brand-primary text-white text-sm font-semibold hover:bg-[#01277a] transition-all shadow-soft"
            >
              Open the locator
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Subtle gradient over the map edges so overlays read cleanly */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-paper/30 via-transparent to-brand-paper/30"
        />
      </div>
    </section>
  );
}
