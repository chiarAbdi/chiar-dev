"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  FileCode2,
  GraduationCap,
  Layers3,
  MapPin,
  Network,
  Play,
  QrCode,
  Server,
  Terminal,
} from "lucide-react";
import type { ReactNode } from "react";

const skills = [
  {
    title: "Frontend Development",
    icon: Code2,
    description:
      "Building responsive interfaces and interactive applications with component-based architecture.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    status: "Development focus",
  },
  {
    title: "Programming Fundamentals",
    icon: Braces,
    description:
      "Strengthening programming logic, algorithms, data structures, and problem-solving techniques.",
    technologies: ["Python", "C", "Algorithms", "Data Structures"],
    status: "Continuing to learn",
  },
  {
    title: "IT Systems & Networking",
    icon: Network,
    description:
      "Exploring operating systems, computer networks, virtualization, and technical support.",
    technologies: ["Linux", "Windows", "TCP/IP", "Virtualization"],
    status: "Learning & lab work",
  },
];

const roadmap = [
  {
    number: "01",
    title: "Build real applications",
    description:
      "Develop and improve software projects, with QR Studio and chiar.dev as practical examples.",
    state: "In progress",
  },
  {
    number: "02",
    title: "Strengthen IT foundations",
    description:
      "Practice systems administration, networking, troubleshooting, and topics relevant to SIZ preparation.",
    state: "Learning",
  },
  {
    number: "03",
    title: "Prepare for BFH",
    description:
      "Study programming, discrete mathematics, algorithms, and other computer science fundamentals.",
    state: "Preparation",
  },
  {
    number: "04",
    title: "Build a learning ecosystem",
    description:
      "Develop LearnBlog and a private Study Hub to organize courses, lectures, exercises, and progress.",
    state: "Planned",
  },
];

const studyModules = [
  { name: "Programming", progress: 0, icon: Code2 },
  { name: "Discrete Mathematics", progress: 0, icon: Braces },
  { name: "Computer Systems", progress: 0, icon: Cpu },
  { name: "Networks", progress: 0, icon: Network },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
      <span className="text-[var(--accent)]">{number}</span>
      <span className="h-px w-8 bg-[var(--border)]" />
      <span className="text-[var(--muted)]">{children}</span>
    </div>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <Eyebrow number={number}>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[var(--muted)]">
        {description}
      </p>
    </Reveal>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-lg border border-[var(--border)] px-3 py-1.5 font-mono text-[11px] text-[var(--muted)]">
      {children}
    </span>
  );
}

function DeveloperWindow() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-8 rounded-full bg-indigo-500/15 blur-[85px]" />

      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0d1426] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="font-mono text-xs text-slate-400">
            about-chiar.ts
          </span>
          <FileCode2 size={16} className="text-slate-500" />
        </div>

        <div className="overflow-x-auto p-5 font-mono text-[11px] leading-7 sm:p-7 sm:text-sm">
          <div>
            <span className="text-purple-400">const</span>
            <span className="text-white"> developer </span>
            <span className="text-purple-400">=</span>
            <span className="text-white"> {"{"}</span>
          </div>

          <div className="pl-5">
            <span className="text-blue-300">name</span>
            <span className="text-white">: </span>
            <span className="text-emerald-300">&quot;Chiar Abdi&quot;</span>
            <span className="text-white">,</span>
          </div>

          <div className="pl-5">
            <span className="text-blue-300">location</span>
            <span className="text-white">: </span>
            <span className="text-emerald-300">&quot;Switzerland&quot;</span>
            <span className="text-white">,</span>
          </div>

          <div className="pl-5">
            <span className="text-blue-300">level</span>
            <span className="text-white">: </span>
            <span className="text-emerald-300">&quot;Intermediate&quot;</span>
            <span className="text-white">,</span>
          </div>

          <div className="pl-5">
            <span className="text-blue-300">focus</span>
            <span className="text-white">: [</span>
          </div>

          {["Software Engineering", "IT & Systems", "Computer Science"].map(
            (item, i) => (
              <div key={item} className="pl-10">
                <span className="text-emerald-300">&quot;{item}&quot;</span>
                <span className="text-white">{i < 2 ? "," : ""}</span>
              </div>
            ),
          )}

          <div className="pl-5 text-white">],</div>

          <div className="pl-5">
            <span className="text-blue-300">mindset</span>
            <span className="text-white">: </span>
            <span className="text-emerald-300">
              &quot;Always learning&quot;
            </span>
          </div>

          <div className="text-white">{"};"}</div>

          <div className="mt-6 border-t border-white/10 pt-4 text-slate-400">
            <span className="text-emerald-400">$</span> npm run build-future
          </div>
          <div className="text-emerald-400">
            ✓ Ready to create something new
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -right-3 hidden rounded-xl border border-indigo-400/25 bg-[#182443] px-5 py-3 shadow-xl sm:block">
        <p className="font-mono text-xs text-indigo-200">
          &lt;Developer mindset=&quot;growth&quot; /&gt;
        </p>
      </div>
    </div>
  );
}

