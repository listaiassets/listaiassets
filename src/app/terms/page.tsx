import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and editorial policies for ListAIAssets (listaiassets.com).",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl py-14 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
          Legal &amp; Policy
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          Terms of Service &amp; Editorial Guidelines
        </h1>
        <p className="mt-2 text-xs text-stone-500">
          Last updated: November 2026 • Effective for all users, maintainers, and visitors of listaiassets.com
        </p>
      </div>

      <div className="space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 dark:text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using <strong>listaiassets.com</strong>, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
          </p>
        </section>

        <section id="editorial" className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 dark:text-white">2. Editorial Standards &amp; Review Policy</h2>
          <p>
            ListAIAssets maintains strict editorial independence. We do not accept listings for malicious software, spyware, copyright-infringing tools, or deceptive AI applications.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Verification:</strong> All submitted tools undergo automated and human quality audits before receiving a verified badge.</li>
            <li><strong>Accuracy:</strong> Maintainers are responsible for ensuring that pricing, context window specifications, and API documentation URLs remain up to date.</li>
            <li><strong>Removal:</strong> We reserve the right to delist any software found to violate safety standards, privacy regulations, or intellectual property rights.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 dark:text-white">3. Paid Submissions &amp; Fast-Track SLA</h2>
          <p>
            For maintainers purchasing priority review tiers (Fast Track or Featured Spotlight):
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Review SLA:</strong> Fast Track submissions are guaranteed review and initial feedback within 12 hours of payment receipt.</li>
            <li><strong>Refund Policy:</strong> If a tool is rejected due to policy violations, a full refund will be issued promptly to the original payment method.</li>
            <li><strong>Do-Follow Backlinks:</strong> Approved paid listings receive permanent editorial attribution according to Google Webmaster guidelines for curated software directories.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 dark:text-white">4. Intellectual Property</h2>
          <p>
            All trademarks, logos, and brand assets displayed on listaiassets.com remain the property of their respective owners. Their display serves strictly for nominative directory identification and informational purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 dark:text-white">5. Governing Law &amp; Contact</h2>
          <p>
            For editorial questions, corrections, or legal notices, email:
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

