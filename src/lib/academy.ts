export type Language = "en" | "de";
export type Localized = Record<Language, string>;
export const t = (en: string, de: string): Localized => ({ en, de });

export type Question = {
  id: string;
  question: Localized;
  options: Localized[];
  correct: number;
  explanation: Localized;
};
export const questions: Question[] = [
  {
    id: "q1",
    question: t(
      "Which of these is a proposition?",
      "Welche Aussage ist eine Proposition?",
    ),
    options: [
      t("Close the door!", "Schließe die Tür!"),
      t("Is it raining?", "Regnet es?"),
      t("7 is a prime number.", "7 ist eine Primzahl."),
      t("Please sit down.", "Bitte setz dich."),
    ],
    correct: 2,
    explanation: t(
      "A proposition is a declarative statement with a definite truth value. The statement about 7 is true.",
      "Eine Proposition ist ein Aussagesatz mit eindeutigem Wahrheitswert. Die Aussage über 7 ist wahr.",
    ),
  },
  {
    id: "q2",
    question: t(
      "If P is true and Q is false, what is P ∧ Q?",
      "Wenn P wahr und Q falsch ist, welchen Wert hat P ∧ Q?",
    ),
    options: [
      t("True", "Wahr"),
      t("False", "Falsch"),
      t("Both", "Beides"),
      t("Undefined", "Undefiniert"),
    ],
    correct: 1,
    explanation: t(
      "AND (∧) is true only if both propositions are true.",
      "UND (∧) ist nur wahr, wenn beide Aussagen wahr sind.",
    ),
  },
  {
    id: "q3",
    question: t(
      "Which expression is equivalent to ¬(P ∧ Q)?",
      "Welcher Ausdruck ist äquivalent zu ¬(P ∧ Q)?",
    ),
    options: [
      t("¬P ∧ ¬Q", "¬P ∧ ¬Q"),
      t("P ∨ Q", "P ∨ Q"),
      t("¬P ∨ ¬Q", "¬P ∨ ¬Q"),
      t("P → Q", "P → Q"),
    ],
    correct: 2,
    explanation: t(
      "De Morgan's law transforms the negation of AND into OR of the negations.",
      "Nach dem De-Morgan-Gesetz wird die Negation einer UND-Verknüpfung zur ODER-Verknüpfung der Negationen.",
    ),
  },
  {
    id: "q4",
    question: t("When is P → Q false?", "Wann ist P → Q falsch?"),
    options: [
      t("P true, Q false", "P wahr, Q falsch"),
      t("P false, Q true", "P falsch, Q wahr"),
      t("P false, Q false", "P falsch, Q falsch"),
      t("P true, Q true", "P wahr, Q wahr"),
    ],
    correct: 0,
    explanation: t(
      "An implication is false only when its premise is true and its conclusion is false.",
      "Eine Implikation ist nur falsch, wenn die Voraussetzung wahr und die Folgerung falsch ist.",
    ),
  },
  {
    id: "q5",
    question: t(
      "How many rows does a truth table with three independent variables have?",
      "Wie viele Zeilen hat eine Wahrheitstabelle mit drei unabhängigen Variablen?",
    ),
    options: [t("3", "3"), t("6", "6"), t("8", "8"), t("9", "9")],
    correct: 2,
    explanation: t(
      "Each variable has two possible values, so three variables produce 2³ = 8 combinations.",
      "Jede Variable hat zwei mögliche Werte. Drei Variablen ergeben daher 2³ = 8 Kombinationen.",
    ),
  },
];
