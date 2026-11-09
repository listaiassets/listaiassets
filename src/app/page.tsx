"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Layers,
  Code2,
  Brain,
  Video,
  Mic,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/badge";
import { ToolCard, ToolCardData } from "@/components/tool-card";
import { AgentBar } from "@/components/ai-finder/AgentBar";
import { CommandPalette } from "@/components/command-palette";
import { InteractiveVectorGrid } from "@/components/ui/InteractiveVectorGrid";
import { BrandLogo } from "@/components/ui/BrandLogos";
import { TelemetryCard } from "@/components/compare/TelemetryCard";
import { TopProductLaunches } from "@/components/home/TopProductLaunches";

const INITIAL_TOOLS: ToolCardData[] = [
  {
    id: "tool_vmake",
    name: "Vmake Labs",
    slug: "vmake-labs",
    tagline: "AI Social Video Studio for e-commerce products and viral content.",
    description: "Turn static product photos and clips into high-converting social videos with AI fashion models, video upscaling to 4K, and watermark removal.",
    websiteUrl: "https://vmake.ai",
    pricingType: "FREEMIUM",
    startingPrice: 0,
    categories: [
      { id: "cat_4", name: "Video & Animation", slug: "video" },
    ],
    tags: ["social-video", "ecommerce", "video-enhancer", "fashion-models"],
    verifiedBadge: true,
    domainAuthority: 78,
    reviewScore: 4.88,
    dealPercent: 25,
  },
  {
    id: "tool_1",
    name: "Cursor AI",
    slug: "cursor",
    tagline: "The AI-first Code Editor built for pairing with frontier reasoning models.",
    description: "An intelligent, fork-of-VSCode development environment engineered specifically for deep multi-file AI code generation and instant codebase indexing.",
    websiteUrl: "https://cursor.com",
    pricingType: "FREEMIUM",
    startingPrice: 20,
    categories: [
      { id: "cat_1", name: "Coding Agents", slug: "coding" },
      { id: "cat_2", name: "Developer Tools", slug: "developer-tools" },
    ],
    tags: ["editor", "agentic-coding", "autocomplete", "multi-file"],
    verifiedBadge: true,
    domainAuthority: 84,
    reviewScore: 4.96,
    dealPercent: 20,
  },
  {
    id: "tool_2",
    name: "Claude 3.7 Sonnet",
    slug: "claude-3-7-sonnet",
    tagline: "Hybrid frontier reasoning and coding model with extended thought tokens.",
    description: "Anthropic's flagship hybrid model that can instantaneously switch between fast responses and extended, visible reasoning step sequences.",
    websiteUrl: "https://claude.ai",
    pricingType: "FREEMIUM",
    startingPrice: 20,
    categories: [
      { id: "cat_3", name: "LLMs & Reasoning", slug: "llms" },
      { id: "cat_1", name: "Coding Agents", slug: "coding" },
    ],
    tags: ["reasoning", "multimodal", "hybrid-thinking", "api"],
    verifiedBadge: true,
    domainAuthority: 91,
    reviewScore: 4.98,
  },
  {
    id: "tool_3",
    name: "Midjourney v7",
    slug: "midjourney",
    tagline: "Hyper-realistic generative image synthesis and creative art platform.",
    description: "State of the art generative visual diffusion platform producing photorealistic textures, dynamic lighting, and coherent multi-subject compositions.",
    websiteUrl: "https://midjourney.com",
    pricingType: "PAID",
    startingPrice: 10,
    categories: [
      { id: "cat_4", name: "Generative Art", slug: "art" },
    ],
    tags: ["text-to-image", "photorealism", "creative-art"],
    verifiedBadge: true,
    domainAuthority: 89,
    reviewScore: 4.88,
  },
  {
    id: "tool_4",
    name: "Perplexity Pro",
    slug: "perplexity",
    tagline: "Live-search AI engine with transparent citation trees and academic search.",
    description: "Combines real-time web crawling with multi-LLM synthesis to provide conversational answers with verifiable inline sources.",
    websiteUrl: "https://perplexity.ai",
    pricingType: "FREEMIUM",
    startingPrice: 20,
    categories: [
      { id: "cat_5", name: "Research & Search", slug: "search" },
    ],
    tags: ["search", "citations", "academic", "live-web"],
    verifiedBadge: true,
    domainAuthority: 86,
    reviewScore: 4.82,
  },
  {
    id: "tool_5",
    name: "ElevenLabs Prime",
    slug: "elevenlabs",
    tagline: "Ultra-natural multilingual voice synthesis, voice cloning, and audio AI.",
    description: "Generates emotive, human-grade voiceovers with zero latency speech-to-speech translation across 32+ international languages.",
    websiteUrl: "https://elevenlabs.io",
    pricingType: "FREEMIUM",
    startingPrice: 5,
    categories: [
      { id: "cat_6", name: "Voice & Audio", slug: "audio" },
    ],
    tags: ["voice-cloning", "speech-synthesis", "podcast", "dubbing"],
    verifiedBadge: true,
    domainAuthority: 82,
    reviewScore: 4.79,
    dealPercent: 15,
  },
  {
    id: "tool_6",
    name: "v0 by Vercel",
    slug: "v0",
    tagline: "Generative UI system to rapidly scaffold, preview, and export React/Tailwind.",
    description: "Converts text prompts into modern Shadcn/UI and Tailwind CSS components ready to drop directly into Next.js App Router projects.",
    websiteUrl: "https://v0.dev",
    pricingType: "FREE",
    startingPrice: 0,
    categories: [
      { id: "cat_1", name: "Coding Agents", slug: "coding" },
      { id: "cat_2", name: "Developer Tools", slug: "developer-tools" },
    ],
    tags: ["ui-generation", "react", "shadcn", "tailwind"],
    verifiedBadge: true,
    domainAuthority: 80,
    reviewScore: 4.72,
  },
  {
    id: "tool_7",
    name: "DeepSeek-R1",
    slug: "deepseek-r1",
    tagline: "Open-weights frontier reasoning engine trained through large-scale RL.",
    description: "Massively capable open-weights reasoning model matching closed-source frontier architectures in competitive programming and mathematical proof.",
    websiteUrl: "https://deepseek.com",
    pricingType: "FREE",
    startingPrice: 0,
    categories: [
      { id: "cat_3", name: "LLMs & Reasoning", slug: "llms" },
    ],
    tags: ["open-weights", "reinforcement-learning", "math", "reasoning"],
    verifiedBadge: true,
    domainAuthority: 79,
    reviewScore: 4.91,
  },
  {
    id: "tool_8",
    name: "Flux.1 Schnell",
    slug: "flux-schnell",
    tagline: "Next-gen open-weights rectified flow transformer for image generation.",
    description: "12B parameter rectified flow transformer for lightning-speed photorealistic image generation, permissive Apache 2.0 license, and zero watermarks.",
    websiteUrl: "https://blackforestlabs.ai",
    pricingType: "FREE",
    startingPrice: 0,
    categories: [
      { id: "cat_4", name: "Generative Art", slug: "art" },
    ],
    tags: ["open-weights", "free", "no-watermark", "commercial-rights"],
    verifiedBadge: true,
    domainAuthority: 76,
    reviewScore: 4.90,
  },
];

