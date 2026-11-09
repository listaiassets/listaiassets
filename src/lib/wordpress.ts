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

// Curated fallback articles for zero-downtime when CMS is initializing
const FALLBACK_ARTICLES: WordPressPost[] = [
  {
    id: 101,
    slug: "comparing-ai-coding-assistants-cursor-claude-copilot",
    title: "Comparing AI Coding Assistants: Cursor, Claude, and GitHub Copilot",
    excerpt: "A practical look at how the leading AI coding tools handle context, multi-file edits, and daily developer workflows.",
    content: `
      <h2>Context and Daily Workflow</h2>
      <p>Over the last year, AI coding assistants have moved from simple inline suggestions to understanding entire project codebases. While autocomplete is still helpful, the real productivity gains come from tools that can inspect multiple files, understand dependencies, and generate accurate pull requests.</p>
      
      <h3>Key Differences in Practice</h3>
      <p>Each tool takes a slightly different approach to development:</p>
      <ul>
        <li><strong>Cursor</strong>: Built directly on top of VS Code, offering full repository indexing and inline terminal execution.</li>
        <li><strong>Claude</strong>: Excels at extended reasoning, explaining complex architectural trade-offs, and large refactoring tasks.</li>
        <li><strong>GitHub Copilot</strong>: Integrates seamlessly into GitHub environments with solid inline suggestions and workspace awareness.</li>
      </ul>

      <h3>Which One Fits Your Stack?</h3>
      <p>If you need fast inline completions and broad IDE support, Copilot remains a solid default. If your day-to-day involves deep multi-file refactoring or navigating unfamiliar codebases, Cursor and Claude offer significantly more context awareness.</p>
    `,
    date: "2026-11-06T12:00:00Z",
    author: "ListAIAssets Team",
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    category: "Coding Tools",
    tags: ["Cursor", "Claude", "GitHub Copilot", "Developer Tools"],
    readingTime: "3 min read",
  },
  {
    id: 102,
    slug: "guide-to-running-local-open-source-llms",
    title: "A Practical Guide to Running Open-Source LLMs Locally",
    excerpt: "Hardware requirements, quantization tradeoffs, and when it makes sense to run models locally vs using hosted APIs.",
    content: `
      <h2>Why Run Models Locally?</h2>
      <p>Running models on your own machine gives you complete privacy, zero API costs, and the ability to work offline. With recent improvements in quantization and open-weights releases like DeepSeek and Llama, local models are now capable enough for real programming and writing tasks.</p>

      <h3>Hardware Requirements</h3>
      <p>The main bottleneck for local inference is memory (VRAM):</p>
      <ul>
        <li><strong>8B models</strong>: Run smoothly on 16GB of system RAM or a modern Apple Silicon Mac.</li>
        <li><strong>14B to 32B models</strong>: Require around 24GB to 32GB of unified memory or a dedicated GPU.</li>
        <li><strong>70B models</strong>: Typically require 48GB+ of memory or multi-GPU configurations.</li>
      </ul>

      <h3>Recommended Setup</h3>
      <p>Tools like Ollama and LM Studio have made setup straightforward. For most developers, a quantized 14B model provides the best balance between response speed and reasoning accuracy.</p>
    `,
    date: "2026-11-04T09:30:00Z",
    author: "ListAIAssets Team",
    featuredImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    category: "Open Source",
    tags: ["Open Source", "LLMs", "Inference", "Local AI"],
    readingTime: "4 min read",
  },
  {
    id: 103,
    slug: "how-to-choose-the-right-ai-tool-for-your-team",
    title: "How to Choose the Right AI Tool for Your Team",
    excerpt: "A straightforward framework for evaluating AI software by pricing model, licensing, and workflow integration.",
    content: `
      <h2>Evaluating Tools Beyond the Hype</h2>
      <p>With thousands of AI tools launching every month, it is easy to accumulate overlapping subscriptions. When evaluating software for your team, focusing on a few core criteria will save both budget and onboarding time.</p>

      <h3>Evaluation Checklist</h3>
      <ul>
        <li><strong>Pricing Structure</strong>: Is pricing per seat, per credit, or flat-rate? Credit-based pricing can lead to unexpected monthly spikes.</li>
        <li><strong>Data Privacy & Retention</strong>: Does the vendor train on your inputs, or do they guarantee zero-data retention?</li>
        <li><strong>API Access</strong>: Can you automate repetitive tasks through an API, or are you locked into their web interface?</li>
        <li><strong>Export Quality</strong>: Ensure generated assets (images, audio, or code) are watermark-free and commercially licensed.</li>
      </ul>

      <h3>Next Steps</h3>
      <p>Start with a small pilot on a single project before rolling out tooling across your entire team. Check our directory for verified pricing breakdowns and feature matrices.</p>
    `,
    date: "2026-11-02T16:15:00Z",
    author: "ListAIAssets Team",
    featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    category: "Productivity",
    tags: ["Productivity", "Pricing", "Evaluation", "Teams"],
    readingTime: "3 min read",
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
          next: {
            revalidate: 60, // ISR Safety net: Revalidate in background every 60s
            tags: ["wordpress-posts"], // Instant invalidation via /api/revalidate
          },
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
      // Exclude WordPress default boilerplate post ("Hello world!")
      const sanitizedData = data.filter((item: any) => {
        const slug = (item.slug || "").toLowerCase();
        const title = (item.title?.rendered || "").toLowerCase();
        return slug !== "hello-world" && !title.includes("hello world");
      });

      if (sanitizedData.length === 0) {
        // If CMS only has default unconfigured starter post, present authoritative research seed articles
        return FALLBACK_ARTICLES;
      }

      const posts: WordPressPost[] = sanitizedData.map((item: any) => {
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
          next: {
            revalidate: 60,
            tags: ["wordpress-posts", `wordpress-post-${slug}`],
          },
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
      // Exclude default placeholder post
      if (
        postData.slug === "hello-world" ||
        (postData.title?.rendered || "").toLowerCase().includes("hello world")
      ) {
        const fallback = FALLBACK_ARTICLES.find((p) => p.slug === slug);
        return fallback || null;
      }

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

