/**
 * BecomeAnAgentCta — partnership / recruitment funnel.
 *
 * Closing section of the homepage — recruitment pitch for would-be agents.
 * Light surface, business-pitch tone, centred single-column layout.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function BecomeAnAgentCta() {
  return (
    <section className="relative py-24 md:py-32 bg-brand-paper-muted overflow-hidden">
      {/* Subtle diagonal stripe pattern */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.4] [background-image:repeating-linear-gradient(135deg,_rgba(217,221,229,0.4)_0,_rgba(217,221,229,0.4)_1px,_transparent_1px,_transparent_24px)]"
      />
      {/* Cyan corner accent */}
      <div
        aria-hidden
        className="absolute -right-32 bottom-0 -z-10 w-[480px] h-[480px] rounded-full bg-brand-secondary/10 blur-3xl"
      />

      <Container>
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-5">
            Become an agent
          </p>
          <h2 className="text-4xl md:text-5xl xl:text-6xl text-balance">
            Run lotto in your community.
          </h2>
          <p className="mt-7 text-base md:text-lg text-brand-ink-muted text-balance">
            Approved Accurate Giant agents serve their neighbourhoods, earn
            commission on every play, and connect their customers to
            charity-funded draws. We provide the terminal, the training, and
            the live retailer app.
          </p>

          <div className="mt-9 flex flex-wrap justify-center items-center gap-3">
            <Link
              href="/contact?subject=agent-application"
              className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white text-base font-semibold hover:bg-[#01277a] transition-all shadow-soft"
            >
              Apply to become an agent
              <ArrowRight
                size={18}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/how-to-play"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-brand-primary/40 text-brand-primary text-base font-semibold hover:bg-brand-paper hover:border-brand-primary transition-all"
            >
              How agents work
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
