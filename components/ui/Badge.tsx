/**
 * Inline status / metadata pill.
 *
 * Variants:
 *  - "default"   — neutral, used for schedule chips on game tiles
 *  - "primary"   — solid brand-primary on white text (for emphatic state)
 *  - "secondary" — tinted cyan background. Only safe because cyan sits as the
 *                  background here, not the text colour (see brand-tokens.md
 *                  §1: cyan fails AA on white for body text)
 *  - "muted"     — sunken grey, used for ticket-price metadata
 */
import { cn } from "@/lib/utils";

type BadgeProps = {
  variant?: "default" | "primary" | "secondary" | "muted";
  className?: string;
  children: React.ReactNode;
};

const variantClasses = {
  default: "bg-brand-paper-muted text-brand-ink border border-brand-border",
  primary: "bg-brand-primary text-white",
  secondary: "bg-[#00b9ef]/12 text-brand-primary border border-[#00b9ef]/40",
  muted: "bg-brand-paper-sunken text-brand-ink-muted",
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
