import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Telemetry & Lead Studio — Vendor Portal",
  description:
    "Real-time analytics, outbound click telemetry, promotional discount banners, and embedded lead capture widgets on ListAIAssets.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Vendor Studio — ListAIAssets",
    description: "Manage your tool listing, telemetry, and leads on ListAIAssets.",
    url: "/dashboard",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

