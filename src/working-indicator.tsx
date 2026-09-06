import { LiveRegion } from "./live-region";

/**
 * The "an agent is working" indicator behind the real-time reply (ADR-013). This
 * primitive owns the two things that are easy to get wrong per-surface: the ANNOUNCE
 * behavior (a polite live region so a screen reader hears that work is underway) and
 * the reduced-motion contract (the visible dots animate on the motion tokens, which
 * collapse to ~0 under `prefers-reduced-motion` — see tokens.css). The three visible
 * dots' look/animation stays in the app on `--sc-motion*` / `--sc-ease*`; here they
 * are decorative and `aria-hidden`, since the live region carries the meaning.
 */
export function WorkingIndicator({
  label = "Working…",
  className,
  ...rest
}: {
  /** Announced to assistive tech and available as the visible label slot. */
  label?: string;
  className?: string;
} & Record<string, unknown>) {
  return (
    <span className={className} data-sc-working {...rest}>
      <LiveRegion politeness="polite">{label}</LiveRegion>
      <span data-sc-working-dots aria-hidden="true">
        <span data-sc-working-dot />
        <span data-sc-working-dot />
        <span data-sc-working-dot />
      </span>
    </span>
  );
}
