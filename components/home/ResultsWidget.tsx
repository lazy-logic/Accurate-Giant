/**
 * Home page "Just drawn" strip — three latest-draw cards on a sunken,
 * dot-patterned surface that signals "data" / "live feed".
 *
 * Async server component — pulls latest draws via lib/data.ts so this works
 * with both Supabase (when configured) and the in-memory mocks.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LatestDrawCard } from "@/components/results/LatestDrawCard";
import { fetchGames, fetchRecentLatestDrawsAcrossGames } from "@/lib/data";

export async function ResultsWidget() {
  const featuredSlugs = ["mid-week", "fortune-thursday", "friday-bonanza"];
  const [games, draws] = await Promise.all([
    fetchGames(),
    fetchRecentLatestDrawsAcrossGames(featuredSlugs),
  ]);

  return (
    <section className="relative py-20 md:py-28 bg-brand-paper-sunken overflow-hidden">
      {/* Dot pattern signals "data" / "feed" */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,_rgba(91,100,115,0.22)_1px,_transparent_0)] [background-size:24px_24px]"
      />
      {/* Subtle gradient fade top + bottom */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-brand-paper to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-brand-paper to-transparent"
      />

      <Container>
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-4">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-brand-success opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-brand-success" />
              </span>
              Just drawn
            </p>
            <h2 className="text-4xl md:text-5xl text-balance">
              The week's latest results.
            </h2>
          </div>
          <Link
            href="/results"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:gap-2.5 transition-all whitespace-nowrap"
          >
            View all results
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          {draws.map((draw) => {
            const game = games.find((g) => g.slug === draw.gameSlug);
            if (!game) return null;
            return <LatestDrawCard key={draw.gameSlug} game={game} draw={draw} />;
          })}
        </div>

        <Link
          href="/results"
          className="mt-8 md:hidden inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary"
        >
          View all results
          <ArrowRight size={16} strokeWidth={2} />
        </Link>
      </Container>
    </section>
  );
}
