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
import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransitions } from "@/components/layout/PageTransitions";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
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
    default: "Accurate Giant Company Ltd. — NLA-licensed lotto in Ghana",
    template: "%s · Accurate Giant",
  },
  description:
    "NLA-registered private lotto operator in Ghana. NLA-licensed draws across the week. Results, games, and our agent network. Operating under the National Lotto Act 2006 (Act 722).",
  metadataBase: new URL("https://accurategiant.com"),
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: "Accurate Giant Company Ltd.",
  },
  robots: { index: true, follow: true },
  // Favicons live under /public/favicon/. The .ico + apple-icon.png at
  // app/ root are auto-emitted by Next; the entries below add the rest of
  // the size set + the Android web-app manifest. See public/favicon/ for
  // the source set.
  manifest: "/favicon/manifest.json",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/favicon/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/favicon/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/favicon/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/favicon/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/favicon/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/favicon/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/favicon/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/favicon/apple-icon-180x180.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "msapplication-TileImage",
        url: "/favicon/ms-icon-144x144.png",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#013299",
    "msapplication-config": "/favicon/browserconfig.xml",
  },
};

// Viewport for proper mobile scaling across the responsive layouts.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#013299",
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
        <ScrollToTop />
      </body>
    </html>
  );
}
