"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  GitCompare,
  PlusCircle,
  BarChart3,
  Sparkles,
  Layers,
  X,
} from "lucide-react";
import { DETAILED_TOOLS, DetailedTool } from "@/lib/data/tools";
import { Badge } from "@/components/badge";
import { BrandLogo } from "@/components/ui/BrandLogos";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Keyboard shortcut listener: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom state in parent or focus
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query on close
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedCategory("ALL");
    }
  }, [isOpen]);

  // Filter tools
  const filteredTools = useMemo(() => {
    return DETAILED_TOOLS.filter((tool) => {
      const matchesQuery =
        !query ||
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(query.toLowerCase()) ||
        tool.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchesCategory =
        selectedCategory === "ALL" ||
        tool.categories.some((c) =>
          c.slug.toLowerCase().includes(selectedCategory.toLowerCase())
        );

      return matchesQuery && matchesCategory;
    }).slice(0, 8);
  }, [query, selectedCategory]);

  const handleSelectTool = (slug: string) => {
    onClose();
    router.push(`/compare/${slug}-vs-claude-3-7-sonnet`);
  };

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/40 dark:bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] shadow-2xl transition-colors duration-150"
          >
            {/* Clean top subtle border */}
            <div className="h-px w-full bg-stone-200 dark:bg-stone-800" />

            {/* Input Header */}
            <div className="flex items-center gap-3 border-b border-stone-200 dark:border-stone-800 px-5 py-3.5">
              <Search className="h-4 w-4 text-stone-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search AI tools, compare models, jump to pages..."
                autoFocus
                className="w-full bg-transparent text-sm sm:text-base text-stone-950 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="rounded p-1 text-stone-400 hover:text-stone-950 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 rounded bg-stone-100 dark:bg-stone-800 px-2 py-1 text-[11px] font-mono text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
                <span>ESC</span>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto px-5 py-2.5 border-b border-stone-100 dark:border-stone-800/60 bg-stone-50/70 dark:bg-stone-900/30 text-xs text-stone-600 dark:text-stone-400">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mr-1">
                Filter:
              </span>
              {[
                { label: "ALL", id: "ALL" },
                { label: "Coding", id: "coding" },
                { label: "LLMs", id: "llm" },
                { label: "Video", id: "video" },
                { label: "Art", id: "art" },
                { label: "Audio", id: "audio" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-md px-2.5 py-0.5 text-xs transition-colors shrink-0 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-stone-900 text-white font-medium border border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-200 shadow-xs"
                      : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-200 border border-stone-200 dark:border-stone-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Results Section */}
            <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
              {/* Quick Navigation suggestions */}
              {!query && (
                <div className="mb-3">
                  <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Quick Navigation
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 px-2 py-1">
                    <div
                      onClick={() => handleNavigate("/tools")}
                      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-950 dark:hover:text-white transition-colors"
                    >
                      <Layers className="h-4 w-4 text-stone-400" />
                      <span>Explore All Tools</span>
                    </div>
                    <div
                      onClick={() => handleNavigate("/compare/cursor-vs-claude-3-7-sonnet")}
                      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-950 dark:hover:text-white transition-colors"
                    >
                      <GitCompare className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                      <span>Comparison Matrix</span>
                    </div>
                    <div
                      onClick={() => handleNavigate("/submit")}
                      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-950 dark:hover:text-white transition-colors"
                    >
                      <PlusCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                      <span>Submit New Tool</span>
                    </div>
                    <div
                      onClick={() => handleNavigate("/compare/cursor-vs-claude-3-7-sonnet")}
                      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-950 dark:hover:text-white transition-colors"
                    >
                      <BarChart3 className="h-4 w-4 text-stone-400" />
                      <span>Model Comparison Matrix</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Matching Tools ({filteredTools.length})
              </div>

              {filteredTools.length === 0 ? (
                <div className="py-12 text-center text-stone-500">
                  <Sparkles className="mx-auto h-8 w-8 text-stone-400 dark:text-stone-600 mb-2 animate-pulse" />
                  <p className="text-sm">No tools found matching &quot;{query}&quot;</p>
                </div>
              ) : (
                filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.slug)}
                    className="group flex cursor-pointer items-center justify-between rounded-lg px-3.5 py-2.5 transition-all duration-150 hover:bg-stone-100 dark:hover:bg-stone-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xs bg-white dark:bg-stone-900">
                        <BrandLogo slug={tool.slug || tool.name} size={36} className="h-full w-full" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-900 dark:text-white text-sm">
                            {tool.name}
                          </span>
                          {tool.verifiedBadge && (
                            <span className="rounded bg-amber-500/10 px-1.5 py-0.2 text-[10px] font-medium text-amber-700 dark:text-amber-400 border border-amber-500/20">
                              Verified
                            </span>
                          )}
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">★ {tool.reviewScore}</span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                          {tool.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        variant={tool.pricingType === "FREE" ? "amber" : "neutral"}
                        size="sm"
                        glowing={false}
                      >
                        {tool.pricingType}
                      </Badge>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-400 dark:text-stone-600 opacity-0 group-hover:opacity-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Bottom Keyboard Guide */}
            <div className="flex items-center justify-between border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/90 px-5 py-2.5 text-[11px] text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-1 font-mono text-[10px] text-stone-700 dark:text-stone-300 shadow-xs">↵</kbd> Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-1 font-mono text-[10px] text-stone-700 dark:text-stone-300 shadow-xs">esc</kbd> Dismiss
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px]">Directory Index</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
