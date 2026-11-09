"use client";

import { useSiteLanguage } from "@/components/ui/language-provider";
import translations from "@/lib/about-translations.json";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Layers3,
  MapPin,
} from "lucide-react";
import portrait from "@/assets/chiar-abdi.webp";
import { QuietBackground } from "@/components/about/quiet-background";

const projects = [
  {
    number: "01",
    title: "chiar.dev",
    label: "My development space",
    description:
      "A place for the software I build, the ideas I explore and the things I’m learning along the way.",
    tags: ["Next.js", "TypeScript", "React"],
    href: "/",
    link: "Explore the portfolio",
    icon: Code2,
  },
  {
    number: "02",
    title: "LearnBlog",
    label: "Making technical ideas clearer",
    description:
      "Explanations, interactive exercises and original visual lessons for mathematics, computer science and IT.",
    tags: ["Visual lessons", "Interactive learning", "Quizzes"],
    href: "/blog",
    link: "Find something to learn",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "QR Studio",
    label: "A practical web application",
    description:
      "A QR code project built around a simple goal: turn a useful idea into an approachable application.",
    tags: ["Web application", "QR codes", "Interface design"],
    href: "https://qr-chiarabdi.vercel.app/",
    link: "Open QR Studio",
    icon: Layers3,
  },
];

export function AboutContent() {
  const { language } = useSiteLanguage();
  const tr = (value: string) =>
    language === "de"
      ? ((translations as Record<string, string>)[value] ?? value)
      : value;
  return (
    <div id="top" className="pb-20 pt-28 sm:pb-28 sm:pt-32">
      <div className="container-main">
        <QuietBackground>
          <div className="relative px-6 pb-14 pt-9 sm:px-10 sm:pb-20 sm:pt-12 lg:px-14 lg:pb-24 lg:pt-14">
            <div className="flex items-center gap-5">
              <Image
                src={portrait}
                alt="Chiar Abdi"
                width={112}
                height={112}
                sizes="112px"
                loading="eager"
                fetchPriority="high"
                placeholder="blur"
                className="h-24 w-24 shrink-0 rounded-2xl border border-white/20 object-cover shadow-xl sm:h-28 sm:w-28"
              />
              <div>
                <p className="text-lg font-semibold tracking-tight">
                  Chiar Abdi
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {tr("Developer & curious builder")}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin size={12} aria-hidden="true" />
                  {tr("Lucerne, Switzerland")}
                </p>
              </div>
            </div>

            <p className="mb-5 mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8dd7dc]">
              {tr("Build. Understand. Share.")}
            </p>
            <h1
              id="about-title"
              className="max-w-3xl text-[clamp(2.7rem,5.3vw,4.7rem)] font-semibold leading-[1.07] tracking-[-0.055em]"
            >
              {tr("Building software.")}
              <br />
              <span className="text-[#adc3fb]">
                {tr("Sharing what I learn.")}
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              {tr(
                "I’m Chiar. I build web applications and turn what I learn into clear explanations, interactive tools and visual lessons.",
              )}
            </p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
              {tr(
                "Right now, that means developing chiar.dev and LearnBlog, exploring IT systems, and strengthening my computer science foundations.",
              )}
            </p>
            <Link
              href="/projects"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#c4d3ff] px-5 py-3 text-sm font-semibold text-[#101827] transition-colors hover:bg-white"
            >
              {tr("See what I’m building")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </QuietBackground>

        <section
          id="current-work"
          aria-labelledby="current-work-title"
          className="pt-16 sm:pt-20"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                {tr("What I’m working on")}
              </p>
              <h2
                id="current-work-title"
                className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
              >
                {tr("A few things taking shape.")}
              </h2>
            </div>
            <span className="text-xs text-[var(--muted)]">
              {tr("Software · Learning · Experiments")}
            </span>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="surface-card flex flex-col p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <project.icon
                    size={23}
                    className="text-[var(--accent)]"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs text-[var(--muted)]">
                    {project.number}
                  </span>
                </div>
                <h3 className="mt-7 text-2xl font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs font-medium text-[var(--accent)]">
                  {tr(project.label)}
                </p>
                <p className="mt-4 flex-1 text-sm leading-7 text-[var(--muted)]">
                  {tr(project.description)}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tr(tag)}
                      className="rounded-md border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--muted)]"
                    >
                      {tr(tag)}
                    </li>
                  ))}
                </ul>
                <Link
                  href={project.href}
                  {...(project.href.startsWith("https:")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]"
                >
                  {tr(project.link)}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="approach-title"
          className="mt-16 grid gap-6 border-t border-[var(--border)] pt-10 sm:mt-20 md:grid-cols-[0.7fr_1.3fr] md:gap-16"
        >
          <h2
            id="approach-title"
            className="text-2xl font-semibold tracking-tight"
          >
            {tr("Learn it. Build with it.")}
            <br />
            {tr("Make it easier to understand.")}
          </h2>
          <div className="max-w-2xl space-y-4 text-sm leading-8 text-[var(--muted)]">
            <p>
              {tr(
                "I like connecting the ideas behind software with something I can actually use. Sometimes that’s an application. Sometimes it’s a small experiment or a visual explanation that makes a difficult topic click.",
              )}
            </p>
            <p>
              {tr(
                "This space grows with that work: practical projects, honest learning and useful things to share.",
              )}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
