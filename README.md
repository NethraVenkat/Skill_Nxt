# Echo Live! — One lesson, three teaching routes

The cinematic homepage leads to a chooser with three complete eighteen-screen teaching routes. They all teach the same Grade 4 Module 4, Class 1 PDF lesson: Translating Notes into Speech. The Space Theatre artwork, fixed-screen layout, and slim 52px desktop / 48px phone footer remain.

## Run

Double-click **Start Echo Live.cmd**, then open **http://127.0.0.1:5400/**. Leave the launcher open while using the app. `npm run build` creates `dist`; `npm test` runs the seven data/content checks. Use an HTTP server rather than opening dist/index.html directly.

## The three routes

- **Echo’s Director Studio:** explicit teacher demonstration, visible models, guided note writing, then independent explanation.
- **Message Detectives:** compare deliveries, identify evidence, distinguish a cue from a script, select three memory reminders, then explain the message to a listener.
- **Buddy Broadcast:** perform speaker and coach roles, build one reminder at a time, switch roles, then present independently.

These are different teaching methods for the SAME period. They do not introduce different subjects or substitute invention, mystery-object, or opening lessons for the supplied lesson.

## Content and timing contract

All routes use the same dog paragraph, cat facts and three-note example, butterfly model, three-note technique, partner rounds, volunteer showcase and recap. The butterfly demonstration retains the previously corrected chrysalis wording. Class 2 is teased as Making a Great Opening; it is not taught in place of Class 1.

The core timing remains 2 + 1 + 3 + 4 + 3 + 5 + 6 + 4 + 2 = 30 minutes. Five additional minutes cover settling, transitions and reflection. Adjacent screen labels share the timing of their activity block; they are not separate durations to add. The partner block has two approximately one-minute talks plus setup, feedback and a short repeat. The four-minute showcase invites two volunteers; stage opportunities rotate in later sessions.

All canonical material is in src/shared-lesson.js. Routes are linked to the same lesson ID and shared material, preventing independent topic rewrites.

## Classroom use

1. Enter the show from the homepage and choose a teaching route.
2. Teacher Desk manages presenter profiles, private observations and stage opportunities. Choose the active presenter at the top.
3. Explain the same lesson through the selected route. Students may use paper cards on a shared projector.
4. Students speak with real partners, switch roles, and discuss one helpful comment. Record an attempt only for the selected presenter who actually spoke.
5. Save the first attempt after feedback; save a second after the actual repeat. Duplicate saves in the same visit are disabled.
6. Offer optional buddy or teacher support for stage turns. Save a turn only after completion.
7. Finish with the four original recap principles and a personal next goal. Route completion does not claim confidence improvement or add a speaking record.

Model audio uses browser speech synthesis. Teachers can perform the visible examples when audio is unavailable. Print cards from the reminder-building screen.

Ask Echo is available on every activity screen. It opens page-specific voice guidance, a speaking challenge with a revealable model, and a knowledge check with immediate retry feedback. These optional supports use the existing lesson content; teachers can choose them within the activity's allocated time. Escape closes the panel and returns keyboard focus to Echo. There are no quiz points or automated voice scores.

Every screen now opens in Play & practise: an inline mission with reveal cards, delivery comparison, step sequencing, note matching, role rehearsal or a reflection choice. Lesson & notes retains the complete original teaching route and its editable fields. On observation screens this tab is labelled Lesson & save attempt. Matching all three dog reminders builds the notes used in later rehearsal; students can edit them in Lesson & notes. Use these missions inside the existing activity block rather than adding extra lesson time. Completing a click-based mission does not create a speaking record.

## Data

This version stores records under echo-live-shared-lesson-v2. Earlier application storage remains untouched under its previous keys. Earlier records are not automatically relabelled as one of these equivalent teaching methods. Current backups include a version and lesson ID; incompatible-period backups are rejected.

Profiles, notes, route position, saved attempts and completed routes persist locally. Unsaved partner feedback and rehearsal setup are temporary. Different browsers and server addresses have separate storage. Teacher Desk has no login or role lock; use a teacher-controlled device. Export backups before clearing browser storage. No recording, microphone access, cloud syncing or automated confidence grading is included.

## Verification

Seven tests verify backup integrity, bounded fields, participation counts, deduplication, shared curriculum, the original timing, and eighteen distinct companion checks. All eighteen screens in each route were traversed at a 320 × 568 viewport with the page character present. Companion model reveal, answer feedback and keyboard closing were checked in the browser. Detective memory-cue selection, buddy note construction, first-attempt saving and second-attempt saving were checked in the browser. Production compilation passes.
