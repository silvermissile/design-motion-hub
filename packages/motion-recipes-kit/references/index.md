# Motion Recipes Index (84 Zero-Dependency Effects)

> Extracted from `motion-anything/recipes/web/`. All files live under `assets/effects/<id>/`, with shared WebGL runner at `assets/shaderbg.js`.

| Category | ID | Description | Files | Avoid When |
| :--- | :--- | :--- | :--- | :--- |
| `ambient` | `aurora` | A living GPU shader background — faithful fragment shader run in dependency-free WebGL. | `aurora.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `balatro` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `balatro.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `blob-cursor` | A soft gooey blob trails the cursor with a springy lag — a playful custom pointer. | `blob-cursor.js` | Touch-only contexts; overuse; reduced-motion where it distracts |
| `ambient` | `border-beam` | A small bright comet of light travels around the border once and again — a lively accent for one card. | `border-beam.css` | - |
| `ambient` | `circular-text` | Text curves around a circle and slowly rotates — a decorative badge/seal accent. | `circular-text.css`, `circular-text.js` | Overuse; dense grids; reduced-motion contexts where it distracts |
| `ambient` | `crosshair` | A thin crosshair spans the viewport and tracks the pointer — a precise, techy custom cursor. | `crosshair.js` | Touch-only contexts; overuse; reduced-motion where it distracts |
| `ambient` | `dark-veil` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `dark-veil.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `dither` | A retro Bayer-dithered noise wave — pixelated, quantized, faithful GPU shader. | `dither.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple animated backgrounds at once |
| `ambient` | `dot-field` | A gradient dot lattice that bulges away from the pointer with a soft cursor glow. | `dot-field.js` | Behind dense text without a scrim; Multiple animated backgrounds at once |
| `ambient` | `dot-grid` | An interactive dot grid — pointer proximity glow, shove on fast moves, click shockwave, elastic return. | `dot-grid.js` | Behind dense text without a scrim; Multiple animated backgrounds at once |
| `ambient` | `electric-border` | A jittery electric outline traces a card — an energetic accent for one hero element. | `electric-border.css` | Calm surfaces; Many at once |
| `ambient` | `faulty-terminal` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `faulty-terminal.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `ferrofluid` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `ferrofluid.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `galaxy` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `galaxy.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `gradient-blinds` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `gradient-blinds.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `gradual-blur` | A soft progressive blur fades content out toward an edge — a premium way to hint "more below". | `gradual-blur.css` | When users need to read the edge content clearly |
| `ambient` | `grainient` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `grainient.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `image-trail` | Thumbnails trail behind the cursor and fade — a gallery/portfolio hero flourish. | `image-trail.js` | Overuse; touch-only where relevant; reduced-motion where it distracts |
| `ambient` | `iridescence` | A living GPU shader background — faithful fragment shader run in dependency-free WebGL. | `iridescence.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `light-rays` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `light-rays.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `lightfall` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `lightfall.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `lightning` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `lightning.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `line-waves` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `line-waves.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `liquid-chrome` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `liquid-chrome.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `magnet-lines` | A grid of little lines all point toward the cursor — a hypnotic interactive field. | `magnet-lines.css`, `magnet-lines.js` | Overuse; dense grids; reduced-motion contexts where it distracts |
| `ambient` | `noise` | A film-grain noise overlay — subtle animated texture over any background. | `noise.js` | Behind dense text without a scrim; Multiple animated backgrounds at once |
| `ambient` | `orb` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `orb.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `particles` | A floating particle cloud — soft round sprites drifting in 3D with a slow scene wobble. | `particles.js` | Behind dense text without a scrim; Multiple animated backgrounds at once |
| `ambient` | `pixel-blast` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `pixel-blast.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `pixel-snow` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `pixel-snow.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `plasma` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `plasma.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `plasma-wave` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `plasma-wave.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `prism` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `prism.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `prismatic-burst` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `prismatic-burst.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `radar` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `radar.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `ripple-grid` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `ripple-grid.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `shine-border` | A soft band of light travels continuously around an element's border — quiet, premium ambient motion. | `shine-border.css` | - |
| `ambient` | `side-rays` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `side-rays.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `silk` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `silk.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `soft-aurora` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `soft-aurora.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `splash-cursor` | A fluid-simulation cursor — pointer movement splats swirling, glowing dye (full multi-pass WebGL fluid sim). | `splash-cursor.js` | Behind dense text without a scrim; Multiple animated backgrounds at once |
| `ambient` | `star-border` | A soft light rotates around a pill/button border — a gentle animated outline for one CTA. | `star-border.css` | Many buttons at once; Calm/serious surfaces |
| `ambient` | `strands` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `strands.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `target-cursor` | An animated target ring replaces the cursor and snaps onto interactive elements. | `target-cursor.js` | Touch-only contexts; overuse; reduced-motion where it distracts |
| `ambient` | `threads` | A distinctive GPU shader background — faithful fragment shader in dependency-free WebGL. | `threads.js` + `shaderbg.js` | Behind dense text without a scrim; Multiple GPU backgrounds at once |
| `ambient` | `waves` | A perlin-warped line field with a pointer wake — organic flowing lines. | `waves.js` | Behind dense text without a scrim; Multiple animated backgrounds at once |
| `attention` | `attention-pulse` | A soft expanding ring that draws the eye to one element — a CTA, a badge, a new dot. | `attention-pulse.css` | - |
| `emphasis` | `count-up` | Animate a number counting up to its target when it scrolls into view. | `count-up.css`, `count-up.js` | - |
| `emphasis` | `counter` | Digits roll like an odometer up to the target number — a satisfying stat reveal. | `counter.css`, `counter.js` | Touch-only contexts; overuse; reduced-motion where it distracts |
| `entrance` | `bounce-cards` | A stack of cards springs and fans into place on load — a lively hero for a small set. | `bounce-cards.css`, `bounce-cards.js` | Overuse; touch-only where relevant; reduced-motion where it distracts |
| `entrance` | `fade-in-up` | A clean rise + fade for elements as they appear on the page (on load). | `fade-in-up.css`, `fade-in-up.js` | - |
| `entrance` | `stagger-list` | List items rise + fade in one after another on load — for short, above-the-fold lists. | `stagger-list.css`, `stagger-list.js` | - |
| `feedback-delight` | `click-spark` | A quick burst of sparks flies from the point you click — a playful tap accent. | `click-spark.js` | Serious/destructive actions; many at once |
| `feedback-delight` | `elastic-slider` | A slider whose track stretches elastically as you drag past the ends — playful, tactile input. | `elastic-slider.css`, `elastic-slider.js` | Touch-only contexts; overuse; reduced-motion where it distracts |
| `feedback-delight` | `like-burst` | A celebratory particle burst on tap, for likes / favorites / reactions. | `like-burst.css`, `like-burst.js` | - |
| `feedback-delight` | `ripple-press` | A ripple blooms from the exact point you tap or click — clear, honest press feedback. | `ripple.css`, `ripple.js` | - |
| `feedback-delight` | `shimmer-button` | A soft band of light sweeps across a CTA on hover (or slowly at rest) — premium, restrained. | `shimmer-button.css` | - |
| `feedback-delight` | `stepper` | An animated step indicator fills as you advance — clear progress for a multi-step flow. | `stepper.css`, `stepper.js` | Overuse; touch-only where relevant; reduced-motion where it distracts |
| `feedback-delight` | `toggle-spring` | A switch whose knob springs across on toggle — a tactile, satisfying state change. | `toggle-spring.css`, `toggle-spring.js` | - |
| `hover-press` | `card-lift-hover` | A card that lifts toward the viewer on hover, with a deepening shadow. | `card-lift-hover.css` | - |
| `hover-press` | `dock` | A macOS-style dock whose icons magnify toward the cursor — a delightful app-launcher row. | `dock.css`, `dock.js` | Overuse; touch-only where relevant; reduced-motion where it distracts |
| `hover-press` | `glare-hover` | A soft glare sweeps across a card following the cursor on hover — a premium, tactile sheen. | `glare-hover.css`, `glare-hover.js` | Dense grids; Touch-only contexts (no cursor) |
| `hover-press` | `glass-icons` | Glassmorphic icon buttons that lift and glow on hover — a tactile toolbar/social row. | `glass-icons.css` | Overuse; dense grids; reduced-motion contexts where it distracts |
| `hover-press` | `gooey-nav` | A gooey pill slides under the active nav item with a liquid merge — a smooth segmented control. | `gooey-nav.css`, `gooey-nav.js` | Overuse; touch-only where relevant; reduced-motion where it distracts |
| `hover-press` | `magnetic-button` | A button that subtly leans toward the cursor as it approaches, then springs back. | `magnetic-button.css`, `magnetic-button.js` | - |
| `hover-press` | `pixel-card` | Pixel tiles light up in a wave across a card on hover — a subtle retro shimmer. | `pixel-card.css`, `pixel-card.js` | Overuse; dense grids; reduced-motion contexts where it distracts |
| `hover-press` | `pixel-transition` | A card flips to a second face through a burst of pixel tiles — a retro reveal on hover. | `pixel-transition.css`, `pixel-transition.js` | Overuse; dense grids; reduced-motion contexts where it distracts |
| `hover-press` | `spotlight-card` | A soft radial spotlight follows the cursor across a card, revealing a subtle glow and border. | `spotlight-card.css`, `spotlight-card.js` | - |
| `hover-press` | `tilt-3d` | A card tilts in 3D toward the pointer with a soft glare — tactile depth on hover. | `tilt-3d.css`, `tilt-3d.js` | - |
| `loading` | `loading-shimmer` | Skeleton placeholders with a soft sweeping shimmer while real content loads. | `loading-shimmer.css` | - |
| `scroll-reveal` | `fade-content` | Content fades and rises gently as it scrolls into view — the calm default reveal. | `fade-content.css`, `fade-content.js` | Above-the-fold hero; every node |
| `scroll-reveal` | `scroll-reveal` | Content gently rises and fades into view as it scrolls into the viewport. | `scroll-reveal.css`, `scroll-reveal.js` | - |
| `text-kinetic` | `blur-text` | Words resolve from a soft blur, one after another — a calm, premium headline entrance. | `blur-text.css`, `blur-text.js` | Body copy; more than one per view |
| `text-kinetic` | `decrypted-text` | Scrambled characters resolve into the real text on hover or view — a techy decode. | `decrypted-text.js` | Body copy; calm/luxury tones |
| `text-kinetic` | `falling-text` | Letters drop into place one after another — a light, gravity-flavored headline entrance. | `falling-text.css`, `falling-text.js` | Body copy; serious tones; more than one per view |
| `text-kinetic` | `glitch-text` | An RGB-split glitch flickers across a headline — a techy, edgy reveal. | `glitch-text.css` | Calm/editorial tones; body copy |
| `text-kinetic` | `gradient-text` | A slow gradient drifts through a headline — quiet premium emphasis on one line of type. | `gradient-text.css` | - |
| `text-kinetic` | `kinetic-headline` | Words (or letters) stagger in one after another — for a hero headline or a title card. | `kinetic-headline.css`, `kinetic-headline.js` | - |
| `text-kinetic` | `rotating-text` | One word swaps for the next in place — a compact way to cycle a few phrases. | `rotating-text.css`, `rotating-text.js` | Long text; more than one rotator per view |
| `text-kinetic` | `scroll-float` | Words float up and settle as the line enters view — a lively per-word scroll reveal. | `scroll-float.css`, `scroll-float.js` | Overuse; dense grids; reduced-motion contexts where it distracts |
| `text-kinetic` | `shiny-text` | A soft highlight sweeps across muted text — a quiet premium shimmer for one short label. | `shiny-text.css` | - |
| `text-kinetic` | `shuffle-text` | Letters shuffle through random neighbors then settle into the word — a quick playful reveal. | `shuffle-text.js` | Body copy; calm tones |
| `text-kinetic` | `text-scramble` | Glyphs shuffle then resolve into the final word — a techy decode reveal for one short line. | `text-scramble.js` | - |
| `text-kinetic` | `true-focus` | Words sit softly blurred; one snaps into focus at a time — draws the eye across a phrase. | `true-focus.css`, `true-focus.js` | Long text; when everything must be sharp |
