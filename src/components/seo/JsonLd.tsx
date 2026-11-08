import React from "react";
import { DetailedTool } from "@/lib/data/tools";
import { CategoryInfo } from "@/lib/data/categories";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://listaiassets.com";

/**
 * 1. Global WebSite & Organization Schema with Google SearchAction
 */
export function OrganizationAndWebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "ListAIAssets",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon.png`,
          width: 512,
          height: 512,
        },
        sameAs: [
          "https://x.com/ListAIAssets",
          "https://github.com/listaiassets",
        ],
        description:
          "The verified AI directory and benchmark engine indexing frontier AI assets, models, developer agents, and generative workflows on listaiassets.com.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "ListAIAssets Directory",
        description:
          "Authoritative directory of 10,000+ verified AI tools, models, and assets with empirical latency benchmarks, ratings, and pricing tiers.",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/tools?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * 2. Categories Hub Schema: CollectionPage + ItemList + FAQPage
 */
interface CategoriesHubJsonLdProps {
  categories: CategoryInfo[];
  faqs: { question: string; answer: string }[];
}

export function CategoriesHubJsonLd({ categories, faqs }: CategoriesHubJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/categories/#collection`,
        name: "AI Tools by Category — Complete Workflow Index",
        description:
          "Browse 18+ hand-tested categories of AI software with empirical benchmarks, latency telemetry, and pricing tiers.",
        url: `${SITE_URL}/categories`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: categories.map((cat, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: cat.name,
            url: `${SITE_URL}/categories/${cat.slug}`,
            description: cat.description,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/categories/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Categories",
            item: `${SITE_URL}/categories`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * 3. Category Deep-Dive Page Schema: CollectionPage + BreadcrumbList
 */
interface CategoryDeepDiveJsonLdProps {
  category: CategoryInfo;
  tools: DetailedTool[];
}

export function CategoryDeepDiveJsonLd({ category, tools }: CategoryDeepDiveJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${category.name} — Best AI Tools & Benchmarks (2026)`,
        description: category.description,
        url: `${SITE_URL}/categories/${category.slug}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: tools.map((tool, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: tool.name,
            url: tool.websiteUrl,
            description: tool.tagline,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Categories",
            item: `${SITE_URL}/categories`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: category.name,
            item: `${SITE_URL}/categories/${category.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * 4. Software Application Schema for Individual AI Tools
 */
interface ToolJsonLdProps {
  tool: DetailedTool;
}

export function SoftwareApplicationJsonLd({ tool }: ToolJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    headline: tool.tagline,
    description: tool.description,
    url: tool.websiteUrl,
    applicationCategory: tool.categories[0]?.name || "DeveloperApplication",
    operatingSystem: "Web, macOS, Windows, Linux",
    offers: {
      "@type": "Offer",
      price: tool.startingPrice.toString(),
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.reviewScore.toString(),
      ratingCount: (tool.communityVotes?.upvotes || 50).toString(),
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * 5. Comparison Matrix Schema
 */
interface ComparisonJsonLdProps {
  toolA: DetailedTool;
  toolB: DetailedTool;
}

export function ComparisonJsonLd({ toolA, toolB }: ComparisonJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What is the difference between ${toolA.name} and ${toolB.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${toolA.name} is a ${toolA.pricingType} solution specializing in ${toolA.tagline}. ${toolB.name} is a ${toolB.pricingType} alternative featuring ${toolB.tagline}.`,
            },
          },
          {
            "@type": "Question",
            name: `Which is cheaper: ${toolA.name} or ${toolB.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${toolA.name} starts at $${toolA.startingPrice}/mo while ${toolB.name} starts at $${toolB.startingPrice}/mo.`,
            },
          },
          {
            "@type": "Question",
            name: `Does ${toolA.name} offer an API?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: toolA.features.api
                ? `Yes, ${toolA.name} provides a developer API.`
                : `No, ${toolA.name} does not offer a standalone public API.`,
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Head-to-Head Comparisons",
            item: `${SITE_URL}/compare`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${toolA.name} vs ${toolB.name}`,
            item: `${SITE_URL}/compare/${toolA.slug}-vs-${toolB.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
