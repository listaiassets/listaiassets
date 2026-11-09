import { NextResponse } from "next/server";
import { getLiveCatalogTools } from "@/lib/db-tools";

/**
 * GET /api/tools
 * Public API endpoint that returns all PUBLISHED tools.
 * Merges approved Supabase tools with verified seed tools.
 * NEVER returns unapproved PENDING tools.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q")?.toLowerCase();
    const planTier = searchParams.get("tier");

    let tools = await getLiveCatalogTools();

    if (category && category !== "ALL") {
      tools = tools.filter((t) =>
        t.categories.some((c) => c.slug.toLowerCase() === category.toLowerCase())
      );
    }

    if (query) {
      tools = tools.filter(
        (t) =>
          (t.name && t.name.toLowerCase().includes(query)) ||
          (t.tagline && t.tagline.toLowerCase().includes(query)) ||
          (t.description && t.description.toLowerCase().includes(query)) ||
          (t.tags && t.tags.some((tag) => tag && tag.toLowerCase().includes(query)))
      );
    }

    if (planTier && planTier !== "ALL") {
      tools = tools.filter((t) =>
        t.tags.some((tag) => tag.toLowerCase() === planTier.toLowerCase())
      );
    }

    return NextResponse.json(
      {
        success: true,
        total: tools.length,
        tools,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to load tools" },
      { status: 500 }
    );
  }
}
