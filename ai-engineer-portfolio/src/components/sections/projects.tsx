import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";

import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { accentStyles } from "@/lib/accents";
import { projects, type Project } from "@/data/portfolio";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Work"
      title="Featured Projects"
      description="Five projects covering knowledge retrieval, document intelligence, dashboard assistants and backend workflow infrastructure."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const accent = accentStyles[project.accent];

  return (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden hover:bg-white/[0.04]",
        accent.border,
      )}
    >
      {/* Thumbnail — swap `thumbnail` in portfolio.ts for a real screenshot. */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-slate-950">
        <Image
          src={project.thumbnail}
          alt={`${project.title} — ${project.subtitle}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              className="border-white/15 bg-black/50 text-slate-100 backdrop-blur-sm"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
        <p className={cn("mt-1 font-mono text-xs", accent.text)}>{project.subtitle}</p>
        {project.status ? (
          <p className="mt-3 text-xs font-medium text-slate-300">{project.status}</p>
        ) : null}

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <ul className="mt-5 space-y-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5 text-sm text-slate-400">
              <span
                className={cn("mt-[0.45rem] size-1.5 shrink-0 rounded-full", accent.glow)}
                aria-hidden
              />
              {highlight}
            </li>
          ))}
        </ul>

        {project.demoUrl || project.repoUrl ? (
          <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
            <ProjectLink
              href={project.demoUrl}
              label="Live Demo"
              icon={<ArrowUpRight />}
              variant="primary"
            />
            <ProjectLink
              href={project.repoUrl}
              label="View Code"
              icon={<Github />}
              variant="outline"
            />
          </div>
        ) : null}
      </div>
    </Card>
  );
}

/**
 * Renders nothing when the project has no URL for this link in portfolio.ts —
 * e.g. a project with no public deployment simply drops its Live Demo button.
 */
function ProjectLink({
  href,
  label,
  icon,
  variant,
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
  variant: "primary" | "outline";
}) {
  if (!href) return null;

  return (
    <ButtonLink href={href} target="_blank" rel="noopener noreferrer" variant={variant} size="sm">
      {icon}
      {label}
    </ButtonLink>
  );
}
