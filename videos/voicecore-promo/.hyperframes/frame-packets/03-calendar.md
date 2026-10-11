# Frame packet: 03-calendar

## Project inputs

- Project: /home/user/mistraltest/videos/voicecore-promo
- Design tokens: /home/user/mistraltest/videos/voicecore-promo/frame.md
- RULES_DIR: /home/user/mistraltest/.agents/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 3 — Créneau confirmé

- status: outline
- duration: 6s
- transition_in: crossfade
- scene: Mini-calendar 5 colonnes (LUN–VEN, 12–16), créneau VEN 16 surligné puis confirmation
- type: feature_showcase
- blueprint: panel-edit-live-sync (Adapt)
- focal: the mini-calendar card — roles: cutout (foreground, aura dimmed ~15% behind it)
- asset_candidates:
- src: compositions/frames/03-calendar.html

Adapt: keep the "control is touched, the coupled surface updates live in the same beat" signature; the "control" is the highlighted slot, the "coupled surface" is the confirmation line that appears once it's picked — no cursor/caret, the pick reads as the agent's own action.

Scene 1 (0.0–1.4s): call-card shrinks and morphs (`card-morph-anchor`) into the mini-calendar card at the same screen center — Centered, ~50% of frame. 5-day grid (LUN–VEN, 12–16) fades in as one block (the grid itself is the entrance, not a reveal target).
Scene 2 (1.4–3.2s): the VEN/16 cell highlights via a blue pulse (`asr-keyword-glow`, single attack-decay, not looped) — the live coupling: the highlight IS the picked slot.
Scene 3 (3.2–6.0s): confirmation resolves beneath the grid, per-word staggered reveal: « Créneau confirmé · Exemple · 10 h 30 », a checkmark spring-pops (`spring-pop-entrance`, smooth long-tail, no overshoot) beside it — held read for the frame's last ~1.5s, this is one of the two deliberate breather beats (subtle jitter only).

## Selected blueprint: panel-edit-live-sync

# panel-edit-live-sync — Panel Edit, Live Sync

**intent**: A bipartite stage — an inspector/editor **panel bound to a target surface** — where a cursor (or text caret) continuously manipulates a control (value scrub, unit/codegen dropdown pick, knob or easing-handle drag, inline retype) and the coupled surface updates **live, in the same beat**: the page button rotates as the value scrubs, preview icons resize per keystroke, the hex readout mirrors every hover, the code block converts on the pick. The motion IS the causality — one gesture, two surfaces changing in the same frame. The camera's job is co-visibility of the couple, not a chase.

**provenance** (7 mined Key_Feature goldens across 4 products, both dialects — three sync modes):

- _Write-sync (control → target)_ — the anchor mode: a visual-editor panel scrubs rotation/margin/padding while the live page button rotates and shifts in the same beat (plus unit + font-weight dropdown picks); an inline `className` retype in a glowing code callout resizes the preview icons per keystroke (caret-as-actor, push-in/pull-back roundtrip that must keep BOTH surfaces in frame); a motion editor drags a knob along a dotted motion path and bends easing handles into an S-curve, paying off with a big zoom-out where the finished toggle PERFORMS the edited ease (deferred payoff).
- _Read-sync (target → panel mirror)_: clicking a page button pops a toolbar → "Copy code" → the code editor fills with the element's CSS under one continuous slow zoom-out; hovering palette swatches live-updates a footer hex readout while the grid scrolls.
- _Self-conversion (panel is both control and target)_: unit dropdown conversions inside a 3D-tilted spacing panel snap-convert values in place (rem→px→%, `0,375 rem` → `6 px` → `4,871 %`); a codegen dropdown picks SwiftUI and the CSS block crossfades into SwiftUI under a rapid punch-in.

> **Concentration caveat**: 4 of 7 members are one video (CSS Scan Pro 2.0). The COUPLING engine is independently attested by 3 more products across 3 more videos and both dialects (Figma Dev Mode, Figma motion editor, bolt.new), each on a different surface pair — page+inspector, canvas+timeline+easing panel, IDE code+app preview — so the shape is real, not one film's house style. What IS CSS-Scan-Pro house style (marked optional below): the dark-slate capability title-card prelude, the oversized black cursor with white outline, the green success-checkmark flip, flash tooltips. Trigger is product-conditional: reach for this shape when the feature itself is live editing/inspection.

**roles served**

