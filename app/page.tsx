/**
 * Homepage — composes the home-section components in deliberate light/dark
 * beats so the page reads as a sequence of distinct surfaces:
 *
 *   1. Hero                  — light, mesh + dot pattern, patterns extend behind navbar
 *   2. WeekSchedule          — DARK ink, week's draws as coloured ball tiles
 *   3. ResultsWidget         — sunken with dot pattern (data feel)
 *   4. FeaturedGames         — light with grid pattern
 *   5. DownloadAppCta        — DARK navy, three ways to play
 *   6. TrustStrip            — light band
 *   7. WinnersStories        — soft cyan-mesh diagonal
 *   8. CharityImpactCallout  — DARK navy with mega numeric
 *   9. BecomeAnAgentCta      — light grey, partnership pitch
 *  10. AgentLocatorCta       — light card with map dots
 *
 * Each section component owns its background, padding, and Container.
 * This file should stay almost empty — sections, not styles, are what
 * change here.
 */
import { Hero } from "@/components/home/Hero";
import { WeekSchedule } from "@/components/home/WeekSchedule";
import { ResultsWidget } from "@/components/home/ResultsWidget";
import { DownloadAppCta } from "@/components/home/DownloadAppCta";
import { TrustStrip } from "@/components/layout/TrustStrip";
import { WinnersStories } from "@/components/home/WinnersStories";
import { CharityImpactCallout } from "@/components/home/CharityImpactCallout";
import { BecomeAnAgentCta } from "@/components/home/BecomeAnAgentCta";
import { AgentMapPreview } from "@/components/home/AgentMapPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WeekSchedule />
      <ResultsWidget />
      <DownloadAppCta />
      <TrustStrip />
      <WinnersStories />
      <CharityImpactCallout />
      <BecomeAnAgentCta />
      <AgentMapPreview />
    </>
  );
}
