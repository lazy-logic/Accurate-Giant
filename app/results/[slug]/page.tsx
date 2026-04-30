/**
 * /results/[slug] — per-game results archive. The deep-link target from the
 * hero strip cards on /results, the recent-results section on /games/[slug],
 * and the home page's results widget.
 *
 * The LatestDrawCard's layoutId ensures Framer Motion morphs the same card
 * across navigations rather than fading between disjoint cards.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LatestDrawCard } from "@/components/results/LatestDrawCard";
import { NumberRow } from "@/components/results/NumberRow";
import { games as mockGames } from "@/lib/games";
import { fetchGameBySlug, fetchLatestDraw, fetchDrawsForGame } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return mockGames.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = await fetchGameBySlug(slug);
  if (!game) return { title: "Results" };
  return {
    title: `${game.name} results`,
    description: `Latest winning numbers and draw archive for ${game.name}.`,
  };
}

export default async function GameResultsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await fetchGameBySlug(slug);
  if (!game) notFound();

  const [latest, archive] = await Promise.all([
    fetchLatestDraw(game.slug),
    fetchDrawsForGame(game.slug, 50),
  ]);

  return (
    <>
      <section className="py-12 md:py-16 border-b border-brand-border">
        <Container>
          <Link
            href="/results"
            className="inline-flex items-center gap-1.5 text-sm text-brand-ink-muted hover:text-brand-primary"
          >
            <ArrowLeft size={16} strokeWidth={1.75} />
            All results
          </Link>
          <h1 className="text-5xl md:text-6xl mt-4">
            {game.name} results
          </h1>
          <p className="mt-3 text-base text-brand-ink-muted max-w-xl">
            {game.scheduleLabel}. Updated within minutes of the official NLA
            draw.
          </p>
        </Container>
      </section>

      {latest && (
        <section className="py-12 md:py-16 bg-brand-paper-muted">
          <Container>
            <LatestDrawCard
              game={game}
              draw={latest}
              linkToArchive={false}
              animated
            />
          </Container>
        </section>
      )}

      <section className="py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl md:text-3xl tracking-[-0.015em] mb-6">
            Archive
          </h2>
          {archive.length === 0 ? (
            <p className="text-brand-ink-muted">No draws published yet.</p>
          ) : (
            <ul className="divide-y divide-brand-border rounded-lg border border-brand-border bg-brand-paper">
              {archive.map((d) => (
                <li
                  key={d.drawNumber}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5 md:px-6 py-5"
                >
                  <div>
                    <p className="font-medium text-brand-ink tnum">
                      {formatDate(d.drawDate)}
                    </p>
                    <p className="text-xs text-brand-ink-muted tnum">
                      Draw #{d.drawNumber}
                    </p>
                  </div>
                  <NumberRow
                    numbers={d.numbers}
                    bonusNumbers={d.bonusNumbers}
                    size="sm"
                    animated={false}
                  />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
