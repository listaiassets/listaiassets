import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, Clock, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { getWordPressPosts } from "@/lib/wordpress";
import { Badge } from "@/components/badge";

export const metadata: Metadata = {
  title: "AI Research & Insights Blog | ListAIAssets",
  description:
    "Empirical benchmarks, telemetry comparisons, and engineering deep-dives into autonomous developer agents, reasoning foundation models, and generative AI infrastructure.",
  openGraph: {
    title: "AI Research & Insights Blog | ListAIAssets",
    description:
      "Empirical benchmarks, telemetry comparisons, and engineering deep-dives into autonomous developer agents and foundation models.",
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

  // JSON-LD Schema for Frontier SEO & LLM Grounding
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ListAIAssets Research & Blog",
    url: "https://listaiassets.com/blog",
    description:
      "Independent empirical benchmarks, architecture blueprints, and insights on frontier artificial intelligence models and developer agents.",
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

      <div className="min-h-screen bg-[#fafaf8] dark:bg-[#0c0a09] transition-colors duration-150 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Banner */}
          <div className="mb-12 border-b border-stone-200 dark:border-stone-800 pb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Headless CMS via WordPress API</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
              ListAIAssets <span className="text-amber-600 dark:text-amber-400">Insights</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
              Empirical telemetry, benchmark duels, and architectural guides on frontier foundation models, coding agents, and generative AI infrastructure.
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col justify-between rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 p-6 shadow-sm transition-all duration-200 hover:border-amber-500/40 hover:shadow-md"
              >
                <div>
                  {/* Category and Read Time */}
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-4">
                    <Badge variant="outline" className="border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20">
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Clock className="h-3.5 w-3.5 text-stone-400" />
                      {post.readingTime}
                    </span>
                  </div>

                  {/* Post Title */}
                  <h2 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform"
                  >
                    Read Post <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter / Submission CTA */}
          <div className="mt-16 rounded-2xl border border-stone-200 dark:border-stone-800 bg-gradient-to-r from-amber-50/50 via-stone-50 to-stone-100/50 dark:from-stone-900 dark:via-stone-900/80 dark:to-stone-950 p-8 sm:p-12 text-center">
            <BookOpen className="h-8 w-8 mx-auto text-amber-600 dark:text-amber-400 mb-3" />
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              Have an AI Tool or Research to Publish?
            </h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-lg mx-auto">
              Get your foundation model or developer agent indexed across our benchmark directory, comparisons, and research newsletter.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/submit"
                className="rounded-lg bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-500 transition-colors"
              >
                Submit Tool for Review
              </Link>
              <Link
                href="/tools"
                className="rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 px-5 py-2.5 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
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