- Key_Feature (from `panel-edit-live-sync`, all 7 cases): one capability demonstrated as 2–4 edit beats on a single bound element — each beat a continuous manipulation the coupled surface answers in real time, resolving on the last edit held, a zoom-out to the finished product performing the edit, or a callout landing on the result. Three sub-shapes fold in:
  - **(A) write-sync** — cursor/caret edits a control; the TARGET transforms live (rotate/shift/stretch/resize/re-animate).
  - **(B) read-sync** — cursor selects/hovers the target; the PANEL readout mirrors live (CSS streams in, hex footer updates).
  - **(C) self-conversion** — the edit transforms the panel's own readout (units snap-convert, CSS crossfades to SwiftUI).

**duration**: 5.3–11.9s (read-sync hover demos shortest ~5.3s; multi-beat scrub/edit runs 8.7–11.9s)

**shot structure** (a `[target surface — webpage / design canvas / IDE + live preview]` sharing the frame with a `[bound panel — floating inspector / docked code panel / timeline + easing editor]`; a `[cursor or caret]` is the actor; every beat pairs ONE manipulation gesture with a SIMULTANEOUS response on the coupled surface; selection chrome declares which element is bound; camera ranges locked → active but always preserves the couple)

- **Scene 0 (optional, 0.0–2.0s) — capability title card.** Solid dark `[slate/charcoal]` card; a single white line names the capability (`"Edit CSS visually"`, `"Auto measurement units conversion"`, `"Check color palettes"`) — fades/drifts in, holds, then a HARD CUT or a fast motion-blurred zoom-out that settles the stage. (CSS-Scan-Pro-house-leaning; 071/017/080 open cold on the stage, 071 instead springs a giant lowercase `[verb word]` over the preview.)

- **Scene 1 (~1–3s) — the couple establishes.** The `[target surface]` arrives with the `[bound panel]` docked, floating in subtle 3D tilt, or SLIDING IN from an edge. Selection chrome pops on to declare the binding: `[bounding box + corner handles / red dashed inspection guides / redline measurement chips popping sequentially / green class-name header]`. The cursor enters and glides to the first control.

