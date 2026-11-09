export interface DetailedTool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  websiteUrl: string;
  logoUrl?: string | null;
  pricingType: "FREE" | "FREEMIUM" | "PAID" | "TRIAL";
  startingPrice: number;
  pricePerCredit?: number; // e.g. $0.02
  categories: { id: string; name: string; slug: string }[];
  tags: string[];
  verifiedBadge: boolean;
  domainAuthority: number;
  reviewScore: number;
  dealPercent?: number | null;
  monthlyVisitors: string; // e.g. "4.2M"
  monthlyVisitorsNumber: number; // e.g. 4200000
  features: {
    api: boolean;
    mobileApp: boolean;
    web: boolean;
    noWatermark: boolean;
    commercialRights: boolean;
    openSource: boolean;
  };
  benchmarks: {
    latencyMs: number; // e.g. 180ms
    throughputTokensSec?: number;
    codeAccuracyPercent: number; // e.g. 94.2
    reasoningScore: number; // e.g. 96.5
  };
  communityVotes: {
    upvotes: number;
    downvotes: number;
  };
  publisher?: string;
  releaseDate?: string;
  isNewLaunch?: boolean;
  launchRank?: number;
  keyUseCases?: string[];
  longDescription?: string;
}

export const DETAILED_TOOLS: DetailedTool[] = [
  {
    id: "tool_vmake",
    name: "Vmake Labs",
    slug: "vmake-labs",
    tagline: "AI Social Video Studio for e-commerce products and viral content.",
    description: "Turn products into viral social videos. AI-powered e-commerce video generator, fashion model generator, video quality enhancer, and background changer.",
    longDescription: "Vmake Labs is an end-to-end AI creative suite engineered for e-commerce brands, marketing teams, and content creators. It automates product video generation, creates realistic AI fashion models from flat clothing photography, enhances video quality to 4K 60FPS, and removes watermarks seamlessly.",
    websiteUrl: "https://vmake.ai",
    pricingType: "FREEMIUM",
    startingPrice: 0,
    pricePerCredit: 0.05,
    categories: [
      { id: "cat_video", name: "Video & Animation", slug: "video" },
      { id: "cat_art", name: "Generative Art", slug: "art" },
    ],
    tags: ["social-video", "ecommerce", "video-enhancer", "fashion-models", "ugc", "reels"],
    verifiedBadge: true,
    domainAuthority: 78,
    reviewScore: 4.88,
    dealPercent: 25,
    monthlyVisitors: "3.2M",
    monthlyVisitorsNumber: 3200000,
    publisher: "Meitu Marketing",
    releaseDate: "Oct 29, 2026",
    isNewLaunch: true,
    launchRank: 1,
    keyUseCases: [
      "Generate AI human fashion models from ghost mannequins and flat lay clothing shots",
      "One-click 4K 60FPS video upscaling and resolution enhancement",
      "Automatic short-form product video creation for TikTok, Instagram Reels, and YouTube Shorts",
      "Instant video background removal and replacement with studio settings",
    ],
    features: {
      api: true,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 340,
      throughputTokensSec: 42,
      codeAccuracyPercent: 91.5,
      reasoningScore: 88.4,
    },
    communityVotes: {
      upvotes: 1842,
      downvotes: 38,
    },
  },
  {
    id: "tool_cursor",
    name: "Cursor AI",
    slug: "cursor",
    tagline: "The AI-first Code Editor built for pairing with frontier reasoning models.",
    description: "Cursor integrates deep codebase indexing with models like Claude 3.7 and GPT-4o to provide multi-file edits, inline terminal debugging, and predictive multi-line tab completions.",
    longDescription: "Cursor is an intelligent AI-native code editor forked from VS Code. It indexes your entire repository locally using vector embeddings, allowing developers to ask codebase-wide questions, refactor across dozens of files simultaneously, and generate context-aware unit tests and documentation directly in their terminal.",
    websiteUrl: "https://cursor.com",
    pricingType: "FREEMIUM",
    startingPrice: 20,
    pricePerCredit: 0.01,
    categories: [
      { id: "cat_coding", name: "Coding Agents", slug: "coding" },
      { id: "cat_dev", name: "Developer Tools", slug: "developer-tools" },
    ],
    tags: ["editor", "agentic-coding", "typescript", "pair-programmer", "vscode-fork"],
    verifiedBadge: true,
    domainAuthority: 84,
    reviewScore: 4.95,
    dealPercent: 20,
    monthlyVisitors: "6.8M",
    monthlyVisitorsNumber: 6800000,
    publisher: "Anysphere",
    releaseDate: "Nov 3, 2026",
    isNewLaunch: true,
    launchRank: 2,
    keyUseCases: [
      "Agentic multi-file refactoring and automated codebase migrations",
      "Smart Tab autocomplete predicting multiple lines ahead in real-time",
      "Inline terminal error diagnosis and instant patch generation",
      "Natural language codebase search using vector symbol indexing",
    ],
    features: {
      api: true,
      mobileApp: false,
      web: false,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 140,
      throughputTokensSec: 110,
      codeAccuracyPercent: 96.8,
      reasoningScore: 97.2,
    },
    communityVotes: {
      upvotes: 4820,
      downvotes: 112,
    },
  },
  {
    id: "tool_claude",
    name: "Claude 3.7 Sonnet",
    slug: "claude-3-7-sonnet",
    tagline: "Hybrid frontier reasoning and coding model with extended thought tokens.",
    description: "Anthropic's flagship model combining lightning-fast standard inference with deep architectural reasoning mode for complex software engineering and math.",
    websiteUrl: "https://claude.ai",
    pricingType: "FREEMIUM",
    startingPrice: 20,
    pricePerCredit: 0.015,
    categories: [
      { id: "cat_llm", name: "LLMs & Reasoning", slug: "llms" },
      { id: "cat_coding", name: "Coding Agents", slug: "coding" },
    ],
    tags: ["reasoning", "multimodal", "200k-context", "safety", "api-available"],
    verifiedBadge: true,
    domainAuthority: 91,
    reviewScore: 4.98,
    monthlyVisitors: "48.5M",
    monthlyVisitorsNumber: 48500000,
    publisher: "Anthropic",
    releaseDate: "Nov 5, 2026",
    isNewLaunch: true,
    launchRank: 3,
    longDescription: "Claude 3.7 Sonnet introduces hybrid frontier reasoning, empowering engineers and researchers to toggle dynamically between instantaneous response generation and extended, visible internal thinking tokens for difficult mathematical and architectural software problems.",
    keyUseCases: [
      "Full-stack software engineering and architecture design",
      "Competitive algorithmic problem solving and logic validation",
      "Document processing across 200,000+ token context windows",
      "Agentic web search and code execution via Anthropic API",
    ],
    features: {
      api: true,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 185,
      throughputTokensSec: 85,
      codeAccuracyPercent: 98.4,
      reasoningScore: 99.1,
    },
    communityVotes: {
      upvotes: 9340,
      downvotes: 180,
    },
  },
  {
    id: "tool_midjourney",
    name: "Midjourney v7",
    slug: "midjourney",
    tagline: "Hyper-realistic generative image synthesis and creative art platform.",
    description: "State of the art generative imagery with coherent typography, photorealistic lighting, cinematic textures, and intuitive camera controls.",
    websiteUrl: "https://midjourney.com",
    pricingType: "PAID",
    startingPrice: 10,
    pricePerCredit: 0.05,
    categories: [
      { id: "cat_art", name: "Generative Art", slug: "art" },
      { id: "cat_design", name: "Design & 3D", slug: "design" },
    ],
    tags: ["text-to-image", "photorealism", "design", "v7", "commercial"],
    verifiedBadge: true,
    domainAuthority: 89,
    reviewScore: 4.88,
    monthlyVisitors: "24.1M",
    monthlyVisitorsNumber: 24100000,
    features: {
      api: false,
      mobileApp: false,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 12000,
      codeAccuracyPercent: 70.0,
      reasoningScore: 88.0,
    },
    communityVotes: {
      upvotes: 7210,
      downvotes: 410,
    },
  },
  {
    id: "tool_runway",
    name: "Runway Gen-3 Alpha",
    slug: "runway-gen3",
    tagline: "High-fidelity AI video generation and world model simulation.",
    description: "Leading video synthesis engine capable of complex camera motions, cinematic photorealism, and style control with zero watermark export on paid plans.",
    websiteUrl: "https://runwayml.com",
    pricingType: "FREEMIUM",
    startingPrice: 12,
    pricePerCredit: 0.1,
    categories: [
      { id: "cat_video", name: "Video & Animation", slug: "video" },
      { id: "cat_art", name: "Generative Art", slug: "art" },
    ],
    tags: ["video-generation", "text-to-video", "no-watermark", "commercial"],
    verifiedBadge: true,
    domainAuthority: 87,
    reviewScore: 4.84,
    dealPercent: 25,
    monthlyVisitors: "11.2M",
    monthlyVisitorsNumber: 11200000,
    features: {
      api: true,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 25000,
      codeAccuracyPercent: 60.0,
      reasoningScore: 85.0,
    },
    communityVotes: {
      upvotes: 3890,
      downvotes: 195,
    },
  },
  {
    id: "tool_deepseek",
    name: "DeepSeek-R1",
    slug: "deepseek-r1",
    tagline: "Open-weights frontier reasoning engine trained through large-scale RL.",
    description: "Massively capable open-source reasoning model matching closed-source frontier architectures in competitive programming, math proofs, and transparent chain-of-thought.",
    websiteUrl: "https://deepseek.com",
    pricingType: "FREE",
    startingPrice: 0,
    pricePerCredit: 0.0005,
    categories: [
      { id: "cat_llm", name: "LLMs & Reasoning", slug: "llms" },
      { id: "cat_coding", name: "Coding Agents", slug: "coding" },
    ],
    tags: ["open-weights", "reinforcement-learning", "free", "api-available", "lfp"],
    verifiedBadge: true,
    domainAuthority: 79,
    reviewScore: 4.92,
    monthlyVisitors: "32.0M",
    monthlyVisitorsNumber: 32000000,
    publisher: "DeepSeek AI",
    releaseDate: "Nov 1, 2026",
    isNewLaunch: true,
    launchRank: 4,
    longDescription: "DeepSeek-R1 demonstrates open-weights frontier performance trained through large-scale reinforcement learning without supervised fine-tuning. It rivals premier commercial closed-source models in mathematics, competitive coding, and multi-step complex reasoning.",
    keyUseCases: [
      "Local offline deployment on private enterprise GPU infrastructure",
      "Automated code review and unit test generation",
      "Mathematical theorem proving and symbolic computation",
      "Low-cost high-throughput API integration with sub-penny pricing",
    ],
    features: {
      api: true,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: true,
    },
    benchmarks: {
      latencyMs: 320,
      throughputTokensSec: 65,
      codeAccuracyPercent: 96.1,
      reasoningScore: 98.7,
    },
    communityVotes: {
      upvotes: 8940,
      downvotes: 210,
    },
  },
  {
    id: "tool_perplexity",
    name: "Perplexity Pro",
    slug: "perplexity",
    tagline: "Live-search AI engine with transparent citation trees and academic search.",
    description: "Combines real-time web crawling with multi-LLM synthesis to provide conversational answers with verifiable inline sources.",
    websiteUrl: "https://perplexity.ai",
    pricingType: "FREEMIUM",
    startingPrice: 20,
    pricePerCredit: 0.02,
    categories: [
      { id: "cat_search", name: "Research & Search", slug: "search" },
    ],
    tags: ["search", "citations", "academic", "live-web"],
    verifiedBadge: true,
    domainAuthority: 86,
    reviewScore: 4.82,
    monthlyVisitors: "78.4M",
    monthlyVisitorsNumber: 78400000,
    features: {
      api: true,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 450,
      throughputTokensSec: 50,
      codeAccuracyPercent: 88.0,
      reasoningScore: 92.5,
    },
    communityVotes: {
      upvotes: 6120,
      downvotes: 140,
    },
  },
  {
    id: "tool_elevenlabs",
    name: "ElevenLabs Prime",
    slug: "elevenlabs",
    tagline: "Ultra-natural multilingual voice synthesis, voice cloning, and audio AI.",
    description: "Generates emotive, human-grade voiceovers with zero latency speech-to-speech translation across 32+ international languages.",
    websiteUrl: "https://elevenlabs.io",
    pricingType: "FREEMIUM",
    startingPrice: 5,
    pricePerCredit: 0.03,
    categories: [
      { id: "cat_audio", name: "Voice & Audio", slug: "audio" },
    ],
    tags: ["voice-cloning", "speech-synthesis", "podcast", "dubbing", "api-available"],
    verifiedBadge: true,
    domainAuthority: 82,
    reviewScore: 4.79,
    dealPercent: 15,
    monthlyVisitors: "14.5M",
    monthlyVisitorsNumber: 14500000,
    features: {
      api: true,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 120,
      throughputTokensSec: 140,
      codeAccuracyPercent: 75.0,
      reasoningScore: 89.0,
    },
    communityVotes: {
      upvotes: 4320,
      downvotes: 88,
    },
  },
  {
    id: "tool_v0",
    name: "v0 by Vercel",
    slug: "v0",
    tagline: "Generative UI system to rapidly scaffold, preview, and export React/Tailwind.",
    description: "Converts text prompts into modern Shadcn/UI and Tailwind CSS components ready to drop directly into Next.js App Router projects.",
    websiteUrl: "https://v0.dev",
    pricingType: "FREE",
    startingPrice: 0,
    pricePerCredit: 0,
    categories: [
      { id: "cat_coding", name: "Coding Agents", slug: "coding" },
      { id: "cat_dev", name: "Developer Tools", slug: "developer-tools" },
    ],
    tags: ["ui-generation", "react", "shadcn", "tailwind", "free"],
    verifiedBadge: true,
    domainAuthority: 80,
    reviewScore: 4.72,
    monthlyVisitors: "5.1M",
    monthlyVisitorsNumber: 5100000,
    publisher: "Vercel",
    releaseDate: "Nov 4, 2026",
    isNewLaunch: true,
    launchRank: 5,
    longDescription: "v0 by Vercel leverages generative models to translate natural language prompts into responsive, accessible UI blocks built with Tailwind CSS, Shadcn UI, and React. Export code with one click directly into modern Next.js frontends.",
    keyUseCases: [
      "Rapid web app interface prototyping and wireframing",
      "Interactive component generation with Shadcn UI and Radix primitives",
      "Instant copy-paste React code integration for Next.js",
      "Design-to-code workflow acceleration for front-end developers",
    ],
    features: {
      api: false,
      mobileApp: false,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 950,
      codeAccuracyPercent: 91.5,
      reasoningScore: 90.0,
    },
    communityVotes: {
      upvotes: 3100,
      downvotes: 94,
    },
  },
  {
    id: "tool_flux",
    name: "Flux.1 Schnell",
    slug: "flux-schnell",
    tagline: "Next-gen open-weights image synthesis model by Black Forest Labs.",
    description: "12B parameter rectified flow transformer for lightning-speed photorealistic image generation, permissive Apache 2.0 license, and zero watermarks.",
    websiteUrl: "https://blackforestlabs.ai",
    pricingType: "FREE",
    startingPrice: 0,
    pricePerCredit: 0.003,
    categories: [
      { id: "cat_art", name: "Generative Art", slug: "art" },
    ],
    tags: ["open-weights", "free", "no-watermark", "commercial-rights", "text-to-image"],
    verifiedBadge: true,
    domainAuthority: 76,
    reviewScore: 4.90,
    monthlyVisitors: "3.4M",
    monthlyVisitorsNumber: 3400000,
    publisher: "Black Forest Labs",
    releaseDate: "Oct 28, 2026",
    isNewLaunch: true,
    launchRank: 6,
    longDescription: "FLUX.1 [schnell] is a high-speed 12-billion parameter rectified flow model developed by the original creators of Stable Diffusion at Black Forest Labs. It creates photorealistic textures and typography with minimal step counts and is licensed under Apache 2.0 for commercial and local deployment.",
    keyUseCases: [
      "Ultra-low latency text-to-image synthesis in 1 to 4 diffusion steps",
      "Commercial product packaging, concept art, and high-fidelity mockups",
      "Permissive Apache 2.0 on-premise local inference with ComfyUI",
      "High typographic precision for posters and marketing graphics",
    ],
    features: {
      api: true,
      mobileApp: false,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: true,
    },
    benchmarks: {
      latencyMs: 850,
      codeAccuracyPercent: 65.0,
      reasoningScore: 93.0,
    },
    communityVotes: {
      upvotes: 5610,
      downvotes: 75,
    },
  },
  {
    id: "tool_notion_ai",
    name: "Notion AI",
    slug: "notion-ai",
    tagline: "Connected workspace AI assistant for docs, projects, and wikis.",
    description: "Search across company knowledge bases, auto-generate action items from meetings, and draft technical project roadmaps directly within Notion.",
    websiteUrl: "https://notion.so",
    pricingType: "PAID",
    startingPrice: 10,
    pricePerCredit: 0.02,
    categories: [
      { id: "cat_productivity", name: "Productivity & Assistants", slug: "productivity" },
      { id: "cat_copywriting", name: "Writing & Content", slug: "copywriting" },
    ],
    tags: ["workspace", "notes", "summarization", "wiki", "project-management"],
    verifiedBadge: true,
    domainAuthority: 92,
    reviewScore: 4.86,
    monthlyVisitors: "152.0M",
    monthlyVisitorsNumber: 152000000,
    features: {
      api: true,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 380,
      codeAccuracyPercent: 82.0,
      reasoningScore: 89.5,
    },
    communityVotes: {
      upvotes: 6840,
      downvotes: 190,
    },
  },
  {
    id: "tool_chatgpt",
    name: "ChatGPT 4o",
    slug: "chatgpt-4o",
    tagline: "Omni-modal flagship conversational model for voice, vision, and text.",
    description: "OpenAI's benchmark foundation model offering real-time native audio conversations, live screen interpretation, and advanced data analysis.",
    websiteUrl: "https://chatgpt.com",
    pricingType: "FREEMIUM",
    startingPrice: 20,
    pricePerCredit: 0.015,
    categories: [
      { id: "cat_llms", name: "LLMs & Reasoning", slug: "llms" },
      { id: "cat_productivity", name: "Productivity & Assistants", slug: "productivity" },
    ],
    tags: ["omni", "voice-mode", "vision", "gpt-4o", "plugins"],
    verifiedBadge: true,
    domainAuthority: 96,
    reviewScore: 4.94,
    monthlyVisitors: "320.0M",
    monthlyVisitorsNumber: 320000000,
    features: {
      api: true,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 210,
      throughputTokensSec: 92,
      codeAccuracyPercent: 94.8,
      reasoningScore: 97.5,
    },
    communityVotes: {
      upvotes: 12500,
      downvotes: 320,
    },
  },
  {
    id: "tool_github_copilot",
    name: "GitHub Copilot",
    slug: "github-copilot",
    tagline: "The world's most widely adopted AI developer tool and coding assistant.",
    description: "Seamlessly integrated into VS Code, JetBrains, and GitHub CLI, Copilot suggests whole lines and functions based on billions of public lines of code.",
    websiteUrl: "https://github.com/features/copilot",
    pricingType: "PAID",
    startingPrice: 10,
    pricePerCredit: 0.01,
    categories: [
      { id: "cat_coding", name: "Coding Agents", slug: "coding" },
      { id: "cat_dev", name: "Developer Tools", slug: "developer-tools" },
    ],
    tags: ["vscode", "pair-programming", "github", "enterprise-ready"],
    verifiedBadge: true,
    domainAuthority: 95,
    reviewScore: 4.81,
    monthlyVisitors: "88.0M",
    monthlyVisitorsNumber: 88000000,
    features: {
      api: true,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 160,
      throughputTokensSec: 105,
      codeAccuracyPercent: 92.4,
      reasoningScore: 91.0,
    },
    communityVotes: {
      upvotes: 8420,
      downvotes: 410,
    },
  },
  {
    id: "tool_jasper",
    name: "Jasper AI",
    slug: "jasper-ai",
    tagline: "Enterprise AI content platform trained on brand voice and marketing ROI.",
    description: "High-converting marketing copywriter designed for enterprise growth teams. Includes brand voice memory, style guides, and multi-channel campaign builders.",
    websiteUrl: "https://jasper.ai",
    pricingType: "PAID",
    startingPrice: 39,
    pricePerCredit: 0.04,
    categories: [
      { id: "cat_copywriting", name: "Writing & Content", slug: "copywriting" },
      { id: "cat_marketing", name: "Marketing & Growth", slug: "marketing" },
    ],
    tags: ["marketing-copy", "brand-voice", "seo-mode", "campaigns"],
    verifiedBadge: true,
    domainAuthority: 83,
    reviewScore: 4.76,
    monthlyVisitors: "8.9M",
    monthlyVisitorsNumber: 8900000,
    features: {
      api: true,
      mobileApp: false,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 420,
      codeAccuracyPercent: 74.0,
      reasoningScore: 86.0,
    },
    communityVotes: {
      upvotes: 3200,
      downvotes: 180,
    },
  },
  {
    id: "tool_julius",
    name: "Julius AI",
    slug: "julius-ai",
    tagline: "Natural language data analyst for spreadsheets, SQL, and predictive charts.",
    description: "Upload spreadsheets, connect Postgres/Snowflake, and chat in plain English to generate interactive visualizations, statistical regressions, and forecasts.",
    websiteUrl: "https://julius.ai",
    pricingType: "FREEMIUM",
    startingPrice: 20,
    pricePerCredit: 0.02,
    categories: [
      { id: "cat_data", name: "Data & Analytics", slug: "data" },
      { id: "cat_productivity", name: "Productivity & Assistants", slug: "productivity" },
    ],
    tags: ["text-to-sql", "python-sandbox", "data-viz", "csv-analysis"],
    verifiedBadge: true,
    domainAuthority: 78,
    reviewScore: 4.88,
    monthlyVisitors: "4.7M",
    monthlyVisitorsNumber: 4700000,
    features: {
      api: false,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 510,
      codeAccuracyPercent: 93.5,
      reasoningScore: 94.0,
    },
    communityVotes: {
      upvotes: 4120,
      downvotes: 95,
    },
  },
  {
    id: "tool_fin_intercom",
    name: "Fin by Intercom",
    slug: "fin-intercom",
    tagline: "Autonomous customer service AI resolving complex tickets with zero human intervention.",
    description: "Fin answers customer questions with accurate, conversational answers based on your existing help center docs, reducing support volume by up to 50%.",
    websiteUrl: "https://intercom.com/fin",
    pricingType: "PAID",
    startingPrice: 99,
    pricePerCredit: 0.99,
    categories: [
      { id: "cat_support", name: "Customer Support & Chatbots", slug: "support" },
    ],
    tags: ["support-automation", "helpdesk", "sla-deflection", "hallucination-free"],
    verifiedBadge: true,
    domainAuthority: 89,
    reviewScore: 4.91,
    monthlyVisitors: "28.0M",
    monthlyVisitorsNumber: 28000000,
    features: {
      api: true,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 290,
      codeAccuracyPercent: 88.0,
      reasoningScore: 96.0,
    },
    communityVotes: {
      upvotes: 5410,
      downvotes: 110,
    },
  },
  {
    id: "tool_apollo_ai",
    name: "Apollo AI",
    slug: "apollo-ai",
    tagline: "B2B sales intelligence, contact enrichment, and hyper-personalized sequencing.",
    description: "Access 275M+ verified contacts, generate hyper-targeted email icebreakers, and automate multi-channel cadences to book qualified sales meetings.",
    websiteUrl: "https://apollo.io",
    pricingType: "FREEMIUM",
    startingPrice: 49,
    pricePerCredit: 0.05,
    categories: [
      { id: "cat_sales", name: "Sales & Outreach", slug: "sales" },
      { id: "cat_marketing", name: "Marketing & Growth", slug: "marketing" },
    ],
    tags: ["lead-enrichment", "cold-email", "b2b-database", "sales-pipeline"],
    verifiedBadge: true,
    domainAuthority: 86,
    reviewScore: 4.83,
    monthlyVisitors: "19.5M",
    monthlyVisitorsNumber: 19500000,
    features: {
      api: true,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 340,
      codeAccuracyPercent: 80.0,
      reasoningScore: 87.0,
    },
    communityVotes: {
      upvotes: 3840,
      downvotes: 140,
    },
  },
  {
    id: "tool_make_ai",
    name: "Make AI",
    slug: "make-ai",
    tagline: "Visual workflow automation canvas connecting thousands of apps with LLMs.",
    description: "Build visual, multi-step agentic workflows that ingest webhooks, parse documents with vision models, and execute complex business logic automatically.",
    websiteUrl: "https://make.com",
    pricingType: "FREEMIUM",
    startingPrice: 9,
    pricePerCredit: 0.01,
    categories: [
      { id: "cat_workflow", name: "Workflow Automation", slug: "workflow" },
      { id: "cat_dev", name: "Developer Tools", slug: "developer-tools" },
    ],
    tags: ["ipaas", "visual-builder", "multi-step", "webhooks"],
    verifiedBadge: true,
    domainAuthority: 87,
    reviewScore: 4.89,
    monthlyVisitors: "16.8M",
    monthlyVisitorsNumber: 16800000,
    features: {
      api: true,
      mobileApp: false,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 190,
      codeAccuracyPercent: 89.0,
      reasoningScore: 92.0,
    },
    communityVotes: {
      upvotes: 6200,
      downvotes: 90,
    },
  },
  {
    id: "tool_kling",
    name: "Kling AI",
    slug: "kling-ai",
    tagline: "Realistic 1080p generative video engine with coherent 3D physics.",
    description: "High-definition video generation model producing 2-minute cinematic clips with natural physical interactions, fluid dynamics, and expressive character motion.",
    websiteUrl: "https://klingai.org",
    pricingType: "FREEMIUM",
    startingPrice: 10,
    pricePerCredit: 0.08,
    categories: [
      { id: "cat_video", name: "Video & Animation", slug: "video" },
      { id: "cat_art", name: "Generative Art", slug: "art" },
    ],
    tags: ["video-synthesis", "physics-simulation", "1080p", "motion-brush"],
    verifiedBadge: true,
    domainAuthority: 74,
    reviewScore: 4.87,
    monthlyVisitors: "18.2M",
    monthlyVisitorsNumber: 18200000,
    publisher: "Kuaishou Technology",
    releaseDate: "Nov 2, 2026",
    isNewLaunch: true,
    launchRank: 7,
    longDescription: "Kling AI is a next-generation video synthesis model built on a 3D spatio-temporal joint attention mechanism. It generates up to 2-minute 1080p clips at 30fps with accurate real-world physics, fluid mechanics, and natural facial expressions.",
    keyUseCases: [
      "Cinematic 1080p video generation with 3D camera path controls",
      "Character animation and complex facial emotion synthesis",
      "Motion brush tool to direct movement of specific scene elements",
      "Text-to-video and image-to-video generation for marketing and filmmaking",
    ],
    features: {
      api: true,
      mobileApp: true,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 18000,
      codeAccuracyPercent: 65.0,
      reasoningScore: 88.0,
    },
    communityVotes: {
      upvotes: 4950,
      downvotes: 160,
    },
  },
  {
    id: "tool_notebooklm",
    name: "NotebookLM",
    slug: "notebooklm",
    tagline: "Grounded research assistant converting complex sources into synthetic audio podcasts.",
    description: "Google's Gemini-powered research notebook that grounds answers strictly in your uploaded PDFs, Google Docs, and YouTube links, complete with viral Audio Overviews.",
    websiteUrl: "https://notebooklm.google.com",
    pricingType: "FREE",
    startingPrice: 0,
    pricePerCredit: 0,
    categories: [
      { id: "cat_search", name: "Research & Deep Search", slug: "search" },
      { id: "cat_education", name: "Education & Learning", slug: "education" },
      { id: "cat_productivity", name: "Productivity & Assistants", slug: "productivity" },
    ],
    tags: ["audio-overview", "pdf-chat", "grounded-citations", "free", "gemini"],
    verifiedBadge: true,
    domainAuthority: 97,
    reviewScore: 4.95,
    monthlyVisitors: "42.0M",
    monthlyVisitorsNumber: 42000000,
    features: {
      api: false,
      mobileApp: false,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 320,
      codeAccuracyPercent: 91.0,
      reasoningScore: 96.5,
    },
    communityVotes: {
      upvotes: 9800,
      downvotes: 110,
    },
  },
  {
    id: "tool_harvey",
    name: "Harvey AI",
    slug: "harvey-ai",
    tagline: "Enterprise legal intelligence platform designed for top law firms and general counsels.",
    description: "Harvey assists attorneys with contract analysis, due diligence, litigation drafting, and regulatory research with stringent data privacy and zero model retraining guarantees.",
    websiteUrl: "https://harvey.ai",
    pricingType: "PAID",
    startingPrice: 200,
    pricePerCredit: 1.5,
    categories: [
      { id: "cat_legal", name: "Legal & Compliance", slug: "legal" },
    ],
    tags: ["contract-analysis", "enterprise-legal", "soc2", "private-cloud"],
    verifiedBadge: true,
    domainAuthority: 79,
    reviewScore: 4.93,
    monthlyVisitors: "1.8M",
    monthlyVisitorsNumber: 1800000,
    features: {
      api: true,
      mobileApp: false,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 440,
      codeAccuracyPercent: 97.2,
      reasoningScore: 98.9,
    },
    communityVotes: {
      upvotes: 2150,
      downvotes: 45,
    },
  },
  {
    id: "tool_meshy",
    name: "Meshy AI",
    slug: "meshy-ai",
    tagline: "Accelerate 3D asset creation from text prompts and 2D concept images.",
    description: "Generate production-ready 3D meshes with PBR maps, auto-UV unwrapping, and animation-ready quad topology in under two minutes for Unity and Unreal Engine.",
    websiteUrl: "https://meshy.ai",
    pricingType: "FREEMIUM",
    startingPrice: 16,
    pricePerCredit: 0.05,
    categories: [
      { id: "cat_3d", name: "3D & Game Assets", slug: "3d" },
      { id: "cat_art", name: "Generative Art", slug: "art" },
    ],
    tags: ["text-to-3d", "pbr-textures", "gltf-export", "game-dev"],
    verifiedBadge: true,
    domainAuthority: 73,
    reviewScore: 4.82,
    monthlyVisitors: "2.9M",
    monthlyVisitorsNumber: 2900000,
    features: {
      api: true,
      mobileApp: false,
      web: true,
      noWatermark: true,
      commercialRights: true,
      openSource: false,
    },
    benchmarks: {
      latencyMs: 9500,
      codeAccuracyPercent: 78.0,
      reasoningScore: 89.0,
    },
    communityVotes: {
      upvotes: 2750,
      downvotes: 68,
    },
  },
];

