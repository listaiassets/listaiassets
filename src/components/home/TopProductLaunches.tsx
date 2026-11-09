"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  ExternalLink,
  Flame,
  Layers,
  ShieldCheck,
  Star,
  Trophy,
  Zap,
  Check,
} from "lucide-react";
import { DETAILED_TOOLS, DetailedTool } from "@/lib/data/tools";
import { BrandLogo } from "@/components/ui/BrandLogos";

export function TopProductLaunches() {
  const [activeTab, setActiveTab] = useState<"all" | "video" | "coding" | "reasoning">("all");
  const [upvotesState, setUpvotesState] = useState<Record<string, { count: number; upvoted: boolean }>>(() => {
    const initial: Record<string, { count: number; upvoted: boolean }> = {};
    DETAILED_TOOLS.forEach((t) => {
      initial[t.id] = { count: t.communityVotes.upvotes, upvoted: false };
    });
    return initial;
  });

  // Filter launch tools
  const launches = useMemo(() => {
    const list = DETAILED_TOOLS.filter((t) => t.isNewLaunch || t.launchRank);
    const sorted = [...list].sort((a, b) => (a.launchRank || 99) - (b.launchRank || 99));

    if (activeTab === "all") return sorted;
    if (activeTab === "video") {
      return sorted.filter((t) =>
        t.categories.some((c) => c.slug.includes("video") || c.slug.includes("art"))
      );
    }
    if (activeTab === "coding") {
      return sorted.filter((t) =>
        t.categories.some((c) => c.slug.includes("coding") || c.slug.includes("dev"))
      );
    }
    if (activeTab === "reasoning") {
      return sorted.filter((t) =>
        t.categories.some((c) => c.slug.includes("llm") || c.slug.includes("search"))
      );
    }
    return sorted;
  }, [activeTab]);

  const spotlightTool = launches[0] || DETAILED_TOOLS[0];
  const streamTools = launches.slice(1, 7);

  const handleUpvote = (toolId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setUpvotesState((prev) => {
      const current = prev[toolId] || { count: 0, upvoted: false };
      const newUpvoted = !current.upvoted;
      const newCount = newUpvoted ? current.count + 1 : Math.max(0, current.count - 1);
      return {
        ...prev,
        [toolId]: { count: newCount, upvoted: newUpvoted },
      };
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Live Launchpad</span>
            </span>
            <span className="text-xs text-stone-500 font-mono">Ranked by Daily Upvotes</span>
          </div>

          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
            Top New Product Launches
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl">
            Frontier models, autonomous coding agents, and creative studios launched this week. Evaluated by verified engineer benchmarks.
          </p>
        </div>

        {/* Tab Filters & Launch CTA */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-1 shadow-2xs">
            {[
              { id: "all", label: "🔥 All Launches" },
              { id: "video", label: "🎬 Video & Creative" },
              { id: "coding", label: "💻 Developer IDEs" },
              { id: "reasoning", label: "🧠 Reasoning" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors shrink-0"
          >
            <span>+ Submit Launch</span>
          </Link>
        </div>
      </div>

      {/* Main Launches Grid: 1 Big Spotlight Card + Ranked Leaderboard Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SPOTLIGHT PODIUM: #1 Product Launch of the Day (5 Cols) */}
        {spotlightTool && (
          <div className="lg:col-span-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-gradient-to-b from-white via-white to-amber-50/20 dark:from-[#1c1917] dark:via-[#1c1917] dark:to-stone-950 p-6 sm:p-7 shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
            {/* Top Amber Highlight Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

            <div className="space-y-5">
              {/* Card Header & Rank Ribbon */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                  <Trophy className="h-3.5 w-3.5 text-amber-500" />
                  <span>#1 Product of the Day</span>
                </span>

                {/* Interactive Upvote on Spotlight */}
                <button
                  onClick={(e) => handleUpvote(spotlightTool.id, e)}
                  aria-label="Upvote spotlight product"
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                    upvotesState[spotlightTool.id]?.upvoted
                      ? "border-amber-500 bg-amber-500 text-white shadow-xs"
                      : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:border-amber-500/50 hover:text-amber-600"
                  }`}
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                  <span>{(upvotesState[spotlightTool.id]?.count || spotlightTool.communityVotes.upvotes).toLocaleString()}</span>
                </button>
              </div>

              {/* Identity & Logo */}
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 shrink-0 shadow-xs">
                  <BrandLogo slug={spotlightTool.slug} size={64} className="h-full w-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/tools/${spotlightTool.slug}`}
                      className="text-xl font-bold tracking-tight text-stone-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                      {spotlightTool.name}
                    </Link>
                    {spotlightTool.verifiedBadge && (
                      <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    )}
                  </div>
                  <p className="text-xs text-stone-500 font-mono mt-0.5">
                    {spotlightTool.publisher ? `by ${spotlightTool.publisher}` : "Official Launch"}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="rounded bg-stone-100 dark:bg-stone-900 px-2 py-0.5 text-[10px] font-mono text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800">
                      {spotlightTool.categories[0]?.name}
                    </span>
                    <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      {spotlightTool.pricingType}
                    </span>
                    <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-medium">
                      ★ {spotlightTool.reviewScore.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
                {spotlightTool.tagline}
              </p>

              {/* Description preview */}
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                {spotlightTool.description}
              </p>

              {/* Key Highlights list */}
              {spotlightTool.keyUseCases && spotlightTool.keyUseCases.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-stone-100 dark:border-stone-800/80">
                  {spotlightTool.keyUseCases.slice(0, 2).map((useCase, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                      <Check className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{useCase}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Action Buttons */}
            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
              <Link
                href={`/tools/${spotlightTool.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 px-4 py-2.5 text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Read Full Review</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <a
                href={spotlightTool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <span>Visit {spotlightTool.name}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}

        {/* RANKED STREAM: #2 to #7 Launches Leaderboard (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {streamTools.map((tool, index) => {
            const rank = index + 2;
            const currentUpvotes = upvotesState[tool.id]?.count || tool.communityVotes.upvotes;
            const isUpvoted = upvotesState[tool.id]?.upvoted || false;

            return (
              <div
                key={tool.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-2xs hover:border-amber-500/40 hover:shadow-sm transition-all"
              >
                {/* Left Side: Rank, Logo, Information */}
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Rank Number */}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-500 dark:text-stone-400 text-xs font-mono font-bold border border-stone-200 dark:border-stone-800">
                    #{rank}
                  </span>

                  {/* Brand Logo */}
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="h-11 w-11 shrink-0 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 group-hover:scale-105 transition-transform"
                  >
                    <BrandLogo slug={tool.slug} size={44} className="h-full w-full" />
                  </Link>

                  {/* Name and Tagline */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="font-semibold text-sm text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate"
                      >
                        {tool.name}
                      </Link>
                      {tool.isNewLaunch && (
                        <span className="rounded bg-amber-500/10 px-1.5 py-0.2 text-[9px] font-mono font-bold text-amber-700 dark:text-amber-400 border border-amber-500/20 shrink-0">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate max-w-sm mt-0.5">
                      {tool.tagline}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-stone-400">
                        {tool.categories[0]?.name}
                      </span>
                      <span className="text-stone-300 dark:text-stone-700">•</span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {tool.pricingType}
                      </span>
                      <span className="text-stone-300 dark:text-stone-700">•</span>
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                        ★ {tool.reviewScore.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Action Buttons & Upvote */}
                <div className="flex items-center justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800/80">
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:text-stone-950 dark:hover:text-white transition-colors"
                  >
                    <span>View Tool</span>
                  </Link>

                  <button
                    onClick={(e) => handleUpvote(tool.id, e)}
                    aria-label={`Upvote ${tool.name}`}
                    className={`inline-flex flex-col items-center justify-center min-w-[50px] h-11 rounded-xl border px-2 transition-all cursor-pointer ${
                      isUpvoted
                        ? "border-amber-500 bg-amber-500 text-white shadow-xs font-semibold"
                        : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-amber-500/50 hover:text-amber-600"
                    }`}
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                    <span className="text-[11px] font-mono font-bold leading-none mt-0.5">
                      {currentUpvotes.toLocaleString()}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
