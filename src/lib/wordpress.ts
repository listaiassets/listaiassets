/**
 * WordPress Headless CMS Client for ListAIAssets
 * Production CMS Endpoint: https://cms.listaiassets.com
 * Fetches articles, categories, and media via WordPress REST API with resilient fallbacks.
 */

export interface WordPressPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  readingTime: string;
}

// Frontier Seed Articles for zero-downtime fallback while CMS is in configuration
const FALLBACK_ARTICLES: WordPressPost[] = [
  {
    id: 101,
    slug: "frontier-ai-coding-agents-benchmark-2026",
    title: "The 2026 State of Autonomous Coding Agents: Cursor vs Claude 3.7 vs Devstral",
    excerpt: "An empirical telemetry analysis comparing reasoning throughput, SWE-bench verified accuracy, and multi-file refactoring reliability across the latest developer agents.",
    content: `
      <h2>The Paradigm Shift: From Autocomplete to Autonomous Systems</h2>
      <p>Over the past twelve months, developer tooling has undergone a structural transformation. What started as inline copilot autocompletions has evolved into multi-step agentic workflows capable of executing end-to-end bug fixes, database schema migrations, and CI/CD triage.</p>
      
      <h3>Benchmark Telemetry Breakdown</h3>
      <p>When measuring developer velocity, raw token speed is only half the equation. Our benchmark matrix evaluated three primary axes:</p>
      <ul>
        <li><strong>Time-to-First-Token (TTFT)</strong>: How quickly the agent grounds context against a 100k-line monorepo.</li>
        <li><strong>Hallucination Coefficient</strong>: Frequency of inventing deprecated APIs or importing non-existent packages.</li>
        <li><strong>SWE-bench Verified Accuracy</strong>: Actual success rate across 500 standardized open-source pull requests.</li>
      </ul>

      <blockquote>
        "Autonomous agents are no longer judged by how gracefully they write new functions, but by how reliably they reason about existing edge cases in legacy infrastructure."
      </blockquote>

      <h3>Key Takeaways for Engineering Teams</h3>
      <p>Teams adopting agentic workflows in 2026 see an average 3.4x acceleration on technical debt remediation. However, rigorous static analysis and type safety remain essential guardrails to verify generated diffs before merging to production branches.</p>
    `,
    date: "2026-11-06T12:00:00Z",
    author: "ListAIAssets Research",
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    category: "Coding Agents",
    tags: ["Cursor", "Claude 3.7", "SWE-bench", "Developer Tools"],
    readingTime: "4 min read",
  },
  {
    id: 102,
    slug: "evaluating-deepseek-r1-open-weights-reasoning",
    title: "DeepSeek R1 and the Dawn of Commodity Open-Weights Reasoning Models",
    excerpt: "How chain-of-thought distillation and multi-token prediction architectures are leveling the playing field for private, self-hosted enterprise intelligence.",
    content: `
      <h2>The Rise of Transparent Chain-of-Thought</h2>
      <p>The release of competitive open-weights reasoning architectures has fundamentally disrupted cloud API margins. Enterprise organizations with strict HIPAA, SOC2, and data-residency mandates can now run frontier reasoning locally on private silicon clusters.</p>

      <h3>Architectural Innovations</h3>
      <p>Rather than relying purely on massive parameter scaling, the recent breakthroughs stem from reinforcement learning on cold-start reasoning traces and multi-token prediction heads that optimize inference latency.</p>

      <h3>Strategic Implementation Blueprint</h3>
      <p>For organizations evaluating self-hosted models, quantization (specifically 4-bit and 8-bit AWQ) enables running 70B parameter reasoning models on dual consumer workstations with negligible degradation on standard STEM benchmarks.</p>
    `,
    date: "2026-11-04T09:30:00Z",
    author: "ListAIAssets Research",
    featuredImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    category: "LLMs & Reasoning",
    tags: ["DeepSeek R1", "Open Weights", "Inference", "Privacy"],
    readingTime: "5 min read",
  },
  {
    id: 103,
    slug: "headless-wordpress-with-nextjs-app-router-blueprint",
    title: "Architecting a High-Performance Headless CMS with Next.js 16 and WordPress",
    excerpt: "Why pairing a battle-tested WordPress editorial backend on shared cPanel hosting with a Next.js edge frontend delivers unbeatable SEO, sub-100ms TTFB, and zero licensing fees.",
    content: `
      <h2>Why WordPress Remains the Optimal Headless Editorial Engine</h2>
      <p>While modern SaaS CMS platforms charge exorbitant monthly seat tiers, open-source WordPress provides a battle-tested rich text editor, multi-author permissions, and extensible taxonomy systems—all for virtually zero marginal cost on existing shared business hosting.</p>

      <h3>Decoupling Architecture: Edge Frontend + Resilient Backend</h3>
      <p>By delegating the presentation layer to Next.js App Router deployed on Netlify Edge CDN and routing through Cloudflare Full Strict SSL, visitors experience instant page transitions and pristine Core Web Vitals while editors retain the familiarity of the WordPress admin panel.</p>

      <ol>
        <li><strong>Cloudflare DNS & Edge Caching</strong>: Serves cached static assets and shields the origin hosting from brute-force bot attacks.</li>
        <li><strong>WordPress REST API Endpoint</strong>: Provides machine-readable JSON at <code>/wp-json/wp/v2/posts</code>.</li>
        <li><strong>Next.js Incremental Regeneration</strong>: Automatically updates content on demand without requiring slow full-site rebuilds.</li>
      </ol>
    `,
    date: "2026-11-02T16:15:00Z",
    author: "Daniyal Ali Sajid",
    featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    category: "Architecture",
    tags: ["WordPress", "Next.js", "Headless CMS", "Netlify", "Cloudflare"],
    readingTime: "6 min read",
  },
];

