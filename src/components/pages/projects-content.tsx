"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Braces,
  Code2,
  GitFork,
  Layers3,
  Network,
  QrCode,
  Search,
} from "lucide-react";
import { projects } from "@/lib/projects";
import { useSiteLanguage } from "@/components/ui/language-provider";

const icons = {
  "qr-studio": QrCode,
  "chiar-dev": Code2,
  learnblog: BookOpen,
  "systems-lab": Network,
  "study-hub": Layers3,
};
const colors = {
  "qr-studio": "from-blue-500/15 to-cyan-500/5 text-blue-500",
  "chiar-dev": "from-indigo-500/15 to-violet-500/5 text-indigo-500",
  learnblog: "from-emerald-500/15 to-teal-500/5 text-emerald-500",
  "systems-lab": "from-amber-500/15 to-orange-500/5 text-amber-500",
  "study-hub": "from-violet-500/15 to-pink-500/5 text-violet-500",
};

export function ProjectsPageContent() {
  const { language, text } = useSiteLanguage();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const visible = projects.filter(
    (p) =>
      (filter === "all" ||
        (filter === "active"
          ? p.state !== "planned"
          : p.state === "planned")) &&
      `${p.title} ${p.description.en} ${p.description.de}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const tag = (value: string) =>
    ({
      "Web app": text("Web app", "Webanwendung"),
      "QR codes": text("QR codes", "QR-Codes"),
      "UI design": text("UI design", "Oberflächendesign"),
      Education: text("Education", "Lernen"),
      "Interactive tools": text("Interactive tools", "Interaktive Tools"),
      "Visual lessons": text("Visual lessons", "Visuelle Lektionen"),
      Networking: text("Networking", "Netzwerke"),
      Virtualization: text("Virtualization", "Virtualisierung"),
      "Study tools": text("Study tools", "Lerntools"),
      Notes: text("Notes", "Notizen"),
      "Course planning": text("Course planning", "Kursplanung"),
    })[value] ?? value;
  return (
    <div id="top" className="container-main pb-20 pt-28 sm:pt-36">
      <p className="mb-4 font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
        {text("The project collection", "Die Projektsammlung")}
      </p>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
            {text("Ideas, built into things.", "Aus Ideen wird Software.")}
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-[var(--muted)]">
            {text(
              "Applications, learning tools and technical experiments. Here’s what you can explore now, what I’m improving and what’s on the roadmap.",
              "Anwendungen, Lerntools und technische Experimente. Entdecke bestehende Projekte, laufende Entwicklung und Ideen auf der Roadmap.",
            )}
          </p>
        </div>
      </div>
      <dl className="mt-9 grid grid-cols-3 gap-3">
        {[
          {
            label: text("Active projects", "Aktive Projekte"),
            value: projects.filter((p) => p.state !== "planned").length,
            icon: Code2,
          },
          {
            label: text("On the roadmap", "Auf der Roadmap"),
            value: projects.filter((p) => p.state === "planned").length,
            icon: Layers3,
          },
          {
            label: text("Areas to explore", "Themen"),
            value: new Set(projects.map((project) => project.category)).size,
            icon: Braces,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5"
          >
            <stat.icon
              size={18}
              className="text-[var(--accent)]"
              aria-hidden="true"
            />
            <dd className="mt-3 text-2xl font-semibold">{stat.value}</dd>
            <dt className="mt-1 break-words text-xs leading-5 text-[var(--muted)]">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label={text("Project filter", "Projektfilter")}
          className="flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1"
        >
          {[
            { id: "all", label: text("All projects", "Alle Projekte") },
            { id: "active", label: text("Active", "Aktiv") },
            { id: "planned", label: text("Roadmap", "Roadmap") },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={`rounded-lg px-3 py-2 text-xs font-medium ${filter === item.id ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--muted)]"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="flex w-full items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 sm:w-64">
          <Search
            size={16}
            className="text-[var(--muted)]"
            aria-hidden="true"
          />
          <span className="sr-only">
            {text("Search projects", "Projekte suchen")}
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={text("Find a project…", "Projekt finden…")}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => {
          const Icon = icons[project.id];
          return (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <div
                className={`relative flex h-40 items-center justify-center overflow-hidden border-b border-[var(--border)] bg-gradient-to-br ${colors[project.id]}`}
              >
                <div className="absolute h-40 w-40 rounded-full border border-current opacity-10" />
                <div className="absolute h-28 w-28 rotate-12 rounded-2xl border border-current opacity-15" />
                <Icon size={48} strokeWidth={1.2} aria-hidden="true" />
                <span className="absolute right-4 top-4 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] text-[var(--muted)]">
                  {project.state === "planned"
                    ? text("Planned", "Geplant")
                    : project.state === "building"
                      ? text("In development", "In Entwicklung")
                      : text("Web application", "Webanwendung")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="mt-2 text-xs font-medium text-[var(--accent)]">
                  {project.label[language]}
                </p>
                <p className="mt-4 flex-1 text-sm leading-7 text-[var(--muted)]">
                  {project.description[language]}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((value) => (
                    <li
                      key={value}
                      className="rounded-md border border-[var(--border)] px-2 py-1 text-[10px] text-[var(--muted)]"
                    >
                      {tag(value)}
                    </li>
                  ))}
                </ul>
                {"href" in project ? (
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
                    <Link
                      href={project.href}
                      {...(project.href.startsWith("https:")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                    >
                      {text("Explore project", "Projekt ansehen")}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                    {"source" in project && (
                      <a
                        href={project.source}
                        aria-label={text(
                          "QR Studio source code",
                          "QR-Studio-Quellcode",
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-[var(--muted)] hover:text-[var(--foreground)]"
                      >
                        <GitFork size={17} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                ) : (
                  <p className="mt-6 border-t border-[var(--border)] pt-4 text-xs leading-6 text-[var(--muted)]">
                    {text(
                      "Concept stage · No application available yet",
                      "Konzeptphase · Noch keine fertige Anwendung",
                    )}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {visible.length === 0 && (
        <p role="status" className="mt-8 text-sm text-[var(--muted)]">
          {text(
            "No projects match. Try another search or filter.",
            "Keine passenden Projekte. Versuche einen anderen Suchbegriff oder Filter.",
          )}
        </p>
      )}
    </div>
  );
}