- **Scene 2..N (~2s each) — edit beats, gesture + mirror in the same frame (the engine).** Each beat is ONE continuous manipulation and its live answer:
  - _Variant — write-sync (A)_: the cursor CLICK-AND-DRAGS a numeric field (value counts up/down: `0°→-10°`, `0→38 px`) while the target `[button/element]` rotates/shifts/stretches in real time; OR drags a `[knob along a dotted motion path / easing handle bending the curve, coords readout updating]`; OR a caret INLINE-RETYPES a value (`1xl→4xl→2xl`) inside a `[glowing magnifier callout]` while `[preview elements]` resize per keystroke. A flash `[tooltip]` may name the gesture.
  - _Variant — read-sync (B)_: the cursor CLICKS/HOVERS the target element — a `[floating toolbar]` springs up above it, a menu pick fires (`Copy code` → icon flips to a green checkmark) and the `[code editor]` fills with streaming CSS; or hovered `[swatches]` outline and the `[footer hex]` updates instantly per hover as the grid scrolls.
  - _Variant — self-conversion (C)_: the cursor clicks a unit/codegen `[dropdown]` — it opens with hover-highlighted rows + checkmark — and on the pick the readout SNAP-CONVERTS in place (`rem→px`, value recalculates) or the whole `[code block]` crossfades to the new language, heading flipping (`Layout`→`HStack`).
  - Camera per beat: LOCKED wide holding both surfaces; or a PUNCH-IN to the acting surface (panel scroll reveals the next section) — but during a write-sync edit both gesture and mirror stay co-visible (071's law: the push-in never crops the preview out).

- **Scene N (final beat → end) — the edit proves out, HOLD.** Resolution diverges:
  - _Variant — last edit held_: the final pick lands (`100 - Thin` selected, `4,871 %` applied) and the state simply HOLDS — never end on the tooltip with the dropdown unopened.
  - _Variant — payoff zoom-out_: a big zoom-out reveals the finished product PERFORMING the edited parameter — the toggle slides with the new ease inside the full phone mockup, confetti drifting; or the pull-back returns to the identical full framing while a `[terminal]` appends an hmr line.
  - _Variant — callout lands_: a large `[arrow callout]` slides in pointing at the result / the export menu rests open under the cursor; frame drifts subtly outward.

**signature move**: the **live-sync couple** — a scrubbed/typed/dragged control and its bound surface changing simultaneously, in-frame together, every edit beat.

**motion vocabulary**: click-and-drag value scrubbing with live target sync (rotate / shift / stretch); per-keystroke live preview resize; inline retype with backspace + blinking caret; instant value snap-conversion; live hex/readout mirror on hover; unit/codegen dropdown with hover-highlight rows + checkmark, instant open/close; font-weight/dropdown row pick; knob drag along a dotted motion path with waypoints; easing-handle drag bending the curve (coords readout updating); playhead scrub; redline measurement chips popping sequentially; bounding box + corner handles; red dashed inspection guides; floating toolbar springs up above the selected element; code panel slides in from an edge; in-panel scroll to a new section; swatch-grid scroll; syntax-highlighted code streams/pastes in; code crossfade (CSS→SwiftUI) with heading flip; glowing magnifier callout over a code token; icon flips to green success checkmark; flash tooltip naming the gesture; oversized black cursor with white outline; grab-cursor drag; dark title-card prelude + hard cut; fast motion-blurred zoom-out settle; ONE continuous slow zoom-out spanning a demo shot; eased push-in → hold → eased pull-back roundtrip; quick punch-in to panel/timeline/code; subtle 3D tilt drift/parallax on a floating panel; big zoom-out to the product payoff; result element re-animates with the edited ease; confetti drift; terminal log append; large arrow callout slide-in; static hold.

**rule mapping**

- cursor glide to a control, presses, click feedback → `cursor-click-ripple`
- cursor state flips pointer↔grab over a scrubbable field / draggable handle → `context-sensitive-cursor`
- scrubbed numeric readout counts up/down under the drag → `counting-dynamic-scale`
- **the live-sync couple itself** (control gesture drives a second element's property in the same beat) → `control-target-sync` (concurrent tweens at the SAME timeline position — readout tween + target transform tween sharing one label)
- inline retype with backspace, typos, holds / keystroke thresholds → `discrete-text-sequence` (+ `context-sensitive-cursor` for the caret blink)
- per-keystroke preview resize → `discrete-text-sequence` (keystroke state thresholds) + `control-target-sync` (the coupled scale steps)
- instant value snap-conversion / hex readout swap / heading flip (`Layout`→`HStack`) / status text → `discrete-text-sequence`
- syntax-highlighted code streaming/pasting in, terminal log append → `discrete-text-sequence` (bulk additions are explicitly in-scope)
- dropdown/menu pops open; floating toolbar springs up; tooltip flash; redline chips pop sequentially (staggered, ≤500ms) → `spring-pop-entrance`
- dropdown row hover-highlight stepping and pick sequencing / which edit beat shows what → `dynamic-content-sequencing`
- dashed inspection guides / selection outline draw on → `svg-path-draw`; dotted motion path with waypoints → `svg-path-draw` (the path display)
- knob TRAVEL along the motion path → path following — see `hyperframes-keyframes` (paths)
- easing-handle drag bending the curve (SVG `d` interpolation) → SVG path morph — see `hyperframes-keyframes` (morph; `svg-path-draw` only draws strokes, it cannot morph a path); coords readout beside it → `discrete-text-sequence`
- glowing magnifier callout over a code token (incl. the live enlarged duplicate of a UI token) → composition: `ambient-glow-bloom` (the glow) + `spring-pop-entrance` (the callout pop)
- code panel slides in from an edge / panel docks → `card-morph-anchor` / `scale-swap-transition` (per cursor-ui-demo precedent for panel slide-in)
- code block crossfade CSS→SwiftUI; success-icon flip to green checkmark → `scale-swap-transition` (state swap at the same anchor)
- in-panel scroll / swatch-grid scroll (masked internal translate) → `gsap-effects`; on a 3D-tilted panel → `3d-page-scroll` (tilted plane w/ internal scroll)
- subtle 3D tilt drift/parallax on the floating panel; continuous micro-drift on holds → `multi-phase-camera` (micro-drift phase)
- punch-in to panel/timeline/code and settle → `coordinate-target-zoom` + `multi-phase-camera`
- eased push-in → hold → eased pull-back roundtrip (co-visibility preserved) → `multi-phase-camera` (pull-back / focus / push sequencing)
- ONE continuous slow zoom-out spanning the demo shot; big zoom-out to the product payoff → `viewport-change` (single `.world` composite transform)
- fast motion-blurred zoom-out settle transition → `motion-blur-streak` + `viewport-change`
- result element re-animates with the edited ease (toggle slides with the new S-curve) → `gsap-effects` (custom-ease tween on the payoff element)
- confetti drift on the payoff → `particle-burst` (deterministic confetti) + `sine-wave-loop` (bounded drift)
- large arrow callout slide-in + hold → `gsap-effects` (single slide tween)
- dark title-card prelude (capability line fades/drifts in, hard cut out) → cross-blueprint: `titlecard-reveal` territory; the drift/fade itself → `gsap-effects` — EXIT-N/A as a mapped rule here
- hard cuts between title and demo; final static hold → EXIT-N/A (transition registry / no rule needed)

**camera modifier**: The camera law is the INVERSE of cursor-ui-demo's chase: it serves **co-visibility of the couple**. Three attested postures — (1) LOCKED: fixed framing for the whole demo, panel + target both in frame, all motion element-level (CSS_39.0, CSS_102.8 after settle); (2) ONE CONTINUOUS MOVE: a single slow zoom-out (or drift) spanning the entire demo shot while edits fire inside it (CSS_10.9, CSS_63.5's tilt-drift) → `viewport-change`; (3) PUNCH-AND-RETURN: eased push-in onto the acting surface, tight hold through the edit, eased pull-back to the identical opening framing (071_bolt, 080_figma, 017_figma) → `multi-phase-camera` + `coordinate-target-zoom` — with the hard constraint that during a write-sync edit the mirror surface is never cropped out. If the camera is chasing the cursor target-to-target with per-beat state swaps, you're in `cursor-ui-demo`, not here.

## Selected motion rule: asr-keyword-glow

---
name: asr-keyword-glow
description: Keywords glow + scale up when "spoken" — attack/sustain/release envelope synced to per-word timestamps. Even without real audio, hardcoded timings create a "narrator emphasis" effect.
metadata:
  tags: asr, audio-sync, highlight, glow, keyword, text, speech, emphasis
---

# ASR Keyword Glow

Words in a phrase visually activate (glow blur + scale) when "spoken", following an attack-sustain-release envelope over per-word `{ start, end }` timestamps. In a real ASR pipeline the timings come from a word-level transcript (`hyperframes transcribe` — same shape); for promo video, hand-author them to control emphasis pacing. The envelope never falls to zero after a word — it decays to a rest level, leaving a breadcrumb of recent emphasis.

## How It Works

A single linear driver tween (`ease: "none"` — any other ease distorts the per-word envelope; do not change) sweeps scene time; its `onUpdate` loops over ALL words computing each one's envelope: 0 before `start`, linear attack to 1 over `ATTACK_DUR`, sustain at 1 until `end`, decay to `REST_LEVEL` over `RELEASE`, then hold at rest. The envelope drives `text-shadow` blur and `scale` — one driver for the whole phrase, never one tween per word (60+ words would bloat the timeline).

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="phrase">
  <span class="word" data-word="{w1Key}">{w1}</span>
  <span class="word" data-word="{w2Key}">{w2}</span>
  <!-- … the final word may be the brand, with the .brand modifier -->
  <span class="word brand" data-word="{brandKey}">{brandWord}</span>
</div>
```

```css
.phrase {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: {restColor};
}
.word {
  display: inline-block; /* required for transform on <span> */
  transform-origin: 50% 50%;
  text-shadow: 0 0 0 {glowColorTransparent};
}
.word.brand {
  color: {brandAccentColor};
}
```

```js
// Per-word spoken windows — one entry per span; brand word 1.5-2× a normal word's window.
const TIMINGS = {
  // {w1Key}: { start: …, end: … },  — seconds, local to the scene
};

function envelope(time, start, end) {
  if (time < start) return 0;
  if (time < end) return Math.min((time - start) / ATTACK_DUR, 1);
  const releaseEnd = end + RELEASE;
  if (time < releaseEnd) return 1 - ((time - end) / RELEASE) * (1 - REST_LEVEL);
  return REST_LEVEL;
}

const words = document.querySelectorAll(".word");
const driver = { t: 0 };
tl.to(
  driver,
  {
    t: SCENE_DURATION,
    duration: SCENE_DURATION,
    ease: "none", // linear — t maps 1:1 to scene time
    onUpdate: () => {
      words.forEach((el) => {
        const timing = TIMINGS[el.dataset.word];
        if (!timing) return;
        const env = envelope(driver.t, timing.start, timing.end);
        el.style.textShadow = `0 0 ${MAX_BLUR * env}px ${glowColorRgba(env)}`;
        el.style.transform = `scale(${1 + MAX_SCALE_BOOST * env})`;
      });
    },
  },
  0,
);
```

`glowColorRgba(env)` returns the glow color with `env`-modulated alpha.

## Variations

- **Karaoke style (RECOMMENDED for video narration)** — the default amplitudes read too subtle in video: inactive words still dominate. Render inactive words DIM and lerp the active word toward bright + larger; at any moment 1–2 words are bright (spoken + lingering rest) and the rest is dim. Use for short phrases (5–10 words) where one word at a time should POP; keep the subtle default for long dense text. Pushes MAX_BLUR, MAX_SCALE_BOOST, and REST↔ACTIVE contrast; everything else identical:

```js
function lerpChannel(a, b, t) {
  return Math.round(a + (b - a) * t);
}
function colorAt(env, isBrand) {
  const target = isBrand ? BRAND_RGB : ACTIVE_RGB;
  return `rgb(${lerpChannel(REST_RGB.r, target.r, env)}, ${lerpChannel(REST_RGB.g, target.g, env)}, ${lerpChannel(REST_RGB.b, target.b, env)})`;
}
// in onUpdate: el.style.color = colorAt(env, el.classList.contains("brand"));
```

- **Multi-octave glow** — multiply the sustain by `1 + sin(driver.t × PULSE_HZ) × PULSE_AMPLITUDE` so high-emphasis words breathe at peak.
- **Color shift on the peak** — same channel-lerp from `restColor` → `peakColor` as `env` rises (non-karaoke form).
- **3D pop-out** — add `translateZ(env × MAX_POP_Z)` so the spoken word leans toward camera; requires `perspective` on the parent.
- **From real ASR transcripts** — convert `{ word, start_ms, end_ms }` entries to seconds and feed in identically.

## Values

| token           | default style        | karaoke style | notes                                                      |
| --------------- | -------------------- | ------------- | ---------------------------------------------------------- |
| ATTACK_DUR      | 0.1–0.25s            | same          | must be < the shortest word's window or it never reaches 1 |
| RELEASE         | 0.2–0.5s             | same          | decay to rest                                              |
| REST_LEVEL      | 0.15–0.4             | 0.05–0.2      | > 0 (breadcrumb), < 1                                      |
| MAX_BLUR        | 15–25px              | 30–45px       | bigger = "shouting"                                        |
| MAX_SCALE_BOOST | 0.03–0.10            | 0.15–0.25     | additive at peak (0.08 ⇒ scale 1.08)                       |
| PULSE_HZ / AMP  | 4–10 rad/s / 0.1–0.3 | —             | multi-octave variation                                     |
| MAX_POP_Z       | 20–60px              | —             | 3D variation                                               |
| SCENE_DURATION  | = `data-duration`    | same          | driver must end in sync with the scene's seek window       |

## Critical Constraints

- **Timings monotonic, non-overlapping** — every entry's `end` < the next entry's `start`; overlapping windows make the envelope ambiguous.
- **Brand word window 1.5–2× a normal word** — the brand is the headline; let it sustain.
- **Driver ease stays `"none"`** — any other ease warps every word's envelope timing.
- **`text-shadow`, not `box-shadow`** — the glow must hug the GLYPH (speaking emphasis), not the inline-block rectangle.
- **One driver looping all words** — never one tween per word.
- **Commit to a style** — values between the default and karaoke columns yield awkward "half-loud" emphasis.
- **Climax dwell ≥1s** after the final word's emphasis — the last word IS the headline beat.

## See also

`3d-text-depth-layers` (depth on the active word at peak) · `sine-wave-loop` (idle breathe between emphasis moments) · `context-sensitive-cursor` (typewriter matching the ASR cadence) · `/media-use` for `hyperframes transcribe` and caption rendering.

## Selected motion rule: card-morph-anchor

---
name: card-morph-anchor
description: Container morphs dimensions and border-radius between shots, serving as a visual transition anchor.
metadata:
  tags: morph, anchor, transition, border-radius, container, shape
---

# Card Morph Anchor

A free-floating container morphs apparent size, corner radius, and surface treatment between two shots — the morph itself IS the transition; the viewer's eye tracks the persistent container. Distinct from [anchored-layout-expand.md](anchored-layout-expand.md) (an edge-pinned live layout participant that grows along one axis and reflows neighbors — here nothing is pushed) and [theme-crossfade-morph.md](theme-crossfade-morph.md) (a whole-theme reskin under a fixed anchor — here a single container changes shape).

## How It Works

Since `width`/`height` tweens are forbidden, **substitute uniform `scale` for apparent size**; the remaining morph channels are **paint-only**: `borderRadius`, `background`, `boxShadow`. All channels ride ONE tween (one ease, one duration) so the shape morphs in lockstep. Content choreography: old content fades out during the first ~40% of the morph, new content fades in during the last ~40% — the shape-only gap between is the natural "blink." Optionally the morph card itself fades at the very end, revealing the real next-shot element rendered behind it.

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<!-- DOM order = stacking: the anchor renders BEFORE the card, so the card is on top -->
<div class="next-shot-anchor"><img src="{nextShotAnchor}" alt="anchor" /></div>
<div class="morph-card">
  <div class="content-old">{shotOneContent}</div>
  <div class="content-new">{shotTwoContent}</div>
</div>
```

```css
.morph-card {
  width: SHOT_ONE_W;
  height: SHOT_ONE_H; /* shot-1 geometry; the morph is scale, never width/height */
  border-radius: SHOT_ONE_RADIUS;
  background: {surfaceShotOne};
  overflow: hidden; /* content must clip during the shape change */
  display: grid;
  place-items: center;
  will-change: transform;
}
.content-old,
.content-new {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
.content-new {
  opacity: 0; /* author its inner sizes at apparent-size ÷ END_SCALE — it scales with the card */
}
.next-shot-anchor {
  position: absolute;
  opacity: 0; /* fades in as the morph card fades out */
}
```

```js
const END_SCALE = SHOT_TWO_W / SHOT_ONE_W; // uniform — keep the two shots aspect-matched

// Hold shot 1 for HOLD_BEAT first — an instant morph reads as glitchy.

// One tween, all channels: uniform scale + paint-only properties.
tl.to(
  ".morph-card",
  {
    scale: END_SCALE,
    borderRadius: SHOT_TWO_RADIUS / END_SCALE, // borderRadius is pre-scale — divide to land the APPARENT radius
    background: "{surfaceShotTwo}",
    boxShadow: "{shadowShotTwo}",
    duration: MORPH_DUR,
    ease: "power2.inOut",
  },
  MORPH_START,
);

tl.to(
  ".content-old",
  { opacity: 0, duration: MORPH_DUR * OLD_FADE_FRAC, ease: "power1.in" },
  MORPH_START,
);
tl.to(
  ".content-new",
  { opacity: 1, duration: MORPH_DUR * NEW_FADE_FRAC, ease: "power1.out" },
  MORPH_START + MORPH_DUR * (1 - NEW_FADE_FRAC),
);

// Optional handoff — card fades out over the pixel-identical real anchor.
tl.to(
  ".morph-card",
  { opacity: 0, duration: MORPH_DUR * FINAL_FADE_FRAC, ease: "power1.in", immediateRender: false },
  MORPH_START + MORPH_DUR * (1 - FINAL_FADE_FRAC),
);
tl.to(
  ".next-shot-anchor",
  { opacity: 1, duration: MORPH_DUR * FINAL_FADE_FRAC, ease: "power1.out" },
  MORPH_START + MORPH_DUR * (1 - FINAL_FADE_FRAC),
);
```

## Morph channels

| channel        | how                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------- |
| apparent size  | uniform `scale` — the substitution for the forbidden `width`/`height` tween; aspect preserved  |
| `borderRadius` | paint-only; pre-scale units — tween to `APPARENT_RADIUS / END_SCALE`, ≤ half the smaller side  |
| `background`   | paint-only; gradients interpolate only with equal stop counts (solid→solid: `backgroundColor`) |
| `boxShadow`    | paint-only; base shadow → accent glow shifts emphasis                                          |

## Variations

- **Landing on a non-centered target** (dock icon, sidebar slot): add `x`/`y` to the same tween, computed as the FLIP-style delta between the card's and the target's rects — `getBoundingClientRect()` both at build time (single-scene only, per the contract) and tween the difference. Don't hand-compute from CSS values: paddings, borders, and parent transforms compound, and center-vs-edge arithmetic is the classic off-by-half bug.
- **Aspect change between shots**: uniform scale preserves aspect — morph to the nearest uniform fit and let the crossfade/handoff absorb the small delta, or drop the handoff and hold the card's final state.

## Values

| token             | range                     | notes                                                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------ |
| HOLD_BEAT         | 0.6–1.5s                  | ≥ shot 1's entry settle; the viewer must register shot 1 first                       |
| MORPH_DUR         | 0.6–1.2s                  | < 0.5s can't fit both content fades                                                  |
| END_SCALE         | SHOT_TWO_W / SHOT_ONE_W   | icon-sized handoffs typically land at 80–400px apparent width                        |
| SHOT_TWO_RADIUS   | ≤ min(W, H)/2 apparent    | half the smaller side = perfect circle; beyond is clamped                            |
| OLD/NEW_FADE_FRAC | 0.3–0.5 each, sum ≤ 1     | the gap between is the shape-only "blink"                                            |
| FINAL_FADE_FRAC   | 0 (no handoff) or 0.1–0.2 | only when a pixel-identical anchor exists                                            |
| ease              | `power2.inOut` canonical  | `power3`/`expo.inOut` OK; never `back`/`elastic` — overshoot fights the shape change |

## Critical Constraints

- **❗ Uniform-scale substitution** — never tween `width`/`height`; `scale` + the paint-only channels (`borderRadius`, `background`, `boxShadow`) are the ONLY morph properties.
- **❗ Handoff anchor must be pixel-identical to the card's final state** — same apparent size, radius, background, shadow, inner icon dimensions. Any delta = a visible pop during the crossfade. Can't match exactly? Drop the handoff and hold the morph card.
- **❗ Stacking by DOM order, never a z-index snap mid-fade** — render the anchor before the card; a `tl.set({ zIndex })` during an active opacity tween flips stacking before the fade finishes and flickers.
- **`overflow: hidden`** on the card — content must clip as the radius changes.
- **Hold a beat before morphing**; same ease family for shape and crossfade (mixed eases read unsynchronized).

## See also

`anchored-layout-expand` (edge-pinned one-axis growth with reflow) · `theme-crossfade-morph` (whole-theme reskin under a fixed anchor) · `scale-swap-transition` (content swap without shape change) · `sine-wave-loop` (a breath on the final state).

## Selected motion rule: spring-pop-entrance

---
name: spring-pop-entrance
description: The canonical entrance pop — an element (or staggered group) arrives by scaling 0 → 1 on a smooth long-tail settle (power3 default); bouncy overshoot is a rare, explicitly-playful exception. fromTo so it's correct at t=0 under seek.
metadata:
  tags: spring, entrance, pop, scale, power3, settle, stagger, reveal, arrival
---

# Spring-Pop Entrance

> **Smooth beats bouncy.** This entrance defaults to a smooth long-tail settle — `power3.out` (or `expo.out` for a faster front) — that decelerates cleanly into the resting size with **no overshoot**. Bouncy `back.out` is the **#1 instant turn-off** in agent-made videos and is almost never executed well; it is a rare, explicitly-playful exception (consumer / fun brand), never the default. When unsure, settle smoothly.

THE entrance primitive: an element (or staggered group) arrives by springing from nothing — `scale: 0 → 1`, optional small `y` rise — and settles without bouncing. This is **arrival**, not reaction: distinct from [press-release-spring.md](press-release-spring.md) (a click/press → release feedback chain on an element that already rests on screen). Many blueprints used to borrow that rule to fake an entrance; reach for this instead.

## How It Works

One `fromTo` carries the whole arrival: from `{ scale: 0, opacity: 0 }` (explicit, so t=0 is correct under seek) to `{ scale: 1, opacity: 1, ease: "power3.out" }`. For a **group**, the same `fromTo` runs per element at `i * STAGGER`, capped so the group reads as one arriving beat. The `scale` grow is load-bearing; the `y` rise is garnish — drop everything else and it must still read as a clean entrance. Let the ease produce the settle: never hand-key a `scale: 1.1` mid-state (it double-bounces against the curve).

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="pop-hero" id="hero">{heroLabel}</div>

<div class="pop-grid">
  <div class="pop-item">{itemA}</div>
  <div class="pop-item">{itemB}</div>
  <div class="pop-item">{itemC}</div>
</div>
```

```css
.pop-hero,
.pop-item {
  transform-origin: 50% 50%; /* in-place pop; move to the source point for the anchored variation */
  will-change: transform;
}
.pop-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: GRID_GAP;
  place-items: center;
}
```

```js
// Single hero pop — smooth long-tail settle, no overshoot.
tl.fromTo(
  "#hero",
  { scale: 0, opacity: 0 },
  { scale: 1, opacity: 1, duration: POP_DUR, ease: "power3.out" },
  ENTRY_AT,
);

