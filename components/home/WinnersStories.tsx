/**
 * Winners Stories — three pull-quotes with a soft cyan-to-paper diagonal
 * gradient. Cards sit on a glassmorphic surface (subtle blur + border) for
 * the contemporary "soft UI" treatment. Quotes are placeholders today —
 * MUST be replaced with real, consented winner quotes before launch
 * (content-inventory.md §4 item 9).
 */
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";

const STORIES = [
  {
    name: "Selasi A.",
    location: "Tema",
    game: "Sunday Aseda",
    quote:
      "I won on an Aseda Sunday. The name itself felt like a sign. First thing was the kids' school fees. Second was a sigh of relief that lasted a week.",
  },
  {
    name: "Kojo M.",
    location: "Achimota",
    game: "Mid Week",
    quote:
      "Same five numbers for six years. Six. The Wednesday they came up I sat on the bus all the way home staring at the ticket like it would change its mind.",
  },
  {
    name: "Mawunyo D.",
    location: "Osu",
    game: "Friday Bonanza",
    quote:
      "The agent saw the ticket before I did. He told me to sit down before he checked it. Best thirty seconds of my life — then a week of phone calls from family I hadn't heard from in years.",
  },
];

export function WinnersStories() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Soft cyan-to-paper diagonal mesh */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-paper-muted via-brand-paper to-[#e6f7fd]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_85%_20%,_rgba(0,185,239,0.18),_transparent_60%),radial-gradient(ellipse_50%_50%_at_15%_80%,_rgba(1,50,153,0.10),_transparent_55%)]"
      />

      <Container>
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-4">
              Winners
            </p>
            <h2 className="text-4xl md:text-5xl text-balance">
              Real people. Real numbers.
            </h2>
          </div>
          <Link
            href="/about"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:gap-2.5 transition-all whitespace-nowrap"
          >
            About our work
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          {STORIES.map((s) => (
            <article
              key={s.name}
              className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-sm p-7 flex flex-col shadow-soft"
            >
              <Quote
                size={28}
                strokeWidth={1.75}
                className="text-brand-secondary mb-5"
              />
              <p className="font-display font-semibold text-xl leading-snug text-brand-ink flex-1 tracking-[-0.01em]">
                "{s.quote}"
              </p>
              <footer className="mt-7 pt-5 border-t border-brand-border/60">
                <p className="font-bold text-sm text-brand-ink">{s.name}</p>
                <p className="text-xs text-brand-ink-muted mt-1">
                  {s.game} · {s.location}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
