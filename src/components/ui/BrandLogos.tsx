"use client";

import React from "react";

interface BrandLogoProps {
  slug: string;
  className?: string;
  size?: number;
}

export function BrandLogo({ slug, className = "h-6 w-6", size = 24 }: BrandLogoProps) {
  const normalized = slug.toLowerCase();

  // 0. ListAIAssets official badge (3D Isometric Asset Matrix)
  if (normalized.includes("listaiassets") || normalized.includes("list-ai-assets")) {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
      >
        <defs>
          <linearGradient id="bl-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="bl-plate" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#d6d3d1" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="96" height="96" rx="23" fill="#14151b" stroke="#292524" strokeWidth="2.5" />
        <path d="M 50 76 L 76 63 L 76 69 L 50 82 L 24 69 L 24 63 Z" fill="#44403c" />
        <path d="M 50 63 L 76 50 L 50 37 L 24 50 Z" fill="#292524" stroke="#44403c" strokeWidth="1.5" />
        <path d="M 50 62 L 76 49 L 76 55 L 50 68 L 24 55 L 24 49 Z" fill="#a8a29e" />
        <path d="M 50 49 L 76 36 L 50 23 L 24 36 Z" fill="url(#bl-plate)" />
        <path d="M 50 47 L 76 34 L 76 39 L 50 52 L 24 39 L 24 34 Z" fill="#c2410c" />
        <path d="M 50 34 L 76 21 L 50 8 L 24 21 Z" fill="url(#bl-amber)" />
        <path d="M 80 12 C 80 16 83.5 19.5 87.5 19.5 C 83.5 19.5 80 23 80 27 C 80 23 76.5 19.5 72.5 19.5 C 76.5 19.5 80 16 80 12 Z" fill="#fbbf24" />
      </svg>
    );
  }

  // 1. Cursor AI - Isometric Wireframe Cube / 3D Pointer
  if (normalized.includes("cursor")) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
      >
        <rect width="32" height="32" rx="7" fill="#000000" />
        <path
          d="M16 6L25 11.2V21.6L16 26.8L7 21.6V11.2L16 6Z"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M16 6V16.4M25 11.2L16 16.4M7 11.2L16 16.4M16 16.4L16 26.8"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <polygon points="16,16.4 25,11.2 25,21.6 16,26.8" fill="#FFFFFF" fillOpacity="0.15" />
      </svg>
    );
  }

  // 2. Claude / Anthropic - Terracotta Starburst / Radial Sun
  if (normalized.includes("claude") || normalized.includes("anthropic")) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
      >
        <rect width="32" height="32" rx="7" fill="#CC5500" />
        {/* Anthropic / Claude iconic multi-ray starburst */}
        <g fill="#FFFFFF">
          <circle cx="16" cy="16" r="3" />
          <path d="M16 7C16.8 7 17.5 9 17.5 11C17.5 13 16.8 13.5 16 13.5C15.2 13.5 14.5 13 14.5 11C14.5 9 15.2 7 16 7Z" />
          <path d="M16 25C16.8 25 17.5 23 17.5 21C17.5 19 16.8 18.5 16 18.5C15.2 18.5 14.5 19 14.5 21C14.5 23 15.2 25 16 25Z" />
          <path d="M7 16C7 15.2 9 14.5 11 14.5C13 14.5 13.5 15.2 13.5 16C13.5 16.8 13 17.5 11 17.5C9 17.5 7 16.8 7 16Z" />
          <path d="M25 16C25 15.2 23 14.5 21 14.5C19 14.5 18.5 15.2 18.5 16C18.5 16.8 19 17.5 21 17.5C23 17.5 25 16.8 25 16Z" />
          <path d="M9.6 9.6C10.2 9 11.8 10.3 13 11.5C14.2 12.7 14 13.7 13.4 14.3C12.8 14.9 11.8 14.5 10.6 13.3C9.4 12.1 9 10.2 9.6 9.6Z" />
          <path d="M22.4 22.4C21.8 23 20.2 21.7 19 20.5C17.8 19.3 18 18.3 18.6 17.7C19.2 17.1 20.2 17.5 21.4 18.7C22.6 19.9 23 21.8 22.4 22.4Z" />
          <path d="M22.4 9.6C23 10.2 21.7 11.8 20.5 13C19.3 14.2 18.3 14 17.7 13.4C17.1 12.8 17.5 11.8 18.7 10.6C19.9 9.4 21.8 9 22.4 9.6Z" />
          <path d="M9.6 22.4C9 21.8 10.3 20.2 11.5 19C12.7 17.8 13.7 18 14.3 18.6C14.9 19.2 14.5 20.2 13.3 21.4C12.1 22.6 10.2 23 9.6 22.4Z" />
        </g>
      </svg>
    );
  }

  // 3. Midjourney - Iconic Origami Sailboat on Water
  if (normalized.includes("midjourney")) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
      >
        <rect width="32" height="32" rx="7" fill="#0B132B" />
        {/* Midjourney Sailboat Silhouette */}
        <path
          d="M16 6L24 19H8L16 6Z"
          fill="#FFFFFF"
          fillOpacity="0.9"
        />
        <path
          d="M16 6V19L21 16L16 6Z"
          fill="#D4E0EE"
        />
        <path
          d="M7 21L16 25L25 21L23 23L16 26.5L9 23L7 21Z"
          fill="#FFFFFF"
        />
        <path
          d="M10 24L16 27L22 24"
          stroke="#48CAE4"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 4. DeepSeek - Iconic Blue Whale / Fin
  if (normalized.includes("deepseek")) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
      >
        <rect width="32" height="32" rx="7" fill="#1E40AF" />
        {/* DeepSeek leaping whale emblem */}
        <path
          d="M24 16.5C23.5 13.5 21 10.5 17.5 9.5C14.5 8.5 11 9.5 9 12C7.5 14 7 16.5 7.5 19C8 21.5 10 23.5 13 24C16.5 24.5 20.5 23 23 20L25 21.5L24.5 18L24 16.5Z"
          fill="#60A5FA"
        />
        <path
          d="M10 18.5C12 19 14.5 18.5 16 17.5C17.5 16.5 18.5 15 19.5 13C17 13.5 14.5 14.5 13 16C11.5 17.5 10.5 18 10 18.5Z"
          fill="#FFFFFF"
        />
        <circle cx="11.5" cy="14.5" r="1" fill="#1E3A8A" />
      </svg>
    );
  }

  // 5. Perplexity Pro - Interlocking Asterisk Knot
  if (normalized.includes("perplexity")) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
      >
        <rect width="32" height="32" rx="7" fill="#134E4A" />
        {/* Perplexity infinite woven geometric emblem */}
        <g stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="16" y1="7" x2="16" y2="25" />
          <line x1="7" y1="16" x2="25" y2="16" />
          <path d="M10 10L22 22" />
          <path d="M22 10L10 22" />
          <circle cx="16" cy="16" r="3" fill="#134E4A" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }

  // 6. ElevenLabs - Dual Equalizer Bars
  if (normalized.includes("elevenlabs")) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
      >
        <rect width="32" height="32" rx="7" fill="#000000" />
        {/* ElevenLabs double vertical bars || */}
        <rect x="11.5" y="8" width="3" height="16" rx="1.5" fill="#FFFFFF" />
        <rect x="17.5" y="8" width="3" height="16" rx="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // 7. v0 by Vercel - Iconic Vercel Triangle Monolith
  if (normalized.includes("v0") || normalized.includes("vercel")) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
      >
        <rect width="32" height="32" rx="7" fill="#000000" />
        <path d="M16 8L25 24H7L16 8Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 8. Runway - Bold Stylized Motion 'R'
  if (normalized.includes("runway")) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
      >
        <rect width="32" height="32" rx="7" fill="#18181B" />
        <path
          d="M10 8H17C19.7614 8 22 10.2386 22 13C22 15.7614 19.7614 18 17 18H13V24H10V8Z"
          fill="#F43F5E"
        />
        <path
          d="M17 18L22.5 24H18.5L13.5 18H17Z"
          fill="#FB7185"
        />
        <circle cx="15.5" cy="13" r="2" fill="#18181B" />
      </svg>
    );
  }

  // 9. Flux.1 Schnell / Black Forest Labs - Hexagonal Optical Flow Transformer
  if (normalized.includes("flux") || normalized.includes("blackforest")) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
      >
        <rect width="32" height="32" rx="7" fill="#09090B" />
        {/* Hexagonal optic prism */}
        <polygon
          points="16,6 25,11 25,21 16,26 7,21 7,11"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16" r="4.5" fill="#10B981" fillOpacity="0.8" />
        <line x1="16" y1="6" x2="16" y2="11.5" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="25" y1="21" x2="19.5" y2="18" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="7" y1="21" x2="12.5" y2="18" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>
    );
  }

  // 10. OpenAI / ChatGPT
  if (normalized.includes("openai") || normalized.includes("chatgpt") || normalized.includes("gpt")) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
      >
        <rect width="32" height="32" rx="7" fill="#10A37F" />
        <path
          d="M16 8C13.5 8 11.5 9.5 10.5 11.5C9.5 11 8 11.5 7.5 12.8C6.8 14.2 7.2 16 8 17C7.5 18 7.5 19.5 8.2 20.8C9 22 10.5 22.8 12 22.5C12.8 23.8 14.2 24.5 16 24.5C18.5 24.5 20.5 23 21.5 21C22.5 21.5 24 21 24.5 19.7C25.2 18.3 24.8 16.5 24 15.5C24.5 14.5 24.5 13 23.8 11.7C23 10.5 21.5 9.7 20 10C19.2 8.7 17.8 8 16 8Z"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // 11. Notion AI
  if (normalized.includes("notion")) {
    return (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
        <rect width="32" height="32" rx="7" fill="#000000" />
        <path d="M8 8.5L20.5 7L24 10V24.5L14 26L8 23V8.5Z" fill="#FFFFFF" fillOpacity="0.1" />
        <path d="M10 10.5L13.5 10L21 21.5V11.5H23V23.5L19.5 24L12 12.5V22.5H10V10.5Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 12. GitHub Copilot
  if (normalized.includes("github") || normalized.includes("copilot")) {
    return (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
        <rect width="32" height="32" rx="7" fill="#24292F" />
        <path d="M16 8C11.58 8 8 11.58 8 16C8 19.54 10.29 22.53 13.47 23.59C13.87 23.66 14.02 23.42 14.02 23.21C14.02 23.02 14.01 22.38 14.01 21.58C12 21.94 11.44 20.98 11.28 20.53C11.19 20.3 10.8 19.59 10.46 19.4C10.18 19.25 9.78 18.88 10.45 18.87C11.08 18.86 11.53 19.45 11.68 19.69C12.4 20.9 13.55 20.56 14.01 20.35C14.08 19.83 14.29 19.48 14.52 19.28C12.76 19.08 10.91 18.4 10.91 15.38C10.91 14.52 11.22 13.82 11.72 13.27C11.64 13.07 11.37 12.27 11.8 11.19C11.8 11.19 12.46 10.98 13.96 12C14.59 11.83 15.26 11.74 15.93 11.74C16.6 11.74 17.27 11.83 17.9 12C19.4 10.97 20.06 11.19 20.06 11.19C20.49 12.27 20.22 13.07 20.14 13.27C20.64 13.82 20.95 14.51 20.95 15.38C20.95 18.41 19.09 19.08 17.33 19.28C17.62 19.53 17.87 20.01 17.87 20.76C17.87 21.84 17.86 22.71 17.86 22.98C17.86 23.2 18 23.45 18.41 23.37C21.6 22.31 23.89 19.31 23.89 15.78C23.89 11.58 20.31 8 16 8Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 13. Jasper AI
  if (normalized.includes("jasper")) {
    return (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
        <rect width="32" height="32" rx="7" fill="#6366F1" />
        <circle cx="16" cy="16" r="6" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M12 16L15 19L21 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 14. Intercom / Fin
  if (normalized.includes("fin") || normalized.includes("intercom")) {
    return (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
        <rect width="32" height="32" rx="7" fill="#0057FF" />
        <rect x="9" y="11" width="3" height="10" rx="1.5" fill="#FFFFFF" />
        <rect x="14.5" y="8" width="3" height="16" rx="1.5" fill="#FFFFFF" />
        <rect x="20" y="11" width="3" height="10" rx="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // 15. Make / Automation
  if (normalized.includes("make") || normalized.includes("integromat")) {
    return (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
        <rect width="32" height="32" rx="7" fill="#6D3AEC" />
        <circle cx="12" cy="16" r="3.5" fill="#FFFFFF" />
        <circle cx="20" cy="16" r="3.5" fill="#FFFFFF" />
        <path d="M12 16C12 12.5 20 12.5 20 16" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    );
  }
  const letter = (slug || "AI").slice(0, 2).toUpperCase();
  return (
    <div
      role="img"
      aria-label={`${slug || "AI"} logo`}
      className={`flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-700 font-mono font-bold text-white shadow-xs ${className}`}
      style={{ width: size, height: size, fontSize: Math.floor(size * 0.42) }}
    >
      {letter}
    </div>
  );
}
