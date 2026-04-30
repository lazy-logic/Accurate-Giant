/**
 * /results — the signature page. Latest-draw hero strip per game + filterable
 * archive table.
 *
 * Per super prompt §10 acceptance, this page must render the 5 most recent
 * draws within 1.5s of navigation. Server-rendered (RSC) via lib/data.ts so
 * the data is in the HTML on first byte.
 *
 * Hero strip ignores filters — it always shows latest-per-game so the page
 * keeps a strong identity at the top. Filters apply to the archive only.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LatestDrawCard } from "@/components/results/LatestDrawCard";
import { NumberRow } from "@/components/results/NumberRow";
import { ResultsFilterBar } from "@/components/results/ResultsFilterBar";
import { fetchAllDrawsSorted, fetchGames, fetchLatestDraw } from "@/lib/data";
import { filterDraws, hasActiveDrawFilters, parseDrawFilters } from "@/lib/filterDraws";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Winning numbers",
  description:
    "Latest winning numbers across every Accurate Giant draw, updated within minutes of the official NLA result.",
};

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseDrawFilters(params);
  const filtersActive = hasActiveDrawFilters(filters);

  const games = await fetchGames();

  // Hero strip: latest draw per game, parallel-fetched.
  const latestPerGame = (
    await Promise.all(
      games.map(async (g) => ({ game: g, draw: await fetchLatestDraw(g.slug) })),
    )
  )
    .filter((row) => row.draw !== undefined)
    .slice(0, 6);

  // Archive: a fat slice we then filter in-memory. Once the dataset grows
  // beyond a few hundred rows, push the filters into the Supabase query.
  const allSorted = await fetchAllDrawsSorted(200);
  const archive = filterDraws(allSorted, filters).slice(0, 50);

  const gameOptions = games
    .filter((g) => latestPerGame.some((row) => row.game.slug === g.slug))
    .map((g) => ({ value: g.slug, label: g.name }));

  return (
    <>
      <PageHeader
        eyebrow="Winning numbers"
        title="The latest draws, the moment they land."
        subtitle="Updated within minutes of each official NLA draw. Source: National Lottery Authority. In case of discrepancy, NLA's record is authoritative."
      />

      <section className="py-12 md:py-16 bg-brand-paper-muted">
        <Container>
          <h2 className="sr-only">Latest draw per game</h2>
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPerGame.map(({ game, draw }) => (
              <LatestDrawCard
                key={game.slug}
                game={game}
                draw={draw!}
                animated
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <h2 className="text-4xl md:text-5xl mb-6">
            Archive
          </h2>
          <ResultsFilterBar gameOptions={gameOptions} />

          <div className="mt-8 rounded-lg border border-brand-border bg-brand-paper overflow-hidden">
            {archive.length === 0 ? (
              <div className="p-12 text-center">
                <p className="font-display text-xl text-brand-ink">
                  No draws match those filters.
                </p>
                <p className="mt-2 text-sm text-brand-ink-muted">
                  Try widening the date range or clearing filters above.
                </p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-brand-paper-muted border-b border-brand-border">
                  <tr className="text-xs uppercase tracking-wider text-brand-ink-muted">
                    <th className="px-5 md:px-6 py-3 font-semibold">Date</th>
                    <th className="px-5 md:px-6 py-3 font-semibold">Game</th>
                    <th className="px-5 md:px-6 py-3 font-semibold">Numbers</th>
                    <th className="px-5 md:px-6 py-3 font-semibold text-right">
                      Draw #
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {archive.map((d) => {
                    const game = games.find((g) => g.slug === d.gameSlug);
                    if (!game) return null;
                    return (
                      <tr
                        key={`${d.gameSlug}-${d.drawNumber}`}
                        className="hover:bg-brand-paper-muted transition-colors"
                      >
                        <td className="px-5 md:px-6 py-4 text-sm text-brand-ink tnum whitespace-nowrap">
                          {formatDate(d.drawDate)}
                        </td>
                        <td className="px-5 md:px-6 py-4 text-sm">
                          <Link
                            href={`/results/${game.slug}`}
                            className="font-medium text-brand-ink hover:text-brand-primary"
                          >
                            {game.name}
                          </Link>
                        </td>
                        <td className="px-5 md:px-6 py-4">
                          <NumberRow
                            numbers={d.numbers}
                            bonusNumbers={d.bonusNumbers}
                            size="sm"
                            animated={false}
                          />
                        </td>
                        <td className="px-5 md:px-6 py-4 text-sm text-brand-ink-muted tnum text-right whitespace-nowrap">
                          #{d.drawNumber}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {filtersActive && (
            <p className="mt-4 text-xs text-brand-ink-muted tnum">
              {archive.length} matching {archive.length === 1 ? "draw" : "draws"}
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
