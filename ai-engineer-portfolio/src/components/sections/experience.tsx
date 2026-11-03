import { Briefcase, CalendarDays, MapPin } from "lucide-react";

import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Career"
      title="Professional Experience"
      description="Where the engineering practice was built — shipping features, APIs and data services in a team."
    >
      <ol className="relative space-y-6 border-l border-white/10 pl-6 sm:pl-8">
        {experiences.map((role, index) => (
          <Reveal key={`${role.company}-${role.role}`} delay={index} as="li" className="relative">
            {/* Sits on the rail drawn by the <ol> border, offset by its pl-6 / sm:pl-8. */}
            <span
              aria-hidden
              className="absolute -left-[31px] top-6 size-3.5 rounded-full border-2 border-background bg-gradient-to-br from-cyan-400 to-violet-500 sm:-left-[39px]"
            />
            <Card className="p-6 hover:border-cyan-400/30 hover:bg-white/[0.045]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-400/25">
                    <Briefcase className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-tight tracking-tight">
                      {role.role}
                    </h3>
                    <p className="mt-1 text-sm text-cyan-300/90">{role.company}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:items-end">
                  <span className="inline-flex items-center gap-1.5 font-mono">
                    <CalendarDays className="size-3.5" />
                    {role.period}
                  </span>
                  {role.location ? (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {role.location}
                    </span>
                  ) : null}
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-300">{role.summary}</p>

              <ul className="mt-4 space-y-2">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span
                      aria-hidden
                      className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-cyan-400/60"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {role.tech.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
