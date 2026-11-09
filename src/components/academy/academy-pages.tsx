"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Layers,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { questions, t } from "@/lib/academy";
import { extraLessons } from "@/lib/academy-extra";
import { AcademyShell, Local, useAcademyLanguage } from "./academy-shell";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted)]">
      {children}
    </span>
  );
}
function Heading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: ReturnType<typeof t>;
  title: ReturnType<typeof t>;
  description: ReturnType<typeof t>;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-4 font-mono text-xs uppercase tracking-[.22em] text-[var(--accent)]">
        <Local text={eyebrow} />
      </p>
      <h1 className="text-4xl font-semibold tracking-[-.055em] sm:text-6xl">
        <Local text={title} />
      </h1>
      <p className="mt-5 text-base leading-8 text-[var(--muted)]">
        <Local text={description} />
      </p>
    </div>
  );
}
function PageLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1020] transition hover:opacity-90"
    >
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

export function CoursePage({
  guidedLessonCount,
}: {
  guidedLessonCount: number;
}) {
  return (
    <AcademyShell>
      <Link
        href="/learn"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted)]"
      >
        <ArrowLeft size={15} />
        <Local text={t("All courses", "Alle Kurse")} />
      </Link>
      <Heading
        eyebrow={t(
          "Course 01 · Computer Science Preparation",
          "Kurs 01 · Informatikvorbereitung",
        )}
        title={t("Discrete Mathematics", "Diskrete Mathematik")}
        description={t(
          "A growing bilingual foundation course with explanations, worked examples and original practice quizzes across all eight subject areas.",
          "Ein wachsender zweisprachiger Grundlagenkurs mit Erklärungen, Beispielen und eigenen Übungsquizzen in allen acht Themenbereichen.",
        )}
      />
      <div className="mb-9 flex flex-wrap gap-3">
        <Pill>
          <Layers size={14} className="mr-2" />8{" "}
          <Local text={t("topic areas", "Themenbereiche")} />
        </Pill>
        <Pill>
          <BookOpen size={14} className="mr-2" />9{" "}
          <Local text={t("published lessons", "veröffentlichte Lektionen")} />
        </Pill>
        <Pill>
          <Clock3 size={14} className="mr-2" />
          <Local text={t("Self-paced", "Eigenes Lerntempo")} />
        </Pill>
      </div>
      <div className="mb-8 surface-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
          <Local
            text={t("Recommended starting point", "Empfohlener Einstieg")}
          />
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          <Local
            text={t(
              "01 · Propositional Logic & Truth Tables",
              "01 · Aussagenlogik & Wahrheitstabellen",
            )}
          />
        </h2>
        <p className="mt-3 mb-6 text-sm leading-7 text-[var(--muted)]">
          <Local
            text={t(
              "Start with statements, logical operators, a live truth-table playground and a five-question quiz.",
              "Beginne mit Aussagen, logischen Operatoren, einer interaktiven Wahrheitstabelle und einem Quiz mit fünf Fragen.",
            )}
          />
        </p>
        <PageLink href="/learn/discrete-math/logic">
          <Local text={t("Start the first lesson", "Erste Lektion starten")} />
        </PageLink>
      </div>
      <div className="mb-8 surface-card p-6">
        <h2 className="text-xl font-semibold">
          <Local
            text={t(
              `Guided course · ${guidedLessonCount} lessons`,
              `Geführter Kurs · ${guidedLessonCount} Lektionen`,
            )}
          />
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          <Local
            text={t(
              "Explore our expanded step-by-step Discrete Mathematics pathway, with eight checks per lesson and suggested two-hour study sessions.",
              "Entdecke unseren erweiterten Lernpfad für Diskrete Mathematik mit acht Fragen pro Lektion und vorgeschlagenen zweistündigen Lerneinheiten.",
            )}
          />
        </p>
        <Link
          href="/learn/discrete-math/foundation"
          className="mt-4 inline-flex items-center gap-2 font-semibold text-[var(--accent)]"
        >
          <Local
            text={t(
              `Browse all ${guidedLessonCount} lessons`,
              `Alle ${guidedLessonCount} Lektionen ansehen`,
            )}
          />
          <ArrowRight size={16} />
        </Link>
      </div>
      <h2 className="mb-5 text-2xl font-semibold">
        <Local
          text={t(
            "All lessons · Available now",
            "Alle Lektionen · Jetzt verfügbar",
          )}
        />
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {extraLessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            href={`/learn/discrete-math/${lesson.slug}`}
            className="surface-card group flex flex-col p-6 transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-[var(--accent)]">
                {String(index + 2).padStart(2, "0")} · {lesson.duration}
              </span>
              <Pill>
                <Local text={t("Available", "Verfügbar")} />
              </Pill>
            </div>
            <h3 className="mt-4 text-xl font-semibold">
              <Local text={lesson.title} />
            </h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-[var(--muted)]">
              <Local text={lesson.subtitle} />
            </p>
            <p className="mt-4 text-xs text-[var(--muted)]">
              {lesson.sections.length} <Local text={t("topics", "Themen")} /> ·{" "}
              {lesson.exercises.length}{" "}
              <Local text={t("questions", "Fragen")} />
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
              <Local text={t("Open lesson", "Lektion öffnen")} />
              <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-xs leading-6 text-[var(--muted)]">
        <Local
          text={t(
            "Independent introductory preparation material. Not an official BFH syllabus or official past-exam questions. Additional depth and question banks will be added over time.",
            "Unabhängiges Vorbereitungsmaterial für Einsteiger. Kein offizieller BFH-Lehrplan und keine offiziellen Prüfungsfragen. Weitere Vertiefungen und Fragensammlungen folgen.",
          )}
        />
      </p>
    </AcademyShell>
  );
}

