"use client";

import * as React from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contact } from "@/data/portfolio";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/40";

/**
 * No backend required: the form composes a pre-filled mail draft and hands it
 * to the visitor's mail client. Swap `handleSubmit` for a POST to an API route
 * later without touching the markup.
 */
export function ContactForm() {
  const [sent, setSent] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Portfolio enquiry from ${name || "a visitor"}`;
    const body = `${message}\n\n—\n${name}\n${email}`;

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium text-muted-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium text-muted-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about the role or the system you're building…"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="md">
          <Send />
          Send Message
        </Button>
        <p aria-live="polite" className="text-xs text-muted-foreground">
          {sent
            ? "Your mail client should be open with the draft ready to send."
            : "Opens a pre-filled draft in your mail client."}
        </p>
      </div>
    </form>
  );
}
