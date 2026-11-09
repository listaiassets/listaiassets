import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  getAllSubmissions,
  updateSubmissionStatus,
  saveToolSubmission,
} from "@/lib/db-tools";

// Security helper: Check admin key, Supabase Auth session, or admin cookie
async function isAuthorized(req: Request): Promise<boolean> {
  const { searchParams } = new URL(req.url);
  const queryKey = searchParams.get("key");
  const headerKey = req.headers.get("x-admin-key");
  const adminSecret = process.env.ADMIN_SECRET_KEY || "listaiassets_admin";

  if (queryKey === adminSecret || headerKey === adminSecret) {
    return true;
  }

  // Check Supabase Auth
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) return true;
  } catch {
    // Fallback
  }

  // Check admin session cookie
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("listaiassets_admin_session");
    if (session?.value) return true;
  } catch {
    // Fallback
  }

  return false;
}

// Strict No-Index & Security Headers
const NOINDEX_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
  "Cache-Control": "no-store, max-age=0",
};

/**
 * GET /api/admin/submissions
 * Retrieves all submissions for the admin review queue.
 */
export async function GET(req: Request) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json(
      { error: "Unauthorized. Pass ?key=your_admin_key or x-admin-key header" },
      { status: 401, headers: NOINDEX_HEADERS }
    );
  }

  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get("status") || "ALL";

  try {
    const submissions = await getAllSubmissions(statusFilter);

    // Compute metrics
    const totalSubmissions = submissions.length;
    const pendingCount = submissions.filter((s) => s.status === "PENDING").length;
    const publishedCount = submissions.filter((s) => s.status === "PUBLISHED").length;
    const rejectedCount = submissions.filter((s) => s.status === "REJECTED").length;
    const totalRevenue = submissions.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
    const featuredCount = submissions.filter((s) => s.planTier === "FEATURED").length;
    const fastTrackCount = submissions.filter((s) => s.planTier === "FAST_TRACK").length;

    return NextResponse.json(
      {
        success: true,
        stats: {
          totalSubmissions,
          pendingCount,
          publishedCount,
          rejectedCount,
          totalRevenue,
          featuredCount,
          fastTrackCount,
        },
        submissions,
      },
      { headers: NOINDEX_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to load submissions" },
      { status: 500, headers: NOINDEX_HEADERS }
    );
  }
}

/**
 * PATCH /api/admin/submissions
 * Approves, rejects, or modifies a tool submission.
 */
export async function PATCH(req: Request) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json(
      { error: "Unauthorized. Pass ?key=your_admin_key or x-admin-key header" },
      { status: 401, headers: NOINDEX_HEADERS }
    );
  }

  try {
    const body = await req.json();
    const { slugOrId, action, planTier, adminNotes, verifiedBadge } = body;

    if (!slugOrId || !action) {
      return NextResponse.json(
        { error: "Missing required fields: slugOrId and action ('APPROVE' | 'REJECT')" },
        { status: 400, headers: NOINDEX_HEADERS }
      );
    }

    if (action !== "APPROVE" && action !== "REJECT") {
      return NextResponse.json(
        { error: "Invalid action. Supported: 'APPROVE' or 'REJECT'" },
        { status: 400, headers: NOINDEX_HEADERS }
      );
    }

    const result = await updateSubmissionStatus(slugOrId, action, {
      planTier,
      adminNotes,
      verifiedBadge,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update submission status" },
        { status: 404, headers: NOINDEX_HEADERS }
      );
    }

    // Trigger on-demand ISR revalidation for catalog pages
    try {
      revalidatePath("/");
      revalidatePath("/tools");
      revalidatePath("/categories");
      if (result.tool?.slug) {
        revalidatePath(`/tools/${result.tool.slug}`);
      }
    } catch (revalErr) {
      console.warn("ISR revalidation warning:", revalErr);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          action === "APPROVE"
            ? `Tool '${result.tool?.name}' approved and published live under ${result.tool?.planTier} tier!`
            : `Tool '${result.tool?.name}' marked as rejected.`,
        tool: result.tool,
      },
      { headers: NOINDEX_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process admin action" },
      { status: 500, headers: NOINDEX_HEADERS }
    );
  }
}

/**
 * POST /api/admin/submissions
 * Allows admin to manually create a new submission or import a tool directly into the queue.
 */
export async function POST(req: Request) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401, headers: NOINDEX_HEADERS }
    );
  }

  try {
    const body = await req.json();
    const result = await saveToolSubmission(body);
    return NextResponse.json(result, { headers: NOINDEX_HEADERS });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create submission" },
      { status: 500, headers: NOINDEX_HEADERS }
    );
  }
}
