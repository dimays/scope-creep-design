import { describe, expect, it } from "vitest";
import { STATUSES, type Status, statusLabel, statusTextToken, statusToken } from "./status";

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

  it("routes status TEXT through AA-safe token variants for the failing hues", () => {
    // work-043: vivid --sc-attention/--sc-success fail WCAG AA as small text on
    // light surfaces; text must route through the darkened -text variants.
    expect(statusTextToken("needs-you")).toBe("attention-text");
    expect(statusTextToken("working")).toBe("success-text");
    // Statuses whose base token is already accessible as text are unchanged.
    expect(statusTextToken("open")).toBe("accent");
    expect(statusTextToken("closed")).toBe("muted");
    expect(statusTextToken("idle")).toBe("border");
  });

  it("promotes the two formerly-hardcoded console colors to named tokens", () => {
    // #e8833a (needs-you) → --sc-attention ; #3aa76d (working) → --sc-success
    expect(statusToken("needs-you")).toBe("attention");
    expect(statusToken("working")).toBe("success");
  });
});
