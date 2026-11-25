---
name: paper-shaders
description: |
  Adapter for paper-design/shaders: 30 zero-dependency WebGL2 GLSL ES 3.0 fragment shaders
  (MeshGradient, NeuroNoise, Voronoi, LiquidMetal, Dithering, FlutedGlass, GodRays, SmokeRing, etc.)
  with deterministic setFrame(ms) / u_time control for both web pages and OpenMotion HyperFrames.
triggers:
  - "paper shaders"
  - "mesh gradient"
  - "neuro noise"
  - "liquid metal"
  - "fluted glass"
  - "webgl2 shader"
---

# Paper Shaders Adapter

This adapter connects to the upstream `paper-design/shaders` source tree synced into `upstream/packages/shaders/src/` (via `scripts/sync-sources.mjs`).

## Available Upstream Shaders (`upstream/packages/shaders/src/shaders/`)

- **Gradients & Atmospheres**: `mesh-gradient.ts`, `static-mesh-gradient.ts`, `static-radial-gradient.ts`, `grain-gradient.ts`, `smoke-ring.ts`, `simplex-noise.ts`, `warp.ts`, `god-rays.ts`, `gem-smoke.ts`
- **Noise & Procedural**: `perlin-noise.ts`, `neuro-noise.ts`, `voronoi.ts`, `paper-texture.ts`
- **Geometric & Patterns**: `dot-orbit.ts`, `dot-grid.ts`, `waves.ts`, `spiral.ts`, `swirl.ts`, `metaballs.ts`, `dithering.ts`, `halftone-cmyk.ts`, `halftone-dots.ts`, `heatmap.ts`
- **3D / Glass / Metal / Image**: `color-panels.ts`, `fluted-glass.ts`, `liquid-metal.ts`, `pulsing-border.ts`, `water.ts`, `image-dithering.ts`, `lens-distortion.ts`

## Usage Rules

1. **Read only the target shader file** in `upstream/packages/shaders/src/shaders/<name>.ts` plus `upstream/packages/shaders/src/shader-mount.ts` and `vertex-shader.ts` when needed.
2. **In npm/React/Vite projects**: install `@paper-design/shaders` (or `@paper-design/shaders-react`) or mount via `ShaderMount`.
3. **In zero-dependency single-file HTML / OpenMotion HyperFrames**:
   - Extract the GLSL ES 3.0 fragment shader string from the `.ts` file.
   - For real-time web pages, use `requestAnimationFrame` or `ShaderMount` with `speed > 0`.
   - For **OpenMotion HyperFrames MP4 rendering**, disable self-driven `rAF` (`speed = 0`) and update time deterministically via `shaderMount.setFrame(t * 1000)` inside the composition's paused GSAP timeline (`window.__timelines[id]`).
4. **Always pair with a protective scrim** when rendering text over animated shaders, and honor `prefers-reduced-motion: reduce` by locking `speed = 0` at a clean initial frame.
