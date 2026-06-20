import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import GsapProvider from "@/components/gsap/GsapProvider";
import GameCursor from "@/components/layout/GameCursor";
import CharacterCompanion from "@/components/layout/CharacterCompanion";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import { siteConfig } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sudhirgomase.dev"),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F4EE" },
    { media: "(prefers-color-scheme: dark)", color: "#050508" },
  ],
};

const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-canvas text-ink">
        <ThemeProvider>
          <GsapProvider>
            <SmoothScrollProvider>
              <div className="grain-overlay" aria-hidden="true" />
              <div className="premium-vignette pointer-events-none fixed inset-0 z-[9997]" aria-hidden />
              <GameCursor />
              <CharacterCompanion />
              <ScrollProgressBar />
              <Navbar />
              <main className="relative bg-canvas">{children}</main>
            </SmoothScrollProvider>
          </GsapProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
