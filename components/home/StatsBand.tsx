/**
 * StatsBand replaces the old MissionStrip as the section directly under the
 * hero. Big-number stats panel that builds trust immediately after the
 * headline lands.
 *
 * Four metrics in a single row on desktop, 2x2 on mobile:
 *   - 11 NLA-licensed games (live count from lib/games.ts)
 *   - Years of operation (anchored to 1962)
 *   - Approved Accra agents (live count from lib/agents.ts)
 *   - Audited annual giving (placeholder until owner supplies)
 *
 * Visual: light surface with a subtle dot grid behind, big Montserrat-Black
 * numerics, brand-primary number colour for emphasis. No call-to-action —
 * this section is pure proof-of-scale.
 *
 * Right side carries a one-line mission tagline so the section still does
 * the "what we stand for" job the old MissionStrip used to do.
 */
import { games } from "@/lib/games";
import { agents } from "@/lib/agents";
import { Container } from "@/components/layout/Container";

const FOUNDED_YEAR = 1962;

export function StatsBand() {
  const yearsOperating = new Date().getFullYear() - FOUNDED_YEAR;

  const stats = [
    { value: String(games.length), label: "NLA-licensed games", note: "Across the week" },
    { value: `${yearsOperating}+`, label: "Years of operation", note: `Since ${FOUNDED_YEAR}` },
    { value: `${agents.length}+`, label: "Approved agents", note: "Across Accra" },
    { value: "GHS [TBC]", label: "Audited annual giving", note: "FY2025" },
  ];

  return (
    <section className="relative py-20 md:py-24 bg-brand-paper-muted overflow-hidden border-y border-brand-border">
      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(91,100,115,0.18) 1.2px, transparent 1.2px)",
          backgroundSize: "26px 26px",
        }}
      />
      {/* Soft cyan accent glow */}
      <div
        aria-hidden
        className="absolute -right-32 top-0 w-[420px] h-[420px] rounded-full bg-brand-secondary/15 blur-3xl pointer-events-none"
      />

      <Container>
        <div className="relative grid gap-10 lg:gap-14 lg:grid-cols-12 items-end">
          {/* Tagline left */}
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-4">
              By the numbers
            </p>
            <p className="font-display font-extrabold text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em] text-brand-ink text-balance">
              Decades of draws, funding community work across Accra.
            </p>
          </div>

          {/* Stats grid right */}
          <div className="lg:col-span-8">
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-x-8">
              {stats.map((s) => (
                <div key={s.label} className="border-l-2 border-brand-primary pl-4 lg:pl-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display font-black text-5xl md:text-6xl tnum leading-none tracking-[-0.04em] text-brand-primary">
                    {s.value}
                  </dd>
                  <p className="mt-3 text-sm font-bold text-brand-ink leading-tight">
                    {s.label}
                  </p>
                  <p className="mt-1 text-xs text-brand-ink-muted">{s.note}</p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
