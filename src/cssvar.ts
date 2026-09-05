/**
 * Reference a design token as a CSS variable in JS/TS.
 * `token("accent")` → `"var(--sc-accent)"`. Keeps token names the single contract,
 * so components never hard-code a color.
 */
export function token(name: string): string {
  return `var(--sc-${name})`;
}
