import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit & Claim Your AI Tool — Maintainer & Founder Portal",
  description:
    "Index your AI product or model in front of 30,000+ developers, enterprise buyers, and founders on ListAIAssets. Free community queue and accelerated publishing available.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Submit an AI Tool — ListAIAssets",
    description:
      "Get your AI software indexed on ListAIAssets directory with verified telemetry and Do-Follow SEO exposure.",
    url: "/submit",
  },
};

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

