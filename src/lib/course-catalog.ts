import curriculum from "./academy-curriculum.json";
import ictLessons from "./ict-lessons.json";
import { t, type Localized } from "./academy";

export type CourseSummary = {
  id: "zero" | "discrete" | "ict";
  title: Localized;
  description: Localized;
  level: Localized;
  href: string;
  firstLesson: string;
  lessonIds: string[];
  topics: Localized[];
};

// Used by server routes: pass summaries rather than the full curriculum to dashboards.
export const courseCatalog: CourseSummary[] = [
  {
    id: "zero",
    title: t("Math from Zero", "Mathe von Null"),
    description: t(
      "From numbers and fractions to algebra and functions. A clear starting point, without assumed knowledge.",
      "Von Zahlen und Brüchen bis zu Algebra und Funktionen. Ein klarer Einstieg ohne vorausgesetztes Wissen.",
    ),
    level: t("Start from the basics", "Bei den Grundlagen beginnen"),
    href: "/learn/math-from-zero",
    firstLesson: `/learn/math-from-zero/foundation/${curriculum.find((x) => x.course === "zero")!.slug}`,
    lessonIds: curriculum
      .filter((x) => x.course === "zero")
      .map((x) => `zero:${x.slug}`),
    topics: [
      t("Arithmetic", "Arithmetik"),
      t("Algebra", "Algebra"),
      t("Functions", "Funktionen"),
    ],
  },
  {
    id: "discrete",
    title: t("Discrete Mathematics", "Diskrete Mathematik"),
    description: t(
      "Logic, sets, proofs and graphs. Build the mathematical foundations behind computer science.",
      "Logik, Mengen, Beweise und Graphen. Erarbeite die mathematischen Grundlagen der Informatik.",
    ),
    level: t("Computer science foundations", "Grundlagen der Informatik"),
    href: "/learn/discrete-math/foundation",
    firstLesson: `/learn/discrete-math/foundation/${curriculum.find((x) => x.course === "discrete")!.slug}`,
    lessonIds: curriculum
      .filter((x) => x.course === "discrete")
      .map((x) => `discrete:${x.slug}`),
    topics: [
      t("Logic", "Logik"),
      t("Proofs", "Beweise"),
      t("Graphs", "Graphen"),
    ],
  },
  {
    id: "ict",
    title: t("ICT Systems & Network", "ICT-Systeme & Netzwerke"),
    description: t(
      "Explore computers, operating systems, networks and IT support through explanations and practical labs.",
      "Entdecke Computer, Betriebssysteme, Netzwerke und IT-Support anhand von Erklärungen und praktischen Übungen.",
    ),
    level: t("Systems & practical IT", "Systeme & praktische IT"),
    href: "/learn/ict-siz",
    firstLesson: "/learn/ict-siz",
    lessonIds: ictLessons.map((_, index) => `ict:${index}`),
    topics: [
      t("Windows & Linux", "Windows & Linux"),
      t("Networking", "Netzwerke"),
      t("IT support", "IT-Support"),
    ],
  },
];
