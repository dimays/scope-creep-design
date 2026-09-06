import type { ReactNode } from "react";
import type { Status } from "./status";
import { StatusDot } from "./status-dot";

/**
 * A single row in the transparent-delegation / org-activity feed (ADR-013): an actor
 * did something, with an optional status, a summary, a timestamp, and an optional
 * reference link. Headless and structural — it lays out the slots and, when a status
 * is given, leads with a labeled StatusDot so the row's state is available to
 * assistive tech. Look stays in the app on tokens.
 */
export function ActivityRow({
  status,
  actor,
  children,
  time,
  href,
  className,
  ...rest
}: {
  status?: Status;
  actor?: ReactNode;
  /** The summary of what happened. */
  children?: ReactNode;
  time?: ReactNode;
  /** Optional reference (a ledger entry, a PR, a thread). */
  href?: string;
  className?: string;
} & Record<string, unknown>) {
  return (
    <div className={className} data-sc-activity-row {...rest}>
      {status ? <StatusDot status={status} /> : null}
      {actor ? <span data-sc-activity-actor>{actor}</span> : null}
      <span data-sc-activity-summary>
        {href ? (
          <a href={href} data-sc-activity-link>
            {children}
          </a>
        ) : (
          children
        )}
      </span>
      {time ? <time data-sc-activity-time>{time}</time> : null}
    </div>
  );
}
