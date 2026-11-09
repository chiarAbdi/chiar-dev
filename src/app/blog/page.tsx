import Link from "next/link";

const courses = [
  {
    number: "01",
    title: "Math from Zero",
    level: "Complete beginner",
    lessons: "18 lessons",
    description:
      "Start with numbers and arithmetic, then learn fractions, percentages, algebra, equations and functions.",
    topics: ["Arithmetic", "Fractions", "Algebra", "Functions"],
    href: "/learn/math-from-zero",
    symbol: "∑",
  },
  {
    number: "02",
    title: "Discrete Mathematics",
    level: "Computer Science",
    lessons: "78 lessons",
    description:
      "Build a foundation in mathematical logic, sets, relations, proofs, combinatorics, number theory and graph theory.",
    topics: ["Logic", "Proofs", "Sets", "Graphs"],
    href: "/learn/discrete-math/foundation",
    symbol: "∀",
  },
  {
    number: "03",
    title: "ICT Systems & Network",
    level: "IT Support & Administration",
    lessons: "54 lessons",
    description:
      "Learn operating systems, Windows and Linux, users and resources, networking, security and server administration.",
    topics: ["Windows", "Linux", "Networking", "Servers"],
    href: "/learn/ict-siz",
    symbol: "⌘",
  },
];

export default function BlogPage() {
  return (
    <main className="container-main section-space">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
          LearnBlog Academy
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Learn. Understand. Teach.
        </h1>

        <p className="mt-6 text-base leading-8 text-slate-400">
          Welcome to an independent learning platform for mathematics, computer
          science and information technology. Start from the basics and build
          your skills step by step with explanations, examples and practical
          exercises.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <article
            key={course.number}
            className="flex flex-col rounded-2xl border border-slate-700/60 bg-slate-900/60 p-7 transition hover:border-indigo-400/60"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold tracking-widest text-indigo-400">
                COURSE {course.number}
              </span>
              <span className="text-3xl text-indigo-300">{course.symbol}</span>
            </div>

            <h2 className="mt-7 text-2xl font-bold">{course.title}</h2>

            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="rounded-full border border-slate-700 px-3 py-1">
                {course.level}
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1">
                {course.lessons}
              </span>
            </div>

            <p className="mt-6 flex-1 text-sm leading-7 text-slate-400">
              {course.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {course.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-md bg-indigo-400/10 px-2.5 py-1 text-xs text-indigo-300"
                >
                  {topic}
                </span>
              ))}
            </div>

            <Link
              href={course.href}
              className="mt-8 inline-flex w-fit items-center rounded-lg bg-indigo-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-indigo-300"
            >
              Explore course →
            </Link>
          </article>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border border-slate-700/60 p-7">
        <h2 className="text-xl font-bold">Your learning journey</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
          New to mathematics? Start with Math from Zero. Preparing for Computer
          Science? Explore Discrete Mathematics. Interested in IT support,
          systems and networking? Follow the ICT Systems & Network learning
          path.
        </p>
      </section>
    </main>
  );
}
