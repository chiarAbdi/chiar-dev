"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  Clock3,
} from "lucide-react";
import { AcademyShell, Local, useAcademyLanguage } from "./academy-shell";
import { extraLessons } from "@/lib/academy-extra";
import { t } from "@/lib/academy";

export function ExtraLessonPage({ slug }: { slug: string }) {
  const lesson = extraLessons.find((x) => x.slug === slug);
  if (!lesson)
    return (
      <AcademyShell>
        <p>Lesson not found.</p>
      </AcademyShell>
    );
  return (
    <AcademyShell>
      <div className="mb-8">
        <Link
          href="/learn/discrete-math"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)]"
        >
          <ArrowLeft size={16} />
          <Local text={t("Back to course", "Zurück zum Kurs")} />
        </Link>
      </div>
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
        <Local
          text={t(
            "Discrete mathematics · Interactive lesson",
            "Diskrete Mathematik · Interaktive Lektion",
          )}
        />
      </p>
      <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
        <Local text={lesson.title} />
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
        <Local text={lesson.subtitle} />
      </p>
      <div className="mt-6 flex items-center gap-2 text-sm text-[var(--muted)]">
        <Clock3 size={16} />
        {lesson.duration}
        <span className="mx-2">·</span>
        <BookOpen size={16} />
        {lesson.sections.length} <Local text={t("topics", "Themen")} />
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="space-y-6">
          {lesson.sections.map((section, i) => (
            <section
              key={i}
              id={`topic-${i + 1}`}
              className="surface-card p-6 sm:p-9"
            >
              <p className="font-mono text-xs text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(lesson.sections.length).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                <Local text={section.title} />
              </h2>
              {section.paragraphs.map((paragraph, j) => (
                <p key={j} className="mt-5 leading-8 text-[var(--muted)]">
                  <Local text={paragraph} />
                </p>
              ))}
              <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--accent-soft)] p-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  <Local text={t("Worked example", "Beispiel")} />
                </p>
                <p className="leading-7">
                  <Local text={section.example} />
                </p>
              </div>
              <div className="mt-5 flex gap-3 text-sm leading-7">
                <CheckCircle2
                  className="mt-1 shrink-0 text-[var(--accent)]"
                  size={18}
                />
                <Local text={section.takeaway} />
              </div>
            </section>
          ))}
          <LessonQuiz key={lesson.slug} lesson={lesson} />
          <Link
            href="/learn/discrete-math"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-5 py-3 text-sm"
          >
            <Local
              text={t("Explore other lessons", "Weitere Lektionen entdecken")}
            />
            <ArrowRight size={16} />
          </Link>
        </div>
        <aside className="hidden lg:block">
          <div className="surface-card sticky top-24 p-5">
            <p className="mb-4 font-mono text-xs text-[var(--accent)]">
              <Local text={t("ON THIS PAGE", "AUF DIESER SEITE")} />
            </p>
            <nav className="flex flex-col gap-3 text-sm text-[var(--muted)]">
              {lesson.sections.map((s, i) => (
                <a
                  key={i}
                  href={`#topic-${i + 1}`}
                  className="hover:text-[var(--accent)]"
                >
                  <Local text={s.title} />
                </a>
              ))}
              <a href="#practice" className="hover:text-[var(--accent)]">
                <Local text={t("Practice quiz", "Übungsquiz")} />
              </a>
            </nav>
          </div>
        </aside>
      </div>
    </AcademyShell>
  );
}

type Lesson = (typeof extraLessons)[number];
function LessonQuiz({ lesson }: { lesson: Lesson }) {
  const { language } = useAcademyLanguage();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const question = lesson.exercises[index];
  const selected = answers[index];
  const score = lesson.exercises.filter(
    (q, i) => answers[i] === q.answer,
  ).length;
  function reset() {
    setIndex(0);
    setAnswers({});
    setFinished(false);
  }
  return (
    <section id="practice" className="surface-card p-6 sm:p-9">
      <p className="mb-2 font-mono text-xs text-[var(--accent)]">
        <Local text={t("ORIGINAL PRACTICE QUESTIONS", "EIGENE ÜBUNGSFRAGEN")} />
      </p>
      <h2 className="mb-7 text-2xl font-semibold">
        <Local text={t("Test your understanding", "Teste dein Wissen")} />
      </h2>
      {finished ? (
        <div className="py-7 text-center">
          <CheckCircle2 className="mx-auto text-[var(--accent)]" size={42} />
          <p className="mt-5 text-4xl font-bold">
            {score}/{lesson.exercises.length}
          </p>
          <p className="mt-3 text-[var(--muted)]">
            <Local
              text={t(
                "Review the lesson and try again whenever you like.",
                "Wiederhole die Lektion und versuche es erneut.",
              )}
            />
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-[#0b1020]"
          >
            <RotateCcw size={16} />
            <Local text={t("Try again", "Erneut versuchen")} />
          </button>
        </div>
      ) : (
        <>
          <div className="mb-5 flex justify-between text-xs text-[var(--muted)]">
            <span>
              <Local text={t("Question", "Frage")} /> {index + 1}/
              {lesson.exercises.length}
            </span>
            <span>{Math.round((index / lesson.exercises.length) * 100)}%</span>
          </div>
          <div className="mb-7 h-1.5 rounded-full bg-[var(--border)]">
            <div
              className="h-full rounded-full bg-[var(--accent)]"
              style={{ width: `${(index / lesson.exercises.length) * 100}%` }}
            />
          </div>
          <h3 className="mb-6 text-xl font-semibold">
            {question.question[language]}
          </h3>
          <div className="grid gap-3">
            {question.options.map((option, i) => {
              const answered = selected !== undefined;
              return (
                <button
                  type="button"
                  key={i}
                  disabled={answered}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [index]: i }))
                  }
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left text-sm transition ${answered && i === question.answer ? "border-emerald-500 bg-emerald-500/10" : answered && i === selected ? "border-rose-500 bg-rose-500/10" : "border-[var(--border)] hover:border-[var(--accent)]"}`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface)] font-mono font-semibold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{option[language]}</span>
                </button>
              );
            })}
          </div>
          {selected !== undefined && (
            <div
              role="status"
              className="mt-6 rounded-xl bg-[var(--accent-soft)] p-5"
            >
              <p className="font-semibold">
                {selected === question.answer
                  ? language === "en"
                    ? "Correct!"
                    : "Richtig!"
                  : language === "en"
                    ? "Not quite"
                    : "Nicht ganz"}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                {question.explanation[language]}
              </p>
            </div>
          )}
          <div className="mt-7 flex justify-between gap-3">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => setIndex((i) => i - 1)}
              className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm disabled:opacity-30"
            >
              <Local text={t("Previous", "Zurück")} />
            </button>
            <button
              type="button"
              disabled={selected === undefined}
              onClick={() =>
                index === lesson.exercises.length - 1
                  ? setFinished(true)
                  : setIndex((i) => i + 1)
              }
              className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1020] disabled:opacity-40"
            >
              <Local
                text={
                  index === lesson.exercises.length - 1
                    ? t("Finish", "Abschließen")
                    : t("Next", "Weiter")
                }
              />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
