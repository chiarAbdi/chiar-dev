"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Search } from "lucide-react";
import ictLessons from "@/lib/ict-lessons.json";
import germanLessons from "@/lib/ict-lessons.de.json";
import { useSiteLanguage } from "@/components/ui/language-provider";
import { useLocalStorage } from "@/lib/use-local-storage";
import { readIctProgress } from "@/lib/use-learning-progress";
import { IctIntroductionVideo } from "@/components/academy/ict-introduction-video";

export default function IctSizCourse() {
  const { language, text } = useSiteLanguage();
  const lessons = ictLessons.map((lesson, i) =>
    language === "de" ? { ...lesson, ...germanLessons[i] } : lesson,
  );
  const [saved, save] = useLocalStorage("academy-ict-siz-v1");
  const [session, setSession] = useState<{
    active: number;
    done: number[];
  } | null>(null);
  let storedActive = 0;
  try {
    const value = JSON.parse(saved ?? "{}");
    if (
      Number.isInteger(value?.active) &&
      value.active >= 0 &&
      value.active < lessons.length
    )
      storedActive = value.active;
  } catch {}
  const { active, done } = session ?? {
    active: storedActive,
    done: readIctProgress(saved, lessons.length),
  };
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [answers, setAnswers] = useState<Record<number, "correct" | "wrong">>(
    {},
  );
  const [showSolution, setShowSolution] = useState(false);
  const lesson = lessons[active];
  function updateProgress(next: { active: number; done: number[] }) {
    setSession(next);
    save(JSON.stringify(next));
  }
  function select(index: number) {
    updateProgress({ active: index, done });
    setShowSolution(false);
  }
  const groups = [
    {
      id: "Start Here",
      name: text("ICT foundations", "ICT-Grundlagen"),
      description: text(
        "Start at zero: computers, binary, hardware, command line, labs and support methodology.",
        "Von Anfang an: Computer, Binärsystem, Hardware, Befehlszeile, Labs und Supportmethodik.",
      ),
    },
    {
      id: "PU11",
      name: text("Operating systems", "Betriebssysteme"),
      description: text(
        "Install, configure, maintain and troubleshoot operating systems and devices.",
        "Betriebssysteme und Geräte installieren, konfigurieren, warten und Fehler beheben.",
      ),
    },
    {
      id: "PU12",
      name: text("Users & resources", "Benutzer & Ressourcen"),
      description: text(
        "Accounts, permissions, directory services, data protection and collaboration.",
        "Konten, Berechtigungen, Verzeichnisdienste, Datenschutz und Zusammenarbeit.",
      ),
    },
    {
      id: "PU13",
      name: text("Networks", "Netzwerke"),
      description: text(
        "Networking fundamentals, addressing, switching, routing and security.",
        "Netzwerkgrundlagen, Adressierung, Switching, Routing und Sicherheit.",
      ),
    },
    {
      id: "SP1",
      name: text("Systems & servers", "Systeme & Server"),
      description: text(
        "Server administration, monitoring, backup, migration and operations.",
        "Serververwaltung, Überwachung, Sicherung, Migration und Betrieb.",
      ),
    },
  ];
  const plans = [
    [
      text("Read and understand", "Lesen und verstehen"),
      "25 min",
      text(
        "Read the explanation, put it in your own words and define unfamiliar terms.",
        "Lies die Erklärung, formuliere sie in eigenen Worten und kläre unbekannte Begriffe.",
      ),
    ],
    [
      text("Work the example", "Beispiel nachvollziehen"),
      "20 min",
      text(
        "Explain each step. Change one condition and predict the result.",
        "Erkläre jeden Schritt. Ändere eine Bedingung und sage das Ergebnis voraus.",
      ),
    ],
    [
      text("Hands-on lab", "Praktisches Lab"),
      "45 min",
      text(
        "Work in your own isolated lab and capture observations.",
        "Arbeite in deinem eigenen isolierten Lab und dokumentiere Beobachtungen.",
      ),
    ],
    [
      text("Self-test", "Selbsttest"),
      "15 min",
      text(
        "Answer the question and explain why the other choice is incorrect.",
        "Beantworte die Frage und erkläre, warum die andere Antwort falsch ist.",
      ),
    ],
    [
      text("Review and notes", "Wiederholung und Notizen"),
      "15 min",
      text(
        "Write three takeaways, an unresolved question and a troubleshooting checklist.",
        "Notiere drei Erkenntnisse, eine offene Frage und eine Checkliste zur Fehlersuche.",
      ),
    ],
  ];
  const visible = lessons
    .map((item, index) => ({ lesson: item, index }))
    .filter(
      ({ lesson: l, index }) =>
        (filter === "All" || l.module === filter) &&
        `${l.title} ${l.explain} ${l.module} ${ictLessons[index].title}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
    );
  const options =
    active % 2 === 0
      ? [
          { id: "correct" as const, value: lesson.correct },
          { id: "wrong" as const, value: lesson.wrong },
        ]
      : [
          { id: "wrong" as const, value: lesson.wrong },
          { id: "correct" as const, value: lesson.correct },
        ];
  const selected = answers[active];
  return (
    <div id="top" className="container-main pb-20 pt-28 sm:pt-32">
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        {text("Learning dashboard", "Lernübersicht")}
      </Link>
      <p className="mt-7 font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
        {text("Independent study path", "Unabhängiger Lernpfad")}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-.045em] sm:text-5xl">
        {text("ICT Systems & Network", "ICT-Systeme & Netzwerke")}
      </h1>
      <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
        {text(
          "From your first computer to systems and network administration. Learn the concepts, try practical labs and check your understanding.",
          "Vom ersten Computer bis zur System- und Netzwerkverwaltung. Verstehe die Konzepte, probiere praktische Labs aus und teste dein Wissen.",
        )}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {[
          `${lessons.length} ${text("lessons", "Lektionen")}`,
          text("5 stages", "5 Themenbereiche"),
          text(
            "Suggested 2-hour study plans",
            "Vorgeschlagene zweistündige Lernpläne",
          ),
          `${done.length} ${text("completed", "abgeschlossen")}`,
        ].map((label) => (
          <span
            key={label}
            className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted)]"
          >
            {label}
          </span>
        ))}
      </div>
      <div
        role="progressbar"
        aria-label={text("Course progress", "Kursfortschritt")}
        aria-valuenow={done.length}
        aria-valuemin={0}
        aria-valuemax={lessons.length}
        className="mt-5 h-1.5 overflow-hidden rounded-full bg-[var(--border)]"
      >
        <div
          className="h-full rounded-full bg-[var(--accent)]"
          style={{ width: `${(done.length / lessons.length) * 100}%` }}
        />
      </div>
      <details className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <summary className="cursor-pointer text-sm font-semibold">
          {text(
            "Course introduction & how to study",
            "Kurseinführung & Lernhinweise",
          )}
        </summary>
        <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--muted)]">
          <p>
            {text(
              "This beginner-first path is inspired by Wirtschaftsschule Five’s published ICT Power-User and ICT Professional SIZ subject areas: foundations, PU11 operating systems, PU12 users and resources, PU13 networks and SP1 systems administration.",
              "Dieser Lernpfad für Einsteiger orientiert sich an den veröffentlichten Themenbereichen von Wirtschaftsschule Five zu ICT Power-User und ICT Professional SIZ: Grundlagen, PU11 Betriebssysteme, PU12 Benutzer und Ressourcen, PU13 Netzwerke und SP1 Systemverwaltung.",
            )}
          </p>
          <p>
            {text(
              "Independent original material, not an official SIZ textbook, approved training platform, exam simulator or guarantee of exam readiness. Check official objectives and regulations before taking an exam.",
              "Eigenes unabhängiges Lernmaterial, kein offizielles SIZ-Lehrbuch, keine anerkannte Ausbildungsplattform, kein Prüfungssimulator und keine Garantie für Prüfungsreife. Prüfe vor einer Prüfung die offiziellen Lernziele und Regeln.",
            )}
          </p>
          <p>
            {text(
              "Use a Windows computer with PowerShell and optionally an isolated Linux/Windows VM. Work only on devices and networks you own or are authorized to administer. Take VM snapshots before experiments; never format your real disk or expose lab servers publicly.",
              "Nutze einen Windows-Computer mit PowerShell und optional eine isolierte Linux-/Windows-VM. Arbeite nur mit eigenen oder ausdrücklich freigegebenen Geräten und Netzen. Erstelle vor Experimenten VM-Snapshots; formatiere niemals deine echte Festplatte und stelle Lab-Server nicht öffentlich bereit.",
            )}
          </p>
          <p>
            {text(
              "Two hours is a suggested study workflow including independent practice, not two hours of written material. Completion is stored in this browser and does not sync across devices. Clearing browser data can remove it.",
              "Zwei Stunden sind ein vorgeschlagener Lernablauf mit selbstständigem Üben, keine zwei Stunden Lesetext. Abschlüsse werden nur in diesem Browser gespeichert und nicht geräteübergreifend synchronisiert. Das Löschen von Browserdaten kann sie entfernen.",
            )}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {plans.map(([name, time, description]) => (
              <div
                key={name}
                className="rounded-xl border border-[var(--border)] p-3"
              >
                <h2 className="text-xs font-semibold text-[var(--foreground)]">
                  {name}
                </h2>
                <p className="mt-2 text-xs text-[var(--accent)]">{time}</p>
                <p className="mt-2 text-xs leading-6">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </details>
      <div className="mt-7 grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="self-start rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 lg:sticky lg:top-24">
          <h2 className="font-semibold">
            {text("Course contents", "Kursinhalt")}
          </h2>
          <label
            htmlFor="ict-search"
            className="mt-4 block text-xs text-[var(--muted)]"
          >
            {text("Search topics", "Themen suchen")}
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2">
            <Search
              size={15}
              className="text-[var(--muted)]"
              aria-hidden="true"
            />
            <input
              id="ict-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={text(
                "DNS, Windows, backup…",
                "DNS, Windows, Sicherung…",
              )}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          <label
            htmlFor="ict-filter"
            className="mt-4 block text-xs text-[var(--muted)]"
          >
            {text("Stage", "Themenbereich")}
          </label>
          <select
            id="ict-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
          >
            <option value="All">{text("All stages", "Alle Bereiche")}</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.id === "Start Here" ? "01" : group.id} · {group.name}
              </option>
            ))}
          </select>
          <p className="mt-3 text-xs text-[var(--muted)]">
            {visible.length} {text("lessons shown", "Lektionen angezeigt")}
          </p>
          <nav
            aria-label={text("ICT lessons", "ICT-Lektionen")}
            className="mt-4 max-h-[45vh] space-y-1 overflow-y-auto pr-1 lg:max-h-[55vh]"
          >
            {visible.map(({ lesson: l, index }) => (
              <button
                key={index}
                type="button"
                onClick={() => select(index)}
                aria-current={index === active ? "step" : undefined}
                className={`flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-sm ${index === active ? "bg-[var(--accent-soft)] font-semibold" : "text-[var(--muted)] hover:bg-[var(--accent-soft)]"}`}
              >
                <span className="w-6 shrink-0 text-xs tabular-nums">
                  {done.includes(index)
                    ? "✓"
                    : String(index + 1).padStart(2, "0")}
                </span>
                <span>{l.title}</span>
              </button>
            ))}
          </nav>
          {visible.length === 0 && (
            <p role="status" className="mt-3 text-xs text-[var(--muted)]">
              {text(
                "No lessons match your search.",
                "Keine passenden Lektionen.",
              )}
            </p>
          )}
        </aside>
        <article className="min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            {text("Lesson", "Lektion")} {active + 1} / {lessons.length} ·{" "}
            {lesson.module === "Start Here"
              ? text("Foundations", "Grundlagen")
              : lesson.module}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {lesson.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            {groups.find((g) => g.id === lesson.module)?.description}
          </p>
          {active === 0 && <IctIntroductionVideo />}
          <section className="mt-8">
            <h3 className="text-xl font-semibold">
              1. {text("Understand the concept", "Das Konzept verstehen")}
            </h3>
            <p className="mt-3 leading-8 text-[var(--muted)]">
              {lesson.explain}
            </p>
          </section>
          <section className="mt-8 rounded-xl border border-[var(--border)] p-5">
            <h3 className="text-xl font-semibold">
              2.{" "}
              {text("Walk through an example", "Ein Beispiel nachvollziehen")}
            </h3>
            <p className="mt-3 leading-8 text-[var(--muted)]">
              {lesson.example}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              {text(
                "Explain the example to an imaginary beginner. What changes if one assumption changes?",
                "Erkläre das Beispiel einem gedachten Anfänger. Was ändert sich, wenn sich eine Annahme ändert?",
              )}
            </p>
          </section>
          <section className="mt-8">
            <h3 className="text-xl font-semibold">
              3. {text("Hands-on practice", "Praktisch üben")}
            </h3>
            <p className="mt-3 leading-8 text-[var(--muted)]">{lesson.lab}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              {text(
                "Document the objective, your steps, observations, screenshots or command output, and what you would troubleshoot if it failed.",
                "Dokumentiere Ziel, Schritte, Beobachtungen, Screenshots oder Befehlsausgaben sowie deinen Ansatz zur Fehlersuche bei einem Misserfolg.",
              )}
            </p>
          </section>
          <section className="mt-8">
            <h3 className="text-xl font-semibold">
              4. {text("Knowledge check", "Wissenscheck")}
            </h3>
            <p className="mt-3 leading-7">{lesson.question}</p>
            <div className="mt-4 grid gap-3">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, [active]: option.id }));
                    setShowSolution(true);
                  }}
                  className={`rounded-xl border px-4 py-3 text-left text-sm ${selected === option.id ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--border)] hover:border-[var(--accent)]"}`}
                >
                  {option.value}
                </button>
              ))}
            </div>
            {showSolution && selected && (
              <p
                role="status"
                className="mt-4 rounded-xl bg-[var(--accent-soft)] p-4 text-sm leading-7"
              >
                <strong>
                  {selected === "correct"
                    ? text("Correct.", "Richtig.")
                    : text("Not quite.", "Nicht ganz.")}
                </strong>{" "}
                {text("The correct answer is", "Die richtige Antwort lautet")}{" "}
                <strong>{lesson.correct}</strong>.{" "}
                {text(
                  "Review the concept and explain why.",
                  "Prüfe die Erklärung und begründe die Antwort.",
                )}
              </p>
            )}
          </section>
          <section className="mt-8">
            <h3 className="text-xl font-semibold">
              5. {text("Teach it back", "Mit eigenen Worten erklären")}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              {text(
                "Write down a beginner-friendly definition, an IT-support example, a common mistake, a way to verify the result, and a follow-up question.",
                "Notiere eine verständliche Definition, ein Beispiel aus dem IT-Support, einen häufigen Fehler, eine Prüfmöglichkeit und eine weiterführende Frage.",
              )}
            </p>
          </section>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-6">
            <button
              type="button"
              onClick={() =>
                updateProgress({
                  active,
                  done: done.includes(active)
                    ? done.filter((x) => x !== active)
                    : [...done, active],
                })
              }
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[#0b1020]"
            >
              {done.includes(active) && <Check size={15} aria-hidden="true" />}
              {done.includes(active)
                ? text("Completed · Undo", "Abgeschlossen · Rückgängig")
                : text("Mark lesson complete", "Lektion abschließen")}
            </button>
            <button
              type="button"
              disabled={active === 0}
              onClick={() => select(active - 1)}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm disabled:opacity-35"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              {text("Previous", "Zurück")}
            </button>
            <button
              type="button"
              disabled={active === lessons.length - 1}
              onClick={() => select(active + 1)}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm disabled:opacity-35"
            >
              {text("Next", "Weiter")}
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>
      <p className="mt-8 text-xs leading-6 text-[var(--muted)]">
        {text(
          "Inspired by the published subject areas of",
          "Angelehnt an die veröffentlichten Themenbereiche von",
        )}{" "}
        <a
          href="https://www.wirtschaftsschule-five.ch/weiterbildung/ict-power-user-siz-professional-siz-systems-network/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          Wirtschaftsschule Five · ICT Power-User + ICT Professional SIZ
        </a>
        .{" "}
        {text(
          "Independent content, not affiliated with or endorsed by WSF or SIZ.",
          "Unabhängige Inhalte, nicht mit WSF oder SIZ verbunden oder von ihnen anerkannt.",
        )}
      </p>
    </div>
  );
}
