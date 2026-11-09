"use client";

import React from "react";
import { ExternalLink, Lock, RefreshCw, ShieldCheck, Zap } from "lucide-react";
import { DetailedTool } from "@/lib/data/tools";
import { BrandLogo } from "@/components/ui/BrandLogos";

interface ToolBrowserPreviewProps {
  tool: DetailedTool;
}

export function ToolBrowserPreview({ tool }: ToolBrowserPreviewProps) {
  let displayDomain = "tool.ai";
  try {
    const url = new URL(tool.websiteUrl);
    displayDomain = url.hostname.replace(/^www\./, "");
  } catch {}

  const primaryCategory = tool.categories[0]?.name || "AI Software";

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151311] shadow-md dark:shadow-black/60">
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-100/80 dark:bg-[#1c1917] px-4 py-3">
        {/* Traffic Light Window Controls */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400/80" />
          <div className="h-3 w-3 rounded-full bg-amber-400/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
        </div>

        {/* Browser URL Bar */}
        <div className="flex items-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] px-3.5 py-1 text-xs text-stone-600 dark:text-stone-300 shadow-2xs max-w-sm w-full mx-4 truncate">
          <Lock className="h-3 w-3 text-emerald-500 shrink-0" />
          <span className="text-stone-400 select-none">https://</span>
          <span className="font-mono text-stone-800 dark:text-stone-200 truncate">{displayDomain}</span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2 text-stone-400">
          <RefreshCw className="h-3.5 w-3.5 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer transition-colors" />
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`Visit ${tool.name}`}
            className="hover:text-amber-500 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Browser Window Viewport */}
      <div className="relative p-6 sm:p-10 bg-gradient-to-br from-stone-50 via-white to-amber-50/20 dark:from-[#151311] dark:via-[#1c1917] dark:to-stone-950 min-h-[340px] flex flex-col justify-between">
        {/* Subtle Ambient Background Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Viewport Content */}
        <div className="relative space-y-6">
          {/* Top Status Bar inside canvas */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                Live Product Surface
              </span>
              <span className="text-xs text-stone-500 font-mono">{primaryCategory}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 px-2 py-0.5 text-[10px] font-mono text-stone-600 dark:text-stone-400">
                Latency: {tool.benchmarks.latencyMs}ms
              </span>
              <span className="rounded-md border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 px-2 py-0.5 text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                ★ {tool.reviewScore.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Canvas Hero Banner */}
          <div className="max-w-xl space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm bg-white dark:bg-stone-900 shrink-0">
                <BrandLogo slug={tool.slug} size={48} className="h-full w-full" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
                  {tool.name}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                  {tool.publisher ? `by ${tool.publisher}` : `Official Production Release`}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base font-medium text-stone-800 dark:text-stone-200 leading-snug">
              {tool.tagline}
            </p>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-lg line-clamp-3">
              {tool.description}
            </p>
          </div>

          {/* Key capability pills strip inside viewport */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {tool.tags.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="rounded-lg border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 px-2.5 py-1 text-[11px] font-mono text-stone-700 dark:text-stone-300 shadow-2xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Viewport Bottom Action Bar */}
        <div className="relative mt-8 pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-500" />
            <span>Verified by ListAIAssets Security &amp; Latency Audits</span>
          </div>

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 px-4 py-2 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <span>Launch {tool.name}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
