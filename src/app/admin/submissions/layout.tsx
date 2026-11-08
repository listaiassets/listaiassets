import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Submissions & Review Queue",
  description: "Private administrative review portal for ListAIAssets.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminSubmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

