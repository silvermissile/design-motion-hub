---
name: motion-recipes-kit
description: |
  84 dependency-free WebGL shaders, Canvas 2D fields, kinetic typography, and UI micro-interactions
  extracted from motion-anything. Supports both real-time web/deck pages and OpenMotion HyperFrames
  frame-accurate video rendering.
triggers:
  - "motion-recipes-kit"
  - "shader background"
  - "webgl background"
  - "kinetic text"
  - "零依赖动效"
  - "着色器背景"
  - "网页特效"
---

# Motion Recipes Kit

Use this package to add **zero-dependency, single-file** visual effects, shader backdrops, kinetic typography, and UI micro-interactions to HTML prototypes, HTML slide decks, and OpenMotion HyperFrames compositions.

## How to pick and apply an effect

1. **Search the catalog first**: read `references/index.md` to match the user's intent against the 84 bundled effects (`ambient`, `text-kinetic`, `hover-press`, `feedback-delight`, `scroll-reveal`, `emphasis`, `loading`, etc.).
2. **Respect `Avoid When`**: never apply GPU shader backdrops behind dense body text without a protective scrim, and never stack multiple full-screen GPU shaders in the same viewport.
3. **Copy only what you need**:
   - Read the matching files from `assets/effects/<id>/` (`.js` / `.css`).
   - If the effect invokes `ShaderBG(...)`, also include `assets/shaderbg.js` (inline or as an asset).
4. **Preserve accessibility**: every shader/JS effect checks `prefers-reduced-motion: reduce`; keep fallback backgrounds (`data-fallback`) and reduced-motion CSS intact.

## Dual-clock usage (HTML vs OpenMotion HyperFrames)

- **For HTML prototypes & HTML decks**: include `assets/shaderbg.js` + the chosen effect file; `ShaderBG` runs on `requestAnimationFrame` automatically.
- **For OpenMotion HyperFrames MP4 rendering**:
  - Pass `{ manual: true }` into `ShaderBG(el, FRAG, { manual: true, ... })` and wire `handle.attachTimeline(tl, duration)` to the composition's paused GSAP timeline registered in `window.__timelines[compositionId]`.
  - That prevents rAF clock drift during headless Chrome frame capture.

## Attribution

Retain source notices from `NOTICE.md` when redistributing effects ported from `react-bits` / `motion-anything`.