function QRPreview() {
  const finder = (r: number, c: number, sr: number, sc: number) => {
    const y = r - sr;
    const x = c - sc;
    if (y < 0 || y > 6 || x < 0 || x > 6) return null;
    return (
      y === 0 ||
      y === 6 ||
      x === 0 ||
      x === 6 ||
      (y >= 2 && y <= 4 && x >= 2 && x <= 4)
    );
  };

  return (
    <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden bg-[#111c38] p-8">
      <div className="absolute h-64 w-64 rounded-full bg-indigo-500/25 blur-[75px]" />
      <div className="relative w-full max-w-[300px] rounded-2xl border border-white/15 bg-[#1b2949] p-5 shadow-2xl">
        <div className="mb-5 flex items-center gap-2 text-white">
          <QrCode size={20} className="text-indigo-300" />
          <span className="font-semibold">QR Studio</span>
        </div>

        <div className="rounded-xl bg-[#101a32] p-4">
          <p className="mb-2 text-[10px] text-slate-400">Website URL</p>
          <div className="mb-5 rounded-md border border-white/10 bg-white/5 px-3 py-2 font-mono text-[10px] text-slate-300">
            https://example.com
          </div>

          <div className="mx-auto grid aspect-square w-44 grid-cols-21 gap-px rounded-lg bg-white p-3">
            {Array.from({ length: 441 }, (_, i) => {
              const r = Math.floor(i / 21);
              const c = i % 21;
              const positions = [
                finder(r, c, 0, 0),
                finder(r, c, 0, 14),
                finder(r, c, 14, 0),
              ];
              const isFinder = positions.some((v) => v !== null);
              const filled = isFinder
                ? positions.some((v) => v === true)
                : (r * 13 + c * 7 + r * c) % 7 < 3;
              return (
                <span
                  key={i}
                  className={filled ? "bg-[#14213d]" : "bg-white"}
                />
              );
            })}
          </div>

          <p className="mt-3 text-center text-[10px] text-slate-400">
            Illustrative preview · Not scannable
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div id="top" className="overflow-hidden">
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center py-28 sm:py-36">
        <div className="hero-glow" />

        <div className="container-main relative z-10 grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-mono text-xs text-[var(--muted)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Developer · IT Enthusiast · CS Journey
            </div>

            <p className="mb-4 font-mono text-sm text-[var(--accent)]">
              Hello, I&apos;m Chiar Abdi.
            </p>

            <h1 className="max-w-3xl text-[clamp(3.1rem,6vw,6rem)] leading-[1.07] font-semibold tracking-[-0.065em]">
              Building software.
              <br />
              <span className="gradient-text">Understanding systems.</span>
              <br />
              Never stopping learning.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              I&apos;m an intermediate developer based in Switzerland, building
              practical web applications and expanding my knowledge of IT
              systems and computer science as I prepare for the next chapter of
              my studies at BFH.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-[#0b1020] transition-transform hover:-translate-y-1"
              >
                Explore my projects <ArrowUpRight size={17} />
              </Link>

              <Link
                href="#study"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-6 py-3.5 text-sm font-medium hover:bg-[var(--surface)]"
              >
                My CS journey <ArrowRight size={17} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Python", "IT Systems"].map(
                (tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ),
              )}
            </div>

            <div className="mt-10 flex items-center gap-2 text-xs text-[var(--muted)]">
              <MapPin size={15} />
              Based in Switzerland
            </div>
          </Reveal>

          <Reveal delay={0.15} className="hidden lg:block">
            <DeveloperWindow />
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-space">
        <div className="container-main">
          <SectionHeading
            number="01"
            eyebrow="Featured project"
            title="Software I build."
            description="A portfolio should show actual work. Here is one of my real applications, with more projects and technical experiments to follow."
          />

          <Reveal>
            <div className="surface-card grid overflow-hidden lg:grid-cols-2">
              <div className="flex flex-col justify-between p-7 sm:p-11">
                <div>
                  <div className="mb-8 flex items-center gap-2 font-mono text-xs text-[var(--accent)]">
                    <QrCode size={17} />
                    LIVE WEB APPLICATION
                  </div>

                  <h3 className="text-4xl font-semibold tracking-tight">
                    QR Studio
                  </h3>

                  <p className="mt-5 max-w-lg leading-8 text-[var(--muted)]">
                    A QR code generator with a clean, approachable interface. A
                    practical project focused on turning a simple idea into a
                    usable web application.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    <Tag>Web Application</Tag>
                    <Tag>QR Generation</Tag>
                    <Tag>UI Design</Tag>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-5">
                  <a
                    href="https://qr-chiarabdi.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                  >
                    <Play size={16} /> Try QR Studio
                    <ArrowUpRight size={16} />
                  </a>

                  <a
                    href="https://github.com/chiarAbdi/qr-studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium"
                  >
                    View source <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <QRPreview />
            </div>
          </Reveal>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="surface-card h-full p-8">
                <Terminal size={27} className="mb-7 text-[var(--accent)]" />
                <p className="mb-2 font-mono text-xs text-[var(--muted)]">
                  IN DEVELOPMENT
                </p>
                <h3 className="text-2xl font-semibold">chiar.dev</h3>
                <p className="mt-4 leading-7 text-[var(--muted)]">
                  This portfolio itself is a growing software project, built
                  with Next.js, TypeScript, and modern frontend tooling.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  <Tag>Next.js</Tag>
                  <Tag>TypeScript</Tag>
                  <Tag>Tailwind CSS</Tag>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="surface-card h-full p-8">
                <Server size={27} className="mb-7 text-[var(--accent)]" />
                <p className="mb-2 font-mono text-xs text-[var(--muted)]">
                  UPCOMING
                </p>
                <h3 className="text-2xl font-semibold">IT Systems Lab</h3>
                <p className="mt-4 leading-7 text-[var(--muted)]">
                  A collection of hands-on experiments covering Linux, operating
                  systems, networks, virtualization, and troubleshooting.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  <Tag>Linux</Tag>
                  <Tag>Networking</Tag>
                  <Tag>Virtual Machines</Tag>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section-space">
        <div className="container-main">
          <SectionHeading
            number="02"
            eyebrow="Technical direction"
            title="My technical toolkit."
            description="Technologies I use for development and subjects I'm actively strengthening through study and hands-on practice."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {skills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <Reveal key={skill.title} delay={index * 0.08}>
                  <div className="surface-card h-full p-7 sm:p-8">
                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={24} />
                    </div>

                    <h3 className="text-xl font-semibold">{skill.title}</h3>

                    <p className="mt-4 min-h-28 text-sm leading-7 text-[var(--muted)]">
                      {skill.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {skill.technologies.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center gap-2 border-t border-[var(--border)] pt-5 text-xs text-[var(--muted)]">
                      <CheckCircle2
                        size={15}
                        className="text-[var(--accent)]"
                      />
                      {skill.status}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* BFH STUDY HUB */}
      <section id="study" className="section-space">
        <div className="container-main">
          <SectionHeading
            number="03"
            eyebrow="Computer science"
            title="Preparing for BFH."
            description="My computer science journey deserves more than a paragraph. We're building a dedicated learning environment to support structured study and long-term progress."
          />

          <Reveal>
            <div className="surface-card overflow-hidden">
              <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                <div className="p-7 sm:p-11">
                  <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <GraduationCap size={25} />
                  </div>

                  <p className="font-mono text-xs text-[var(--accent)]">
                    BFH COMPUTER SCIENCE
                  </p>

                  <h3 className="mt-4 text-3xl font-semibold tracking-tight">
                    My Study Hub
                  </h3>

                  <p className="mt-5 leading-8 text-[var(--muted)]">
                    A future personal dashboard for organizing lectures, study
                    notes, exercises, quizzes, and learning milestones.
                  </p>

                  <div className="mt-8 space-y-3 text-sm text-[var(--muted)]">
                    {[
                      "Semester and course organization",
                      "Lecture notes and resources",
                      "Practice exercises and quizzes",
                      "Progress tracking",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle2
                          size={16}
                          className="text-[var(--accent)]"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <p className="mt-8 font-mono text-xs text-[var(--muted)]">
                    Planned · Private dashboard
                  </p>
                </div>

                <div className="bg-[#111b34] p-5 sm:p-9">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#192540] p-5 sm:p-7">
                    <div className="mb-7 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-indigo-300">
                          Interface concept
                        </p>
                        <h4 className="mt-2 text-xl font-semibold text-white">
                          Study Overview
                        </h4>
                      </div>
                      <GraduationCap size={25} className="text-indigo-300" />
                    </div>

                    <div className="mb-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs text-slate-400">Study modules</p>
                        <p className="mt-2 text-2xl font-semibold text-white">
                          04
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs text-slate-400">Tracking</p>
                        <p className="mt-2 text-lg font-semibold text-indigo-300">
                          Planned
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {studyModules.map((module) => {
                        const Icon = module.icon;
                        return (
                          <div
                            key={module.name}
                            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                          >
                            <div className="flex items-center gap-3">
                              <Icon size={17} className="text-indigo-300" />
                              <span className="flex-1 text-xs font-medium text-white">
                                {module.name}
                              </span>
                              <span className="font-mono text-[10px] text-slate-400">
                                Not tracked
                              </span>
                            </div>
                            <div className="mt-3 h-1.5 rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-indigo-400"
                                style={{
                                  width: `${module.progress}%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <p className="mt-5 text-center font-mono text-[10px] text-slate-400">
                      Concept preview — no live study data yet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="section-space">
        <div className="container-main">
          <SectionHeading
            number="04"
            eyebrow="My roadmap"
            title="Learning with a purpose."
            description="A practical path connecting software projects, IT education, and computer science."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {roadmap.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.06}>
                <div className="surface-card h-full p-7">
                  <div className="mb-7 flex items-center justify-between">
                    <span className="font-mono text-sm text-[var(--accent)]">
                      {item.number}
                    </span>
                    <span className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[10px] text-[var(--muted)]">
                      {item.state}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNBLOG */}
      <section className="section-space">
        <div className="container-main">
          <SectionHeading
            number="05"
            eyebrow="LearnBlog"
            title="Documenting what I learn."
            description="A future collection of technical articles, programming notes, experiments, and computer science explanations."
          />

          <Reveal>
            <div className="surface-card grid items-center gap-10 p-8 sm:p-11 lg:grid-cols-2">
              <div>
                <BookOpen size={32} className="mb-7 text-[var(--accent)]" />

                <h3 className="text-2xl font-semibold">Learn. Build. Share.</h3>

                <p className="mt-5 leading-8 text-[var(--muted)]">
                  LearnBlog will grow alongside my development and BFH
                  preparation. The goal is to turn technical learning into
                  clear, useful explanations and practical examples.
                </p>

                <Link
                  href="/blog"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                >
                  Visit LearnBlog
                  <ArrowUpRight size={17} />
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Programming Notes",
                    subtitle: "Python, C, JavaScript, and algorithms",
                    icon: FileCode2,
                  },
                  {
                    title: "Computer Science",
                    subtitle: "Discrete math and CS fundamentals",
                    icon: GraduationCap,
                  },
                  {
                    title: "Systems & Networks",
                    subtitle: "Linux, networking, and IT labs",
                    icon: Server,
                  },
                ].map((category) => {
                  const Icon = category.icon;

                  return (
                    <div
                      key={category.title}
                      className="flex items-center gap-4 rounded-xl border border-[var(--border)] p-4"
                    >
                      <Icon size={21} className="text-[var(--accent)]" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">
                          {category.title}
                        </p>
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          {category.subtitle}
                        </p>
                      </div>
                      <ChevronRight size={17} className="text-[var(--muted)]" />
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section-space">
        <div className="container-main">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] bg-[#151f3b] px-7 py-20 text-center text-white sm:px-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.28),transparent_65%)]" />

              <div className="relative z-10">
                <Layers3 size={30} className="mx-auto mb-7 text-indigo-300" />

                <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                  Let&apos;s build something meaningful.
                </h2>

                <p className="mx-auto mt-7 max-w-xl leading-8 text-slate-300">
                  I&apos;m interested in software development, IT opportunities,
                  technical collaboration, and learning from new challenges.
                </p>

                <Link
                  href="/contact"
                  className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#111827] transition-transform hover:-translate-y-1"
                >
                  Get in touch <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
