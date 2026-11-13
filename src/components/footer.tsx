import React from "react";
import Link from "next/link";
import { ListAIAssetsLogo } from "./ui/BrandLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800/80 bg-stone-100/70 dark:bg-[#0c0a09] text-stone-600 dark:text-stone-400 transition-colors duration-150">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:grid-cols-5">
          {/* Brand Info (Span 2 on mobile/tablet, 1.5 on desktop) */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <ListAIAssetsLogo size={32} />
            </Link>
            <p className="mt-3.5 max-w-sm text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              The independent directory and benchmark engine for verified artificial intelligence software, frontier foundation models, and developer coding agents.
            </p>
            <div className="mt-5 flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
              <a
                href="https://x.com/ListAIAssets"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-stone-950 dark:hover:text-white transition-colors"
              >
                X (Twitter)
              </a>
              <span>•</span>
              <a
                href="https://github.com/listaiassets"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-stone-950 dark:hover:text-white transition-colors"
              >
                GitHub
              </a>
              <span>•</span>
              <Link
                href="/llms.txt"
                className="hover:text-stone-950 dark:hover:text-white transition-colors font-mono text-[11px]"
              >
                llms.txt
              </Link>
            </div>
          </div>

          {/* Directory Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200">
              Directory
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs">
              <li>
                <Link href="/tools" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Explore All Tools
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Research &amp; Blog
                </Link>
              </li>
              <li>
                <Link href="/categories/coding" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Coding Agents &amp; IDEs
                </Link>
              </li>
              <li>
                <Link href="/categories/llms" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Reasoning LLMs
                </Link>
              </li>
              <li>
                <Link href="/categories/video" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Generative Video &amp; 3D
                </Link>
              </li>
              <li>
                <Link href="/categories/audio" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Voice &amp; Speech
                </Link>
              </li>
              <li>
                <Link href="/tools?pricing=FREE" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Free &amp; Open Source
                </Link>
              </li>
            </ul>
          </div>

          {/* Comparisons Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200">
              Comparisons
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs">
              <li>
                <Link href="/compare/cursor-vs-claude-3-7-sonnet" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Cursor vs. Claude 3.7
                </Link>
              </li>
              <li>
                <Link href="/compare/midjourney-vs-flux-schnell" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Midjourney vs. Flux
                </Link>
              </li>
              <li>
                <Link href="/compare/perplexity-vs-deepseek-r1" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Perplexity vs. DeepSeek
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  All 18 Categories
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Full Catalog Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Founders & Legal Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200">
              For Founders
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs">
              <li>
                <Link href="/submit" className="hover:text-stone-950 dark:hover:text-white transition-colors font-medium text-amber-600 dark:text-amber-400">
                  Submit a Tool →
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Fast Track (12h Review)
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Featured Sponsorship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Contact Editorial
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-stone-200 dark:border-stone-800/80 pt-6 sm:flex-row text-[11px] text-stone-500">
          <p>© {currentYear} ListAIAssets (listaiassets.com). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-stone-700 dark:hover:text-stone-300">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-stone-700 dark:hover:text-stone-300">
              Terms
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-stone-700 dark:hover:text-stone-300">
              Contact
            </Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-stone-700 dark:hover:text-stone-300">
              Sitemap
            </Link>
            <span>•</span>
            <a href="mailto:team@listaiassets.com" className="hover:text-stone-700 dark:hover:text-stone-300">
              team@listaiassets.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