function tf(value: boolean, language: "en" | "de") {
  return value ? (language === "en" ? "T" : "W") : "F";
}

function TruthTable() {
  const { language } = useAcademyLanguage();
  const [p, setP] = useState(true);
  const [q, setQ] = useState(false);
  const rows = [
    { p: true, q: true },
    { p: true, q: false },
    { p: false, q: true },
    { p: false, q: false },
  ];
  return (
    <div className="surface-card overflow-hidden p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold">
          <Local
            text={t("Interactive truth table", "Interaktive Wahrheitstabelle")}
          />
        </h3>
        <Pill>
          <Local text={t("Try changing P and Q", "Ändere P und Q")} />
        </Pill>
      </div>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        <Local
          text={t(
            "Choose truth values to highlight a row and see the results of each logical operator.",
            "Wähle Wahrheitswerte, um eine Zeile hervorzuheben und die Ergebnisse der logischen Operatoren zu sehen.",
          )}
        />
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        {[
          { label: "P", value: p, set: setP },
          { label: "Q", value: q, set: setQ },
        ].map((item) => (
          <button
            type="button"
            key={item.label}
            onClick={() => item.set(!item.value)}
            className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 py-3 font-mono text-sm"
            aria-label={`Toggle ${item.label}`}
            aria-pressed={item.value}
          >
            {item.label}:{" "}
            <span className="font-semibold text-[var(--accent)]">
              {item.value
                ? language === "en"
                  ? "True"
                  : "Wahr"
                : language === "en"
                  ? "False"
                  : "Falsch"}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[440px] text-center font-mono text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--muted)]">
              {["P", "Q", "¬P", "P ∧ Q", "P ∨ Q", "P → Q"].map((h) => (
                <th className="px-3 py-4 font-medium" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className={`border-b border-[var(--border)] ${r.p === p && r.q === q ? "bg-[var(--accent-soft)]" : ""}`}
              >
                {[r.p, r.q, !r.p, r.p && r.q, r.p || r.q, !r.p || r.q].map(
                  (v, j) => (
                    <td key={j} className="px-3 py-4">
                      {tf(v, language)}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-[var(--muted)]">
        <Local
          text={t(
            "T = true, F = false. Implication P → Q is false only when P is true and Q is false.",
            "W = wahr, F = falsch. Die Implikation P → Q ist nur falsch, wenn P wahr und Q falsch ist.",
          )}
        />
      </p>
    </div>
  );
}
function Quiz() {
  const { language } = useAcademyLanguage();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const question = questions[index];
  const selected = answers[question.id];
  const score = useMemo(
    () => questions.filter((q) => answers[q.id] === q.correct).length,
    [answers],
  );
  function restart() {
    setIndex(0);
    setAnswers({});
    setFinished(false);
  }
  return (
    <div id="quiz" className="surface-card p-6 sm:p-9">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-semibold">
          <Local text={t("Practice quiz", "Übungsquiz")} />
        </h3>
        <Pill>
          <Local
            text={t("Original practice questions", "Eigene Übungsfragen")}
          />
        </Pill>
      </div>
      {finished ? (
        <div className="py-8 text-center">
          <CheckCircle2 size={44} className="mx-auto text-[var(--accent)]" />
          <h4 className="mt-5 text-4xl font-bold">
            {score}/{questions.length}
          </h4>
          <p className="mt-4 text-[var(--muted)]">
            <Local
              text={t(
                "Quiz complete! Review the explanations and practice again.",
                "Quiz abgeschlossen! Lies die Erklärungen und übe erneut.",
              )}
            />
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1020]"
          >
            <RotateCcw size={16} />
            <Local text={t("Try again", "Erneut versuchen")} />
          </button>
        </div>
      ) : (
        <>
          <div className="mb-5 flex items-center justify-between text-xs text-[var(--muted)]">
            <span>
              <Local text={t("Question", "Frage")} /> {index + 1}/
              {questions.length}
            </span>
            <span>{Math.round((index / questions.length) * 100)}%</span>
          </div>
          <div className="mb-8 h-1.5 rounded-full bg-[var(--border)]">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all"
              style={{ width: `${(index / questions.length) * 100}%` }}
            />
          </div>
          <h4 className="mb-6 text-xl font-semibold leading-8">
            {question.question[language]}
          </h4>
          <div className="grid gap-3">
            {question.options.map((option, i) => {
              const answered = selected !== undefined;
              const correct = i === question.correct;
              return (
                <button
                  type="button"
                  key={i}
                  disabled={answered}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [question.id]: i }))
                  }
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left text-sm transition ${answered && correct ? "border-emerald-500 bg-emerald-500/10" : answered && selected === i ? "border-rose-500 bg-rose-500/10" : "border-[var(--border)] hover:border-[var(--accent)]"}`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface)] font-mono font-semibold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{option[language]}</span>
                  {answered && correct && (
                    <CheckCircle2
                      size={18}
                      className="ml-auto shrink-0 text-emerald-500"
                    />
                  )}
                </button>
              );
            })}
          </div>
          {selected !== undefined && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--accent-soft)] p-5"
            >
              <p className="font-semibold">
                {selected === question.correct
                  ? language === "en"
                    ? "Correct!"
                    : "Richtig!"
                  : language === "en"
                    ? "Not quite — here's why:"
                    : "Nicht ganz – hier ist die Erklärung:"}
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
                index === questions.length - 1
                  ? setFinished(true)
                  : setIndex((i) => i + 1)
              }
              className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1020] disabled:opacity-40"
            >
              <Local
                text={
                  index === questions.length - 1
                    ? t("Finish quiz", "Quiz abschließen")
                    : t("Next question", "Nächste Frage")
                }
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function LogicLessonPage() {
  return (
    <AcademyShell>
      <Link
        href="/learn/discrete-math"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted)]"
      >
        <ArrowLeft size={15} />
        <Local text={t("Back to course", "Zurück zum Kurs")} />
      </Link>
      <Heading
        eyebrow={t("Module 01 · Lesson 01", "Modul 01 · Lektion 01")}
        title={t(
          "Propositional Logic & Truth Tables",
          "Aussagenlogik und Wahrheitstabellen",
        )}
        description={t(
          "Learn how statements, logical operators, and truth tables work — then check your understanding with interactive exercises.",
          "Lerne, wie Aussagen, logische Operatoren und Wahrheitstabellen funktionieren – und überprüfe dein Wissen mit interaktiven Übungen.",
        )}
      />
      <div className="mb-10 flex flex-wrap gap-3">
        <Pill>
          <Clock3 size={14} className="mr-2" />
          20–30 min
        </Pill>
        <Pill>
          <Sparkles size={14} className="mr-2" />
          <Local text={t("Beginner", "Einsteiger")} />
        </Pill>
        <Pill>
          <CircleHelp size={14} className="mr-2" />5{" "}
          <Local text={t("quiz questions", "Quizfragen")} />
        </Pill>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_230px]">
        <article className="min-w-0 space-y-8">
          <section id="statements" className="surface-card p-6 sm:p-9">
            <p className="font-mono text-xs text-[var(--accent)]">
              01 / FOUNDATION
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              <Local
                text={t("What is a proposition?", "Was ist eine Aussage?")}
              />
            </h2>
            <p className="mt-5 leading-8 text-[var(--muted)]">
              <Local
                text={t(
                  "A proposition is a declarative sentence that is either true or false. Questions and commands are not propositions because they do not have a truth value.",
                  "Eine Aussage ist ein Aussagesatz, der entweder wahr oder falsch ist. Fragen und Befehle sind keine Aussagen, da sie keinen Wahrheitswert haben.",
                )}
              />
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
                <p className="font-semibold text-emerald-500">
                  <Local text={t("Proposition", "Aussage")} />
                </p>
                <p className="mt-2 text-sm">
                  <Local text={t("“2 + 3 = 5” — true", "„2 + 3 = 5“ – wahr")} />
                </p>
                <p className="mt-1 text-sm">
                  <Local
                    text={t(
                      "“10 is odd” — false",
                      "„10 ist ungerade“ – falsch",
                    )}
                  />
                </p>
              </div>
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
                <p className="font-semibold text-amber-500">
                  <Local text={t("Not a proposition", "Keine Aussage")} />
                </p>
                <p className="mt-2 text-sm">
                  <Local
                    text={t(
                      "“What time is it?” — question",
                      "„Wie spät ist es?“ – Frage",
                    )}
                  />
                </p>
                <p className="mt-1 text-sm">
                  <Local
                    text={t(
                      "“Open the window!” — command",
                      "„Öffne das Fenster!“ – Befehl",
                    )}
                  />
                </p>
              </div>
            </div>
          </section>
          <section id="operators" className="surface-card p-6 sm:p-9">
            <p className="font-mono text-xs text-[var(--accent)]">
              02 / OPERATORS
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              <Local text={t("Logical operators", "Logische Operatoren")} />
            </h2>
            <p className="mt-5 leading-8 text-[var(--muted)]">
              <Local
                text={t(
                  "Let P and Q represent propositions. Logical operators combine or transform their truth values.",
                  "P und Q stehen für Aussagen. Logische Operatoren verknüpfen oder verändern ihre Wahrheitswerte.",
                )}
              />
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[440px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                    <th className="p-3">
                      <Local text={t("Symbol", "Symbol")} />
                    </th>
                    <th className="p-3">
                      <Local text={t("Meaning", "Bedeutung")} />
                    </th>
                    <th className="p-3">
                      <Local text={t("Rule", "Regel")} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      s: "¬P",
                      name: t("NOT", "NICHT"),
                      rule: t("Reverses P", "Kehrt P um"),
                    },
                    {
                      s: "P ∧ Q",
                      name: t("AND", "UND"),
                      rule: t("Both must be true", "Beide müssen wahr sein"),
                    },
                    {
                      s: "P ∨ Q",
                      name: t("OR", "ODER"),
                      rule: t(
                        "At least one is true",
                        "Mindestens eine ist wahr",
                      ),
                    },
                    {
                      s: "P → Q",
                      name: t("IMPLIES", "IMPLIKATION"),
                      rule: t(
                        "False only for true → false",
                        "Nur bei wahr → falsch falsch",
                      ),
                    },
                  ].map((row) => (
                    <tr key={row.s} className="border-b border-[var(--border)]">
                      <td className="p-3 font-mono font-semibold text-[var(--accent)]">
                        {row.s}
                      </td>
                      <td className="p-3">
                        <Local text={row.name} />
                      </td>
                      <td className="p-3 text-[var(--muted)]">
                        <Local text={row.rule} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
              <Local
                text={t(
                  "Here OR is inclusive: P ∨ Q is also true when both P and Q are true.",
                  "ODER ist hier inklusiv: P ∨ Q ist auch dann wahr, wenn P und Q beide wahr sind.",
                )}
              />
            </p>
          </section>
          <section id="tables">
            <TruthTable />
          </section>
          <section id="examples" className="surface-card p-6 sm:p-9">
            <p className="font-mono text-xs text-[var(--accent)]">
              04 / WORKED EXAMPLE
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              <Local text={t("Reasoning step by step", "Schrittweise lösen")} />
            </h2>
            <p className="mt-5 leading-8 text-[var(--muted)]">
              <Local
                text={t(
                  "Suppose P is true and Q is false. Evaluate ¬P ∨ Q.",
                  "Angenommen, P ist wahr und Q ist falsch. Berechne ¬P ∨ Q.",
                )}
              />
            </p>
            <ol className="mt-5 list-inside list-decimal space-y-3 text-sm leading-7 text-[var(--muted)]">
              <li>
                <Local
                  text={t(
                    "Negate P: ¬P is false.",
                    "Negiere P: ¬P ist falsch.",
                  )}
                />
              </li>
              <li>
                <Local
                  text={t("Q is already false.", "Q ist bereits falsch.")}
                />
              </li>
              <li>
                <Local
                  text={t(
                    "False OR false is false.",
                    "Falsch ODER falsch ist falsch.",
                  )}
                />
              </li>
            </ol>
            <div className="mt-6 rounded-xl bg-[var(--accent-soft)] p-5 font-mono text-lg font-semibold text-[var(--accent)]">
              ¬P ∨ Q = F
            </div>
          </section>
          <Quiz />
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24 surface-card p-5">
            <p className="mb-4 font-mono text-xs text-[var(--accent)]">
              <Local text={t("ON THIS PAGE", "AUF DIESER SEITE")} />
            </p>
            <nav className="flex flex-col gap-3 text-sm text-[var(--muted)]">
              {[
                { id: "statements", text: t("Propositions", "Aussagen") },
                { id: "operators", text: t("Operators", "Operatoren") },
                { id: "tables", text: t("Truth tables", "Wahrheitstabellen") },
                { id: "examples", text: t("Worked example", "Beispiel") },
                { id: "quiz", text: t("Practice quiz", "Übungsquiz") },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="hover:text-[var(--accent)]"
                >
                  <Local text={item.text} />
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </AcademyShell>
  );
}
