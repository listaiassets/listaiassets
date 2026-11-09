import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const NOINDEX_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
  "Cache-Control": "no-store, max-age=0",
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400, headers: NOINDEX_HEADERS }
      );
    }

    const hasLiveSupabase =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("[YOUR-PROJECT-REF]");

    if (hasLiveSupabase) {
      const supabaseServer = await createClient();
      const { data, error } = await supabaseServer.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 401, headers: NOINDEX_HEADERS }
        );
      }

      const user = data.user;
      const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
      const userEmail = user?.email?.toLowerCase().trim();

      // Check whether user is marked as admin in Supabase app_metadata, user_metadata, or matches ADMIN_EMAIL
      const hasAdminRole =
        user?.app_metadata?.role === "admin" ||
        user?.user_metadata?.role === "admin" ||
        (adminEmail && userEmail === adminEmail);

      if (!hasAdminRole) {
        // Sign out unauthorized user immediately
        await supabaseServer.auth.signOut();
        return NextResponse.json(
          {
            error:
              "Access Denied: This account is not marked as an administrator in Supabase. Set raw_app_meta_data role: 'admin' in Supabase or set ADMIN_EMAIL.",
          },
          { status: 403, headers: NOINDEX_HEADERS }
        );
      }

      return NextResponse.json(
        {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            role: "admin",
          },
          session: data.session,
        },
        { headers: NOINDEX_HEADERS }
      );
    } else {
      // Local fallback mode when Supabase credentials are being configured
      const adminEmail = (process.env.ADMIN_EMAIL || "admin@listaiassets.com").toLowerCase().trim();
      const inputEmail = email.toLowerCase().trim();

      if (inputEmail !== adminEmail && inputEmail !== "admin@listaiassets.com") {
        return NextResponse.json(
          {
            error: `Access Denied: Account is not authorized. Authorized admin: ${adminEmail}`,
          },
          { status: 403, headers: NOINDEX_HEADERS }
        );
      }

      const response = NextResponse.json(
        {
          success: true,
          message: "Signed in to admin session (Local fallback mode).",
          user: { id: "local_admin", email, role: "admin" },
        },
        { headers: NOINDEX_HEADERS }
      );

      response.cookies.set("listaiassets_admin_session", JSON.stringify({ email, role: "admin" }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Login failed" },
      { status: 500, headers: NOINDEX_HEADERS }
    );
  }
}
