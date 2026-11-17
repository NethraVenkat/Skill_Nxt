# Design System

## Visual direction

Light-first, bright, friendly, and premium: VentureCraft should feel like a modern learning studio with Duolingo energy and Notion clarity. The default canvas is warm cream with white cards, coloured module accents, and soft gradients. Dark mode remains available as a deep indigo variation, never black.

## Colour tokens

| Token | Hex | Use | Contrast requirement |
|---|---|---|---|
| Token | Hex | Use | Contrast requirement |
|---|---|---|---|
| `bg` | `#FFF8F0` | Warm app background | N/A |
| `surface` | `#FFFFFF` | Sidebar, cards, and inputs | N/A |
| `tint` | `#F7F4FF` | Soft tinted surfaces | N/A |
| `text` | `#1E1B3A` | Body and headings | ≥7:1 on bg |
| `text-secondary` | `#514C72` | Supporting text | ≥4.5:1 on surface |
| `text-muted` | `#7A7599` | Metadata only | ≥4.5:1 at 14px |
| `primary` | `#6C4CF1` | Buttons, active navigation, focus | ≥4.5:1 on surface |
| `coral` | `#FF6B5B` | Problems and error accent | Pair with icon/text |
| `sunshine` | `#FFC53D` | Money and warnings | Use dark ink text |
| `mint` | `#1FBF8F` | Validation and success | Pair with icon/text |
| `sky` | `#2D9CFF` | Customers and discovery | Pair with icon/text |
| `pink` | `#FF5FA2` | Growth and momentum | Pair with icon/text |
| `orange` | `#FF8A3D` | MVP and making | Pair with icon/text |
| `teal` | `#14B8A6` | Funding | Pair with icon/text |
| `indigo` | `#4F46E5` | Scaling | Pair with icon/text |

Never communicate status by colour alone. Use text and icons alongside colour. Never use white text on sunshine; use dark ink instead.

## Typography

Use **Plus Jakarta Sans** for UI and **Bricolage Grotesque** for display headings. Numbers use tabular numerals.

| Token | Size / line height | Use |
|---|---|---|
| Display | 48/56 | Landing headline only |
| H1 | 36/44 | Screen title |
| H2 | 28/36 | Section title |
| H3 | 22/30 | Card/lesson heading |
| Body large | 18/28 | Challenge text |
| Body | 16/24 | Default |
| Small | 14/20 | Labels and help |
| Caption | 12/16 | Metadata, never essential meaning |

## Spacing and shape

Use a 4px base: `4, 8, 12, 16, 24, 32, 48, 64`. Cards use 16px padding on mobile and 24px on desktop. Border radius is 12px for cards, 8px for controls, and 999px only for status pills. Minimum touch target is 44×44px.

## Component inventory

- Buttons: primary, secondary, quiet, destructive, icon-only with tooltip.
- Navigation: desktop rail, mobile bottom bar, breadcrumbs, progress stepper.
- Cards: stat tile, lesson challenge, decision option, insight, mission, evidence, event.
- Inputs: text, currency, percentage, slider with numeric readout, select, tag editor, file dropzone.
- Feedback: toast for reversible confirmation, inline validation, recovery room, empty state, skeleton loader.
- Data: line chart, funnel, waterfall, progress ring, comparison table, customer avatar list.
- Modals: confirmation, evidence consent, AI privacy, rewind branch.
- Accessibility: focus ring, skip link, live region for consequence changes, reduced motion.

## Motion principles

Motion must explain a transition: cash counts down, a customer enters the funnel, or a weak spot becomes highlighted. Use 150–250ms for controls, 400–700ms for consequence sequences, and never autoplay a distracting loop. Respect `prefers-reduced-motion`: replace movement with instant state changes and a text summary. Do not animate loss in a way that feels punitive.

## Sound guidelines

Sound is off by default. Optional sounds include a quiet decision confirm, soft monthly tick, and gentle mission acceptance. Never use alarms for failure or a reward loop. Every sound has a mute control, no essential information is audio-only, and browser autoplay is never assumed.

