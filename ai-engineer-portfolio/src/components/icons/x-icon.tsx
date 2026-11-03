import * as React from "react";
import type { LucideProps } from "lucide-react";

/**
 * Lucide ships a legacy bird `Twitter` glyph, so the current X wordmark is
 * hand-rolled here. The prop surface matches LucideProps, which lets it drop
 * straight into the `socials` array alongside the real Lucide icons.
 */
export const XIcon = React.forwardRef<SVGSVGElement, LucideProps>(
  ({ size = 24, color = "currentColor", className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
);
XIcon.displayName = "XIcon";
