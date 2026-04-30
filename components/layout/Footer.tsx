/**
 * Site footer — single-line, brand-primary navy surface.
 *
 * One row holding the mandatory regulatory disclosures + a tight set of
 * legal links + copyright. Everything else (logo lockup, full sitemap,
 * social, contact) lives elsewhere.
 *
 * MANDATORY items per docs/nla-compliance.md §2 — do NOT remove:
 *   - NLA license number (the white pill)
 *   - 18+ badge
 *   - "Responsible play" link
 *   - Operator legal name in the copyright line
 *
 * White text on --brand-primary passes WCAG AA at ~13:1.
 *
 * Client component so it can use usePathname to skip rendering inside /admin.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import {
  NLA_LICENCE_NUMBER,
  NLA_REGISTER_URL,
  NLA_REGISTERED_LABEL,
} from "@/lib/regulatory";

const LINKS = [
  { label: "Responsible play", href: "/responsible-play" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    /*
     * Footer sits flush at the bottom of the page. No top margin — the
     * previous section attaches directly to it (the map preview on the home
     * page is meant to read as continuous with the footer line).
     */
    <footer className="bg-brand-primary text-white">
      <Container>
        {/* Mobile: stacked + centered. Desktop: split row, justified to the edges. */}
        <div className="py-5 flex flex-col items-center gap-3 text-sm md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-6 md:gap-y-3">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-start">
            <Link
              href={NLA_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white text-brand-ink font-semibold text-xs hover:bg-brand-paper-muted transition-colors"
              title="View on the NLA public register"
            >
              {NLA_LICENCE_NUMBER
                ? `NLA licence #${NLA_LICENCE_NUMBER}`
                : NLA_REGISTERED_LABEL}
            </Link>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-danger text-white text-[10px] font-bold shadow-soft">
              18+
            </span>
            {LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/85 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-white/85 text-center md:text-right">
            © {new Date().getFullYear()} Accurate Giant Company Ltd.
            <span className="hidden sm:inline"> · NLA-licensed · Act 722</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
