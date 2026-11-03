import * as React from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <div className="container">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">
              {eyebrow}
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            {description ? (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
