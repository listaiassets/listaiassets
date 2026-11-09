import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | ListAIAssets",
  description: "Private administrative management portal.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

