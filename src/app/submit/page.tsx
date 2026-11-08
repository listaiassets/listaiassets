"use client";

import React, { useState } from "react";
import {
  Zap,
  CheckCircle2,
  ShieldCheck,
  Flame,
  ArrowRight,
  Globe,
  Mail,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/badge";
import { SearchableSelect, SearchableOption } from "@/components/ui/SearchableSelect";

export default function SubmitPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("fast_track");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    websiteUrl: "",
    tagline: "",
    description: "",
    category: "coding",
    pricingType: "FREEMIUM",
    startingPrice: "20",
    contactEmail: "",
    isClaiming: true,
  });

  const categoryOptions: SearchableOption[] = [
    { value: "coding", label: "Coding Agents & IDEs" },
    { value: "llms", label: "Reasoning LLMs & Base Models" },
    { value: "video", label: "Generative Video & 3D" },
    { value: "audio", label: "Voice & Realtime Speech" },
    { value: "search", label: "AI Search & Enterprise RAG" },
    { value: "productivity", label: "Automation & Agents" },
  ];

  const pricingOptions: SearchableOption[] = [
    { value: "FREEMIUM", label: "Freemium", subtitle: "Free tier available" },
    { value: "FREE", label: "100% Free / Open Source", subtitle: "Zero cost" },
    { value: "PAID", label: "Paid Only", subtitle: "Subscription or upfront" },
    { value: "TRIAL", label: "Free Trial Available", subtitle: "Time-limited trial" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.websiteUrl || !formData.contactEmail) {
      alert("Please provide the Tool Name, Website URL, and Founder Contact Email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan,
          toolData: formData,
        }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert("Submission processed successfully!");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit tool. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-150">
      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="h-3 w-3" />
            Founder &amp; Maintainer Indexing
          </span>
          <h1 className="mt-3 text-3xl font-bold text-stone-900 dark:text-white tracking-tight sm:text-4xl">
            List Your AI Product on ListAIAssets
          </h1>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Put your AI model, agent, or developer platform in front of 35,000+ engineers, enterprise buyers, and founders. Choose your review and publishing timeline below.
          </p>
        </div>

        {/* STEP 1: SELECT PLAN TIER (3 SIMPLIFIED PLANS) */}
        <div className="mt-10" id="plans">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-white font-mono font-bold text-xs">
              1
            </span>
            <h2 className="text-sm font-semibold text-stone-900 dark:text-white tracking-tight uppercase">
              Choose Publishing Plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Free Community */}
            <div
              onClick={() => setSelectedPlan("free")}
              className={`cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between shadow-xs ${
                selectedPlan === "free"
                  ? "border-amber-600 dark:border-amber-500 bg-amber-500/10 dark:bg-stone-900 ring-1 ring-amber-500/30"
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] hover:border-amber-500/40"
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono uppercase text-stone-500 dark:text-stone-400">Community</span>
                  <Badge variant="neutral" size="sm">
                    Free
                  </Badge>
                </div>
                <h3 className="mt-2 text-base font-semibold text-stone-900 dark:text-white">Free Community</h3>
                <div className="mt-1 text-2xl font-bold text-stone-900 dark:text-white font-mono">$0</div>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Standard directory listing placed in our community review queue.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-stone-600 dark:text-stone-400">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500 shrink-0" />
                    <span>Permanent index listing</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500 shrink-0" />
                    <span>Community queue (7–10 days)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500 shrink-0" />
                    <span>No-Follow backlink</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 text-center text-xs font-medium text-stone-700 dark:text-stone-300">
                {selectedPlan === "free" ? "✓ Selected" : "Select Free"}
              </div>
            </div>

            {/* 2. Fast Track ($75) - RECOMMENDED */}
            <div
              onClick={() => setSelectedPlan("fast_track")}
              className={`cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between relative shadow-sm ${
                selectedPlan === "fast_track"
                  ? "border-amber-600 dark:border-amber-500 bg-amber-500/10 dark:bg-stone-900 ring-2 ring-amber-500/50"
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] hover:border-amber-500/40"
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-amber-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                  Most Popular
                </span>
              </div>

              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono uppercase text-amber-700 dark:text-amber-400 font-semibold">Priority SLA</span>
                  <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-stone-900 dark:text-white">Fast Track</h3>
                <div className="mt-1 text-2xl font-bold text-stone-900 dark:text-white font-mono">
                  $75
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-normal"> /one-time</span>
                </div>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Guaranteed review and publishing within 12 hours with a permanent Do-Follow SEO backlink.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-stone-700 dark:text-stone-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span><strong>12-Hour</strong> Guaranteed publish</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span><strong>Do-Follow</strong> SEO backlink</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Verified AI Badge on profile</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Included in daily LLM feeds</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 text-center text-xs font-bold text-amber-700 dark:text-amber-400">
                {selectedPlan === "fast_track" ? "✓ Selected" : "Select Fast Track ($75)"}
              </div>
            </div>

            {/* 3. Featured Spotlight ($199) */}
            <div
              onClick={() => setSelectedPlan("featured")}
              className={`cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between relative shadow-xs ${
                selectedPlan === "featured"
                  ? "border-amber-600 dark:border-amber-500 bg-amber-500/10 dark:bg-stone-900 ring-1 ring-amber-500/30"
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] hover:border-amber-500/40"
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono uppercase text-stone-500 dark:text-stone-400">Maximum Reach</span>
                  <Flame className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-stone-900 dark:text-white">Featured Spotlight</h3>
                <div className="mt-1 text-2xl font-bold text-stone-900 dark:text-white font-mono">
                  $199
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-normal"> /one-time</span>
                </div>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Top sticky placement, newsletter broadcast to 35k+ developers, and social announcement.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-stone-700 dark:text-stone-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span><strong>Everything in Fast Track ($75)</strong></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span><strong>Pinned sticky placement</strong> at top</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span><strong>Newsletter feature</strong> (35k+ devs)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Social broadcast on X/Twitter</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 text-center text-xs font-semibold text-stone-800 dark:text-stone-200">
                {selectedPlan === "featured" ? "✓ Selected" : "Select Featured ($199)"}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: METADATA & CLAIM WIZARD FORM */}
        <form onSubmit={handleSubmit} className="mt-10 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 mb-5 border-b border-stone-200 dark:border-stone-800 pb-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-white font-mono font-bold text-xs">
              2
            </span>
            <h2 className="text-sm font-semibold text-stone-900 dark:text-white tracking-tight uppercase">
              Tool &amp; Founder Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Tool Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Cursor, Runway Gen-3"
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3.5 py-2 text-xs text-stone-950 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Website URL *
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                <input
                  type="url"
                  name="websiteUrl"
                  required
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="https://yourcompany.com"
                  className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 pl-9 pr-3.5 py-2 text-xs text-stone-950 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                One-Line Pitch / Tagline *
              </label>
              <input
                type="text"
                name="tagline"
                required
                value={formData.tagline}
                onChange={handleInputChange}
                placeholder="e.g. The AI-first code editor pairing deep codebase indexing with reasoning models."
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3.5 py-2 text-xs text-stone-950 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Detailed Description &amp; Capabilities
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Explain what makes your tool unique, supported integrations, API capabilities, and who it's for..."
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3.5 py-2 text-xs text-stone-950 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Primary Category
              </label>
              <SearchableSelect
                value={formData.category}
                onChange={(val) => setFormData((prev) => ({ ...prev, category: val }))}
                options={categoryOptions}
                searchPlaceholder="Search category..."
                buttonClassName="w-full justify-between py-2 text-stone-950 dark:text-white"
                dropdownWidth="w-full"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Pricing Model
              </label>
              <SearchableSelect
                value={formData.pricingType}
                onChange={(val) => setFormData((prev) => ({ ...prev, pricingType: val }))}
                options={pricingOptions}
                searchPlaceholder="Search pricing..."
                buttonClassName="w-full justify-between py-2 text-stone-950 dark:text-white"
                dropdownWidth="w-full"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Founder / Contact Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                <input
                  type="email"
                  name="contactEmail"
                  required
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="founder@company.com"
                  className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 pl-9 pr-3.5 py-2 text-xs text-stone-950 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
                />
              </div>
              <p className="mt-1 text-[11px] text-stone-500">
                We will email your publishing receipt, tracking confirmation, and live listing link to this address.
              </p>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-200 dark:border-stone-800 pt-4">
            <div className="text-xs text-stone-600 dark:text-stone-400">
              Selected Plan:{" "}
              <strong className="text-stone-950 dark:text-white uppercase font-mono">
                {selectedPlan === "free"
                  ? "Free Community ($0)"
                  : selectedPlan === "fast_track"
                  ? "Fast Track ($75)"
                  : "Featured Spotlight ($199)"}
              </strong>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-5 py-2.5 font-semibold text-xs text-white transition-all hover:bg-amber-500 disabled:opacity-50 cursor-pointer shadow-sm active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>
                    {selectedPlan === "free"
                      ? "Submit to Community Queue ($0)"
                      : selectedPlan === "fast_track"
                      ? "Get Published in 12 Hours ($75)"
                      : "Get Featured Placement ($199)"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
