import { CheckCircle2, GraduationCap } from "lucide-react";

import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { about, education } from "@/data/portfolio";

export function About() {
  return (
    <Section id="about" eyebrow="About" title={about.heading}>
      <div className={about.stats.length ? "grid gap-8 lg:grid-cols-[1.35fr_1fr]" : "grid gap-8"}>
        <Reveal>
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-slate-300">{about.body}</p>

            <ul className="grid gap-3 sm:grid-cols-2">
              {about.focus.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>

            {education.map((entry) => (
              <Card key={entry.degree} className="flex gap-4 p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300 ring-1 ring-inset ring-violet-400/25">
                  <GraduationCap className="size-5" />
                </span>
                <div>
                  <p className="font-medium leading-tight">{entry.degree}</p>
                  <p className="mt-1 text-sm text-cyan-300/90">{entry.institution}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {entry.detail}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Reveal>

        {about.stats.length > 0 ? (
          <Reveal delay={2}>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {about.stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="p-6 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.045]"
                >
                  <p className="bg-gradient-to-br from-cyan-300 to-violet-400 bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
