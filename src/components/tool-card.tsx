"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  ShieldCheck,
  GitCompare,
} from "lucide-react";
import { Badge } from "./badge";
import { formatPrice } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/BrandLogos";
import {
  CodeBracketsSvg,
  NeuralNetworkSvg,
  GenerativeCanvasSvg,
  TelemetryChartSvg,
  AudioWaveSvg,
  SearchGraphSvg,
} from "@/components/ui/MicroIllustrations";

export interface ToolCardData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  websiteUrl: string;
  logoUrl?: string | null;
  pricingType: "FREE" | "FREEMIUM" | "PAID" | "TRIAL";
  startingPrice?: number | null;
  categories: { id: string; name: string; slug: string }[];
  tags: string[];
  verifiedBadge: boolean;
  domainAuthority?: number | null;
  reviewScore: number;
  dealPercent?: number | null;
}

interface ToolCardProps {
  tool: ToolCardData;
  onCompare?: (tool: ToolCardData) => void;
}

export function ToolCard({ tool, onCompare }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "FREE":
        return "neutral";
      case "FREEMIUM":
        return "amber";
      case "TRIAL":
        return "amber";
      default:
        return "neutral";
    }
  };

  // Render category-specific animated SVG illustration
  const renderCategoryIcon = () => {
    const iconClass = "h-3.5 w-3.5 text-stone-500 dark:text-stone-400";
    const catSlug = tool.categories[0]?.slug?.toLowerCase() || "";
    if (catSlug.includes("coding") || catSlug.includes("dev")) {
      return <CodeBracketsSvg isHovered={isHovered} className={iconClass} />;
    }
    if (catSlug.includes("llm") || catSlug.includes("reasoning")) {
      return <NeuralNetworkSvg isHovered={isHovered} className={iconClass} />;
    }
    if (catSlug.includes("art") || catSlug.includes("video") || catSlug.includes("design")) {
      return <GenerativeCanvasSvg isHovered={isHovered} className={iconClass} />;
    }
    if (catSlug.includes("audio") || catSlug.includes("voice")) {
      return <AudioWaveSvg isHovered={isHovered} className={iconClass} />;
    }
    if (catSlug.includes("search")) {
      return <SearchGraphSvg isHovered={isHovered} className={iconClass} />;
    }
    return <TelemetryChartSvg isHovered={isHovered} className={iconClass} />;
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="group relative flex flex-col justify-between rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 shadow-xs transition-colors duration-150 hover:border-amber-500/40 dark:hover:border-amber-500/40 hover:shadow-md dark:hover:shadow-black/50"
    >
      <div>
        {/* Card Header: Authentic Brand Logo, Name, Verified Badge, Rating */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Authentic Brand Logo */}
            <Link
              href={`/tools/${tool.slug}`}
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-xs transition-transform duration-200 group-hover:scale-105"
            >
              <BrandLogo slug={tool.slug || tool.name} size={44} className="h-full w-full" />
            </Link>

            <div>
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="font-semibold text-stone-900 dark:text-stone-100 tracking-tight text-sm hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  {tool.name}
                </Link>
                {tool.verifiedBadge && (
                  <span title="Verified Directory Tool">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 font-medium">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
                  {tool.reviewScore.toFixed(1)}
                </div>
                {tool.domainAuthority && (
                  <span className="text-[10px] text-stone-500 font-mono">
                    DA {tool.domainAuthority}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Deal Badges */}
          <div className="flex flex-col items-end gap-1.5">
            <Badge variant={getBadgeVariant(tool.pricingType)} size="sm">
              {tool.pricingType}
            </Badge>
            {tool.dealPercent && (
              <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-mono font-medium text-amber-700 dark:text-amber-400 border border-amber-500/25">
                {tool.dealPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-3 text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
          {tool.tagline}
        </p>

        {/* Category & Tags with Micro-Illustrations */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {tool.categories.slice(0, 2).map((cat, idx) => (
            <span
              key={cat.id}
              className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 px-2 py-0.5 text-[10px] font-medium text-stone-700 dark:text-stone-300"
            >
              {idx === 0 && renderCategoryIcon()}
              <span>{cat.name}</span>
            </span>
          ))}
          {tool.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-50 dark:bg-stone-900/40 px-1.5 py-0.5 text-[10px] text-stone-500 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Starting Price & Quick Actions */}
      <div className="mt-5 flex items-center justify-between border-t border-stone-200 dark:border-stone-800/80 pt-3.5 text-xs">
        <div>
          <span className="text-[10px] uppercase text-stone-500 block font-mono">Pricing</span>
          <span className="font-semibold text-stone-900 dark:text-stone-100 font-mono">
            {formatPrice(tool.startingPrice, tool.pricingType)}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href={`/tools/${tool.slug}`}
            className="flex items-center gap-1 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/60 px-2.5 py-1.5 text-[11px] text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Overview</span>
          </Link>

          {onCompare && (
            <button
              onClick={() => onCompare(tool)}
              title="Add to Head-to-Head Comparison"
              className="flex items-center gap-1 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/60 px-2.5 py-1.5 text-[11px] text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <GitCompare className="h-3 w-3 text-stone-500 dark:text-stone-400" />
              <span>Compare</span>
            </button>
          )}

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md bg-stone-900 text-stone-100 dark:bg-stone-800 hover:bg-amber-600 dark:hover:bg-amber-600 px-3 py-1.5 text-[11px] font-medium transition-colors"
          >
            <span>Visit</span>
            <ExternalLink className="h-3 w-3 text-stone-400" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
