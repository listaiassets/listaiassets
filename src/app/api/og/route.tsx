import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "ListAIAssets — Verified AI Directory";
    const tagline =
      searchParams.get("tagline") ||
      "Discover, benchmark, and deploy frontier AI models and autonomous software tools.";
    const badge = searchParams.get("badge") || "VERIFIED DIRECTORY";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#0a0a0b",
            padding: "60px 80px",
            fontFamily: "sans-serif",
            position: "relative",
          }}
        >
          {/* Top Brand & Badge */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <svg width="48" height="48" viewBox="0 0 100 100">
                <rect x="2" y="2" width="96" height="96" rx="23" fill="#14151b" stroke="#292524" strokeWidth="2.5" />
                <path d="M 50 76 L 76 63 L 76 69 L 50 82 L 24 69 L 24 63 Z" fill="#44403c" />
                <path d="M 50 63 L 76 50 L 50 37 L 24 50 Z" fill="#292524" stroke="#44403c" strokeWidth="1.5" />
                <path d="M 50 62 L 76 49 L 76 55 L 50 68 L 24 55 L 24 49 Z" fill="#a8a29e" />
                <path d="M 50 49 L 76 36 L 50 23 L 24 36 Z" fill="#ffffff" />
                <path d="M 50 47 L 76 34 L 76 39 L 50 52 L 24 39 L 24 34 Z" fill="#c2410c" />
                <path d="M 50 34 L 76 21 L 50 8 L 24 21 Z" fill="#f59e0b" />
                <path d="M 80 12 C 80 16 83.5 19.5 87.5 19.5 C 83.5 19.5 80 23 80 27 C 80 23 76.5 19.5 72.5 19.5 C 76.5 19.5 80 16 80 12 Z" fill="#fbbf24" />
              </svg>
              <div style={{ display: "flex", alignItems: "baseline", fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" }}>
                <span style={{ color: "#ffffff" }}>listaiassets</span>
                <span style={{ color: "#f59e0b" }}>.com</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(99, 102, 241, 0.12)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                borderRadius: "6px",
                padding: "6px 16px",
                fontSize: "13px",
                color: "#818cf8",
                fontWeight: "600",
                letterSpacing: "0.5px",
              }}
            >
              {badge}
            </div>
          </div>

          {/* Center Main Headline & Tagline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "700",
                color: "#ffffff",
                lineHeight: "1.15",
                letterSpacing: "-1px",
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "22px",
                color: "#a1a1aa",
                lineHeight: "1.4",
                margin: 0,
              }}
            >
              {tagline}
            </p>
          </div>

          {/* Bottom Telemetry Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #27272a",
              paddingTop: "24px",
            }}
          >
            <div style={{ display: "flex", gap: "24px" }}>
              <span style={{ fontSize: "14px", color: "#71717a", fontFamily: "monospace" }}>
                10,000+ AI TOOLS
              </span>
              <span style={{ fontSize: "14px", color: "#71717a", fontFamily: "monospace" }}>
                100% VERIFIED METRICS
              </span>
              <span style={{ fontSize: "14px", color: "#71717a", fontFamily: "monospace" }}>
                COMMUNITY BENCHMARKS
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", fontSize: "15px", fontWeight: "700" }}>
              <span style={{ color: "#ffffff" }}>listaiassets</span>
              <span style={{ color: "#ff6600" }}>.com</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OG image: ${e.message}`, { status: 500 });
  }
}
