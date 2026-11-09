// Local, deterministic artwork and original soundtrack. No remote media services.
import fs from "node:fs";
import path from "node:path";
import { spawn, execFileSync } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const story = JSON.parse(
  fs.readFileSync(path.join(root, "src/lib/ict-introduction.json"), "utf8"),
);
const scratch = path.join(root, ".local/ict-video");
const output = path.join(scratch, "export");
const published = path.join(root, "public/media/lessons");
fs.mkdirSync(scratch, { recursive: true });
fs.mkdirSync(output, { recursive: true });
const fps = 30;
const W = 1080,
  H = 1920;
const C = {
  bg: "#0b100e",
  white: "#e8eee6",
  muted: "#9ba69d",
  cyan: "#73d7d1",
  pink: "#ef8aa9",
  yellow: "#e6cd78",
  green: "#9cd9a1",
};
const clamp = (v) => Math.max(0, Math.min(1, v));
const escape = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const label = (text, x, y, size = 28, color = C.white, anchor = "start") =>
  `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="${anchor}" font-family="Segoe Print, Comic Sans MS, cursive">${escape(text)}</text>`;
const type = (text, x, y, size = 23, color = C.white, anchor = "start") =>
  `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="${anchor}" font-family="Segoe UI, sans-serif">${escape(text)}</text>`;
const reveal = (t, at, content, duration = 0.65) =>
  `<g opacity="${clamp((t - at) / duration)}" transform="translate(0 ${8 * (1 - clamp((t - at) / duration))})">${content}</g>`;
function line(d, color = C.white, progress = 1, width = 2.4) {
  return `<path d="${d}" pathLength="1" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1" stroke-dashoffset="${1 - clamp(progress)}"/>`;
}
function arrow(x1, y1, x2, y2, color, progress = 1) {
  const angle = Math.atan2(y2 - y1, x2 - x1),
    len = 13;
  return (
    line(
      `M${x1} ${y1} Q${(x1 + x2) / 2 + 8} ${(y1 + y2) / 2 - 6} ${x2} ${y2}`,
      color,
      progress,
    ) +
    (progress > 0.9
      ? line(
          `M${x2 - len * Math.cos(angle - 0.5)} ${y2 - len * Math.sin(angle - 0.5)} L${x2} ${y2} L${x2 - len * Math.cos(angle + 0.5)} ${y2 - len * Math.sin(angle + 0.5)}`,
          color,
        )
      : "")
  );
}
function laptop(x, y, text = "hello", color = C.cyan, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">${line("M4 3 L182 0 L185 115 L0 118 Z", color)}${line("M-17 135 L201 132 L185 116 L0 118 Z", color)}${line("M70 131 L114 131", color)}${label(text, 92, 68, 29, color, "middle")}</g>`;
}
function chip(x, y) {
  let pins = "";
  for (let i = 0; i < 5; i++) {
    const a = 16 + i * 24;
    pins += line(
      `M${a} -15 L${a} 0 M${a} 130 L${a} 145 M-15 ${a} L0 ${a} M130 ${a} L145 ${a}`,
      C.pink,
    );
  }
  return `<g transform="translate(${x} ${y})">${pins}${line("M0 0 L130 2 L128 130 L2 128 Z", C.pink)}${line("M16 18 L113 16 L114 112 L18 114 Z", C.pink)}${label("CPU", 65, 78, 33, C.pink, "middle")}</g>`;
}
function ram(x, y, lit = true) {
  return `<g transform="translate(${x} ${y})">${line("M0 0 L176 2 L174 100 L0 98 Z", C.yellow)}${[0, 1, 2, 3].map((i) => `<rect x="${12 + i * 42}" y="20" width="29" height="43" rx="2" fill="${lit ? C.yellow : C.bg}" fill-opacity="${lit ? 0.22 : 1}" stroke="${lit ? C.yellow : C.muted}" stroke-width="2"/>`).join("")}${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => line(`M${12 + i * 21} 101 L${12 + i * 21} 112`, C.yellow)).join("")}${label("RAM", 88, 152, 29, C.yellow, "middle")}</g>`;
}
function disk(x, y) {
  return `<g transform="translate(${x} ${y})">${line("M0 0 L157 -2 L160 172 L1 174 Z", C.green)}${line("M15 25 L144 25 M15 146 L143 146", C.green)}${label("SSD", 80, 72, 34, C.green, "middle")}${label("saved files", 80, 112, 20, C.green, "middle")}${[12, 145].map((a) => `<circle cx="${a}" cy="${a === 12 ? 13 : 159}" r="3" fill="${C.green}"/>`).join("")}</g>`;
}
function phone(x, y, message = "hello!") {
  return `<g transform="translate(${x} ${y})">${line("M0 0 Q55 -7 112 0 L113 199 Q57 207 0 200 Z", C.cyan)}${line("M9 22 L102 22 L102 174 L9 175 Z", C.cyan)}<circle cx="56" cy="188" r="5" fill="none" stroke="${C.cyan}"/>${label(message, 56, 98, 23, C.cyan, "middle")}</g>`;
}
function pill(text, x, y, color = C.cyan) {
  return `<rect x="${x}" y="${y}" width="236" height="62" rx="5" fill="${color}" fill-opacity=".045" stroke="${color}" stroke-width="1.5"/>${label(text, x + 118, y + 41, 27, color, "middle")}`;
}
function wrap(text, max = 46) {
  const lines = [];
  let current = "";
  for (const word of text.split(/\s+/)) {
    if ((current + " " + word).trim().length > max) {
      lines.push(current);
      current = word;
    } else current = (current + " " + word).trim();
  }
  if (current) lines.push(current);
  return lines;
}
const titles = [
  ["WHAT IS", "ICT?"],
  ["IT STARTS", "WITH INPUT"],
  ["THEN THE CPU", "DOES THE WORK"],
  ["RAM =", "WORKING SPACE"],
  ["SAVE IT?", "USE STORAGE"],
  ["NOW, SEND", "THE MESSAGE"],
  ["ONE MESSAGE.", "FIVE PIECES."],
  ["QUICK CHECK:", "RAM OR SSD?"],
];

