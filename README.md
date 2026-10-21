# Math Garden

An individual Math Practice assignment project for children ages 7–12. React, React Router and Vite power arithmetic flashcards, self-reported results, related-question review, mastery, statistics and browser-local persistence. No backend, account, ads or analytics.

## Current verification status

**The core logic is tested. The application is not yet release-verified.**

- 39 dependency-free Node tests pass. They include 16,000 generated arithmetic questions, 1,600 related questions, storage recovery, mastery, and a 5,000-attempt history.
- Component/integration tests are supplied but have not run because dependency installation was blocked by DNS/network restrictions in the development environment.
- Production build, browser accessibility/responsive checks and public deployment are pending.
- Git is initialized with separate development commits. A student-owned GitHub remote is still needed.

## Run locally

Install Node.js 22 or newer. Open a terminal in this folder:

```powershell
npm install
npm run dev
```

Open the local address Vite prints, normally `http://127.0.0.1:5173`. Use that exact server when testing so stale servers do not show old code. After the first successful install, commit the generated `package-lock.json`.

## Tests and build

```powershell
npm run test:core
npm test
npm run lint
npm run format
npm run build
npm run preview
```

The production output is `dist/`. `npm run test:core` needs only Node.js and can run before installing dependencies. The browser interface tests use Vitest, jsdom and React Testing Library. No TypeScript build step is required: the specification permits JavaScript. `src/types.ts` documents the shared models.

## Behavior

Select operations, one of four levels, and 5/10/20/continuous questions. Choose one of four answers, flip, and mark **I Got It Right** or **I Got It Wrong**. Self-report determines the recorded result, as the specification requests. Selecting or flipping alone never changes statistics. Number keys 1–4 select choices; normal Tab, Enter and Space operate controls.

Incorrect self-reports immediately create or update a mistake pattern. Review draws related facts using nearby operands, reversed addition/multiplication and valid inverse fact families, constrained to selected operations and each mistake's original difficulty. Repeated/recent mistakes with fewer successful reviews receive higher weight. Three successful reviews master a pattern by default; Settings allows 1–10. A new mistake resets mastery. A review session ends early if all its eligible patterns become mastered.

Every result and the next card are saved together under `math-garden-v1`. Settings, attempts, completed sessions, mistakes and the current session persist. There is no device synchronization. Storage failure gives a warning and permits continued use in memory. Corrupt categories are recovered independently. Versions 0/missing migrate through the current validators; unsupported future versions are rejected rather than interpreted.

Statistics derive from saved attempts rather than a second mutable aggregate. Recent session display is limited to 20; detailed attempts remain available. Reset Statistics clears history and mistakes while keeping settings; Clear All restores everything to defaults. Both require an in-app confirmation. Export Progress downloads a JSON snapshot; importing a backup is outside the assignment scope.

## Structure

| File | Purpose |
| --- | --- |
| `src/core.js` | Generation, difficulty validation, related facts, weighting, mastery, statistics and persistence |
| `src/App.jsx` | Context, navigation, home, configuration, cards, sessions, summary and dialogs |
| `src/Statistics.jsx` | Lazy-loaded overall, operation, difficulty, mistake and recent-session views |
| `src/Settings.jsx` | Lazy-loaded preferences, defaults, export and clear controls |
| `src/styles.css` | Responsive garden design, focus styles and reduced-motion support |
| `tests/` | Runnable core tests and pending interface tests |
| `specification.md` | Supplied instructor software specification |
| `INSTRUCTOR_TODO.md` | Original supplied checklist, preserved unchanged |
| `TODO.md` | Honest project completion and verification status |
| `docs/` | Development report draft, interaction evidence and manual test plan |

## GitHub delivery

Create an empty repository in your GitHub account, then run these commands after substituting its real URL:

```powershell
git remote add github https://github.com/YOUR-USERNAME/math-garden.git
git push -u github HEAD:main
```

Use `github` so it does not conflict with any hosting remote. The assignment needs your own GitHub repository URL; a local Git repository or hosting source mirror does not replace it. To retain the existing commits when moving this project, use the included Git bundle rather than GitHub's file-upload screen:

```powershell
git clone math-garden-history.bundle math-garden-with-history
```

## Netlify delivery

Connect the GitHub repository to Netlify. Use the repository root as the base, `npm run build` as the build command, and `dist` as the publish directory. `netlify.toml` and `public/_redirects` include the SPA fallback so direct navigation and refresh on `/practice/setup`, `/practice/session`, `/practice/summary`, `/statistics` and `/settings` return the app. Test a full session, refresh recovery and mistake review on the public origin; local progress will not transfer to the new origin.

## Submission

Submit your GitHub URL, verified public app URL, reviewed development report and conversation evidence to HuskyCT. `docs/development-report.html` is a three-page print layout; open it and print to PDF if your course requires PDF. Review the reflection and update the pending verification/deployment sections after the release checks. Do not submit the instructor's example transcript as evidence of your own development.
