import type { ReactNode } from "react";
import { VisuallyHidden } from "./visually-hidden";

export type BadgeVariant = "tag" | "chip" | "count";

/**
 * The small labeled pill that shows up as a tag, a chip, or a count. Headless: it
 * renders a `<span>` with a `data-sc-badge` variant hook the app styles on tokens.
 * Its job beyond structure is the a11y one — a count badge is meaningless to a screen
 * reader as a bare number, so pass `label` and the badge exposes a full accessible
 * name (visually hidden) while hiding the terse visible text from assistive tech.
 */
export function Badge({
  variant = "tag",
  label,
  className,
  children,
  ...rest
}: {
  variant?: BadgeVariant;
  /** Fuller accessible name, e.g. "3 threads need you", replacing the visible text. */
  label?: string;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>) {
  return (
    <span className={className} data-sc-badge={variant} {...rest}>
      {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
      <span data-sc-badge-text aria-hidden={label ? true : undefined}>
        {children}
      </span>
    </span>
  );
}
