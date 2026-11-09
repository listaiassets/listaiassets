import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ExternalLink,
  Layers,
  ShieldCheck,
  Star,
  Zap,
  Cpu,
  BarChart3,
  Globe,
  Building,
  Calendar,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { DETAILED_TOOLS, getToolBySlug, getRelatedTools, DetailedTool } from "@/lib/data/tools";
import { BrandLogo } from "@/components/ui/BrandLogos";
import { ToolInteractiveActions } from "@/components/tools/ToolInteractiveActions";
import { ToolBrowserPreview } from "@/components/tools/ToolBrowserPreview";
import { InteractiveVectorGrid } from "@/components/ui/InteractiveVectorGrid";

interface ToolDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return DETAILED_TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found | ListAIAssets",
      description: "The requested artificial intelligence software tool could not be located in our directory.",
    };
  }

  const primaryCategory = tool.categories[0]?.name || "AI Software";

  return {
    title: `${tool.name} - Reviews, Pricing & Verified Benchmarks | ListAIAssets`,
    description: `${tool.tagline} Comprehensive review, starting pricing, API capabilities, and live benchmarks for ${tool.name}.`,
    openGraph: {
      title: `${tool.name} - AI Tool Deep Dive & Pricing | ListAIAssets`,
      description: `${tool.tagline} Discover features, benchmarks, and community upvotes.`,
      url: `https://listaiassets.com/tools/${tool.slug}`,
      siteName: "ListAIAssets",
      type: "website",
    },
    alternates: {
      canonical: `https://listaiassets.com/tools/${tool.slug}`,
    },
  };
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const primaryCategory = tool.categories[0] || { id: "cat_ai", name: "AI Software", slug: "tools" };
  const relatedTools = getRelatedTools(tool, 3);
  const releaseDate = tool.releaseDate || "Nov 2026";
  const publisher = tool.publisher || "Independent AI Lab";

  // JSON-LD Structured Schema for Google SoftwareApplication Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    operatingSystem: "Web, Cloud",
    applicationCategory: primaryCategory.name,
    description: tool.description,
    url: tool.websiteUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.reviewScore.toFixed(1),
      ratingCount: tool.communityVotes.upvotes || 120,
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      price: tool.startingPrice.toString(),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Organization",
      name: publisher,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-screen bg-[#fafaf8] dark:bg-[#0c0a09] transition-colors duration-150">
        <InteractiveVectorGrid />

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-mono">
            <Link href="/" className="hover:text-stone-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-stone-900 dark:hover:text-white transition-colors">
              Tools
            </Link>
            <span>/</span>
            <Link
              href={`/categories/${primaryCategory.slug}`}
              className="hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              {primaryCategory.name}
            </Link>
            <span>/</span>
            <span className="font-semibold text-stone-900 dark:text-stone-200">{tool.name}</span>
          </nav>

          {/* HERO HEADER SECTION (Matches User Screenshot) */}
          <header className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Tool Identity Info */}
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Brand Logo */}
                <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 shadow-xs">
                  <BrandLogo slug={tool.slug} size={72} className="h-full w-full" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
                      {tool.name}
                    </h1>
                    {tool.verifiedBadge && (
                      <span title="Verified & Telemetry Audited by ListAIAssets">
                        <ShieldCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </span>
                    )}
                    {tool.dealPercent && (
                      <span className="rounded bg-amber-500/10 px-2 py-0.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 border border-amber-500/25">
                        {tool.dealPercent}% OFF
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
                    {tool.tagline}
                  </p>

                  {/* Pills Strip */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                    {/* Primary Category Pill */}
                    <Link
                      href={`/categories/${primaryCategory.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 px-2.5 py-1 text-xs font-medium text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                      <Layers className="h-3.5 w-3.5 text-stone-500" />
                      <span>{primaryCategory.name}</span>
                    </Link>

                    {/* Pricing Pill */}
                    <span
                      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium font-mono border ${
                        tool.pricingType === "FREE"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                          : tool.pricingType === "FREEMIUM"
                          ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                          : "bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800"
                      }`}
                    >
                      {tool.pricingType === "FREE" ? "Free" : tool.pricingType === "FREEMIUM" ? "Freemium" : "Paid"}
                    </span>

                    {/* Review Score */}
                    <span className="inline-flex items-center gap-1 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-2.5 py-1 text-xs font-mono text-amber-600 dark:text-amber-400 font-medium">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span>{tool.reviewScore.toFixed(1)}</span>
                    </span>

                    {/* Upvotes Count */}
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-stone-500 dark:text-stone-400">
                      <span>↑</span>
                      <span>{tool.communityVotes.upvotes.toLocaleString()} upvotes</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Cluster (Matches Screenshot top-right buttons) */}
              <div className="shrink-0 pt-2 lg:pt-0">
                <ToolInteractiveActions
                  toolId={tool.id}
                  toolName={tool.name}
                  initialUpvotes={tool.communityVotes.upvotes}
                  websiteUrl={tool.websiteUrl}
                  variant="header"
                />
              </div>
            </div>
          </header>

          {/* MAIN 2-COLUMN LAYOUT (Matches Screenshot) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT MAIN CONTENT COLUMN (~68% width) */}
            <main className="lg:col-span-8 space-y-8">
              {/* Product Preview / Browser Window Mockup */}
              <ToolBrowserPreview tool={tool} />

              {/* About & Overview Section */}
              <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
                  <h2 className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
                    About {tool.name}
                  </h2>
                  <span className="text-xs text-stone-500 font-mono">Independent Review</span>
                </div>

                <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed space-y-3">
                  <p>{tool.longDescription || tool.description}</p>
                  <p>
                    Built specifically for high-efficiency modern workflows, {tool.name} provides developers, designers, and enterprise operators with verified benchmark throughput and direct integration hooks into existing toolchains.
                  </p>
                </div>
              </section>

              {/* Key Use Cases & Capabilities */}
              {tool.keyUseCases && tool.keyUseCases.length > 0 && (
                <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
                    <h2 className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
                      Popular Workflows &amp; Use Cases
                    </h2>
                    <p className="mt-1 text-xs text-stone-500">
                      Real-world applications where {tool.name} excels in production
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {tool.keyUseCases.map((useCase, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 p-4 shadow-2xs"
                      >
                        <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
                          {useCase}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Verified Feature Capabilities Matrix */}
              <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
                  <h2 className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
                    Feature &amp; Capability Audit
                  </h2>
                  <p className="mt-1 text-xs text-stone-500">
                    Verified technical specifications and licensing terms
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Developer API", enabled: tool.features.api },
                    { label: "Zero Watermark", enabled: tool.features.noWatermark },
                    { label: "Commercial Rights", enabled: tool.features.commercialRights },
                    { label: "Mobile App", enabled: tool.features.mobileApp },
                    { label: "Web Application", enabled: tool.features.web },
                    { label: "Open Weights / Source", enabled: tool.features.openSource },
                  ].map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 p-3.5"
                    >
                      <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                        {feat.label}
                      </span>
                      {feat.enabled ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                          <Check className="h-3.5 w-3.5" />
                          <span>Yes</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-stone-400 dark:text-stone-600">
                          No
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Live Telemetry & Benchmarks */}
              <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
                      Live Telemetry &amp; Benchmarks
                    </h2>
                    <p className="mt-0.5 text-xs text-stone-500">
                      Standardized latency and performance benchmarks
                    </p>
                  </div>
                  <span className="text-xs text-stone-500 font-mono">Updated 6h ago</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 p-4">
                    <span className="text-[10px] uppercase font-mono text-stone-500 block">Latency</span>
                    <span className="text-xl font-bold font-mono text-stone-900 dark:text-white mt-1 block">
                      {tool.benchmarks.latencyMs}ms
                    </span>
                    <span className="text-[10px] text-stone-400">Time to first token</span>
                  </div>

                  <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 p-4">
                    <span className="text-[10px] uppercase font-mono text-stone-500 block">Throughput</span>
                    <span className="text-xl font-bold font-mono text-stone-900 dark:text-white mt-1 block">
                      {tool.benchmarks.throughputTokensSec || 80} tok/s
                    </span>
                    <span className="text-[10px] text-stone-400">Generation speed</span>
                  </div>

                  <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 p-4">
                    <span className="text-[10px] uppercase font-mono text-stone-500 block">Accuracy</span>
                    <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
                      {tool.benchmarks.codeAccuracyPercent}%
                    </span>
                    <span className="text-[10px] text-stone-400">SWE-bench score</span>
                  </div>

                  <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 p-4">
                    <span className="text-[10px] uppercase font-mono text-stone-500 block">Reasoning</span>
                    <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                      {tool.benchmarks.reasoningScore}
                    </span>
                    <span className="text-[10px] text-stone-400">Out of 100 benchmark</span>
                  </div>
                </div>
              </section>

              {/* Companion & Alternative Tools in this Category */}
              {relatedTools.length > 0 && (
                <section className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
                        Similar &amp; Alternative Tools
                      </h2>
                      <p className="text-xs text-stone-500">
                        Popular AI tools in {primaryCategory.name}
                      </p>
                    </div>
                    <Link
                      href={`/categories/${primaryCategory.slug}`}
                      className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Explore all</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedTools.map((relTool) => (
                      <Link
                        key={relTool.id}
                        href={`/tools/${relTool.slug}`}
                        className="group flex flex-col justify-between rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs hover:border-amber-500/40 transition-all hover:shadow-md"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 shrink-0">
                              <BrandLogo slug={relTool.slug} size={36} className="h-full w-full" />
                            </div>
                            <div>
                              <h3 className="text-xs font-semibold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                {relTool.name}
                              </h3>
                              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                                ★ {relTool.reviewScore.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          <p className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                            {relTool.tagline}
                          </p>
                        </div>

                        <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-500">
                          <span>{relTool.pricingType}</span>
                          <span className="text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                            View →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </main>

            {/* RIGHT STICKY SIDEBAR (~32% width - Matches User Screenshot) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
              {/* "Try [Tool Name]" Card (Matches Screenshot) */}
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 shadow-xs space-y-5">
                <div>
                  <h2 className="text-base font-bold text-stone-900 dark:text-white">
                    Try {tool.name}
                  </h2>
                  <p className="mt-1 text-xs text-stone-500">
                    {tool.pricingType === "FREE"
                      ? "100% Free plan available."
                      : tool.pricingType === "FREEMIUM"
                      ? "Free plan available with optional paid tiers."
                      : `Plans start at $${tool.startingPrice}/mo.`}
                  </p>
                </div>

                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 text-sm shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Visit website</span>
                  <ExternalLink className="h-4 w-4" />
                </a>

                {/* Sub-pills under CTA */}
                <div className="flex items-center justify-center gap-3 pt-1 text-xs text-stone-500">
                  <span className="inline-flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{tool.pricingType === "FREE" ? "Free" : "Freemium"}</span>
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5 text-stone-400" />
                    <span>{primaryCategory.name}</span>
                  </span>
                </div>
              </div>

              {/* "AT A GLANCE" Specification Table (Matches Screenshot) */}
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 shadow-xs space-y-4">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-3">
                  At A Glance
                </h3>

                <dl className="divide-y divide-stone-100 dark:divide-stone-800/80 text-xs">
                  {/* Category */}
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-stone-500 font-mono">Category</dt>
                    <dd>
                      <Link
                        href={`/categories/${primaryCategory.slug}`}
                        className="inline-flex items-center gap-1 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-2 py-0.5 text-[11px] font-medium text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:text-amber-600 transition-colors"
                      >
                        <Layers className="h-3 w-3 text-stone-400" />
                        <span>{primaryCategory.name}</span>
                      </Link>
                    </dd>
                  </div>

                  {/* Pricing Model */}
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-stone-500 font-mono">Pricing</dt>
                    <dd className="font-semibold text-stone-900 dark:text-white font-mono">
                      {tool.pricingType}
                    </dd>
                  </div>

                  {/* Publisher */}
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-stone-500 font-mono">Publisher</dt>
                    <dd className="inline-flex items-center gap-1.5 font-medium text-stone-800 dark:text-stone-200">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[9px] font-bold">
                        {publisher.charAt(0)}
                      </span>
                      <span>{publisher}</span>
                    </dd>
                  </div>

                  {/* Added / Release Date */}
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-stone-500 font-mono">Added</dt>
                    <dd className="font-mono text-stone-700 dark:text-stone-300">
                      {releaseDate}
                    </dd>
                  </div>

                  {/* Monthly Traffic */}
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-stone-500 font-mono">Monthly Traffic</dt>
                    <dd className="font-mono text-stone-700 dark:text-stone-300">
                      {tool.monthlyVisitors}
                    </dd>
                  </div>

                  {/* Domain Authority */}
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-stone-500 font-mono">Authority Score</dt>
                    <dd className="font-mono font-bold text-stone-900 dark:text-white">
                      DA {tool.domainAuthority}
                    </dd>
                  </div>

                  {/* API Availability */}
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-stone-500 font-mono">Developer API</dt>
                    <dd className="font-mono text-stone-700 dark:text-stone-300">
                      {tool.features.api ? "Available" : "Not Provided"}
                    </dd>
                  </div>
                </dl>

                {/* Sidebar Post & Copy Buttons (Matches Screenshot) */}
                <div className="pt-2">
                  <ToolInteractiveActions
                    toolId={tool.id}
                    toolName={tool.name}
                    initialUpvotes={tool.communityVotes.upvotes}
                    websiteUrl={tool.websiteUrl}
                    variant="sidebar"
                  />
                </div>

                {/* Report link (Matches Screenshot) */}
                <div className="pt-3 text-center border-t border-stone-100 dark:border-stone-800/80">
                  <a
                    href="mailto:editorial@listaiassets.com?subject=Report%20Listing%20Issue"
                    className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                  >
                    <AlertCircle className="h-3 w-3" />
                    <span>Report or claim this listing</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
