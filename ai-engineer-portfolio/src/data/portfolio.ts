import {
  Bot,
  Boxes,
  Braces,
  Brain,
  Files,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";

/** Accent keys map to complete Tailwind classes in src/lib/accents.ts. */
export type Accent = "cyan" | "violet" | "emerald" | "amber";

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

// Personal details stay empty until confirmed; the UI hides unavailable actions.
export const site = {
  name: "",
  title: "RAG, Document Intelligence & LLM Workflows",
  tagline:
    "A selection of AI engineering projects spanning knowledge retrieval, contract analysis, dashboard assistants and reliable backend workflows.",
  description:
    "AI engineering projects in hybrid RAG, document intelligence, LangGraph orchestration and asynchronous backend systems.",
  resumeUrl: "",
  avatar: "/profile.jpg",
  avatarAlt: "Profile portrait",
  url: "",
  availability: "",
};

export const siteLabel = site.name || "AI Engineering Portfolio";
export const siteInitials = site.name
  ? site.name.split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase()
  : "AI";

export const contact = {
  email: "",
  phone: "",
  phoneHref: "",
  location: "",
};

export const contactChannels = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
  { label: "Phone", value: contact.phone, href: contact.phoneHref, icon: Phone },
  { label: "Location", value: contact.location, href: null, icon: MapPin },
].filter((channel) => channel.value.trim());

export const socials: SocialLink[] = [];

export const about = {
  heading: "Engineering Focus",
  body: "These projects explore how language models connect to real application workflows: retrieving access-controlled knowledge, extracting structured contract data, selecting dashboard context and coordinating asynchronous work. The emphasis is on explicit data contracts, bounded inputs and outputs, streaming interfaces and testable backend services.",
  stats: [] as { value: string; label: string }[],
  focus: [
    "Hybrid retrieval & graph-enhanced RAG",
    "Schema-validated document intelligence",
    "LangGraph routing & streaming APIs",
    "Durable queues, leases & retry boundaries",
  ],
};

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  accent: Accent;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "LLM Workflows",
    icon: Bot,
    accent: "cyan",
    skills: ["LangGraph", "OpenAI Responses API", "Structured Outputs", "Prompt Routing", "Context Budgets"],
  },
  {
    title: "Knowledge & Retrieval",
    icon: Brain,
    accent: "violet",
    skills: ["Hybrid RAG", "Neo4j", "Embeddings", "Rank Fusion", "Reranking", "Access-Aware Retrieval"],
  },
  {
    title: "Document Intelligence",
    icon: Files,
    accent: "emerald",
    skills: ["Structured Extraction", "Contract Summaries", "Contract Alerts", "Document Comparison", "PDF Processing"],
  },
  {
    title: "Backend & Interfaces",
    icon: Braces,
    accent: "cyan",
    skills: ["Python", "FastAPI", "Pydantic", "PostgreSQL", "SQLAlchemy", "Next.js", "SSE"],
  },
  {
    title: "Asynchronous Systems",
    icon: Boxes,
    accent: "amber",
    skills: ["Celery", "RabbitMQ", "Redis", "Idempotency", "Work Leases", "Docker", "pytest"],
  },
];

export const heroMarquee = Array.from(new Set(skillCategories.flatMap((category) => category.skills)));

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tech: string[];
  status?: string;
  /** Only add public URLs that have been approved for this portfolio. */
  demoUrl?: string;
  repoUrl?: string;
  thumbnail: string;
  accent: Accent;
};

export const projects: Project[] = [
  {
    slug: "knowledge-wiki-ai",
    title: "Knowledge Wiki AI",
    subtitle: "Access-Aware Knowledge Retrieval",
    description:
      "A knowledge platform that answers questions using access-aware, graph-enhanced hybrid retrieval with streamed responses.",
    highlights: [
      "Semantic and full-text search combined with Reciprocal Rank Fusion",
      "Graph expansion, reranking and a confidence gate before generation",
      "Version-aware asynchronous ingestion, chunk-level access filters and SSE sources",
    ],
    tech: ["FastAPI", "Neo4j", "PostgreSQL", "Celery", "Next.js"],
    thumbnail: "/thumbnails/knowledge-wiki-ai.svg",
    accent: "violet",
  },
  {
    slug: "document-control-ai",
    title: "Document Control AI",
    subtitle: "Structured Contract Intelligence",
    description:
      "A document-processing API for structured extraction, contract summaries, configurable alerts and document comparison.",
    highlights: [
      "Schema-validated LLM extraction and structured contract summaries",
      "Contract assessments combined with extracted deadlines and timing information",
      "PDF, DOCX, JSON and image processing with bounded downloads and host allowlists",
    ],
    tech: ["Python", "FastAPI", "Pydantic", "HTTPX", "PDF Processing"],
    thumbnail: "/thumbnails/document-control-ai.svg",
    accent: "emerald",
  },
  {
    slug: "dashboard-query-assistant",
    title: "Dashboard Query Assistant",
    subtitle: "Context-Bounded Analytics Chatbot",
    description:
      "A dashboard assistant that routes questions and prepares relevant data for LLM-powered analytics responses.",
    highlights: [
      "LangGraph orchestration for general questions and dashboard query flows",
      "Relevant dashboard rows selected and packed within token and byte budgets",
      "Synchronous and SSE query endpoints with rate limiting and request observability",
    ],
    tech: ["FastAPI", "LangGraph", "OpenAI", "Polars", "SSE"],
    thumbnail: "/thumbnails/dashboard-query-assistant.svg",
    accent: "cyan",
  },
  {
    slug: "kworks-ai",
    title: "Kworks AI",
    subtitle: "Prompt Orchestration Service",
    status: "Phase 1 · Static knowledgebase",
    description:
      "A prompt-orchestration service for knowledge, content, SEO and classification workflows using approved static context. Retrieval and ingestion remain future phases.",
    highlights: [
      "LangGraph routes requests to task-specific prompts with shared policies",
      "Allowlisted knowledge packs with source hashes and prompt version tracking",
      "Structured Outputs, source and label validation, streaming and request deadlines",
    ],
    tech: ["FastAPI", "LangGraph", "OpenAI Responses API", "Pydantic"],
    thumbnail: "/thumbnails/kworks-ai.svg",
    accent: "cyan",
  },
  {
    slug: "reporter-ai",
    title: "Reporter AI",
    subtitle: "GitLab Review Infrastructure",
    status: "In development · Infrastructure foundation",
    description:
      "Infrastructure for a GitLab review pipeline, with durable webhook intake and bounded processing primitives. The end-to-end reviewer and comment publisher are not yet implemented.",
    highlights: [
      "Authenticated System Hooks persisted to a deduplicated PostgreSQL inbox before HTTP 202",
      "Bounded dispatch batches, fenced work leases and shared retry budgets",
      "Offline diff parsing, prepared model input and evidence-anchor validation",
    ],
    tech: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Azure Service Bus", "HTTPX"],
    thumbnail: "/thumbnails/reporter-ai.svg",
    accent: "amber",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  image: string;
  accent: Accent;
};

export const certifications: Certification[] = [];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  points: string[];
  tech: string[];
};

export const experiences: Experience[] = [];
export const education: { degree: string; institution: string; detail: string }[] = [];

export const hasContact = Boolean(contactChannels.length || socials.length || site.resumeUrl);
export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  ...(certifications.length ? [{ label: "Certifications", href: "#certifications" }] : []),
  ...(experiences.length ? [{ label: "Experience", href: "#experience" }] : []),
  ...(hasContact ? [{ label: "Contact", href: "#contact" }] : []),
];

export const sectionIcons = { projects: Boxes } as const;
