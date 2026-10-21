# Math Garden implementation checklist

The original instructor checklist is preserved in INSTRUCTOR_TODO.md. This project-specific checklist groups its phases into milestones. Checked source items do not mean their browser verification has passed. JavaScript is used as explicitly permitted by the supplied specification.

## Phase 1 Foundation and question engine
- [x] Create independent project and Git repository
- [x] Support four operations and four difficulty levels
- [x] Generate four unique multiple-choice answers
- [x] Separate question generation, progress and persistence logic

## Phase 2 Interface and practice
- [x] Child-friendly responsive page and navigation source
- [x] Configure operations, difficulty and session length
- [x] Answer selection, reveal and self-assessment source
- [x] Session summaries and refresh recovery source
- [x] Navigation protection, keyboard controls and reduced-motion source

## Phase 3 Review and statistics
- [x] Save mistakes immediately and generate related nearby, reversed and inverse facts
- [x] Weighted review, configurable mastery and resets on new mistakes
- [x] Statistics, session history and saved settings source
- [x] 39 core tests pass, including 16,000 generated questions and 5,000-attempt history
- [x] Corrupt category isolation, storage round trip and failure tests pass
- [x] Component and integration test source supplied
- [ ] Execute component/integration tests after dependency installation
- [ ] Complete browser, keyboard, screen-reader, contrast, zoom and responsive checks
- [ ] Verify sound and animation preferences in a browser
- [ ] Test Chrome, Edge, Firefox and Safari where available
- [ ] Measure production bundle size and slower-device performance

## Phase 4 Submission
- [x] Development report draft and current-session AI interaction evidence
- [x] README, manual test plan, Netlify configuration and routing fallback
- [x] Source archive and Git bundle prepared at handoff
- [ ] Install dependencies and commit generated package-lock.json
- [ ] Run lint/format checks and production build
- [ ] Test production output locally
- [ ] Public deployment verified
- [ ] Push to the student's GitHub repository
- [x] Reconcile source implementation with supplied instructor specification and checklist
- [ ] Student reviews report and adds personal observations

Network restrictions blocked npm installation and Git source publishing. Browser access to the local report server also timed out. The project is not yet submission-ready; do not treat source inspection as release verification.
