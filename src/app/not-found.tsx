import React from "react";
import Link from "next/link";
import {
  Home,
  Compass,
  ArrowRight,
  Search,
  Layers,
  GitCompare,
  BookOpen,
} from "lucide-react";
import { InteractiveVectorGrid } from "@/components/ui/InteractiveVectorGrid";

export default function NotFound() {
  const quickLinks = [
    {
      title: "AI Tools Directory",
      description: "Filter and benchmark verified developer tools and models",
      href: "/tools",
      icon: Search,
    },
    {
      title: "Compare Tools",
      description: "Direct head-to-head telemetry and benchmark comparisons",
      href: "/compare/cursor-vs-claude-3-7-sonnet",
      icon: GitCompare,
    },
    {
      title: "Workflow Categories",
      description: "Explore 18+ specialized AI taxonomy verticals",
      href: "/categories",
      icon: Layers,
    },
    {
      title: "Articles & Guides",
      description: "In-depth research, tutorials, and ecosystem insights",
      href: "/blog",
      icon: BookOpen,
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-150">
      {/* Interactive Subtle Vector Network Grid */}
      <InteractiveVectorGrid />

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3.5 py-1 text-xs text-stone-700 dark:text-stone-300 shadow-xs mb-6">
          <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-semibold text-stone-900 dark:text-white">Status 404</span>
          <span className="text-stone-300 dark:text-stone-700">•</span>
          <span className="text-stone-500 dark:text-stone-400">Page Not Found</span>
        </div>

        {/* 404 Watermark & Headline */}
        <div className="relative mb-6">
          <div className="font-mono text-7xl sm:text-9xl font-black tracking-tighter text-stone-200/70 dark:text-stone-800/50 select-none">
            404
          </div>
          <h1 className="mt-[-1.5rem] sm:mt-[-2rem] text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
            Page Not Found
          </h1>
        </div>

        <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
          The page or asset you are looking for has been moved, unpublished, or does not exist on ListAIAssets.
        </p>

        {/* Primary Navigation Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-600 hover:bg-amber-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1c1917] hover:bg-stone-50 dark:hover:bg-stone-800 px-5 py-2.5 text-xs font-semibold text-stone-700 dark:text-stone-300 transition-colors"
          >
            <Compass className="h-4 w-4" />
            <span>Explore 10,000+ Tools</span>
          </Link>
        </div>

        {/* Popular Destinations Grid */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800/80 text-left">
          <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4 text-center">
            Popular Destinations
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-[#1c1917]/70 p-4 transition-all duration-150 hover:border-amber-500/40 hover:bg-white dark:hover:bg-[#1c1917] hover:shadow-xs"
                >
                  <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 p-2 text-stone-600 dark:text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h2 className="text-xs font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h2>
                      <ArrowRight className="h-3 w-3 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                    <p className="mt-0.5 text-[11px] text-stone-500 dark:text-stone-400 leading-snug line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

