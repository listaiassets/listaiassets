"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  TrendingUp,
  MousePointerClick,
  Users,
  Eye,
  Save,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/badge";

function DashboardContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") || "featured";
  const slugParam = searchParams.get("slug") || "cursor";

  // Promo Banner State
  const [promoBanner, setPromoBanner] = useState({
    enabled: true,
    text: "Spring Developer Special: Get 25% OFF Pro Tier with code LISTAIASSETS",
    buttonText: "Claim 25% Off",
    url: "https://cursor.com/pricing",
  });

  // Discount Code State
  const [discountCode, setDiscountCode] = useState({
    code: "LISTAIASSETS25",
    discountPercent: 25,
    expiresAt: "2026-12-31",
  });

  // Embedded Lead Capture State
  const [leadWidget, setLeadWidget] = useState({
    enabled: true,
    title: "Request Enterprise Pilot & Dedicated API Keys",
    webhookUrl: "https://api.listaiassets.com/webhooks/leads",
    ctaLabel: "Submit Request",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 transition-colors duration-150">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              {planParam.replace("_", " ").toUpperCase()} PLAN
            </span>
            <span className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Verified &amp; Claimed
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-stone-900 dark:text-white tracking-tight sm:text-3xl">
            Vendor Telemetry &amp; Lead Studio
          </h1>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            Real-time analytics and promotional tools for{" "}
            <strong className="text-stone-800 dark:text-stone-200 font-mono">/{slugParam}</strong>
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-medium text-white transition-all hover:bg-amber-500 cursor-pointer shadow-sm active:scale-[0.98]"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Saved Changes</span>
            </>
          ) : (
            <>
              <Save className="h-3.5 w-3.5" />
              <span>Save Configuration</span>
            </>
          )}
        </button>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Profile Impressions
            </span>
            <Eye className="h-4 w-4 text-stone-400 dark:text-stone-500" />
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-stone-900 dark:text-white">18,420</span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">+28.4%</span>
          </div>
          <p className="mt-1 text-[11px] text-stone-500">Last 30 days in catalog</p>
        </div>

        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Outbound Clicks
            </span>
            <MousePointerClick className="h-4 w-4 text-stone-400 dark:text-stone-500" />
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-stone-900 dark:text-white">4,190</span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">+19.2%</span>
          </div>
          <p className="mt-1 text-[11px] text-stone-500">Direct referrals to website</p>
        </div>

        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Conversion CTR
            </span>
            <TrendingUp className="h-4 w-4 text-stone-400 dark:text-stone-500" />
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-stone-900 dark:text-white">22.7%</span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">vs 14% avg</span>
          </div>
          <p className="mt-1 text-[11px] text-stone-500">Above directory benchmark</p>
        </div>

        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Lead Inquiries
            </span>
            <Users className="h-4 w-4 text-stone-400 dark:text-stone-500" />
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-stone-900 dark:text-white">246</span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">+42 new</span>
          </div>
          <p className="mt-1 text-[11px] text-stone-500">Qualified enterprise leads</p>
        </div>
      </div>

      {/* 30-DAY OUTBOUND TRAFFIC TREND */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3 mb-4">
          <div>
            <h3 className="font-semibold text-stone-900 dark:text-white text-sm">30-Day Outbound Traffic Trend</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">Daily click-through events from ListAIAssets search results</p>
          </div>
          <span className="text-xs font-mono text-stone-600 dark:text-stone-400">Total: 4,190 Clicks</span>
        </div>

        {/* Monochromatic Telemetry Chart Bars */}
        <div className="h-36 w-full flex items-end gap-1.5 pt-4">
          {[
            35, 42, 50, 48, 65, 70, 85, 78, 92, 110, 105, 120, 135, 125, 140,
            155, 160, 175, 190, 185, 210, 230, 220, 245, 260, 280, 275, 290,
            310, 340,
          ].map((val, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center gap-1 group relative cursor-pointer"
            >
              <div
                className="w-full rounded-t bg-stone-300 dark:bg-stone-700 hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors"
                style={{ height: `${(val / 340) * 100}%` }}
              />
              <div className="absolute -top-6 hidden group-hover:flex items-center rounded bg-stone-900 dark:bg-black px-1.5 py-0.5 text-[9px] font-mono text-white border border-stone-800 shadow-sm">
                {val} clicks
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-2 border-t border-stone-200 dark:border-stone-800 pt-2">
          <span>30 days ago</span>
          <span>15 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* PROMO STUDIO: BANNERS, COUPONS, AND LEAD WIDGET */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CUSTOM PROMO BANNER & DISCOUNT CODES */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 space-y-4 shadow-xs">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
            <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Promo Banner &amp; Active Coupons</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Display special pricing and promotional callouts on your tool card
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
              Promo Banner Text
            </label>
            <input
              type="text"
              value={promoBanner.text}
              onChange={(e) => setPromoBanner({ ...promoBanner, text: e.target.value })}
              className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3 py-2 text-xs text-stone-900 dark:text-white focus:border-amber-500/50 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                Button Label
              </label>
              <input
                type="text"
                value={promoBanner.buttonText}
                onChange={(e) => setPromoBanner({ ...promoBanner, buttonText: e.target.value })}
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3 py-2 text-xs text-stone-900 dark:text-white focus:border-amber-500/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                Destination Link
              </label>
              <input
                type="url"
                value={promoBanner.url}
                onChange={(e) => setPromoBanner({ ...promoBanner, url: e.target.value })}
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3 py-2 text-xs text-stone-900 dark:text-white focus:border-amber-500/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Coupon Code & Expiry */}
          <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
            <h4 className="text-[11px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
              Discount Code
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] text-stone-500 font-mono block mb-1">CODE</span>
                <input
                  type="text"
                  value={discountCode.code}
                  onChange={(e) => setDiscountCode({ ...discountCode, code: e.target.value })}
                  className="w-full rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-2.5 py-1.5 text-xs font-mono font-medium text-stone-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-mono block mb-1">DISCOUNT %</span>
                <input
                  type="number"
                  value={discountCode.discountPercent}
                  onChange={(e) =>
                    setDiscountCode({ ...discountCode, discountPercent: parseInt(e.target.value, 10) })
                  }
                  className="w-full rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-2.5 py-1.5 text-xs font-mono text-stone-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-mono block mb-1">EXPIRES</span>
                <input
                  type="date"
                  value={discountCode.expiresAt}
                  onChange={(e) => setDiscountCode({ ...discountCode, expiresAt: e.target.value })}
                  className="w-full rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-2.5 py-1.5 text-xs font-mono text-stone-800 dark:text-stone-300 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* EMBEDDED LEAD CAPTURE FORM CONFIGURATOR */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Embedded Lead Capture Widget</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Collect buyer inquiries directly from your ListAIAssets profile
              </p>
            </div>
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              Lead Widget
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
              Widget Headline
            </label>
            <input
              type="text"
              value={leadWidget.title}
              onChange={(e) => setLeadWidget({ ...leadWidget, title: e.target.value })}
              className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3 py-2 text-xs text-stone-900 dark:text-white focus:border-amber-500/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
              Webhook Delivery URL
            </label>
            <input
              type="url"
              value={leadWidget.webhookUrl}
              onChange={(e) => setLeadWidget({ ...leadWidget, webhookUrl: e.target.value })}
              placeholder="https://hooks.zapier.com/..."
              className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3 py-2 text-xs text-stone-900 dark:text-white focus:border-amber-500/50 focus:outline-none"
            />
          </div>

          {/* Live Preview */}
          <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50 p-3.5 space-y-2 shadow-xs">
            <span className="text-[10px] uppercase tracking-wider font-mono text-stone-500 block">
              Form Preview
            </span>
            <h4 className="text-xs font-semibold text-stone-900 dark:text-white">{leadWidget.title}</h4>
            <div className="space-y-2">
              <input
                type="email"
                disabled
                placeholder="work-email@company.com"
                className="w-full rounded border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-2.5 py-1 text-xs text-stone-500 dark:text-stone-400"
              />
              <button
                disabled
                className="w-full rounded bg-amber-600 py-1.5 text-xs font-medium text-white shadow-sm"
              >
                {leadWidget.ctaLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-24 text-center text-stone-500">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-stone-400 border-t-transparent" />
          <p className="mt-3 text-xs font-mono text-stone-500">Loading Dashboard...</p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
