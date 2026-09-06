import { afterEach, describe, expect, it, vi } from "vitest";
import { prefersReducedMotion } from "./reduced-motion";

describe("prefersReducedMotion", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns false when there is no matchMedia (SSR / test env)", () => {
    // node vitest env has no window.matchMedia — the SSR-safe default is false.
    expect(prefersReducedMotion()).toBe(false);
  });

  it("reflects matchMedia when present", () => {
    vi.stubGlobal("window", {
      matchMedia: (q: string) => ({ matches: q.includes("reduce") }),
    });
    expect(prefersReducedMotion()).toBe(true);
  });
});
