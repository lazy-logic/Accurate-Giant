/**
 * WeekSchedule replaces StatsBand as the section directly under the hero.
 *
 * Shows the week's scheduled draws as a horizontal row of seven coloured
 * lottery balls. Today's day is highlighted with a brand-primary border
 * + label so visitors immediately see what's drawing today.
 *
 * Each tile is a real link to the game's detail page — the section doubles
 * as "what's on this week" + a quick game-discovery surface.
 *
 * The fallback when a day has no scheduled game (rare in our catalogue, but
 * handles future schedule gaps) is a quiet "no draw" state with the day
 * name only.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GameLogo } from "@/components/games/GameLogo";
import { games, type GameDay } from "@/lib/games";

const DAYS: { code: GameDay; short: string; long: string }[] = [
  { code: "monday", short: "Mon", long: "Monday" },
  { code: "tuesday", short: "Tue", long: "Tuesday" },
  { code: "wednesday", short: "Wed", long: "Wednesday" },
  { code: "thursday", short: "Thu", long: "Thursday" },
  { code: "friday", short: "Fri", long: "Friday" },
  { code: "saturday", short: "Sat", long: "Saturday" },
  { code: "sunday", short: "Sun", long: "Sunday" },
];

const DOW_TO_GAMEDAY: GameDay[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function gameForDay(day: GameDay) {
  return games.find((g) => g.schedule.includes(day));
}

export function WeekSchedule() {
  const todayCode = DOW_TO_GAMEDAY[new Date().getDay()];

  return (
    <section className="relative py-20 md:py-28 bg-brand-ink text-white overflow-hidden">
      {/* Mesh background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 88% 0%, rgba(0,185,239,0.22), transparent 55%), radial-gradient(ellipse 45% 55% at 12% 100%, rgba(1,50,153,0.30), transparent 55%)",
        }}
      />
      {/* Faint grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <Container>
        <div className="relative grid gap-10 lg:gap-14 lg:grid-cols-12 items-end mb-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary mb-4">
              Drawing this week
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.025em] text-white text-balance">
              A different draw, every day of the week.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="text-base text-white/70 leading-relaxed max-w-md lg:ml-auto">
              Today is{" "}
              <span className="font-semibold text-white">
                {DAYS.find((d) => d.code === todayCode)?.long}
              </span>
              . Tap a ball to view its rules and recent winning numbers.
            </p>
          </div>
        </div>

        <div className="relative grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5">
          {DAYS.map((d) => {
            const game = gameForDay(d.code);
            const isToday = d.code === todayCode;
            return game ? (
              <Link
                key={d.code}
                href={`/games/${game.slug}`}
                className={`group relative flex flex-col items-center text-center rounded-2xl p-5 transition-all duration-200 ${
                  isToday
                    ? "bg-white/10 ring-2 ring-brand-secondary shadow-[0_8px_24px_rgba(0,185,239,0.25)]"
                    : "bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/30"
                }`}
              >
                <p
                  className={`text-[10px] font-bold uppercase tracking-[0.25em] mb-3 ${
                    isToday ? "text-brand-secondary" : "text-white/55"
                  }`}
                >
                  {isToday ? "Today" : d.short}
                </p>
                <div className="w-20 h-20 md:w-24 md:h-24 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1">
                  <GameLogo game={game} className="w-full h-full" size={160} />
                </div>
                <p className="mt-4 font-display font-extrabold text-sm md:text-base leading-tight text-white">
                  {game.name}
                </p>
              </Link>
            ) : (
              <div
                key={d.code}
                className="flex flex-col items-center text-center rounded-2xl p-5 bg-white/[0.02] ring-1 ring-white/5"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-3">
                  {d.short}
                </p>
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 ring-1 ring-white/10" />
                <p className="mt-4 text-xs text-white/40">No draw</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/games"
            className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white text-brand-primary text-base font-semibold hover:bg-brand-paper-muted transition-all"
          >
            See all 11 games
            <ArrowRight
              size={18}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
