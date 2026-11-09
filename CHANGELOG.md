# Changelog

Only verified local development is recorded here. Repository version is 0.1.0; no release/tag/publication is inferred. Dates below use Europe/Zurich. Current Git history contains two commits; it does not establish a detailed chronology before the aggregate implementation commit.

## Unreleased

### 2026-11-09 — Site organization, shared languages and learning dashboard

- Reorganized Home into a concise introduction; implemented separate searchable Projects, LearnBlog discovery, learning-dashboard and Contact pages. Preserved the approved About design and all lesson URLs. Planned software remains clearly labeled.
- Added one persistent English/German switch for navigation, page content, About controls and written lessons. Reused the academy preference and updated html lang. Added German text for all 54 ICT lessons and the ICT companion text; the existing narration remains English.
- Replaced duplicated/stale catalog copy with server-derived summaries for 18 foundational math, 78 discrete mathematics and 54 ICT lessons. Removed unused legacy landing/catalog components and stale module descriptors.
- Added browser-local guided math completion on quiz finish. Dashboard statistics combine validated math completion IDs with the existing ICT record, rejecting invalid indices and duplicate entries. No points, streaks or mastery claims are invented.
- Kept ICT answers stable across language changes, preserved local completion, moved unchanged English ICT data into JSON, and corrected lesson/header spacing.
- Added the user-confirmed public email and GitHub, with mailto/copy controls and no automatic sending.
- Rewrote README with actual features, setup, routes, storage behavior, local media tooling and the main/testing workflow. Removed stale starter text and unnecessary comments; preserved meaningful framework instructions and technical disclosures.
- Excluded local tooling/model caches, duplicate reference archives/reports and private CV notes from Git. Public source, documentation, portrait and finished media are included.

Validation: the complete EN/DE navigation, course progress, quiz persistence and 320/390px browser regression passed without page errors. Final lint, TypeScript and production build passed. Production-mode smoke tests passed for seven main routes, language switching, About music and the legacy preview redirect, with no browser errors. Initial GitHub publication is recorded separately after pushing.


### 2026-11-09 — Showcase promoted to the main About page

- Replaced /about with the reviewed current-work showcase after the user reported that the normal route still showed the prior version. The previous design had intentionally remained at the main route during prototype review; this was routing, not an old development server.
- Removed prototype labels, the link back to the earlier About, and preview-only noindex metadata. Updated the About title/description to reflect the active showcase.
- Redirected /about/preview to /about, keeping one authoritative page and preserving old preview links. The small portrait and independent ambient music/motion controls are unchanged.
- Updated persistent instructions, architecture notes and roadmap. No commit, push or deployment.

Validation: lint, TypeScript and production build passed. Chrome verified that the header About link opens the showcase, /about/preview redirects correctly, CV/prototype copy is absent, metadata is appropriate for the main page, the portrait remains small, media defaults remain quiet, and the 390px layout has no horizontal overflow. No browser page errors. The existing parent lockfile warning remains.


### 2026-11-09 — Public-showcase About prototype (uncommitted)

- Added /about/preview as a separate review route after the user requested a smaller portrait and a current-work showcase instead of a CV. Left /about and global navigation unchanged pending approval. Prototype is marked noindex/nofollow; this is not authentication or a privacy boundary.
- Focused copy on chiar.dev, LearnBlog, QR Studio and current learning. Removed employment history, employer names and CV-style sections from the prototype. Portrait displays at 112px desktop / 96px mobile with responsive optimized source selection.
- Authored a local 18-second 1920 × 1080 / 30 fps H.264 background loop with restrained chalk-style software/learning diagrams and original quiet instrumental music; no narration. Added a local reproducible FFmpeg/Sharp renderer.
- Separated opt-in audio from video playback so reduced-motion users can enable music without starting animation. Added motion pause/play and music on/off controls; default music is off. Existing theme/layout components are reused, with no new app runtime dependency.
- Updated persistent About direction, roadmap, architecture and prototype notes. Nothing was committed, pushed or deployed.

