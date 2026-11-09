<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# chiar.dev project instructions

## Scope and authorization
- This is the existing chiar.dev portfolio and LearnBlog Academy. Understand the current implementation before changing it; do not redesign or rebuild it without a specific request.
- Focus exclusively on IT, software engineering, programming, technical projects, and computer science/BFH preparation. Do not include logistics experience.
- Keep all work local. Never push to GitHub, deploy, publish, or update remote repositories without explicit permission for that action. An earlier push request is not standing authorization for future work.
- Preserve existing functionality, designs, content, and unrelated local changes. Inspect Git status first; never discard work or silently absorb the separate archive into the active app.
- The initial documentation audit is complete. Subsequent explicit user requests authorize their scoped implementation; preserve the audit baseline and do not infer permission for a redesign.

## Development workflow
- Read PROJECT.md for architecture, ROADMAP.md for feature status, and CHANGELOG.md for verified history.
- Before Next.js code changes, read the relevant locally installed guide under node_modules/next/dist/docs/. Preserve the generated rules block above.
- Prefer complete replacement files for approved implementation changes, while preserving unrelated work and keeping scope reviewable. Explain significant architectural decisions and tradeoffs.
- After every future development task, update ROADMAP.md and CHANGELOG.md with the actual outcome, validation, and unresolved limitations.
- Never invent completed features, dates, official course alignment, deployments, or historical changes. Distinguish rendered content, interactive behavior, illustrative previews, and planned features.
- Run appropriate local verification (npm run lint, TypeScript, and npm run build as applicable). Report failures and untested behavior honestly. Do not add dependencies, network services, or external integrations without a task need.
- Do not run archive generator scripts as part of normal development. Active code is in root src/; learnblog-academy-v5-final/ is a separate untracked reference copy, excluded from lint and TypeScript.

## Product and content
- LearnBlog's intended scope includes educational articles, interactive explanations, quizzes, and animated visual lessons. These are product goals, not a claim that every format exists today.
- The original plan was a binary numbers prototype with original visuals and a 60–90 second teaching storyboard. The user subsequently selected What is ICT? for the immediate prototype; an 84-second local video with neural narration now exists in the first ICT lesson. Binary animation remains planned. See docs/lessons/what-is-ict.md.
- Educational material is independent preparation, not an official BFH or SIZ syllabus or exam bank. Suggested study durations include independent work and must not imply that amount of written content.
- Preserve the shared English/German preference across all pages and written lessons, including all 54 ICT lessons. The narrated ICT video remains English, with a German companion text; do not claim a German voice track exists.
- Preserve local privacy: language preference and ICT progress use browser storage; foundation notes and quizzes are currently temporary. Do not silently introduce accounts, analytics, cloud persistence, or remote synchronization.

## Current technical boundaries
- Next.js App Router, React, TypeScript, Tailwind CSS; root layout provides theme, header, and footer.
- LanguageProvider in the root layout owns site and academy language. useAcademyLanguage aliases useSiteLanguage; AcademyShell provides lesson layout, not a second language store.
- Derive course counts from the lesson data: 18 zero-course, 78 discrete-course and 54 ICT lessons at this update. The learning dashboard uses actual browser-local completion, with no fabricated points or streaks.
- Existing external links and Google font build-time fetching do not authorize new remote actions. Flag network requirements when an offline workflow matters.

## About page direction
- The user wants a public showcase of current work and interests, not a CV or employment timeline. Use a small, sharp portrait and focus on what Chiar is building and learning now. Omit former employers and historical roles from the proposed direction.
- The approved showcase is the main /about page. /about/preview redirects to /about. Keep the public page focused on current work; do not restore the earlier CV-style version without a new request.
- Background media should be calm, original and local, with no narration. Music must be opt-in, motion must be pausable, and reduced-motion users should get a still background. Music and motion controls must work independently.

## Navigation, contact and repository
- Home introduces the site; Projects owns the project collection; LearnBlog presents explanations and visual lessons; /learn is the course/progress dashboard; Contact uses the user-confirmed chiar.abdi@powercoders.org and https://github.com/chiarAbdi.
- The user explicitly authorized creating public chiarAbdi/chiar-dev and pushing main plus a testing branch for this initial publication. This is not standing permission for future pushes or deployments.
- Keep .local/, model files, generated caches, reference archive/report and private CV source notes out of Git. Public site assets and finished media are part of the project.
