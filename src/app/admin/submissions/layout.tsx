import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Submissions & Review Queue | ListAIAssets",
  description: "Private administrative review portal for ListAIAssets.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
};

export default function AdminSubmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
