import { describe, expect, it } from "vitest";
import { STATUSES, type Status, statusLabel, statusToken } from "./status";

describe("status contract", () => {
  it("maps every status to a design token", () => {
    const expected: Record<Status, string> = {
      "needs-you": "attention",
      working: "success",
      open: "accent",
      closed: "muted",
      idle: "border",
    };
    for (const status of STATUSES) {
      expect(statusToken(status)).toBe(expected[status]);
    }
  });

  it("gives every status a human-readable label", () => {
    for (const status of STATUSES) {
      expect(statusLabel(status)).toMatch(/\w/);
    }
    expect(statusLabel("needs-you")).toBe("Needs you");
    expect(statusLabel("working")).toBe("Working");
  });

  it("promotes the two formerly-hardcoded console colors to named tokens", () => {
    // #e8833a (needs-you) → --sc-attention ; #3aa76d (working) → --sc-success
    expect(statusToken("needs-you")).toBe("attention");
    expect(statusToken("working")).toBe("success");
  });
});