Validation: lint, TypeScript and production build passed. Chrome checks passed for muted initial animation, opt-in music, independent music/motion controls, reduced-motion behavior (including music enabled), 112px/96px portrait sizing, high-density image source, current-work copy, unchanged original About, light theme, anchor navigation and no mobile horizontal overflow at 390px. Desktop/mobile screenshots were inspected. Media metadata confirmed 18 seconds, 1080p/30 fps and H.264/AAC; video is approximately 0.95 MB. The existing parent lockfile warning remains.


### 2026-11-09 — About page and IT background (uncommitted)

- Replaced the About placeholder with a server-rendered page using the supplied CV and existing project context. Added verified professional history, grouped technical skills, IT education, current projects, volunteering and languages. This initial CV-style version was subsequently replaced by the public showcase.
- Clearly marked BFH studies as interrupted/not completed and CS50 as coursework; made no certificate, completed-degree or current-enrolment claims. Excluded unrelated/non-IT history and private contact details. Did not add the CV's conflicting GitHub handle.
- Added the user-supplied portrait as an optimized 1100px WebP (approximately 166 KB), displayed through next/image with responsive sizes, reserved dimensions, blur placeholder and early loading. The original photo and CV remain untouched in Downloads; the CV is not publicly served.
- Reused existing theme tokens, cards, typography and shared navigation. Added About metadata, section landmarks and an experience anchor. No new runtime dependency, global design change, commit, push or deployment.
- Updated ROADMAP.md and PROJECT.md; recorded content provenance in docs/about-content.md.

Validation: lint and TypeScript passed. Chrome checks passed for portrait loading, title, experience/education labels, omission of private details, section navigation, dark/light themes, mobile navigation and no horizontal overflow at 390px. Desktop, light-theme and mobile screenshots were inspected; no browser page errors. Production build passed; the existing ignored parent-directory lockfile warning remains.


### 2026-11-09 — Neural narration and HD quality revision (uncommitted)

- Replaced the Windows speech draft after user feedback with local neural narration (Kokoro, af_heart, normal reading pace). The voice remains synthetic.
- Re-rendered the same original lesson at 1080 × 1920, 30 fps and higher visual/audio encoding quality; current duration is 83.80 seconds.
- Added sentence-aligned captions and selected diagram reveals, reduced music volume and added loudness/peak control. Increased desktop player size and versioned media URLs to prevent old-audio cache reuse.
- Added isolated Python setup with verified model hashes and reproducible local neural narration. Package/model downloads stay under ignored .local/; no lesson text/audio was uploaded and no app runtime dependencies were added.
- Updated the storyboard, architecture, instructions and roadmap. No commit, push or deployment was performed.

Validation: local neural setup and model checksums verified. Lint, TypeScript and production build passed. ffprobe confirmed 83.80 seconds, 1080 × 1920, 30 fps, H.264/AAC and a 4.5 MB file. Audio analysis reported a -2.0 dB peak with no clipping in source narration. All 26 sentence cues passed monotonic/duration checks. Chrome regression checks passed for playback with decoded audio, pause/seek, transcript, captions, byte-range serving, lesson-specific visibility, completion persistence and mobile fit. Desktop/mobile screenshots were inspected. Voice naturalness remains a subjective user review; no recorded human voice is claimed.


### 2026-11-09 — What is ICT? video prototype (uncommitted)

- Added an 88.79-second original blackboard animation to the first ICT lesson, following the user-selected reference format and current lesson content. This immediate ICT prototype supersedes the earlier choice of binary numbers; the binary animation remains planned.
- Added local synthetic English narration, an original quiet instrumental bed, burned-in captions, WebVTT captions/chapters, poster, expandable transcript and MP4 download.
- Used a native video player with user-initiated playback; other lessons unmount it. Existing course text, answers, navigation and progress storage remain unchanged.
- Added reproducible local rendering/narration tools, narration JSON and a teaching storyboard. Ignored local render/browser scratch files in Git and ESLint. No app runtime dependencies were added.
- Updated AGENTS.md, PROJECT.md and ROADMAP.md for the authorized scope and actual status. No commit, remote push or deployment was performed.

