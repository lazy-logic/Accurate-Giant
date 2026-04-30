/**
 * /responsible-play — MANDATORY page (compliance requirement, see
 * docs/nla-compliance.md §3).
 *
 * Tone is calm, not lecturing. Specifically NO motion on this page beyond the
 * global page-transition; animation here would feel inappropriate.
 *
 * Several blocks contain placeholder copy that MUST be replaced before launch:
 *  - Support helplines list (Ghana-specific; OWNER to supply)
 *  - Self-exclusion mechanism (OWNER to confirm: in-house or refer to NLA)
 *  - Underage-play reporting route (OWNER to confirm contact)
 *
 * The 18+ badge in the hero is rendered as REAL TEXT (not an icon) so screen
 * readers announce it correctly.
 */
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Wallet, Pause, MessageCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Responsible play",
  description:
    "Play within your means. Age 18+. Support resources, self-exclusion guidance, and our regulatory commitments.",
};

const GUIDANCE = [
  {
    icon: Wallet,
    title: "Set a budget",
    body: "Decide what you'll spend each week, and stop there. Lotto is for fun, not for chasing a result.",
  },
  {
    icon: Pause,
    title: "Take breaks",
    body: "If you find yourself playing more than you planned, pause for a week. The draws will still be here.",
  },
  {
    icon: MessageCircle,
    title: "Talk to someone",
    body: "If playing stops being fun, talk to a friend, family member, or one of the support resources below.",
  },
  {
    icon: ShieldCheck,
    title: "Play only at approved agents",
    body: "Approved agents display NLA licensing. If you're unsure, use our locator or skip the agent.",
  },
];

export default function ResponsiblePlayPage() {
  return (
    <>
      <PageHeader
        eyebrow="Responsible play"
        title="Play within your means."
        subtitle="Lotto should be a small, fun part of your week. If it stops being either of those things, the steps below are here for you."
      >
        <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-danger/15 ring-1 ring-brand-danger/40 text-white text-sm font-bold">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-danger text-white text-xs font-extrabold shadow-soft">
            18+
          </span>
          Strictly 18 and over
        </span>
      </PageHeader>

      <section className="py-16 md:py-20 border-b border-brand-border">
        <Container>
          <h2 className="font-display text-2xl md:text-3xl tracking-[-0.015em] mb-3">
            Who can play
          </h2>
          <p className="max-w-2xl text-base text-brand-ink-muted leading-relaxed">
            You must be 18 or over to play any NLA-licensed game. Agents and
            POS terminals are required to verify age before selling a ticket.
            If you're under 18, please don't play. If you spot underage play,
            see "Report underage play" below.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-20 border-b border-brand-border">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-3">
            Stay in control
          </p>
          <h2 className="text-4xl md:text-5xl mb-10">
            Four ways to keep play healthy.
          </h2>
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GUIDANCE.map((g) => (
              <article
                key={g.title}
                className="rounded-lg border border-brand-border bg-brand-paper p-6"
              >
                <g.icon
                  size={24}
                  strokeWidth={1.75}
                  className="text-brand-primary mb-4"
                />
                <h3 className="font-display text-xl">{g.title}</h3>
                <p className="text-sm text-brand-ink-muted mt-2 leading-relaxed">
                  {g.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 border-b border-brand-border">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-3">
              Support resources
            </p>
            <h2 className="text-4xl md:text-5xl">
              If you need help.
            </h2>
            <p className="mt-5 text-base text-brand-ink-muted leading-relaxed">
              Ghana-specific helplines and support organisations will be listed
              here before launch. In the meantime, you can reach our office
              directly and we'll point you to the right place.
            </p>
            <div className="mt-8 rounded-lg border border-brand-border bg-brand-paper-muted p-6">
              <h3 className="font-semibold text-brand-ink">Self-exclusion</h3>
              <p className="text-sm text-brand-ink-muted mt-2 leading-relaxed">
                Mechanism details to be confirmed with the NLA before launch.
                If you'd like to be excluded from play, contact the office at{" "}
                <a
                  href="mailto:info@accurategiant.com"
                  className="text-brand-primary font-medium hover:underline"
                >
                  info@accurategiant.com
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 border-b border-brand-border">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-3">
              Underage play
            </p>
            <h2 className="text-4xl md:text-5xl">
              Report underage play.
            </h2>
            <p className="mt-5 text-base text-brand-ink-muted leading-relaxed">
              If you've seen someone under 18 being sold a ticket, please tell
              us. Reports go directly to our compliance lead and to the NLA
              where appropriate.
            </p>
            <a
              href="mailto:compliance@accurategiant.com"
              className="mt-6 inline-flex items-center h-12 px-7 rounded-md bg-brand-primary text-white text-base font-medium hover:bg-[#01277a] shadow-soft transition-all"
            >
              Email compliance
            </a>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-3">
              Our commitments
            </p>
            <h2 className="text-4xl md:text-5xl">
              How we operate.
            </h2>
            <p className="mt-5 text-base text-brand-ink-muted leading-relaxed">
              Accurate Giant operates under the National Lotto Act 2006
              (Act 722). We align with the World Lottery Association's
              Responsible Gaming Principles, including the Level 2 framework
              held by the National Lottery Authority. As a charity-licensed
              operator, our published audits cover both gaming activity and
              charitable disbursement.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
