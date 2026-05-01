/**
 * Games catalogue — the NLA-licensed draws Accurate Giant operates.
 *
 * SOURCE: docs/content-inventory.md §1, derived from public/inspiration/nla-products/extracted.md.
 *
 * This is in-memory seed data. When Supabase lands (super prompt §8 step 6) this
 * file becomes a thin server-side fetch wrapper around the `games` table, but the
 * Game type and helper signatures stay the same so callers don't change.
 *
 * Many fields are null because the public NLA products page does not publish them
 * (price, exact draw time, prize structure). Owner is sourcing these from NLA
 * directly — see docs/content-inventory.md §4.
 *
 * `featured: true` drives the homepage's Featured Games strip. The three picks
 * (National Week Lotto, Mid Week, Sunday Aseda) balance flagship volume, NLA's
 * own "second most popular" claim, and charity-tone fit (Aseda = thanksgiving).
 *
 * Owner removed 787, Atena, Super 6, and Caritas Lottery from the live catalogue
 * (2026-04-30) — historical entries are out of seed.sql too.
 *
 * USSD-only games (Lucky 3, Daywa 5/39 Direct) removed by owner direction
 * 2026-04-30 — the marketing site no longer surfaces USSD as a channel.
 */
export type GameChannel = "standard" | "pos";
export type GameDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
  | "daily";

export type Game = {
  slug: string;
  name: string;
  hook: string;
  longDescription: string;
  schedule: GameDay[];
  scheduleLabel: string;
  drawTime: string | null;
  priceGhs: number | null;
  channel: GameChannel;
  channelDetail: string | null;
  prizeStructure: string | null;
  featured: boolean;
  introducedYear: number | null;
  /**
   * Path to the game logo PNG under /public. Optional — when missing,
   * GameLogo renders a text-monogram fallback inside the ball.
   */
  logoUrl?: string;
  /**
   * Hex colour for the 3D lottery ball that hosts the logo. Picked to
   * complement (not clash with) each game's logo art. If omitted, GameLogo
   * defaults to brand-primary navy.
   */
  ballColor?: string;
};

export const games: Game[] = [
  {
    slug: "national-week-lotto",
    name: "National Week Lotto",
    hook: "Ghana's flagship game, running since December 1962.",
    longDescription:
      "Our oldest and most patronised draw. Pick five numbers from 1 to 90 and play across the country, online, or via your local agent.",
    schedule: ["saturday"],
    scheduleLabel: "Saturdays",
    drawTime: null,
    priceGhs: null,
    channel: "standard",
    channelDetail: null,
    prizeStructure: "5/90 fixed odds",
    featured: true,
    introducedYear: 1962,
    logoUrl: "/games/national-weekly.png",
    ballColor: "#dc2626",
  },
  {
    slug: "mid-week",
    name: "Mid Week",
    hook: "Our second-most-popular draw, launched August 2003.",
    longDescription:
      "A 5/90 fixed-odds game that breaks up the working week. Same simple format as Saturday's Week Lotto, drawn every Wednesday.",
    schedule: ["wednesday"],
    scheduleLabel: "Wednesdays",
    drawTime: null,
    priceGhs: null,
    channel: "standard",
    channelDetail: null,
    prizeStructure: "5/90 fixed odds",
    featured: true,
    introducedYear: 2003,
    logoUrl: "/games/mid-week.png",
    ballColor: "#1e3a8a",
  },
  {
    slug: "monday-special",
    name: "Monday Special",
    hook: "Welcomes you back from the weekend.",
    longDescription:
      "A fresh 5/90 fixed-odds draw to begin the week. Same trusted format, fresh chance.",
    schedule: ["monday"],
    scheduleLabel: "Mondays",
    drawTime: null,
    priceGhs: null,
    channel: "standard",
    channelDetail: null,
    prizeStructure: "5/90 fixed odds",
    featured: false,
    introducedYear: null,
    logoUrl: "/games/monday-special.png",
    ballColor: "#a855f7",
  },
  {
    slug: "lucky-tuesday",
    name: "Lucky Tuesday",
    hook: "For people with lucky numbers.",
    longDescription:
      "A Tuesday-specific draw celebrated by players who carry their lucky numbers through the week.",
    schedule: ["tuesday"],
    scheduleLabel: "Tuesdays",
    drawTime: null,
    priceGhs: null,
    channel: "standard",
    channelDetail: null,
    prizeStructure: null,
    featured: false,
    introducedYear: 2007,
    logoUrl: "/games/lucky-tuesday.png",
    ballColor: "#f97316",
  },
  {
    slug: "fortune-thursday",
    name: "Fortune Thursday",
    hook: "Designed to turn fortunes around.",
    longDescription:
      "A 5/90 fixed-odds Thursday draw. The mid-week reset for players who didn't catch Wednesday.",
    schedule: ["thursday"],
    scheduleLabel: "Thursdays",
    drawTime: null,
    priceGhs: null,
    channel: "standard",
    channelDetail: null,
    prizeStructure: "5/90 fixed odds",
    featured: false,
    introducedYear: null,
    logoUrl: "/games/fortune-thursday.png",
    ballColor: "#f59e0b",
  },
  {
    slug: "friday-bonanza",
    name: "Friday Bonanza",
    hook: "Positive energy for the weekend.",
    longDescription:
      "A Friday-evening draw built around hope and a soft start to the weekend.",
    schedule: ["friday"],
    scheduleLabel: "Fridays",
    drawTime: null,
    priceGhs: null,
    channel: "standard",
    channelDetail: null,
    prizeStructure: null,
    featured: false,
    introducedYear: 2007,
    logoUrl: "/games/friday-bonanza.png",
    ballColor: "#e11d48",
  },
  {
    slug: "sunday-aseda",
    name: "Sunday Aseda",
    hook: "Aseda is Twi for thanksgiving. Drawn every Sunday.",
    longDescription:
      "A 5/90 fixed-odds draw introduced in July 2022. The name carries a reminder: this is a game of gratitude, not desperation.",
    schedule: ["sunday"],
    scheduleLabel: "Sundays",
    drawTime: null,
    priceGhs: null,
    channel: "standard",
    channelDetail: null,
    prizeStructure: "5/90 fixed odds",
    featured: true,
    introducedYear: 2022,
    logoUrl: "/games/sunday-aseda.png",
    ballColor: "#16a34a",
  },
  {
    slug: "vag-lotto",
    name: "VAG Lotto",
    hook: "Run with Veterans Administration Ghana since July 2019.",
    longDescription:
      "A partnership game launched with Veterans Administration Ghana. A portion of proceeds supports veteran welfare.",
    schedule: [],
    scheduleLabel: "Schedule TBC",
    drawTime: null,
    priceGhs: null,
    channel: "standard",
    channelDetail: null,
    prizeStructure: null,
    featured: false,
    introducedYear: 2019,
    logoUrl: "/games/vag-lotto.png",
    ballColor: "#0f766e",
  },
  {
    slug: "noon-rush",
    name: "Noon Rush",
    hook: "A midday play.",
    longDescription:
      "A midday-cadence game. Schedule and price details are being finalised. Check back ahead of launch.",
    schedule: [],
    scheduleLabel: "Schedule TBC",
    drawTime: null,
    priceGhs: null,
    channel: "standard",
    channelDetail: null,
    prizeStructure: null,
    featured: false,
    introducedYear: null,
    logoUrl: "/games/noon-rush.png",
    ballColor: "#0ea5e9",
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getFeaturedGames(): Game[] {
  return games.filter((g) => g.featured);
}
