---
workflow: product-launch-video
flow: automation
storyboard: no
message: "VoiceCore répond à vos appels pendant que vous travaillez."
destination: tiktok
aspect: 1080x1920
language: fr
length: 30s
angle: pain-point-to-solution
---

## Intent

VoiceCore est un agent vocal IA qui répond aux appels téléphoniques pour des
commerçants (restaurants, garages, cabinets, immobilier) : accueil, prise de
rendez-vous, routage vers agenda/équipe/CRM. Ton confiant et chaleureux, pas
corporate. Format vertical pour TikTok / Reels / Shorts.

## Assets

- /root/.claude/uploads/c0297a21-c9fe-58d9-bf99-55aa6184e674/3e6cfa59-VoiceCore-HTML-CSS-motion-design.html — copie autonome du site vitrine VoiceCore (HTML/CSS/JS + police Satoshi intégrée en base64). Référence de marque uniquement : palette, dégradé aura, cartes 28px, boutons pill. Ne représente pas un tableau de bord connecté — tout contenu d'appel/calendrier y est illustratif.

## Customizations

- Storyboard déjà approuvé par l'utilisateur dans un document séparé (6 plans) — voir détail sous Notes. Recomposer chaque plan au cadrage vertical 1080x1920 ; ne pas recadrer le 16:9 original.
- Caméra virtuelle mesurée (dérive d'échelle 5–8 % par plan, jamais de pan brusque).
- Continuité des formes entre les plans (morph / FLIP), jamais de cut sec.
- Masques de révélation (clip-path) pour le texte et le logo, pas de simple fondu.
- Pas de voix off — typographie cinétique uniquement, pacée sur une musique si pertinent.
- Aucune donnée client réelle dans l'appel, le calendrier ou le routage.

## Notes

Storyboard validé (6 plans, 900 frames @ 30 im/s en 1920x1080 ; adapter au cadrage vertical sans recadrer) :

1. 0–4 s — logo VoiceCore + accroche « Vous faites votre métier. Votre IA prend les appels. »
2. 4–11 s — call-card (appel entrant, waveform animée, 2 bulles de conversation : client demande une réservation de table, l'agent IA propose un créneau). Label « Exemple de scénario ».
3. 11–17 s — mini-calendar (grille 5 jours LUN–VEN, créneau surligné) → « Créneau confirmé · Exemple · 10 h 30 ».
4. 17–23 s — diagramme de routage : Demande client → Agenda / Équipe / CRM. Légende « Une demande bien orientée. Votre équipe garde la main. »
5. 23–27 s — triptyque kinetic typography : « Votre métier. » → « Vos règles. » → « Votre agent. »
6. 27–30 s — logo + CTA pill « Découvrez votre futur agent vocal »

Palette : `#2860E1` (bleu), `#B343F2` (violet), `#0F0E15` (encre), `#FFFFFF`, `#F3F3F7`. Dégradé `--aura` : radial rose `#eed9fb` → lavande `#b29bf0` → bleu `#3e5fe2`/`#2860e1`. Police Satoshi (fichiers embarqués dans le fichier source, à extraire). Rayon de carte 28 px. Boutons pill, remplissage dégradé bleu→violet.
