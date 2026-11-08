import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed & Submission Received",
  description: "Your AI tool has been received for editorial review and publishing on ListAIAssets.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SubmitSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

