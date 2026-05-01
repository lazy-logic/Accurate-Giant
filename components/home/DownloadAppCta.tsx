/**
 * DownloadAppCta — channel-led CTA section.
 *
 * Two ways to play, two cards. Sits mid-page after Featured Games so the
 * visitor — having just seen the game catalogue — gets the obvious "OK how
 * do I actually play?" answer.
 *
 * Layout: split column. Copy left, phone-frame teaser right.
 *
 * Background: dark navy with a soft mesh gradient — matches the Charity
 * Callout's dark surface so the page reads in deliberate dark/light beats.
 *
 * NOTE: the actual Play Store / App Store URLs are placeholders — owner
 * to supply once the app is published. Until then the buttons are visible
 * but link to a fragment.
 */
import Link from "next/link";
import { Smartphone, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PhoneFrame } from "@/components/marketing/PhoneFrame";

// Game-detail screenshot reads as a stronger primary visual here than the
// top-up screen — shows the actual play surface (numbers selected) rather
// than wallet UI.
const PRIMARY_SCREENSHOT = "/app-screenshot/app-game-detail.jpg";

export function DownloadAppCta() {
  return (
    /*
     * Asymmetric vertical padding by design: the section has a normal top
     * gutter but `pb-0` so the phone in the right column reads as RISING
     * out of the bottom edge instead of floating mid-section. Each grid
     * cell controls its own bottom alignment — copy keeps its own bottom
     * padding, the phone column uses items-end so its child sits flush
     * with the section baseline.
     */
    /*
     * `overflow-visible` (not hidden) so the phone can protrude above the
     * section's top edge. The mesh/grid background layers are positioned
     * with inset-0 + -z-10 so they stay contained within the section bounds
     * regardless.
     */
    <section className="relative pt-12 md:pt-14 pb-0 bg-brand-ink text-white">
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
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-12">
          {/* Copy — bottom padding kept tight; the phone column drives the
              section's overall height on lg+, copy holds itself just shy of
              that baseline. */}
          <div className="lg:col-span-7 pb-12 md:pb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary mb-3">
              Two ways to play
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl xl:text-5xl leading-[1.05] tracking-[-0.025em] text-white text-balance">
              Pick your numbers from anywhere in Ghana.
            </h2>
            <p className="mt-4 text-sm md:text-base text-white/70 max-w-xl text-balance">
              Same NLA-licensed draws, two ways in. Use whichever fits the day.
            </p>

            {/* Cards: narrower than the copy column so they read as compact
                buttons instead of stretched bars. Horizontal layout on
                mobile (icon-left + content-right so each card is half the
                height), vertical on sm+. */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
              {/* Channel: Mobile app */}
              <Link
                href="#download-android"
                className="group rounded-2xl border border-white/15 bg-white/5 p-3.5 sm:p-4 hover:bg-white/10 hover:border-white/25 transition-all flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-secondary/15 text-brand-secondary flex-shrink-0 sm:w-auto sm:h-auto sm:bg-transparent sm:p-0 sm:rounded-none sm:mb-2">
                  <Smartphone size={20} strokeWidth={1.75} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-sm sm:text-base text-white">Mobile app</span>
                  <span className="block text-xs text-white/60 mt-0.5">Android &amp; iOS</span>
                  <span className="mt-1.5 sm:mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-secondary group-hover:gap-2 transition-all">
                    Download
                    <ArrowRight size={12} strokeWidth={2} />
                  </span>
                </span>
              </Link>

              {/* Channel: Agent */}
              <Link
                href="/how-to-play"
                className="group rounded-2xl border border-white/15 bg-white/5 p-3.5 sm:p-4 hover:bg-white/10 hover:border-white/25 transition-all flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-secondary/15 text-brand-secondary flex-shrink-0 sm:w-auto sm:h-auto sm:bg-transparent sm:p-0 sm:rounded-none sm:mb-2">
                  <MapPin size={20} strokeWidth={1.75} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-sm sm:text-base text-white">In person</span>
                  <span className="block text-xs text-white/60 mt-0.5">Approved agents</span>
                  <span className="mt-1.5 sm:mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-secondary group-hover:gap-2 transition-all">
                    How it works
                    <ArrowRight size={12} strokeWidth={2} />
                  </span>
                </span>
              </Link>
            </div>

            <p className="mt-5 text-xs text-white/50 uppercase tracking-wider">
              Approved channels only ·{" "}
              <span className="text-brand-danger font-bold">18+</span>
            </p>
          </div>

          {/* Phone teaser — bottom-aligned (sits flush with the section
              baseline because section is pb-0) AND lifted with a negative
              top margin so it protrudes above the section's top edge into
              the lighter section above. Section uses overflow-visible so
              the protruding portion isn't clipped. */}
          <div className="lg:col-span-5 hidden lg:flex items-end justify-center -mt-20 xl:-mt-28">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-10 -z-10 rounded-[3rem] bg-brand-secondary/20 blur-3xl"
              />
              <PhoneFrame
                src={PRIMARY_SCREENSHOT}
                alt="Accurate Giant mobile app game detail screen"
                width={220}
                height={460}
                tilt={4}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
