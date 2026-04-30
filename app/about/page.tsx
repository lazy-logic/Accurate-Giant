/**
 * /about — corporate + charity-credibility page.
 *
 * Updated 2026-04-30 to reflect Accurate Giant Company Ltd's actual
 * positioning: a private lotto operator licensed by the NLA under the
 * National Lotto Act 2006 (Act 722), operating alongside related entities
 * AG Lottery Ltd and AG Co-operative Credit Union Ltd, with community-
 * focused giving.
 *
 * The License & Regulation section is the only place on the site where the
 * NLA logo may appear, and ONLY ONCE written usage permission is on file
 * (per docs/nla-compliance.md §4). Until then, the section displays the
 * license details in plain text — do not add the logo.
 *
 * Most page content (audited giving figure, leadership, contact details,
 * exact license number) is OWNER-supplied — see content-inventory.md §2.
 */
import type { Metadata } from "next";
import { ShieldCheck, FileText, Users, Building2, Coins, HeartHandshake, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { NLA_LICENCE_NUMBER, NLA_REGISTER_URL } from "@/lib/regulatory";

export const metadata: Metadata = {
  title: "About",
  description:
    "Accurate Giant Company Ltd. is a licensed private lotto operator in Ghana under the NLA. Read our mission, group structure, leadership, and license details.",
};

const LEADERSHIP = [
  { name: "[OWNER]", role: "Chair" },
  { name: "[OWNER]", role: "Managing Director" },
  { name: "[OWNER]", role: "Head of Charity Programmes" },
  { name: "[OWNER]", role: "Head of Compliance" },
];

const GROUP = [
  {
    icon: Building2,
    name: "Accurate Giant Company Ltd.",
    role: "Parent operator",
    body:
      "The licensed private lotto operator. Holds the NLA licence under the National Lotto Act 2006 (Act 722) and runs the games you see on this site.",
  },
  {
    icon: Coins,
    name: "AG Lottery Ltd.",
    role: "Lotto operations",
    body:
      "Sister entity carrying lotto-specific operations and the agent network across Accra.",
  },
  {
    icon: HeartHandshake,
    name: "AG Co-operative Credit Union Ltd.",
    role: "Cooperative finance",
    body:
      "Cooperative credit-union arm. Community savings, member loans, and financial inclusion for agents and players.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-20 md:py-28 border-b border-brand-border">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-4">
            About us
          </p>
          <h1 className="text-5xl md:text-6xl xl:text-7xl tracking-[-0.035em] max-w-4xl text-balance">
            A licensed Ghanaian operator with a community purpose.
          </h1>
          <p className="mt-7 text-lg md:text-xl text-brand-ink-muted leading-relaxed max-w-2xl text-balance">
            Accurate Giant Company Ltd. is a private lotto operator authorised
            by the National Lottery Authority of Ghana under the National
            Lotto Act 2006 (Act 722). We operate alongside AG Lottery Ltd and
            AG Co-operative Credit Union Ltd, directing audited proceeds to
            community work across Accra.
          </p>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-4">
              Our mission
            </p>
            <h2 className="text-4xl md:text-5xl text-balance">
              Lotto with a clear, audited purpose.
            </h2>
            <p className="mt-7 text-base md:text-lg text-brand-ink-muted leading-relaxed">
              We run NLA-licensed draws so that the proceeds, after prizes,
              tax, and operating costs, are independently audited and
              reported. The cooperative credit union extends that mission into
              member savings and financial inclusion. The point of every draw
              is what happens after the prize is paid.
            </p>
            <blockquote className="mt-9 border-l-4 border-brand-secondary pl-6 font-display font-extrabold text-2xl md:text-3xl italic text-brand-ink leading-snug tracking-[-0.015em]">
              "We exist so that every cedi played goes further, funding
              education, healthcare, and community work across Accra."
            </blockquote>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 bg-brand-primary text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_60%_at_80%_30%,_rgba(0,185,239,0.30),_transparent_60%),radial-gradient(ellipse_50%_60%_at_20%_80%,_rgba(255,255,255,0.08),_transparent_55%)]"
        />
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary mb-5">
              Audited annual giving
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.025em] text-white text-balance">
              Where the giving goes is part of the work.
            </h2>
            <p className="mt-7 text-base md:text-lg text-white/80 leading-relaxed text-balance">
              Every fiscal year we publish a breakdown of charitable
              disbursements alongside our financial statements. Independent
              auditors verify the figures before they appear here. Expect
              named programmes — the school, the clinic, the project — not
              generic categories.
            </p>
          </div>

          <div className="grid gap-5 md:gap-6 md:grid-cols-3 mt-14">
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm p-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary mb-3">
                The audit
              </p>
              <h3 className="font-display font-extrabold text-lg text-white">
                External, annual, on the record.
              </h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Conducted each fiscal year by an independent firm. The
                report covers gaming activity and charitable disbursement
                in a single document.
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm p-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary mb-3">
                The publication
              </p>
              <h3 className="font-display font-extrabold text-lg text-white">
                Posted here, not buried.
              </h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Once signed off, the audited summary lives on this page
                with a downloadable PDF. Previous years remain available so
                comparisons are easy.
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm p-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary mb-3">
                The programmes
              </p>
              <h3 className="font-display font-extrabold text-lg text-white">
                Named, not generic.
              </h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Education, healthcare, and community work — but always
                tied to the specific schools, clinics, and projects that
                received funds.
              </p>
            </div>
          </div>

        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-4">
            Group structure
          </p>
          <h2 className="text-4xl md:text-5xl mb-12 text-balance">
            Three entities, one mission.
          </h2>
          <div className="grid gap-5 md:gap-6 md:grid-cols-3">
            {GROUP.map((entity) => (
              <article
                key={entity.name}
                className="rounded-2xl border border-brand-border bg-brand-paper p-7 shadow-soft"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary text-white mb-5">
                  <entity.icon size={22} strokeWidth={2} />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted mb-1">
                  {entity.role}
                </p>
                <h3 className="font-display font-extrabold text-xl tracking-[-0.01em] text-brand-ink leading-tight">
                  {entity.name}
                </h3>
                <p className="mt-3 text-sm text-brand-ink-muted leading-relaxed">
                  {entity.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-4">
            Leadership
          </p>
          <h2 className="text-4xl md:text-5xl mb-12 text-balance">
            The team behind the draws.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((p) => (
              <article
                key={p.role}
                className="rounded-2xl border border-brand-border bg-brand-paper overflow-hidden"
              >
                <div className="aspect-square bg-brand-paper-muted flex items-center justify-center text-brand-ink-muted">
                  <Users size={28} strokeWidth={1.5} />
                </div>
                <div className="p-5">
                  <p className="font-bold text-brand-ink">{p.name}</p>
                  <p className="text-sm text-brand-ink-muted mt-1">{p.role}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32 bg-brand-paper-muted border-y border-brand-border">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <ShieldCheck
                size={36}
                strokeWidth={1.5}
                className="text-brand-primary mb-5"
              />
              <h2 className="text-4xl md:text-5xl text-balance">
                Licensed by the National Lottery Authority of Ghana.
              </h2>
            </div>
            <div className="md:col-span-7">
              <dl className="space-y-6">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
                    Public NLA register
                  </dt>
                  <dd className="text-base mt-1 leading-relaxed">
                    Listed as <span className="font-semibold">ACCURATE GIANT COMPANY LIMITED</span> on
                    the National Lottery Authority's public register of
                    private lotto operators.{" "}
                    <a
                      href={NLA_REGISTER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-brand-primary font-semibold hover:underline"
                    >
                      Verify on nla.com.gh
                      <ExternalLink size={13} strokeWidth={2} />
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
                    Licence number
                  </dt>
                  <dd className="font-display font-extrabold text-2xl mt-1 tnum">
                    {NLA_LICENCE_NUMBER ? `#${NLA_LICENCE_NUMBER}` : "[OWNER to supply from licence certificate]"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
                    Operating framework
                  </dt>
                  <dd className="text-base mt-1 leading-relaxed">
                    Operated under the National Lotto Act 2006 (Act 722) as a
                    licensed private lotto operator. AG Co-operative Credit
                    Union Ltd. is registered separately under Ghana's
                    cooperative-society regulations.
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
                    Responsible-gaming alignment
                  </dt>
                  <dd className="text-base mt-1 leading-relaxed">
                    Aligned with the World Lottery Association's Responsible
                    Gaming Principles, including the Level 2 framework held
                    by the National Lottery Authority.
                  </dd>
                </div>
              </dl>
              <a
                href="#"
                aria-disabled
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary"
              >
                <FileText size={16} strokeWidth={1.75} />
                Download license PDF (placeholder)
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-4">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl text-balance">
              Reach the office.
            </h2>
            <dl className="mt-9 space-y-5 text-base">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
                  Office address
                </dt>
                <dd className="mt-1">[OWNER to supply]</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
                  Phone
                </dt>
                <dd className="mt-1 tnum">+233 [TBC]</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
                  Email
                </dt>
                <dd className="mt-1">info@accurategiant.com</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>
    </>
  );
}
