"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Globe,
  ArrowRight,
  Mail,
  ExternalLink,
  Flame,
  FileCheck,
} from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "paid";
  const plan = searchParams.get("plan") || "fast_track";
  const slug = searchParams.get("slug") || "your-tool";
  const toolName = searchParams.get("toolName") || "Your AI Product";
  const websiteUrl = searchParams.get("websiteUrl") || "";
  const sessionId = searchParams.get("session_id") || searchParams.get("mock_session") || "LAA-TX-84920";

  const isPaid = type === "paid" || plan === "fast_track" || plan === "featured";
  const planTitle =
    plan === "featured"
      ? "Featured Spotlight ($199)"
      : plan === "fast_track"
      ? "Fast Track ($75)"
      : "Free Community ($0)";

  return (
    <div className="mx-auto max-w-3xl py-12 px-4 sm:px-6">
      {/* Top Success Badge & Title */}
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-xs">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {isPaid ? "Payment Confirmed & Verified" : "Submission Received"}
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-3xl">
          {isPaid
            ? "Your AI tool is scheduled for priority publishing!"
            : "Your AI tool has entered the community review queue"}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-lg mx-auto">
          {isPaid
            ? "Thank you for your order. Our editorial and technical team is preparing your verified profile and high-authority Do-Follow backlink."
            : "Thank you for contributing to ListAIAssets. Community listings are reviewed and indexed on a rolling basis."}
        </p>
      </div>

      {/* Order & Summary Card */}
      <div className="mt-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase text-stone-500 dark:text-stone-400">
              Reference ID
            </span>
            <div className="text-xs font-mono font-bold text-stone-800 dark:text-stone-200">
              {sessionId.length > 20 ? sessionId.slice(0, 20) + "..." : sessionId}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-mono uppercase text-stone-500 dark:text-stone-400">
              Review SLA
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{isPaid ? "Guaranteed ≤ 12 Hours" : "7–10 Business Days"}</span>
            </div>
          </div>
        </div>

        {/* Detailed Spec List */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-100 dark:border-stone-800/80">
            <span className="text-stone-500 text-[11px] block">Submitted Tool</span>
            <span className="font-semibold text-stone-900 dark:text-white text-sm mt-0.5 block">
              {toolName}
            </span>
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline font-mono text-[11px]"
              >
                <span>{websiteUrl}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-100 dark:border-stone-800/80">
            <span className="text-stone-500 text-[11px] block">Publishing Plan</span>
            <span className="font-semibold text-stone-900 dark:text-white text-sm mt-0.5 block">
              {planTitle}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block mt-1">
              {isPaid ? "✓ Permanent Do-Follow SEO Backlink Included" : "Standard No-Follow Link"}
            </span>
          </div>
        </div>

        {/* What Happens Next Roadmap */}
        <div className="mt-6 border-t border-stone-200 dark:border-stone-800 pt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white mb-3">
            What Happens Next
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-xs">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-stone-950 font-bold font-mono text-[11px]">
                1
              </div>
              <div>
                <strong className="text-stone-900 dark:text-white">Editorial Quality &amp; Metadata Review</strong>
                <p className="text-stone-500 dark:text-stone-400 mt-0.5 text-[11px] leading-relaxed">
                  Our engineering team verifies your category placement, validates technical tags, and generates high-resolution vector and Retina badges.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300 font-bold font-mono text-[11px]">
                2
              </div>
              <div>
                <strong className="text-stone-900 dark:text-white">Live URL Deployment</strong>
                <p className="text-stone-500 dark:text-stone-400 mt-0.5 text-[11px] leading-relaxed">
                  Your official directory listing goes live with full schema markup (JSON-LD) and your Do-Follow backlink pointing directly to your domain.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300 font-bold font-mono text-[11px]">
                3
              </div>
              <div>
                <strong className="text-stone-900 dark:text-white">Search Indexing &amp; Distribution</strong>
                <p className="text-stone-500 dark:text-stone-400 mt-0.5 text-[11px] leading-relaxed">
                  Your listing is pushed to Google Search Console and added to our machine-readable AI feeds (<code className="text-[10px]">llms.txt</code>) so AI search engines cite your product.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Edit & Support Note */}
        <div className="mt-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-semibold text-stone-900 dark:text-white">Need to update your copy or logo?</span>
            <p className="text-stone-500 text-[11px] mt-0.5">
              Email our editorial team directly at <strong className="text-stone-800 dark:text-stone-200">team@listaiassets.com</strong> with your tool name.
            </p>
          </div>
          <a
            href="mailto:team@listaiassets.com"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline shrink-0"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Contact Editorial</span>
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/tools"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-amber-500 shadow-xs"
        >
          <span>Explore Live Directory</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <span>Submit Another Tool</span>
        </Link>
      </div>
    </div>
  );
}

export default function SubmitSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-stone-500">Loading order details...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

