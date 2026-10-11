---
format: 1080x1920
duration: 30s
message: "VoiceCore répond à vos appels pendant que vous travaillez."
arc: Hook → Product_Intro → Key_Feature → Benefit_highlight → Benefit_highlight → CTA/Brand_Outro
audience: commerçants indépendants (restaurants, garages, cabinets, immobilier) recrutés via TikTok/Reels/Shorts
mode: autonomous
music: none
---

## Video direction

- **Palette system** (`frame.md`) — `primary` (#2860E1 blue) carries every eyebrow/numeral/CTA/accent on content frames, as the adopted preset prescribes. `secondary` (#B343F2 violet) is reserved for the `aura` gradient and the CTA pill's fill — never body text, never replacing `primary` as the single content-frame accent. `aura` (the brief's real radial gradient) is the **persistent canvas**, not cover/closing-only: full strength on Frames 1 and 6, dimmed to ~12–15% opacity behind the white/tinted cards on Frames 2–5 so one continuous field reads under the whole film (overrides the preset's "atmosphere on cover/closing only" rule — this project's own brief calls for a persistent aura ground). Cards keep the preset's tinted treatment (4% fill, 20% border, 14px radius, no shadow) on top of the dimmed aura.
- **Motion grammar + reveal model** — `power3` long-tail settle everywhere (no bounce/overshoot). No voiceover drives this film, so reveals are paced to an internal beat instead of a spoken cue: each frame's pieces land on their own beat spread across the shot, never dumped in the first ~25%. Holds use subtle jitter only (`sine-wave-loop`, low amplitude) — no breathing, no back-half pan/push.
- **Rhythm / held-frame allocation** — two deliberate held/breather beats: the confirmation state at the end of Frame 3 (calendar) and the final lockup of Frame 6. Every other frame keeps developing to its last beat.
- **Negative list** — no bouncy/overshoot entrances; no lazy breathing; no slow pan/push in a frame's back half; no nav bars, browser chrome, or real cursors; no invented floating "AI" bokeh — the aura gradient is the brief's own real brand CSS, reused verbatim, not generic filler; no real customer data anywhere in the call-card, calendar, or routing diagram (illustrative only, per `BRIEF.md`).

## Frame 1 — Vous faites votre métier

- status: animated
- duration: 4s
- transition_in: cut
- scene: Fond aura qui monte en intensité, wordmark VoiceCore révélé par masque, accroche en deux lignes posée en dessous
- type: hook
- blueprint: titlecard-reveal (Adapt)
- focal: wordmark "VoiceCore" — roles: cutout (foreground, no logo file supplied)
- asset_candidates:
- src: compositions/frames/01-hook.html
- voiceover: Vous faites votre métier. Votre IA prend les appels.

Adapt: keep the signature logo-pop → tagline-card handoff, compressed from the blueprint's 3-beat chain to 2 beats inside 4s; scene 0 adds the aura field entrance the blueprint doesn't call for.

Scene 1 (0.0–1.0s): full-bleed `aura` gradient only, no content — fades up from black on a power3 ease (`ambient-glow-bloom`). Full-bleed background, 0 foreground layers.
Scene 2 (1.0–2.4s): VoiceCore wordmark resolves center via a reveal-mask wipe (`svg-path-draw`) on a power3 settle — Centered, upper-third, ~25% of frame.
Scene 3 (2.4–4.0s): tagline lands in two lines, per-word staggered reveal (`dynamic-content-sequencing`): « Vous faites votre métier. » then, a beat later, « Votre IA prend les appels. » — Centered, stacked under the wordmark, ~40% density. Holds on the second line for the frame's last ~0.3s (harness crossfade is the exit).

## Frame 2 — Exemple de scénario

- status: outline
- duration: 7s
- transition_in: crossfade
- scene: Call-card blanche 28px, label APPEL ENTRANT, waveform animée, deux bulles de conversation qui arrivent l'une après l'autre
- type: feature_showcase
- blueprint: agent-progress-theater (Adapt)
- focal: the call-card — roles: cutout (foreground, centered, aura dimmed ~15% behind it as background)
- asset_candidates:
- src: compositions/frames/02-call.html
- voiceover: Un client appelle pour réserver une table. Votre agent VoiceCore répond, tout de suite.

Adapt: keep the signature "conversation thread building message-by-message to a camera push-in on confirmation" move; the trigger beat is the card's own arrival (no modal click, no agent avatar) and the "confirmation" is the agent's reply landing, not a checklist.

Scene 1 (0.0–1.3s): white tinted call-card materializes via `card-morph-anchor` from Frame 1's wordmark footprint (continuity of form) — Centered, card ~55% of frame on the dimmed aura. Eyebrow label "APPEL ENTRANT" + small "Exemple de scénario" tag fade in with it.
Scene 2 (1.3–3.0s): waveform bars enter via `svg-icon-enrichment` (live internal motion — bars pulse, finite loop over the hold, never `repeat`/`yoyo`) — Centered inside the card, ~20% of card height. Slow `multi-phase-camera` push (5–8%) begins and holds steady.
Scene 3 (3.0–5.2s): client bubble reveals left via per-word staggered reveal: « Bonjour, je voudrais réserver une table pour deux, vendredi soir. » — asymmetric left-weighted, 2 depth layers (card + bubble).
Scene 4 (5.2–7.0s): agent-IA bubble reveals right, same move, a beat later: « Avec plaisir. Vous préférez 19 h 30 ou 20 h 30 ? » — camera push settles; hold the read on the completed exchange, subtle jitter only.

## Frame 3 — Créneau confirmé

- status: animated
- duration: 6s
- transition_in: crossfade
- scene: Mini-calendar 5 colonnes (LUN–VEN, 12–16), créneau VEN 16 surligné puis confirmation
- type: feature_showcase
- blueprint: panel-edit-live-sync (Adapt)
- focal: the mini-calendar card — roles: cutout (foreground, aura dimmed ~15% behind it)
- asset_candidates:
- src: compositions/frames/03-calendar.html
- voiceover: Il trouve un créneau et confirme le rendez-vous, directement dans votre agenda.

Adapt: keep the "control is touched, the coupled surface updates live in the same beat" signature; the "control" is the highlighted slot, the "coupled surface" is the confirmation line that appears once it's picked — no cursor/caret, the pick reads as the agent's own action.

Scene 1 (0.0–1.4s): call-card shrinks and morphs (`card-morph-anchor`) into the mini-calendar card at the same screen center — Centered, ~50% of frame. 5-day grid (LUN–VEN, 12–16) fades in as one block (the grid itself is the entrance, not a reveal target).
Scene 2 (1.4–3.2s): the VEN/16 cell highlights via a blue pulse (`asr-keyword-glow`, single attack-decay, not looped) — the live coupling: the highlight IS the picked slot.
Scene 3 (3.2–6.0s): confirmation resolves beneath the grid, per-word staggered reveal: « Créneau confirmé · Exemple · 10 h 30 », a checkmark spring-pops (`spring-pop-entrance`, smooth long-tail, no overshoot) beside it — held read for the frame's last ~1.5s, this is one of the two deliberate breather beats (subtle jitter only).

## Frame 4 — Une demande bien orientée

- status: animated
- duration: 6s
- transition_in: crossfade
- scene: Diagramme de routage — Demande client en haut, trois branches vers Agenda / Équipe / CRM
- type: benefit_highlight
- blueprint: grid-card-assemble (Adapt)
- focal: the routing diagram — roles: cutout (foreground, aura dimmed ~15% behind it)
- asset_candidates:
- src: compositions/frames/04-routing.html
- voiceover: Chaque demande est bien orientée. Votre équipe garde toujours la main.

Adapt: keep the "N items self-assemble in a staggered cascade and hold" signature; the items are 3 destination nodes fed by self-drawing branch lines rather than tiles dropping into a grid.

Scene 1 (0.0–1.2s): "Demande client" node appears top-center — Centered, upper third, ~15% of frame.
Scene 2 (1.2–4.2s): three branch lines self-draw (`svg-path-draw`) sequentially left→right toward Agenda / Équipe / CRM; each destination node spring-pops in (`spring-pop-entrance`) as its line completes — staggered cascade, not simultaneous. Triptych layout, 3 depth layers (lines behind nodes behind labels).
Scene 3 (4.2–6.0s): legend resolves beneath the diagram, per-word staggered reveal: « Une demande bien orientée. Votre équipe garde la main. » — held read to the frame's exit.

## Frame 5 — Votre métier. Vos règles. Votre agent.

- status: animated
- duration: 4s
- transition_in: crossfade
- scene: Triptyque kinetic typography plein écran, un mot-clé à la fois sur fond aura plus saturé
- type: benefit_highlight
- blueprint: kinetic-type-beats (Reproduce)
- focal: the three-word relay itself — roles: cutout (foreground, full-bleed aura-saturated background)
- asset_candidates:
- src: compositions/frames/05-triptych.html
- voiceover: Votre métier. Vos règles. Votre agent.

Reproduce: the "centered beat triptych" slot maps cleanly onto the three phrases; each beat keeps its own pill chip (the secondary/violet accent is allowed here per Video direction).

Scene 1 (0.0–1.3s): « Votre métier. » spring-pops in centered on a violet-tinted pill chip (`spring-pop-entrance`, smooth settle) — Centered, ~35% of frame, aura behind at full saturation (the one frame besides 1/6 allowed it, per its own "beat triptych" signature).
Scene 2 (1.3–1.5s): the beat exits via swipe-up (`scale-swap-transition`, velocity-matched — `cut-catalog.md`) as « Vos règles. » enters the same center on the same move.
Scene 3 (2.6–2.8s): same handoff into « Votre agent. », held to the frame's exit.

## Frame 6 — Découvrez votre futur agent vocal

- status: animated
- duration: 3s
- transition_in: crossfade
- scene: Wordmark VoiceCore reformé (symétrie avec le frame 1), bouton CTA pill dégradé bleu→violet
- type: cta
- blueprint: titlecard-reveal (Reproduce)
- focal: the wordmark + CTA lockup — roles: cutout (foreground), aura (full-bleed background, mirrors Frame 1)
- asset_candidates:
- src: compositions/frames/06-outro.html
- voiceover: Découvrez votre futur agent vocal, VoiceCore.

Reproduce: the "logo build → centered CTA" closing lockup maps directly — mirrors Frame 1's reveal mask for a deliberate bookend.

Scene 1 (0.0–1.0s): full-bleed `aura` gradient at full strength (mirrors Frame 1 Scene 1) — the wordmark resolves center via the same reveal-mask wipe (`svg-path-draw`).
Scene 2 (1.0–3.0s): CTA pill spring-pops beneath it (`spring-pop-entrance`, smooth, blue→violet gradient fill): « Découvrez votre futur agent vocal » — Centered, ~30% of frame. Held final read — the second deliberate breather beat — with only a subtle jitter (`sine-wave-loop`, low amplitude) on the aura glow keeping it alive. This is the film's only true exit (no harness transition follows).
