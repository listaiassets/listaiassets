"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Lock,
  RefreshCw,
  Search,
  Sparkles,
  Inbox,
  Check,
  Copy,
  Mail,
  SlidersHorizontal,
} from "lucide-react";

interface Submission {
  id: string;
  name: string;
  slug: string;
  websiteUrl: string;
  tagline: string;
  description: string;
  category: string;
  pricingType: "FREE" | "FREEMIUM" | "PAID" | "TRIAL";
  startingPrice: number;
  contactEmail: string;
  planTier: "FREE" | "FAST_TRACK" | "FEATURED" | "EXPERT_REVIEW";
  status: "PENDING" | "PUBLISHED" | "REJECTED";
  isPaid: boolean;
  amountPaid: number;
  verifiedBadge: boolean;
  adminNotes?: string | null;
  createdAt: string;
}

interface Stats {
  totalSubmissions: number;
  pendingCount: number;
  publishedCount: number;
  rejectedCount: number;
  totalRevenue: number;
  featuredCount: number;
  fastTrackCount: number;
}

function AdminSubmissionsContent() {
  const searchParams = useSearchParams();
  const [key, setKey] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("listaiassets_admin_key");
      if (stored) return stored;
    }
    return searchParams.get("key") || "listaiassets_admin";
  });

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalSubmissions: 0,
    pendingCount: 0,
    publishedCount: 0,
    rejectedCount: 0,
    totalRevenue: 0,
    featuredCount: 0,
    fastTrackCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "PUBLISHED" | "REJECTED">("PENDING");
  const [tierFilter, setTierFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchSubmissions = async (adminKey: string) => {
    setLoading(true);
    setError("");
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("listaiassets_admin_key", adminKey);
      }
      const res = await fetch(`/api/admin/submissions?key=${encodeURIComponent(adminKey)}`);
      if (!res.ok) {
        throw new Error("Invalid admin key or unauthorized access.");
      }
      const data = await res.json();
      setSubmissions(data.submissions || []);
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error fetching submissions";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions(key);
  }, [key]);

  const handleStatusUpdate = async (
    slugOrId: string,
    action: "APPROVE" | "REJECT",
    planTier?: "FREE" | "FAST_TRACK" | "FEATURED" | "EXPERT_REVIEW"
  ) => {
    setActionLoading(slugOrId);
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": key,
        },
        body: JSON.stringify({
          slugOrId,
          action,
          planTier,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update submission");
      }

      showToast(data.message || `Successfully processed ${action}`);
      // Refresh list
      await fetchSubmissions(key);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Action failed";
      alert(message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCopyJson = (sub: Submission) => {
    const snippet = JSON.stringify(
      {
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
        tagline: sub.tagline,
        description: sub.description,
        websiteUrl: sub.websiteUrl,
        pricingType: sub.pricingType,
        startingPrice: sub.startingPrice,
        planTier: sub.planTier,
        status: sub.status,
        verifiedBadge: sub.verifiedBadge,
        category: sub.category,
      },
      null,
      2
    );

    navigator.clipboard.writeText(snippet);
    setCopiedSlug(sub.slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      // Status filter
      if (statusFilter !== "ALL" && sub.status !== statusFilter) {
        return false;
      }
      // Tier filter
      if (tierFilter !== "ALL" && sub.planTier !== tierFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = sub.name.toLowerCase().includes(q);
        const matchesEmail = sub.contactEmail.toLowerCase().includes(q);
        const matchesTagline = sub.tagline.toLowerCase().includes(q);
        const matchesUrl = sub.websiteUrl.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesTagline && !matchesUrl) {
          return false;
        }
      }
      return true;
    });
  }, [submissions, statusFilter, tierFilter, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              <Lock className="h-3 w-3" />
              Private Admin Portal
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
              robots: noindex
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white mt-1">
            Submissions &amp; Tool Review Dashboard
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Review incoming submissions, approve tools for live indexing, and assign placement tiers in Supabase.
          </p>
        </div>

        {/* Admin passkey auth input */}
        <div className="flex items-center gap-2">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin Passkey"
            className="rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3 py-1.5 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono w-44"
          />
          <button
            onClick={() => fetchSubmissions(key)}
            disabled={loading}
            className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pending Review */}
        <div
          onClick={() => setStatusFilter("PENDING")}
          className={`rounded-xl border p-4 shadow-xs cursor-pointer transition-all ${
            statusFilter === "PENDING"
              ? "border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 ring-1 ring-amber-500"
              : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] hover:border-stone-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-stone-500">Awaiting Review</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
              {stats.pendingCount}
            </span>
            <span className="text-xs text-stone-500">pending</span>
          </div>
        </div>

        {/* Approved & Live */}
        <div
          onClick={() => setStatusFilter("PUBLISHED")}
          className={`rounded-xl border p-4 shadow-xs cursor-pointer transition-all ${
            statusFilter === "PUBLISHED"
              ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 ring-1 ring-emerald-500"
              : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] hover:border-stone-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-stone-500">Approved &amp; Live</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {stats.publishedCount}
            </span>
            <span className="text-xs text-stone-500">published</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-stone-500">Total Revenue</span>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-stone-900 dark:text-white">
              ${stats.totalRevenue}
            </span>
            <span className="text-xs text-stone-500">USD</span>
          </div>
        </div>

        {/* Total Submissions */}
        <div
          onClick={() => setStatusFilter("ALL")}
          className={`rounded-xl border p-4 shadow-xs cursor-pointer transition-all ${
            statusFilter === "ALL"
              ? "border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-900"
              : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] hover:border-stone-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-stone-500">All Submissions</span>
            <Inbox className="h-4 w-4 text-stone-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-stone-900 dark:text-white">
              {stats.totalSubmissions}
            </span>
            <span className="text-xs text-stone-500">logged</span>
          </div>
        </div>
      </div>

      {/* Control filters bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#1c1917] p-3 rounded-xl border border-stone-200 dark:border-stone-800">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {(["PENDING", "PUBLISHED", "REJECTED", "ALL"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === tab
                  ? "bg-stone-900 text-white dark:bg-white dark:text-stone-900"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
            >
              {tab === "PENDING"
                ? `⏳ Pending (${stats.pendingCount})`
                : tab === "PUBLISHED"
                ? `✅ Live (${stats.publishedCount})`
                : tab === "REJECTED"
                ? `❌ Rejected (${stats.rejectedCount})`
                : `All (${stats.totalSubmissions})`}
            </button>
          ))}
        </div>

        {/* Tier filter & search input */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-stone-200 dark:border-stone-800 rounded-lg px-2 py-1 bg-stone-50 dark:bg-stone-900">
            <SlidersHorizontal className="h-3 w-3 text-stone-400" />
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-transparent text-xs text-stone-700 dark:text-stone-300 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Plans</option>
              <option value="FEATURED">Featured Spotlight ($199)</option>
              <option value="FAST_TRACK">Fast Track ($75)</option>
              <option value="FREE">Free Community ($0)</option>
            </select>
          </div>

          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search tools or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">
            {statusFilter === "PENDING"
              ? "Pending Review Queue"
              : statusFilter === "PUBLISHED"
              ? "Active Live Catalog Listings"
              : statusFilter === "REJECTED"
              ? "Rejected Submissions"
              : "All Submissions"}{" "}
            ({filteredSubmissions.length})
          </h2>
          <span className="text-[11px] text-stone-500 font-mono">
            Synced with Supabase &amp; <code className="text-[10px] bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">data/submissions.json</code>
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-stone-500 flex flex-col items-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin text-amber-500" />
            <span>Loading submissions from Supabase...</span>
          </div>
        ) : error ? (
          <div className="py-20 text-center text-xs text-red-500 space-y-2">
            <p className="font-semibold">{error}</p>
            <p className="text-[11px] text-stone-500">Verify your admin passkey above.</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <Inbox className="mx-auto h-8 w-8 text-stone-400" />
            <p className="text-xs font-medium text-stone-700 dark:text-stone-300">
              No submissions match the current filter
            </p>
            <p className="text-[11px] text-stone-500">
              New submissions submitted through /submit will arrive here in pending status.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            {filteredSubmissions.map((sub) => {
              const isPending = sub.status === "PENDING";
              const isApproved = sub.status === "PUBLISHED";
              const isFeatured = sub.planTier === "FEATURED";
              const isFastTrack = sub.planTier === "FAST_TRACK";

              return (
                <div
                  key={sub.id || sub.slug}
                  className="p-4 sm:p-5 hover:bg-stone-50/50 dark:hover:bg-stone-900/30 transition-colors space-y-3"
                >
                  {/* Top line: Badges & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Plan Tier Badge */}
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase font-mono tracking-wider ${
                          isFeatured
                            ? "bg-amber-500 text-stone-950 ring-1 ring-amber-600"
                            : isFastTrack
                            ? "bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20"
                            : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                        }`}
                      >
                        {isFeatured
                          ? "Featured Spotlight ($199)"
                          : isFastTrack
                          ? "Fast Track ($75)"
                          : "Free Community ($0)"}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                          isApproved
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                            : isPending
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                            : "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20"
                        }`}
                      >
                        {isApproved ? "✅ LIVE IN CATALOG" : isPending ? "⏳ AWAITING APPROVAL" : "❌ REJECTED"}
                      </span>

                      {/* Payment Indicator */}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          sub.isPaid
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                            : "bg-stone-100 dark:bg-stone-800 text-stone-500"
                        }`}
                      >
                        {sub.isPaid ? `Paid: $${sub.amountPaid}` : "Unpaid ($0)"}
                      </span>

                      <h3 className="text-base font-bold text-stone-900 dark:text-white ml-1">
                        {sub.name}
                      </h3>
                      <span className="text-xs font-mono text-stone-400">/{sub.slug}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      {/* APPROVE ACTION */}
                      {isPending && (
                        <button
                          onClick={() => handleStatusUpdate(sub.slug, "APPROVE", sub.planTier)}
                          disabled={actionLoading === sub.slug}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Approve &amp; Publish</span>
                        </button>
                      )}

                      {/* RE-APPROVE OR REJECT */}
                      {isApproved && (
                        <button
                          onClick={() => handleStatusUpdate(sub.slug, "REJECT")}
                          disabled={actionLoading === sub.slug}
                          className="inline-flex items-center gap-1 rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-2.5 py-1 text-[11px] font-medium text-stone-600 dark:text-stone-400 hover:text-red-500 hover:border-red-300 transition-colors cursor-pointer"
                        >
                          <XCircle className="h-3 w-3" />
                          <span>Unpublish / Archive</span>
                        </button>
                      )}

                      {isPending && (
                        <button
                          onClick={() => handleStatusUpdate(sub.slug, "REJECT")}
                          disabled={actionLoading === sub.slug}
                          className="inline-flex items-center gap-1 rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-2.5 py-1 text-[11px] font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                        >
                          <XCircle className="h-3 w-3" />
                          <span>Reject</span>
                        </button>
                      )}

                      {/* Copy JSON Snippet */}
                      <button
                        onClick={() => handleCopyJson(sub)}
                        className="inline-flex items-center gap-1 rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-2.5 py-1 text-[11px] font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                        title="Copy tool JSON snippet"
                      >
                        {copiedSlug === sub.slug ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-stone-400" />
                            <span>JSON</span>
                          </>
                        )}
                      </button>

                      {/* Visit Website link */}
                      <a
                        href={sub.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-[11px] font-medium text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        <span>Visit</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  {/* Pitch Tagline & Description */}
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-stone-800 dark:text-stone-200">
                      {sub.tagline || "No pitch tagline provided."}
                    </p>
                    {sub.description && (
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                        {sub.description}
                      </p>
                    )}
                  </div>

                  {/* Submission Metadata Bar */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-[11px] text-stone-500 font-mono pt-1 border-t border-stone-100 dark:border-stone-800/60">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-stone-400" />
                      Founder:{" "}
                      <a
                        href={`mailto:${sub.contactEmail}`}
                        className="text-stone-700 dark:text-stone-300 hover:underline"
                      >
                        {sub.contactEmail || "Not provided"}
                      </a>
                    </span>
                    <span>
                      Pricing:{" "}
                      <strong className="text-stone-700 dark:text-stone-300">
                        {sub.pricingType} {sub.startingPrice ? `($${sub.startingPrice})` : ""}
                      </strong>
                    </span>
                    <span>
                      Category:{" "}
                      <span className="uppercase text-stone-700 dark:text-stone-300">
                        {sub.category || "General"}
                      </span>
                    </span>
                    <span>
                      Submitted:{" "}
                      <span className="text-stone-600 dark:text-stone-400">
                        {new Date(sub.createdAt).toLocaleString()}
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminSubmissionsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-stone-500">
          Loading admin portal...
        </div>
      }
    >
      <AdminSubmissionsContent />
    </Suspense>
  );
}
