import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Head-to-Head Comparison Matrix — Compare AI Tools & Models",
  description:
    "Direct empirical comparison of latency, code accuracy benchmarks, token throughput, and pricing for frontier AI models and tools on ListAIAssets.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "AI Tools Comparison Matrix — ListAIAssets",
    description: "Compare frontier AI models and software tools head-to-head on ListAIAssets.",
    url: "/compare/cursor-vs-claude-3-7-sonnet",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