/**
 * Find a detailed tool by slug or identifier with fallback normalization
 */
export function getToolBySlug(slug: string): DetailedTool | undefined {
  if (!slug) return undefined;
  const normalized = decodeURIComponent(slug).toLowerCase().trim();
  return (
    DETAILED_TOOLS.find((t) => t.slug.toLowerCase() === normalized) ||
    DETAILED_TOOLS.find((t) => t.id.toLowerCase() === normalized) ||
    DETAILED_TOOLS.find((t) => t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalized) ||
    DETAILED_TOOLS.find((t) => t.slug.toLowerCase().includes(normalized) || normalized.includes(t.slug.toLowerCase()))
  );
}

/**
 * Retrieve curated top new product launches ranked by launch performance
 */
export function getNewProductLaunches(): DetailedTool[] {
  const launches = DETAILED_TOOLS.filter((t) => t.isNewLaunch);
  if (launches.length > 0) {
    return launches.sort((a, b) => (a.launchRank || 99) - (b.launchRank || 99));
  }
  return DETAILED_TOOLS.slice(0, 6);
}

/**
 * Retrieve companion and alternative tools in similar categories
 */
export function getRelatedTools(currentTool: DetailedTool, limit: number = 3): DetailedTool[] {
  const currentCatSlugs = new Set(currentTool.categories.map((c) => c.slug.toLowerCase()));
  return DETAILED_TOOLS.filter((t) => t.id !== currentTool.id)
    .sort((a, b) => {
      const aMatches = a.categories.filter((c) => currentCatSlugs.has(c.slug.toLowerCase())).length;
      const bMatches = b.categories.filter((c) => currentCatSlugs.has(c.slug.toLowerCase())).length;
      if (bMatches !== aMatches) return bMatches - aMatches;
      return b.reviewScore - a.reviewScore;
    })
    .slice(0, limit);
}

