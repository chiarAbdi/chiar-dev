"use client";

import { useEffect, useRef, useState } from "react";
import { useSiteLanguage } from "@/components/ui/language-provider";
import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

export function QuietBackground({ children }: { children: ReactNode }) {
  const { text } = useSiteLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion === null) return;
    if (reducedMotion) video.pause();
    else void video.play().catch(() => {});
    return () => video.pause();
  }, [reducedMotion]);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    setNotice("");
    if (!video.paused) {
      video.pause();
      return;
    }
    try {
      await video.play();
    } catch {
      setNotice(
        text(
          "Playback is unavailable. You can still explore the page below.",
          "Die Wiedergabe ist nicht verfügbar. Du kannst die Seite trotzdem erkunden.",
        ),
      );
    }
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    setNotice("");
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setNotice(
        text(
          "Music could not start. Please try again.",
          "Die Musik konnte nicht gestartet werden. Bitte erneut versuchen.",
        ),
      );
    }
  }

  return (
    <section
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[#0a111a] text-white sm:rounded-[36px]"
    >
      <video
        ref={videoRef}
        aria-hidden="true"
        tabIndex={-1}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/about/workspace-poster.webp"
        width={1920}
        height={1080}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center] opacity-65 lg:opacity-90"
      >
        <source src="/media/about/workspace-loop.mp4" type="video/mp4" />
      </video>
      <audio
        ref={audioRef}
        aria-hidden="true"
        preload="none"
        loop
        onPlay={() => setMusicOn(true)}
        onPause={() => setMusicOn(false)}
      >
        <source src="/media/about/workspace-ambient.m4a" type="audio/mp4" />
      </audio>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,17,26,0.97)_0%,rgba(10,17,26,0.87)_38%,rgba(10,17,26,0.26)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(10,17,26,0.95)_0%,transparent_35%)]" />

      {children}

      <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-5 sm:px-10 lg:px-14">
        <p className="text-xs text-slate-400">
          {text(
            "A quiet look at what I’m building.",
            "Ein ruhiger Blick auf meine Projekte.",
          )}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={
              playing
                ? text(
                    "Pause background animation",
                    "Hintergrundanimation pausieren",
                  )
                : text(
                    "Play background animation",
                    "Hintergrundanimation abspielen",
                  )
            }
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0a111a]/75 px-3.5 py-2 text-xs text-slate-200 transition-colors hover:border-white/35 focus-visible:outline-white"
          >
            {playing ? (
              <Pause size={13} aria-hidden="true" />
            ) : (
              <Play size={13} aria-hidden="true" />
            )}
            {playing
              ? text("Pause motion", "Pause")
              : text("Play motion", "Abspielen")}
          </button>
          <button
            type="button"
            onClick={toggleMusic}
            aria-pressed={musicOn}
            aria-label={
              musicOn
                ? text(
                    "Turn background music off",
                    "Hintergrundmusik ausschalten",
                  )
                : text(
                    "Turn background music on",
                    "Hintergrundmusik einschalten",
                  )
            }
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0a111a]/75 px-3.5 py-2 text-xs text-slate-200 transition-colors hover:border-white/35 focus-visible:outline-white"
          >
            {musicOn ? (
              <Volume2 size={13} aria-hidden="true" />
            ) : (
              <VolumeX size={13} aria-hidden="true" />
            )}
            {text("Music", "Musik")}{" "}
            {musicOn ? text("on", "an") : text("off", "aus")}
          </button>
        </div>
        {notice && (
          <p role="status" className="w-full text-xs text-slate-300">
            {notice}
          </p>
        )}
      </div>
    </section>
  );
}
