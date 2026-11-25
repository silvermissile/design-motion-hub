# Motion Spec — Tokens, Taxonomy & Checklist

> Distilled from `motion-anything/MOTION-SPEC.md` (aligned with Material Motion, Apple HIG, and Emil Kowalski principles).

## 1. Timing Scale

| Token | Duration (ms) | Typical Use |
| :--- | :--- | :--- |
| `instant` | `80–120` | Hover/press feedback, tiny state flips |
| `fast` | `140–220` | Micro-interactions, toggles, small reveals |
| `base` | `220–320` | Standard transitions, card/element entrances |
| `slow` | `320–500` | Page/section transitions, larger reveals |
| `deliberate` | `500–800` | Hero moments, user-triggered celebratory bursts |
| `cinematic` | `800–2000` | Video transitions & launch-film shots only |

## 2. Easing Tokens

| Token | Curve / Params | Use For |
| :--- | :--- | :--- |
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default for entering / responding to user |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Moves starting and ending on screen |
| `spring-soft` | `spring(stiffness 170, damping 26)` | Playful toggles, drags, delight |
| `spring-snappy` | `spring(stiffness 300, damping 30)` | Crisp, responsive controls |

## 3. Intent → Category Mapping

| User Intent (EN / 中文) | Category | Recommended Tokens |
| :--- | :--- | :--- |
| "snappy", "responsive", "丝滑", "干脆" | `hover-press`, `state-transition` | `fast`, `spring-snappy` |
| "delightful", "surprise", "惊喜感" | `feedback-delight` | `deliberate`, `spring-soft` |
| "elegant", "smooth", "高级", "优雅" | `entrance`, `scroll-reveal` | `base`/`slow`, `ease-out` |
| "draws attention", "pop", "强调" | `emphasis` | `fast`–`base`, `ease-out` |
| "cinematic", "launch video", "电影感" | `video-transition`, `text-kinetic` | `cinematic`, `ease-in-out` |

## 4. Definition of Done Checklist

- [ ] Serves feedback, continuity, or attention.
- [ ] Duration and easing come from the token table above.
- [ ] Per-view restraint budget respected (`≤ 1` celebratory moment, `≤ 3` simultaneous entrances, `≤ 1` ambient loop).
- [ ] Only `transform` and `opacity` animated; timers/rAF/injected nodes cleaned up.
- [ ] Working `@media (prefers-reduced-motion: reduce)` fallback (`scale-only`, `crossfade`, or `none`).
