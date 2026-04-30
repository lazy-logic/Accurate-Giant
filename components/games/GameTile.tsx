/**
 * GameTile — modern catalogue tile.
 *
 * Composition:
 *  - Card: white surface with soft border, rounded-3xl, gentle shadow.
 *  - Ball "trophy": the GameLogo ball overlaps the card's top edge with
 *    negative margin, so it appears to sit ON the card rather than inside
 *    a panel. Hovering scales the ball and lifts the whole card.
 *  - Body: centred name, schedule + channel chips, latest result strip,
 *    "View game" link. Hairline divider before the latest-result row.
 *  - Year ribbon: subtle "Since 1962" tag in the upper-right of the card
 *    when applicable.
 *  - Decorative cyan glow under the ball — sells the "trophy on a pedestal"
 *    feel without competing with the ball itself.
 *
 * Whole tile is one anchor wrapping its contents. Don't nest interactive
 * elements inside.
 */
import Link from "next/link";
import { ArrowRight, Phone, Store, MapPin } from "lucide-react";
import type { Game } from "@/lib/games";
import type { Draw } from "@/lib/results";
import { Badge } from "@/components/ui/Badge";
import { NumberRow } from "@/components/results/NumberRow";
import { GameLogo } from "./GameLogo";
import { formatShortDate } from "@/lib/utils";

const channelMeta = {
  standard: { label: "Standard", icon: MapPin },
  ussd: { label: "USSD", icon: Phone },
  pos: { label: "POS only", icon: Store },
};

type GameTileProps = {
  game: Game;
  latestDraw?: Draw;
};

export function GameTile({ game, latestDraw }: GameTileProps) {
  const channel = channelMeta[game.channel];
  const ChannelIcon = channel.icon;

  return (
    <Link
      href={`/games/${game.slug}`}
      className="group relative flex flex-col items-center text-center pt-20 px-6 pb-7 rounded-3xl border border-brand-border bg-brand-paper transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lifted hover:border-brand-border-strong"
    >
      {/* Year ribbon */}
      {game.introducedYear && (
        <span className="absolute top-4 right-4 px-2 py-0.5 rounded-md bg-brand-paper-muted text-[10px] font-bold uppercase tracking-wider text-brand-ink-muted tnum">
          Since {game.introducedYear}
        </span>
      )}

      {/* Ball: overlaps the card's top edge */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
        <div
          aria-hidden
          className="absolute inset-2 rounded-full bg-brand-secondary/25 blur-2xl pointer-events-none"
        />
        <div className="relative">
          <GameLogo game={game} className="w-full h-full" size={200} />
        </div>
      </div>

      {/* Name */}
      <h3 className="font-display font-extrabold text-xl md:text-2xl tracking-[-0.015em] leading-tight text-brand-ink min-h-[2.5em] flex items-center">
        {game.name}
      </h3>

      {/* Hook */}
      <p className="text-sm text-brand-ink-muted mt-1 line-clamp-2 min-h-[2.6em]">
        {game.hook}
      </p>

      {/* Chips */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-4">
        <Badge variant="default">{game.scheduleLabel}</Badge>
        <Badge variant="secondary">
          <ChannelIcon size={12} strokeWidth={2} />
          {game.channelDetail ?? channel.label}
        </Badge>
      </div>

      {/* Latest result strip */}
      <div className="w-full mt-5 pt-5 border-t border-brand-border">
        {latestDraw ? (
          <>
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-ink-muted mb-2 tnum">
              Latest · {formatShortDate(latestDraw.drawDate)} · #{latestDraw.drawNumber}
            </p>
            <div className="flex justify-center">
              <NumberRow numbers={latestDraw.numbers} size="sm" animated={false} />
            </div>
          </>
        ) : (
          <p className="text-xs text-brand-ink-muted">No published results yet.</p>
        )}
      </div>

      {/* CTA */}
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary group-hover:gap-2.5 transition-all">
        View game
        <ArrowRight size={16} strokeWidth={2} />
      </span>
    </Link>
  );
}
