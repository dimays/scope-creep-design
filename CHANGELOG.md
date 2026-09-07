# Changelog

## 0.3.0 — 2026-09-07 (dark-only)
Owner decision (2026-09-06): fix the product to dark mode ("I'll never want light
mode"). Implements [work-045]; supersedes the light-contrast fix [work-043] by
removing light mode rather than fixing it.

**Breaking (visual, not API):** the light palette is gone. The `:root` tokens now
carry the dark values (previously under `@media (prefers-color-scheme: dark)`), the
light `:root` values and the `prefers-color-scheme` light branch are dropped, and
`:root` declares `color-scheme: dark`. The token **contract** (every `--sc-*` name)
is unchanged, so consumers need only re-pin — no token renames. Consumers that were
relying on a light render will now render dark.

## 0.2.0 — 2026-09-06 (status + motion tokens, first primitives)
Additive; no breaking token renames. Implements [work-041] / [ADR-013] §7b.

**Tokens**
- **Status colors promoted to first-class tokens** (were hardcoded per app):
  `--sc-attention` (`#e8833a`, "needs-you") and `--sc-success` (`#3aa76d`,
  "working"/done), with dark-mode variants.
- **Motion token set:** `--sc-motion` / `--sc-motion-fast` / `--sc-motion-slow`,
  `--sc-ease` / `--sc-ease-breathe`.
- **Reduced-motion is now a contract:** under `prefers-reduced-motion: reduce`,
  the motion tokens collapse to ~0 (any token-driven motion honors it for free)
  plus a global safety-net reset. No more per-component guesses.

**Primitives** (headless — behavior + structural `data-sc-*` hooks; look stays in
the app on tokens):
- `Surface` — the shared base for panel/card/message/outcome.
- `Badge` — tag/chip/count, with an accessible-name path for counts.
- `StatusDot` — the formalized thread dot; color-only state made a11y-correct via
  the shared status→label map.
- `WorkingIndicator` — the real-time "an agent is working" indicator; owns the
  live-region announce + the reduced-motion contract.
- `ActivityRow` — a row for the delegation / org-activity feed.
- `LiveRegion` — headless ARIA live-region primitive (the shared "announce").
- `prefersReducedMotion()` / `usePrefersReducedMotion()` — reduced-motion behavior
  for the cases CSS can't reach.
- `Status` / `STATUSES` / `statusToken()` / `statusLabel()` — the status contract.

Distributed via git tag (`github:dimays/scope-creep-design#v0.2.0`) — tag/release
is a gated step, not done in this PR.

## 0.1.0 — 2026-09-04 (genesis)
- The shared token layer (`tokens.css`): color, radius, type; light + dark.
- `token(name)` helper; `VisuallyHidden` primitive.
- Distributed via git tag (`github:dimays/scope-creep-design#v0.1.0`); no npm publish.
