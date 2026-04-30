/**
 * Sticky site header rendered as a floating, glassmorphic, rounded pill.
 *
 * Modernised pass:
 *  - Active pill uses a navy gradient + inner highlight + cyan glow ring
 *    rather than a flat fill. Reads more like a real button than a bookmark.
 *  - Inactive items get a subtle hover surface with a small underline
 *    indicator that animates in.
 *  - Logo container gets a thin separator line on desktop to anchor it
 *    against the nav cluster.
 *  - Pill outer shadow has a faint cyan tint matching the brand.
 *
 * Active-state animation: each nav item is a pill. The active item has a
 * gradient background. Framer Motion's `layoutId` morphs the SAME background
 * div between items so the pill slides across the nav rather than fading
 * in/out.
 *
 * Returns null inside /admin so the admin chrome owns its own layout.
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NLA_LICENCE_NUMBER,
  NLA_REGISTER_URL,
  NLA_REGISTERED_LABEL,
} from "@/lib/regulatory";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/games" },
  { label: "Results", href: "/results" },
  { label: "How to play", href: "/how-to-play" },
  { label: "Agents", href: "/agents" },
  { label: "About", href: "/about" },
];

const isActive = (pathname: string | null, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname === href || (pathname !== null && pathname.startsWith(href));
};

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <LazyMotion features={domAnimation}>
      <header className="sticky top-3 md:top-5 z-40 px-3 md:px-6">
        <div
          className={cn(
            "mx-auto max-w-[1240px] rounded-3xl border border-white/60 transition-all duration-300",
            "bg-white/70 backdrop-blur-2xl backdrop-saturate-150",
            scrolled
              ? "shadow-[0_10px_32px_rgba(1,30,80,0.12),0_2px_4px_rgba(0,185,239,0.08)] py-3 md:py-3.5"
              : "shadow-[0_8px_28px_rgba(1,30,80,0.08),0_1px_2px_rgba(0,185,239,0.06)] py-4 md:py-5",
          )}
        >
          <div className="flex items-center justify-between gap-6 px-5 md:px-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center md:pr-6 md:border-r md:border-brand-border/60 shrink-0"
              aria-label="Accurate Giant home"
            >
              <Image
                src="/brand/ag-logo.png"
                alt="Accurate Giant Company Ltd."
                width={566}
                height={370}
                priority
                className={cn(
                  "w-auto transition-all duration-300",
                  scrolled ? "h-10 md:h-12" : "h-12 md:h-14",
                )}
              />
            </Link>

            {/* Desktop nav with animated active pill */}
            <nav
              aria-label="Primary"
              className="hidden md:flex items-center gap-0.5"
            >
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-3.5 lg:px-4 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 group",
                      active
                        ? "text-white"
                        : "text-brand-ink hover:text-brand-primary",
                    )}
                  >
                    {active && (
                      <m.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, #013299 0%, #001f5f 100%)",
                          boxShadow: [
                            "inset 0 1px 0 rgba(255,255,255,0.18)",
                            "0 4px 14px rgba(1,50,153,0.35)",
                            "0 0 0 1px rgba(0,185,239,0.15)",
                          ].join(", "),
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                          mass: 0.7,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    {/* Hover underline indicator (inactive items only) */}
                    {!active && (
                      <span
                        aria-hidden
                        className="absolute left-1/2 -translate-x-1/2 bottom-1 h-0.5 w-0 bg-brand-primary rounded-full transition-all duration-200 group-hover:w-5"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA — primary action button */}
            <Link
              href="/how-to-play"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-primary text-white text-xs font-semibold hover:bg-[#01277a] transition-all shadow-soft group"
            >
              Get started
              <ArrowRight
                size={13}
                strokeWidth={2.25}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-1 rounded-full text-brand-ink hover:bg-brand-paper-muted transition-colors"
            >
              {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
            </button>
          </div>

          {/* Mobile drawer */}
          {open && (
            <div className="md:hidden border-t border-white/40 mt-3 pt-3 px-5">
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "py-2.5 px-3 rounded-xl text-base font-semibold transition-colors",
                        active
                          ? "bg-brand-primary text-white"
                          : "text-brand-ink hover:bg-brand-paper-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <a
                  href={NLA_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-3 pb-1 text-xs text-brand-ink-muted hover:text-brand-primary"
                >
                  {NLA_LICENCE_NUMBER ? (
                    <>
                      NLA licence:{" "}
                      <span className="font-semibold">#{NLA_LICENCE_NUMBER}</span>
                    </>
                  ) : (
                    <span className="font-semibold">{NLA_REGISTERED_LABEL} →</span>
                  )}
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </LazyMotion>
  );
}