// Staggered group pop — one arriving beat.
gsap.utils.toArray(".pop-item").forEach((el, i) => {
  tl.fromTo(
    el,
    { scale: 0, opacity: 0, y: Y_RISE },
    { scale: 1, opacity: 1, y: 0, duration: POP_DUR, ease: "power3.out" },
    GROUP_ENTRY_AT + i * STAGGER,
  );
});
```

## Variations

- **Calm settle** (premium / enterprise): `power3.out`, no rotation, `Y_RISE` 0–12px — a weighted, confident landing for a hero wordmark or product shot.
- **Firm settle** (everyday default): `power3.out` or `expo.out` for a punchier front, `Y_RISE` ~24px — cards, icons, callouts.
- **Exact-physics settle**: when the settle IS the shot, swap the ease for `springEase({ response: 0.4 })` (critically damped) from `../adapters/gsap-easing-and-stagger.md` → Spring Eases; take `duration` from the helper.
- **Origin-anchored pop**: a callout growing out of a specific point (marker, pointer tip) sets `transform-origin` to that point (e.g. `0% 100%`) so `scale: 0 → 1` reads as "emerging from the source", not "inflating in place".
- **Pop into a held slot**: land the pop and hold still — no idle loop baked into the entrance. If the held frame genuinely needs life, hand off to [sine-wave-loop.md](sine-wave-loop.md) for subtle jitter on a separate later tween; prefer revealing the next element on its VO cue.
- **Bouncy pop (RARE — explicitly-playful only)**: swap the ease for `back.out(OVERSHOOT)` and optionally settle a small `rotation: ROT_FROM → 0` so elements look hand-placed. Only for a deliberately playful register — never product / enterprise / serious tone:

```js
tl.fromTo(
  el,
  { scale: 0, opacity: 0, rotation: ROT_FROM },
  { scale: 1, opacity: 1, rotation: 0, duration: POP_DUR, ease: `back.out(${OVERSHOOT})` },
  GROUP_ENTRY_AT + i * STAGGER,
);
```

Even here keep `OVERSHOOT ≤ ~2` — past that it reads as cartoon wobble. Better still: the baked spring at `dampingFraction: 0.6–0.7` (same adapters doc) gives ~5–10% overshoot that reads physical where `back.out` reads cartoon.

## Values

| token      | range                                     | notes                                                            |
| ---------- | ----------------------------------------- | ---------------------------------------------------------------- |
| EASE       | `power3.out` default; `expo.out` punchier | `back.out(OVERSHOOT)` only in the playful variant                |
| POP_DUR    | 0.4–0.7s                                  | shorter = tight snap; hero must be visible by **t ≤ 0.5s**       |
| STAGGER    | 0.04–0.08s                                | `min(0.06, 0.5 / ITEM_COUNT)` — self-caps the window             |
| ITEM_COUNT | 3–9                                       | >9 makes the stagger vanish — switch to a wipe/sweep reveal      |
| Y_RISE     | 0–32px                                    | small; never large enough to read as a slide-up                  |
| ROT_FROM   | −10°–+10°                                 | playful variant only; alternate sign by index (`i % 2 ? 6 : -6`) |
| ENTRY_AT   | 0–0.4s                                    | a beat of quiet, but keep the subject landing by t ≤ 0.5s        |

## Critical Constraints

- Default ease `power3.out` (no overshoot); `back.out` only in the explicitly-playful variant, and there `OVERSHOOT ≤ ~2`.
- `ITEM_COUNT × STAGGER ≤ ~0.5s` — the group must land inside one beat.
- Entrances state the collapsed from-state in `fromTo` — never rely on a CSS-hidden start (it renders visible before the tween claims it under seek).
- `transform-origin: 50% 50%` for an in-place pop; the source point only for the anchored variation.
- This is a finite arrival — idle motion on a held element is a separate, later `sine-wave-loop` tween.

## See also

`center-outward-expansion` (pop while radiating to slots) · `press-release-spring` (the click-feedback counterpart) · `sine-wave-loop` (post-arrival jitter, sparingly).
