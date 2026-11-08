"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  GitCompare,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Star,
  Zap,
  Calculator,
  ThumbsUp,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/badge";
import { DETAILED_TOOLS, DetailedTool } from "@/lib/data/tools";
import { formatPrice } from "@/lib/utils";
import { ComparisonJsonLd } from "@/components/seo/JsonLd";
import { BrandLogo } from "@/components/ui/BrandLogos";
import { SearchableSelect, SearchableOption } from "@/components/ui/SearchableSelect";

export default function ComparePage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "cursor-vs-claude-3-7-sonnet";

  // Parse slugs e.g. "toolA-vs-toolB"
  const [toolASlug, toolBSlug] = useMemo(() => {
    const parts = slug.split("-vs-");
    return [parts[0] || "cursor", parts[1] || "claude-3-7-sonnet"];
  }, [slug]);

  // Find candidate tools
  const [toolA, setToolA] = useState<DetailedTool>(() => {
    return (
      DETAILED_TOOLS.find((t) => t.slug === toolASlug) ||
      DETAILED_TOOLS[0]
    );
  });

  const [toolB, setToolB] = useState<DetailedTool>(() => {
    return (
      DETAILED_TOOLS.find((t) => t.slug === toolBSlug) ||
      DETAILED_TOOLS[1]
    );
  });

  // Interactive Price Calculator state (Monthly usage requests)
  const [monthlyUsage, setMonthlyUsage] = useState<number>(2000);

  // Community votes live state
  const [votesA, setVotesA] = useState({
    up: toolA.communityVotes.upvotes,
    down: toolA.communityVotes.downvotes,
    userVoted: null as "up" | "down" | null,
  });

  const [votesB, setVotesB] = useState({
    up: toolB.communityVotes.upvotes,
    down: toolB.communityVotes.downvotes,
    userVoted: null as "up" | "down" | null,
  });

  // Calculate pricing comparison
  const costA = useMemo(() => {
    const base = toolA.startingPrice;
    const creditCost = (toolA.pricePerCredit || 0.01) * monthlyUsage;
    return base + creditCost;
  }, [toolA, monthlyUsage]);

  const costB = useMemo(() => {
    const base = toolB.startingPrice;
    const creditCost = (toolB.pricePerCredit || 0.01) * monthlyUsage;
    return base + creditCost;
  }, [toolB, monthlyUsage]);

  // Total community sentiment percentage
  const totalVotes = votesA.up + votesB.up;
  const percentA = totalVotes > 0 ? Math.round((votesA.up / totalVotes) * 100) : 50;
  const percentB = 100 - percentA;

  const handleVoteA = (type: "up" | "down") => {
    if (votesA.userVoted === type) return;
    setVotesA((prev) => ({
      ...prev,
      up: type === "up" ? prev.up + 1 : prev.up,
      down: type === "down" ? prev.down + 1 : prev.down,
      userVoted: type,
    }));
  };

  const handleVoteB = (type: "up" | "down") => {
    if (votesB.userVoted === type) return;
    setVotesB((prev) => ({
      ...prev,
      up: type === "up" ? prev.up + 1 : prev.up,
      down: type === "down" ? prev.down + 1 : prev.down,
      userVoted: type,
    }));
  };

  const handleSwapToolA = (newSlug: string) => {
    const found = DETAILED_TOOLS.find((t) => t.slug === newSlug);
    if (found) {
      setToolA(found);
      router.push(`/compare/${found.slug}-vs-${toolB.slug}`, { scroll: false });
    }
  };

  const handleSwapToolB = (newSlug: string) => {
    const found = DETAILED_TOOLS.find((t) => t.slug === newSlug);
    if (found) {
      setToolB(found);
      router.push(`/compare/${toolA.slug}-vs-${found.slug}`, { scroll: false });
    }
  };

  // Build searchable dropdown options with rich branding and badges
  const toolOptions: SearchableOption[] = useMemo(() => {
    return DETAILED_TOOLS.map((t) => ({
      value: t.slug,
      label: t.name,
      badge: t.pricingType,
      subtitle: t.tagline,
      icon: (
        <div className="h-4 w-4 rounded overflow-hidden shrink-0 flex items-center justify-center bg-stone-100 dark:bg-stone-800">
          <BrandLogo slug={t.slug || t.name} size={16} />
        </div>
      ),
    }));
  }, []);

  return (
    <div className="relative min-h-screen pb-24 transition-colors duration-150">
      {/* Structural Schema Markup for Rich Snippets */}
      <ComparisonJsonLd toolA={toolA} toolB={toolB} />

      {/* Top Breadcrumb & Navigation */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Directory</span>
        </Link>
      </div>

      {/* FLOATING STICKY SIDE-BY-SIDE HEADER */}
      <div className="sticky top-14 z-30 border-b border-stone-200 dark:border-stone-800 bg-[#fafaf8]/90 dark:bg-[#0c0a09]/90 backdrop-blur-xl transition-colors duration-150">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
          {/* Tool A Header */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xs bg-white dark:bg-stone-900">
              <BrandLogo slug={toolA.slug || toolA.name} size={32} className="h-full w-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-stone-900 dark:text-white text-xs sm:text-sm">
                  {toolA.name}
                </span>
                {toolA.verifiedBadge && (
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" />
                )}
              </div>
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {formatPrice(toolA.startingPrice, toolA.pricingType)}
              </span>
            </div>
          </div>

          {/* VS Center Badge */}
          <div className="flex items-center gap-1.5">
            <span className="rounded-md bg-stone-100 dark:bg-stone-900 px-2 py-0.5 font-mono text-[11px] font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 shadow-xs">
              VS
            </span>
          </div>

          {/* Tool B Header */}
          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5">
                <span className="font-semibold text-stone-900 dark:text-white text-xs sm:text-sm">
                  {toolB.name}
                </span>
                {toolB.verifiedBadge && (
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" />
                )}
              </div>
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {formatPrice(toolB.startingPrice, toolB.pricingType)}
              </span>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xs bg-white dark:bg-stone-900">
              <BrandLogo slug={toolB.slug || toolB.name} size={32} className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* HERO TITLE & CANDIDATE SELECTORS */}
        <div className="text-center">
          <span className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            Head-to-Head Telemetry
          </span>
          <h1 className="mt-3 text-3xl font-bold text-stone-900 dark:text-white tracking-tight sm:text-4xl">
            {toolA.name} <span className="text-stone-400 dark:text-stone-600 font-normal">vs.</span> {toolB.name}
          </h1>
          <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
            Direct benchmark analysis, telemetry metrics, credit calculators, and verified feature checklist.
          </p>

          {/* Candidate Selectors with Instant Search & Custom Amber Styling */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs">
            <SearchableSelect
              labelPrefix="Tool A:"
              value={toolA.slug}
              onChange={handleSwapToolA}
              options={toolOptions}
              searchPlaceholder="Search 50+ AI tools..."
            />

            <GitCompare className="h-3.5 w-3.5 text-stone-400 dark:text-stone-600 shrink-0" />

            <SearchableSelect
              labelPrefix="Tool B:"
              value={toolB.slug}
              onChange={handleSwapToolB}
              options={toolOptions}
              searchPlaceholder="Search 50+ AI tools..."
            />
          </div>
        </div>

        {/* SECTION 1: COMMUNITY VOTE DUEL WIDGET */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Community Verdict & Trust Duel</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">Crowdsourced sentiment from verified engineers</p>
            </div>
            <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
              Total Votes: <span className="text-stone-900 dark:text-white font-bold">{totalVotes}</span>
            </div>
          </div>

          {/* Progress Bar (Monochromatic Telemetry) */}
          <div className="mt-4">
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-stone-900 dark:text-white font-medium">{toolA.name} ({percentA}%)</span>
              <span className="text-stone-600 dark:text-stone-400 font-medium">{toolB.name} ({percentB}%)</span>
            </div>
            <div className="flex h-2.5 w-full rounded-full bg-stone-100 dark:bg-stone-900 overflow-hidden border border-stone-200/60 dark:border-stone-800/60">
              <div
                className="bg-stone-900 dark:bg-stone-100 transition-all duration-300"
                style={{ width: `${percentA}%` }}
              />
              <div
                className="bg-stone-400 dark:bg-stone-700 transition-all duration-300"
                style={{ width: `${percentB}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center justify-between rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50 p-2.5 shadow-xs">
              <span className="text-xs font-medium text-stone-800 dark:text-stone-200">Vote for {toolA.name}</span>
              <button
                onClick={() => handleVoteA("up")}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                  votesA.userVoted === "up"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 dark:bg-stone-800 dark:border-transparent dark:text-stone-300 dark:hover:bg-stone-700"
                }`}
              >
                <ThumbsUp className="h-3 w-3" />
                <span>{votesA.up}</span>
              </button>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50 p-2.5 shadow-xs">
              <span className="text-xs font-medium text-stone-800 dark:text-stone-200">Vote for {toolB.name}</span>
              <button
                onClick={() => handleVoteB("up")}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                  votesB.userVoted === "up"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 dark:bg-stone-800 dark:border-transparent dark:text-stone-300 dark:hover:bg-stone-700"
                }`}
              >
                <ThumbsUp className="h-3 w-3" />
                <span>{votesB.up}</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE PRICE-PER-CREDIT CALCULATOR */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-amber-600 dark:text-amber-500" />
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Interactive Price-Per-Credit Calculator</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">Estimate total monthly expense based on workload volume</p>
              </div>
            </div>
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              Live Estimator
            </span>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-medium text-stone-700 dark:text-stone-300">Monthly Usage Volume:</span>
                <span className="font-mono text-xs font-bold text-stone-900 dark:text-white">
                  {monthlyUsage.toLocaleString()} requests
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="25000"
                step="250"
                value={monthlyUsage}
                onChange={(e) => setMonthlyUsage(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            {/* Cost Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50 p-4 shadow-xs">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-stone-900 dark:text-white">{toolA.name}</span>
                  <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">${toolA.pricePerCredit ?? 0.01}/credit</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-stone-900 dark:text-white font-mono">
                  ${costA.toFixed(2)}
                  <span className="text-xs font-normal text-stone-500 dark:text-stone-400"> /mo</span>
                </div>
              </div>

              <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50 p-4 shadow-xs">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-stone-900 dark:text-white">{toolB.name}</span>
                  <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">${toolB.pricePerCredit ?? 0.01}/credit</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-stone-900 dark:text-white font-mono">
                  ${costB.toFixed(2)}
                  <span className="text-xs font-normal text-stone-500 dark:text-stone-400"> /mo</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-950 p-3 text-center text-xs text-stone-600 dark:text-stone-400">
              {costA < costB ? (
                <span>
                  <strong className="text-stone-900 dark:text-white">{toolA.name}</strong> is{" "}
                  <strong className="text-amber-700 dark:text-amber-400 font-semibold">${(costB - costA).toFixed(2)}/mo cheaper</strong> for this volume.
                </span>
              ) : costB < costA ? (
                <span>
                  <strong className="text-stone-900 dark:text-white">{toolB.name}</strong> is{" "}
                  <strong className="text-amber-700 dark:text-amber-400 font-semibold">${(costA - costB).toFixed(2)}/mo cheaper</strong> for this volume.
                </span>
              ) : (
                <span>Both engines have identical projected costs for this volume.</span>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: LATENCY & OUTPUT BENCHMARK METRICS (Monochromatic Telemetry) */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 shadow-xs">
          <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
            <BarChart3 className="h-4 w-4 text-amber-600 dark:text-amber-500" />
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Latency & Quality Benchmarks</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">Standardized benchmark telemetry</p>
            </div>
          </div>

          <div className="mt-4 space-y-4 text-xs font-mono">
            <div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400 mb-1">
                <span>Inference Latency (Faster is better)</span>
                <span>
                  {toolA.name}: <strong className="text-stone-900 dark:text-white">{toolA.benchmarks.latencyMs}ms</strong> vs{" "}
                  {toolB.name}: <strong className="text-stone-700 dark:text-stone-300">{toolB.benchmarks.latencyMs}ms</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-900 overflow-hidden border border-stone-200/50 dark:border-stone-800/50">
                  <div className="h-full bg-stone-900 dark:bg-stone-100" style={{ width: "85%" }} />
                </div>
                <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-900 overflow-hidden border border-stone-200/50 dark:border-stone-800/50">
                  <div className="h-full bg-stone-400 dark:bg-stone-700" style={{ width: "65%" }} />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400 mb-1">
                <span>Code & Technical Accuracy</span>
                <span>
                  {toolA.name}: <strong className="text-stone-900 dark:text-white">{toolA.benchmarks.codeAccuracyPercent}%</strong> vs{" "}
                  {toolB.name}: <strong className="text-stone-700 dark:text-stone-300">{toolB.benchmarks.codeAccuracyPercent}%</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-900 overflow-hidden border border-stone-200/50 dark:border-stone-800/50">
                  <div className="h-full bg-stone-900 dark:bg-stone-100" style={{ width: `${toolA.benchmarks.codeAccuracyPercent}%` }} />
                </div>
                <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-900 overflow-hidden border border-stone-200/50 dark:border-stone-800/50">
                  <div className="h-full bg-stone-400 dark:bg-stone-700" style={{ width: `${toolB.benchmarks.codeAccuracyPercent}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: FEATURE CHECKLIST MATRIX */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 shadow-xs overflow-x-auto">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-3 mb-3">
            <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Feature Checklist Matrix</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">Side-by-side entitlement audit</p>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400">
                <th className="py-2.5 font-medium uppercase tracking-wider text-[11px]">Feature</th>
                <th className="py-2.5 font-semibold text-stone-900 dark:text-white text-xs">{toolA.name}</th>
                <th className="py-2.5 font-semibold text-stone-700 dark:text-stone-300 text-xs">{toolB.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80 dark:divide-stone-800/60 text-stone-700 dark:text-stone-300">
              <tr>
                <td className="py-3 font-medium text-stone-900 dark:text-white">Pricing Model</td>
                <td className="py-3"><Badge variant="amber" size="sm">{toolA.pricingType}</Badge></td>
                <td className="py-3"><Badge variant="neutral" size="sm">{toolB.pricingType}</Badge></td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-stone-900 dark:text-white">Starting Base Price</td>
                <td className="py-3 font-mono">{formatPrice(toolA.startingPrice, toolA.pricingType)}</td>
                <td className="py-3 font-mono">{formatPrice(toolB.startingPrice, toolB.pricingType)}</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-stone-900 dark:text-white">Developer API / SDK</td>
                <td className="py-3">
                  {toolA.features.api ? (
                    <span className="flex items-center gap-1.5 text-stone-900 dark:text-stone-100 font-medium"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" /> Yes</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500"><XCircle className="h-3.5 w-3.5" /> No</span>
                  )}
                </td>
                <td className="py-3">
                  {toolB.features.api ? (
                    <span className="flex items-center gap-1.5 text-stone-900 dark:text-stone-100 font-medium"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" /> Yes</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500"><XCircle className="h-3.5 w-3.5" /> No</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-stone-900 dark:text-white">Zero Watermark Export</td>
                <td className="py-3">
                  {toolA.features.noWatermark ? (
                    <span className="flex items-center gap-1.5 text-stone-900 dark:text-stone-100 font-medium"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" /> Clean</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500"><XCircle className="h-3.5 w-3.5" /> Watermarked</span>
                  )}
                </td>
                <td className="py-3">
                  {toolB.features.noWatermark ? (
                    <span className="flex items-center gap-1.5 text-stone-900 dark:text-stone-100 font-medium"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" /> Clean</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500"><XCircle className="h-3.5 w-3.5" /> Watermarked</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-stone-900 dark:text-white">Commercial Rights</td>
                <td className="py-3">
                  {toolA.features.commercialRights ? (
                    <span className="flex items-center gap-1.5 text-stone-900 dark:text-stone-100 font-medium"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" /> User Owned</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500"><XCircle className="h-3.5 w-3.5" /> Restricted</span>
                  )}
                </td>
                <td className="py-3">
                  {toolB.features.commercialRights ? (
                    <span className="flex items-center gap-1.5 text-stone-900 dark:text-stone-100 font-medium"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" /> User Owned</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500"><XCircle className="h-3.5 w-3.5" /> Restricted</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* BOTTOM EXTERNAL CALLOUTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center justify-between rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs">
            <div>
              <h4 className="font-semibold text-stone-900 dark:text-white text-xs">{toolA.name}</h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{toolA.tagline}</p>
            </div>
            <a
              href={toolA.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-500 transition-colors shrink-0 ml-3 shadow-xs"
            >
              <span>Visit</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs">
            <div>
              <h4 className="font-semibold text-stone-900 dark:text-white text-xs">{toolB.name}</h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{toolB.tagline}</p>
            </div>
            <a
              href={toolB.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded bg-stone-900 text-white dark:bg-stone-800 px-3 py-1.5 text-xs font-medium hover:bg-amber-600 dark:hover:bg-amber-600 transition-colors shrink-0 ml-3 shadow-xs"
            >
              <span>Visit</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
