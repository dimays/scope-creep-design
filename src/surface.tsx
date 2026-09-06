import type { ElementType, ReactNode } from "react";

export type SurfaceVariant = "panel" | "card" | "message" | "outcome";

/**
 * The shared base for every raised container — panels, cards, chat messages, and
 * outcome cards all descend from one primitive instead of four near-identical CSS
 * blocks. Surface is HEADLESS: it renders a chosen element and stamps a
 * `data-sc-surface` variant hook; the actual look (background, border, radius,
 * padding) stays in the app on tokens. This keeps the structure/semantics decision
 * central and the taste token-driven.
 */
export function Surface({
  as,
  variant = "panel",
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  variant?: SurfaceVariant;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>) {
  const Tag = as ?? "div";
  return (
    <Tag className={className} data-sc-surface={variant} {...rest}>
      {children}
    </Tag>
  );
}
