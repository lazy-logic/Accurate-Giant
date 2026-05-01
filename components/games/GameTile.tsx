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
import { ArrowRight, Store, MapPin } from "lucide-react";
import type { Game } from "@/lib/games";
import type { Draw } from "@/lib/results";
import { Badge } from "@/components/ui/Badge";
import { GameLogo } from "./GameLogo";

const channelMeta: Record<string, { label: string; icon: typeof MapPin }> = {
  standard: { label: "Standard", icon: MapPin },
  pos: { label: "POS only", icon: Store },
};
const defaultChannel = channelMeta.standard;

type GameTileProps = {
  game: Game;
  /** Reserved for future use; ignored after the latest-result strip was removed. */
  latestDraw?: Draw;
};

export function GameTile({ game }: GameTileProps) {
  // Fall back to the standard meta if Supabase returns a channel value we no
  // longer surface (e.g. legacy `ussd` rows pre-2026-04-30 cleanup).
  const channel = channelMeta[game.channel] ?? defaultChannel;
  const ChannelIcon = channel.icon;

  return (
    <Link
      href={`/games/${game.slug}`}
      className="group relative flex flex-col items-center text-center pt-20 px-6 pb-7 h-full rounded-3xl border border-brand-border bg-brand-paper transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lifted hover:border-brand-border-strong"
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

      {/* CTA — pinned to the bottom; latest-result strip removed */}
      <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary group-hover:gap-2.5 transition-all">
        View game
        <ArrowRight size={16} strokeWidth={2} />
      </span>
    </Link>
  );
}
