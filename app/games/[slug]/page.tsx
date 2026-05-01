/**
 * /games/[slug] — per-game detail page. Hero + how-to-play + recent results +
 * trust strip. See docs/wireframes.md §3.
 *
 * Uses generateStaticParams to pre-build a route per game at build time. This
 * still works with Supabase: Next builds the routes from the games table at
 * build, and ISR refreshes them on demand once draws update.
 *
 * The CTA in the hero is channel-aware: standard games and POS-only games
 * both point at the how-to-play guide.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Store } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { TrustStrip } from "@/components/layout/TrustStrip";
import { NumberRow } from "@/components/results/NumberRow";
import { GameLogo } from "@/components/games/GameLogo";
import { games as mockGames } from "@/lib/games";
import { fetchGameBySlug, fetchDrawsForGame } from "@/lib/data";
import { formatDate } from "@/lib/utils";

// Pre-build paths from the seed data. When Supabase is the source of truth,
// the seed mirrors the DB so this stays accurate. Once the games table grows
// dynamic, swap to: const games = await fetchGames(); return games.map(...).
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
  if (!game) return { title: "Game not found" };
  return {
    title: game.name,
    description: game.longDescription,
  };
}

const channelMeta: Record<string, { label: string; icon: typeof MapPin }> = {
  standard: { label: "Standard", icon: MapPin },
  pos: { label: "POS only", icon: Store },
};
const defaultChannel = channelMeta.standard;

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await fetchGameBySlug(slug);
  if (!game) notFound();

  const draws = await fetchDrawsForGame(game.slug, 5);
  // Defensive fallback for legacy channel values (e.g. `ussd` rows in
  // Supabase from before the 2026-04-30 catalogue cleanup).
  const channel = channelMeta[game.channel] ?? defaultChannel;
  const ChannelIcon = channel.icon;

  const isPosOnly = game.channel === "pos";

  return (
    <>
      <PageHeader
        eyebrow={game.scheduleLabel}
        title={game.name}
        subtitle={game.longDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/games" },
          { label: game.name },
        ]}
      />

      {/* Details strip — badges + CTA on left, ball on right */}
      <section className="border-b border-brand-border bg-brand-paper">
        <Container>
          <div className="py-12 md:py-16 grid gap-10 md:grid-cols-12 items-center">
            <div className="md:col-span-7">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">{game.scheduleLabel}</Badge>
                <Badge variant="secondary">
                  <ChannelIcon size={12} strokeWidth={2} />
                  {game.channelDetail ?? channel.label}
                </Badge>
                {game.priceGhs && (
                  <Badge variant="muted">GHS {game.priceGhs}</Badge>
                )}
                {game.prizeStructure && (
                  <Badge variant="default">{game.prizeStructure}</Badge>
                )}
              </div>
              <div className="mt-8">
                <Link
                  href="/how-to-play"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white text-base font-semibold hover:bg-[#01277a] shadow-soft transition-all"
                >
                  {isPosOnly ? "How to play via POS" : "How to play"}
                  <ArrowRight size={18} strokeWidth={2} />
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-square flex items-center justify-center max-w-sm mx-auto">
                <div
                  aria-hidden
                  className="absolute inset-[8%] rounded-full bg-gradient-to-br from-brand-secondary/30 via-brand-primary/15 to-transparent blur-3xl"
                />
                <div className="relative w-[72%]">
                  <GameLogo game={game} size={600} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-3">
            How to play
          </p>
          <h2 className="text-4xl md:text-5xl mb-10">
            Three steps from start to draw.
          </h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {[
              {
                n: "1",
                title: isPosOnly
                  ? "Visit a POS terminal"
                  : "Open the app or visit an agent",
                body: isPosOnly
                  ? "Approved POS terminals only. Look for the NLA-licensed sticker."
                  : "Play through the Accurate Giant mobile app, or visit an approved agent in your area.",
              },
              {
                n: "2",
                title: "Pick your numbers",
                body:
                  "Choose your numbers manually, or ask the agent for a Quick Pick.",
              },
              {
                n: "3",
                title: "Wait for the draw",
                body: `Drawn ${game.scheduleLabel.toLowerCase()}. Results appear here within minutes.`,
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-lg border border-brand-border bg-brand-paper p-6"
              >
                <div className="font-display font-extrabold text-4xl text-brand-secondary tnum">
                  {step.n}
                </div>
                <h3 className="font-display text-xl mt-2">{step.title}</h3>
                <p className="text-sm text-brand-ink-muted mt-2 leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/how-to-play"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:gap-2.5 transition-all"
          >
            Read the full how-to-play guide
            <ArrowRight size={16} strokeWidth={1.75} />
          </Link>
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-brand-paper-muted border-y border-brand-border">
        <Container>
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-3">
                Recent results
              </p>
              <h2 className="text-4xl md:text-5xl">
                Last five draws
              </h2>
            </div>
            <Link
              href={`/results/${game.slug}`}
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:gap-2.5 transition-all whitespace-nowrap"
            >
              Full archive
              <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
          </div>
          {draws.length === 0 ? (
            <p className="text-brand-ink-muted">
              Draws will appear here once results are published.
            </p>
          ) : (
            <ul className="divide-y divide-brand-border rounded-lg border border-brand-border bg-brand-paper">
              {draws.map((d) => (
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

      <TrustStrip />
    </>
  );
}
