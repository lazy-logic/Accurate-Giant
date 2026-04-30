/**
 * PageHeader — the brand-primary navy band that sits at the top of every
 * non-home page.
 *
 * Sized at ~50% of the previous version so it reads as a confident page
 * label rather than a competing hero. Negative top margin pulls the band
 * up under the floating glass navbar (matching the Hero treatment), so the
 * navbar visually sits ON the blue header, not above it.
 *
 * Slots:
 *   - eyebrow         small uppercase label (defaults to nothing)
 *   - title           required, becomes the page h1
 *   - subtitle        optional descriptive paragraph
 *   - breadcrumbs     optional array {label, href}
 *   - children        optional extra content rendered after the subtitle
 *                     (e.g. a search box, filter chip row, or quick stats)
 */
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./Container";

type Crumb = { label: string; href?: string };

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    /*
     * `-mt-28 md:-mt-32` + matching `pt-28 md:pt-32` pulls the section
     * UP under the floating navbar. The patterns inside fill the entire
     * extended section, so the navbar reads as floating ON the blue band.
     */
    <section className="relative overflow-hidden bg-brand-primary text-white -mt-28 md:-mt-32 pt-28 md:pt-32">
      {/* Mesh background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 88% -10%, rgba(0,185,239,0.30), transparent 55%), radial-gradient(ellipse 50% 65% at 12% 110%, rgba(255,255,255,0.06), transparent 55%)",
        }}
      />
      {/* Faint grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <Container>
        {/* Inner padding halved from py-16/24 to py-8/12 */}
        <div className="relative py-8 md:py-12">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mb-3 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/70"
            >
              {breadcrumbs.map((c, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <span key={`${c.label}-${i}`} className="inline-flex items-center gap-1.5">
                    {c.href && !last ? (
                      <Link href={c.href} className="hover:text-white transition-colors">
                        {c.label}
                      </Link>
                    ) : (
                      <span className={last ? "text-white" : ""}>{c.label}</span>
                    )}
                    {!last && (
                      <ChevronRight size={12} strokeWidth={2.5} className="text-white/40" />
                    )}
                  </span>
                );
              })}
            </nav>
          )}

          {eyebrow && (
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary mb-2">
              {eyebrow}
            </p>
          )}

          <h1 className="font-display font-extrabold text-3xl md:text-4xl xl:text-5xl leading-[1.05] tracking-[-0.025em] text-white text-balance max-w-3xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed max-w-2xl text-balance">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-5">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
