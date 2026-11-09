"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Languages,
  Network,
  Search,
  Sigma,
  Terminal,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";
import { useSiteLanguage } from "@/components/ui/language-provider";
import {
  useLearningProgress,
  readIctProgress,
} from "@/lib/use-learning-progress";
import { useLocalStorage } from "@/lib/use-local-storage";
import type { CourseSummary } from "@/lib/course-catalog";

const styles = {
  zero: {
    icon: Sigma,
    badge: "bg-blue-500/12 text-blue-500",
    bar: "bg-blue-500",
  },
  discrete: {
    icon: GraduationCap,
    badge: "bg-violet-500/12 text-violet-500",
    bar: "bg-violet-500",
  },
  ict: {
    icon: Network,
    badge: "bg-emerald-500/12 text-emerald-500",
    bar: "bg-emerald-500",
  },
};

export function LearningDashboard({ courses }: { courses: CourseSummary[] }) {
  const { language, text } = useSiteLanguage();
  const { completed } = useLearningProgress();
  const [ictRaw] = useLocalStorage("academy-ict-siz-v1");
  const [query, setQuery] = useState("");
  const ictDone = readIctProgress(
    ictRaw,
    courses.find((c) => c.id === "ict")?.lessonIds.length ?? 0,
  );
  const count = (course: CourseSummary) =>
    course.id === "ict"
      ? ictDone.length
      : course.lessonIds.filter((id) => completed.includes(id)).length;
  const total = courses.reduce((n, c) => n + c.lessonIds.length, 0);
  const done = courses.reduce((n, c) => n + count(c), 0);
  const continuing =
    courses.find((c) => count(c) > 0 && count(c) < c.lessonIds.length) ??
    courses[0];
  const visible = courses.filter((c) =>
    `${c.title.en} ${c.title.de} ${c.description[language]}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  const stats = [
    {
      label: text("Learning paths", "Lernpfade"),
      value: courses.length,
      detail: text("Choose your starting point", "Wähle deinen Einstieg"),
      icon: BookOpen,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      label: text("Guided lessons", "Geführte Lektionen"),
      value: total,
      detail: text("Across mathematics and IT", "In Mathematik und IT"),
      icon: GraduationCap,
      color: "text-violet-500 bg-violet-500/10",
    },
    {
      label: text("Lessons completed", "Abgeschlossene Lektionen"),
      value: `${done}/${total}`,
      detail: text("Saved in this browser", "In diesem Browser gespeichert"),
      icon: CheckCircle2,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      label: text("Your progress", "Dein Fortschritt"),
      value: `${Math.round((done / total) * 100)}%`,
      detail: text("One step at a time", "Schritt für Schritt"),
      icon: Languages,
      color: "text-amber-500 bg-amber-500/10",
    },
  ];
  return (
    <div id="top" className="container-main pb-20 pt-28 sm:pt-32">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <GraduationCap size={23} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold">LearnBlog Academy</p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              {text("Your learning space", "Dein Lernbereich")}
            </p>
          </div>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
        >
          {text(
            "Articles & visual lessons",
            "Erklärungen & visuelle Lektionen",
          )}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
            {text("Learning dashboard", "Lernübersicht")}
          </p>
          <h1 className="text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
            {text(
              "A little progress, every day.",
              "Jeden Tag einen Schritt weiter.",
            )}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">
            {text(
              "Choose a course, try an exercise and build your understanding at your own pace.",
              "Wähle einen Kurs, probiere eine Übung aus und lerne in deinem eigenen Tempo.",
            )}
          </p>
        </div>
        <Link
          href={
            count(continuing) > 0 ? continuing.href : continuing.firstLesson
          }
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1020]"
        >
          {done > 0
            ? text("Continue learning", "Weiterlernen")
            : text("Start learning", "Jetzt lernen")}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <dl className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <dt className="text-xs text-[var(--muted)]">{stat.label}</dt>
              <stat.icon
                size={29}
                className={`shrink-0 rounded-lg p-1.5 ${stat.color}`}
                aria-hidden="true"
              />
            </div>
            <dd className="mt-3 text-2xl font-semibold tracking-tight">
              {stat.value}
            </dd>
            <p className="mt-2 text-[11px] leading-5 text-[var(--muted)]">
              {stat.detail}
            </p>
          </div>
        ))}
      </dl>
      <section aria-labelledby="courses-title" className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="courses-title" className="text-xl font-semibold">
            {text("Choose your learning path", "Wähle deinen Lernpfad")}
          </h2>
          <label className="flex w-full max-w-xs items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
            <Search
              size={16}
              className="text-[var(--muted)]"
              aria-hidden="true"
            />
            <span className="sr-only">
              {text("Search courses", "Kurse suchen")}
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={text("Search courses…", "Kurse suchen…")}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </label>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((course) => {
            const style = styles[course.id],
              Icon = style.icon,
              finished = count(course),
              progress = Math.round((finished / course.lessonIds.length) * 100);
            return (
              <article
                key={course.id}
                className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent)]/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.badge}`}
                  >
                    <Icon size={25} aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-[10px] text-[var(--muted)]">
                    EN / DE
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {course.title[language]}
                </h3>
                <p className="mt-2 text-xs font-medium text-[var(--accent)]">
                  {course.level[language]}
                </p>
                <p className="mt-4 flex-1 text-sm leading-7 text-[var(--muted)]">
                  {course.description[language]}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {course.topics.map((topic) => (
                    <li
                      key={topic.en}
                      className="rounded-md bg-[var(--background)] px-2 py-1 text-[10px] text-[var(--muted)]"
                    >
                      {topic[language]}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <div className="mb-2 flex justify-between gap-2 text-xs text-[var(--muted)]">
                    <span>
                      {finished} / {course.lessonIds.length}{" "}
                      {text("completed", "abgeschlossen")}
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div
                    role="progressbar"
                    aria-label={course.title[language]}
                    aria-valuenow={finished}
                    aria-valuemin={0}
                    aria-valuemax={course.lessonIds.length}
                    className="h-1.5 overflow-hidden rounded-full bg-[var(--border)]"
                  >
                    <div
                      className={`h-full rounded-full ${style.bar}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <Link
                  href={course.href}
                  className="mt-6 inline-flex items-center justify-between rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium transition-colors group-hover:border-[var(--accent)]/40"
                >
                  {finished > 0
                    ? text("Continue course", "Kurs fortsetzen")
                    : text("Explore course", "Kurs entdecken")}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
        {visible.length === 0 && (
          <p
            role="status"
            className="mt-6 rounded-xl border border-[var(--border)] p-6 text-sm text-[var(--muted)]"
          >
            {text(
              "No course matches your search. Try mathematics or ICT.",
              "Kein passender Kurs. Versuche Mathematik oder ICT.",
            )}
          </p>
        )}
      </section>
      <section
        aria-labelledby="quick-actions"
        className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
      >
        <h2 id="quick-actions" className="text-sm font-semibold">
          {text("A different way to learn", "Anders lernen")}
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            {
              href: "/learn/discrete-math/logic",
              icon: Terminal,
              label: text(
                "Try the interactive truth table",
                "Interaktive Wahrheitstabelle",
              ),
            },
            {
              href: "/learn/ict-siz",
              icon: PlayCircle,
              label: text(
                "Explore ICT & its visual lesson",
                "ICT und die visuelle Lektion entdecken",
              ),
            },
            {
              href: "/blog",
              icon: BookOpen,
              label: text("Browse explanations", "Erklärungen entdecken"),
            },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-xs text-[var(--muted)] hover:text-[var(--accent)]"
            >
              <action.icon size={15} aria-hidden="true" />
              {action.label}
            </Link>
          ))}
        </div>
      </section>
      <p className="mt-6 flex items-start gap-2 text-xs leading-6 text-[var(--muted)]">
        <ShieldCheck size={16} className="mt-1 shrink-0" aria-hidden="true" />
        {text(
          "Your progress stays in this browser. Guided math quizzes count when finished; ICT lessons count when you mark them complete. No account or cloud sync.",
          "Dein Fortschritt bleibt in diesem Browser. Mathelektionen zählen nach Abschluss des Quiz, ICT-Lektionen nach dem Markieren als abgeschlossen. Kein Konto und keine Cloud-Synchronisation.",
        )}
      </p>
    </div>
  );
}
