import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationAndWebsiteJsonLd } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://listaiassets.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ListAIAssets — Frontier AI Tools, Models & Assets Directory",
    template: "%s | ListAIAssets",
  },
  description:
    "Authoritative AI assets directory and telemetry engine. Discover, compare, and benchmark verified foundation models, autonomous coding agents, and generative workflows on ListAIAssets.",
  keywords: [
    "ListAIAssets",
    "List AI Assets",
    "listaiassets.com",
    "AI Assets Directory",
    "AI Tools Directory",
    "Best AI Tools 2026",
    "Coding Agents",
    "Reasoning LLMs",
    "Generative Art",
    "AI Video Generators",
    "AI Benchmarks",
    "LLM Latency Telemetry",
  ],
  authors: [{ name: "ListAIAssets Editorial & Engineering Team", url: SITE_URL }],
  creator: "ListAIAssets",
  publisher: "ListAIAssets",
  applicationName: "ListAIAssets Directory",
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "512x512", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "ListAIAssets — Frontier AI Tools, Models & Assets Directory",
    description:
      "Explore 10,000+ hand-vetted AI tools and assets with empirical latency benchmarks, token economics, and authentic community ratings on ListAIAssets.",
    url: SITE_URL,
    siteName: "ListAIAssets",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/api/og?title=ListAIAssets%20Directory&badge=AI%20ASSETS%20INDEX",
        width: 1200,
        height: 630,
        alt: "ListAIAssets Social Preview & Directory Index",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ListAIAssets — Frontier AI Tools & Assets Directory",
    description:
      "Verified latency benchmarks, autonomous coding agents, and live head-to-head comparison matrix on ListAIAssets.",
    images: ["/api/og?title=ListAIAssets%20Directory&badge=AI%20ASSETS%20INDEX"],
    site: "@ListAIAssets",
    creator: "@ListAIAssets",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-listaiassets",
    yandex: "yandex-verification-token",
    other: {
      "msvalidate.01": "bing-site-verification-token",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Machine-readable AI Agent discovery link (AEO / GEO standard) */}
        <link rel="author" href="/llms.txt" type="text/plain" title="LLMs.txt" />
        <OrganizationAndWebsiteJsonLd />
        {/* Zero-latency Netlify badge & drawer suppression script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var netlifySelectors = [
                  '#nl-badge-frame',
                  'iframe#nl-badge-frame',
                  'iframe[title*="Powered by Netlify" i]',
                  'iframe[title*="Netlify" i]',
                  'iframe[src*="netlify" i]',
                  'netlify-drawer',
                  '#netlify-drawer',
                  '.netlify-badge',
                  '[data-netlify-deploy-preview]',
                  'div[class*="netlify-badge"]'
                ];
                function purgeNetlifyBadges() {
                  try {
                    netlifySelectors.forEach(function(sel) {
                      var nodes = document.querySelectorAll(sel);
                      for (var i = 0; i < nodes.length; i++) {
                        var node = nodes[i];
                        node.style.setProperty('display', 'none', 'important');
                        node.style.setProperty('visibility', 'hidden', 'important');
                        node.style.setProperty('opacity', '0', 'important');
                        if (node.parentNode) {
                          node.parentNode.removeChild(node);
                        }
                      }
                    });
                  } catch (e) {}
                }
                if (typeof document !== 'undefined') {
                  purgeNetlifyBadges();
                  if (typeof MutationObserver !== 'undefined' && document.documentElement) {
                    var obs = new MutationObserver(purgeNetlifyBadges);
                    obs.observe(document.documentElement, { childList: true, subtree: true });
                  }
                  window.addEventListener('DOMContentLoaded', purgeNetlifyBadges);
                  window.addEventListener('load', purgeNetlifyBadges);
                }
              })();
            `,
          }}
        />
        {/* Google Analytics 4 (GA4) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="relative flex min-h-screen flex-col bg-[#fafaf8] text-stone-900 dark:bg-[#0c0a09] dark:text-[#fafaf8] font-sans selection:bg-amber-500/20 selection:text-amber-800 dark:selection:text-amber-300 transition-colors duration-150">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Subtle monochrome ambient light */}
          <div className="fixed inset-0 bg-gradient-to-tr from-black/[0.01] via-transparent to-black/[0.01] dark:from-white/[0.02] dark:to-white/[0.02] pointer-events-none z-0" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
