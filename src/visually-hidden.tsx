import type { CSSProperties, ReactNode } from "react";

// The first headless a11y primitive: visually hides content while keeping it
// available to assistive technology. Behavior is the contract; look is token-driven
// elsewhere. More primitives (focus trap, portals, live regions) grow from here.
const hidden: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span style={hidden}>{children}</span>;
}
