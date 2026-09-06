/**
 * The status contract. Threads, queues, and the delegation surface all speak the
 * same small vocabulary of lifecycle states, and each state maps to exactly one
 * design token and one human-readable label. Keeping this map in the package means
 * the color of "needs-you" and the words a screen reader announces are decided
 * once, centrally — never re-guessed per surface.
 */
export type Status = "needs-you" | "working" | "open" | "closed" | "idle";

export const STATUSES: readonly Status[] = ["needs-you", "working", "open", "closed", "idle"];

const STATUS_TOKEN: Record<Status, string> = {
  "needs-you": "attention",
  working: "success",
  open: "accent",
  closed: "muted",
  idle: "border",
};

/**
 * The design token to use when a status is rendered as TEXT (a label, pill, or
 * chip caption) rather than as a fill/dot. The vivid `attention`/`success` hues
 * fail WCAG AA as small text on our light surfaces, so text routes through the
 * darkened `-text` variants (work-043). Statuses whose base token is already
 * accessible as text map to that base token unchanged.
 */
const STATUS_TEXT_TOKEN: Record<Status, string> = {
  "needs-you": "attention-text",
  working: "success-text",
  open: "accent",
  closed: "muted",
  idle: "border",
};

const STATUS_LABEL: Record<Status, string> = {
  "needs-you": "Needs you",
  working: "Working",
  open: "Open",
  closed: "Closed",
  idle: "Idle",
};

/** The design-token name a status maps to, e.g. `statusToken("needs-you")` → `"attention"`. */
export function statusToken(status: Status): string {
  return STATUS_TOKEN[status];
}

/**
 * The design-token name to use when a status is shown as TEXT, e.g.
 * `statusTextToken("working")` → `"success-text"`. Use this (not `statusToken`)
 * for labels/pills/chips so status text clears WCAG AA on light surfaces.
 */
export function statusTextToken(status: Status): string {
  return STATUS_TEXT_TOKEN[status];
}

/** The accessible label for a status, e.g. `statusLabel("needs-you")` → `"Needs you"`. */
export function statusLabel(status: Status): string {
  return STATUS_LABEL[status];
}
