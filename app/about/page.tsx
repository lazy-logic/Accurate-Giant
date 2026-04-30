/**
 * /about — minimal corporate page.
 *
 * Stripped back to the essentials: who we are, the operating framework,
 * and a single clear contact CTA. Audited-giving 3-card grid, leadership
 * grid, and group-structure card layouts removed in favour of a single
 * calm essay-style narrative.
 *
 * The License & Regulation card stays because it's the verifiable trust
 * anchor — links to the public NLA register and shows the Act 722
 * framework reference.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  NLA_LICENCE_NUMBER,
  NLA_REGISTER_URL,
  NLA_ACT_LABEL,
} from "@/lib/regulatory";

export const metadata: Metadata = {
  title: "About",
  description:
    "Accurate Giant Company Ltd. is a private lotto operator authorised by the National Lottery Authority of Ghana under the National Lotto Act 2006 (Act 722).",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A licensed Ghanaian operator with a community purpose."
        subtitle="Authorised by the National Lottery Authority under the National Lotto Act 2006 (Act 722). Operating with AG Lottery and AG Co-operative Credit Union."
      />

      {/* Mission essay — single column, generous spacing, calm. */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-2xl mx-auto space-y-7 text-base md:text-lg leading-relaxed text-brand-ink">
            <p>
              Accurate Giant Company Ltd. is a private lotto operator
              authorised by the National Lottery Authority of Ghana. Our
              games are run under the National Lotto Act 2006 ({NLA_ACT_LABEL}),
              alongside AG Lottery Ltd. and AG Co-operative Credit Union Ltd.
            </p>
            <p className="text-brand-ink-muted">
              We exist so that every cedi played goes further than the prize.
              After tax and operating costs, audited proceeds are directed to
              named programmes: schools, clinics, and community projects. The
              point of every draw is what happens after the prize is paid.
            </p>
            <p className="text-brand-ink-muted">
              The cooperative credit union extends that mission into member
              savings and financial inclusion. The agent network puts the
              games within walking distance of the community, however a
              player chooses to take part.
            </p>
          </div>
        </Container>
      </section>

      {/* License card — the verifiable trust anchor. */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="max-w-2xl mx-auto rounded-2xl border border-brand-border bg-brand-paper-muted p-7 md:p-9">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary text-white">
                <ShieldCheck size={22} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
                  Licensed by the NLA
                </p>
                <p className="mt-1 font-display font-extrabold text-lg text-brand-ink leading-tight">
                  ACCURATE GIANT COMPANY LIMITED
                </p>
                <p className="mt-2 text-sm text-brand-ink-muted">
                  Listed on the National Lottery Authority's public register
                  under {NLA_ACT_LABEL}.
                  {NLA_LICENCE_NUMBER && (
                    <>
                      {" "}Licence number{" "}
                      <span className="font-semibold text-brand-ink tnum">
                        #{NLA_LICENCE_NUMBER}
                      </span>
                      .
                    </>
                  )}
                </p>
                <a
                  href={NLA_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
                >
                  Verify on nla.com.gh
                  <ExternalLink size={13} strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing — single contact CTA. */}
      <section className="py-20 md:py-24 border-t border-brand-border">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-[-0.02em] text-brand-ink text-balance">
              Want to know more?
            </h2>
            <p className="mt-4 text-base text-brand-ink-muted">
              Send a question, request our annual report, or talk to the
              compliance team.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white text-base font-semibold hover:bg-[#01277a] transition-all shadow-soft"
            >
              Get in touch
              <ArrowRight
                size={18}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