function artwork(id, t, duration, scene) {
  const at = (index, fallback) =>
    scene?.sentenceCues?.[index]?.start !== undefined
      ? scene.sentenceCues[index].start + 0.35
      : fallback;
  const draw = (at) => clamp((t - at) / 0.9);
  switch (id) {
    case "definition":
      return (
        reveal(
          t,
          0.3,
          label("I", 160, 475, 120, C.cyan) +
            label("C", 308, 475, 120, C.pink) +
            label("T", 464, 475, 120, C.yellow),
        ) +
        reveal(t, 1.3, label("Information", 108, 650, 44, C.cyan)) +
        reveal(t, 2.7, label("Communication", 108, 750, 42, C.pink)) +
        reveal(t, 4.2, label("Technology", 108, 850, 44, C.yellow)) +
        line("M106 668 Q250 679 398 665", C.cyan, draw(1.9)) +
        line("M108 770 Q324 779 583 766", C.pink, draw(3.3)) +
        reveal(t, 6.5, label("Let's follow a message →", 100, 1000, 29))
      );
    case "input":
      return (
        reveal(
          t,
          0.2,
          laptop(
            245,
            400,
            "hello".slice(0, Math.max(0, Math.floor((t - 1) * 2))),
            C.cyan,
            1.35,
          ),
        ) +
        reveal(
          t,
          1.1,
          `<g transform="translate(182 785)">${line("M0 0 L355 -2 L366 101 L-12 105 Z", C.white)}${[0, 1, 2].map((r) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => `<rect x="${c * 32 + 18}" y="${r * 25 + 14}" width="20" height="13" rx="2" fill="none" stroke="${C.white}" stroke-width="1.2"/>`).join("")).join("")}</g>`,
        ) +
        arrow(355, 760, 355, 605, C.cyan, draw(2.7)) +
        reveal(
          t,
          3.6,
          label("key presses → information in", 360, 960, 27, C.cyan, "middle"),
        ) +
        reveal(
          t,
          6.5,
          label(
            "keyboard · mouse · microphone",
            360,
            1030,
            24,
            C.muted,
            "middle",
          ),
        )
      );
    case "cpu":
      return (
        reveal(t, 0.1, pill("input: hello", 242, 370)) +
        arrow(360, 450, 360, 540, C.pink, draw(1.1)) +
        reveal(t, 2, chip(295, 570)) +
        reveal(
          t,
          3.6,
          label("runs the app's instructions", 360, 790, 27, C.pink, "middle"),
        ) +
        arrow(360, 815, 360, 870, C.cyan, draw(4.7)) +
        reveal(t, 5.7, laptop(274, 900, "hello", C.cyan, 0.95))
      );
    case "ram": {
      const powerOff = at(2, duration - 3) + 0.6;
      const off = t > powerOff;
      return (
        reveal(t, 0.1, chip(105, 430)) +
        reveal(t, 1.4, ram(425, 445, !off)) +
        arrow(258, 490, 405, 490, C.yellow, draw(2.2)) +
        reveal(
          t,
          3.1,
          label("data in use right now", 360, 740, 32, C.yellow, "middle"),
        ) +
        reveal(
          t,
          at(1, 4.6),
          label("TEMPORARY", 360, 820, 35, C.pink, "middle"),
        ) +
        reveal(
          t,
          powerOff,
          `<circle cx="145" cy="930" r="27" fill="none" stroke="${C.muted}" stroke-width="2"/>${line("M145 895 L145 930", C.pink)}${label("power off → contents lost", 205, 941, 26, C.pink)}`,
        )
      );
    }
    case "storage":
      return (
        reveal(t, 0.1, ram(75, 430)) +
        reveal(t, 1.6, disk(460, 430)) +
        arrow(260, 483, 440, 483, C.green, draw(2.7)) +
        reveal(t, 3.5, label("SAVE", 348, 458, 27, C.green, "middle")) +
        reveal(
          t,
          at(1, 4.6),
          label("PERSISTENT", 360, 790, 36, C.green, "middle"),
        ) +
        reveal(
          t,
          at(1, 6.4) + 0.6,
          label(
            "power off? saved files stay.",
            360,
            900,
            28,
            C.green,
            "middle",
          ),
        ) +
        reveal(
          t,
          7.5,
          line("M286 970 L316 1000 L389 930", C.green, draw(7.5), 4),
        )
      );
    case "network": {
      const travel = ((t - 3) % 2) / 2;
      return (
        reveal(t, 0.1, laptop(64, 440, "send", C.cyan, 1.1)) +
        reveal(t, 1.4, phone(520, 427, t > at(2, 5) ? "hello!" : "")) +
        arrow(296, 504, 493, 504, C.cyan, draw(2.5)) +
        (t > 3
          ? `<circle cx="${302 + travel * 170}" cy="500" r="7" fill="${C.yellow}"/>`
          : "") +
        reveal(
          t,
          3.4,
          label(
            "network = data between devices",
            360,
            750,
            27,
            C.cyan,
            "middle",
          ),
        ) +
        reveal(t, at(2, 6), label("OUTPUT", 360, 875, 34, C.pink, "middle")) +
        reveal(
          t,
          7,
          label("information you can see", 360, 940, 27, C.white, "middle"),
        )
      );
    }
    case "recap":
      return [
        ["INPUT", "brings information in", C.cyan],
        ["CPU", "processes instructions", C.pink],
        ["RAM", "holds working data", C.yellow],
        ["STORAGE", "keeps saved files", C.green],
        ["NETWORK", "shares information", C.cyan],
      ]
        .map(([name, desc, color], i) =>
          reveal(
            t,
            at(i, 0.15 + i * 1.45),
            `<circle cx="95" cy="${410 + i * 130}" r="22" fill="none" stroke="${color}" stroke-width="2"/>${type(i + 1, 95, 418 + i * 130, 22, color, "middle")}${label(name, 145, 415 + i * 130, 29, color)}${type(desc, 145, 455 + i * 130, 25, C.white)}`,
          ),
        )
        .join("");
    case "check":
      return (
        reveal(
          t,
          0.2,
          label("What holds a program's", 360, 430, 30, C.white, "middle") +
            label("working data right now?", 360, 485, 30, C.white, "middle"),
        ) +
        reveal(t, 1.4, ram(95, 590, true) + disk(455, 570)) +
        reveal(
          t,
          at(1, 4.5),
          line("M100 820 Q195 845 283 815", C.yellow, draw(at(1, 4.5)), 4) +
            label("RAM ✓", 360, 910, 43, C.yellow, "middle"),
        ) +
        reveal(
          t,
          at(2, 6.5),
          type("Try it: open Task Manager.", 360, 1000, 27, C.white, "middle"),
        )
      );
    default:
      throw Error("Unknown scene " + id);
  }
}

