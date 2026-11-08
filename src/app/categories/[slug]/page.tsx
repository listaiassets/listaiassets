"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Star,
  Zap,
  SlidersHorizontal,
  Layers,
  ChevronDown,
  CheckCircle2,
  GitCompare,
} from "lucide-react";
import { CATEGORIES_DATA, CATEGORY_ICON_MAP } from "@/lib/data/categories";
import { DETAILED_TOOLS, DetailedTool } from "@/lib/data/tools";
import { ToolCard, ToolCardData } from "@/components/tool-card";
import { BrandLogo } from "@/components/ui/BrandLogos";
import { CategoryDeepDiveJsonLd } from "@/components/seo/JsonLd";
import { InteractiveVectorGrid } from "@/components/ui/InteractiveVectorGrid";
import { Badge } from "@/components/badge";

export default function CategoryDetailPage() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || "coding";

  // Find category metadata
  const category = useMemo(() => {
    return (
      CATEGORIES_DATA.find((c) => c.slug.toLowerCase() === rawSlug.toLowerCase()) || {
        id: `cat_${rawSlug}`,
        slug: rawSlug,
        name: rawSlug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        tagline: "Specialized tools and enterprise models for this workflow",
        description: `Explore verified tools, performance benchmarks, and pricing matrices for ${rawSlug}.`,
        iconName: "Layers",
        toolCount: 24,
        featuredToolSlugs: ["cursor", "claude-3-7-sonnet"],
        color: {
          bg: "bg-amber-500/10",
          text: "text-amber-700",
          border: "border-amber-500/20",
          darkBg: "dark:bg-amber-500/15",
          darkText: "dark:text-amber-400",
        },
        metrics: {
          avgStartingPrice: "$20/mo",
          freeTierPercent: 50,
          topRatedScore: 4.9,
        },
        tags: ["Productivity", "Enterprise", "AI"],
        popularUseCases: ["Automation", "Synthesis", "Acceleration"],
      }
    );
  }, [rawSlug]);

  // Find tools matching this category
  const matchingTools = useMemo(() => {
    const s = rawSlug.toLowerCase();
    const filtered = DETAILED_TOOLS.filter((tool) => {
      const matchCat = tool.categories.some(
        (c) =>
          c.slug.toLowerCase() === s ||
          c.id.toLowerCase().includes(s) ||
          c.name.toLowerCase().includes(s)
      );
      const matchTag = tool.tags.some((t) => t.toLowerCase().includes(s));
      return matchCat || matchTag;
    });

    // If fewer than 2 tools match directly, include other top tools as related
    if (filtered.length < 2) {
      const remaining = DETAILED_TOOLS.filter((t) => !filtered.some((f) => f.id === t.id));
      return [...filtered, ...remaining.slice(0, 4)];
    }
    return filtered;
  }, [rawSlug]);

  // Filter and Sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [pricingFilter, setPricingFilter] = useState<string>("ALL");
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "latency" | "traffic">("rating");

  // Filtered and sorted tools
  const visibleTools = useMemo(() => {
    return matchingTools
      .filter((tool) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            tool.name.toLowerCase().includes(q) ||
            tool.tagline.toLowerCase().includes(q) ||
            tool.description.toLowerCase().includes(q) ||
            tool.tags.some((t) => t.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // Pricing filter
        if (pricingFilter !== "ALL") {
          if (pricingFilter === "FREE" && tool.pricingType !== "FREE") return false;
          if (pricingFilter === "FREEMIUM" && tool.pricingType !== "FREEMIUM") return false;
          if (pricingFilter === "PAID" && tool.pricingType !== "PAID") return false;
        }

        // Feature filter
        if (activeFeature === "api" && !tool.features.api) return false;
        if (activeFeature === "commercial" && !tool.features.commercialRights) return false;
        if (activeFeature === "noWatermark" && !tool.features.noWatermark) return false;
        if (activeFeature === "openSource" && !tool.features.openSource) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.reviewScore - a.reviewScore;
        if (sortBy === "latency") return a.benchmarks.latencyMs - b.benchmarks.latencyMs;
        if (sortBy === "traffic") return b.monthlyVisitorsNumber - a.monthlyVisitorsNumber;
        return 0;
      });
  }, [matchingTools, searchQuery, pricingFilter, activeFeature, sortBy]);

  // Related categories
  const relatedCategories = useMemo(() => {
    return CATEGORIES_DATA.filter((c) => c.slug.toLowerCase() !== rawSlug.toLowerCase()).slice(0, 4);
  }, [rawSlug]);

  const IconComponent = CATEGORY_ICON_MAP[category.iconName] || Layers;

  return (
    <div className="relative min-h-screen transition-colors duration-150">
      {/* Interactive Background Matrix */}
      <InteractiveVectorGrid />

      {/* Category Deep-Dive Schema (CollectionPage + BreadcrumbList) */}
      <CategoryDeepDiveJsonLd category={category} tools={visibleTools} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-mono">
          <Link
            href="/"
            className="hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/categories"
            className="hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            Categories
          </Link>
          <span>/</span>
          <span className="font-semibold text-stone-900 dark:text-stone-200">
            {category.name}
          </span>
        </nav>

        {/* Category Header Hero */}
        <header className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 shadow-2xs">
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      Category Registry
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">Live Benchmarks</span>
                  </div>
                  <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
                    {category.name}
                  </h1>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {category.description}
              </p>

              {/* Telemetry Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-2.5 py-1 text-[11px] font-mono text-stone-700 dark:text-stone-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {matchingTools.length} tools verified
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-2.5 py-1 text-[11px] font-mono text-stone-700 dark:text-stone-300">
                  Avg: {category.metrics.avgStartingPrice}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-2.5 py-1 text-[11px] font-mono text-amber-600 dark:text-amber-400">
                  ★ {category.metrics.topRatedScore}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-2.5 py-1 text-[11px] font-mono text-stone-700 dark:text-stone-300">
                  {category.metrics.freeTierPercent}% free tier
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 hover:bg-amber-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer"
              >
                Submit Tool in {category.name}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/compare/cursor-vs-claude-3-7-sonnet"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] hover:bg-stone-100 dark:hover:bg-stone-800 px-4 py-2.5 text-xs font-medium text-stone-800 dark:text-stone-200 transition-colors"
              >
                <GitCompare className="h-3.5 w-3.5" />
                Head-to-Head Comparison
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors pt-1"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to all categories
              </Link>
            </div>
          </div>
        </header>

        {/* Filter and Controls Toolbar */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search within ${category.name}...`}
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 pl-10 pr-4 py-2 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            {/* Pricing Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {["ALL", "FREE", "FREEMIUM", "PAID"].map((type) => (
                <button
                  key={type}
                  onClick={() => setPricingFilter(type)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    pricingFilter === type
                      ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs"
                      : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                >
                  {type === "ALL" ? "All Pricing" : type}
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3 py-1.5 text-xs text-stone-800 dark:text-stone-200 focus:outline-none cursor-pointer"
              >
                <option value="rating">Highest Rated</option>
                <option value="latency">Lowest Latency</option>
                <option value="traffic">Most Monthly Users</option>
              </select>
            </div>
          </div>

          {/* Quick Feature Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-500 dark:text-stone-400 font-medium text-[11px] uppercase tracking-wider">
              Quick Filter:
            </span>
            {[
              { id: "api", label: "API Available" },
              { id: "commercial", label: "Commercial Rights" },
              { id: "noWatermark", label: "No Watermark" },
              { id: "openSource", label: "Open Weights / Source" },
            ].map((f) => {
              const active = activeFeature === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFeature(active ? null : f.id)}
                  className={`rounded-md border px-2.5 py-1 transition-colors cursor-pointer ${
                    active
                      ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium"
                      : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 hover:border-amber-500/40"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
            {activeFeature && (
              <button
                onClick={() => setActiveFeature(null)}
                className="text-[11px] text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </section>

        {/* Tools Listings Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>
              Showing <strong className="text-stone-900 dark:text-white">{visibleTools.length}</strong>{" "}
              vetted {category.name.toLowerCase()}
            </span>
            <span className="font-mono text-[11px]">Updated 6h ago</span>
          </div>

          {visibleTools.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-8 space-y-3">
              <p className="text-sm text-stone-600 dark:text-stone-400">
                No tools in this category match your current filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setPricingFilter("ALL");
                  setActiveFeature(null);
                }}
                className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-amber-500 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleTools.map((tool) => {
                const cardData: ToolCardData = {
                  id: tool.id,
                  name: tool.name,
                  slug: tool.slug,
                  tagline: tool.tagline,
                  description: tool.description,
                  websiteUrl: tool.websiteUrl,
                  pricingType: tool.pricingType,
                  startingPrice: tool.startingPrice,
                  categories: tool.categories,
                  tags: tool.tags,
                  verifiedBadge: tool.verifiedBadge,
                  domainAuthority: tool.domainAuthority,
                  reviewScore: tool.reviewScore,
                  dealPercent: tool.dealPercent,
                };
                return <ToolCard key={tool.id} tool={cardData} />;
              })}
            </div>
          )}
        </section>

        {/* Popular Use Cases Pill Strip */}
        {category.popularUseCases && category.popularUseCases.length > 0 && (
          <section className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 p-6 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Popular Use Cases for {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.popularUseCases.map((useCase, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3 py-1.5 text-xs font-medium text-stone-800 dark:text-stone-200 shadow-2xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" />
                  <span>{useCase}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Categories */}
        <section className="space-y-4 pt-6 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                Explore Related Categories
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Continue browsing companion workflows and developer tools
              </p>
            </div>
            <Link
              href="/categories"
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              All Categories <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedCategories.map((relCat) => {
              const RelIcon = CATEGORY_ICON_MAP[relCat.iconName] || Layers;
              return (
                <Link
                  key={relCat.id}
                  href={`/categories/${relCat.slug}`}
                  className="group rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs hover:border-amber-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800`}
                    >
                      <RelIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {relCat.name}
                      </h3>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400">
                        {relCat.toolCount} tools
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Bottom Vendor Callout */}
        <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-gradient-to-r from-amber-50/40 via-white to-stone-50 dark:from-stone-900/80 dark:via-[#1c1917] dark:to-stone-900/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
              Building in {category.name}?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Join leading AI companies listed on ListAIAssets. Get benchmarked, verified, and discovered by over 100,000 monthly software engineers.
            </p>
          </div>
          <Link
            href="/submit"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-amber-600 hover:bg-amber-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer"
          >
            Submit an AI Tool
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
