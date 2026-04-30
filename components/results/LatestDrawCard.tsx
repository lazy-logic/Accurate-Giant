/**
 * The signature card that surfaces a single game's most recent draw.
 *
 * Used in three places: the Home results widget, the Results page hero strip,
 * and the per-game results detail.
 *
 * Redesigned 2026-04-30:
 *  - Coloured stripe across the top using the game's `ballColor` so each card
 *    has a quick brand identifier (no more meaningless plain-white corner ball).
 *  - Numbers are larger and centred — they're the focal point, give them air.
 *  - Footer line shows "Next draw in N days" computed from the game's
 *    schedule. Helps the visitor understand cadence at a glance.
 *  - The whole card is wrapped in a Link so visitors can deep-link to the
 *    per-game archive without an explicit "View archive" link.
 *
 * The `layoutId` makes the card a shared-element transition target for
 * Framer Motion when navigating between Home, Results, and Game Detail.
 */
"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, CalendarClock } from "lucide-react";
import { NumberRow } from "./NumberRow";
import type { Game } from "@/lib/games";
import type { Draw } from "@/lib/results";
import { formatDate, daysUntilNextDraw, cn } from "@/lib/utils";

type Props = {
  game: Game;
  draw: Draw;
  className?: string;
  /**
   * When true (default) the whole card is a link to /results/[slug]. Set false
   * on the per-game results page where the card IS the focus and would link
   * to itself.
   */
  linkToArchive?: boolean;
  animated?: boolean;
};

export function LatestDrawCard({
  game,
  draw,
  className,
  linkToArchive = true,
  animated = true,
}: Props) {
  const stripeColor = game.ballColor ?? "#013299";
  const daysToNext = daysUntilNextDraw(game.schedule);

  const inner = (
    <m.article
      layoutId={`draw-${game.slug}`}
      transition={{ duration: 0.4, ease: [0.3, 0, 0, 1] }}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-brand-border bg-brand-paper overflow-hidden transition-all duration-200",
        linkToArchive && "hover:shadow-lifted hover:-translate-y-1 hover:border-brand-border-strong",
        className,
      )}
    >
      {/* Top stripe — brand identifier per game */}
      <div
        aria-hidden
        className="h-1.5 w-full"
        style={{ background: stripeColor }}
      />

      <div className="flex flex-col p-6 md:p-7">
        <header>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-ink-muted">
            {game.scheduleLabel}
          </p>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl mt-1.5 leading-tight tracking-[-0.02em] text-brand-ink">
            {game.name}
          </h3>
          <p className="text-xs text-brand-ink-muted mt-1.5 tnum">
            Drawn {formatDate(draw.drawDate)} · #{draw.drawNumber}
          </p>
        </header>

        {/* Numbers — larger, centred for focus */}
        <div className="flex justify-center py-6 md:py-7">
          <NumberRow
            numbers={draw.numbers}
            bonusNumbers={draw.bonusNumbers}
            size="md"
            animated={animated}
          />
        </div>

        {/* Footer: next-draw indicator + arrow */}
        <footer className="mt-auto pt-4 border-t border-brand-border flex items-center justify-between text-xs">
          {daysToNext !== null ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-brand-ink-muted">
              <CalendarClock size={13} strokeWidth={2} className="text-brand-primary" />
              Next draw in{" "}
              <span className="text-brand-primary tnum">
                {daysToNext} {daysToNext === 1 ? "day" : "days"}
              </span>
            </span>
          ) : (
            <span className="text-brand-ink-muted">Schedule TBC</span>
          )}
          {linkToArchive && (
            <span className="inline-flex items-center gap-1 font-semibold text-brand-primary group-hover:gap-2 transition-all">
              Archive
              <ArrowRight size={12} strokeWidth={2.5} />
            </span>
          )}
        </footer>
      </div>
    </m.article>
  );

  if (linkToArchive) {
    return (
      <Link href={`/results/${game.slug}`} className="block" aria-label={`${game.name} results archive`}>
        {inner}
      </Link>
    );
  }
  return inner;
}
