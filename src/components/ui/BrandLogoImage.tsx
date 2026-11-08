"use client";

import React from "react";
import { BrandLogo } from "./BrandLogo";

interface BrandLogoImageProps {
  className?: string;
  height?: number;
  width?: number;
  variant?: "full" | "icon";
  priority?: boolean;
}

/**
 * High-performance vector SVG logo renderer for ListAIAssets
 * Renders vector SVG natively without blurriness or pixelation on any display
 */
export function BrandLogoImage({
  className = "",
  height = 32,
  variant = "full",
}: BrandLogoImageProps) {
  return <BrandLogo size={height} variant={variant} className={className} />;
}

export { BrandLogo };
