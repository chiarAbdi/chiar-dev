# About showcase prototype

Local review route: /about/preview. Created 2026-11-09 following the user's request to move away from a CV and toward current work. The existing /about remains unchanged until the user reviews the prototype.

## Direction

- Small, sharp portrait: 112px desktop and 96px mobile, reusing the original optimized image with responsive high-density selection. No artificial face alteration or added sharpening halos.
- Present-tense introduction: building applications, explaining technical ideas, developing LearnBlog, exploring IT systems and strengthening computer science foundations.
- Three current-project cards: chiar.dev, LearnBlog and QR Studio. No employer names, job dates, academic timeline, proficiency bars or private contact details.
- A restrained animated background rather than a narrated lesson. Original software, graph, visual-learning and illustrative QR diagrams reference the prior blackboard aesthetic. The QR graphic is decoration, not a functional/scannable code.
- Original 18-second 1920 × 1080 / 30 fps loop with stereo instrumental ambience. No speech or external media service.

## Playback and architecture

Music defaults off. Motion plays muted for users without a reduced-motion preference, with a still poster as fallback if autoplay is unavailable. Pause/play and music controls are visible and independent. Reduced-motion users get the poster; enabling music does not start the video. All meaningful content is HTML outside the decorative video, so captions are unnecessary for this non-narrated background.

The route is a Server Component; QuietBackground isolates browser playback state. The poster and gradients maintain readable foreground text. A separate local audio asset supports independent music/motion preferences. No new app dependency or global style change.

Noindex/nofollow keeps the review route out of ordinary search indexing if ever hosted, but it is not authentication. Nothing has been hosted or deployed by this task.

## Reproduce

Run node scripts/media/render-about-background.mjs from the project root. It uses the existing sharp installation and local ffmpeg. Source artwork is original SVG authored in the script; original music is synthesized mathematically from quiet pads/plucked tones. Temporary artwork/WAV files stay in ignored .local/about-preview/. Outputs go to public/media/about/.

## Verification

Lint, TypeScript and production build passed. Chrome checks covered quiet defaults, actual media playback, independent pause/music toggles, reduced motion including music enabled, portrait size/high-density source, desktop/light/mobile layouts, current-work anchor, original About preservation and no 390px horizontal overflow. Desktop/mobile screenshots were inspected. User approval of visual direction, movement and music remains pending.


## Promoted after review — 2026-11-09

The user approved the direction and reported that the normal About link still showed the previous page. The showcase now lives at /about; /about/preview redirects to it. Preview labels and noindex metadata have been removed from the main page. Earlier statements about preserving the old About describe the review stage only. No remote publication occurred.
