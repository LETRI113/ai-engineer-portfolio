"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Moon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { navItems, site, siteInitials, siteLabel, socials } from "@/data/portfolio";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("#about");
  const [blackMode, setBlackMode] = React.useState(false);

  React.useEffect(() => {
    setBlackMode(document.documentElement.dataset.theme === "black");
  }, []);

  function toggleBlackMode() {
    const next = !blackMode;
    document.documentElement.dataset.theme = next ? "black" : "dark";
    setBlackMode(next);
    try {
      localStorage.setItem("portfolio-theme", next ? "black" : "dark");
    } catch {
      console.warn("Theme preference could not be saved.");
    }
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item whose section currently owns the viewport.
  React.useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="container flex h-16 items-center justify-between gap-4" aria-label="Main">
        <a href="#top" aria-label={siteLabel} className="group flex items-center gap-2.5">
          <span className="relative flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 font-mono text-sm font-bold text-slate-950">
            {siteInitials}
          </span>
          {/* Six nav items leave no room for the wordmark until lg. */}
          <span className="hidden text-sm font-semibold tracking-tight lg:block">
            {siteLabel}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                  active === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === item.href ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 lg:flex">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/[0.07] hover:text-foreground"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
          {site.resumeUrl ? (
            <ButtonLink
              href={site.resumeUrl}
              download
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Download />
              CV
            </ButtonLink>
          ) : null}
          <button
            type="button"
            aria-label="Black mode"
            aria-pressed={blackMode}
            title="Black mode"
            onClick={toggleBlackMode}
            className="flex size-10 items-center justify-center rounded-full border border-white/10 text-foreground transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-cyan-400/40 aria-pressed:text-cyan-300"
          >
            <Moon aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-full border border-white/10 text-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container flex flex-col py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-3 text-base text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {socials.length > 0 || site.resumeUrl ? (
                <li className="mt-3 flex items-center gap-3 border-t border-white/10 pt-4">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="flex size-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground"
                    >
                      <social.icon className="size-4" />
                    </a>
                  ))}
                  {site.resumeUrl ? (
                    <ButtonLink href={site.resumeUrl} download variant="outline" size="sm">
                      <Download />
                      Download CV
                    </ButtonLink>
                  ) : null}
                </li>
              ) : null}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
