import type { Accent } from "@/data/portfolio";

/**
 * Tailwind can only see class names that appear as complete literals in the
 * source, so accents are looked up here instead of being built by string
 * concatenation at render time.
 */
export const accentStyles: Record<
  Accent,
  { text: string; border: string; chip: string; glow: string; iconBg: string }
> = {
  cyan: {
    text: "text-cyan-300",
    border: "hover:border-cyan-400/40",
    chip: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
    glow: "bg-cyan-500/20",
    iconBg: "bg-cyan-400/10 text-cyan-300 ring-cyan-400/25",
  },
  violet: {
    text: "text-violet-300",
    border: "hover:border-violet-400/40",
    chip: "border-violet-400/25 bg-violet-400/10 text-violet-200",
    glow: "bg-violet-500/20",
    iconBg: "bg-violet-400/10 text-violet-300 ring-violet-400/25",
  },
  emerald: {
    text: "text-emerald-300",
    border: "hover:border-emerald-400/40",
    chip: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
    glow: "bg-emerald-500/20",
    iconBg: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/25",
  },
  amber: {
    text: "text-amber-300",
    border: "hover:border-amber-400/40",
    chip: "border-amber-400/25 bg-amber-400/10 text-amber-200",
    glow: "bg-amber-500/20",
    iconBg: "bg-amber-400/10 text-amber-300 ring-amber-400/25",
  },
};