const CATEGORIES = [
  { id: "ALL", name: "All Tools", icon: Layers },
  { id: "coding-agents", name: "Coding Agents", icon: Code2 },
  { id: "llms-reasoning", name: "LLMs & Reasoning", icon: Brain },
  { id: "generative-art", name: "Generative Art & 3D", icon: Video },
  { id: "research-search", name: "Research & Search", icon: Search },
  { id: "voice-audio", name: "Voice & Audio", icon: Mic },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedPricing, setSelectedPricing] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Comparison selection
  const [compareList, setCompareList] = useState<ToolCardData[]>([
    INITIAL_TOOLS[0], // Cursor
    INITIAL_TOOLS[1], // Claude 3.7
  ]);

  const handleToggleCompare = (tool: ToolCardData) => {
    if (compareList.some((t) => t.id === tool.id)) {
      setCompareList(compareList.filter((t) => t.id !== tool.id));
    } else {
      if (compareList.length >= 2) {
        setCompareList([compareList[1], tool]);
      } else {
        setCompareList([...compareList, tool]);
      }
    }
  };

  const filteredTools = useMemo(() => {
    return INITIAL_TOOLS.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "ALL" ||
        tool.categories.some((c) => c.slug === selectedCategory);

      const matchesPricing =
        selectedPricing === "ALL" || tool.pricingType === selectedPricing;

      const matchesVerified = !onlyVerified || tool.verifiedBadge;

      return matchesSearch && matchesCategory && matchesPricing && matchesVerified;
    });
  }, [searchQuery, selectedCategory, selectedPricing, onlyVerified]);

  return (
    <div className="relative min-h-screen">
      {/* Interactive Subtle Vector Network Grid (Parallax Cursor Reaction) */}
      <InteractiveVectorGrid />

      {/* HERO SECTION - Clean Enterprise B2B Aesthetic */}
      <section className="relative pt-16 pb-16 sm:pt-24 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Value-Driven Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3.5 py-1 text-xs text-stone-700 dark:text-stone-300 shadow-xs"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span className="font-semibold text-stone-900 dark:text-white">The Independent AI Directory</span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="text-stone-500 dark:text-stone-400">1,500+ Curated Tools &amp; Models</span>
          </motion.div>

          {/* Crisp Headings - Clean High Contrast */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 dark:text-white sm:text-6xl"
          >
            Find the right AI tool for your workflow
          </motion.h1>

          {/* Clean Muted Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.18 }}
            className="mx-auto mt-5 max-w-2xl text-base text-stone-600 dark:text-stone-400 leading-relaxed"
          >
            Discover, evaluate, and compare verified artificial intelligence software, frontier foundation models, and coding agents with transparent pricing and real benchmarks.
          </motion.p>

          {/* CONVERSATIONAL AI AGENT FINDER */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-8"
          >
            <AgentBar />
          </motion.div>

          {/* REAL BUSINESS METRICS SECTION */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 text-left transition-colors hover:border-amber-500/30 shadow-xs dark:shadow-none">
              <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">1,500+</div>
              <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">Curated AI Tools &amp; Models</div>
            </div>
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 text-left transition-colors hover:border-amber-500/30 shadow-xs dark:shadow-none">
              <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">18</div>
              <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">Specialized Categories</div>
            </div>
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 text-left transition-colors hover:border-amber-500/30 shadow-xs dark:shadow-none">
              <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">Real-Time</div>
              <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">Latency &amp; Speed Telemetry</div>
            </div>
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 text-left transition-colors hover:border-amber-500/30 shadow-xs dark:shadow-none">
              <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">12 Hours</div>
              <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">Priority Review SLA</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TOP NEW PRODUCT LAUNCHES LEADERBOARD */}
      <TopProductLaunches />

      {/* HEAD-TO-HEAD COMPARISON MATRIX PREVIEW */}
      <section id="compare" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-7 shadow-xs dark:shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Side-by-Side Matrix
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">Objective Benchmarks</span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-stone-900 dark:text-white tracking-tight">
                Compare AI Models Side-by-Side
              </h2>
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 max-w-sm">
              Click &quot;Compare&quot; on any card below to swap candidates into this live comparison engine.
            </div>
          </div>

          {/* Comparison Cards Display using TelemetryCard */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {compareList.map((tool, idx) => (
              <TelemetryCard
                key={tool.id}
                tool={tool}
                candidateIndex={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MAIN DIRECTORY EXPLORER */}
      <section id="explore" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Category Filter Pills (Warm Stone & Amber) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-150 shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-stone-900 text-white border border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-200 shadow-xs"
                    : "border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:border-amber-500/50 hover:text-stone-950 dark:hover:text-stone-100"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-amber-500 dark:text-amber-600" : "text-stone-400 dark:text-stone-500"}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
          <Link
            href="/categories"
            className="flex items-center gap-1.5 rounded-lg border border-dashed border-amber-300 dark:border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-800 dark:text-amber-400 hover:bg-amber-500/20 shrink-0 transition-colors"
          >
            <span>All Categories Hub</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Filter Controls Row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-3.5 shadow-xs">
          {/* Pricing Tabs */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-stone-500 dark:text-stone-400 text-[11px] uppercase font-mono mr-1">Pricing:</span>
            {["ALL", "FREE", "FREEMIUM", "PAID"].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPricing(p)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                  selectedPricing === p
                    ? "bg-stone-900 text-white border border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-200 shadow-xs"
                    : "text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Verified Filter & Count */}
          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-stone-700 dark:text-stone-300 select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="rounded border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-amber-600 focus:ring-0 accent-amber-600"
              />
              <span className="flex items-center gap-1 text-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" />
                Verified Only
              </span>
            </label>

            <span className="text-stone-500 font-mono text-[11px]">
              Showing <span className="text-stone-900 dark:text-stone-200 font-medium">{filteredTools.length}</span> tools
            </span>
          </div>
        </div>

        {/* Tools Cards Grid with Staggered Framer Motion Animations */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06 },
            },
          }}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
              }}
            >
              <ToolCard tool={tool} onCompare={handleToggleCompare} />
            </motion.div>
          ))}
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="mt-8 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] py-14 text-center">
            <Layers className="mx-auto h-8 w-8 text-stone-400" />
            <h3 className="mt-3 text-sm font-semibold text-stone-900 dark:text-white">No tools found</h3>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Try adjusting your search query, pricing filter, or verified badge toggle.
            </p>
          </div>
        )}
      </section>

      {/* WHY TEAMS TRUST LISTAIASSETS & FOUNDER CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              Editorial Standards
            </span>
            <h2 className="mt-3 text-2xl font-bold text-stone-900 dark:text-white tracking-tight sm:text-3xl">
              Independent, Verified, and Data-Driven
            </h2>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              ListAIAssets helps engineering teams and founders find the right AI software without wading through sponsored marketing hype. We evaluate real response speeds, compare token economics, and verify developer utility.
            </p>

            <div className="mt-6 space-y-3 text-xs text-stone-700 dark:text-stone-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <span>Empirical latency, TTFT, and code accuracy benchmarks</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <span>Direct links to official documentation, APIs, and GitHub repositories</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <span>Community-audited with authentic ratings from verified developers</span>
              </div>
            </div>
          </div>

          {/* Founder Submission CTA Card */}
          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-7 shadow-xs dark:shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                For Founders &amp; Creators
              </span>
              <Badge variant="amber" size="sm">
                Open for Submissions
              </Badge>
            </div>

            <h3 className="mt-3 text-xl font-bold text-stone-900 dark:text-white">
              Building an AI model, agent, or tool?
            </h3>
            <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Showcase your product in front of 35,000+ active software engineers, tech buyers, and decision-makers looking for AI solutions.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-amber-500 shadow-xs active:scale-[0.98]"
              >
                <span>Submit Your AI Tool</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <span className="text-[11px] text-stone-500">
                12-Hour Priority Review available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </div>
  );
}
