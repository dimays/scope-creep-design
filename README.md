# @scope-creep/design

Scope Creep's shared design system — the single source of truth for design decisions
across the app ecosystem ([Golden Path](https://github.com/dimays/scope-creep/blob/main/standards/golden-path.md)
amendment #1). Tokens are **runtime CSS custom properties** so theme is data, not
compiled code: re-themeable live, inheritable by an embedded extension, and
consistent across independently-authored, one-per-repo apps.

## Consume
Apps pin this package by version (via a git tag) and import the tokens:

```ts
import "@scope-creep/design/tokens.css";   // defines the --sc-* token layer (light + dark)
import { token, VisuallyHidden } from "@scope-creep/design";

token("accent"); // "var(--sc-accent)"
```

Ship **tokens as the contract**, not components. Components stay bespoke per app but
read the same tokens, so twenty apps read as one family and adopt a token fix
centrally.

## What's here (v0.2)
- `tokens.css` — the runtime token layer (color, radius, type, **status**,
  **motion**; light + dark) with a built-in **reduced-motion contract**: the
  motion tokens collapse to ~0 under `prefers-reduced-motion`, so token-driven
  motion honors the preference for free, plus a global safety-net reset.
- `token(name)` — reference a token from JS/TS.
- **Status contract** — `Status`, `STATUSES`, `statusToken()`, `statusLabel()`:
  one small lifecycle vocabulary mapped to tokens and accessible labels, decided
  once instead of re-guessed per surface.
- **Headless primitives** (behavior + `data-sc-*` structural hooks; look stays in
  the app on tokens): `Surface`, `Badge`, `StatusDot`, `WorkingIndicator`,
  `ActivityRow`, `LiveRegion`, `VisuallyHidden`, and the
  `usePrefersReducedMotion()` hook.

## Develop
```bash
bun install       # bootstrap
bun run test      # tsc + biome + vitest
bun run build     # emit dist/
```

Requires Node ≥ 22 and Bun.
