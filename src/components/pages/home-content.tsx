"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Code2,
  Network,
  Terminal,
} from "lucide-react";
import { useSiteLanguage } from "@/components/ui/language-provider";

export function HomeContent() {
  const { text } = useSiteLanguage();
  const destinations = [
    {
      href: "/projects",
      icon: Code2,
      number: "01",
      title: text("The things I build", "Was ich entwickle"),
      description: text(
        "Web applications, learning tools and experiments. Explore the projects and the ideas behind them.",
        "Webanwendungen, Lerntools und Experimente. Entdecke die Projekte und ihre Ideen.",
      ),
      action: text("Explore projects", "Projekte entdecken"),
    },
    {
      href: "/blog",
      icon: BookOpen,
      number: "02",
      title: text("The things I’m learning", "Was ich lerne"),
      description: text(
        "Technical explanations, interactive practice and visual lessons for mathematics, computer science and IT.",
        "Technische Erklärungen, interaktive Übungen und visuelle Lektionen zu Mathematik, Informatik und IT.",
      ),
      action: text("Visit LearnBlog", "LearnBlog öffnen"),
    },
    {
      href: "/about",
      icon: Braces,
      number: "03",
      title: text("The person behind it", "Der Mensch dahinter"),
      description: text(
        "I’m Chiar, a developer based in Switzerland. Get to know what drives my work and what I’m focusing on now.",
        "Ich bin Chiar, Entwickler in der Schweiz. Erfahre, was meine Arbeit antreibt und womit ich mich gerade beschäftige.",
      ),
      action: text("About me", "Über mich"),
    },
  ];
  return (
    <div id="top" className="overflow-hidden">
      <section className="container-main grid items-center gap-12 pb-16 pt-36 sm:pb-24 sm:pt-44 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
            Chiar Abdi ·{" "}
            {text("Developer in Switzerland", "Entwickler in der Schweiz")}
          </p>
          <h1 className="text-[clamp(3rem,6.5vw,6rem)] font-semibold leading-[1.05] tracking-[-.065em]">
            {text("Useful software.", "Nützliche Software.")}
            <br />
            <span className="gradient-text">
              {text("Clear ideas.", "Klare Ideen.")}
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">
            {text(
              "I build web applications, explore how systems work and make technical ideas easier to understand.",
              "Ich entwickle Webanwendungen, erkunde die Funktionsweise von Systemen und mache technische Ideen verständlicher.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0b1020]"
            >
              {text("Explore my projects", "Meine Projekte entdecken")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-medium"
            >
              {text("Start learning", "Jetzt lernen")}
              <BookOpen size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">
          <div className="mb-7 flex items-center justify-between border-b border-[var(--border)] pb-4">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-[var(--muted)]">
              <Terminal size={15} aria-hidden="true" />
              workspace.ts
            </span>
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-rose-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-400/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            </span>
          </div>
          <div className="space-y-3 font-mono text-xs leading-7 sm:text-sm">
            <p>
              <span className="text-[var(--accent)]">const</span> workspace ={" "}
              {"{"}
            </p>
            <p className="pl-4">
              <span className="text-[var(--muted)]">name:</span>{" "}
              <span className="text-[var(--accent)]">
                &quot;Chiar Abdi&quot;
              </span>
              ,
            </p>
            <p className="pl-4">
              <span className="text-[var(--muted)]">projects:</span> [
            </p>
            {["chiar.dev", "QR Studio", "LearnBlog"].map((name, i) => (
              <p key={name} className="pl-8 text-[var(--accent)]">
                &quot;{name}&quot;{i < 2 ? "," : ""}
              </p>
            ))}
            <p className="pl-4">],</p>
            <p className="pl-4">
              <span className="text-[var(--muted)]">focus:</span>{" "}
              <span className="text-[var(--accent)]">
                &quot;
                {text(
                  "Build. Understand. Share.",
                  "Entwickeln. Verstehen. Teilen.",
                )}
                &quot;
              </span>
            </p>
            <p>{"};"}</p>
          </div>
          <p className="mt-6 border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
            {text(
              "Practical projects. Curious questions. Ongoing work.",
              "Praktische Projekte. Neugierige Fragen. Laufende Entwicklung.",
            )}
          </p>
        </div>
      </section>
      <section
        aria-labelledby="explore-title"
        className="container-main pb-16 sm:pb-24"
      >
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <h2
            id="explore-title"
            className="text-2xl font-semibold tracking-tight"
          >
            {text("Choose where to explore.", "Was möchtest du entdecken?")}
          </h2>
          <span className="font-mono text-xs text-[var(--muted)]">
            {text(
              "Software · Learning · People",
              "Software · Lernen · Menschen",
            )}
          </span>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {destinations.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 transition-colors hover:border-[var(--accent)]/50"
            >
              <div className="flex justify-between">
                <item.icon
                  size={25}
                  className="text-[var(--accent)]"
                  aria-hidden="true"
                />
                <span className="font-mono text-xs text-[var(--muted)]">
                  {item.number}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {item.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                {item.action}
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="container-main pb-16 sm:pb-24">
        <div className="grid gap-8 rounded-2xl border border-[var(--border)] p-7 sm:p-9 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
              {text("My technical direction", "Meine technische Richtung")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              {text(
                "Build, then look a little deeper.",
                "Entwickeln und genauer hinschauen.",
              )}
            </h2>
            <p className="mt-4 leading-8 text-[var(--muted)]">
              {text(
                "Frontend development is my practical focus. Alongside it, I’m strengthening programming fundamentals, IT systems and the mathematics behind computer science.",
                "Frontend-Entwicklung ist mein praktischer Schwerpunkt. Daneben vertiefe ich Programmiergrundlagen, IT-Systeme und die Mathematik hinter der Informatik.",
              )}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]"
            >
              {text("More about my approach", "Mehr über meine Arbeitsweise")}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-3">
            {[
              {
                icon: Code2,
                title: text("Web development", "Webentwicklung"),
                tools: "React · Next.js · TypeScript · HTML · CSS",
              },
              {
                icon: Braces,
                title: text("Programming foundations", "Programmiergrundlagen"),
                tools: text(
                  "Python · C · Algorithms · Data structures",
                  "Python · C · Algorithmen · Datenstrukturen",
                ),
              },
              {
                icon: Network,
                title: text("Systems & networking", "Systeme & Netzwerke"),
                tools: text(
                  "Linux · Windows · TCP/IP · Virtualization",
                  "Linux · Windows · TCP/IP · Virtualisierung",
                ),
              },
            ].map((area) => (
              <div
                key={area.title}
                className="flex gap-4 rounded-xl bg-[var(--surface)] p-4"
              >
                <area.icon
                  size={21}
                  className="mt-1 shrink-0 text-[var(--accent)]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-semibold">{area.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[var(--muted)]">
                    {area.tools}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container-main pb-20">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-[var(--accent-soft)] p-7 sm:p-9">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {text(
                "Something worth building together?",
                "Eine Idee für ein gemeinsames Projekt?",
              )}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              {text(
                "Let’s talk about software, IT or a useful idea.",
                "Sprechen wir über Software, IT oder eine nützliche Idee.",
              )}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)]"
          >
            {text("Get in touch", "Kontakt aufnehmen")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
