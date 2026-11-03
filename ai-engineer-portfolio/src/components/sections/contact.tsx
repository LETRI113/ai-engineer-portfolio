import { Download, Mail } from "lucide-react";

import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { contact, contactChannels, site, socials } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      description="Get in touch to discuss the projects, AI engineering or a potential collaboration."
    >
      <div className={cn("grid gap-6", contact.email && "lg:grid-cols-[1fr_1.15fr]")}>
        <Reveal>
          <div className="space-y-4">
            {contactChannels.map((channel) => {
              const inner = (
                <Card className="flex items-center gap-4 p-5 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.05]">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-400/25">
                    <channel.icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {channel.label}
                    </span>
                    <span className="block truncate text-sm font-medium">{channel.value}</span>
                  </span>
                </Card>
              );

              return channel.href ? (
                <a key={channel.label} href={channel.href} className="block">
                  {inner}
                </a>
              ) : (
                <div key={channel.label}>{inner}</div>
              );
            })}

            {contact.email || site.resumeUrl ? (
              <div className="flex flex-wrap gap-3 pt-2">
                {contact.email ? (
                  <ButtonLink href={`mailto:${contact.email}`} size="md">
                    <Mail />
                    Email Me
                  </ButtonLink>
                ) : null}
                {site.resumeUrl ? (
                  <ButtonLink href={site.resumeUrl} download variant="outline" size="md">
                    <Download />
                    Download CV
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}

            <div className="flex items-center gap-2 pt-1">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-muted-foreground transition-all hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  <social.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {contact.email ? (
          <Reveal delay={2}>
            <Card className="p-6 sm:p-8">
              <ContactForm />
            </Card>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
