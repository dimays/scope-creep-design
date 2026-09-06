import type { ReactNode } from "react";
import { VisuallyHidden } from "./visually-hidden";

export type Politeness = "polite" | "assertive";

/**
 * Headless a11y primitive: an ARIA live region that announces its children to
 * assistive technology without showing anything. This is the "announce" behavior
 * the design system owns once, so surfaces (a working indicator, a needs-you badge,
 * a landed-outcome toast) don't each hand-roll a live region and get the politeness
 * or visibility wrong.
 */
export function LiveRegion({
  children,
  politeness = "polite",
}: {
  children: ReactNode;
  politeness?: Politeness;
}) {
  return (
    <VisuallyHidden>
      <span role="status" aria-live={politeness} aria-atomic="true">
        {children}
      </span>
    </VisuallyHidden>
  );
}
