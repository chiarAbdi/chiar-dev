"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Clock3,
  Lightbulb,
} from "lucide-react";
import curriculum from "@/lib/academy-curriculum.json";
import { AcademyShell, Local, useAcademyLanguage } from "./academy-shell";
import { t } from "@/lib/academy";

type Course = "zero" | "discrete";
const data = curriculum;
const labels = {
  zero: t("Math from Zero", "Mathe von Null"),
  discrete: t("Discrete Mathematics", "Diskrete Mathematik"),
};

export function AcademyCourseCatalog({ course }: { course: Course }) {
  const lessons = data.filter((x) => x.course === course);
  const [search, setSearch] = useState("");
  const visible = lessons.filter((x) =>
    (x.titleEn + " " + x.titleDe + " " + x.conceptEn + " " + x.conceptDe)
      .toLowerCase()
      .includes(search.toLowerCase().trim()),
  );
  return (
    <AcademyShell>
      <Link
        href="/learn"
        className="mb-7 inline-flex items-center gap-2 text-sm text-[var(--muted)]"
      >
        <ArrowLeft size={16} />
        <Local text={t("All courses", "Alle Kurse")} />
      </Link>
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
        <Local
          text={t("Structured learning path", "Strukturierter Lernpfad")}
        />
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
        <Local text={labels[course]} />
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
        <Local
          text={
            course === "zero"
              ? t(
                  "Start with numbers and arithmetic, then build toward algebra, equations and functions. No prior knowledge assumed.",
                  "Beginne mit Zahlen und Grundrechenarten und lerne danach Algebra, Gleichungen und Funktionen. Keine Vorkenntnisse nötig.",
                )
              : t(
                  "A guided introduction to logic, sets, functions, proofs, combinatorics, number theory and graphs.",
                  "Ein geführter Einstieg in Logik, Mengen, Funktionen, Beweise, Kombinatorik, Zahlentheorie und Graphen.",
                )
          }
        />
      </p>
      <div className="mt-7 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
        <span className="rounded-full border border-[var(--border)] px-4 py-2">
          {lessons.length} <Local text={t("lessons", "Lektionen")} />
        </span>
        <span className="rounded-full border border-[var(--border)] px-4 py-2">
          <Local text={t("English / German", "Englisch / Deutsch")} />
        </span>
        <span className="rounded-full border border-[var(--border)] px-4 py-2">
          <Local text={t("120-minute study plans", "120-Minuten-Lernpläne")} />
        </span>
      </div>
      <div className="mt-9">
        <label
          htmlFor="academy-search"
          className="mb-2 block text-sm font-medium"
        >
          <Local text={t("Find a lesson", "Lektion suchen")} />
        </label>
        <input
          id="academy-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Logic, proofs, graphs, algebra…"
          className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
        />
        <p className="mt-2 text-xs text-[var(--muted)]">
          {visible.length} / {lessons.length}{" "}
          <Local text={t("lessons shown", "Lektionen angezeigt")} />
        </p>
      </div>
      \n{" "}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {visible.map((lesson) => (
          <Link
            key={lesson.slug}
            href={`/learn/${course === "zero" ? "math-from-zero" : "discrete-math"}/foundation/${lesson.slug}`}
            className="surface-card group p-6 transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
          >
            <p className="font-mono text-xs text-[var(--accent)]">
              <Local text={t("LESSON", "LEKTION")} />{" "}
              {String(lessons.indexOf(lesson) + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 text-xl font-semibold">
              {<Local text={t(lesson.titleEn, lesson.titleDe)} />}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              <Local text={t(lesson.conceptEn, lesson.conceptDe)} />
            </p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-[var(--muted)]">
                {lesson.questions.length}{" "}
                <Local text={t("practice questions", "Übungsfragen")} />
              </span>
              <ArrowRight size={18} className="text-[var(--accent)]" />
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-9 text-xs leading-6 text-[var(--muted)]">
        <Local
          text={t(
            "Independent original study material, not an official university syllabus. Study durations are suggested plans, not guaranteed content length.",
            "Unabhängiges eigenes Lernmaterial, kein offizieller Hochschullehrplan. Lernzeiten sind Vorschläge, keine garantierte Inhaltslänge.",
          )}
        />
      </p>
    </AcademyShell>
  );
}
export function AcademyFoundationLesson({
  course,
  slug,
}: {
  course: Course;
  slug: string;
}) {
  return (
    <AcademyShell>
      <FoundationLessonContent
        key={course + slug}
        course={course}
        slug={slug}
      />
    </AcademyShell>
  );
}

function FoundationLessonContent({
  course,
  slug,
}: {
  course: Course;
  slug: string;
}) {
  const { language } = useAcademyLanguage();
  const lessons = data.filter((x) => x.course === course);
  const index = lessons.findIndex((x) => x.slug === slug);
  const lesson = lessons[index];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [current, setCurrent] = useState(0);
  const [complete, setComplete] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [notes, setNotes] = useState("");
  const score =
    lesson?.questions.filter(
      (question, index) => answers[index] === question.answer,
    ).length ?? 0;
  if (!lesson)
    return (
      <>
        <p>
          <Local text={t("Lesson not found.", "Lektion nicht gefunden.")} />
        </p>
      </>
    );
  const url = (item: string) =>
    `/learn/${course === "zero" ? "math-from-zero" : "discrete-math"}/foundation/${item}`;
  const question = lesson.questions[current];
  const selected = answers[current];
  return (
    <>
      <Link
        href={
          course === "zero"
            ? "/learn/math-from-zero"
            : "/learn/discrete-math/foundation"
        }
        className="mb-7 inline-flex items-center gap-2 text-sm text-[var(--muted)]"
      >
        <ArrowLeft size={16} />
        <Local text={t("Back to lessons", "Zurück zu den Lektionen")} />
      </Link>
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
        <Local text={labels[course]} /> · {index + 1}/{lessons.length}
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
        <Local text={t(lesson.titleEn, lesson.titleDe)} />
      </h1>
      <p className="mt-5 max-w-3xl leading-8 text-[var(--muted)]">
        <Local
          text={t(
            "Learn the idea, study an example, practice independently, then test yourself.",
            "Verstehe die Idee, lerne am Beispiel, übe selbstständig und teste danach dein Wissen.",
          )}
        />
      </p>
      <div className="mt-8 surface-card p-6">
        <div className="flex items-center gap-2 font-semibold">
          <Clock3 size={18} className="text-[var(--accent)]" />
          <Local
            text={t(
              "Suggested 120-minute study session",
              "Vorgeschlagene 120-Minuten-Lerneinheit",
            )}
          />
        </div>
        <div className="mt-4 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
          {[
            t(
              "20 min · Read and paraphrase the concept",
              "20 Min. · Konzept lesen und erklären",
            ),
            t(
              "25 min · Rework the example by hand",
              "25 Min. · Beispiel selbst nachrechnen",
            ),
            t(
              "35 min · Guided variations and notes",
              "35 Min. · Varianten üben und Notizen",
            ),
            t("25 min · Eight-question quiz", "25 Min. · Quiz mit acht Fragen"),
            t(
              "15 min · Review mistakes and recap",
              "15 Min. · Fehler prüfen und zusammenfassen",
            ),
          ].map((x, i) => (
            <p key={i} className="rounded-lg border border-[var(--border)] p-3">
              <Local text={x} />
            </p>
          ))}
        </div>
        <p className="mt-4 text-xs text-[var(--muted)]">
          <Local
            text={t(
              "This is a study schedule including independent work, not two hours of reading material.",
              "Dies ist ein Lernplan mit selbstständiger Arbeit, nicht zwei Stunden Lesetext.",
            )}
          />
        </p>
      </div>
      <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="space-y-6">
          <section className="surface-card p-6 sm:p-9">
            <p className="font-mono text-xs text-[var(--accent)]">
              01 · <Local text={t("THE IDEA", "DIE IDEE")} />
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              <Local
                text={t(
                  "Understand it from first principles",
                  "Verstehe es von Grund auf",
                )}
              />
            </h2>
            <p className="mt-5 leading-8 text-[var(--muted)]">
              <Local text={t(lesson.conceptEn, lesson.conceptDe)} />
            </p>
            <p className="mt-5 leading-8 text-[var(--muted)]">
              <Local
                text={t(
                  "Before moving on, explain this idea in your own words. Which objects or quantities does the rule describe? Under what conditions does it apply?",
                  "Bevor du weitermachst, erkläre die Idee in eigenen Worten. Welche Objekte oder Größen beschreibt die Regel? Unter welchen Bedingungen gilt sie?",
                )}
              />
            </p>
          </section>
          <section className="surface-card p-6 sm:p-9">
            <p className="font-mono text-xs text-[var(--accent)]">
              02 · <Local text={t("WORKED EXAMPLE", "GELÖSTES BEISPIEL")} />
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              <Local text={t("See how it works", "So funktioniert es")} />
            </h2>
            <div className="mt-5 rounded-xl bg-[var(--accent-soft)] p-5 text-base leading-8">
              <Local text={t(lesson.exampleEn, lesson.exampleDe)} />
            </div>
            <p className="mt-5 leading-8 text-[var(--muted)]">
              <Local
                text={t(
                  "Copy the example onto paper. Mark each operation or logical step. Cover the solution and try to reproduce it without looking.",
                  "Schreibe das Beispiel auf Papier. Markiere jede Rechenoperation oder jeden logischen Schritt. Decke die Lösung ab und versuche, sie selbst zu finden.",
                )}
              />
            </p>
          </section>
          <section className="surface-card p-6 sm:p-9">
            <p className="font-mono text-xs text-[var(--accent)]">
              03 · <Local text={t("COMMON PITFALL", "HÄUFIGER FEHLER")} />
            </p>
            <div className="mt-4 flex gap-3">
              <Lightbulb className="shrink-0 text-[var(--accent)]" size={23} />
              <p className="leading-8">
                <Local text={t(lesson.mistakeEn, lesson.mistakeDe)} />
              </p>
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
              <Local
                text={t(
                  "Write one incorrect attempt and explain exactly why it fails. Explaining an error is part of understanding the rule.",
                  "Schreibe einen falschen Lösungsversuch auf und erkläre genau, warum er scheitert. Fehler zu erklären gehört zum Verständnis der Regel.",
                )}
              />
            </p>
          </section>
          <section className="surface-card p-6 sm:p-9">
            <p className="font-mono text-xs text-[var(--accent)]">
              04 · <Local text={t("GUIDED PRACTICE", "GELEITETE ÜBUNG")} />
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              <Local
                text={t(
                  "Practice without memorizing",
                  "Übe ohne Auswendiglernen",
                )}
              />
            </h2>
            <ol className="mt-5 list-inside list-decimal space-y-4 leading-8 text-[var(--muted)]">
              <li>
                <Local
                  text={t(
                    "Change one number, variable or condition in the worked example. Predict what will change.",
                    "Ändere eine Zahl, Variable oder Bedingung im Beispiel. Sage voraus, was sich ändern wird.",
                  )}
                />
              </li>
              <li>
                <Local
                  text={t(
                    "Solve your new example independently and write every intermediate step.",
                    "Löse dein neues Beispiel selbstständig und schreibe alle Zwischenschritte auf.",
                  )}
                />
              </li>
              <li>
                <Local
                  text={t(
                    "Check your result using the definition or the reverse operation, when applicable.",
                    "Prüfe dein Ergebnis mit der Definition oder, wenn möglich, mit der Umkehroperation.",
                  )}
                />
              </li>
              <li>
                <Local
                  text={t(
                    "Explain the result to a beginner in two sentences without using jargon.",
                    "Erkläre das Ergebnis einem Anfänger in zwei Sätzen ohne Fachjargon.",
                  )}
                />
              </li>
            </ol>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className="mt-6 w-full rounded-xl border border-[var(--border)] bg-transparent p-4 text-sm outline-none focus:border-[var(--accent)]"
              placeholder={
                language === "en"
                  ? "Write your working here (not saved after refresh)…"
                  : "Schreibe deinen Lösungsweg hier (nach Neuladen nicht gespeichert)…"
              }
            />
            <button
              type="button"
              onClick={() => setRevealed((x) => !x)}
              className="mt-3 rounded-xl border border-[var(--border)] px-4 py-2 text-sm"
            >
              <Local
                text={
                  revealed
                    ? t("Hide model example", "Beispiel ausblenden")
                    : t("Show model example again", "Beispiel erneut anzeigen")
                }
              />
            </button>
            {revealed && (
              <p className="mt-4 rounded-lg bg-[var(--accent-soft)] p-4 leading-8">
                <Local text={t(lesson.exampleEn, lesson.exampleDe)} />
              </p>
            )}
          </section>
          <section id="quiz" className="surface-card p-6 sm:p-9">
            <p className="font-mono text-xs text-[var(--accent)]">
              05 ·{" "}
              <Local
                text={t("CHECK YOUR UNDERSTANDING", "TESTE DEIN VERSTÄNDNIS")}
              />
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              <Local text={t("Knowledge check", "Wissenscheck")} />
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              <Local
                text={t(
                  "Three lesson-specific comprehension checks followed by five cumulative review questions. Answer explanations appear immediately.",
                  "Drei Verständnisfragen zur Lektion und fünf wiederholende Fragen aus dem Kurs. Erklärungen erscheinen sofort.",
                )}
              />
            </p>
            {complete ? (
              <div className="mt-8 text-center">
                <CheckCircle2
                  className="mx-auto text-[var(--accent)]"
                  size={40}
                />
                <p className="mt-4 text-4xl font-bold">
                  {score}/{lesson.questions.length}
                </p>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  <Local
                    text={t(
                      "Review mistakes, then repeat the lesson if needed.",
                      "Prüfe deine Fehler und wiederhole bei Bedarf die Lektion.",
                    )}
                  />
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setCurrent(0);
                    setComplete(false);
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1020]"
                >
                  <RotateCcw size={16} />
                  <Local text={t("Try again", "Erneut versuchen")} />
                </button>
              </div>
            ) : (
              <div className="mt-7">
                <p className="mb-3 text-xs text-[var(--muted)]">
                  <Local text={t("Question", "Frage")} /> {current + 1}/
                  {lesson.questions.length}
                </p>
                <div className="mb-6 h-1.5 rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{
                      width: `${(current / lesson.questions.length) * 100}%`,
                    }}
                  />
                </div>
                <h3 className="mb-5 text-lg font-semibold leading-8">
                  {question.question[language]}
                </h3>
                <div className="grid gap-3">
                  {question.options.map((opt, i) => (
                    <button
                      type="button"
                      key={i}
                      disabled={selected !== undefined}
                      onClick={() =>
                        setAnswers((a) => ({ ...a, [current]: i }))
                      }
                      className={`rounded-xl border p-4 text-left text-sm leading-7 ${selected !== undefined && i === question.answer ? "border-emerald-500 bg-emerald-500/10" : selected === i ? "border-rose-500 bg-rose-500/10" : "border-[var(--border)] hover:border-[var(--accent)]"}`}
                    >
                      {String.fromCharCode(65 + i)}. {opt[language]}
                    </button>
                  ))}
                </div>
                {selected !== undefined && (
                  <div
                    role="status"
                    className="mt-5 rounded-xl bg-[var(--accent-soft)] p-5 text-sm leading-7"
                  >
                    <strong>
                      {selected === question.answer
                        ? language === "en"
                          ? "Correct!"
                          : "Richtig!"
                        : language === "en"
                          ? "Not quite"
                          : "Nicht ganz"}
                    </strong>
                    <p className="mt-2">{question.explanation[language]}</p>
                  </div>
                )}
                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    disabled={current === 0}
                    onClick={() => setCurrent((x) => x - 1)}
                    className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm disabled:opacity-30"
                  >
                    <Local text={t("Previous", "Zurück")} />
                  </button>
                  <button
                    type="button"
                    disabled={selected === undefined}
                    onClick={() =>
                      current === lesson.questions.length - 1
                        ? setComplete(true)
                        : setCurrent((x) => x + 1)
                    }
                    className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[#0b1020] disabled:opacity-40"
                  >
                    <Local
                      text={
                        current === lesson.questions.length - 1
                          ? t("Finish", "Abschließen")
                          : t("Next", "Weiter")
                      }
                    />
                  </button>
                </div>
              </div>
            )}
          </section>
          <div className="flex flex-wrap gap-3">
            {index > 0 && (
              <Link
                href={url(lessons[index - 1].slug)}
                className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm"
              >
                <Local text={t("Previous lesson", "Vorherige Lektion")} />
              </Link>
            )}
            {index < lessons.length - 1 && (
              <Link
                href={url(lessons[index + 1].slug)}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1020]"
              >
                <Local text={t("Next lesson", "Nächste Lektion")} />
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
        <aside className="hidden lg:block">
          <div className="surface-card sticky top-24 p-5">
            <BookOpen size={22} className="text-[var(--accent)]" />
            <p className="mt-3 text-sm font-semibold">
              <Local text={t("Your study checklist", "Deine Lerncheckliste")} />
            </p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
              {[
                t("Explain the concept", "Konzept erklären"),
                t("Reproduce the example", "Beispiel nachrechnen"),
                t("Identify a common mistake", "Häufigen Fehler erkennen"),
                t("Complete guided practice", "Geleitete Übung abschließen"),
                t("Finish eight questions", "Acht Fragen beantworten"),
              ].map((item, i) => (
                <p key={i}>
                  □ <Local text={item} />
                </p>
              ))}
            </div>
            <a
              href="#quiz"
              className="mt-5 inline-block text-sm font-semibold text-[var(--accent)]"
            >
              <Local text={t("Jump to quiz", "Zum Quiz")} />
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
