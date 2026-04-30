/**
 * Trust strip — reused on Home, every game-detail page, and the results page.
 * Deliberately NOT shown on /about (the License & Regulation section replaces it)
 * or /responsible-play (that whole page is the trust statement). See
 * docs/wireframes.md "Trust strip placement".
 */
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import {
  NLA_LICENCE_NUMBER,
  NLA_REGISTER_URL,
  NLA_REGISTERED_LABEL,
} from "@/lib/regulatory";

export function TrustStrip() {
  return (
    <div className="border-y border-brand-border bg-brand-paper-muted">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-5">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-3 text-sm text-brand-ink">
          <Link
            href={NLA_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold hover:text-brand-primary transition-colors"
            title="View on the NLA public register"
          >
            <ShieldCheck size={18} strokeWidth={1.75} className="text-brand-primary" />
            {NLA_LICENCE_NUMBER
              ? `NLA licence #${NLA_LICENCE_NUMBER}`
              : NLA_REGISTERED_LABEL}
          </Link>
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-danger text-[10px] font-bold text-white shadow-soft">
              18+
            </span>
            <span className="font-semibold text-brand-danger">Strictly 18 and over</span>
          </span>
          <Link
            href="/responsible-play"
            className="font-medium text-brand-primary hover:underline underline-offset-4"
          >
            Play responsibly →
          </Link>
        </div>
      </div>
    </div>
  );
}
