# ListAIAssets — Frontier AI Tools & Assets Directory

[![Domain](https://img.shields.io/badge/Domain-listaiassets.com-amber.svg)](https://listaiassets.com)
[![X / Twitter](https://img.shields.io/badge/X-%40ListAIAssets-black.svg?logo=x)](https://x.com/ListAIAssets)
[![GitHub](https://img.shields.io/badge/GitHub-listaiassets-181717.svg?logo=github)](https://github.com/listaiassets)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**ListAIAssets** ([listaiassets.com](https://listaiassets.com)) is an authoritative software intelligence directory, marketplace, and benchmark matrix indexing frontier AI foundation models, autonomous coding agents, generative design platforms, and enterprise workflows.

---

## Key Features

- **Empirical Telemetry Matrix**: Benchmark Time-to-First-Token (TTFT), token throughput, reasoning scores, and SWE-bench code accuracy.
- **Conversational AI Finder**: Natural language discovery engine that extracts user constraints (e.g., zero watermark, open-weights, developer API) and filters matching AI solutions.
- **Side-by-Side Comparison Matrix**: Head-to-head duels comparing technical capabilities, pricing structures, and community sentiment.
- **18 Production Categories**: Deep taxonomy covering Coding Agents, LLMs & Reasoning, Generative Art, Video, Audio, Search, Productivity, and Enterprise Automation.
- **Simplified 3-Tier Monetization**:
  - **Free Community ($0)**: Standard directory listing & review queue.
  - **Fast Track ($75)**: Guaranteed 12-hour publish SLA + permanent Do-Follow high DA SEO backlink.
  - **Featured Spotlight ($199)**: Top sticky placement, newsletter broadcast (35k+ devs), and social announcement.
- **Turnkey Payment Infrastructure**: Supports both **Lemon Squeezy** (ideal for international payouts via Payoneer/Wise) and **Stripe**, with zero-dependency sandbox fallback for instant local testing.
- **Private Admin Review Queue (`/admin/submissions`)**: Fast review interface with 1-click catalog JSON generation to approve listings in seconds.
- **Frontier SEO, AEO & GEO Standards**: Machine-readable `/llms.txt` and `/llms-full.txt`, rich JSON-LD structured schemas (`WebSite`, `Organization`, `CollectionPage`, `SoftwareApplication`, `FAQPage`), dynamic social cards via `/api/og`, and optimized Core Web Vitals.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4, Lucide Icons
- **Database / ORM**: Prisma ORM with Supabase PostgreSQL (pgvector readiness)
- **Payments / Monetization**: Lemon Squeezy & Stripe API integrations
- **Deployment**: Netlify Functions & Edge CDN

---

## Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/listaiassets/listaiassets.git
cd listaiassets
npm install
```

### 2. Environment Configuration

Copy the example environment configuration:

```bash
cp .env.example .env
```

Configure your credentials in `.env`:
- `NEXT_PUBLIC_SITE_URL`: `https://listaiassets.com` (or `http://localhost:3000` for local development)
- `LEMON_SQUEEZY_FAST_TRACK_URL` / `LEMON_SQUEEZY_FEATURED_URL`: Optional Lemon Squeezy checkout links
- `STRIPE_SECRET_KEY`: Optional Stripe API secret key
- `ADMIN_SECRET_KEY`: Passkey for `/admin/submissions` (default: `listaiassets_admin`)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## Production Domain

The official production domain for this application is:
👉 **[https://listaiassets.com](https://listaiassets.com)**

© 2026 ListAIAssets. All rights reserved.
