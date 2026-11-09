"use client";

import { Film, Volume2 } from "lucide-react";
import { useSiteLanguage } from "@/components/ui/language-provider";
import germanIntroduction from "@/lib/ict-introduction.de.json";
import englishIntroduction from "@/lib/ict-introduction.json";

export function IctIntroductionVideo() {
  const { language, text } = useSiteLanguage();
  const introduction =
    language === "de" ? germanIntroduction : englishIntroduction;
  return (
    <section
      aria-labelledby="ict-video-title"
      className="mt-8 overflow-hidden rounded-xl border border-[var(--border)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            <Film size={15} aria-hidden="true" />{" "}
            {text("Visual lesson", "Visuelle Lektion")}
          </p>
          <h3 id="ict-video-title" className="mt-2 text-lg font-semibold">
            {text("Watch:", "Ansehen:")} {introduction.title}
          </h3>
        </div>
        <span className="inline-flex items-center gap-2 text-xs text-[var(--muted)]">
          <Volume2 size={15} aria-hidden="true" />{" "}
          {text("English narration + music", "Englische Stimme + Musik")}
        </span>
      </div>

      <div className="bg-[#0b100e] px-3 py-5 sm:px-6">
        <video
          className="mx-auto aspect-[9/16] w-full max-w-[380px] rounded-lg"
          lang="en"
          controls
          playsInline
          preload="none"
          width={1080}
          height={1920}
          poster="/media/lessons/what-is-ict-poster.webp?v=2"
          aria-label="What is ICT? Animated blackboard lesson with English narration and captions"
          aria-describedby="ict-video-description"
        >
          <source src="/media/lessons/what-is-ict.mp4?v=2" type="video/mp4" />
          <track
            kind="captions"
            src="/media/lessons/what-is-ict.vtt?v=2"
            srcLang="en"
            label="English"
          />
          <track
            kind="chapters"
            src="/media/lessons/what-is-ict.chapters.vtt?v=2"
            srcLang="en"
            label="Lesson chapters"
          />
          <p>
            {text(
              "Your browser cannot play this video. Read the transcript below or",
              "Dein Browser kann das Video nicht abspielen. Lies den Text unten oder",
            )}{" "}
            <a href="/media/lessons/what-is-ict.mp4?v=2">
              {text("open the MP4", "öffne die MP4-Datei")}
            </a>
            .
          </p>
        </video>
      </div>

      <div className="space-y-4 px-5 py-5">
        <p
          id="ict-video-description"
          className="text-sm leading-7 text-[var(--muted)]"
        >
          {introduction.description}{" "}
          {text(
            "Press play when you are ready. Original diagrams, English neural narration, quiet music and on-screen English captions.",
            "Starte das Video, wenn du bereit bist. Eigene Diagramme, englische Stimme, leise Musik und eingeblendete englische Untertitel. Der Begleittext unten ist auf Deutsch.",
          )}
        </p>
        <details className="rounded-lg border border-[var(--border)] px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium">
            {text("Read the transcript", "Begleittext lesen")}
          </summary>
          <ol className="mt-4 space-y-4">
            {introduction.scenes.map((scene) => (
              <li key={scene.id}>
                <h4 className="text-sm font-semibold">{scene.title}</h4>
                <p className="mt-1 text-sm leading-7 text-[var(--muted)]">
                  {scene.narration}
                </p>
              </li>
            ))}
          </ol>
        </details>
        <a
          href="/media/lessons/what-is-ict.mp4?v=2"
          download="what-is-ict.mp4"
          className="inline-flex text-sm font-medium text-[var(--accent)] underline underline-offset-4"
        >
          {text("Download the video", "Video herunterladen")}
        </a>
      </div>
    </section>
  );
}
