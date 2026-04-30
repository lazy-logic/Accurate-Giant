/**
 * Root layout. Wraps every route with the global Header and Footer.
 *
 * Fonts are loaded via next/font/google so they're self-hosted at build time
 * (no FOUT, no third-party request). The CSS variables --font-inter and
 * --font-fraunces are then consumed by the @theme block in globals.css.
 *
 * Default metadata uses the title template "%s · Accurate Giant" so per-page
 * titles read e.g. "Results · Accurate Giant". Override in any page by exporting
 * `metadata` with a `title` field.
 *
 * The flex column on <body> + flex-1 on <main> is what pins the footer to the
 * bottom of short pages.
 */
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransitions } from "@/components/layout/PageTransitions";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// Montserrat for display/headlines. Loaded across the bold-to-black range
// because the brand direction calls for big, confident headings.
const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Accurate Giant — Ghana's charity-led lotto",
    template: "%s · Accurate Giant",
  },
  description:
    "A Ghanaian charity, licensed by the National Lottery Authority to operate lotto in Accra. View results, find an agent, and learn how giving works.",
  metadataBase: new URL("https://accurategiant.example"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col bg-brand-paper text-brand-ink">
        <Header />
        <main className="flex-1">
          <PageTransitions>{children}</PageTransitions>
        </main>
        <Footer />
      </body>
    </html>
  );
}
