"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Command,
  ArrowUpRight,
  Menu,
  X,
  Plus,
} from "lucide-react";
import { Badge } from "./badge";
import { CommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";
import { ListAIAssetsLogo } from "./ui/BrandLogo";

export function Navbar() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-stone-200 dark:border-stone-800/80 bg-[#fafaf8]/85 dark:bg-[#0c0a09]/85 backdrop-blur-xl transition-colors duration-150">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo - Official Vector SVG */}
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center transition-opacity hover:opacity-90">
              <ListAIAssetsLogo size={34} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium">
              <Link
                href="/tools"
                className="text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100 transition-colors duration-150"
              >
                Explore Tools
              </Link>
              <Link
                href="/categories"
                className="text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100 transition-colors duration-150"
              >
                Categories
              </Link>
              <Link
                href="/compare/cursor-vs-claude-3-7-sonnet"
                className="text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100 transition-colors duration-150"
              >
                Compare
              </Link>
              <Link
                href="/blog"
                className="text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100 transition-colors duration-150"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Quick Cmd+K Search Trigger */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/70 p-2 sm:px-3 sm:py-1.5 text-xs text-stone-500 dark:text-stone-400 transition-colors hover:border-amber-500/40 dark:hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-stone-200 focus:outline-none cursor-pointer"
              aria-label="Search AI tools"
            >
              <Search className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
              <span className="hidden md:inline text-stone-500 dark:text-stone-400">Search 10,000+ AI tools...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-stone-300 dark:border-stone-700/80 bg-stone-50 dark:bg-stone-800/80 px-1.5 py-0.5 font-mono text-[10px] text-stone-500 dark:text-stone-400 shadow-xs">
                <Command className="h-2.5 w-2.5" /> K
              </kbd>
            </button>

            {/* Theme Toggle (Sun/Moon) */}
            <ThemeToggle />

            {/* Submit Tool Action - Hidden on mobile top bar to prevent crowding, prominent full-width in drawer */}
            <Link
              href="/submit"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-amber-500 hover:shadow-xs active:scale-[0.98]"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Submit Tool</span>
            </Link>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden flex items-center justify-center rounded-lg p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 active:scale-95 transition-all"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-[#fafaf8]/98 dark:bg-[#0c0a09]/98 px-4 py-5 space-y-4 backdrop-blur-2xl shadow-xl transition-all">
            {/* Quick search button inside drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCommandOpen(true);
              }}
              className="w-full flex items-center justify-between rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/80 px-3 py-2.5 text-xs text-stone-500 dark:text-stone-400"
            >
              <span className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-stone-400" />
                <span>Search 10,000+ AI tools, models...</span>
              </span>
              <kbd className="rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 px-1.5 py-0.5 font-mono text-[10px]">
                Cmd+K
              </kbd>
            </button>

            {/* Navigation Links with comfortable tap targets */}
            <nav className="space-y-1">
              <Link
                href="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <span>Explore Directory</span>
                <span className="text-[11px] font-mono text-stone-500">10,000+</span>
              </Link>
              <Link
                href="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <span>Categories</span>
                <span className="text-[11px] font-mono text-stone-500">18 Hubs</span>
              </Link>
              <Link
                href="/compare/cursor-vs-claude-3-7-sonnet"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <span>Compare AI Models</span>
                <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">Telemetry</span>
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <span>Research &amp; Blog</span>
                <span className="text-[11px] font-mono text-stone-500">Articles</span>
              </Link>
            </nav>

            {/* Mobile Submit Tool Button (High-conversion Full-width CTA) */}
            <div className="pt-2">
              <Link
                href="/submit"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-amber-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-amber-500 active:scale-[0.99] transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Submit Your AI Tool</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette Dialog */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
}
