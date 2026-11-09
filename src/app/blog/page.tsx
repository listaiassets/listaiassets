import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getWordPressPosts } from "@/lib/wordpress";

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

export default async function BlogIndexPage() {
  const posts = await getWordPressPosts();

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
    blogPost: posts.map((post) => ({
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
                  Guides &amp; Articles
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-3xl">
                Articles &amp; Guides
              </h1>
              <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                Practical guides, comparisons, and analysis on AI tools and workflows.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3.5 py-1.5 text-xs text-stone-600 dark:text-stone-400 shadow-xs">
              <span>Showing</span>
              <span className="font-mono font-bold text-stone-900 dark:text-white">
                {posts.length}
              </span>
              <span>{posts.length === 1 ? "article" : "articles"}</span>
            </div>
          </div>

          {/* Posts Grid or Clean Empty State */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 shadow-xs transition-colors duration-150 hover:border-amber-500/40 dark:hover:border-amber-500/40 hover:shadow-md dark:hover:shadow-black/50"
                >
                  <div>
                    {/* Category and Reading Time */}
                    <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 px-2 py-0.5 text-[10px] font-medium text-stone-700 dark:text-stone-300">
                        {post.category}
                      </span>
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
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                No articles published yet
              </h3>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                Articles published in your WordPress CMS will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

