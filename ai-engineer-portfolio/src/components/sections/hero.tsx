"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { contact, heroMarquee, site, siteLabel, socials } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: shouldReduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      {/* Ambient background: grid + two soft accent glows. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-[0.55]" />
        <div className="absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[130px] animate-pulse-glow" />
        <div className="absolute -right-24 top-40 size-[28rem] rounded-full bg-violet-600/15 blur-[130px] animate-pulse-glow" />
      </div>

      <div className={cn("container grid items-center gap-14 lg:gap-12", site.avatar && "lg:grid-cols-[1.2fr_0.8fr]")}>
        <div>
          {site.availability ? (
            <motion.p
              {...rise(0)}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3.5 py-1.5 text-xs font-medium text-emerald-300"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {site.availability}
            </motion.p>
          ) : null}

          <motion.h1
            {...rise(0.08)}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-6xl xl:text-7xl"
          >
            <span className="text-gradient">{siteLabel}</span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-5 font-mono text-sm text-cyan-300/90 sm:text-base"
          >
            {site.title}
          </motion.p>

          <motion.p
            {...rise(0.24)}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {site.tagline}
          </motion.p>

          <motion.div {...rise(0.32)} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects" size="lg">
              View Projects
              <ArrowDown />
            </ButtonLink>
            {site.resumeUrl ? (
              <ButtonLink href={site.resumeUrl} download variant="outline" size="lg">
                <Download />
                Download CV
              </ButtonLink>
            ) : null}
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-muted-foreground transition-all hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  <social.icon className="size-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {contact.location || contact.email ? (
            <motion.div
              {...rise(0.4)}
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground"
            >
              {contact.location ? (
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  <MapPin className="size-4 shrink-0 text-cyan-400/80" />
                  {contact.location}
                </span>
              ) : null}
              {contact.location && contact.email ? (
                <span aria-hidden className="hidden text-white/20 sm:inline">•</span>
              ) : null}
              {contact.email ? (
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors hover:text-foreground"
                >
                  {contact.email}
                </a>
              ) : null}
            </motion.div>
          ) : null}
        </div>

        {site.avatar ? <ProfilePhoto reduced={Boolean(shouldReduceMotion)} /> : null}
      </div>

      {/* Tech marquee — duplicated once so the loop is seamless. */}
      <motion.div {...rise(0.48)} className="mt-16 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee gap-3 will-change-transform">
          {[...heroMarquee, ...heroMarquee].map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/** Circular portrait sitting inside a cyan→violet gradient ring. */
function ProfilePhoto({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: reduced ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem] lg:mx-0 lg:ml-auto"
    >
      {/* Soft bloom behind the portrait, matching the hero's accent glows. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-gradient-to-br from-cyan-500/25 to-violet-600/25 blur-3xl"
      />

      <div className="relative aspect-square rounded-full bg-gradient-to-br from-cyan-400 via-cyan-300/40 to-violet-500 p-[3px] shadow-2xl shadow-cyan-500/15">
        <div className="relative size-full overflow-hidden rounded-full bg-slate-950 ring-1 ring-inset ring-white/10">
          <Image
            src={site.avatar}
            alt={site.avatarAlt}
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 76vw, (max-width: 1024px) 21rem, 21rem"
            className="object-cover"
          />
        </div>
      </div>

      {/* Slowly rotating accent ring — decorative only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-full border border-dashed border-cyan-400/20 motion-safe:animate-[spin_28s_linear_infinite]"
      />
    </motion.div>
  );
}
