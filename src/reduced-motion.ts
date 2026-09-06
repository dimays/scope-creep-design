import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Read the user's reduced-motion preference imperatively. SSR-safe: returns `false`
 * when there is no `window`/`matchMedia` (server render, test env), so callers get a
 * stable, motion-on default until the client hydrates.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(QUERY).matches;
}

/**
 * Headless a11y primitive: subscribe to the reduced-motion preference and re-render
 * when it changes. The visual honoring of the preference is a token contract (see
 * tokens.css); this hook is for the cases CSS can't reach — e.g. deciding whether to
 * mount a JS-driven animation at all, or which variant of a component to render.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(prefersReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mql = window.matchMedia(QUERY);
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
