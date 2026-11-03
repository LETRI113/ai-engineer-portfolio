import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/[0.05] text-slate-200 hover:bg-white/[0.09]",
        outline: "border-white/15 bg-transparent text-muted-foreground",
        accent: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
