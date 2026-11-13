# Design System

## Visual direction

Dark-first, cinematic, premium, and readable: Venture HQ should feel like a calm mission-control room rather than a casino or a science-fiction dashboard. Bright colour is reserved for meaning: positive learning movement, warnings, errors, and active decisions.

## Colour tokens

| Token | Hex | Use | Contrast requirement |
|---|---|---|---|
| `ink-950` | `#071018` | App background | N/A |
| `ink-900` | `#0B1722` | Sidebar and panels | N/A |
| `ink-800` | `#132433` | Cards and inputs | N/A |
| `ink-700` | `#1D3548` | Borders and chart grid | N/A |
| `text-primary` | `#F4F8FA` | Body and headings | ≥7:1 on ink-950 |
| `text-secondary` | `#B6C7D1` | Supporting text | ≥4.5:1 on ink-900 |
| `text-muted` | `#8299A6` | Metadata only | ≥4.5:1 at 14px |
| `cyan-action` | `#55D6E8` | Primary action and focus | ≥4.5:1 on ink-950 |
| `mint-positive` | `#66E0A3` | Improvement and accepted proof | Pair with icon/text |
| `amber-warning` | `#FFC857` | Risk and review due | Pair with icon/text |
| `coral-error` | `#FF786E` | Failure and validation | Pair with icon/text |
| `violet-insight` | `#B99CFF` | Insight and AI practice | Pair with label |

Never communicate status by colour alone. Use text, icon, and chart pattern. Provide a light-theme option only after dark-theme contrast is verified.

## Typography

Use `Inter` or a system sans stack for UI and `Space Grotesk` or system sans for display headings. Numbers use tabular numerals.

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

