/**
 * A single winning-number chip — rounded "lottery ball" style.
 *
 * VISUAL DECISIONS:
 *  - CIRCULAR (rounded-full) — reads as a real lottery ball rather than an
 *    abstract square. Updated 2026-04-30 (was square; see ADR 0005).
 *  - Tabular numerals (`tnum`) so digits don't shift width when results refresh.
 *  - Aria-label calls each number out individually for screen readers.
 *
 * MOTION:
 *  - Uses Framer Motion staggered blur-in. The super prompt names GSAP for the
 *    digit reveal (§5/§3); Framer is in here as a temporary stand-in because it
 *    was already a dependency. When GSAP is added, replace this animation block
 *    with the GSAP timeline and keep the same visual outcome.
 *  - `animated={false}` is used on tiles and small recap rows where each card
 *    would otherwise re-fire the reveal — call out the latest hero, not every
 *    historical row.
 *  - `prefers-reduced-motion` is handled by the global rule in globals.css that
 *    flattens transition-duration to ~0ms.
 */
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type NumberChipProps = {
  value: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "bonus" | "muted";
  index?: number;
  animated?: boolean;
};

const sizeClasses = {
  sm: "w-9 h-9 text-sm",
  md: "w-11 h-11 text-base md:w-12 md:h-12 md:text-lg",
  lg: "w-12 h-12 text-lg md:w-14 md:h-14 md:text-xl",
};

const variantClasses = {
  primary: "bg-brand-primary text-white",
  bonus: "bg-brand-secondary text-brand-ink",
  muted: "bg-brand-paper-sunken text-brand-ink",
};

export function NumberChip({
  value,
  size = "md",
  variant = "primary",
  index = 0,
  animated = true,
}: NumberChipProps) {
  // Ball-style circular chip with subtle gradient + highlight for that
  // "real lottery ball" feel.
  const ballStyle = {
    background:
      variant === "primary"
        ? "radial-gradient(circle at 30% 25%, #1947b8 0%, #013299 55%, #001f5f 100%)"
        : variant === "bonus"
          ? "radial-gradient(circle at 30% 25%, #4dd0f5 0%, #00b9ef 55%, #0096c4 100%)"
          : "radial-gradient(circle at 30% 25%, #ffffff 0%, #eceef2 55%, #d9dde5 100%)",
    boxShadow:
      "inset -2px -3px 5px rgba(0,0,0,0.15), inset 1px 1px 3px rgba(255,255,255,0.25), 0 4px 8px rgba(1,50,153,0.20)",
  };

  if (!animated) {
    return (
      <span
        aria-label={`Winning number ${value}`}
        className={cn(
          "inline-flex items-center justify-center font-bold tnum rounded-full",
          sizeClasses[size],
          variantClasses[variant],
        )}
        style={ballStyle}
      >
        {value}
      </span>
    );
  }

  return (
    <motion.span
      aria-label={`Winning number ${value}`}
      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.32,
        delay: index * 0.08,
        ease: [0.2, 0, 0, 1],
      }}
      className={cn(
        "inline-flex items-center justify-center font-bold tnum rounded-full",
        sizeClasses[size],
        variantClasses[variant],
      )}
      style={ballStyle}
    >
      {value}
    </motion.span>
  );
}
