import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { getWordPressPosts, getWordPressCategories } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Blog & Guides | ListAIAssets",
  description:
    "Guides, comparisons, and practical articles on artificial intelligence tools and models.",
  openGraph: {
    title: "Blog & Guides | ListAIAssets",
    description:
      "Guides, comparisons, and practical articles on artificial intelligence tools and models.",
    url: "https://listaiassets.com/blog",
    siteName: "ListAIAssets",
    type: "website",
  },
  alternates: {
    canonical: "https://listaiassets.com/blog",
  },
};

export const revalidate = 60; // Next.js ISR: Revalidate cache every 60 seconds

interface BlogIndexPageProps {
  searchParams?: Promise<{
    category?: string;
    page?: string;
  }>;
}

const POSTS_PER_PAGE = 9;

/**
 * Generate pagination page items with smart ellipsis windowing
 */
function getPaginationItems(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, 4, "...", total];
  }
  if (current >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const activeCategorySlug = (resolvedParams?.category || "ALL").trim();
  const rawPage = resolvedParams?.page;
  const parsedPage = typeof rawPage === "string" ? parseInt(rawPage, 10) : 1;
  const requestedPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  // Fetch posts and categories in parallel from WordPress
  const [allPosts, categories] = await Promise.all([
    getWordPressPosts(),
    getWordPressCategories(),
  ]);

  // Filter posts by active category if not "ALL"
  const filteredPosts =
    activeCategorySlug === "ALL"
      ? allPosts
      : allPosts.filter(
          (post) =>
            post.categorySlug.toLowerCase() === activeCategorySlug.toLowerCase() ||
            post.category.toLowerCase() === activeCategorySlug.toLowerCase()
        );

  const totalFilteredPosts = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredPosts / POSTS_PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const paginationItems = getPaginationItems(currentPage, totalPages);

  // Helper to construct paginated category URLs
  const buildPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (activeCategorySlug !== "ALL") {
      params.set("category", activeCategorySlug);
    }
    if (pageNum > 1) {
      params.set("page", pageNum.toString());
    }
    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
  };

  // Find active category object if selected
  const activeCategory =
    activeCategorySlug !== "ALL"
      ? categories.find(
          (c) =>
            c.slug.toLowerCase() === activeCategorySlug.toLowerCase() ||
            c.name.toLowerCase() === activeCategorySlug.toLowerCase()
        )
      : null;

  // JSON-LD Schema for Clean SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ListAIAssets Blog",
    url: "https://listaiassets.com/blog",
    description:
      "Guides, comparisons, and practical articles on artificial intelligence tools and models.",
    publisher: {
      "@type": "Organization",
      name: "ListAIAssets",
      url: "https://listaiassets.com",
    },
    blogPost: paginatedPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `https://listaiassets.com/blog/${post.slug}`,
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#fafaf8] dark:bg-[#0c0a09] transition-colors duration-150 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Bar - Simple, clean, and consistent with the directory */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Blog
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {activeCategory ? activeCategory.name : "Guides & Articles"}
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-3xl">
                {activeCategory ? activeCategory.name : "Articles & Guides"}
              </h1>
              <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                {activeCategory?.description ||
                  "Practical guides, comparisons, and analysis on AI tools and workflows."}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3.5 py-1.5 text-xs text-stone-600 dark:text-stone-400 shadow-xs">
              <span>Showing</span>
              <span className="font-mono font-bold text-stone-900 dark:text-white">
                {totalFilteredPosts <= POSTS_PER_PAGE
                  ? totalFilteredPosts
                  : `${startIndex + 1}–${Math.min(startIndex + POSTS_PER_PAGE, totalFilteredPosts)}`}
              </span>
              <span>
                {totalFilteredPosts <= POSTS_PER_PAGE
                  ? totalFilteredPosts === 1
                    ? "article"
                    : "articles"
                  : `of ${totalFilteredPosts} articles`}
              </span>
            </div>
          </div>

          {/* WordPress Categories Navigation Tabs */}
          {categories.length > 0 && (
            <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {/* All Articles Tab */}
              <Link
                href="/blog"
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all shrink-0 ${
                  activeCategorySlug === "ALL"
                    ? "bg-amber-600 text-white shadow-xs font-semibold"
                    : "border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] text-stone-600 dark:text-stone-400 hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                <span>All Articles</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activeCategorySlug === "ALL"
                      ? "bg-white/20 text-white font-bold"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-500"
                  }`}
                >
                  {allPosts.length}
                </span>
              </Link>

              {/* Dynamic WordPress Categories */}
              {categories.map((cat) => {
                const isActive = activeCategorySlug.toLowerCase() === cat.slug.toLowerCase();
                const matchCount = allPosts.filter(
                  (p) =>
                    p.categorySlug.toLowerCase() === cat.slug.toLowerCase() ||
                    p.category.toLowerCase() === cat.name.toLowerCase()
                ).length;

                return (
                  <Link
                    key={cat.id}
                    href={`/blog?category=${encodeURIComponent(cat.slug)}`}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all shrink-0 ${
                      isActive
                        ? "bg-amber-600 text-white shadow-xs font-semibold"
                        : "border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] text-stone-600 dark:text-stone-400 hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white font-bold"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-500"
                      }`}
                    >
                      {matchCount}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Posts Grid or Clean Empty State */}
          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 shadow-xs transition-colors duration-150 hover:border-amber-500/40 dark:hover:border-amber-500/40 hover:shadow-md dark:hover:shadow-black/50"
                >
                  <div>
                    {/* Category and Reading Time */}
                    <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-3">
                      <Link
                        href={`/blog?category=${encodeURIComponent(post.categorySlug)}`}
                        className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 px-2 py-0.5 text-[10px] font-medium text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        {post.category}
                      </Link>
                      <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                        {post.readingTime}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h2 className="font-semibold text-stone-900 dark:text-stone-100 tracking-tight text-sm sm:text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer Metadata */}
                  <div className="mt-5 pt-3.5 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <time dateTime={post.date} className="font-mono text-[11px] text-stone-400 dark:text-stone-500">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-stone-700 dark:text-stone-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
                    >
                      <span>Read</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-12 text-center">
              <Layers className="h-8 w-8 mx-auto text-stone-400 dark:text-stone-600 mb-3" />
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {activeCategory ? `No articles in "${activeCategory.name}" yet` : "No articles published yet"}
              </h3>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                {activeCategory
                  ? "Articles assigned to this category in WordPress will show up here."
                  : "Articles published in your WordPress CMS will appear here automatically."}
              </p>
              {activeCategorySlug !== "ALL" && (
                <div className="mt-5">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                  >
                    View All Articles
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-stone-200 dark:border-stone-800">
              <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                Page {currentPage} of {totalPages} ({totalFilteredPosts} total articles)
              </div>

              <nav
                aria-label="Blog pagination"
                className="flex items-center justify-center gap-1 sm:gap-1.5 max-w-full overflow-x-auto scrollbar-none py-1 -mx-1 px-1"
              >
                {/* Previous Page Button */}
                <Link
                  href={currentPage > 1 ? buildPageUrl(currentPage - 1) : "#"}
                  aria-disabled={currentPage <= 1}
                  tabIndex={currentPage <= 1 ? -1 : undefined}
                  className={`inline-flex h-8 sm:h-9 items-center gap-1 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-2 sm:px-3 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors shrink-0 ${
                    currentPage <= 1
                      ? "pointer-events-none opacity-40 cursor-not-allowed"
                      : "hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Link>

                {/* Page Number Buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  {paginationItems.map((item, idx) => {
                    if (item === "...") {
                      return (
                        <span
                          key={`ellipsis-${idx}`}
                          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-xs text-stone-400 dark:text-stone-600 font-mono select-none"
                        >
                          …
                        </span>
                      );
                    }

                    const pageNum = item as number;
                    const isActive = pageNum === currentPage;
                    const pageUrl = buildPageUrl(pageNum);

                    return (
                      <Link
                        key={`page-${pageNum}`}
                        href={pageUrl}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-xs font-mono font-medium transition-all ${
                          isActive
                            ? "bg-amber-600 text-white shadow-xs font-semibold"
                            : "border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                </div>

                {/* Next Page Button */}
                <Link
                  href={currentPage < totalPages ? buildPageUrl(currentPage + 1) : "#"}
                  aria-disabled={currentPage >= totalPages}
                  tabIndex={currentPage >= totalPages ? -1 : undefined}
                  className={`inline-flex h-8 sm:h-9 items-center gap-1 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-2 sm:px-3 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors shrink-0 ${
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-40 cursor-not-allowed"
                      : "hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white"
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </nav>
            </div>
          )}

          {/* Submission & Directory CTA Card */}
          <div className="mt-16 rounded-2xl border border-stone-200 dark:border-stone-800 bg-gradient-to-r from-amber-50/50 via-stone-50 to-stone-100/50 dark:from-stone-900 dark:via-stone-900/80 dark:to-stone-950 p-8 sm:p-12 text-center">
            <BookOpen className="h-8 w-8 mx-auto text-amber-600 dark:text-amber-400 mb-3" />
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              Have an AI Tool or Research to Publish?
            </h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-lg mx-auto leading-relaxed">
              Get your AI product, model, or developer tool indexed across our directory, comparison matrix, and community newsletter.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/submit"
                className="rounded-lg bg-amber-600 hover:bg-amber-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all active:scale-[0.98]"
              >
                Submit Tool for Review
              </Link>
              <Link
                href="/tools"
                className="rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 px-5 py-2.5 text-xs font-semibold text-stone-700 dark:text-stone-300 transition-colors"
              >
                Explore All 10,000+ Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
