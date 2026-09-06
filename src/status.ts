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

/** The accessible label for a status, e.g. `statusLabel("needs-you")` → `"Needs you"`. */
export function statusLabel(status: Status): string {
  return STATUS_LABEL[status];
}
