# chiar.dev roadmap

Status verified against local source on 2026-11-09. Completed means implemented in this repository, not deployed, exhaustively tested, or pedagogically approved. The initial documentation audit is complete. The user-authorized What is ICT? video prototype and About page are implemented locally; further lesson videos are not yet implemented.

## Implemented

- [x] Next.js App Router portfolio with global layout, responsive navigation, footer, metadata and dark/light theme.
- [x] Focused Home introduction with clear links to Projects, LearnBlog, About and Contact. Project details and planned work live on the dedicated Projects page.
- [x] Separate LearnBlog editorial landing page and /learn dashboard with searchable course cards, data-derived counts, real browser-local progress and quick learning actions.
- [x] Math from Zero: 18 searchable EN/DE guided lessons.
- [x] Discrete Mathematics: 78 searchable EN/DE guided lessons.
- [x] Guided lesson templates: concepts, worked examples, common mistakes, practice prompts, temporary notes, eight-question checks, feedback, retry, next/previous navigation and study checklist.
- [x] Interactive propositional-logic truth table and five-question quiz.
- [x] Eight additional standalone bilingual discrete mathematics lessons with quizzes.
- [x] ICT Systems & Network: 54 English/German written lessons with group filtering, search, lab prompts, self-tests and local completion tracking. Answer selection remains correct when switching languages.
- [x] Shared browser-local English/German preference across the site, plus ICT active/completed lesson storage and new guided math quiz-completion storage.
- [x] Binary numbers text lesson; this does not complete the animated prototype.
- [x] Local architecture/status/history documentation baseline.
- [x] What is ICT? prototype: 83.80-second 1080 × 1920 / 30 fps original blackboard animation, local neural narration, original background music, captions, transcript and first-lesson-only player. Replaced the Windows speech draft after user feedback; added sentence-aligned cues and rebalanced the audio mix. Lint, type/build and Chrome playback/navigation/mobile checks passed; subjective voice/pacing review remains open. See docs/lessons/what-is-ict.md.

- [x] Initial CV-style About implementation was reviewed and superseded by the user-approved current-work showcase. Verified CV facts remain reference material, not the active About design.

- [x] Public-showcase About prototype at /about/preview: small sharp portrait, current-work copy, original 18-second 1080p ambient loop, optional quiet instrumental music and independent motion/audio controls. Promoted to /about after user review; /about/preview now redirects.

## Existing but unfinished areas

- [x] Promoted the approved showcase to /about, removed preview labels and employer/history copy, and redirected the former preview URL.

These describe current product areas, not an assertion that someone is actively implementing them now.

- [x] Complete /projects with a searchable/filterable collection of three active and two planned projects, clear status and real destination links.
- [x] Complete /contact with the user-confirmed email/GitHub, copy-address action and clear mailto behavior; no automatic sending.
- [x] Resolve stale 39-lesson labels, remove unused duplicate catalogs and derive dashboard/course counts from current data.
- [ ] Review guided lesson depth, repeated questions, repeated ICT example text and accuracy. Do not claim official BFH/SIZ alignment or full exam readiness.
- [ ] Review light theme, mobile layouts, fixed-header spacing, keyboard interaction, language semantics, nested main landmarks and reduced-motion behavior in a browser.
- [ ] Decide appropriate invalid-slug handling and route-specific metadata.

## Next priorities proposed for review

1. Review the What is ICT? prototype's visuals, pacing, synthetic voice and music before extending the video format to other lessons.
2. Agree on the binary lesson teaching objective and create an original 60–90 second storyboard. Suggested scope: bits and place values, a decimal-to-binary worked example, then a short learner check. This sequence is a proposal, not an implemented lesson or approved script.
3. Implement the approved binary prototype using original visuals within the existing design; include accessible text, playback/replay and reduced-motion handling as appropriate. Choose the implementation only after storyboard review; no new route or animation architecture has been selected.
4. Correct catalog/count copy and reconcile duplicated course metadata with a small, explicitly approved change.
5. Review sample course lessons for educational substance before expanding the content bank; replace explanation-copy examples with worked scenarios.
6. Review the new page organization and course dashboard. Projects and Contact are implemented; the shared EN/DE behavior and progress flow have browser regression coverage.

- [x] Replace the starter README with current setup, architecture, routes, progress/language behavior, media generation and branch workflow.
- [ ] Complete the user-authorized initial publication to public chiarAbdi/chiar-dev with main and testing branches.

## Longer-term plans, not implemented

- [ ] Educational articles and a deliberate article organization/editorial workflow, if approved.
- [ ] Additional interactive explanations and animated visual lessons after the binary prototype is reviewed.
- [ ] IT Systems Lab project content and evidence of completed experiments.
- [ ] Private BFH Study Hub: course organization, lecture notes, exercises and progress; homepage currently shows a concept only.
- [ ] Consider durable local notes/quiz results if desired; define scope before changing persistence.
- [ ] Measure client bundles before deciding whether to split course data or client modules.
- [ ] Add targeted regression coverage for actual learning-state and navigation behavior when implementing related changes.

## Ongoing development rules

Preserve the current designs, content and functionality. Explain significant architecture choices. Prefer complete replacement files for approved implementation work. Update this roadmap and CHANGELOG.md after every future development task, with evidence and verification. Never invent completion or historical dates.

Everything stays local. A GitHub push, deployment or remote repository update requires explicit permission for that action. No remote publication is scheduled or implied by this roadmap.
