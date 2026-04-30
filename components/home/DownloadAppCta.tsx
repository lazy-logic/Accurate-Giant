/**
 * DownloadAppCta — channel-led CTA section.
 *
 * Three ways to play, three buttons. Sits mid-page after Featured Games so
 * the visitor — having just seen the game catalogue — gets the obvious "OK
 * how do I actually play?" answer.
 *
 * Layout: split column. Copy left, phone-frame teaser right with a
 * floating "USSD" pill behind it for the alt-channel hint.
 *
 * Background: dark navy with a soft mesh gradient — matches the Charity
 * Callout's dark surface so the page reads in deliberate dark/light beats.
 *
 * NOTE: the actual Play Store / App Store URLs are placeholders — owner
 * to supply once the app is published. Until then the buttons are visible
 * but link to a fragment.
 */
import Link from "next/link";
import { Smartphone, Phone, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PhoneFrame } from "@/components/marketing/PhoneFrame";

// Game-detail screenshot reads as a stronger primary visual here than the
// top-up screen — shows the actual play surface (numbers selected) rather
// than wallet UI.
const PRIMARY_SCREENSHOT = "/app-screenshot/app-game-detail.jpg";

export function DownloadAppCta() {
  return (
    <section className="relative py-24 md:py-32 bg-brand-ink text-white overflow-hidden">
      {/* Mesh background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_85%_30%,_rgba(0,185,239,0.25),_transparent_60%),radial-gradient(ellipse_45%_55%_at_15%_80%,_rgba(1,50,153,0.30),_transparent_55%)]"
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,1)_1px,_transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,_transparent_1px)] [background-size:64px_64px]"
      />

      <Container>
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-12 items-center">
          {/* Copy */}
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary mb-5">
              Three ways to play
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.025em] text-white text-balance">
              Pick your numbers from anywhere in Ghana.
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/70 max-w-xl text-balance">
              Same NLA-licensed draws, three ways in. Use whichever channel
              fits the day.
            </p>

            {/* Cards: horizontal layout on mobile (icon-left + content-right
                so each card is half the height), vertical on sm+. */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Channel: Mobile app */}
              <Link
                href="#download-android"
                className="group rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5 hover:bg-white/10 hover:border-white/25 transition-all flex items-center gap-4 sm:flex-col sm:items-start sm:gap-0"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-secondary/15 text-brand-secondary flex-shrink-0 sm:w-auto sm:h-auto sm:bg-transparent sm:p-0 sm:rounded-none sm:mb-3">
                  <Smartphone size={22} strokeWidth={1.75} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-base text-white">Mobile app</span>
                  <span className="block text-xs text-white/60 mt-0.5 sm:mt-1">Android &amp; iOS</span>
                  <span className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-secondary group-hover:gap-2 transition-all">
                    Download
                    <ArrowRight size={12} strokeWidth={2} />
                  </span>
                </span>
              </Link>

              {/* Channel: USSD */}
              <Link
                href="/how-to-play"
                className="group rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5 hover:bg-white/10 hover:border-white/25 transition-all flex items-center gap-4 sm:flex-col sm:items-start sm:gap-0"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-secondary/15 text-brand-secondary flex-shrink-0 sm:w-auto sm:h-auto sm:bg-transparent sm:p-0 sm:rounded-none sm:mb-3">
                  <Phone size={22} strokeWidth={1.75} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-base text-white">USSD</span>
                  <span className="block text-xs text-white/60 mt-0.5 sm:mt-1 tnum">
                    Dial *987# or *446#
                  </span>
                  <span className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-secondary group-hover:gap-2 transition-all">
                    How it works
                    <ArrowRight size={12} strokeWidth={2} />
                  </span>
                </span>
              </Link>

              {/* Channel: Agent */}
              <Link
                href="/agents"
                className="group rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5 hover:bg-white/10 hover:border-white/25 transition-all flex items-center gap-4 sm:flex-col sm:items-start sm:gap-0"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-secondary/15 text-brand-secondary flex-shrink-0 sm:w-auto sm:h-auto sm:bg-transparent sm:p-0 sm:rounded-none sm:mb-3">
                  <MapPin size={22} strokeWidth={1.75} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-base text-white">In person</span>
                  <span className="block text-xs text-white/60 mt-0.5 sm:mt-1">Approved agents</span>
                  <span className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-secondary group-hover:gap-2 transition-all">
                    Find one
                    <ArrowRight size={12} strokeWidth={2} />
                  </span>
                </span>
              </Link>
            </div>

            <p className="mt-7 text-xs text-white/50 uppercase tracking-wider">
              Approved channels only ·{" "}
              <span className="text-brand-danger font-bold">18+</span>
            </p>
          </div>

          {/* Phone teaser */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-12 -z-10 rounded-[3rem] bg-brand-secondary/20 blur-3xl"
              />
              <PhoneFrame
                src={PRIMARY_SCREENSHOT}
                alt="Accurate Giant mobile app game detail screen"
                width={280}
                height={580}
                tilt={4}
              />
              {/* Floating USSD pill behind */}
              <div className="absolute -left-10 top-16 -rotate-6 px-4 py-2.5 rounded-full bg-brand-secondary text-brand-ink font-bold text-sm shadow-lifted tnum">
                *987#
              </div>
              <div className="absolute -right-6 bottom-24 rotate-3 px-4 py-2.5 rounded-full bg-white text-brand-primary font-bold text-sm shadow-lifted tnum">
                *446#
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
