import { NextResponse } from "next/server";
import crypto from "crypto";
import { notifyOwnerOfSubmission } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";

/**
 * Lemon Squeezy Webhook Handler for ListAIAssets
 * Listens for "order_created" events from Lemon Squeezy.
 * - Verifies cryptographic HMAC SHA-256 signature
 * - Dispatches instant owner notification & logs to data/submissions.json
 * - Fulfills verified listing status in database if connected
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature");
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

    // 1. Verify HMAC SHA-256 Signature if secret is configured
    if (secret && signature) {
      const hmac = crypto.createHmac("sha256", secret);
      const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
      const signatureBuffer = Buffer.from(signature, "utf8");

      if (
        digest.length !== signatureBuffer.length ||
        !crypto.timingSafeEqual(digest, signatureBuffer)
      ) {
        console.error("[Lemon Squeezy] Invalid signature verification.");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const customData = payload.meta?.custom_data || {};
    const orderData = payload.data?.attributes || {};

    console.log(`[Lemon Squeezy] Webhook event received: ${eventName}`);

    // 2. Handle successful order
    if (eventName === "order_created") {
      const totalUsd = orderData.total_usd ? orderData.total_usd / 100 : orderData.total / 100 || 75;
      const toolName = customData.tool_name || customData.toolName || orderData.first_order_item?.product_name || "AI Product";
      const websiteUrl = customData.website_url || customData.websiteUrl || "https://listaiassets.com";
      const planId = customData.plan_id || (totalUsd >= 150 ? "featured" : "fast_track");
      const customerEmail = orderData.user_email || orderData.customer_email || "";
      const orderId = payload.data?.id || `ls_${Date.now()}`;

      // Notify owner & log to submissions.json
      await notifyOwnerOfSubmission({
        toolName,
        websiteUrl,
        planId,
        planName: planId === "featured" ? "Featured Spotlight" : "Fast Track",
        amountPaid: totalUsd,
        contactEmail: customerEmail,
        sessionId: `lemon_order_${orderId}`,
        isPaid: true,
      });

      // Update database if connected
      const slug = customData.tool_slug || toolName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      try {
        await prisma.tool.upsert({
          where: { slug },
          update: {
            status: "PUBLISHED",
            verifiedBadge: true,
          },
          create: {
            name: toolName,
            slug,
            tagline: "Frontier AI Solution",
            description: "Verified listing on ListAIAssets directory.",
            websiteUrl,
            status: "PUBLISHED",
            verifiedBadge: true,
          },
        });
        console.log(`[Lemon Squeezy] Promoted ${slug} to verified published status.`);
      } catch (dbErr) {
        console.warn("[Lemon Squeezy] Database fallback in webhook fulfillment:", dbErr);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("[Lemon Squeezy Webhook Error]:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
