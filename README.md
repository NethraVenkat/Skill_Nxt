# VentureCraft

VentureCraft is a free, open learning platform where anyone can learn how startups work by running a pretend company. No login or sign-up is needed — progress is saved on the learner's device and can be downloaded as a file.

**Look and feel:** the original cinematic artwork backgrounds (observatory, studio, laboratory, validation, arena) with bright, colourful glass cards on top. Every lesson is written in simple words with everyday Indian examples, Nova as a friendly guide, and a Word Book that explains every business word.

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment template if you are working on the optional Supabase/admin integrations:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in the optional values from Supabase and your local Vercel/site settings.
4. Run the app:
   ```bash
   npm run dev
   ```

## Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Common commands

```bash
npm run build
npm run lint
npm run typecheck
npm run test
npm run test:e2e
```

## Database migrations

```bash
npx supabase db push --include-all
```

## Deployment

This app is prepared for Vercel deployment. Use the environment values above in the project settings and deploy from the repository root.

## Open learning model

Learners enter through `/onboarding` and can use every learning route without an account. Their name, venture idea, lesson progress, simulator state, lab results, reflections, mission drafts, badges, streak, and company state are stored in the versioned `venturecraft:v1` local progress store. The learner menu includes JSON download/upload, name editing, progress reset, and a colourful dark-mode option.

## Where things live

- `components/scene-background.tsx` — the cinematic artwork backgrounds (and which page uses which picture).
- `app/globals.css` — colours, glass cards, the coloured learning boxes, confetti.
- `content/lessons/*.ts` — the lessons. Each screen can have `nova`, `simple` ("In simple words"), `example`, `remember` and `learned`. Wrap a business word as `[[runway]]` or `[[runway|how long your money lasts]]` to show a tooltip.
- `lib/glossary.ts` — the Word Book (simple meanings + examples).
- `lib/modules.ts` — the 9 modules, their simple descriptions and colours.

## Writing rules for new content

Short sentences. Everyday words. An Indian example first (chai stall, canteen, tuition, tiffin), then the idea. Explain every business word the first time, and end each lesson with one "Remember this" line.