Validation: media metadata confirmed H.264/AAC, 720 × 1280 and 88.79 seconds. Chrome checks passed for playback with decoded audio, pause/seek, transcript, local captions, HTTP range requests, lesson visibility, completion persistence and 390px mobile overflow. Desktop/mobile screenshots were inspected. Lint, TypeScript and production build passed for the first prototype. Subjective audio quality and exact subtitle timing still need user review.


### 2026-11-09 — Documentation baseline (uncommitted)

- Updated AGENTS.md with local-only authorization rules, IT/software/CS scope, preservation requirements, documentation workflow and binary visual lesson requirements; retained the generated Next.js instructions.
- Created PROJECT.md with directory, route, component, dependency, storage and feature inventories, plus verified limitations and source-level technical concerns.
- Created ROADMAP.md distinguishing implemented features, unfinished areas, proposed priorities and longer-term plans.
- Created this changelog from the available Git history, without assigning invented dates to individual features.
- Recorded the first animated binary lesson as planned: original visuals and a 60–90 second teaching storyboard. Existing binary content is textual, not an animated prototype.
- Application source and configuration were not changed by this documentation task. No commit, push, deployment or remote update was performed. Existing untracked archive and inspection report were preserved.

Validation: npm run lint passed; npx tsc --noEmit --incremental false passed; npm run build passed, generating the current route set. The build reports an ignored parent D:/Projects/package-lock.json warning. Guided data inspection found 18 zero + 78 discrete lessons, eight question slots per lesson, 768 slots / 107 distinct English question strings, no duplicate course/slug keys and no invalid answer indices. ICT source contains 54 lesson records. These checks do not validate educational correctness or browser interactions. Browser visual, interaction and accessibility testing was not performed in this audit.

## Verified Git history

### 2026-11-09 — d705196 — Build portfolio and bilingual learning academy

Aggregate commit containing the portfolio homepage, theme/layout components, placeholder About/Projects/Contact routes, LearnBlog course landing page, math/discrete catalogs and lesson routes, bilingual learning components/data, interactive quizzes/truth table, English ICT course and browser-storage helper. It also changes dependencies, styles, lint and TypeScript configuration. The active guided curriculum in this commit contains 18 Math from Zero and 78 Discrete Mathematics lessons.

The commit includes local cleanup work such as consistent formatting, removal of unused imports/redundant logic, provider ownership for guided lessons, data-derived quiz totals and storage handling. Its diff verifies these changes in the aggregate; there are no separate earlier feature commits to support a finer dated history. Nothing in this entry claims a remote push or deployment.

### 2026-11-08 — 4aee375 — Initial commit from Create Next App

Initial Next.js project with package files, starter app/layout/styles, public SVG assets, favicon, TypeScript/ESLint/Next configuration, README, .gitignore and generated AGENTS.md instructions. The initial commit already contains the local Next configuration; do not assume it was an entirely unmodified upstream scaffold.

## Future change-tracking conventions

- After every development task, add an Unreleased entry and update ROADMAP.md, including documentation-only work when material.
- Record the local date, concrete user-visible or technical change, verification performed and any remaining limitation. Use Added, Changed, Fixed, Removed or Documentation labels when useful.
- Separate proposed work from completed changes. Do not log a plan as an implementation or present local work as a release.
- Cite actual commit hashes only after they exist. Do not fabricate historical milestones, feature dates, test results, official course alignment or deployment events.
- When creating a release is explicitly requested, move only its verified entries into a dated/versioned section. GitHub pushes, deployment and remote updates require separate explicit authorization.
