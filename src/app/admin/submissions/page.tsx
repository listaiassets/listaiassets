"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Flame,
  Clock,
  DollarSign,
  Inbox,
  Lock,
} from "lucide-react";

interface Submission {
  toolName: string;
  websiteUrl: string;
  tagline?: string;
  category?: string;
  planId: string;
  planName: string;
  amountPaid: number;
  contactEmail: string;
  sessionId?: string;
  isPaid: boolean;
  timestamp: string;
}

function AdminSubmissionsContent() {
  const searchParams = useSearchParams();
  const [key, setKey] = useState(searchParams.get("key") || "listaiassets_admin");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const fetchSubmissions = async (adminKey: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/submissions?key=${adminKey}`);
      if (!res.ok) {
        throw new Error("Invalid admin key or unauthorized access.");
      }
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions(key);
  }, [key]);

  const totalRevenue = submissions.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
  const paidCount = submissions.filter((s) => s.isPaid).length;

  const handleCopyJson = (sub: Submission, index: number) => {
    const slug = sub.toolName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const snippet = JSON.stringify(
      {
        id: `tool_${slug}`,
        name: sub.toolName,
        slug,
        tagline: sub.tagline || "Innovative AI Application",
        description: `${sub.toolName} delivers specialized AI capabilities for modern workflows.`,
        websiteUrl: sub.websiteUrl,
        pricingType: "FREEMIUM",
        startingPrice: 0,
        categories: [{ id: `cat_${sub.category || "coding"}`, name: sub.category || "General", slug: sub.category || "coding" }],
        tags: [sub.category || "ai", "new-release", "featured"],
        verifiedBadge: sub.isPaid,
        domainAuthority: sub.isPaid ? 75 : 60,
        reviewScore: 4.8,
        dealPercent: null,
        monthlyVisitors: "150K",
        monthlyVisitorsNumber: 150000,
        features: { api: true, mobileApp: false, web: true, noWatermark: true, commercialRights: true, openSource: false },
        benchmarks: { latencyMs: 160, codeAccuracyPercent: 92.5, reasoningScore: 91.0 },
        communityVotes: { upvotes: 12, downvotes: 0 },
      },
      null,
      2
    );

    navigator.clipboard.writeText(snippet);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="mx-auto max-w-6xl py-10 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <Lock className="h-3 w-3" />
            Private Owner Portal
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white mt-1">
            Submissions &amp; Review Queue
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Incoming tool listings, payment fulfillment, and publish approvals for listaiassets.com
          </p>
        </div>

        {/* Passkey Input */}
        <div className="flex items-center gap-2">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin Secret Key"
            className="rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3 py-1.5 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono"
          />
          <button
            onClick={() => fetchSubmissions(key)}
            className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors cursor-pointer"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-stone-500 block">Total Submissions</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-stone-900 dark:text-white">{submissions.length}</span>
            <span className="text-xs text-stone-500">entries logged</span>
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-stone-500 block">Paid Orders ($75 / $199)</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">{paidCount}</span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Priority 12h SLA</span>
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-stone-500 block">Total Revenue Logged</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              ${totalRevenue}
            </span>
            <span className="text-xs text-stone-500">USD</span>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">
            Queue Records ({submissions.length})
          </h2>
          <span className="text-[11px] text-stone-500">
            Backed up in <code className="text-[10px] bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">data/submissions.json</code>
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs text-stone-500">Loading queue...</div>
        ) : error ? (
          <div className="py-16 text-center text-xs text-red-500">{error}</div>
        ) : submissions.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Inbox className="mx-auto h-8 w-8 text-stone-400" />
            <p className="text-xs font-medium text-stone-700 dark:text-stone-300">No submissions in queue yet</p>
            <p className="text-[11px] text-stone-500">Test submissions submitted via /submit will appear here automatically.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            {submissions.map((sub, idx) => (
              <div key={idx} className="p-4 sm:p-5 hover:bg-stone-50/50 dark:hover:bg-stone-900/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                        sub.planId === "featured"
                          ? "bg-amber-500 text-stone-950"
                          : sub.isPaid
                          ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                      }`}
                    >
                      {sub.planName} (${sub.amountPaid})
                    </span>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-white">{sub.toolName}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyJson(sub, idx)}
                      className="inline-flex items-center gap-1 rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-2.5 py-1 text-[11px] font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          <span>Copied JSON!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-stone-400" />
                          <span>Copy Catalog JSON</span>
                        </>
                      )}
                    </button>

                    <a
                      href={sub.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-[11px] font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {sub.tagline || "No pitch provided."}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-stone-500 font-mono">
                  <span>Founder: <strong className="text-stone-700 dark:text-stone-300">{sub.contactEmail}</strong></span>
                  <span>Category: <span className="uppercase">{sub.category || "General"}</span></span>
                  <span>Time: {new Date(sub.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminSubmissionsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-stone-500">Loading admin queue...</div>}>
      <AdminSubmissionsContent />
    </Suspense>
  );
}

