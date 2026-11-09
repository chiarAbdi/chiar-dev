# chiar.dev — project inventory

Initial audit date: 2026-11-09 (Europe/Zurich). The audit sections below preserve that baseline; see the subsequent implementation update at the end. Scope: local files and Git history, with local lint, type checking, and production build. No redesign or feature implementation is authorized by this audit. Browser interaction and visual QA were not performed in this audit.

## Goals and boundaries

Personal portfolio for software development, IT systems, programming, technical projects, and preparation for BFH Computer Science. LearnBlog is an independent educational area for explanations, worked examples, exercises, quizzes, and eventually original animated lessons. Logistics experience is outside scope. Existing content and design are to be preserved.

All development stays local unless the user explicitly authorizes a particular remote action. No Git remote is currently configured. The binary numbers animation is the first planned visual teaching prototype: original visuals, 60–90 second storyboard; no storyboard, animation player, or video artifact was found.

## Repository and directory inventory

| Location | Role |
| --- | --- |
| src/app/ | App Router pages, root layout, global CSS, favicon |
| src/components/layout/ | Shared Header and Footer |
| src/components/ui/ | next-themes wrapper |
| src/components/academy/ | Academy shell, catalogs, logic lesson, guided lessons and quizzes |
| src/lib/academy.ts | EN/DE types and translation helper, eight module descriptors, five logic quiz questions |
| src/lib/academy-extra.ts | Eight standalone lesson records and exercise types |
| src/lib/academy-curriculum.json | 96 guided lesson records: 18 zero + 78 discrete |
| src/lib/use-local-storage.ts | Browser storage subscription hook using useSyncExternalStore |
| public/ | Five starter SVG files (file, globe, next, vercel, window); no original binary animation assets |
| learnblog-academy-v5-final/ | Untracked reference/expansion copy: src tree, README, build.py, create_ui.py; not the active application |
| portfolio-v2-inspection.txt | Untracked prior inspection report; reference only, not authoritative current state |
| .next/, node_modules/ | Generated build/development output and installed packages, ignored by Git |
| next-env.d.ts, tsconfig.tsbuildinfo | Generated TypeScript support/cache files, ignored by Git |
| README.md | Generic Create Next App instructions; not a current product overview |
| AGENTS.md, PROJECT.md, ROADMAP.md, CHANGELOG.md | Persistent instructions, architecture/inventory, status, verified changes |

Root configuration: package.json and package-lock.json (npm), next.config.ts, tsconfig.json, eslint.config.mjs, .gitignore. No application API routes, database, authentication, CMS, test suite, CI workflow, or deployment configuration was found in the inspected project files. Presence of external project links does not verify those external applications.

The archive has its own math source copy with the same 18/78 lesson counts. Its generator scripts contain hardcoded /mnt/data working paths and are not a supported local build pipeline. Do not execute or merge them automatically. Both lint and TypeScript explicitly exclude the archive.

## Technologies and configuration

Declared runtime dependencies: Next.js 16.4.5; React/react-dom ^19.3.0; TypeScript is a development dependency (^5); Tailwind CSS ^4 with @tailwindcss/turbopack ^4; lucide-react ^1.70.0; motion ^14.10.1; next-themes ^0.4.6; clsx ^2.1.1; tailwind-merge ^3.7.0. The last two are installed but have no current src imports.

Development tooling also includes ESLint ^9, eslint-config-next 16.4.5, @types/node ^20, and React type packages ^19. These are manifest declarations, not claims of the exact version resolved by every range.

Scripts: npm run dev (next dev), npm run build (next build), npm start (next start), npm run lint (eslint). Type check: npx tsc --noEmit --incremental false. No test script or committed formatter configuration is present.

Next configuration enables cacheComponents and partialPrefetching and maps CSS through @tailwindcss/turbopack. The two dynamic foundation routes use async params and export instant = false. Consult the installed Next docs before changing these version-specific conventions.

