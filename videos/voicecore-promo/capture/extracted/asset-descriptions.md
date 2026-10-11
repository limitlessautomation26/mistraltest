# Asset inventory

No-capture path — the source is a local static copy of the VoiceCore site provided by the user (not a live URL), so no crawl was run and no image/logo files were captured.

No usable image, icon, or logo assets are available. Every visual frame is built from text + the CSS tokens in `tokens.json` (colors, Satoshi font) plus the coded UI elements named in the brief:

- Call card with an animated waveform and two conversation bubbles — drawn/coded, not an image.
- Mini calendar grid (5-day view, highlighted slot) — drawn/coded.
- Routing diagram (client request → Agenda / Équipe / CRM) — drawn/coded, likely SVG.
- VoiceCore wordmark — typeset in Satoshi, not a logo file; no logo asset was supplied.

Frame workers should treat every `asset_candidates` entry in `STORYBOARD.md` as "none — build from tokens," never reference a missing file path.
