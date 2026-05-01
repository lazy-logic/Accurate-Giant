/**
 * /how-to-play — channel-led mechanics explainer.
 *
 * Currently three sections:
 *   1. Page hero
 *   2. HowItWorks — the three-step pattern adapted from the owner's reference
 *   3. TrustStrip
 *
 * Channel-deep-dives (mobile app step-by-step, what to do if you win, FAQ)
 * are in the next iteration. Until then the HowItWorks section is the
 * substantive answer to "how do I play?".
 */
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { TrustStrip } from "@/components/layout/TrustStrip";

export const metadata: Metadata = {
  title: "How to play",
  description:
    "Two channels, same NLA-licensed games. Pick your draw, play via the mobile app or an approved agent, then watch for the result.",
};

export default function HowToPlayPage() {
  return (
    <>
      <PageHeader
        eyebrow="How to play"
        title="Three steps. Two channels. Same draws."
        subtitle="Whether you play from the AG mobile app or walk into your local agent, the games and odds are identical. Pick the channel that fits your day."
      />

      <HowItWorks />

      <TrustStrip />
    </>
  );
}
