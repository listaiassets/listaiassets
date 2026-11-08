import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy_listaiassets_stripe_key", {
  apiVersion: "2025-02-24.acacia" as any,
  typescript: true,
});

export const PLAN_TIERS = {
  FREE: {
    id: "free",
    name: "Free Community",
    price: 0,
    priceLabel: "$0",
    badge: "Community",
    features: [
      "Standard directory placement in catalog",
      "Permanent index profile page",
      "Community reviews & ratings",
      "Standard queue (reviewed in 7–10 days)",
    ],
  },
  FAST_TRACK: {
    id: "fast_track",
    name: "Fast Track",
    price: 7500, // $75.00 in cents
    priceLabel: "$75",
    badge: "12h Review",
    features: [
      "Guaranteed publishing within 12 hours",
      "Permanent Do-Follow high-authority SEO backlink",
      "Official Verified AI Badge on tool card",
      "Included in daily RSS & LLM context feeds",
      "Direct founder support & edit requests",
    ],
  },
  FEATURED: {
    id: "featured",
    name: "Featured Spotlight",
    price: 19900, // $199.00 in cents
    priceLabel: "$199",
    badge: "Maximum Visibility",
    features: [
      "Everything in Fast Track ($75) included",
      "Pinned sticky placement at the top of category & directory",
      "Dedicated feature in weekly ListAIAssets Newsletter (35,000+ developers)",
      "Social broadcast announcement on X/Twitter (@listaiassets)",
      "High-authority partner badge + priority index updates",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLAN_TIERS;
