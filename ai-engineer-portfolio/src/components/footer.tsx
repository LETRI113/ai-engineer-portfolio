import { ArrowUp } from "lucide-react";

import { contact, navItems, site, siteLabel, socials } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-tight">{siteLabel}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {site.title}{contact.location ? ` · ${contact.location}` : ""}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteLabel}. Built with Next.js & Tailwind CSS.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <social.icon className="size-4" />
              </a>
            ))}
            <a
              href="#top"
              aria-label="Back to top"
              className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
            >
              <ArrowUp className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
