/**
 * PhoneFrame wraps a screenshot in a hyperrealistic generic-smartphone bezel.
 *
 * Used on the homepage Hero and the /games hero to showcase the Accurate
 * Giant mobile app. Rendered entirely from CSS — no SVG, no chrome image.
 *
 * Layer composition (back to front):
 *   1. Outer halo glow that lifts the whole device off the page
 *   2. Multi-layer drop shadow (close + ambient) for grounded depth
 *   3. Outer chassis ring with a brushed-metal gradient
 *   4. Recessed inner screen bezel (true-black border around the display)
 *   5. The screenshot itself, edge-to-edge inside the bezel
 *   6. Tiny inset highlight along the screen's top edge (phosphor catch)
 *   7. Diagonal screen glare across the upper portion
 *   8. Pill-shaped sensor island at the top with a camera dot + sensor pip
 *   9. Side buttons (volume + power) with subtle depth shadows
 *
 * No specific manufacturer's design language is reproduced — this is a
 * generic premium-smartphone look that works for marketing imagery.
 */
import Image from "next/image";
import { cn } from "@/lib/utils";

type PhoneFrameProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  tilt?: number;
  priority?: boolean;
};

export function PhoneFrame({
  src,
  alt,
  width = 300,
  height = 620,
  className,
  tilt = 0,
  priority = false,
}: PhoneFrameProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{
        width,
        height,
        transform: tilt ? `rotate(${tilt}deg)` : undefined,
        // Toned-down drop shadow — was three layers (close + ambient + cyan
        // glow) which looked heavy when stacked behind the hero orbs. Now a
        // tighter two-layer shadow for grounded depth without the haze.
        filter: [
          "drop-shadow(0 2px 4px rgba(20,30,60,0.16))",
          "drop-shadow(0 14px 24px rgba(20,30,60,0.18))",
        ].join(" "),
      }}
    >
      {/* Outer halo behind the device — softened from /12 + blur-3xl */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-brand-primary/5 blur-2xl pointer-events-none"
      />

      {/* Side buttons — left side: volume up + volume down */}
      <span
        aria-hidden
        className="absolute -left-[2px] top-[20%] w-[3px] h-[58px] rounded-l-md"
        style={{
          background:
            "linear-gradient(to right, #0c1018 0%, #1c2230 40%, #0a0d14 100%)",
          boxShadow: "inset 1px 0 0 rgba(255,255,255,0.08), -1px 0 1px rgba(0,0,0,0.4)",
        }}
      />
      <span
        aria-hidden
        className="absolute -left-[2px] top-[31%] w-[3px] h-[58px] rounded-l-md"
        style={{
          background:
            "linear-gradient(to right, #0c1018 0%, #1c2230 40%, #0a0d14 100%)",
          boxShadow: "inset 1px 0 0 rgba(255,255,255,0.08), -1px 0 1px rgba(0,0,0,0.4)",
        }}
      />
      {/* Right side: power button */}
      <span
        aria-hidden
        className="absolute -right-[2px] top-[26%] w-[3px] h-[80px] rounded-r-md"
        style={{
          background:
            "linear-gradient(to left, #0c1018 0%, #1c2230 40%, #0a0d14 100%)",
          boxShadow: "inset -1px 0 0 rgba(255,255,255,0.08), 1px 0 1px rgba(0,0,0,0.4)",
        }}
      />

      {/* Outer chassis — brushed metal gradient with rounded corners */}
      <div
        className="absolute inset-0 rounded-[2.6rem]"
        style={{
          background: [
            // Top-left rim highlight
            "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 18%)",
            // Bottom-right rim shadow
            "linear-gradient(315deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 18%)",
            // Base brushed-metal gradient
            "linear-gradient(150deg, #2c3140 0%, #161a23 35%, #0e1118 50%, #161a23 65%, #2c3140 100%)",
          ].join(", "),
          boxShadow: [
            "inset 0 0 0 1px rgba(255,255,255,0.08)",
            "inset 0 1px 0 rgba(255,255,255,0.10)",
            "inset 0 -1px 0 rgba(0,0,0,0.60)",
          ].join(", "),
        }}
      />

      {/* Inner true-black screen bezel — gives the recessed-display look */}
      <div className="absolute inset-[5px] rounded-[2.4rem] bg-black" />

      {/* Screen itself — recessed inside the bezel */}
      <div className="absolute inset-[8px] rounded-[2.2rem] overflow-hidden bg-black">
        <Image
          src={src}
          alt={alt}
          width={width * 2}
          height={height * 2}
          priority={priority}
          className="w-full h-full object-cover object-top"
        />

        {/* Phosphor highlight along the very top edge of the screen */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />

        {/* Diagonal screen glare across the upper portion */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background:
              "linear-gradient(118deg, transparent 30%, rgba(255,255,255,0.30) 50%, transparent 60%)",
          }}
        />
      </div>

      {/*
       * Sensor island at the top of the screen: pill-shaped with a thin
       * outer ring (depth illusion), a tiny camera lens, and a sensor pip.
       */}
      <div
        aria-hidden
        className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30 flex items-center justify-end gap-[3px] px-2"
        style={{
          width: "30%",
          height: "22px",
          borderRadius: "9999px",
          background:
            "linear-gradient(to bottom, #050608 0%, #0a0d12 50%, #050608 100%)",
          boxShadow: [
            "inset 0 0 0 0.5px rgba(255,255,255,0.10)",
            "inset 0 1px 1px rgba(0,0,0,0.7)",
            "0 1px 0 rgba(255,255,255,0.06)",
          ].join(", "),
        }}
      >
        {/* Tiny sensor pip (proximity / ambient light) */}
        <span
          aria-hidden
          className="block w-1 h-1 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(0,185,239,0.5), rgba(0,185,239,0.15) 70%, transparent)",
          }}
        />
        {/* Camera lens with rim catch */}
        <span
          aria-hidden
          className="block w-2 h-2 rounded-full relative"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5) 0%, rgba(20,30,60,0.6) 35%, #000 70%)",
            boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.18)",
          }}
        />
      </div>
    </div>
  );
}
