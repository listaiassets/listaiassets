---
description: Mandatory SEO, AEO, and GEO optimization standards for all pages and components
globs: ["src/app/**/*", "src/components/**/*"]
---

# Mandatory SEO, AEO & GEO Directives

Whenever creating or modifying pages in ListAIAssets:

1. **20-Point SEO Checklist Compliance**:
   - Register route in `src/app/sitemap.ts`.
   - Ensure crawler access in `src/app/robots.ts`.
   - Never output `noindex` on indexable pages.
   - Include canonical tags via `alternates: { canonical: './' }`.
   - Add concise, keyword-rich meta title and meta description.
   - Exactly ONE `<h1>` per page.
   - Strict heading hierarchy (`h1` -> `h2` -> `h3` -> `h4`).
   - All images and logo SVGs must have `alt` or `aria-label` / `role="img"`.
   - Add structured JSON-LD schema (`SoftwareApplication`, `CollectionPage`, `FAQPage`, `BreadcrumbList`).
   - Ensure clean internal links with zero broken routes.
   - Enforce HTTPS and HSTS headers.
   - Ensure clean, lowercase, hyphenated URL slugs.
   - Dynamic Open Graph social preview via `/api/og`.
   - Search console verification tokens present in `layout.tsx`.
   - Synchronize new categories or tools with `/public/llms.txt` and `/public/llms-full.txt`.

2. **AEO (Answer Engine Optimization)**:
   - Provide direct 2-3 sentence answer definitions immediately beneath page titles for Perplexity, ChatGPT Search, and Claude.
   - Structure FAQ accordions with semantic headings and matching `FAQPage` JSON-LD schema.

3. **GEO (Generative Engine Optimization)**:
   - Include verified empirical benchmark telemetry with exact units (`ms`, `tokens/sec`, `$/mo`).
   - Use clean, unambiguous entity naming.
