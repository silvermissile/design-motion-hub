---
name: motion-spec-craft
description: |
  Enforce quantitative motion taste: 6 duration tokens, 5 easing curves, per-viewport restraint
  budgets (max 1 celebration, max 3 simultaneous entrances), GPU-safe properties only, and
  prefers-reduced-motion fallbacks. Adapted from motion-anything/MOTION-SPEC.md.
triggers:
  - "motion spec"
  - "motion budget"
  - "animation review"
  - "动效规范"
  - "动效克制"
  - "动效预算"
---

# Motion Spec Craft

Apply these hard quantitative gates whenever designing, generating, or reviewing UI/web/deck motion:

1. **Use Timing Tokens (do not invent durations)**:
   - `instant`: `80–120ms` (hover/press, tiny state flips)
   - `fast`: `140–220ms` (micro-interactions, toggles, small reveals)
   - `base`: `220–320ms` (standard card/element entrances)
   - `slow`: `320–500ms` (page/section transitions)
   - `deliberate`: `500–800ms` (hero moments, user-triggered celebratory bursts)
   - `cinematic`: `800–2000ms` (video transitions & launch-film shots only)
2. **Use Easing Tokens**:
   - Default UI entrance/response: `cubic-bezier(0.16, 1, 0.3, 1)` (`ease-out`).
   - Leaves screen: `cubic-bezier(0.4, 0, 1, 1)` (`ease-in`).
   - Springs for playful/snappy feedback: `spring(170, 26)` (`spring-soft`) / `spring(300, 30)` (`spring-snappy`).
   - `linear` for continuous loops only.
3. **Enforce Per-Viewport Restraint Budget**:
   - **≤ 1** celebratory / attention-grabbing moment per view (`feedback-delight` / `emphasis`), triggered by user action — never auto-play on load.
   - **≤ 3** simultaneous entrance animations; stagger additional items by **40–80ms**, capped so the whole sequence finishes within `slow` (`≤ 500ms`).
   - **≤ 1** ambient/looping motion per view (no competing loops).
4. **Performance & Accessibility**:
   - Animate `transform` and `opacity` only (never `width`/`height`/`top`/`left`/`margin`).
   - Always include `@media (prefers-reduced-motion: reduce)` fallback (`scale-only`, `crossfade`, or `none`).

Read `references/tokens-and-budgets.md` for the full intent → category table and definition-of-done checklist.
