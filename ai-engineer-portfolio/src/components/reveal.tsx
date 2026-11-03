"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger helper for lists — multiplied by 0.08s. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll-triggered fade + rise. Honours prefers-reduced-motion by rendering
 * the content immediately with no transform.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  // All four tags share the same prop surface here; the cast keeps TS from
  // widening this into an unusable union of component types.
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: shouldReduceMotion ? 0 : delay * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
