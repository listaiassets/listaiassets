"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Star,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/badge";
import { DetailedTool } from "@/lib/data/tools";
import { formatPrice } from "@/lib/utils";
import { AnimatedAiNode } from "@/components/ui/AnimatedAiNode";
import { BrandLogo } from "@/components/ui/BrandLogos";
import Link from "next/link";

const QUICK_PILLS = [
  "No Watermark",
  "API Available",
  "LFP/Open-Source",
  "Commercial Rights",
  "Free Tier",
];

interface FinderResponse {
  query: string;
  detectedCategory: string;
  appliedConstraints: string[];
  summaryHeadline: string;
  aiSummary: string;
  executionPlan: string[];
  tools: DetailedTool[];
}

export function AgentBar() {
  const [prompt, setPrompt] = useState("");
  const [activePills, setActivePills] = useState<string[]>(["Free Tier"]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [result, setResult] = useState<FinderResponse | null>(null);

  const togglePill = (pill: string) => {
    setActivePills((prev) =>
      prev.includes(pill) ? prev.filter((p) => p !== pill) : [...prev, pill]
    );
  };

  const handleSearch = async (overridePrompt?: string) => {
    const textToSearch = overridePrompt ?? prompt;
    if (!textToSearch.trim() && activePills.length === 0) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/ai-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: textToSearch,
          activePills,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data);
      }
    } catch (err) {
      console.error("Discovery error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      {/* Sleek, clean enterprise input bar inspired by Raycast and Linear */}
      <div className="relative mx-auto max-w-3xl">
        <div
          className={`relative rounded-xl border bg-white/90 dark:bg-[#1c1917]/90 p-2 sm:p-2.5 backdrop-blur-xl transition-all duration-200 shadow-sm dark:shadow-none ${
            isFocused
              ? "border-amber-500/50 dark:border-amber-500/40 shadow-xl shadow-stone-950/5 dark:shadow-black/40 ring-1 ring-amber-500/30"
              : "border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700"
          }`}
        >
          <div className="flex items-center gap-3 px-2 sm:px-3">
            {/* Animated AI Pulse SVG node */}
            <AnimatedAiNode isFocused={isFocused || isLoading} className="h-5 w-5 shrink-0" />

            <input
              type="text"
              value={prompt}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want to build or automate (e.g. 'I need a free AI video tool with no watermarks')..."
              className="w-full bg-transparent py-2 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none"
            />

            {/* Solid Primary CTA Button */}
            <button
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-medium text-white transition-all duration-150 hover:bg-amber-500 disabled:opacity-50 shrink-0 cursor-pointer shadow-sm active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="hidden sm:inline">Searching...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Find Tools</span>
                </>
              )}
            </button>
          </div>

          {/* Quick-Action Constraint Tags (Neutral Stone & Amber) */}
          <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto border-t border-stone-100 dark:border-stone-800/80 px-1 pt-2 pb-0.5">
            <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono font-medium shrink-0 mr-1">
              Constraints:
            </span>
            {QUICK_PILLS.map((pill) => {
              const isSelected = activePills.includes(pill);
              return (
                <button
                  key={pill}
                  onClick={() => togglePill(pill)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-stone-900 text-white border border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-200 shadow-xs"
                      : "bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  {isSelected && <span className="mr-1 text-amber-500">✓</span>}
                  {pill}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CLIENT-SIDE AI EXECUTION PANEL */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] shadow-xl dark:shadow-2xl transition-colors"
          >
            <div className="p-5 sm:p-6">
              {/* Header: AI Extraction Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <Badge variant="amber" size="sm">
                    Structured Extraction
                  </Badge>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm tracking-tight">
                    {result.summaryHeadline}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {result.appliedConstraints.map((c, i) => (
                    <span
                      key={i}
                      className="rounded bg-stone-100 dark:bg-stone-900 px-2 py-0.5 text-[10px] font-mono text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rationale & Execution Plan */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg border border-stone-200 dark:border-stone-800/80 bg-stone-50/70 dark:bg-stone-950/50 p-4">
                <div className="md:col-span-2">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Architectural Assessment
                  </div>
                  <p className="mt-1.5 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {result.aiSummary}
                  </p>
                </div>

                <div className="border-t md:border-t-0 md:border-l border-stone-200 dark:border-stone-800/80 pt-3 md:pt-0 md:pl-4">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Execution Steps
                  </div>
                  <ul className="mt-1.5 space-y-1 text-[11px] text-stone-600 dark:text-stone-400">
                    {result.executionPlan.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Matched Tools Grid */}
              <div className="mt-5">
                <div className="text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                  Recommended Matches ({result.tools.length})
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="group flex flex-col justify-between rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-[#1c1917] p-4 transition-all duration-150 hover:border-amber-500/40 hover:bg-white dark:hover:bg-stone-900 shadow-xs"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xs bg-white dark:bg-stone-900">
                              <BrandLogo slug={tool.slug || tool.name} size={32} className="h-full w-full" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                                  {tool.name}
                                </h4>
                                {tool.verifiedBadge && (
                                  <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" />
                                )}
                              </div>
                              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                                ★ {tool.reviewScore.toFixed(1)}
                              </span>
                            </div>
                          </div>

                          <Badge
                            variant={
                              tool.pricingType === "FREE"
                                ? "neutral"
                                : tool.pricingType === "FREEMIUM"
                                ? "amber"
                                : "neutral"
                            }
                            size="sm"
                          >
                            {tool.pricingType}
                          </Badge>
                        </div>

                        <p className="mt-2.5 text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                          {tool.tagline}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-stone-200 dark:border-stone-800 pt-3 text-xs">
                        <span className="font-mono text-stone-900 dark:text-stone-300">
                          {formatPrice(tool.startingPrice, tool.pricingType)}
                        </span>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/compare/${tool.slug}-vs-claude-3-7-sonnet`}
                            className="rounded px-2 py-1 text-[11px] text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
                          >
                            Compare
                          </Link>
                          <a
                            href={tool.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded bg-stone-900 text-white dark:bg-stone-800 px-2.5 py-1 text-[11px] font-medium hover:bg-amber-600 dark:hover:bg-amber-600 transition-colors"
                          >
                            Visit <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
