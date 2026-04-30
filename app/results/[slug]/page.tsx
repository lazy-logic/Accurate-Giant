/**
 * /results/[slug] — per-game results archive. The deep-link target from the
 * hero strip cards on /results, the recent-results section on /games/[slug],
 * and the home page's results widget.
 *
 * Uses the shared PageHeader (brand-primary navy band) with breadcrumbs so
 * inner pages have visual consistency with /results, /games, /about, etc.
 *
 * The LatestDrawCard's layoutId ensures Framer Motion morphs the same card
 * across navigations rather than fading between disjoint cards.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
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
      <PageHeader
        eyebrow={game.scheduleLabel}
        title={`${game.name} results`}
        subtitle="Latest winning numbers, plus the full archive of past draws. Updated within minutes of each official NLA draw."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Results", href: "/results" },
          { label: game.name },
        ]}
      />

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
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-[-0.015em] mb-6">
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
