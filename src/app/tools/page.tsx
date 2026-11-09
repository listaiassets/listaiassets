"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/badge";
import { DETAILED_TOOLS, DetailedTool } from "@/lib/data/tools";
import { ToolCard } from "@/components/tool-card";
import { SearchableSelect, SearchableOption } from "@/components/ui/SearchableSelect";
import { Pagination } from "@/components/ui/Pagination";

const TOOLS_PER_PAGE = 12;

function ToolsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial states from URL parameters
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "ALL");
  const [pricing, setPricing] = useState(searchParams.get("pricing") || "ALL");
  const [minRating, setMinRating] = useState<number>(
    parseFloat(searchParams.get("minRating") || "0")
  );
  const [minVisitors, setMinVisitors] = useState<number>(
    parseInt(searchParams.get("minVisitors") || "0", 10)
  );

  // Feature checkboxes
  const [apiFilter, setApiFilter] = useState(searchParams.get("api") === "true");
  const [mobileFilter, setMobileFilter] = useState(searchParams.get("mobile") === "true");
  const [webFilter, setWebFilter] = useState(searchParams.get("web") === "true");
  const [noWatermarkFilter, setNoWatermarkFilter] = useState(
    searchParams.get("noWatermark") === "true"
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "rating");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Pagination state from URL parameter
  const rawPage = searchParams.get("page");
  const parsedPage = rawPage ? parseInt(rawPage, 10) : 1;
  const [currentPage, setCurrentPage] = useState<number>(
    isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage
  );

  // Live tools state (initial static seed, hydrated with approved Supabase tools)
  const [liveTools, setLiveTools] = useState<DetailedTool[]>(DETAILED_TOOLS);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/tools")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.tools && Array.isArray(data.tools) && data.tools.length > 0) {
          setLiveTools(data.tools);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter setters that reset pagination to page 1
  const handleQueryChange = (val: string) => {
    setQuery(val);
    setCurrentPage(1);
  };
  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setCurrentPage(1);
  };
  const handlePricingChange = (val: string) => {
    setPricing(val);
    setCurrentPage(1);
  };
  const handleMinRatingChange = (val: number) => {
    setMinRating(val);
    setCurrentPage(1);
  };
  const handleMinVisitorsChange = (val: number) => {
    setMinVisitors(val);
    setCurrentPage(1);
  };
  const handleApiFilterChange = (val: boolean) => {
    setApiFilter(val);
    setCurrentPage(1);
  };
  const handleMobileFilterChange = (val: boolean) => {
    setMobileFilter(val);
    setCurrentPage(1);
  };
  const handleWebFilterChange = (val: boolean) => {
    setWebFilter(val);
    setCurrentPage(1);
  };
  const handleNoWatermarkFilterChange = (val: boolean) => {
    setNoWatermarkFilter(val);
    setCurrentPage(1);
  };
  const handleSortByChange = (val: string) => {
    setSortBy(val);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Active filter count for mobile badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (query) count++;
    if (category !== "ALL") count++;
    if (pricing !== "ALL") count++;
    if (minRating > 0) count++;
    if (minVisitors > 0) count++;
    if (apiFilter) count++;
    if (mobileFilter) count++;
    if (webFilter) count++;
    if (noWatermarkFilter) count++;
    return count;
  }, [
    query,
    category,
    pricing,
    minRating,
    minVisitors,
    apiFilter,
    mobileFilter,
    webFilter,
    noWatermarkFilter,
  ]);

  // Synchronize state with URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "ALL") params.set("category", category);
    if (pricing !== "ALL") params.set("pricing", pricing);
    if (minRating > 0) params.set("minRating", minRating.toString());
    if (minVisitors > 0) params.set("minVisitors", minVisitors.toString());
    if (apiFilter) params.set("api", "true");
    if (mobileFilter) params.set("mobile", "true");
    if (webFilter) params.set("web", "true");
    if (noWatermarkFilter) params.set("noWatermark", "true");
    if (sortBy !== "rating") params.set("sort", sortBy);
    if (currentPage > 1) params.set("page", currentPage.toString());

    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(targetUrl, { scroll: false });
  }, [
    query,
    category,
    pricing,
    minRating,
    minVisitors,
    apiFilter,
    mobileFilter,
    webFilter,
    noWatermarkFilter,
    sortBy,
    currentPage,
    pathname,
    router,
  ]);

  const resetFilters = () => {
    setQuery("");
    setCategory("ALL");
    setPricing("ALL");
    setMinRating(0);
    setMinVisitors(0);
    setApiFilter(false);
    setMobileFilter(false);
    setWebFilter(false);
    setNoWatermarkFilter(false);
    setSortBy("rating");
    setCurrentPage(1);
  };

  const categoryOptions: SearchableOption[] = [
    { value: "ALL", label: "All Categories" },
    { value: "coding", label: "Coding Agents & IDEs" },
    { value: "llms", label: "LLMs & Reasoning" },
    { value: "video", label: "Video & Animation" },
    { value: "art", label: "Generative Art & Design" },
    { value: "search", label: "Research & Search" },
    { value: "audio", label: "Voice & Audio" },
  ];

  const sortOptions: SearchableOption[] = [
    { value: "rating", label: "Highest Rating" },
    { value: "traffic", label: "Most Traffic" },
    { value: "latency", label: "Fastest Latency" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
  ];

  // Filtered and sorted tools
  const filteredTools = useMemo(() => {
    return liveTools.filter((tool) => {
      // Search
      const matchesQuery =
        !query ||
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(query.toLowerCase()) ||
        tool.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      // Category
      const matchesCategory =
        category === "ALL" ||
        tool.categories.some((c) => c.slug.toLowerCase().includes(category.toLowerCase()));

      // Pricing
      const matchesPricing =
        pricing === "ALL" || tool.pricingType.toUpperCase() === pricing.toUpperCase();

      // Rating
      const matchesRating = tool.reviewScore >= minRating;

      // Visitors
      const matchesVisitors = (tool.monthlyVisitorsNumber || 0) >= minVisitors;

      // Capabilities
      const matchesApi = !apiFilter || !!tool.features.api;
      const matchesMobile = !mobileFilter || !!tool.features.mobileApp;
      const matchesWeb = !webFilter || !!tool.features.web;
      const matchesWatermark = !noWatermarkFilter || !!tool.features.noWatermark;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesPricing &&
        matchesRating &&
        matchesVisitors &&
        matchesApi &&
        matchesMobile &&
        matchesWeb &&
        matchesWatermark
      );
    }).sort((a, b) => {
      if (sortBy === "rating") return b.reviewScore - a.reviewScore;
      if (sortBy === "traffic")
        return (b.monthlyVisitorsNumber || 0) - (a.monthlyVisitorsNumber || 0);
      if (sortBy === "latency")
        return a.benchmarks.latencyMs - b.benchmarks.latencyMs;
      if (sortBy === "priceAsc") return a.startingPrice - b.startingPrice;
      if (sortBy === "priceDesc") return b.startingPrice - a.startingPrice;
      return 0;
    });
  }, [
    query,
    category,
    pricing,
    minRating,
    minVisitors,
    apiFilter,
    mobileFilter,
    webFilter,
    noWatermarkFilter,
    sortBy,
    liveTools,
  ]);

  // Paginated tools calculation
  const totalFilteredTools = filteredTools.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredTools / TOOLS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * TOOLS_PER_PAGE;
  const paginatedTools = filteredTools.slice(startIndex, startIndex + TOOLS_PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              AI Software Catalog
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Independent Directory
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-3xl">
            Explore AI Tools &amp; Models
          </h1>
          <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
            Filter through verified models, developer agents, and productivity apps by capability, pricing, and license.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3.5 py-1.5 text-xs text-stone-600 dark:text-stone-400 shadow-xs">
          <span>Showing</span>
          <span className="font-mono font-bold text-stone-900 dark:text-white">
            {totalFilteredTools === 0
              ? 0
              : totalFilteredTools <= TOOLS_PER_PAGE
              ? totalFilteredTools
              : `${startIndex + 1}–${Math.min(startIndex + TOOLS_PER_PAGE, totalFilteredTools)}`}
          </span>
          <span>
            {totalFilteredTools <= TOOLS_PER_PAGE
              ? totalFilteredTools === 1
                ? "verified tool"
                : "verified tools"
              : `of ${totalFilteredTools} verified tools`}
          </span>
        </div>
      </div>

      {/* Mobile Filter Toggle Trigger */}
      <div className="mt-4 lg:hidden flex items-center justify-between gap-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-3 shadow-xs">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 px-3.5 py-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          <span>{mobileFiltersOpen ? "Hide Filters" : "Filter Catalog"}</span>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-amber-600 text-white px-2 py-0.5 text-[10px] font-mono font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        <span className="text-xs text-stone-500 font-mono">
          {filteredTools.length} tools available
        </span>
      </div>

      <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR: MULTI-ATTRIBUTE FILTERS (Collapsible on mobile) */}
        <aside
          className={`${
            mobileFiltersOpen ? "block" : "hidden"
          } lg:block lg:col-span-1 space-y-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 h-fit shadow-xs`}
        >
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 dark:text-white">
              <SlidersHorizontal className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" />
              <span>Filter Catalog</span>
            </div>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>

          {/* Search Query Input */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400 block mb-2">
              Keywords
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search tools, models..."
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 pl-8 pr-3 py-2 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400 block mb-2">
              Category
            </label>
            <SearchableSelect
              value={category}
              onChange={handleCategoryChange}
              options={categoryOptions}
              searchPlaceholder="Filter categories..."
              buttonClassName="w-full justify-between py-2"
              dropdownWidth="w-full"
            />
          </div>

          {/* Price Model */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400 block mb-2">
              Price Model
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {["ALL", "FREE", "FREEMIUM", "PAID"].map((p) => (
                <button
                  key={p}
                  onClick={() => handlePricingChange(p)}
                  className={`rounded-md py-1.5 px-2 text-center transition-all cursor-pointer ${
                    pricing === p
                      ? "bg-stone-900 text-white font-medium border border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-200 shadow-xs"
                      : "border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Min Rating
              </label>
              <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-medium">
                {minRating > 0 ? `${minRating}★+` : "Any"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {[0, 4.5, 4.8, 4.9].map((ratingVal) => (
                <button
                  key={ratingVal}
                  onClick={() => handleMinRatingChange(ratingVal)}
                  className={`flex-1 rounded-md py-1 text-xs font-mono transition-colors cursor-pointer ${
                    minRating === ratingVal
                      ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-medium"
                      : "border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white"
                  }`}
                >
                  {ratingVal === 0 ? "All" : `${ratingVal}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Visitors Threshold */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Monthly Traffic
              </label>
              <span className="text-xs font-mono text-stone-700 dark:text-stone-300 font-medium">
                {minVisitors === 0
                  ? "All"
                  : minVisitors >= 10000000
                  ? "10M+"
                  : "5M+"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-xs">
              {[
                { label: "Any", val: 0 },
                { label: "5M+", val: 5000000 },
                { label: "10M+", val: 10000000 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleMinVisitorsChange(opt.val)}
                  className={`rounded-md py-1 text-center transition-colors cursor-pointer ${
                    minVisitors === opt.val
                      ? "bg-stone-900 text-white font-medium border border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-200 shadow-xs"
                      : "border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Features Checkboxes */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400 block mb-2.5">
              Capabilities
            </label>
            <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={apiFilter}
                  onChange={(e) => handleApiFilterChange(e.target.checked)}
                  className="rounded border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-amber-600 focus:ring-0 accent-amber-600"
                />
                <span>Developer API Available</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={noWatermarkFilter}
                  onChange={(e) => handleNoWatermarkFilterChange(e.target.checked)}
                  className="rounded border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-amber-600 focus:ring-0 accent-amber-600"
                />
                <span>Zero Watermark Export</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={mobileFilter}
                  onChange={(e) => handleMobileFilterChange(e.target.checked)}
                  className="rounded border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-amber-600 focus:ring-0 accent-amber-600"
                />
                <span>Mobile App (iOS/Android)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={webFilter}
                  onChange={(e) => handleWebFilterChange(e.target.checked)}
                  className="rounded border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-amber-600 focus:ring-0 accent-amber-600"
                />
                <span>Web Application</span>
              </label>
            </div>
          </div>
        </aside>

        {/* MAIN RESULTS FEED */}
        <main className="lg:col-span-3 space-y-4">
          {/* Sorting & Counter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-4 py-2.5 shadow-xs">
            <span className="text-xs text-stone-600 dark:text-stone-400">
              Showing{" "}
              <strong className="text-stone-900 dark:text-white">
                {totalFilteredTools === 0
                  ? 0
                  : totalFilteredTools <= TOOLS_PER_PAGE
                  ? totalFilteredTools
                  : `${startIndex + 1}–${Math.min(startIndex + TOOLS_PER_PAGE, totalFilteredTools)}`}
              </strong>{" "}
              {totalFilteredTools > TOOLS_PER_PAGE && (
                <>
                  of <strong className="text-stone-900 dark:text-white">{totalFilteredTools}</strong>{" "}
                </>
              )}
              AI technologies
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-mono uppercase text-[10px]">Sort:</span>
              <SearchableSelect
                value={sortBy}
                onChange={handleSortByChange}
                options={sortOptions}
                searchPlaceholder="Search sort..."
                buttonClassName="py-1 px-2.5"
                dropdownWidth="w-48"
              />
            </div>
          </div>

          {/* Cards Grid using ToolCard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] py-16 text-center shadow-xs">
              <Layers className="mx-auto h-8 w-8 text-stone-400" />
              <p className="mt-2 text-xs text-stone-700 dark:text-stone-300 font-medium">No tools match your active filter criteria</p>
              <button
                onClick={resetFilters}
                className="mt-3 rounded-md bg-amber-600 hover:bg-amber-500 text-white px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={totalFilteredTools}
              itemName="tools"
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-24 text-center text-stone-500">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-stone-400 border-t-transparent" />
          <p className="mt-3 text-xs font-mono text-stone-500">Loading Directory...</p>
        </div>
      }
    >
      <ToolsContent />
    </Suspense>
  );
}
