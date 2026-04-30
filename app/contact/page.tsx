/**
 * /contact — real contact page with form + office details.
 *
 * The form below is a static UI mock — the action POSTS to /api/contact
 * which doesn't exist yet. Wire it to an email service (Resend, Postmark,
 * Supabase Edge Function) before launch.
 *
 * Fields use React Hook Form-friendly naming so swapping in RHF + Zod is a
 * trivial follow-up.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Building2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { NLA_REGISTER_URL } from "@/lib/regulatory";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Accurate Giant office, compliance team, or send a general enquiry. Address, phone, email, and a contact form.",
};

const SUBJECTS = [
  { value: "general", label: "General enquiry" },
  { value: "agent", label: "Agent application" },
  { value: "winner", label: "Prize claim / winner" },
  { value: "compliance", label: "Compliance / responsible play" },
  { value: "press", label: "Press & partnerships" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Reach the team."
        subtitle="Office details, contact form, and direct routes for compliance and press enquiries."
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-12">
            {/* Form column */}
            <div className="lg:col-span-7">
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-ink mb-2">
                Send us a message
              </h2>
              <p className="text-sm text-brand-ink-muted mb-8">
                We aim to respond within two working days. For urgent
                compliance matters, use the direct email below.
              </p>

              <form
                action="/api/contact"
                method="post"
                className="rounded-2xl border border-brand-border bg-brand-paper p-6 md:p-8 shadow-soft space-y-5"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="block text-xs font-bold uppercase tracking-wider text-brand-ink-muted mb-1.5">
                      Your name
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="w-full h-11 px-3.5 rounded-md border border-brand-border bg-brand-paper text-base focus:border-brand-primary focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-xs font-bold uppercase tracking-wider text-brand-ink-muted mb-1.5">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="w-full h-11 px-3.5 rounded-md border border-brand-border bg-brand-paper text-base focus:border-brand-primary focus:outline-none"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-wider text-brand-ink-muted mb-1.5">
                    Subject
                  </span>
                  <select
                    name="subject"
                    required
                    defaultValue="general"
                    className="w-full h-11 px-3 rounded-md border border-brand-border bg-brand-paper text-base focus:border-brand-primary focus:outline-none"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-wider text-brand-ink-muted mb-1.5">
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full px-3.5 py-3 rounded-md border border-brand-border bg-brand-paper text-base focus:border-brand-primary focus:outline-none resize-none"
                  />
                </label>

                <p className="text-xs text-brand-ink-muted">
                  By submitting you agree to the{" "}
                  <Link href="/legal/privacy" className="text-brand-primary hover:underline">
                    Privacy Policy
                  </Link>
                  . We use your details to respond to this enquiry only.
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-brand-primary text-white font-semibold hover:bg-[#01277a] transition-all shadow-soft"
                >
                  Send message
                </button>
              </form>
            </div>

            {/* Details column */}
            <aside className="lg:col-span-5 space-y-5">
              <div className="rounded-2xl border border-brand-border bg-brand-paper-muted p-6 md:p-7">
                <Building2 size={22} strokeWidth={1.75} className="text-brand-primary mb-3" />
                <h3 className="font-display font-extrabold text-lg text-brand-ink mb-4">
                  Head office
                </h3>
                <dl className="space-y-3.5 text-sm">
                  <div className="flex gap-3">
                    <MapPin size={16} strokeWidth={2} className="text-brand-ink-muted mt-0.5 flex-shrink-0" />
                    <dd className="text-brand-ink">
                      Accurate Giant Company Ltd.<br />
                      New Edubiase<br />
                      Adansi South District, Ashanti Region<br />
                      Ghana
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <Phone size={16} strokeWidth={2} className="text-brand-ink-muted mt-0.5 flex-shrink-0" />
                    <dd className="tnum text-brand-ink">+233 30 257 1834</dd>
                  </div>
                  <div className="flex gap-3">
                    <Mail size={16} strokeWidth={2} className="text-brand-ink-muted mt-0.5 flex-shrink-0" />
                    <a href="mailto:info@accurategiant.com" className="text-brand-primary hover:underline">
                      info@accurategiant.com
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <Clock size={16} strokeWidth={2} className="text-brand-ink-muted mt-0.5 flex-shrink-0" />
                    <dd className="text-brand-ink">
                      Mon–Fri · 8am–6pm<br />
                      Sat · 9am–2pm
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-brand-border bg-brand-paper p-6 md:p-7">
                <ShieldCheck size={22} strokeWidth={1.75} className="text-brand-primary mb-3" />
                <h3 className="font-display font-extrabold text-lg text-brand-ink mb-2">
                  Compliance &amp; responsible play
                </h3>
                <p className="text-sm text-brand-ink-muted mb-3">
                  For underage-play reports, self-exclusion requests, or
                  compliance matters, write directly to:
                </p>
                <a
                  href="mailto:compliance@accurategiant.com"
                  className="block text-brand-primary font-semibold hover:underline mb-3"
                >
                  compliance@accurategiant.com
                </a>
                <Link
                  href="/responsible-play"
                  className="text-sm text-brand-ink-muted hover:text-brand-primary"
                >
                  Read our responsible-play guidance →
                </Link>
              </div>

              <div className="rounded-2xl border border-brand-border bg-brand-paper-sunken p-6 md:p-7 text-sm text-brand-ink-muted">
                Verify our NLA registration on the public register at{" "}
                <a
                  href={NLA_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary font-semibold hover:underline"
                >
                  nla.com.gh
                </a>
                .
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
