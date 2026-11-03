"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Award, BadgeCheck, CalendarDays, ExternalLink } from "lucide-react";

import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { accentStyles } from "@/lib/accents";
import { certifications, type Certification } from "@/data/portfolio";

export function Certifications() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="certifications"
      eyebrow="Credentials"
      title="Certifications & Achievements"
      description="Continuous upskilling across DevOps, full-stack engineering and applied Generative AI."
    >
      {shouldReduceMotion ? (
        // No motion: a plain responsive grid, so every card stays reachable.
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification, index) => (
            <Reveal key={certification.title} delay={index} className="h-full">
              <CertificationCard certification={certification} className="h-full w-full" />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          {/* Track holds two copies of the list, so the -50% loop is seamless. */}
          <div className="group overflow-hidden mask-fade-x">
            <div className="flex w-max items-stretch animate-marquee gap-6 py-1 will-change-transform group-hover:[animation-play-state:paused]">
              {certifications.map((certification) => (
                <CertificationCard key={certification.title} certification={certification} />
              ))}
              {certifications.map((certification) => (
                <CertificationCard
                  key={`${certification.title}-duplicate`}
                  certification={certification}
                  duplicate
                />
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </Section>
  );
}

function CertificationCard({
  certification,
  duplicate = false,
  className,
}: {
  certification: Certification;
  duplicate?: boolean;
  className?: string;
}) {
  const accent = accentStyles[certification.accent];
  // A "#" placeholder is not a real verification URL — drop the button instead
  // of shipping a link that goes nowhere.
  const verifyUrl =
    certification.link && certification.link !== "#" ? certification.link : undefined;

  return (
    <Card
      // The second copy exists purely to close the loop visually.
      aria-hidden={duplicate || undefined}
      // No h-full here: inside the marquee the cards are equalised by the
      // track's items-stretch, which an explicit height would override.
      className={cn(
        "flex w-[19rem] shrink-0 flex-col overflow-hidden sm:w-[21rem]",
        accent.border,
        "hover:bg-white/[0.045]",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-slate-950">
        <Image
          src={certification.image}
          alt={`${certification.title} certificate issued by ${certification.issuer}`}
          fill
          sizes="21rem"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
        <span
          className={cn(
            "absolute left-3 top-3 flex size-9 items-center justify-center rounded-xl ring-1 ring-inset backdrop-blur-sm",
            accent.iconBg,
          )}
        >
          <Award className="size-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-snug tracking-tight">
          {certification.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className={cn("inline-flex items-center gap-1.5 font-medium", accent.text)}>
            <BadgeCheck className="size-3.5" />
            {certification.issuer}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono">
            <CalendarDays className="size-3.5" />
            {certification.date}
          </span>
        </div>

        {verifyUrl ? (
          <div className="mt-auto pt-5">
            <ButtonLink
              href={verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
              // The duplicated track copy must stay out of the tab order.
              tabIndex={duplicate ? -1 : undefined}
            >
              <ExternalLink />
              Verify
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
