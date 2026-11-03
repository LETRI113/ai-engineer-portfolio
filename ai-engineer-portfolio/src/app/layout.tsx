import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { site, siteLabel } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = `${siteLabel} — ${site.title}`;

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: {
    default: title,
    template: `%s | ${siteLabel}`,
  },
  description: site.description,
  keywords: [
    "AI Engineering",
    "Document Intelligence",
    "Generative AI",
    "LLM Workflows",
    "RAG",
    "LangGraph",
    "FastAPI",
  ],
  ...(site.name ? { authors: [{ name: site.name }] } : {}),
  openGraph: {
    type: "website",
    ...(site.url ? { url: site.url } : {}),
    title,
    description: site.description,
    siteName: siteLabel,
  },
  twitter: {
    card: "summary",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `try { if (localStorage.getItem("portfolio-theme") === "black") document.documentElement.dataset.theme = "black"; } catch { console.warn("Theme preference could not be restored."); }`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