const narrationPath = path.join(scratch, "narration.json");
const narration = fs.existsSync(narrationPath)
  ? JSON.parse(fs.readFileSync(narrationPath, "utf8"))
  : null;
const scenes = [];
let total = 0;
for (const scene of story.scenes) {
  const audio = path.join(scratch, "audio", scene.id + ".wav");
  const seconds = Number(
    execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "csv=p=0",
        audio,
      ],
      { encoding: "utf8" },
    ).trim(),
  );
  const duration = Math.ceil(Math.max(8, seconds + 1.0) * fps) / fps;
  const exact = narration?.scenes.find((s) => s.id === scene.id);
  scenes.push({
    ...scene,
    sentenceCues:
      exact && Math.abs(exact.duration - seconds) < 0.05 ? exact.cues : null,
    audio,
    voiceDuration: seconds,
    duration,
    start: total,
  });
  total += duration;
}
const timecode = (time) =>
  new Date(Math.round(time * 1000)).toISOString().slice(11, 23);
const cues = [];
for (const s of scenes) {
  if (s.sentenceCues) {
    for (const cue of s.sentenceCues)
      cues.push({
        ...cue,
        start: s.start + 0.35 + cue.start,
        end: s.start + 0.35 + cue.end,
      });
    continue;
  }
  const sentences = s.narration
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
    .map((x) => x.trim());
  const weight = sentences.reduce((n, x) => n + x.length, 0);
  let cursor = s.start + 0.35;
  for (const text of sentences) {
    const length = (s.voiceDuration * text.length) / weight;
    cues.push({ start: cursor, end: cursor + length, text });
    cursor += length;
  }
}
fs.writeFileSync(
  path.join(output, "what-is-ict.vtt"),
  "WEBVTT\n\n" +
    cues
      .map(
        (c, i) =>
          `${i + 1}\n${timecode(c.start)} --> ${timecode(c.end)}\n${c.text}\n`,
      )
      .join("\n"),
);
fs.writeFileSync(
  path.join(output, "what-is-ict.chapters.vtt"),
  "WEBVTT\n\n" +
    scenes
      .map(
        (s) =>
          `${timecode(s.start)} --> ${timecode(s.start + s.duration)}\n${s.title}\n`,
      )
      .join("\n"),
);
fs.writeFileSync(
  path.join(scratch, "timing.json"),
  JSON.stringify(
    {
      duration: total,
      scenes: scenes.map((s) => ({
        id: s.id,
        title: s.title,
        narration: s.narration,
        voiceDuration: s.voiceDuration,
        duration: s.duration,
        start: s.start,
      })),
    },
    null,
    2,
  ),
);

