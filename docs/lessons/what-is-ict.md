# What is ICT? — local video prototype

Created 2026-11-09 for the existing first lesson at /learn/ict-siz. The user's latest request selected What is ICT? for the immediate prototype; the earlier binary numbers lesson remains future work.

## Deliverable and visual direction

83.80-second, 1080 × 1920 portrait MP4, 30 fps, H.264 video and AAC audio at 48 kHz. Rendered at CRF 18 with 192 kbps AAC audio. Inspired by the supplied reference's blackboard format: handwritten labels, restrained colored diagrams, progressively drawn arrows and one explanatory idea at a time. All diagrams and the soundtrack are newly authored. No frames, audio or characters were copied from the reference. The reference itself stays in Downloads and is not served by the app.

English narration now uses the local Kokoro neural model with the af_heart stock voice at its normal 1.0 reading speed. The first draft used Windows System.Speech; the user requested a more natural voice, and that draft has been replaced. The original instrumental bed is generated from sine-based pads and decaying plucked tones, mixed quietly beneath narration. It is still a synthetic voice, not a recorded human narrator. No cloud generation service or remote media host is involved.

## Teaching objective

Explain ICT by following a message from keyboard input to CPU processing, distinguish temporary working memory from persistent saved files, then introduce communication and visible output. Finish with the existing lesson's RAM-versus-SSD check and Task Manager lab prompt. Saving is an explicit separate action; the video does not claim every message automatically goes to an SSD.

## Storyboard and narration

### 1. Three letters. One connected world. (0:00–0:10)

Visual: Cyan, pink and yellow ICT letters appear, followed by the three expanded words.

Narration: I C T means information and communication technology. It is the technology we use to work with information and share it. Let's follow a message.

### 2. First, give the computer input. (0:10–0:21)

Visual: Keyboard and laptop are drawn; hello is typed into the screen, with an input arrow.

Narration: You type hello on a keyboard. Those key presses are input: information entering the computer. A mouse, microphone, or touchscreen can provide input too.

### 3. The CPU follows instructions. (0:21–0:30)

Visual: An input label connects to a CPU chip and a screen; arrows draw the processing path.

Narration: The C P U runs the app's instructions. It processes your input so the letters appear on screen. Think of it as doing the work.

### 4. RAM is the working space. (0:30–0:40)

Visual: CPU connects to a lit RAM bank. Its cells clear when the power-off cue appears.

Narration: While the app is running, RAM holds data it is using right now. RAM is temporary. Turn the power off, and its contents are lost.

### 5. Storage keeps saved files. (0:40–0:49)

Visual: A save arrow connects working memory to an SSD; a check mark reinforces persistence.

Narration: Save a file, and it goes to persistent storage, such as an S S D. Unlike RAM, saved files remain when the power is off.

### 6. Communication connects devices. (0:49–1:00)

Visual: A moving data dot crosses from a laptop to a phone, which displays hello as output.

Narration: Press send. A network carries your message as data between devices. On the other person's screen, the message becomes output: information they can see.

### 7. Put the pieces together. (1:00–1:12)

Visual: Five numbered roles appear progressively: input, CPU, RAM, storage and network.

Narration: Input brings information in. The C P U processes it. RAM holds working data. Storage keeps saved files. Networks let devices share information. That's I C T.

### 8. Your turn: RAM or SSD? (1:12–1:23)

Visual: RAM and SSD appear beside the question. RAM is revealed as the answer, followed by a Task Manager prompt.

Narration: Quick check: which holds data a program is using right now? RAM. Next, open Task Manager and watch C P U, memory, disk, and network activity.


## Source and assets

- src/lib/ict-introduction.json: single narration/storyboard source, also used for the page transcript.
- scripts/media/narrate-ict-neural.py: local neural narration with sentence-boundary timing.
- scripts/media/setup-neural-voice.ps1 and requirements-voice.txt: isolated local model/runtime setup.
- scripts/media/narrate-ict.ps1: retained older Windows speech fallback, not the current voice.
- scripts/media/render-ict.mjs: original SVG artwork, animation rendering, audio composition, poster and WebVTT generation.
- src/components/academy/ict-introduction-video.tsx: native video player and transcript.
- public/media/lessons/what-is-ict.mp4: playable video.
- public/media/lessons/what-is-ict-poster.webp: pre-play poster.
- public/media/lessons/what-is-ict.vtt: English captions; captions are also burned into the video.
- public/media/lessons/what-is-ict.chapters.vtt: chapter metadata.

The player is mounted only when the existing active lesson index is zero. Other lessons retain their content, quizzes, navigation and progress behavior. Playback is user initiated: no autoplay or automatic looping. Native controls provide play/pause, seek, volume and fullscreen; users can replay or download. A text transcript provides a nonanimated alternative. Native CC may duplicate the burned-in captions when enabled. Current caption boundaries use actual generated sentence lengths and pauses. They are sentence-aligned, not word-level forced alignment. RAM power-off, storage persistence, recap and answer reveals now follow the corresponding sentence cues.

## Regenerate locally

Requirements: npm dependencies installed (including the sharp package resolved through the existing Next installation), Node.js, Python 3.11, PowerShell, ffmpeg and ffprobe on PATH, and Windows Segoe Print/Segoe UI fonts. There are no new app runtime dependencies. The renderer uses local Windows fonts; it is not a cross-platform production pipeline yet. Neural inference runs on the local CPU. Setup downloads the model and voice files once; it sends no lesson text or generated audio to an external service.

From the project root:

1. powershell -NoProfile -ExecutionPolicy Bypass -File scripts/media/setup-neural-voice.ps1 (one-time package/model downloads; model checksums are validated)
2. .local/voice-env/Scripts/python.exe scripts/media/narrate-ict-neural.py
3. node scripts/media/render-ict.mjs --preview (optional storyboard contact sheet)
4. node scripts/media/render-ict.mjs

Temporary voice WAVs, music, timing data and verification screenshots live under ignored .local/. Final exports are staged locally and then copied to public/media/lessons/ after successful rendering. The player uses versioned URLs to avoid replaying the earlier draft from browser cache. The checked-in-style source files and media are currently local and uncommitted; no remote publication was performed.

## Validation and limitations

- Current export checks confirmed 83.80 seconds, 1080 × 1920, 30 fps, H.264 and 48 kHz AAC audio, 4.5 MB. Audio peak is -2.0 dB; all eight narration WAVs had zero clipped samples. All 26 sentence cues fit their audio durations.
- Fresh-context Chrome regression verification of the revised HD export confirmed playback advances with decoded audio, pause/seek, transcript display, caption delivery, HTTP byte-range serving, first-lesson-only visibility, and unchanged completion persistence after reload.
- At a 390px viewport the player measured 290px wide and the page had no horizontal overflow. Desktop and mobile screenshots were inspected.
- Browser checks verify media mechanics, not human judgement of narration quality or exact caption alignment. Review the prototype's pacing, synthetic voice and soundtrack before extending it to more lessons.
- Existing fixed-header/content overlap in the ICT page remains outside this change. No other lesson videos were created.


Neural renderer setup follows the [kokoro-onnx project documentation](https://github.com/thewh1teagle/kokoro-onnx). Its runtime is MIT licensed and its model is listed as Apache 2.0 in that documentation. Model binaries and the Python environment remain in ignored .local/, outside served public assets.
