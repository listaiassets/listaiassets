import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const NOINDEX_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
  "Cache-Control": "no-store, max-age=0",
};

export async function POST(req: Request) {
  try {
    const { email, password, adminKey } = await req.json();

    if (!email || !password || !adminKey) {
      return NextResponse.json(
        { error: "Email, password, and Admin Registration Passkey are required." },
        { status: 400, headers: NOINDEX_HEADERS }
      );
    }

    const expectedSecret = process.env.ADMIN_SECRET_KEY || "listaiassets_admin";
    if (adminKey !== expectedSecret) {
      return NextResponse.json(
        { error: "Invalid Admin Registration Passkey. Only verified administrators may sign up." },
        { status: 403, headers: NOINDEX_HEADERS }
      );
    }

    const hasLiveSupabase =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("[YOUR-PROJECT-REF]");

    if (hasLiveSupabase) {
      const adminClient = createAdminClient();

      // Create confirmed admin user directly in Supabase Auth
      const { data, error } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role: "admin", displayName: email.split("@")[0] },
      });

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400, headers: NOINDEX_HEADERS }
        );
      }

      // Automatically sign in the new admin user
      const supabaseServer = await createClient();
      const signInResult = await supabaseServer.auth.signInWithPassword({
        email,
        password,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Admin account registered and authenticated successfully in Supabase.",
          user: data.user,
          session: signInResult.data.session,
        },
        { headers: NOINDEX_HEADERS }
      );
    } else {
      // Local fallback mode when Supabase credentials are being configured
      const response = NextResponse.json(
        {
          success: true,
          message: "Admin account registered locally (Supabase is running in local sandbox fallback mode).",
          user: { id: `admin_${Date.now()}`, email, role: "admin" },
        },
        { headers: NOINDEX_HEADERS }
      );

      // Set admin session cookie
      response.cookies.set("listaiassets_admin_session", JSON.stringify({ email, role: "admin" }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process signup" },
      { status: 500, headers: NOINDEX_HEADERS }
    );
  }
}