TypeScript is strict, uses bundler module resolution and the @/* alias for src/*. ESLint uses Next core-web-vitals and TypeScript presets. The root generated Next agent instructions must remain intact.

## Architecture and design decisions already present

Root layout composes ThemeProvider → Header → main content → Footer and supplies metadata, favicon, Geist and Geist Mono fonts. ThemeProvider defaults to dark, supports an explicit light theme, and disables system-theme selection. CSS custom properties define surfaces, text, accents, gradients, cards, container widths and responsive spacing. Homepage reveals use Motion with useReducedMotion; CSS also reduces transitions and smooth scrolling. Full accessibility or reduced-motion compliance has not been tested.

Route files mostly compose shared client components. Interactive state lives in React components; lesson content is static local TypeScript/JSON. This avoids a backend requirement and supports local development. The large curriculum JSON is imported by a client component, so both course datasets enter its client dependency graph; payload size should be measured before future splitting.

AcademyShell owns EN/DE context and its own academy navigation/footer inside the global layout. Local renders the selected translation, and useAcademyLanguage requires an ancestor provider. AcademyFoundationLesson supplies this shell around a keyed inner lesson component; the key resets transient lesson state on navigation. Shell ownership is a functional boundary, not merely styling.

## Routes (21 page.tsx files)

| URL | Implementation and status |
| --- | --- |
| / | Client-rendered portfolio homepage: hero, developer-code illustration, featured QR Studio links and illustrative QR preview, chiar.dev card, planned IT Systems Lab, skills, BFH Study Hub concept, personal roadmap, LearnBlog teaser and contact CTA |
| /about | Placeholder heading and coming-soon text |
| /projects | Placeholder; project cards currently live on the homepage |
| /contact | Placeholder; no contact form or delivery handler |
| /blog | Server component with three course cards: 18 math, 78 discrete, 54 ICT; English-only catalog |
| /learn | CatalogPage: bilingual two-course catalog; discrete count incorrectly says 39, no ICT card |
| /learn/math-from-zero | AcademyCourseCatalog, course zero: 18 searchable guided lessons |
| /learn/math-from-zero/foundation/[slug] | Dynamic guided math lesson; 18 valid records |
| /learn/discrete-math | CoursePage: standalone introductory course index and link to guided course; stale 39-lesson promotion |
| /learn/discrete-math/foundation | AcademyCourseCatalog, course discrete: 78 searchable guided lessons |
| /learn/discrete-math/foundation/[slug] | Dynamic guided discrete lesson; 78 valid records |
| /learn/discrete-math/logic | LogicLessonPage: statements, operators, implication, truth table, five-question scored quiz |
| /learn/discrete-math/equivalences | ExtraLessonPage, equivalences |
| /learn/discrete-math/sets | ExtraLessonPage, sets |
| /learn/discrete-math/relations | ExtraLessonPage, relations |
| /learn/discrete-math/proofs | ExtraLessonPage, proofs |
| /learn/discrete-math/counting | ExtraLessonPage, counting |
| /learn/discrete-math/numbers | ExtraLessonPage, numbers |
| /learn/discrete-math/graphs | ExtraLessonPage, graphs |
| /learn/discrete-math/exam | ExtraLessonPage, exam; original practice, not official exam content |
| /learn/ict-siz | English client course: 54 lessons, five groups, search/filter, selection, self-test, lab prompts, completion tracking |

Next also provides its framework not-found fallback; there is no custom not-found.tsx. Invalid foundation slugs currently render a lesson-not-found paragraph rather than calling Next notFound().

## Component inventory

| File | Components / responsibilities |
| --- | --- |
| layout/header.tsx | Header; desktop links, route-dependent animated mobile menu, theme toggle, external GitHub profile link |
| layout/footer.tsx | Footer; navigation, external profile link, contact link, fixed 2026 copyright, back-to-top anchor |
| ui/theme-provider.tsx | ThemeProvider wrapping next-themes |
| academy/academy-shell.tsx | AcademyShell, Local, useAcademyLanguage; localization context and persistent language selector |
| academy/academy-pages.tsx | CatalogPage, CoursePage, LogicLessonPage; internal Pill, Heading, PageLink, TruthTable, Quiz, tf helper. Also exports an older BlogPage that no route currently uses |
| academy/foundation.tsx | AcademyCourseCatalog, AcademyFoundationLesson, internal FoundationLessonContent; search, study schedule, concept/example/mistake/practice, temporary notes, quiz, next/previous and checklist |
| academy/extra-lessons.tsx | ExtraLessonPage and internal LessonQuiz; standalone sections, examples, takeaways, anchor navigation and scored practice |
| app/page.tsx | Home and internal Reveal, Eyebrow, SectionHeading, Tag, DeveloperWindow, QRPreview |
| app/blog/page.tsx | Active BlogPage and its separate local course card data |
| app/learn/ict-siz/page.tsx | IctSizCourse, embedded lesson/group/schedule data and course state |

## Implemented learning behavior and storage

- Guided math: 96 bilingual records, each with concept, worked example, common mistake and eight quiz slots; searchable titles/concepts, answer feedback, score, retry, previous/next navigation, temporary notes, suggested 120-minute workflow.
- Data audit found 768 guided question slots, 107 distinct English question strings, no duplicate course/slug keys, and no out-of-range answer indices. Distinct strings are not a measure of pedagogical quality or unique exercises; many questions repeat across lessons.
- Logic: P/Q toggles highlight the applicable truth-table row and show NOT/AND/OR/implication; five-question quiz with feedback and retry.
- Eight other standalone math lessons contain bilingual explanatory sections, examples, takeaways and quizzes.
- ICT: 54 lessons grouped as Start Here, PU11, PU12, PU13, SP1. Search, group filter, introduction toggle, lesson selection/navigation, two-choice checks, solution reveal, completion toggles and progress bar. All 54 example strings repeat their explanation with a Real-world example prefix; these need substantive examples, not merely new labels.
- Binary text exists in discrete foundation slug binary-numbers and ICT lesson Bits, bytes and binary. No timed animated teaching sequence is implemented.

| State | Storage |
| --- | --- |
| Theme | next-themes browser preference |
| Math language | localStorage key chiar-academy-language; session fallback when storage is unavailable |
| ICT active lesson and completed indices | localStorage key academy-ict-siz-v1; parsed/validated with session fallback |
| Math notes, math quiz answers/results, ICT quiz answers, UI search/filter/reveal state | React session state only; not durable across refresh |

No accounts or device synchronization. Browser storage can be cleared. Storage subscriptions receive same-tab custom events and browser storage events; session overrides may take precedence after local interaction, so cross-tab behavior should be tested before promising synchronization.

## Missing features and technical concerns

1. Animated binary prototype and 60–90 second storyboard are absent. Current animations are interface transitions, not animated teaching lessons.
2. About, Projects and Contact remain placeholders; no general article publishing system, article detail route, tags or editorial workflow exists. Course lessons do contain educational text.
3. Study Hub is an explicitly labeled concept preview with untracked/zero progress; IT Systems Lab is marked upcoming. QR illustration is explicitly not scannable; actual QR generation is external to this repository.
4. Catalog duplication: /blog lists three accurate course counts; /learn lists two courses with a stale discrete count; CoursePage has stale 39-lesson labels; unused older BlogPage and module descriptors add maintenance ambiguity. Homepage still describes LearnBlog as future content despite existing courses.
5. Content depth and repeated questions require an educational review. Suggested two-hour sessions are study plans, not two hours of authored reading. BFH/SIZ alignment and external links were not independently verified.
6. Large client modules and the imported JSON may increase client payload. No performance budget, automated tests or CI is configured.
7. Accessibility review needed: fixed global header may overlap academy content; /blog and ICT add main elements inside root main; math language changes leave html lang=en; some hardcoded dark colors may not suit light mode; Back to top targets #top, only explicitly provided on the homepage. These are source-level concerns, not browser-confirmed defects.
8. Framework-level missing-lesson status handling is absent for invalid slugs. Most routes inherit generic metadata.
9. next/font/google can require network access on a clean build. Existing external links do not make the app remotely hosted or authorize publishing. Self-hosted fonts would require a separately approved change if strict offline builds are needed.
10. Next warns that D:/Projects/package-lock.json lies outside the Git repository and is ignored. No change to configuration or that parent file was made.
11. Archive and inspection report remain untracked and untouched; they should not be treated as active code or historical evidence of shipped features.

## Verification and Git baseline

At audit start: branch main, HEAD d705196; no remote configured; tracked files clean. Existing untracked paths: learnblog-academy-v5-final/ and portfolio-v2-inspection.txt. No Git state was reset, committed, pushed or discarded during this audit.

Local verification on 2026-11-09: npm run lint and npx tsc --noEmit --incremental false passed. Production build result is recorded in CHANGELOG.md. No browser behavior, visual layout, external destination or official curriculum alignment was validated during this audit.


## Subsequent implementation update — 2026-11-09

The user explicitly authorized a short What is ICT? video prototype after the documentation audit, using a supplied blackboard reference. This supersedes the initial no-implementation boundary for this scoped task. The initial binary prototype remains planned.

An 88.79-second original portrait MP4 now appears only within the first ICT lesson. It has progressively drawn diagrams, locally synthesized English narration, quiet original generated music, burned-in captions, optional WebVTT captions/chapters, a poster, downloadable MP4 and expandable transcript. Playback uses native controls with no autoplay or loop; switching lessons unmounts the player. Existing lesson text and quiz/progress functionality were preserved.

New component: src/components/academy/ict-introduction-video.tsx. Narration source: src/lib/ict-introduction.json. Media: public/media/lessons/what-is-ict*. Local regeneration tools: scripts/media/narrate-ict.ps1 and render-ict.mjs. Storyboard, architecture and reproduction details: docs/lessons/what-is-ict.md. Temporary rendering and browser tooling live in ignored .local/ (also excluded from lint). No app runtime dependencies were added.

Decision: pre-rendered local MP4 with native browser controls keeps the prototype offline at playback, downloadable and independent of a cloud video service or live animation runtime. The renderer is Windows-specific and uses installed voices/fonts, ffmpeg/ffprobe and existing sharp. Only this one lesson has a video; it does not establish a finished all-lessons video system.

Chrome checks verified actual playback and decoded audio, seek/pause, transcript, captions delivery, byte-range requests, lesson-specific visibility, existing completion persistence and mobile fit. Desktop/mobile screenshots were inspected. Subjective narration/music quality and precise caption timing still need user review. The original untracked archive and inspection report remain untouched; nothing was pushed or deployed.


### Video quality revision — 2026-11-09

After hearing the draft, the user requested a more natural voice and better quality. The current export is 83.80 seconds, 1080 × 1920 at 30 fps, replacing the initial 720p/Windows speech draft. Narration now uses local Kokoro neural inference (af_heart, normal pace), with actual sentence timings for captions and selected diagram reveals. The mix has reduced background music and loudness/peak control. The player is slightly larger on desktop and uses versioned local media URLs.

The isolated Python environment, model and voices were downloaded to ignored .local/; lesson text/audio were not sent to a speech service. New setup/narration scripts and pinned direct Python requirements make this repeatable. No app runtime dependencies or cloud services were added. The voice remains generated; subjective naturalness awaits the user's review.

Final revised-export verification passed: 83.80 seconds, 1080 × 1920 / 30 fps, H.264/AAC, 4.5 MB, measured -2.0 dB peak. All 26 sentence cues passed duration/order checks, and the Chrome playback/navigation/progress/mobile regression checks passed. Lint, TypeScript and production build passed; the existing ignored parent lockfile warning remains.


## About page implementation — 2026-11-09

The /about route is now a server-rendered profile, replacing its initial-audit placeholder. It uses the supplied CV for professional history, technical background, IT education, volunteering and languages, and the existing repository/conversation for current projects. It deliberately excludes non-IT employment, private contact details and the conflicting CV GitHub handle. BFH studies are explicitly interrupted, and CS50 is coursework without a certificate claim. No completed IT degree or current enrolment is inferred.

The supplied portrait is optimized locally as src/assets/chiar-abdi.webp (1100 × 1100, approximately 166 KB) and statically imported through next/image. Responsive sizes, intrinsic dimensions, blur placeholder and eager/high-priority loading support the visible hero image without a new client component or dependency. The page reuses global theme variables and layout components; other routes and global styling are unchanged. Route metadata and semantic sections were added.

See docs/about-content.md for provenance and unresolved profile-link details. Lint, TypeScript and Chrome content/image/theme/mobile checks passed. No app publication, Git commit or remote update was performed.

About production build passed. The route is statically prerendered. The existing ignored parent-directory lockfile warning remains; no new build errors were introduced.


## Public-showcase About prototype — 2026-11-09

The user clarified that About should be a public showcase of current work, not a CV. A separate /about/preview route now demonstrates that direction; /about is unchanged pending review. Prototype metadata disables indexing, but there is no access control. It uses a small portrait (112px desktop / 96px mobile), current-project cards, present-tense copy and no employer timeline.

New files: src/app/about/preview/page.tsx and src/components/about/quiet-background.tsx. The page content is server-rendered; only media controls need a client component. Local original background assets are public/media/about/workspace-loop.mp4, workspace-poster.webp and workspace-ambient.m4a, generated by scripts/media/render-about-background.mjs using existing Sharp and FFmpeg. No new runtime dependencies.

The 18-second 1080p/30 fps loop has subtle periodic camera/data motion and original stereo instrumental music, with no speech. In the page, video stays muted and a separate audio element provides opt-in music. This deliberately decouples music from motion: reduced-motion users see a poster until they explicitly play animation, and enabling music does not start motion. All visitors have separate pause/play and music controls. User review of the creative direction and quiet mix is pending.

Lint, TypeScript, production build and Chrome checks passed, including mobile sizing/overflow, source-image sharpness, original About preservation and reduced motion with music enabled. No commit, push, deployment or remote update.


## Main About promotion — 2026-11-09

After reviewing the showcase, the user reported that /about still showed the original page. The reviewed composition is now the main /about route; /about/preview redirects there. Preview labels and preview-only noindex metadata were removed. Global navigation already targets /about and therefore now opens the approved design. This replaces the earlier CV-style page; the current small portrait, project cards, ambient background and separate music/motion controls are preserved. No new runtime dependency or remote action.


## Site organization and shared languages — 2026-11-09

Current page roles: Home introduces and routes visitors; Projects owns the searchable active/planned collection; LearnBlog is a discovery page for explanations and visual lessons; /learn is a card-based learning dashboard; Contact exposes only the confirmed email and GitHub. The About showcase remains intact, now with translated copy and controls.

LanguageProvider in the root layout owns EN/DE state and the existing chiar-academy-language key. Academy consumers share that context instead of a nested provider. The document language and main-page titles update in the browser. English server metadata remains the initial fallback; URLs have no locale prefix, so this is not a complete multilingual SEO routing setup. All 54 ICT written lessons now have German counterparts. The video retains its English audio/visual captions, explicitly labeled, with a translated companion text.

New route-specific client content lives in components/pages and components/learning; server route wrappers supply metadata and course summaries. course-catalog.ts computes counts and IDs from the canonical data on the server, passing summaries without the full curriculum to the dashboard. Existing math lesson components still import their curriculum on the client, an outstanding payload consideration.

academy-learning-progress-v1 stores unique guided-math completion IDs after a quiz is finished. The dashboard filters them against real course IDs and combines them with validated/deduplicated legacy academy-ict-siz-v1 completion indices. No historical completion is fabricated or backfilled. Quiz completion is not a mastery/certification claim. Notes and unfinished quiz answers remain transient.

The confirmed contact is chiar.abdi@powercoders.org and https://github.com/chiarAbdi. mailto actions open a local email client and never send automatically. No server, account, analytics or new runtime dependency was added. Public GitHub publication was explicitly authorized for this task, including main and testing; deployment was not requested. Private reference notes, caches and model downloads remain ignored.
