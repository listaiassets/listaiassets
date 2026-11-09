"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Check, Copy, ExternalLink, Share2 } from "lucide-react";

interface ToolInteractiveActionsProps {
  toolId: string;
  toolName: string;
  initialUpvotes: number;
  websiteUrl: string;
  variant?: "header" | "sidebar";
}

export function ToolInteractiveActions({
  toolId,
  toolName,
  initialUpvotes,
  websiteUrl,
  variant = "header",
}: ToolInteractiveActionsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`upvote_${toolId}`);
      if (stored === "true") {
        setHasUpvoted(true);
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, [toolId]);

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes((prev) => Math.max(0, prev - 1));
      setHasUpvoted(false);
      try {
        localStorage.removeItem(`upvote_${toolId}`);
      } catch {}
    } else {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
      try {
        localStorage.setItem(`upvote_${toolId}`, "true");
      } catch {}
    }
  };

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  const handleShareX = () => {
    if (typeof window === "undefined") return;
    const text = encodeURIComponent(`Check out ${toolName} on ListAIAssets - independent AI directory:`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer");
  };

  const handleShareLinkedIn = () => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
  };

  if (variant === "sidebar") {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleShareX}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="font-bold">𝕏</span>
            <span>Post</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-stone-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
      {/* Primary Action Row: Visit Website + Upvote */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-500 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all active:scale-[0.98] cursor-pointer text-center"
        >
          <span>Visit website</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>

        {/* Upvote Button */}
        <button
          type="button"
          onClick={handleUpvote}
          aria-label="Upvote this AI tool"
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 sm:px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 ${
            hasUpvoted
              ? "border-amber-500 bg-amber-500 text-white shadow-xs"
              : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] text-stone-800 dark:text-stone-200 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400"
          }`}
        >
          <ArrowUp className={`h-4 w-4 ${hasUpvoted ? "stroke-[2.5]" : ""}`} />
          <span className="font-mono">{upvotes.toLocaleString()}</span>
        </button>
      </div>

      {/* Secondary Share Action Row */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {/* Share to X */}
        <button
          type="button"
          onClick={handleShareX}
          title="Share on X"
          aria-label="Share on X"
          className="flex-1 sm:flex-initial inline-flex h-10 w-10 sm:w-10 items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] text-xs font-bold text-stone-700 dark:text-stone-300 hover:border-amber-500/50 hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
        >
          𝕏
        </button>

        {/* Share to LinkedIn */}
        <button
          type="button"
          onClick={handleShareLinkedIn}
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
          className="flex-1 sm:flex-initial inline-flex h-10 w-10 sm:w-10 items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] text-xs font-bold text-stone-700 dark:text-stone-300 hover:border-amber-500/50 hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
        >
          in
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          title="Copy listing URL"
          aria-label="Copy listing URL"
          className="flex-1 sm:flex-initial inline-flex h-10 px-3 sm:px-0 sm:w-10 items-center justify-center gap-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] text-stone-600 dark:text-stone-400 hover:border-amber-500/50 hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-500" />
              <span className="sm:hidden text-xs font-semibold text-emerald-600 dark:text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-stone-400" />
              <span className="sm:hidden text-xs">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

