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

## What's here (v0.1)
- `tokens.css` — the runtime token layer (color, radius, type; light + dark).
- `token(name)` — reference a token from JS/TS.
- `VisuallyHidden` — the first headless a11y primitive. Focus trap, portals, and
  live regions grow from here.

## Develop
```bash
bun install       # bootstrap
bun run test      # tsc + biome + vitest
bun run build     # emit dist/
```

Requires Node ≥ 22 and Bun.
