import type { Metadata } from "next";
import { DETAILED_TOOLS } from "@/lib/data/tools";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  const toolA = DETAILED_TOOLS.find((t) => t.slug === parts[0]);
  const toolB = DETAILED_TOOLS.find((t) => t.slug === parts[1]);

  const nameA = toolA ? toolA.name : parts[0] || "AI Tool A";
  const nameB = toolB ? toolB.name : parts[1] || "AI Tool B";

  const title = `${nameA} vs ${nameB} — Detailed Benchmark Comparison`;
  const description = `Compare ${nameA} and ${nameB} side-by-side: latency telemetry, reasoning accuracy, pricing tiers, and developer features on ListAIAssets.`;

  return {
    title,
    description,
    alternates: {
      canonical: `./`,
    },
    openGraph: {
      title,
      description,
      url: `/compare/${slug}`,
    },
  };
}

export default function CompareSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

