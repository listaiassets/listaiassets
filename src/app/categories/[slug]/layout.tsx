import type { Metadata } from "next";
import { CATEGORIES_DATA } from "@/lib/data/categories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES_DATA.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );

  const name = category ? category.name : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const description = category
    ? category.description
    : `Explore verified ${name} tools, performance benchmarks, and pricing telemetry on ListAIAssets.`;

  return {
    title: `${name} — Best AI Tools & Benchmarks (2026)`,
    description,
    alternates: {
      canonical: `./`,
    },
    openGraph: {
      title: `${name} — ListAIAssets Directory`,
      description,
      url: `/categories/${slug}`,
    },
  };
}

export default function CategoryDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

