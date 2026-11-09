import { t } from "./academy";

export const projects = [
  {
    id: "qr-studio",
    title: "QR Studio",
    category: "web",
    state: "available",
    href: "https://qr-chiarabdi.vercel.app/",
    source: "https://github.com/chiarAbdi/qr-studio",
    label: t(
      "A practical QR code application",
      "Eine praktische QR-Code-Anwendung",
    ),
    description: t(
      "A focused web application that turns a simple idea into something useful: creating QR codes through an approachable interface.",
      "Eine Webanwendung, die aus einer einfachen Idee etwas Nützliches macht: QR-Codes über eine zugängliche Oberfläche erstellen.",
    ),
    tags: ["Web app", "QR codes", "UI design"],
  },
  {
    id: "chiar-dev",
    title: "chiar.dev",
    category: "web",
    state: "building",
    href: "/about",
    label: t(
      "My portfolio, built in the open",
      "Mein Portfolio als Entwicklungsprojekt",
    ),
    description: t(
      "The home for my development work. Built with Next.js, React and TypeScript, with a focus on clear navigation, thoughtful interfaces and local-first learning tools.",
      "Der Ort für meine Entwicklungsarbeit. Mit Next.js, React und TypeScript, klarer Navigation, durchdachten Oberflächen und lokal gespeicherten Lerndaten.",
    ),
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "learnblog",
    title: "LearnBlog Academy",
    category: "learning",
    state: "building",
    href: "/blog",
    label: t(
      "Technical ideas, made clearer",
      "Technische Ideen verständlich machen",
    ),
    description: t(
      "Mathematics, computer science and IT explained through guided lessons, interactive exercises, quizzes and original visual explanations.",
      "Mathematik, Informatik und IT mit geführten Lektionen, interaktiven Übungen, Quizzen und eigenen visuellen Erklärungen.",
    ),
    tags: ["Education", "Interactive tools", "Visual lessons"],
  },
  {
    id: "systems-lab",
    title: "IT Systems Lab",
    category: "systems",
    state: "planned",
    label: t("Hands-on systems experiments", "Praktische Systemexperimente"),
    description: t(
      "A planned collection of Linux, networking, virtualization and troubleshooting labs, with reproducible steps and notes on what each experiment teaches.",
      "Eine geplante Sammlung von Linux-, Netzwerk-, Virtualisierungs- und Fehleranalyse-Labs mit nachvollziehbaren Schritten und Lernnotizen.",
    ),
    tags: ["Linux", "Networking", "Virtualization"],
  },
  {
    id: "study-hub",
    title: "BFH Study Hub",
    category: "learning",
    state: "planned",
    label: t(
      "A personal space for structured study",
      "Ein persönlicher Bereich für strukturiertes Lernen",
    ),
    description: t(
      "A planned private dashboard for courses, lecture notes, practice exercises and study milestones. The concept is on the roadmap; it is not a working student portal.",
      "Ein geplantes privates Dashboard für Kurse, Vorlesungsnotizen, Übungen und Lernziele. Bisher ein Konzept auf der Roadmap, kein fertiges Studienportal.",
    ),
    tags: ["Study tools", "Notes", "Course planning"],
  },
] as const;
