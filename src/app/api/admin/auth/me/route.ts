import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

const NOINDEX_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
  "Cache-Control": "no-store, max-age=0",
};

export async function POST() {
  try {
    const hasLiveSupabase =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("[YOUR-PROJECT-REF]");

    if (hasLiveSupabase) {
      const supabaseServer = await createClient();
      await supabaseServer.auth.signOut();
    }

    const response = NextResponse.json({ success: true }, { headers: NOINDEX_HEADERS });
    const cookieStore = await cookies();
    cookieStore.delete("listaiassets_admin_session");

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Logout failed" },
      { status: 500, headers: NOINDEX_HEADERS }
    );
  }
}

export async function GET() {
  try {
    const hasLiveSupabase =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("[YOUR-PROJECT-REF]");

    if (hasLiveSupabase) {
      const supabaseServer = await createClient();
      const { data: { user }, error } = await supabaseServer.auth.getUser();

      if (error || !user) {
        return NextResponse.json({ authenticated: false }, { headers: NOINDEX_HEADERS });
      }

      const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
      const userEmail = user.email?.toLowerCase().trim();
      const hasAdminRole =
        user.app_metadata?.role === "admin" ||
        user.user_metadata?.role === "admin" ||
        (adminEmail && userEmail === adminEmail);

      if (!hasAdminRole) {
        return NextResponse.json({ authenticated: false }, { headers: NOINDEX_HEADERS });
      }

      return NextResponse.json(
        {
          authenticated: true,
          user: {
            id: user.id,
            email: user.email,
            role: "admin",
          },
        },
        { headers: NOINDEX_HEADERS }
      );
    } else {
      const cookieStore = await cookies();
      const session = cookieStore.get("listaiassets_admin_session");

      if (session?.value) {
        try {
          const user = JSON.parse(session.value);
          return NextResponse.json({ authenticated: true, user }, { headers: NOINDEX_HEADERS });
        } catch {
          // invalid cookie
        }
      }

      return NextResponse.json({ authenticated: false }, { headers: NOINDEX_HEADERS });
    }
  } catch {
    return NextResponse.json({ authenticated: false }, { headers: NOINDEX_HEADERS });
  }
}

