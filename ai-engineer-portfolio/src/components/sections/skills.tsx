import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { accentStyles } from "@/lib/accents";
import { skillCategories } from "@/data/portfolio";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Stack"
      title="Technical Skills"
      description="Tools and engineering practices represented in the projects below, from retrieval and document processing to streaming APIs and asynchronous work."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => {
          const accent = accentStyles[category.accent];
          return (
            <Reveal key={category.title} delay={index} className="h-full">
              <Card className={cn("h-full p-6", accent.border, "hover:bg-white/[0.045]")}>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-xl ring-1 ring-inset",
                      accent.iconBg,
                    )}
                  >
                    <category.icon className="size-5" />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight">{category.title}</h3>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill}>
                      <Badge className={cn(accent.chip)}>{skill}</Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
