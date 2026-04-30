/**
 * Global 404. Renders inside the root layout (so Header + Footer come along)
 * because Next.js places not-found.tsx inside the layout tree by default.
 *
 * Two CTAs — Home and Results — both being likely intent for someone who
 * landed on a broken link.
 */
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <section className="py-32 md:py-40">
      <Container>
        <div className="max-w-xl">
          <p className="font-display font-black text-8xl tnum text-brand-primary leading-none">404</p>
          <h1 className="text-5xl md:text-6xl mt-4">
            We couldn't find that page.
          </h1>
          <p className="mt-5 text-base text-brand-ink-muted leading-relaxed">
            It might have moved, or you may have followed an old link. Try the
            homepage, or jump straight to the latest results.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center h-12 px-7 rounded-md bg-brand-primary text-white text-base font-medium hover:bg-[#01277a] shadow-soft transition-all"
            >
              Go home
            </Link>
            <Link
              href="/results"
              className="inline-flex items-center h-12 px-7 rounded-md border border-brand-primary text-brand-primary text-base font-medium hover:bg-brand-paper-muted transition-all"
            >
              See latest results
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
