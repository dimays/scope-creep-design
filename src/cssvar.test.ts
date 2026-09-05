import { describe, expect, it } from "vitest";
import { token } from "./cssvar";

describe("token", () => {
  it("wraps a token name as a CSS variable reference", () => {
    expect(token("accent")).toBe("var(--sc-accent)");
  });

  it("works for any token name", () => {
    expect(token("surface")).toBe("var(--sc-surface)");
  });
});
