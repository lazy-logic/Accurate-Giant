/**
 * Home page Featured Games strip — three editorially-chosen games.
 *
 * Background: white with a fine grid pattern + a soft cyan accent block on
 * the upper-left. Different "modern" texture from the dotted sunken strip
 * above so the page reads as a sequence of distinct surfaces.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GameTile } from "@/components/games/GameTile";
import { fetchFeaturedGames, fetchLatestDraw } from "@/lib/data";

export async function FeaturedGames() {
  const games = await fetchFeaturedGames();
  const latestDraws = await Promise.all(games.map((g) => fetchLatestDraw(g.slug)));

  return (
    <section className="relative py-24 md:py-32 bg-brand-paper overflow-hidden">
      {/* Fine grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.5] [background-image:linear-gradient(rgba(217,221,229,0.35)_1px,_transparent_1px),linear-gradient(90deg,rgba(217,221,229,0.35)_1px,_transparent_1px)] [background-size:48px_48px]"
      />
      {/* Cyan corner accent */}
      <div
        aria-hidden
        className="absolute -left-32 top-0 -z-10 w-[560px] h-[560px] rounded-full bg-brand-secondary/10 blur-3xl"
      />

      <Container>
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-4">
              Featured games
            </p>
            <h2 className="text-4xl md:text-5xl text-balance">
              Three of our most-played draws.
            </h2>
          </div>
          <Link
            href="/games"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:gap-2.5 transition-all whitespace-nowrap"
          >
            See all 15 games
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          {games.map((g, i) => (
            <GameTile key={g.slug} game={g} latestDraw={latestDraws[i]} />
          ))}
        </div>

        <Link
          href="/games"
          className="mt-8 md:hidden inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary"
        >
          See all 15 games
          <ArrowRight size={16} strokeWidth={2} />
        </Link>
      </Container>
    </section>
  );
}
