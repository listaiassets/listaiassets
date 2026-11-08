import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data protection standards for ListAIAssets (listaiassets.com).",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl py-14 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
          Legal &amp; Privacy
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-stone-500">
          Last updated: November 2026 • Effective immediately for listaiassets.com
        </p>
      </div>

      <div className="space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 dark:text-white">1. Overview</h2>
          <p>
            ListAIAssets (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates <strong>listaiassets.com</strong>. We are committed to protecting your personal information and your right to privacy. This policy explains what information we collect, how we use it, and what rights you have in relation to it.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 dark:text-white">2. Information We Collect</h2>
          <p>
            When you browse the directory, we collect anonymous usage telemetry such as page views, referral sources, and search queries to improve our ranking algorithms and catalog recommendations.
          </p>
          <p>
            When you submit a tool or purchase a priority placement tier, we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Founder or contact email address</li>
            <li>Software name, website URL, and descriptive metadata</li>
            <li>Payment transaction identifiers (processed securely via Stripe or Lemon Squeezy; we never store raw credit card numbers on our servers)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 dark:text-white">3. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Verify and publish software listings on listaiassets.com</li>
            <li>Send order confirmation receipts and status updates regarding your listing</li>
            <li>Prevent fraud, spam, and malicious bot submissions</li>
            <li>Maintain transparency in our empirical latency and benchmark leaderboards</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 dark:text-white">4. Cookies &amp; Tracking</h2>
          <p>
            We use minimal, privacy-friendly cookies solely for theme preferences (dark/light mode) and session integrity. We do not sell or monetize personal user data to third-party ad brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 dark:text-white">5. Contact Information</h2>
          <p>
            For questions, data deletion requests, or privacy inquiries, contact our team at:
            <br />
            <a href="mailto:team@listaiassets.com" className="text-amber-600 dark:text-amber-400 font-medium hover:underline">
              team@listaiassets.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

