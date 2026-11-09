"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  ChevronDown,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { CATEGORIES_DATA, CATEGORIES_PAGE_FAQS, CATEGORY_ICON_MAP } from "@/lib/data/categories";
import { DETAILED_TOOLS } from "@/lib/data/tools";
import { Badge } from "@/components/badge";
import { BrandLogo } from "@/components/ui/BrandLogos";
import { InteractiveVectorGrid } from "@/components/ui/InteractiveVectorGrid";
import { CategoriesHubJsonLd } from "@/components/seo/JsonLd";
import { Pagination } from "@/components/ui/Pagination";

const CATEGORIES_PER_PAGE = 9;

function CategoriesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedTag, setSelectedTag] = useState<string>(searchParams.get("tag") || "ALL");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const rawPage = searchParams.get("page");
  const parsedPage = rawPage ? parseInt(rawPage, 10) : 1;
  const [currentPage, setCurrentPage] = useState<number>(
    isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage
  );

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTag("ALL");
    setCurrentPage(1);
  };

  // Synchronize filter and pagination states with URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedTag !== "ALL") params.set("tag", selectedTag);
    if (currentPage > 1) params.set("page", currentPage.toString());

    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(targetUrl, { scroll: false });
  }, [searchQuery, selectedTag, currentPage, pathname, router]);

  // Extract all unique tags across categories for quick filtering
  const allTags = useMemo(() => {
    const set = new Set<string>();
    CATEGORIES_DATA.forEach((cat) => cat.tags.forEach((t) => set.add(t)));
    return Array.from(set).slice(0, 8);
  }, []);

  // Filter categories by search query and tag
  const filteredCategories = useMemo(() => {
    return CATEGORIES_DATA.filter((cat) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cat.name.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q) ||
        cat.tagline.toLowerCase().includes(q) ||
        cat.tags.some((t) => t.toLowerCase().includes(q));

      const matchesTag =
        selectedTag === "ALL" || cat.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  // Paginated categories calculation
  const totalFilteredCategories = filteredCategories.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredCategories / CATEGORIES_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * CATEGORIES_PER_PAGE;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + CATEGORIES_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("categories-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen transition-colors duration-150">
      {/* Background Interactive Subtle Vector Network Grid */}
      <InteractiveVectorGrid />

      {/* Structured Schema Markup for SEO / AEO / GEO */}
      <CategoriesHubJsonLd categories={CATEGORIES_DATA} faqs={CATEGORIES_PAGE_FAQS} />

      {/* HERO SECTION - Modern Warm Amber Brand System */}
      <section className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3.5 py-1 text-xs text-stone-700 dark:text-stone-300 shadow-xs"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-medium">Directory Taxonomy</span>
            <span className="text-stone-400 dark:text-stone-600">•</span>
            <span className="text-stone-500 dark:text-stone-400">18 Production Verticals</span>
          </motion.div>

          {/* Crisp Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-6 text-3xl font-semibold tracking-tight text-stone-900 dark:text-white sm:text-5xl"
          >
            AI Tool Categories &amp; Workflow Taxonomy
          </motion.h1>

          {/* Muted Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed"
          >
            Discover, benchmark, and deploy frontier models across 18 specialized verticals with verified latency, context window telemetry, and commercial licensing.
          </motion.p>

          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            className="mx-auto mt-8 max-w-xl"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search verticals (e.g. coding agents, reasoning, video, search)..."
                className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:border-amber-500/60 focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={handleResetFilters}
                  className="absolute right-3 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Tag Pills */}
            <div className="flex items-center justify-center gap-1.5 overflow-x-auto pt-3 pb-1">
              <button
                onClick={() => handleTagChange("ALL")}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedTag === "ALL"
                    ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(selectedTag === tag ? "ALL" : tag)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    selectedTag.toLowerCase() === tag.toLowerCase()
                      ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs"
                      : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* CATEGORIES GRID */}
        <section id="categories-grid" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Vertical Taxonomy
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">18 Production Hubs</span>
              </div>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-stone-900 dark:text-white">
                All Specialized Categories
              </h2>
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
              Showing{" "}
              <span className="font-bold text-stone-900 dark:text-white">
                {totalFilteredCategories === 0
                  ? 0
                  : totalFilteredCategories <= CATEGORIES_PER_PAGE
                  ? totalFilteredCategories
                  : `${startIndex + 1}–${Math.min(startIndex + CATEGORIES_PER_PAGE, totalFilteredCategories)}`}
              </span>{" "}
              of <span className="font-bold text-stone-900 dark:text-white">{totalFilteredCategories}</span> categories
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="rounded-xl border border-dashed border-stone-300 dark:border-stone-800 p-12 text-center space-y-3">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                No categories match your search &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={handleResetFilters}
                className="rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 cursor-pointer shadow-sm"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedCategories.map((cat) => {
                const IconComponent = CATEGORY_ICON_MAP[cat.iconName] || Layers;
                // Find top matching tools in this category for micro logos preview
                const topTools = DETAILED_TOOLS.filter((t) =>
                  t.categories.some((c) => c.slug === cat.slug || c.id.includes(cat.slug))
                ).slice(0, 3);

                return (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="group relative flex flex-col justify-between rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 shadow-xs transition-all duration-150 hover:border-amber-500/40 hover:shadow-md"
                  >
                    <div>
                      {/* Card Header: Icon, Name, Tool Count Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 shadow-2xs group-hover:scale-105 transition-transform">
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold tracking-tight text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                              <span>{cat.name}</span>
                              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-mono text-stone-500">
                                {cat.toolCount} verified tools
                              </span>
                            </div>
                          </div>
                        </div>

                        <span className="rounded bg-stone-100 dark:bg-stone-900 px-1.5 py-0.5 text-[10px] font-mono text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 shrink-0">
                          {cat.metrics.avgStartingPrice}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>

                      {/* Top Tools Micro-Logos Strip */}
                      {topTools.length > 0 && (
                        <div className="mt-4 flex items-center gap-1.5 pt-3 border-t border-stone-100 dark:border-stone-800/60">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mr-1">
                            Top:
                          </span>
                          <div className="flex items-center -space-x-1.5">
                            {topTools.map((t) => (
                              <div
                                key={t.id}
                                title={t.name}
                                className="h-5 w-5 rounded-md overflow-hidden border border-white dark:border-stone-900 shadow-2xs bg-stone-50 dark:bg-stone-800"
                              >
                                <BrandLogo slug={t.slug} size={20} className="h-full w-full" />
                              </div>
                            ))}
                          </div>
                          <span className="text-[10px] text-stone-500 truncate ml-1">
                            {topTools.map((t) => t.name).join(", ")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Meta & Rating */}
                    <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-stone-400">
                      <span className="text-amber-600 dark:text-amber-400 font-medium">
                        ★ {cat.metrics.topRatedScore} Score
                      </span>
                      <span>{cat.metrics.freeTierPercent}% Free Tier</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={totalFilteredCategories}
              itemName="categories"
              onPageChange={handlePageChange}
            />
          )}
        </section>

        {/* METRICS STRIP - Clean ListAIAssets Bento Grid Style */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 text-left transition-colors hover:border-amber-500/30 shadow-xs">
            <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">4,200+</div>
            <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">Tools Indexed</div>
          </div>
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 text-left transition-colors hover:border-amber-500/30 shadow-xs">
            <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">18</div>
            <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">Production Categories</div>
          </div>
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 text-left transition-colors hover:border-amber-500/30 shadow-xs">
            <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">100K+</div>
            <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">Monthly Engineers</div>
          </div>
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 text-left transition-colors hover:border-amber-500/30 shadow-xs">
            <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">6h</div>
            <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">Telemetry Cadence</div>
          </div>
        </section>

        {/* METHODOLOGY & TAXONOMY SECTION */}
        <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                Empirical Evaluation
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">14-Parameter Matrix</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-2xl">
              How ListAIAssets Curates and Evaluates Tool Categories
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Every vertical on ListAIAssets is governed by empirical benchmarking rather than vendor marketing claims. We monitor real-time inference latency (TTFT), tokens-per-second throughput, context-window retrieval fidelity, and licensing terms (open-weights Apache 2.0 vs proprietary API locks). Whether you need autonomous IDE pair programming, generative video rendering, or enterprise legal compliance, our categorized directory provides normalized comparisons.
            </p>
          </div>
        </section>

        {/* 3-STEP SELECTION GUIDE (Clean warm amber / stone, no clashing neon) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 space-y-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/10 font-mono text-xs font-bold text-amber-700 dark:text-amber-400 border border-amber-500/20">
              01
            </div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
              Target the Specific Workflow
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Avoid broad suites when specialized tools provide deep codebase indexing, zero-latency speech synthesis, or verified legal contract redlining.
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 space-y-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-stone-100 dark:bg-stone-900 font-mono text-xs font-bold text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-800">
              02
            </div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
              Inspect Normalized Telemetry
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Compare actual token throughput, domain authority, and verified developer community votes before locking into vendor subscriptions.
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 space-y-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/10 font-mono text-xs font-bold text-amber-700 dark:text-amber-400 border border-amber-500/20">
              03
            </div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
              Validate via Freemium &amp; Open Weights
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Pilot tools using verified free tiers or self-hosted open-weights models to ensure security compliance and API reliability before enterprise rollout.
            </p>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800">
                Documentation
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">FAQ</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-2xl">
              Frequently Asked Questions About Categories
            </h2>
          </div>

          <div className="space-y-2">
            {CATEGORIES_PAGE_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between gap-4 p-4 text-left font-medium text-xs sm:text-sm text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-stone-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-amber-600 dark:text-amber-400" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-0 text-xs text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800/60 mt-1 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM CTA - Pure ListAIAssets SaaS Style */}
        <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 dark:text-white">
              List Your AI Tool in Our Directory
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Reach over 100,000 monthly software engineers and enterprise buyers searching for production-ready AI software.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 hover:bg-amber-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer"
            >
              Submit an AI Tool
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] hover:bg-stone-100 dark:hover:bg-stone-800 px-4 py-2.5 text-xs font-medium text-stone-800 dark:text-stone-200 transition-colors"
            >
              Browse Directory
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-24 text-center text-stone-500">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-stone-400 border-t-transparent" />
          <p className="mt-3 text-xs font-mono text-stone-500">Loading Categories...</p>
        </div>
      }
    >
      <CategoriesContent />
    </Suspense>
  );
}
