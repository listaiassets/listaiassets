import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminClientPortal } from "./AdminClientPortal";

interface AdminPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const secretParam = params.secret || params.key;
  const expectedSecret = process.env.ADMIN_SECRET_KEY || "listaiassets_admin";

  // 1. Check existing session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("listaiassets_admin_session");

  let isAuthenticated = false;
  if (sessionCookie?.value) {
    try {
      const parsed = JSON.parse(sessionCookie.value);
      if (parsed?.role === "admin") {
        isAuthenticated = true;
      }
    } catch {
      // invalid cookie
    }
  }

  // 2. Check Supabase session
  if (!isAuthenticated) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        isAuthenticated = true;
      }
    } catch {
      // fallback
    }
  }

  // OPTIONAL STEALTH GATE:
  // If REQUIRE_ADMIN_SECRET is set to "true" in .env, unauthenticated users without the secret param will see 404.
  // By default, visitors to /admin see the secure Admin Sign-In gate where only accounts marked with admin role in Supabase can authenticate.
  const requireSecret = process.env.REQUIRE_ADMIN_SECRET === "true";
  if (requireSecret && !isAuthenticated && secretParam !== expectedSecret) {
    notFound();
  }

  return <AdminClientPortal initialAuthenticated={isAuthenticated} />;
}
