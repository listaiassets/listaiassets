/**
 * WordPress Headless CMS Client for ListAIAssets
 * Production CMS Endpoint: https://cms.listaiassets.com
 * Fetches articles, categories, and media directly from WordPress REST API.
 */

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description?: string;
}

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
  categorySlug: string;
  categoryId?: number;
  tags: string[];
  readingTime: string;
}

function calculateReadingTime(text: string): string {
  const words = text.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function cleanExcerpt(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/\[&hellip;\]/g, "...")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

function decodeHtml(raw: string): string {
  return raw
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "’")
    .trim();
}

/**
 * Fetch all categories directly from WordPress CMS
 */
export async function getWordPressCategories(): Promise<WordPressCategory[]> {
  const cmsBase = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://cms.listaiassets.com";

  try {
    const urlsToTry = [
      `${cmsBase}/wp-json/wp/v2/categories?per_page=100`,
      `${cmsBase}/index.php?rest_route=/wp/v2/categories&per_page=100`,
    ];

    for (const url of urlsToTry) {
      try {
        const res = await fetch(url, {
          next: {
            revalidate: 60,
            tags: ["wordpress-posts", "wordpress-categories"],
          },
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json)) {
            return json.map((cat: any) => ({
              id: cat.id,
              name: decodeHtml(cat.name || "Category"),
              slug: cat.slug || "uncategorized",
              count: cat.count || 0,
              description: cat.description || "",
            }));
          }
        }
      } catch {}
    }
  } catch (err) {
    console.error("WordPress Categories fetch error:", err);
  }

  return [];
}

/**
 * Fetch all published articles directly from WordPress CMS
 */
export async function getWordPressPosts(): Promise<WordPressPost[]> {
  const cmsBase = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://cms.listaiassets.com";

  try {
    // Support both pretty permalinks (/wp-json/) and plain permalinks (?rest_route=)
    const urlsToTry = [
      `${cmsBase}/wp-json/wp/v2/posts?_embed=true&per_page=100`,
      `${cmsBase}/index.php?rest_route=/wp/v2/posts&_embed=true&per_page=100`,
    ];

    let data: any[] | null = null;

    for (const url of urlsToTry) {
      try {
        const res = await fetch(url, {
          next: {
            revalidate: 60, // Background fallback
            tags: ["wordpress-posts"], // Instant invalidation via /api/revalidate webhook
          },
          headers: {
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json)) {
            data = json;
            break;
          }
        }
      } catch (err) {
        // Continue to fallback url
      }
    }

    if (data && Array.isArray(data)) {
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

        // Extract categories and slug
        let category = "General";
        let categorySlug = "general";
        let categoryId: number | undefined = undefined;
        try {
          const terms = item._embedded?.["wp:term"]?.[0];
          if (Array.isArray(terms) && terms.length > 0) {
            category = decodeHtml(terms[0].name);
            categorySlug = terms[0].slug;
            categoryId = terms[0].id;
          } else if (Array.isArray(item.categories) && item.categories.length > 0) {
            categoryId = item.categories[0];
          }
        } catch {}

        return {
          id: item.id,
          slug: item.slug,
          title: decodeHtml(item.title?.rendered || "Untitled Post"),
          content: item.content?.rendered || "",
          excerpt: cleanExcerpt(item.excerpt?.rendered || item.content?.rendered || ""),
          date: item.date_gmt ? `${item.date_gmt}Z` : item.date,
          author,
          featuredImage,
          category,
          categorySlug,
          categoryId,
          tags: [],
          readingTime: calculateReadingTime(item.content?.rendered || ""),
        };
      });

      return posts;
    }
  } catch (err) {
    console.error("WordPress API fetch error:", err);
  }

  return [];
}

/**
 * Fetch a single article by its URL slug directly from WordPress CMS
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
      let categorySlug = "general";
      let categoryId: number | undefined = undefined;
      try {
        const terms = postData._embedded?.["wp:term"]?.[0];
        if (Array.isArray(terms) && terms.length > 0) {
          category = decodeHtml(terms[0].name);
          categorySlug = terms[0].slug;
          categoryId = terms[0].id;
        } else if (Array.isArray(postData.categories) && postData.categories.length > 0) {
          categoryId = postData.categories[0];
        }
      } catch {}

      return {
        id: postData.id,
        slug: postData.slug,
        title: decodeHtml(postData.title?.rendered || "Untitled Post"),
        content: postData.content?.rendered || "",
        excerpt: cleanExcerpt(postData.excerpt?.rendered || postData.content?.rendered || ""),
        date: postData.date_gmt ? `${postData.date_gmt}Z` : postData.date,
        author,
        featuredImage,
        category,
        categorySlug,
        categoryId,
        tags: [],
        readingTime: calculateReadingTime(postData.content?.rendered || ""),
      };
    }
  } catch (err) {
    console.error(`Error fetching post with slug "${slug}":`, err);
  }

  return null;
}
