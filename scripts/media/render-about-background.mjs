// Original local artwork and instrumental audio for the About direction prototype.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const work = path.join(root, ".local/about-preview");
const output = path.join(root, "public/media/about");
fs.mkdirSync(work, { recursive: true });
fs.mkdirSync(output, { recursive: true });
const duration = 18;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
<defs>
  <radialGradient id="glow"><stop stop-color="#25475b" stop-opacity=".5"/><stop offset="1" stop-color="#0a111a" stop-opacity="0"/></radialGradient>
  <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#94b9c4" opacity=".12"/></pattern>
</defs>
<rect width="1920" height="1080" fill="#0a111a"/>
<ellipse cx="1260" cy="530" rx="800" ry="700" fill="url(#glow)"/>
<rect width="1920" height="1080" fill="url(#grid)"/>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M915 340 C1050 300 1130 280 1264 378 M1070 640 C1200 640 1230 560 1320 550 M1480 480 C1610 430 1625 605 1695 700 M1305 790 C1430 940 1650 950 1750 843" stroke="#598a9b" stroke-width="2" stroke-dasharray="6 10" opacity=".5"/>
  <g transform="translate(850 235) rotate(-5)">
    <rect width="365" height="260" rx="18" fill="#0f1b28" stroke="#77c7d6" stroke-opacity=".65" stroke-width="2"/>
    <path d="M0 44 H365" stroke="#77c7d6" stroke-opacity=".3"/>
    <circle cx="22" cy="22" r="4" stroke="#ed94ad"/><circle cx="38" cy="22" r="4" stroke="#d7bb7e"/><circle cx="54" cy="22" r="4" stroke="#87bfa5"/>
    <path d="M35 85 L17 105 L35 125 M70 85 L88 105 L70 125 M59 81 L47 130" stroke="#8dd7dc" stroke-width="3"/>
    <path d="M30 163 H172 M30 190 H260 M30 217 H210" stroke="#aac1d9" stroke-width="5" opacity=".5"/>
    <path d="M190 163 H290 M279 190 H326" stroke="#b29ace" stroke-width="5" opacity=".6"/>
  </g>
  <g transform="translate(1350 237) rotate(6)">
    <circle cx="110" cy="110" r="87" stroke="#c2aaea" stroke-width="2" opacity=".8"/>
    <path d="M24 85 L110 32 L195 90 L161 181 L64 181 Z M24 85 L161 181 M110 32 L64 181 M195 90 L64 181" stroke="#c2aaea" opacity=".42" stroke-width="2"/>
    <g fill="#0a111a" stroke="#c2aaea" stroke-width="2"><circle cx="24" cy="85" r="8"/><circle cx="110" cy="32" r="8"/><circle cx="195" cy="90" r="8"/><circle cx="161" cy="181" r="8"/><circle cx="64" cy="181" r="8"/></g>
  </g>
  <g transform="translate(1050 670) rotate(4)">
    <rect width="420" height="235" rx="18" fill="#0f1b28" stroke="#86c8ae" stroke-opacity=".7" stroke-width="2"/>
    <path d="M32 54 H235 M32 89 H345" stroke="#b5c7d3" opacity=".4" stroke-width="4"/>
    <circle cx="94" cy="161" r="29" stroke="#86c8ae" stroke-width="2"/>
    <path d="M87 149 L107 161 L87 173 Z" fill="#86c8ae" stroke="none"/>
    <path d="M154 158 H349 M154 181 H281" stroke="#86c8ae" stroke-width="3" opacity=".5"/>
  </g>
  <g transform="translate(1610 623) rotate(-6)">
    <rect width="212" height="212" rx="18" fill="#0f1b28" stroke="#d7bb7e" stroke-opacity=".6" stroke-width="2"/>
    <g fill="#c8bd91" stroke="none">
      <path d="M26 26 H79 V79 H26 Z M34 34 V71 H71 V34 Z" fill-rule="evenodd"/>
      <path d="M133 26 H186 V79 H133 Z M141 34 V71 H178 V34 Z" fill-rule="evenodd"/>
      <path d="M26 133 H79 V186 H26 Z M34 141 V178 H71 V141 Z" fill-rule="evenodd"/>
      <path d="M42 42 H63 V63 H42 Z M149 42 H170 V63 H149 Z M42 149 H63 V170 H42 Z M104 26 H116 V51 H104 Z M92 79 H119 V106 H92 Z M137 103 H174 V116 H137 Z M92 128 H116 V152 H92 Z M132 137 H152 V164 H132 Z M170 137 H186 V186 H170 Z M109 171 H148 V186 H109 Z"/>
    </g>
  </g>
