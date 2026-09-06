import { type Status, statusLabel } from "./status";
import { VisuallyHidden } from "./visually-hidden";

/**
 * Formalizes the thread status dot. A color-only indicator is invisible to assistive
 * technology, so this HEADLESS primitive is really an a11y contract: it renders a dot
 * carrying `data-sc-status` (the app colors it from the status token) and, unless
 * suppressed, a visually-hidden accessible name from the shared status→label map.
 * Pass `label={false}` when an adjacent visible label already conveys the state.
 */
export function StatusDot({
  status,
  label,
  className,
  ...rest
}: {
  status: Status;
  /** Override the accessible name, or `false` when a sibling already labels it. */
  label?: string | false;
  className?: string;
} & Record<string, unknown>) {
  const name = label === false ? undefined : (label ?? statusLabel(status));
  return (
    <span
      className={className}
      data-sc-status={status}
      aria-hidden={name ? undefined : true}
      {...rest}
    >
      {name ? <VisuallyHidden>{name}</VisuallyHidden> : null}
    </span>
  );
}
