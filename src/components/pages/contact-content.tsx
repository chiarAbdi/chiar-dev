"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  Copy,
  GitFork,
  Mail,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { useSiteLanguage } from "@/components/ui/language-provider";
import { site } from "@/lib/site";

export function ContactContent() {
  const { text } = useSiteLanguage();
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  }
  const topics = [
    {
      icon: Code2,
      title: text("Build something together", "Gemeinsam etwas entwickeln"),
      description: text(
        "Software projects, frontend work and useful tools.",
        "Softwareprojekte, Frontend-Entwicklung und nützliche Tools.",
      ),
      subject: "Project collaboration",
    },
    {
      icon: BookOpen,
      title: text("Talk about learning", "Über das Lernen sprechen"),
      description: text(
        "LearnBlog feedback, visual explanations and technical education.",
        "Feedback zu LearnBlog, visuellen Erklärungen und technischem Lernen.",
      ),
      subject: "LearnBlog feedback",
    },
    {
      icon: MessageSquare,
      title: text("Exchange ideas", "Ideen austauschen"),
      description: text(
        "IT, computer science and the questions worth exploring.",
        "IT, Informatik und Fragen, denen wir nachgehen sollten.",
      ),
      subject: "A technical conversation",
    },
  ];
  return (
    <div id="top" className="container-main pb-20 pt-28 sm:pt-36">
      <p className="mb-4 font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
        {text("Get in touch", "Kontakt aufnehmen")}
      </p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
        {text("Have something in mind?", "Eine Idee im Kopf?")}
      </h1>
      <p className="mt-6 max-w-2xl leading-8 text-[var(--muted)]">
        {text(
          "A project, a technical question or feedback on something I’m building. I’m happy to hear from you.",
          "Ein Projekt, eine technische Frage oder Feedback zu etwas, das ich entwickle. Ich freue mich auf deine Nachricht.",
        )}
      </p>
      <div className="mt-9 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
        <section
          aria-labelledby="email-title"
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-9"
        >
          <Mail size={27} className="text-[var(--accent)]" aria-hidden="true" />
          <h2 id="email-title" className="mt-5 text-xl font-semibold">
            {text("Start with an email", "Schreib mir eine E-Mail")}
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 block break-all text-xl font-medium tracking-tight text-[var(--accent)] sm:text-2xl"
          >
            {site.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[#0b1020]"
            >
              {text("Write an email", "E-Mail schreiben")}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm"
            >
              {copied ? (
                <Check size={15} aria-hidden="true" />
              ) : (
                <Copy size={15} aria-hidden="true" />
              )}
              {copied
                ? text("Copied", "Kopiert")
                : text("Copy address", "Adresse kopieren")}
            </button>
          </div>
          <p
            role="status"
            className="mt-4 text-xs leading-6 text-[var(--muted)]"
          >
            {copyFailed
              ? text(
                  "Select the address above and copy it manually.",
                  "Markiere die Adresse oben und kopiere sie manuell.",
                )
              : copied
                ? text(
                    "Email address copied to your clipboard.",
                    "E-Mail-Adresse in die Zwischenablage kopiert.",
                  )
                : text(
                    "Opens your email app. No message is sent automatically.",
                    "Öffnet dein E-Mail-Programm. Es wird nichts automatisch gesendet.",
                  )}
          </p>
        </section>
        <section
          aria-labelledby="github-title"
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-9"
        >
          <GitFork
            size={27}
            className="text-[var(--accent)]"
            aria-hidden="true"
          />
          <h2 id="github-title" className="mt-5 text-xl font-semibold">
            GitHub
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            {text(
              "Find my repositories and follow the technical side of my work.",
              "Entdecke meine Repositories und die technische Seite meiner Projekte.",
            )}
          </p>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
          >
            @chiarAbdi
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <p className="mt-7 flex items-center gap-2 text-xs text-[var(--muted)]">
            <MapPin size={14} aria-hidden="true" />
            {text("Lucerne, Switzerland", "Luzern, Schweiz")}
          </p>
        </section>
      </div>
      <section aria-labelledby="contact-topics" className="mt-12">
        <h2
          id="contact-topics"
          className="text-2xl font-semibold tracking-tight"
        >
          {text(
            "A few things we can talk about",
            "Darüber können wir sprechen",
          )}
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {topics.map((topic) => (
            <a
              key={topic.subject}
              href={`mailto:${site.email}?subject=${encodeURIComponent(topic.subject)}`}
              className="rounded-2xl border border-[var(--border)] p-6 transition-colors hover:bg-[var(--surface)]"
            >
              <topic.icon
                size={22}
                className="text-[var(--accent)]"
                aria-hidden="true"
              />
              <h3 className="mt-4 font-semibold">{topic.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {topic.description}
              </p>
            </a>
          ))}
        </div>
      </section>
      <Link
        href="/projects"
        className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--accent)]"
      >
        {text("Explore my projects first", "Zuerst meine Projekte ansehen")}
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}
