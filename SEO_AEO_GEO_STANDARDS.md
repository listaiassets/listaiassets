# ListAIAssets — SEO, AEO & GEO Engineering Standards (20-Point Checklist)

This document enforces search engine optimization (SEO), answer engine optimization (AEO), and generative engine optimization (GEO) standards for ListAIAssets (listaiassets.com). All new pages, components, and tools added to the repository must comply with these guidelines.

---

## The 20 Mandatory Standards

### 1. Build & Maintain `sitemap.xml` (`src/app/sitemap.ts`)
- Every new static page or dynamic route must be registered in `sitemap.ts`.
- Set accurate `changeFrequency` (`daily` for directories/categories, `weekly` for comparisons/static pages) and `priority` (0.7 to 1.0).

### 2. Configure `robots.txt` (`src/app/robots.ts`)
- Allow all primary search crawlers (`Googlebot`, `Bingbot`).
- Explicitly authorize AI answer engine scrapers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`) to access all public pages and `/llms.txt`.
- Keep private endpoints (`/api/`) disallowed.

### 3. Remove `noindex` Tags
- Never place `noindex` on indexable production routes.
- Verify `robots: { index: true, follow: true }` in `metadata`.

### 4. Canonical Tags (`alternates.canonical`)
- Set canonical URLs on every page using `alternates: { canonical: './' }` or absolute HTTPS URLs to prevent duplicate content penalties.

### 5. Meta Titles
- Use the global title template: `%s | ListAIAssets`.
- Format: `[Primary Keyword] — [Compelling Value Hook] | ListAIAssets` (under 60 characters).

### 6. Meta Descriptions
- Length: 140–160 characters.
- Must articulate user search intent, key value proposition, and call to action.

### 7. Exactly One `<h1>` Per Page
- Each page must have exactly one semantic `<h1>` tag in the hero or header.
- Never use multiple `<h1>` tags on a single page.

### 8. Strict Heading Hierarchy (`h1` -> `h2` -> `h3` -> `h4`)
- Major sections must use `<h2>`.
- Sub-components, cards, and step elements inside sections must use `<h3>`.
- Inner attributes or tags must use `<h4>` or `<p>`. Never skip levels.

### 9. Alt Text & Accessible SVGs
- Every `<img>` tag must include a descriptive, keyword-rich `alt` attribute.
- Every vector SVG or logo component must have `role="img"` and `aria-label="[Tool Name] logo"`.

### 10. Schema Markup (JSON-LD) (`src/components/seo/JsonLd.tsx`)
- WebSite & Organization schema with Google `SearchAction`.
- `CollectionPage` & `ItemList` for directories and categories.
- `SoftwareApplication` with `AggregateRating` and `Offer` pricing for tools.
- `FAQPage` schema on guides and category pages.
- `BreadcrumbList` on all hierarchical paths.

### 11. Strategic Internal Linking
- Link related tools, comparison matrices, categories, and glossary items contextually with descriptive anchor text.

### 12. Zero Broken Links
- All internal navigation (`href`) must resolve to active routes without 404s or infinite redirect chains.

### 13. Image & Asset Compression
- Serve vector SVGs for UI logos and icons.
- Remote images must utilize Next.js Image Optimization with modern `avif` and `webp` formats configured in `next.config.mjs`.

### 14. Core Web Vitals
- Google fonts must specify `display: 'swap'` and `subsets: ['latin']`.
- No Layout Shifts (CLS < 0.05): reserve explicit dimensions (`width`, `height`) on all media and cards.
- Largest Contentful Paint (LCP < 1.5s): optimize hero components and preload critical assets.

### 15. Mobile-First Responsive Design
- Responsive layouts tested at 375px, 390px, 768px, 1024px, 1440px.
- Touch targets must be at least 44x44px.
- Zero horizontal layout scrollbars on mobile viewports.

### 16. Enforce HTTPS & Security Headers
- HSTS enabled via `next.config.mjs`: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- Security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`.

### 17. Clean Semantic URL Slugs
- URLs must be lowercase, hyphen-separated, and concise: `/categories/coding`, `/compare/cursor-vs-claude-3-7-sonnet`.
- No trailing slashes or messy query string redirects on primary landing pages.

### 18. Dynamic Open Graph Image (`/api/og`)
- High-resolution (1200x630) social sharing cards generated dynamically via `@vercel/og` with clean typography and badges.

### 19. Search Console Verification
- Verification meta tags configured in `RootLayout` (`verification: { google: "...", yandex: "...", other: { "msvalidate.01": "..." } }`).

### 20. Machine-Readable `llms.txt` & `llms-full.txt`
- Maintain `/public/llms.txt` and `/public/llms-full.txt` providing LLMs (Claude, Perplexity, GPT-4) with structured directory summaries, benchmark methodology, and taxonomy listings.

---

## AEO (Answer Engine Optimization) Directives
1. **Direct Answer Paragraphs**: Each category and tool page must include a 2–3 sentence direct answer immediately following the title answering *"What is [Category/Tool] and who should use it?"*.
2. **Q&A Structured Blocks**: Format FAQs with clear question headers and concise answers matching semantic queries users ask AI search engines.
3. **Structured Tables & Metrics**: Present benchmark scores, pricing tiers, and latency telemetry in semantic HTML `<table>` or structured card layouts with explicit metric units (`ms`, `tokens/sec`, `$/mo`).

---

## GEO (Generative Engine Optimization) Directives
1. **Authoritative Citations & Telemetry**: Provide verifiable data points (domain authority, review scores, response latency) so generative LLMs cite ListAIAssets as a primary source.
2. **Entity Consistency**: Maintain unambiguous entity naming (e.g., "Cursor AI by Anysphere", "Claude 3.7 Sonnet by Anthropic") across title tags, schemas, and descriptions.
3. **Information Gain**: Avoid regurgitating generic vendor copy; provide independent evaluation, feature comparisons, and licensing classifications.
