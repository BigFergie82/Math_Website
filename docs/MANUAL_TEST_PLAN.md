# Release verification plan

Status: **Pending execution**. This file is a test plan, not a claim that browser checks passed.

## Functional pass

1. Open Home, Practice, Statistics and Settings with the keyboard. Verify visible focus and working routes. Open an unknown route and return home.
2. Deselect all operations; Start Session must be disabled with a useful message. Re-enable each operation and change all four levels and session lengths. Save defaults and verify setup uses them; per-session choices must not overwrite defaults.
3. Run a five-question addition session. Choose an answer, change it, flip, and self-report. Confirm nothing is counted before self-report, revealed choices cannot change, and one self-report advances exactly once.
4. Repeat with mixed operations and a 20-question session. Compare summary totals with the actual self-reports. End a continuous session and verify its summary.
5. Intentionally mark a question wrong. Confirm Practice Mistakes is enabled immediately on summary. Start review and verify related questions have a valid original pattern ID. Three successful reviews should master the pattern. If all selected patterns are mastered, review should finish early.
6. Refresh before selection, after selection and after flipping. The current card, choice and reveal state should restore. Refresh after a self-report; an old recorded card must not reappear or count twice.
7. Attempt to leave via navigation and browser Back. Cancel should keep the session. Confirm should preserve completed answers, end the session and navigate. Close/reload warnings should stop after completion.
8. Verify overall, operation, difficulty and review statistics, the most frequently missed facts, and newest-first session history. A zero-attempt profile must not divide by zero.
9. Toggle sound, explanations, animations and encouragement independently. Sound should play after both right and wrong reports when enabled. Feedback should remain visible until the next result. Test without browser audio support.
10. Export progress. Cancel both reset dialogs and check nothing changed. Confirm Reset Statistics: history/mistakes clear, settings stay. Confirm Clear All: defaults restore and Home appears. Use a disposable profile for these tests.

## Accessibility and responsive pass

- Complete a session with keyboard only, including keys 1–4 and Tab/Enter/Space.
- Verify question/reveal announcements with a screen reader and dialog focus/cancel behavior.
- Check desktop, 768px portrait tablet, tablet landscape, 390px and 320px widths, 200% browser zoom and larger system text. Confirm no clipped values or horizontal overflow.
- Enable reduced motion and disable animation; both must reveal answers without movement.
- Run an automated accessibility checker, inspect contrast and resolve confirmed issues. Color must not be the only selected/result signal.
- Test Chrome, Edge, Firefox and Safari where available. Do not mark unavailable browsers as passed.

## Production pass

- Install dependencies, run core and interface tests, lint/format, build and serve the production output.
- Inspect console and network errors; record actual bundle sizes and any limitations.
- Deploy publicly. Open every route directly and refresh it. Test persisted state on that public origin.
- Confirm the app collects no personal information and does not send progress to a server.
- Add final GitHub/public URLs to the report and submission checklist.