</g>
<g fill="#b5cad3" font-family="Segoe Print, cursive" font-size="23" opacity=".65"><text x="861" y="555">build something useful</text><text x="1340" y="533">understand the ideas</text><text x="1102" y="969">make it clear for someone else</text></g>
</svg>`;
const artwork = path.join(work, "artwork.png");
await sharp(Buffer.from(svg)).png().toFile(artwork);
await sharp(Buffer.from(svg))
  .webp({ quality: 92 })
  .toFile(path.join(output, "workspace-poster.webp"));

// Quiet original ambient music, with fade-to-zero loop boundaries and no speech.
const rate = 48000,
  count = duration * rate;
const wav = Buffer.alloc(44 + count * 4);
wav.write("RIFF");
wav.writeUInt32LE(wav.length - 8, 4);
wav.write("WAVEfmt ", 8);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(rate, 24);
wav.writeUInt32LE(rate * 4, 28);
wav.writeUInt16LE(4, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(count * 4, 40);
const notes = [220, 261.63, 329.63, 440, 392, 329.63];
for (let n = 0; n < count; n++) {
  const t = n / rate,
    envelope = Math.min(1, t / 2, (duration - t) / 2);
  const chord =
    [110, 164.81, 220].reduce((a, f) => a + Math.sin(2 * Math.PI * f * t), 0) /
    3;
  const phase = (t + 1) % 3,
    note = notes[Math.floor((t + 1) / 3) % notes.length];
  const pluck = Math.sin(2 * Math.PI * note * t) * Math.exp(-phase * 2);
  const value = envelope * (0.032 * chord + 0.035 * pluck);
  const pan = Math.sin((2 * Math.PI * t) / duration) * 0.1;
  wav.writeInt16LE(Math.round(value * (1 - pan) * 32767), 44 + n * 4);
  wav.writeInt16LE(Math.round(value * (1 + pan) * 32767), 46 + n * 4);
}
const music = path.join(work, "ambient.wav");
fs.writeFileSync(music, wav);
// Motion is periodic, so the camera and orbiting data dots meet at the loop seam.
const filters = [
  "[0:v]scale=1960:1104,crop=1920:1080:x='20+16*sin(2*PI*t/18)':y='12+8*sin(2*PI*t/18)',setsar=1[bg]",
  "[1:v]format=rgba,colorchannelmixer=aa=0.8[dot]",
  "[bg][dot]overlay=x='1270+325*cos(2*PI*t/18)':y='540+185*sin(2*PI*t/18)'[moving]",
  "[moving]format=yuv420p[v]",
];
execFileSync(
  "ffmpeg",
  [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-loop",
    "1",
    "-framerate",
    "30",
    "-i",
    artwork,
    "-f",
    "lavfi",
    "-i",
    "color=c=0x8dd7dc:s=8x8:r=30",
    "-i",
    music,
    "-filter_complex",
    filters.join(";"),
    "-map",
    "[v]",
    "-map",
    "2:a",
    "-t",
    String(duration),
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    "18",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-movflags",
    "+faststart",
    path.join(output, "workspace-loop.mp4"),
  ],
  { stdio: "inherit" },
);
execFileSync(
  "ffmpeg",
  [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    path.join(output, "workspace-loop.mp4"),
    "-vn",
    "-c:a",
    "copy",
    path.join(output, "workspace-ambient.m4a"),
  ],
  { stdio: "inherit" },
);
console.log(
  "Created original 18-second 1080p About loop, quiet stereo music and poster.",
);
