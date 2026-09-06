# Changelog

## 0.3.0 — 2026-09-06 (accessible status-text tokens)
Additive; no breaking token renames. Fixes [work-043] (WCAG AA regression flagged
from console PR #31); implements the [work-027] deferred item.

**Problem.** v0.2.0's vivid status hues fail WCAG AA (1.4.3, normal text needs
4.5:1) when used as small text on light surfaces — as the console does for the
feedback chip, working pill, and in-progress label. Measured (worst case = over the
16% color-mix status tint):

| token (light) | value | on `--sc-surface` | on `--sc-bg` | on 16% tint |
| --- | --- | --- | --- | --- |
| `--sc-success` | `#3aa76d` | 3.03:1 ✗ | 2.83:1 ✗ | 2.58:1 ✗ |
| `--sc-attention` | `#e8833a` | 2.71:1 ✗ | 2.53:1 ✗ | 2.33:1 ✗ |

**Fix — dedicated on-surface text variants** (keep the vivid hue for fills/dots/
borders, which as non-text UI only need ~3:1; route text through the darkened
variant):

| new token (light) | value | on `--sc-surface` | on `--sc-bg` | on 16% tint |
| --- | --- | --- | --- | --- |
| `--sc-success-text` | `#0b7240` | 6.01:1 ✓ | 5.60:1 ✓ | 5.12:1 ✓ |
| `--sc-attention-text` | `#9a4d00` | 6.11:1 ✓ | 5.70:1 ✓ | 5.25:1 ✓ |

- Dark mode is unchanged: the vivid dark fills already clear AA as text
  (`--sc-success` ~7.4:1, `--sc-attention` ~7.7:1 on `--sc-surface`), so the dark
  `-text` variants equal the fills.
- **Status contract:** new `statusTextToken(status)` — the token to use when a
  status is rendered as text (`working` → `success-text`, `needs-you` →
  `attention-text`; other statuses map to their already-accessible base token).
  `statusToken` (fills/dots) is unchanged.

Console follow-up: re-point text usages (feedback chip / working pill / in-progress
label) from the fill tokens to `--sc-*-text` / `statusTextToken`, then re-verify.

Distribution via git tag (`github:dimays/scope-creep-design#v0.3.0`) is an
Owner-gated step, not done in this PR.

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
