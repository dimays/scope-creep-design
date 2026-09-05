# AGENTS.md — working in @scope-creep/design

This is Scope Creep's **core-owned design package** (`kind: package`), owned by the
Chief Designer. It is consumed by every app, so changes here ripple widely.

## Read first
1. The control plane's [Golden Path](https://github.com/dimays/scope-creep/blob/main/standards/golden-path.md)
   (design amendments) and the Chief Designer's charter.
2. This repo's [README](README.md).

## Non-negotiables
- **Tokens are the contract.** Design decisions live as runtime CSS variables in
  `tokens.css`, never hard-compiled into components.
- **Semver discipline.** Apps pin this by git tag; a breaking token rename is a major
  bump. Bump the version + CHANGELOG + tag on every release.
- **Behavior-correct primitives.** Headless primitives own the accessibility-critical
  20% (focus, portals, live regions); look stays token-driven.
- Keep the gate green: `bun run test` (tsc + biome + vitest). Run `bun run format`
  before committing.
