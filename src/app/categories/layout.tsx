import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tool Categories & Taxonomy — Browse 18+ Verticals",
  description:
    "Explore 18+ hand-tested categories of AI software, foundation models, coding agents, and generative design tools with empirical benchmarks on ListAIAssets.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "AI Tool Categories — ListAIAssets Directory",
    description:
      "Explore 18+ hand-tested categories of AI software with empirical benchmarks, latency telemetry, and pricing tiers on ListAIAssets.",
    url: "/categories",
  },
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