function frame(scene, index, t, absolute) {
  const title = titles[index];
  const cue = cues.find((c) => absolute >= c.start && absolute < c.end);
  const captions = cue ? wrap(cue.text, 48) : [];
  const fade = Math.min(1, t / 0.25, (scene.duration - t) / 0.25);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 720 1280"><rect width="720" height="1280" fill="${C.bg}"/><defs><pattern id="grain" width="37" height="41" patternUnits="userSpaceOnUse"><circle cx="7" cy="9" r=".65" fill="#b9c9b9" opacity=".065"/><circle cx="29" cy="28" r=".5" fill="#b9c9b9" opacity=".045"/></pattern></defs><rect width="720" height="1280" fill="url(#grain)"/>${type("LEARNBLOG ACADEMY", 54, 56, 18, C.muted)}${type(`${String(index + 1).padStart(2, "0")} / 08`, 666, 56, 18, C.muted, "end")}<g opacity="${clamp(fade)}">${label(title[0], 54, 155, 45, C.white)}${label(title[1], 54, 222, 49, index === 0 ? C.cyan : C.pink)}${line("M55 249 Q275 255 661 245", C.cyan, clamp(t / 0.8), 2)}${type(scene.title, 54, 299, 24, C.muted)}${artwork(scene.id, t, scene.duration, scene)}</g><rect x="34" y="1090" width="652" height="132" rx="12" fill="#151e19"/>${captions.map((text, i) => type(text, 360, 1126 + i * 29, 23, C.white, "middle")).join("")}${type("WHAT IS ICT?", 54, 1252, 16, C.muted)}${type("chiar.dev", 666, 1252, 16, C.muted, "end")}<rect x="0" y="1275" width="720" height="5" fill="#25332b"/><rect x="0" y="1275" width="${(720 * absolute) / total}" height="5" fill="${C.cyan}"/></svg>`;
}

if (process.argv.includes("--preview")) {
  const thumbs = await Promise.all(
    scenes.map(async (scene, i) => ({
      input: await sharp(
        Buffer.from(
          frame(
            scene,
            i,
            scene.duration - 1.5,
            scene.start + scene.duration - 1.5,
          ),
        ),
      )
        .resize(270, 480)
        .png()
        .toBuffer(),
      left: (i % 4) * 270,
      top: Math.floor(i / 4) * 480,
    })),
  );
  await sharp({
    create: { width: 1080, height: 960, channels: 3, background: C.bg },
  })
    .composite(thumbs)
    .png()
    .toFile(path.join(scratch, "preview.png"));
  console.log("Saved storyboard preview.");
  process.exit(0);
}

