import { NextResponse } from "next/server";
import { stripe, PLAN_TIERS } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { notifyOwnerOfSubmission } from "@/lib/notifications";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planId, toolData } = body;

    if (!toolData?.name || !toolData?.websiteUrl) {
      return NextResponse.json(
        { error: "Tool name and website URL are required." },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "https://listaiassets.com";
    const slug = toolData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    // 1. FREE COMMUNITY PLAN ($0): Instant queue logging and confirmation
    if (planId === "free" || !planId) {
      // Save notification to persistent storage and alert owner
      await notifyOwnerOfSubmission({
        toolName: toolData.name,
        websiteUrl: toolData.websiteUrl,
        tagline: toolData.tagline || "",
        category: toolData.category || "General",
        planId: "free",
        planName: "Free Community",
        amountPaid: 0,
        contactEmail: toolData.contactEmail || "",
        isPaid: false,
      });

      try {
        await prisma.tool.upsert({
          where: { slug },
          update: {
            name: toolData.name,
            tagline: toolData.tagline || "",
            description: toolData.description || "",
            websiteUrl: toolData.websiteUrl,
            pricingType: toolData.pricingType || "FREEMIUM",
            status: "PENDING",
          },
          create: {
            name: toolData.name,
            slug,
            tagline: toolData.tagline || "Frontier AI Application",
            description: toolData.description || "Submitted via ListAIAssets community queue.",
            websiteUrl: toolData.websiteUrl,
            pricingType: toolData.pricingType || "FREEMIUM",
            status: "PENDING",
            verifiedBadge: false,
          },
        });
      } catch (dbErr) {
        console.warn("Prisma upsert fallback in sandbox mode:", dbErr);
      }

      return NextResponse.json({
        success: true,
        isFree: true,
        redirectUrl: `${origin}/submit/success?type=free&plan=free&slug=${slug}&toolName=${encodeURIComponent(toolData.name)}&websiteUrl=${encodeURIComponent(toolData.websiteUrl)}`,
      });
    }

    // 2. PAID PLANS: FAST_TRACK ($75) or FEATURED ($199)
    const selectedPlanKey = planId === "featured" ? "FEATURED" : "FAST_TRACK";
    const planConfig = PLAN_TIERS[selectedPlanKey];

    // Method A: Lemon Squeezy (Ideal for international payouts via Payoneer/Wise)
    const lemonUrl =
      planId === "featured"
        ? process.env.LEMON_SQUEEZY_FEATURED_URL
        : process.env.LEMON_SQUEEZY_FAST_TRACK_URL;

    if (lemonUrl) {
      await notifyOwnerOfSubmission({
        toolName: toolData.name,
        websiteUrl: toolData.websiteUrl,
        tagline: toolData.tagline || "",
        category: toolData.category || "General",
        planId,
        planName: planConfig.name,
        amountPaid: planConfig.price / 100,
        contactEmail: toolData.contactEmail || "",
        sessionId: `lemon_pending_${Date.now()}`,
        isPaid: true,
      });

      const params = new URLSearchParams();
      if (toolData.contactEmail) params.set("checkout[email]", toolData.contactEmail);
      params.set("checkout[custom][tool_name]", toolData.name);
      params.set("checkout[custom][tool_slug]", slug);
      params.set("checkout[custom][website_url]", toolData.websiteUrl);
      params.set("checkout[custom][plan_id]", planId);

      const redirectTarget = lemonUrl.includes("?")
        ? `${lemonUrl}&${params.toString()}`
        : `${lemonUrl}?${params.toString()}`;

      return NextResponse.json({
        success: true,
        checkoutUrl: redirectTarget,
      });
    }

    // Method B: Stripe Checkout (Direct card processing)
    const hasRealStripeKey =
      process.env.STRIPE_SECRET_KEY &&
      !process.env.STRIPE_SECRET_KEY.includes("dummy");

    if (hasRealStripeKey) {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `ListAIAssets ${planConfig.name} Placement`,
                description: `Guaranteed indexing & verified Do-Follow SEO backlink for ${toolData.name}`,
              },
              unit_amount: planConfig.price,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email: toolData.contactEmail || undefined,
        success_url: `${origin}/submit/success?type=paid&session_id={CHECKOUT_SESSION_ID}&plan=${planId}&slug=${slug}&toolName=${encodeURIComponent(toolData.name)}&websiteUrl=${encodeURIComponent(toolData.websiteUrl)}`,
        cancel_url: `${origin}/submit?payment=cancelled`,
        metadata: {
          toolName: toolData.name,
          toolSlug: slug,
          websiteUrl: toolData.websiteUrl,
          planTier: selectedPlanKey,
          contactEmail: toolData.contactEmail || "",
        },
      });

      return NextResponse.json({
        success: true,
        sessionId: session.id,
        checkoutUrl: session.url,
      });
    }

    // Method C: Sandbox / Test simulation fallback (Zero third-party dependency)
    await notifyOwnerOfSubmission({
      toolName: toolData.name,
      websiteUrl: toolData.websiteUrl,
      tagline: toolData.tagline || "",
      category: toolData.category || "General",
      planId,
      planName: planConfig.name,
      amountPaid: planConfig.price / 100,
      contactEmail: toolData.contactEmail || "",
      sessionId: `cs_mock_${Date.now()}`,
      isPaid: true,
    });

    return NextResponse.json({
      success: true,
      isSandbox: true,
      checkoutUrl: `${origin}/submit/success?type=paid&mock_session=cs_mock_${Date.now()}&plan=${planId}&slug=${slug}&toolName=${encodeURIComponent(toolData.name)}&websiteUrl=${encodeURIComponent(toolData.websiteUrl)}`,
    });
  } catch (error: any) {
    console.error("Checkout session error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
