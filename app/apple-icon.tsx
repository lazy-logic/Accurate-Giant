/**
 * Apple touch icon at 180×180. More room than the favicon, so the
 * monogram gets the brand's two-tone treatment: cyan A + white G on a
 * brand-primary navy ground.
 *
 * iOS uses this when a visitor adds the site to their home screen.
 */
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 30%, #1947b8 0%, #013299 60%, #001f5f 100%)",
          fontSize: 110,
          fontWeight: 900,
          letterSpacing: "-0.08em",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <span style={{ color: "#00B9EF" }}>A</span>
        <span style={{ color: "#ffffff" }}>G</span>
      </div>
    ),
    { ...size },
  );
}
