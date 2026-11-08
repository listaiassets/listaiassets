"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: number; // Height in pixels for the logo
  variant?: "full" | "icon" | "text";
}

/**
 * Official Vector SVG Brand Identity for ListAIAssets (listaiassets.com)
 * Concept: The "Asset Matrix / Layered Prism"
 * - 3D Isometric modular asset stack representing models, agents, and prompts
 * - Luminous Warm Amber AI Core calibrated with the site's editorial theme (#fbbf24 -> #f59e0b -> #ea580c)
 * - Ultra-crisp rendering on 1x, 2x Retina, and 4K displays
 * - Dark & light mode aware via CSS fill classes
 * - Zero pixelation, zero layout shift
 */
export function BrandLogo({
  className = "",
  size = 32,
  variant = "full",
}: BrandLogoProps) {
  // 1. Icon-only variant (App icon squircle with 3D Isometric AI Asset Prism)
  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="ListAIAssets Icon"
        role="img"
      >
        <defs>
          <linearGradient id="la-icon-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#181a20" />
            <stop offset="100%" stopColor="#0c0d11" />
          </linearGradient>
          <linearGradient id="la-icon-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="la-icon-plate" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#d6d3d1" stopOpacity="0.8" />
          </linearGradient>
          <filter id="la-icon-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Dark Squircle Container */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="23"
          fill="url(#la-icon-bg)"
          stroke="#27272a"
          strokeWidth="2"
        />

        {/* Bottom Foundation Asset Layer */}
        <path d="M 50 76 L 76 63 L 76 69 L 50 82 L 24 69 L 24 63 Z" fill="#44403c" />
        <path d="M 50 63 L 76 50 L 50 37 L 24 50 Z" fill="#292524" stroke="#44403c" strokeWidth="1.5" />

        {/* Middle Asset Layer (Verified Steel Plate) */}
        <path d="M 50 62 L 76 49 L 76 55 L 50 68 L 24 55 L 24 49 Z" fill="#a8a29e" />
        <path d="M 50 49 L 76 36 L 50 23 L 24 36 Z" fill="url(#la-icon-plate)" />

        {/* Top Floating AI Core (Warm Amber Luminous Prism) */}
        <path d="M 50 47 L 76 34 L 76 39 L 50 52 L 24 39 L 24 34 Z" fill="#c2410c" />
        <path d="M 50 34 L 76 21 L 50 8 L 24 21 Z" fill="url(#la-icon-amber)" filter="url(#la-icon-glow)" />

        {/* AI Diamond Sparkle */}
        <path
          d="M 80 12 C 80 16 83.5 19.5 87.5 19.5 C 83.5 19.5 80 23 80 27 C 80 23 76.5 19.5 72.5 19.5 C 76.5 19.5 80 16 80 12 Z"
          fill="#fbbf24"
          filter="url(#la-icon-glow)"
        />
      </svg>
    );
  }

  // 2. Full horizontal logo (Badge + "listaiassets" + ".com")
  const width = Math.round(size * 5.6); // Proportional aspect ratio (~270x48)

  return (
    <svg
      viewBox="0 0 272 48"
      width={width}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="ListAIAssets Logo"
      role="img"
    >
      <defs>
        <linearGradient id="la-full-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#181a20" />
          <stop offset="100%" stopColor="#0c0d11" />
        </linearGradient>
        <linearGradient id="la-full-amber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="la-full-plate" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#d6d3d1" stopOpacity="0.8" />
        </linearGradient>
        <filter id="la-full-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#f59e0b" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Left Badge: 44x44 scaled */}
      <g transform="translate(2, 2) scale(0.44)">
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="23"
          fill="url(#la-full-bg)"
          stroke="#27272a"
          strokeWidth="2.5"
        />
        {/* Bottom Foundation Asset Layer */}
        <path d="M 50 76 L 76 63 L 76 69 L 50 82 L 24 69 L 24 63 Z" fill="#44403c" />
        <path d="M 50 63 L 76 50 L 50 37 L 24 50 Z" fill="#292524" stroke="#44403c" strokeWidth="1.5" />

        {/* Middle Asset Layer (Verified Steel Plate) */}
        <path d="M 50 62 L 76 49 L 76 55 L 50 68 L 24 55 L 24 49 Z" fill="#a8a29e" />
        <path d="M 50 49 L 76 36 L 50 23 L 24 36 Z" fill="url(#la-full-plate)" />

        {/* Top Floating AI Core (Warm Amber Luminous Prism) */}
        <path d="M 50 47 L 76 34 L 76 39 L 50 52 L 24 39 L 24 34 Z" fill="#c2410c" />
        <path d="M 50 34 L 76 21 L 50 8 L 24 21 Z" fill="url(#la-full-amber)" filter="url(#la-full-glow)" />

        {/* AI Diamond Sparkle */}
        <path
          d="M 80 12 C 80 16 83.5 19.5 87.5 19.5 C 83.5 19.5 80 23 80 27 C 80 23 76.5 19.5 72.5 19.5 C 76.5 19.5 80 16 80 12 Z"
          fill="#fbbf24"
          filter="url(#la-full-glow)"
        />
      </g>

      {/* Wordmark Text */}
      <text
        x="54"
        y="32"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', 'Geist', sans-serif"
        fontSize="23.5"
        fontWeight="900"
        letterSpacing="-0.035em"
      >
        {/* Adapts automatically to text-stone-900 in light and text-white in dark */}
        <tspan className="fill-stone-900 dark:fill-white transition-colors duration-150">
          listaiassets
        </tspan>
        {/* Official Warm Amber Accent */}
        <tspan fill="url(#la-full-amber)">.com</tspan>
      </text>
    </svg>
  );
}

export { BrandLogo as ListAIAssetsLogo };
