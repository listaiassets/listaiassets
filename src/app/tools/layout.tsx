import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Directory — Full Searchable Catalog & Benchmarks",
  description:
    "Filter and compare 10,000+ AI tools, coding agents, and foundation models with live latency telemetry, commercial licenses, and ratings on ListAIAssets.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "AI Tools Directory — ListAIAssets",
    description:
      "Filter and compare 10,000+ AI tools and agents with live latency telemetry and ratings on ListAIAssets.",
    url: "/tools",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

