/**
 * Generates the placeholder project thumbnails in /public/thumbnails.
 *
 *   node scripts/generate-thumbnails.mjs
 *
 * These exist so the cards look finished before real screenshots are taken.
 * To use a real screenshot instead, drop it in /public/thumbnails and point
 * the project's `thumbnail` field in src/data/portfolio.ts at it.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "thumbnails");

const palettes = {
  cyan: { from: "#22d3ee", to: "#6366f1", tint: "#67e8f9" },
  violet: { from: "#a78bfa", to: "#22d3ee", tint: "#c4b5fd" },
  emerald: { from: "#34d399", to: "#06b6d4", tint: "#6ee7b7" },
  amber: { from: "#fbbf24", to: "#f43f5e", tint: "#fcd34d" },
};

const items = [
  { slug: "knowledge-wiki-ai", label: "Knowledge Wiki AI", sub: "Access-Aware Knowledge Retrieval", accent: "violet" },
  { slug: "document-control-ai", label: "Document Control AI", sub: "Structured Contract Intelligence", accent: "emerald" },
  { slug: "dashboard-query-assistant", label: "Dashboard Query Assistant", sub: "Context-Bounded Analytics Chatbot", accent: "cyan" },
  { slug: "kworks-ai", label: "Kworks AI", sub: "Prompt Orchestration Service", accent: "cyan" },
  { slug: "reporter-ai", label: "Reporter AI", sub: "GitLab Review Infrastructure", accent: "amber" },
];

const escape = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svg({ slug, label, sub, accent }) {
  const p = palettes[accent];
  const initials = label
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  // The card renders the tech badges over the lower edge of the image, so the
  // artwork keeps that band clear rather than repeating the same labels.

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escape(label)}">
  <defs>
    <linearGradient id="bg-${slug}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#05070d"/>
      <stop offset="100%" stop-color="#0b1020"/>
    </linearGradient>
    <radialGradient id="glow-a-${slug}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${p.from}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${p.from}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-b-${slug}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${p.to}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${p.to}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="text-${slug}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="${p.tint}"/>
    </linearGradient>
    <pattern id="grid-${slug}" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg-${slug})"/>
  <rect width="1200" height="630" fill="url(#grid-${slug})"/>
  <circle cx="200" cy="120" r="380" fill="url(#glow-a-${slug})"/>
  <circle cx="1030" cy="540" r="340" fill="url(#glow-b-${slug})"/>

  <g opacity="0.5" stroke="${p.tint}" stroke-opacity="0.35" fill="none">
    <path d="M880 150 L980 210 L980 330 L880 390 L780 330 L780 210 Z" stroke-width="1.5"/>
    <path d="M880 150 L880 270 M880 270 L980 330 M880 270 L780 330" stroke-width="1"/>
    <circle cx="880" cy="150" r="7" fill="${p.from}" stroke="none"/>
    <circle cx="980" cy="210" r="5" fill="${p.tint}" stroke="none"/>
    <circle cx="980" cy="330" r="5" fill="${p.tint}" stroke="none"/>
    <circle cx="880" cy="390" r="5" fill="${p.tint}" stroke="none"/>
    <circle cx="780" cy="330" r="5" fill="${p.tint}" stroke="none"/>
    <circle cx="780" cy="210" r="5" fill="${p.tint}" stroke="none"/>
    <circle cx="880" cy="270" r="9" fill="${p.to}" stroke="none"/>
  </g>

  <g>
    <rect x="72" y="72" width="86" height="86" rx="22" fill="${p.from}" fill-opacity="0.14" stroke="${p.from}" stroke-opacity="0.4"/>
    <text x="115" y="128" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="30" font-weight="700" fill="${p.tint}" text-anchor="middle">${escape(initials)}</text>
  </g>

  <text x="72" y="300" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="46" font-weight="700" letter-spacing="-1.5" fill="url(#text-${slug})">${escape(label)}</text>
  <text x="72" y="352" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="24" fill="#94a3b8">${escape(sub)}</text>
  <rect x="72" y="392" width="120" height="4" rx="2" fill="${p.from}" fill-opacity="0.8"/>
</svg>
`;
}

await mkdir(outDir, { recursive: true });
await Promise.all(
  items.map((item) => writeFile(resolve(outDir, `${item.slug}.svg`), svg(item), "utf8")),
);

console.log(`Wrote ${items.length} thumbnails to public/thumbnails`);
