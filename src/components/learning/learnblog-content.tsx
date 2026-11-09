"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Braces,
  GraduationCap,
  Network,
  PlayCircle,
  Sigma,
} from "lucide-react";
import { useSiteLanguage } from "@/components/ui/language-provider";
import type { CourseSummary } from "@/lib/course-catalog";

export function LearnBlogContent({ courses }: { courses: CourseSummary[] }) {
  const { language, text } = useSiteLanguage();
  const guides = [
    {
      href: "/learn/discrete-math/logic",
      title: text("Logic you can interact with", "Logik zum Ausprobieren"),
      description: text(
        "Change P and Q, follow a truth table and check your understanding.",
        "Ändere P und Q, untersuche eine Wahrheitstabelle und teste dein Verständnis.",
      ),
      label: text("Interactive explanation", "Interaktive Erklärung"),
      icon: Braces,
    },
    {
      href: "/learn/discrete-math/proofs",
      title: text(
        "How mathematical proofs work",
        "Wie mathematische Beweise funktionieren",
      ),
      description: text(
        "Get familiar with direct proofs, contradiction and induction.",
        "Lerne direkte Beweise, Widerspruch und vollständige Induktion kennen.",
      ),
      label: text("Worked examples", "Erklärte Beispiele"),
      icon: GraduationCap,
    },
    {
      href: "/learn/discrete-math/graphs",
      title: text("Thinking in graphs", "In Graphen denken"),
      description: text(
        "Explore vertices, edges, paths and trees through an introductory lesson.",
        "Entdecke Knoten, Kanten, Wege und Bäume in einer einführenden Lektion.",
      ),
      label: text("Computer science foundations", "Grundlagen der Informatik"),
      icon: Network,
    },
  ];
  return (
    <div id="top" className="container-main pb-20 pt-28 sm:pt-36">
      <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
            LearnBlog
          </p>
          <h1 className="text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
            {text("Learn it.", "Verstehen.")}
            <br />
            <span className="gradient-text">
              {text("Make it click.", "Ausprobieren.")}
            </span>
          </h1>
          <p className="mt-6 max-w-xl leading-8 text-[var(--muted)]">
            {text(
              "Clear explanations, practical examples and visual lessons. Explore an idea here, then put it into practice in the Academy.",
              "Klare Erklärungen, praktische Beispiele und visuelle Lektionen. Entdecke hier eine Idee und vertiefe sie anschließend in der Academy.",
            )}
          </p>
          <Link
            href="/learn"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1020]"
          >
            {text("Open learning dashboard", "Lernübersicht öffnen")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <BookOpen
            className="text-[var(--accent)]"
            size={25}
            aria-hidden="true"
          />
          <h2 className="mt-5 text-xl font-semibold">
            {text(
              "Your own pace. Your next idea.",
              "Dein Tempo. Deine nächste Idee.",
            )}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            {text(
              "Start with the basics or choose a topic that catches your interest. The courses combine explanations, quizzes and independent practice.",
              "Beginne bei den Grundlagen oder wähle ein Thema, das dich interessiert. Die Kurse verbinden Erklärungen, Quizfragen und selbstständiges Üben.",
            )}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              text("English & German", "Englisch & Deutsch"),
              text("No account needed", "Ohne Konto"),
            ].map((label) => (
              <span
                key={label}
                className="rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs text-[var(--accent)]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <section
        aria-labelledby="visual-lesson"
        className="mt-14 grid overflow-hidden rounded-2xl border border-[var(--border)] bg-[#0b100e] text-white md:grid-cols-[.7fr_1.3fr]"
      >
        <div className="relative flex min-h-60 items-center justify-center border-b border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(115,215,209,0.12),transparent_70%)] md:border-b-0 md:border-r">
          <div className="text-center">
            <div className="flex gap-5 font-mono text-6xl">
              <span className="text-[#73d7d1]">I</span>
              <span className="text-[#ef8aa9]">C</span>
              <span className="text-[#e6cd78]">T</span>
            </div>
            <div className="mx-auto mt-5 h-px w-40 bg-[#73d7d1]/50" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-slate-400">
              Information · Communication · Technology
            </p>
          </div>
        </div>
        <div className="p-7 sm:p-9">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-[#73d7d1]">
            <PlayCircle size={16} aria-hidden="true" />
            {text(
              "Visual lesson · 84 seconds",
              "Visuelle Lektion · 84 Sekunden",
            )}
          </p>
          <h2
            id="visual-lesson"
            className="mt-4 text-3xl font-semibold tracking-tight"
          >
            {text("What is ICT?", "Was ist ICT?")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            {text(
              "Follow a message from keyboard input to processing, memory, storage and a network. An original animated blackboard explanation with music and English narration.",
              "Verfolge eine Nachricht von der Tastatureingabe über Verarbeitung, Arbeitsspeicher und Datenspeicher bis ins Netzwerk. Eine eigene animierte Tafel-Erklärung mit Musik und englischer Stimme.",
            )}
          </p>
          <Link
            href="/learn/ict-siz"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#73d7d1]"
          >
            {text("Open the ICT course", "ICT-Kurs öffnen")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section aria-labelledby="guides" className="mt-14">
        <h2 id="guides" className="text-2xl font-semibold tracking-tight">
          {text("Explanations to explore", "Erklärungen entdecken")}
        </h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent)]/50"
            >
              <guide.icon
                size={24}
                className="text-[var(--accent)]"
                aria-hidden="true"
              />
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                {guide.label}
              </p>
              <h3 className="mt-3 text-xl font-semibold">{guide.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {guide.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent)]">
                {text("Read and try it", "Lesen und ausprobieren")}
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section aria-labelledby="learning-paths" className="mt-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2
            id="learning-paths"
            className="text-2xl font-semibold tracking-tight"
          >
            {text("Ready for a learning path?", "Bereit für einen Lernpfad?")}
          </h2>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent)]"
          >
            {text("All courses & progress", "Alle Kurse & Fortschritt")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-6 space-y-3">
          {courses.map((course, i) => (
            <Link
              key={course.id}
              href={course.href}
              className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)]/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                {i === 0 ? (
                  <Sigma size={22} />
                ) : i === 1 ? (
                  <GraduationCap size={22} />
                ) : (
                  <Network size={22} />
                )}
              </span>
              <div className="flex-1">
                <h3 className="font-semibold">{course.title[language]}</h3>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {course.lessonIds.length} {text("lessons", "Lektionen")} ·{" "}
                  {course.level[language]}
                </p>
              </div>
              <ArrowRight
                size={17}
                className="shrink-0 text-[var(--muted)]"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>
      <p className="mt-8 text-xs leading-6 text-[var(--muted)]">
        {text(
          "Independent educational material. Not an official BFH or SIZ course or examination bank.",
          "Unabhängiges Lernmaterial. Kein offizieller BFH- oder SIZ-Kurs und keine offizielle Prüfungssammlung.",
        )}
      </p>
    </div>
  );
}
