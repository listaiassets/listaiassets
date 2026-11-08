import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  User,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { getWordPressPostBySlug, getWordPressPosts } from "@/lib/wordpress";
import { Badge } from "@/components/badge";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWordPressPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | ListAIAssets",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://listaiassets.com";

  return {
    title: `${post.title} | ListAIAssets Research`,
    description: post.excerpt,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: "ListAIAssets",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getWordPressPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const revalidate = 60; // Next.js ISR: revalidate every 60 seconds

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getWordPressPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://listaiassets.com";

  // Article JSON-LD Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ListAIAssets",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen bg-[#fafaf8] dark:bg-[#0c0a09] transition-colors duration-150 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-8">
            <Link href="/" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-stone-400" />
            <Link href="/blog" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3 text-stone-400" />
            <span className="truncate max-w-[200px] sm:max-w-xs text-stone-800 dark:text-stone-200">
              {post.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-10 pb-8 border-b border-stone-200 dark:border-stone-800">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline" className="border-amber-500/40 text-amber-700 dark:text-amber-400 bg-amber-500/10 text-xs">
                {post.category}
              </Badge>
              <span className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-mono">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 leading-[1.15] mb-6">
              {post.title}
            </h1>

            {/* Author and Date Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">{post.author}</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-stone-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3 py-1.5 text-xs text-stone-600 dark:text-stone-300 hover:border-amber-500/40 hover:text-stone-950 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  All Articles
                </Link>
              </div>
            </div>
          </header>

          {/* Featured Image if Present */}
          {post.featuredImage && (
            <div className="mb-10 overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto max-h-[460px] object-cover"
              />
            </div>
          )}

          {/* Article HTML Prose Content */}
          <div
            className="prose prose-stone dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-stone-900 dark:prose-headings:text-stone-100 prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-code:text-amber-600 dark:prose-code:text-amber-400 prose-pre:bg-stone-900 prose-pre:border prose-pre:border-stone-800 text-stone-800 dark:text-stone-300 leading-relaxed sm:text-base text-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Bottom Callout & Directory Link */}
          <div className="mt-14 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-xl bg-stone-100/60 dark:bg-stone-900/40 p-6">
            <div>
              <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Indexed on ListAIAssets
              </h4>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-md">
                Looking for verified developer tools, coding agents, and foundation models? Explore the empirical benchmark matrix.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/tools"
                className="w-full sm:w-auto text-center rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
              >
                Explore 10,000+ Tools
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
