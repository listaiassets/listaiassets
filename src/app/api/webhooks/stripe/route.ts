import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { notifyOwnerOfSubmission } from "@/lib/notifications";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (metadata?.toolSlug) {
      const toolSlug = metadata.toolSlug;
      const planTier = (metadata.planTier as any) || "FAST_TRACK";
      const amountPaid = session.amount_total ? session.amount_total / 100 : planTier === "FEATURED" ? 199 : 75;

      // 1. Notify Owner instantly
      await notifyOwnerOfSubmission({
        toolName: metadata.toolName || toolSlug,
        websiteUrl: metadata.websiteUrl || "https://listaiassets.com",
        planId: planTier.toLowerCase(),
        planName: planTier === "FEATURED" ? "Featured Spotlight" : "Fast Track",
        amountPaid,
        contactEmail: session.customer_details?.email || metadata.contactEmail || "",
        sessionId: session.id,
        isPaid: true,
      });

      try {
        // 2. Promote tool to PUBLISHED with verified badge in database if connected
        await prisma.tool.upsert({
          where: { slug: toolSlug },
          update: {
            status: "PUBLISHED",
            verifiedBadge: true,
          },
          create: {
            name: metadata.toolName || toolSlug,
            slug: toolSlug,
            tagline: "Frontier AI Solution",
            description: "Verified listing on ListAIAssets directory.",
            websiteUrl: metadata.websiteUrl || "https://listaiassets.com",
            status: "PUBLISHED",
            verifiedBadge: true,
          },
        });

        console.log(`Successfully upgraded tool ${toolSlug} to ${planTier}`);
      } catch (dbError) {
        console.warn("Database fallback in webhook fulfillment:", dbError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