const videoPath = path.join(scratch, "silent.mp4");
const encoder = spawn(
  "ffmpeg",
  [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-f",
    "image2pipe",
    "-vcodec",
    "png",
    "-framerate",
    String(fps),
    "-i",
    "pipe:0",
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    "18",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    videoPath,
  ],
  { stdio: ["pipe", "inherit", "inherit"] },
);
const encoderDone = once(encoder, "close");
encoder.stdin.on("error", (e) => {
  if (e.code !== "EPIPE") throw e;
});
for (let i = 0; i < scenes.length; i++) {
  const scene = scenes[i];
  console.log(
    `Rendering ${i + 1}/${scenes.length}: ${scene.id} (${scene.duration.toFixed(1)}s)`,
  );
  const count = Math.round(scene.duration * fps);
  // Rasterize independent frames concurrently, then send them in timeline order.
  for (let start = 0; start < count; start += 6) {
    const frames = await Promise.all(
      Array.from({ length: Math.min(6, count - start) }, (_, offset) => {
        const t = (start + offset) / fps;
        return sharp(Buffer.from(frame(scene, i, t, scene.start + t)))
          .png({ compressionLevel: 1 })
          .toBuffer();
      }),
    );
    for (const png of frames) {
      if (!encoder.stdin.write(png)) await once(encoder.stdin, "drain");
    }
  }
}
encoder.stdin.end();
const [code] = await encoderDone;
if (code !== 0) throw Error("Video encoding failed: " + code);

// Quiet original plucked tones over a slowly changing pad, generated mathematically.
const rate = 48000,
  samples = Math.ceil(total * rate),
  music = Buffer.alloc(44 + samples * 2);
music.write("RIFF", 0);
music.writeUInt32LE(music.length - 8, 4);
music.write("WAVEfmt ", 8);
music.writeUInt32LE(16, 16);
music.writeUInt16LE(1, 20);
music.writeUInt16LE(1, 22);
music.writeUInt32LE(rate, 24);
music.writeUInt32LE(rate * 2, 28);
music.writeUInt16LE(2, 32);
music.writeUInt16LE(16, 34);
music.write("data", 36);
music.writeUInt32LE(samples * 2, 40);
const chords = [
  [130.81, 164.81, 196],
  [110, 130.81, 164.81],
  [87.31, 110, 130.81],
  [98, 123.47, 146.83],
];
for (let n = 0; n < samples; n++) {
  const t = n / rate,
    notes = chords[Math.floor(t / 8) % chords.length];
  const edge = Math.min(1, t / 3, (total - t) / 3),
    phase = t % 2;
  const pad =
    notes.reduce((sum, f) => sum + Math.sin(2 * Math.PI * f * t), 0) / 3;
  const pluck =
    Math.sin(2 * Math.PI * notes[Math.floor(t / 2) % 3] * 2 * t) *
    Math.exp(-phase * 4);
  const sample = edge * (0.012 * pad + 0.018 * pluck);
  music.writeInt16LE(Math.round(sample * 32767), 44 + n * 2);
}
fs.writeFileSync(path.join(scratch, "music.wav"), music);
const inputs = scenes.flatMap((s) => ["-i", s.audio]);
const musicIndex = scenes.length + 1;
const filters = scenes.map(
  (s, i) =>
    `[${i + 1}:a]aresample=48000,aformat=channel_layouts=mono,adelay=${Math.round((s.start + 0.35) * 1000)}:all=1[v${i}]`,
);
filters.push(`[${musicIndex}:a]volume=0.45[bed]`);
filters.push(
  `${scenes.map((_, i) => `[v${i}]`).join("")}[bed]amix=inputs=${scenes.length + 1}:duration=longest:normalize=0,loudnorm=I=-18:TP=-2:LRA=7,aresample=48000,alimiter=limit=0.90:level=false[a]`,
);
execFileSync(
  "ffmpeg",
  [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    videoPath,
    ...inputs,
    "-i",
    path.join(scratch, "music.wav"),
    "-filter_complex",
    filters.join(";"),
    "-map",
    "0:v",
    "-map",
    "[a]",
    "-t",
    String(total),
    "-c:v",
    "copy",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-movflags",
    "+faststart",
    path.join(output, "what-is-ict.mp4"),
  ],
  { stdio: "inherit" },
);
await sharp(Buffer.from(frame(scenes[0], 0, 5, 5)))
  .webp({ quality: 90 })
  .toFile(path.join(output, "what-is-ict-poster.webp"));
fs.mkdirSync(published, { recursive: true });
for (const file of [
  "what-is-ict.mp4",
  "what-is-ict-poster.webp",
  "what-is-ict.vtt",
  "what-is-ict.chapters.vtt",
]) {
  fs.copyFileSync(path.join(output, file), path.join(published, file));
}
console.log(
  `Created ${total.toFixed(2)}s video, original music, captions and poster in ${published}`,
);
