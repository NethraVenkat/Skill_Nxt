# Phase 1 Foundation Implementation Plan

## Scope

This phase establishes the Next.js App Router foundation and developer tooling only. Authentication, Supabase migrations, onboarding, dashboard data fetching, and the final design-system component gallery will be implemented in their named checkpoints after this plan is approved by validation.

## Order of work

1. Replace the Vite entrypoint with a strict TypeScript Next.js App Router foundation.
2. Add the documented folder structure for `app`, `components`, `lib`, `content`, and simulator extension points.
3. Configure Tailwind and central CSS variables for the Phase 0 design tokens.
4. Add environment-variable templates and safe validation helpers without real secrets.
5. Add ESLint, Prettier, Vitest, and Playwright scripts/configuration.
6. Add a minimal accessible root page and shared metadata so the foundation builds cleanly.
7. Run `npm run build`, `npm run lint`, `npm run typecheck`, and `npm run test`.

## Files and directories to create

- `app/` — App Router root layout, global styles, and foundation page.
- `components/` — reserved for reusable UI and navigation in Checkpoint 2.
- `lib/` — environment and pure foundation helpers.
- `content/` — reserved for curriculum content in later phases.
- `simulator/` — typed extension point for Phase 2’s pure engine.
- `tests/` — Vitest setup and foundation tests.
- `e2e/` — Playwright configuration and later browser tests.
- `supabase/` — reserved for Checkpoint 3 migrations.
- `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `next.config.ts`, `.env.example`, `.prettierrc.json`, and test configuration files.

## Assumptions

- The existing Vite/React prototype remains in `src/` during Checkpoint 1 so its assets and lesson work are not deleted; later checkpoints can migrate or retire it deliberately.
- Next.js is the application entrypoint after this checkpoint, and Vercel will build it with the `next build` script.
- Supabase environment variables are represented only by placeholders; no credentials are created or committed.
- Tailwind’s CSS variables are the source of truth for the documented tokens, with a dark theme first and system fonts until a font package is deliberately selected.
- The current repository uses npm and Node 20 or newer, consistent with the existing engine declaration.

## Checkpoint 1 completion criteria

- `npm run build` passes.
- `npm run lint` passes with zero errors.
- `npm run typecheck` passes with zero errors.
- `npm run test` passes.
- `npm run test:e2e` has a valid Playwright command/configuration for the foundation route.
