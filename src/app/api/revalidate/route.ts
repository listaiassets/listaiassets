import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * On-Demand Cache Invalidation Webhook for Headless WordPress
 * Endpoint: POST /api/revalidate or GET /api/revalidate?secret=...&path=/blog
 * 
 * Invalidates Next.js cached pages and fetch tags immediately when a new article
 * is published, updated, or deleted in WordPress WITHOUT triggering a Netlify build.
 * Zero build minutes consumed on free plan!
 */
export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

async function handleRevalidate(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secretParam = searchParams.get("secret");
  const authHeader = request.headers.get("x-revalidate-secret");

  const expectedSecret = process.env.ADMIN_SECRET_KEY || "listaiassets_admin";

  // Validate Secret Passkey
  if (secretParam !== expectedSecret && authHeader !== expectedSecret) {
    return NextResponse.json(
      {
        revalidated: false,
        error: "Invalid or missing revalidation secret passkey.",
      },
      { status: 401 }
    );
  }

  try {
    // Attempt to extract slug or path if passed in body
    let slug = searchParams.get("slug") || searchParams.get("post_slug");
    const pathParam = searchParams.get("path");

    if (request.method === "POST") {
      try {
        const body = await request.json();
        if (body?.post?.post_name) {
          slug = body.post.post_name;
        } else if (body?.slug) {
          slug = body.slug;
        }
      } catch {
        // Body was empty or not JSON, proceed with query parameters
      }
    }

    // 1. Invalidate WordPress Cache Tags
    revalidateTag("wordpress-posts");
    if (slug) {
      revalidateTag(`wordpress-post-${slug}`);
    }

    // 2. Invalidate Static / ISR Paths
    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");
    revalidatePath("/");

    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }

    if (pathParam) {
      revalidatePath(pathParam);
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      paths: ["/blog", slug ? `/blog/${slug}` : null, "/sitemap.xml"].filter(Boolean),
      tags: ["wordpress-posts", slug ? `wordpress-post-${slug}` : null].filter(Boolean),
      message: "Cache successfully invalidated. New content is now live without rebuilding the project.",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        revalidated: false,
        error: error?.message || "Failed to revalidate cache.",
      },
      { status: 500 }
    );
  }
}