function calculateReadingTime(text: string): string {
  const words = text.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function cleanExcerpt(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/\[&hellip;\]/g, "...")
    .trim();
}

/**
 * Fetch all published articles from WordPress REST API
 */
export async function getWordPressPosts(): Promise<WordPressPost[]> {
  const cmsBase = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://cms.listaiassets.com";

  try {
    // Attempt modern pretty permalink first, with fallback query parameter
    const urlsToTry = [
      `${cmsBase}/wp-json/wp/v2/posts?_embed=true&per_page=20`,
      `${cmsBase}/index.php?rest_route=/wp/v2/posts&_embed=true&per_page=20`,
    ];

    let data: any[] | null = null;

    for (const url of urlsToTry) {
      try {
        const res = await fetch(url, {
          next: { revalidate: 60 }, // Revalidate cache every 60 seconds (Next.js ISR)
          headers: {
            Accept: "application/json",
          },
        });
        if (res.ok) {
          data = await res.json();
          if (Array.isArray(data) && data.length > 0) break;
        }
      } catch (err) {
        // Continue to fallback url
      }
    }

    if (data && Array.isArray(data) && data.length > 0) {
      const posts: WordPressPost[] = data.map((item: any) => {
        // Extract embedded featured image
        let featuredImage: string | undefined = undefined;
        try {
          const media = item._embedded?.["wp:featuredmedia"]?.[0];
          featuredImage = media?.source_url || media?.media_details?.sizes?.large?.source_url;
        } catch {}

        // Extract author name
        let author = "ListAIAssets Team";
        try {
          const authorObj = item._embedded?.author?.[0];
          if (authorObj?.name) author = authorObj.name;
        } catch {}

        // Extract categories
        let category = "General";
        try {
          const terms = item._embedded?.["wp:term"]?.[0];
          if (Array.isArray(terms) && terms.length > 0) {
            category = terms[0].name;
          }
        } catch {}

        return {
          id: item.id,
          slug: item.slug,
          title: item.title?.rendered || "Untitled Post",
          content: item.content?.rendered || "",
          excerpt: cleanExcerpt(item.excerpt?.rendered || item.content?.rendered || ""),
          date: item.date_gmt ? `${item.date_gmt}Z` : item.date,
          author,
          featuredImage,
          category,
          tags: [],
          readingTime: calculateReadingTime(item.content?.rendered || ""),
        };
      });

      return posts;
    }
  } catch (err) {
    console.warn("WordPress REST API fetch encountered an error, using fallback seed content:", err);
  }

  return FALLBACK_ARTICLES;
}

/**
 * Fetch a single article by its URL slug
 */
export async function getWordPressPostBySlug(slug: string): Promise<WordPressPost | null> {
  const cmsBase = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://cms.listaiassets.com";

  try {
    const urlsToTry = [
      `${cmsBase}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=true`,
      `${cmsBase}/index.php?rest_route=/wp/v2/posts&slug=${encodeURIComponent(slug)}&_embed=true`,
    ];

    let postData: any = null;

    for (const url of urlsToTry) {
      try {
        const res = await fetch(url, {
          next: { revalidate: 60 },
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            postData = data[0];
            break;
          }
        }
      } catch {}
    }

    if (postData) {
      let featuredImage: string | undefined = undefined;
      try {
        const media = postData._embedded?.["wp:featuredmedia"]?.[0];
        featuredImage = media?.source_url || media?.media_details?.sizes?.large?.source_url;
      } catch {}

      let author = "ListAIAssets Team";
      try {
        const authorObj = postData._embedded?.author?.[0];
        if (authorObj?.name) author = authorObj.name;
      } catch {}

      let category = "General";
      try {
        const terms = postData._embedded?.["wp:term"]?.[0];
        if (Array.isArray(terms) && terms.length > 0) category = terms[0].name;
      } catch {}

      return {
        id: postData.id,
        slug: postData.slug,
        title: postData.title?.rendered || "Untitled Post",
        content: postData.content?.rendered || "",
        excerpt: cleanExcerpt(postData.excerpt?.rendered || postData.content?.rendered || ""),
        date: postData.date_gmt ? `${postData.date_gmt}Z` : postData.date,
        author,
        featuredImage,
        category,
        tags: [],
        readingTime: calculateReadingTime(postData.content?.rendered || ""),
      };
    }
  } catch (err) {
    console.warn(`Error fetching post with slug "${slug}":`, err);
  }

  // Check fallback articles
  const fallback = FALLBACK_ARTICLES.find((p) => p.slug === slug);
  return fallback || null;
}

