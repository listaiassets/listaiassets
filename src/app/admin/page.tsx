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

  // STRICT PRIVACY GATE:
  // If the visitor is NOT already authenticated AND did NOT provide the secret passkey:
  // Immediately return 404 Not Found!
  // Normal visitors will see a standard 404 page and have zero knowledge that /admin exists.
  if (!isAuthenticated && secretParam !== expectedSecret) {
    notFound();
  }

  return <AdminClientPortal initialAuthenticated={isAuthenticated} />;
}
