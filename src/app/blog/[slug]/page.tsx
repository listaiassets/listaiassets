import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { getWordPressPostBySlug, getWordPressPosts } from "@/lib/wordpress";

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

      <article className="min-h-screen bg-[#fafaf8] dark:bg-[#0c0a09] transition-colors duration-150 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-6">
            <Link href="/" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-stone-400" />
            <Link href="/blog" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3 text-stone-400" />
            <span className="truncate max-w-[200px] sm:max-w-xs text-stone-700 dark:text-stone-300">
              {post.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="inline-flex items-center rounded-md border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 px-2 py-0.5 text-[10px] font-medium text-stone-700 dark:text-stone-300">
                {post.category}
              </span>
              <span className="text-stone-400 dark:text-stone-600">•</span>
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {post.readingTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 dark:text-white leading-tight mb-4 break-words">
              {post.title}
            </h1>

            {/* Author and Date Bar */}
            <div className="flex items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <span className="font-medium text-stone-900 dark:text-stone-100">{post.author}</span>
                <span>•</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>All Articles</span>
              </Link>
            </div>
          </header>

          {/* Featured Image if Present */}
          {post.featuredImage && (
            <div className="mb-8 overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto max-h-[420px] object-cover"
              />
            </div>
          )}

          {/* Article HTML Prose Content */}
          <div
            className="prose prose-stone dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-stone-900 dark:prose-headings:text-stone-100 prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-code:text-amber-600 dark:prose-code:text-amber-400 prose-pre:bg-stone-900 prose-pre:border prose-pre:border-stone-800 text-stone-800 dark:text-stone-300 leading-relaxed sm:text-base text-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Bottom Article Navigation */}
          <div className="mt-12 pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all articles</span>
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 transition-colors"
            >
              <span>Explore tools directory</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

