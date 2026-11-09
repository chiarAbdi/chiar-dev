import { t, type Localized } from "./academy";

export type Exercise = {
  question: Localized;
  options: Localized[];
  answer: number;
  explanation: Localized;
};
export type Lesson = {
  slug: string;
  title: Localized;
  subtitle: Localized;
  duration: string;
  sections: {
    title: Localized;
    paragraphs: Localized[];
    example: Localized;
    takeaway: Localized;
  }[];
  exercises: Exercise[];
};

export const extraLessons: Lesson[] = [
  {
    slug: "equivalences",
    title: t(
      "Logical Equivalences & De Morgan’s Laws",
      "Logische Äquivalenzen & De-Morgan-Gesetze",
    ),
    subtitle: t(
      "Rewrite complex statements without changing their meaning.",
      "Komplexe Aussagen umformen, ohne ihren Wahrheitswert zu ändern.",
    ),
    duration: "25–35 min",
    sections: [
      {
        title: t("What does equivalence mean?", "Was bedeutet Äquivalenz?"),
        paragraphs: [
          t(
            "Two formulas are logically equivalent when they have the same truth value for every possible assignment of their variables. We write A ≡ B.",
            "Zwei Formeln sind logisch äquivalent, wenn sie bei jeder möglichen Belegung ihrer Variablen denselben Wahrheitswert haben. Wir schreiben A ≡ B.",
          ),
          t(
            "To prove an equivalence, build a truth table and compare the final columns. One matching example is not enough: every row must match.",
            "Um eine Äquivalenz zu beweisen, erstelle eine Wahrheitstabelle und vergleiche die letzten Spalten. Ein einziges passendes Beispiel genügt nicht: Jede Zeile muss übereinstimmen.",
          ),
        ],
        example: t(
          "P → Q ≡ ¬P ∨ Q. Both are false only when P is true and Q is false.",
          "P → Q ≡ ¬P ∨ Q. Beide sind nur falsch, wenn P wahr und Q falsch ist.",
        ),
        takeaway: t(
          "Equivalent expressions can look different but behave identically.",
          "Äquivalente Ausdrücke können unterschiedlich aussehen, verhalten sich aber identisch.",
        ),
      },
      {
        title: t("De Morgan’s laws", "De-Morgan-Gesetze"),
        paragraphs: [
          t(
            "Negating an AND changes it to an OR of the negated parts: ¬(P ∧ Q) ≡ ¬P ∨ ¬Q.",
            "Die Negation einer UND-Verknüpfung ergibt ein ODER der negierten Teile: ¬(P ∧ Q) ≡ ¬P ∨ ¬Q.",
          ),
          t(
            "Negating an OR changes it to an AND of the negated parts: ¬(P ∨ Q) ≡ ¬P ∧ ¬Q. Remember to negate each individual part.",
            "Die Negation einer ODER-Verknüpfung ergibt ein UND der negierten Teile: ¬(P ∨ Q) ≡ ¬P ∧ ¬Q. Vergiss nicht, jeden Teil einzeln zu negieren.",
          ),
        ],
        example: t(
          "Not (sunny AND warm) means (not sunny) OR (not warm).",
          "Nicht (sonnig UND warm) bedeutet (nicht sonnig) ODER (nicht warm).",
        ),
        takeaway: t(
          "Negation crosses the brackets, flips AND/OR, and negates each term.",
          "Die Negation geht durch die Klammer, vertauscht UND/ODER und negiert jeden Term.",
        ),
      },
      {
        title: t("Useful identities", "Nützliche Identitäten"),
        paragraphs: [
          t(
            "Double negation: ¬¬P ≡ P. Identity: P ∧ T ≡ P and P ∨ F ≡ P.",
            "Doppelte Negation: ¬¬P ≡ P. Identität: P ∧ W ≡ P und P ∨ F ≡ P.",
          ),
          t(
            "Distributivity: P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R). These rules help simplify conditions in software.",
            "Distributivität: P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R). Diese Regeln helfen, Bedingungen in Software zu vereinfachen.",
          ),
        ],
        example: t("¬(P ∨ ¬Q) ≡ ¬P ∧ Q.", "¬(P ∨ ¬Q) ≡ ¬P ∧ Q."),
        takeaway: t(
          "Apply one rule at a time and verify difficult transformations with a truth table.",
          "Wende jeweils eine Regel an und prüfe schwierige Umformungen mit einer Wahrheitstabelle.",
        ),
      },
    ],
    exercises: [
      {
        question: t(
          "Which is equivalent to ¬(P ∨ Q)?",
          "Was ist äquivalent zu ¬(P ∨ Q)?",
        ),
        options: [
          t("¬P ∧ ¬Q", "¬P ∧ ¬Q"),
          t("¬P ∨ ¬Q", "¬P ∨ ¬Q"),
          t("P ∧ Q", "P ∧ Q"),
          t("P → Q", "P → Q"),
        ],
        answer: 0,
        explanation: t(
          "De Morgan turns NOT(OR) into AND of both negations.",
          "De Morgan verwandelt NICHT(ODER) in UND der beiden Negationen.",
        ),
      },
      {
        question: t(
          "Which expression is equivalent to P → Q?",
          "Welcher Ausdruck ist äquivalent zu P → Q?",
        ),
        options: [
          t("P ∧ Q", "P ∧ Q"),
          t("P ∨ ¬Q", "P ∨ ¬Q"),
          t("¬P ∨ Q", "¬P ∨ Q"),
          t("¬P ∧ Q", "¬P ∧ Q"),
        ],
        answer: 2,
        explanation: t(
          "Material implication is equivalent to ¬P ∨ Q.",
          "Die materielle Implikation ist äquivalent zu ¬P ∨ Q.",
        ),
      },
      {
        question: t("Simplify ¬¬P.", "Vereinfache ¬¬P."),
        options: [
          t("¬P", "¬P"),
          t("P", "P"),
          t("True", "Wahr"),
          t("False", "Falsch"),
        ],
        answer: 1,
        explanation: t(
          "Two negations cancel, regardless of P's truth value.",
          "Zwei Negationen heben sich auf, unabhängig vom Wahrheitswert von P.",
        ),
      },
      {
        question: t(
          "Which is equivalent to ¬(P ∧ ¬Q)?",
          "Was ist äquivalent zu ¬(P ∧ ¬Q)?",
        ),
        options: [
          t("¬P ∧ Q", "¬P ∧ Q"),
          t("P ∨ Q", "P ∨ Q"),
          t("¬P ∨ Q", "¬P ∨ Q"),
          t("P ∧ Q", "P ∧ Q"),
        ],
        answer: 2,
        explanation: t(
          "De Morgan gives ¬P ∨ ¬¬Q, which simplifies to ¬P ∨ Q.",
          "De Morgan ergibt ¬P ∨ ¬¬Q, vereinfacht also ¬P ∨ Q.",
        ),
      },
    ],
  },
  {
    slug: "sets",
    title: t("Sets, Subsets & Operations", "Mengen, Teilmengen & Operationen"),
    subtitle: t(
      "Learn the language of collections and mathematical structures.",
      "Lerne die Sprache von Sammlungen und mathematischen Strukturen.",
    ),
    duration: "30–40 min",
    sections: [
      {
        title: t("Sets and membership", "Mengen und Zugehörigkeit"),
        paragraphs: [
          t(
            "A set is a collection of distinct elements. Write A = {1, 2, 3}; then 2 ∈ A and 5 ∉ A. Order and repetition do not matter.",
            "Eine Menge ist eine Sammlung verschiedener Elemente. Schreibe A = {1, 2, 3}; dann gilt 2 ∈ A und 5 ∉ A. Reihenfolge und Wiederholungen spielen keine Rolle.",
          ),
          t(
            "The empty set ∅ contains no elements. A subset A ⊆ B means every element of A also belongs to B.",
            "Die leere Menge ∅ enthält keine Elemente. A ⊆ B bedeutet, dass jedes Element von A auch zu B gehört.",
          ),
        ],
        example: t(
          "{1, 2} ⊆ {1, 2, 3}, but {1, 4} ⊈ {1, 2, 3}.",
          "{1, 2} ⊆ {1, 2, 3}, aber {1, 4} ⊈ {1, 2, 3}.",
        ),
        takeaway: t(
          "Distinguish element membership (∈) from subset inclusion (⊆).",
          "Unterscheide Elementzugehörigkeit (∈) von Teilmengenbeziehung (⊆).",
        ),
      },
      {
        title: t(
          "Union, intersection, difference",
          "Vereinigung, Schnittmenge, Differenz",
        ),
        paragraphs: [
          t(
            "A ∪ B contains elements in either set. A ∩ B contains only elements in both sets.",
            "A ∪ B enthält Elemente aus mindestens einer der Mengen. A ∩ B enthält nur Elemente, die in beiden Mengen vorkommen.",
          ),
          t(
            "A \\ B contains elements of A that are not in B. The complement of A depends on a specified universe U.",
            "A \\ B enthält Elemente aus A, die nicht in B liegen. Das Komplement von A hängt von einer festgelegten Grundmenge U ab.",
          ),
        ],
        example: t(
          "For A={1,2,3}, B={3,4}: A∪B={1,2,3,4}, A∩B={3}, A\\B={1,2}.",
          "Für A={1,2,3}, B={3,4}: A∪B={1,2,3,4}, A∩B={3}, A\\B={1,2}.",
        ),
        takeaway: t(
          "Union means either; intersection means both.",
          "Vereinigung bedeutet mindestens eine; Schnittmenge bedeutet beide.",
        ),
      },
      {
        title: t("Power sets", "Potenzmengen"),
        paragraphs: [
          t(
            "The power set 𝒫(A) is the set of every subset of A, including ∅ and A itself.",
            "Die Potenzmenge 𝒫(A) enthält alle Teilmengen von A, einschließlich ∅ und A selbst.",
          ),
          t(
            "A finite set with n elements has exactly 2ⁿ subsets because each element can be included or excluded.",
            "Eine endliche Menge mit n Elementen hat genau 2ⁿ Teilmengen, weil jedes Element enthalten sein kann oder nicht.",
          ),
        ],
        example: t(
          "If A={a,b}, then 𝒫(A)={∅,{a},{b},{a,b}}.",
          "Wenn A={a,b}, dann ist 𝒫(A)={∅,{a},{b},{a,b}}.",
        ),
        takeaway: t(
          "Remember: |𝒫(A)| = 2^|A| for finite sets.",
          "Merke: |𝒫(A)| = 2^|A| für endliche Mengen.",
        ),
      },
    ],
    exercises: [
      {
        question: t(
          "If A={1,2,3} and B={3,4}, what is A ∩ B?",
          "Wenn A={1,2,3} und B={3,4}, was ist A ∩ B?",
        ),
        options: [
          t("{1,2,3,4}", "{1,2,3,4}"),
          t("{3}", "{3}"),
          t("{1,2}", "{1,2}"),
          t("∅", "∅"),
        ],
        answer: 1,
        explanation: t(
          "Only 3 occurs in both sets.",
          "Nur 3 kommt in beiden Mengen vor.",
        ),
      },
      {
        question: t(
          "How many subsets does a set of 4 elements have?",
          "Wie viele Teilmengen hat eine Menge mit 4 Elementen?",
        ),
        options: [t("4", "4"), t("8", "8"), t("16", "16"), t("24", "24")],
        answer: 2,
        explanation: t(
          "Each of four elements is included or excluded: 2⁴=16.",
          "Jedes der vier Elemente ist enthalten oder nicht: 2⁴=16.",
        ),
      },
      {
        question: t(
          "Which symbol means 'is an element of'?",
          "Welches Symbol bedeutet 'ist Element von'?",
        ),
        options: [t("⊆", "⊆"), t("∈", "∈"), t("∪", "∪"), t("∩", "∩")],
        answer: 1,
        explanation: t(
          "∈ denotes membership; ⊆ denotes subset inclusion.",
          "∈ bezeichnet Zugehörigkeit; ⊆ bezeichnet die Teilmengenbeziehung.",
        ),
      },
      {
        question: t(
          "For A={1,2,3} and B={3,4}, what is A \\ B?",
          "Für A={1,2,3} und B={3,4}, was ist A \\ B?",
        ),
        options: [
          t("{3}", "{3}"),
          t("{4}", "{4}"),
          t("{1,2}", "{1,2}"),
          t("{1,2,4}", "{1,2,4}"),
        ],
        answer: 2,
        explanation: t(
          "Remove from A every element also found in B.",
          "Entferne aus A jedes Element, das auch in B vorkommt.",
        ),
      },
    ],
  },
  {
    slug: "proofs",
    title: t(
      "Proofs & Mathematical Induction",
      "Beweise & Vollständige Induktion",
    ),
    subtitle: t(
      "Move from examples to rigorous arguments.",
      "Von Beispielen zu strengen mathematischen Argumenten.",
    ),
    duration: "35–45 min",
    sections: [
      {
        title: t("What is a proof?", "Was ist ein Beweis?"),
        paragraphs: [
          t(
            "A proof shows why a claim must hold under its assumptions, not merely that it works in several examples.",
            "Ein Beweis zeigt, warum eine Behauptung unter ihren Voraussetzungen gelten muss, nicht nur, dass sie in einigen Beispielen funktioniert.",
          ),
          t(
            "A counterexample is enough to disprove a universal claim. One successful example is never enough to prove it.",
            "Ein Gegenbeispiel genügt, um eine allgemeine Behauptung zu widerlegen. Ein einzelnes passendes Beispiel reicht niemals als Beweis.",
          ),
        ],
        example: t(
          "Claim: every prime number is odd. Counterexample: 2 is prime and even.",
          "Behauptung: Jede Primzahl ist ungerade. Gegenbeispiel: 2 ist prim und gerade.",
        ),
        takeaway: t(
          "To disprove 'for all', find one valid counterexample.",
          "Um 'für alle' zu widerlegen, finde ein gültiges Gegenbeispiel.",
        ),
      },
      {
        title: t(
          "Direct proof and contrapositive",
          "Direkter Beweis und Kontraposition",
        ),
        paragraphs: [
          t(
            "In a direct proof of P → Q, assume P and logically derive Q.",
            "Bei einem direkten Beweis von P → Q nimmst du P an und leitest Q logisch her.",
          ),
          t(
            "The contrapositive ¬Q → ¬P is logically equivalent to P → Q. Sometimes it is easier to prove.",
            "Die Kontraposition ¬Q → ¬P ist logisch äquivalent zu P → Q. Manchmal lässt sie sich leichter beweisen.",
          ),
        ],
        example: t(
          "If n is even, n² is even: n=2k implies n²=4k²=2(2k²).",
          "Wenn n gerade ist, ist n² gerade: n=2k ergibt n²=4k²=2(2k²).",
        ),
        takeaway: t(
          "State your assumption, justify each step, and finish with the conclusion.",
          "Nenne deine Annahme, begründe jeden Schritt und schließe mit der Folgerung.",
        ),
      },
      {
        title: t("Induction: base and step", "Induktion: Anfang und Schritt"),
        paragraphs: [
          t(
            "Mathematical induction proves a statement P(n) for all integers n≥n₀ by proving the base case P(n₀) and the step P(k) → P(k+1).",
            "Vollständige Induktion beweist P(n) für alle ganzen Zahlen n≥n₀, indem der Induktionsanfang P(n₀) und der Schritt P(k) → P(k+1) gezeigt werden.",
          ),
          t(
            "The induction hypothesis assumes P(k) for an arbitrary k in the induction step. You must then establish P(k+1), not simply repeat the hypothesis.",
            "Die Induktionsannahme setzt P(k) für ein beliebiges k im Induktionsschritt voraus. Danach musst du P(k+1) zeigen, nicht nur die Annahme wiederholen.",
          ),
        ],
        example: t(
          "For 1+2+⋯+n=n(n+1)/2: base n=1 gives 1=1. Step: k(k+1)/2+(k+1)=(k+1)(k+2)/2.",
          "Für 1+2+⋯+n=n(n+1)/2: Anfang n=1 ergibt 1=1. Schritt: k(k+1)/2+(k+1)=(k+1)(k+2)/2.",
        ),
        takeaway: t(
          "Induction needs both a valid base case and a valid inductive step.",
          "Induktion braucht sowohl einen gültigen Anfang als auch einen gültigen Induktionsschritt.",
        ),
      },
    ],
    exercises: [
      {
        question: t(
          "What disproves 'all prime numbers are odd'?",
          "Was widerlegt 'alle Primzahlen sind ungerade'?",
        ),
        options: [
          t("The number 2", "Die Zahl 2"),
          t("The number 3", "Die Zahl 3"),
          t("The number 5", "Die Zahl 5"),
          t("The number 7", "Die Zahl 7"),
        ],
        answer: 0,
        explanation: t(
          "2 is a prime number and is even, so it is a counterexample.",
          "2 ist eine gerade Primzahl und damit ein Gegenbeispiel.",
        ),
      },
      {
        question: t(
          "What is the contrapositive of P → Q?",
          "Was ist die Kontraposition von P → Q?",
        ),
        options: [
          t("Q → P", "Q → P"),
          t("¬P → ¬Q", "¬P → ¬Q"),
          t("¬Q → ¬P", "¬Q → ¬P"),
          t("P → ¬Q", "P → ¬Q"),
        ],
        answer: 2,
        explanation: t(
          "Reverse and negate both parts to obtain ¬Q → ¬P.",
          "Vertausche und negiere beide Teile: ¬Q → ¬P.",
        ),
      },
      {
        question: t(
          "What are the two essential parts of induction?",
          "Was sind die zwei wesentlichen Teile der Induktion?",
        ),
        options: [
          t("Example and guess", "Beispiel und Vermutung"),
          t(
            "Base case and inductive step",
            "Induktionsanfang und Induktionsschritt",
          ),
          t("Definition and diagram", "Definition und Diagramm"),
          t("Counterexample and conclusion", "Gegenbeispiel und Schluss"),
        ],
        answer: 1,
        explanation: t(
          "Both the base case and the implication from k to k+1 are required.",
          "Sowohl der Anfang als auch der Schritt von k zu k+1 sind erforderlich.",
        ),
      },
      {
        question: t("What is 1+2+3+4+5?", "Was ist 1+2+3+4+5?"),
        options: [t("10", "10"), t("12", "12"), t("15", "15"), t("20", "20")],
        answer: 2,
        explanation: t(
          "Using n(n+1)/2 with n=5 gives 5·6/2=15.",
          "Mit n(n+1)/2 und n=5 ergibt sich 5·6/2=15.",
        ),
      },
    ],
  },
  {
    slug: "relations",
    title: t("Relations & Functions", "Relationen und Funktionen"),
    subtitle: t(
      "Understand ordered pairs, equivalence relations, mappings and inverses.",
      "Verstehe geordnete Paare, Äquivalenzrelationen, Abbildungen und Umkehrfunktionen.",
    ),
    duration: "40–50 min",
    sections: [
      {
        title: t(
          "Cartesian products and relations",
          "Kartesische Produkte und Relationen",
        ),
        paragraphs: [
          t(
            "The Cartesian product A × B contains all ordered pairs (a,b) with a ∈ A and b ∈ B. A relation from A to B is any subset of A × B.",
            "Das kartesische Produkt A × B enthält alle geordneten Paare (a,b) mit a ∈ A und b ∈ B. Eine Relation von A nach B ist eine Teilmenge von A × B.",
          ),
          t(
            "Relations on a set A are subsets of A × A. They can be represented by arrows, tables, or directed graphs.",
            "Relationen auf einer Menge A sind Teilmengen von A × A. Sie lassen sich mit Pfeilen, Tabellen oder gerichteten Graphen darstellen.",
          ),
        ],
        example: t(
          "A={1,2}, B={x,y}: A×B={(1,x),(1,y),(2,x),(2,y)}. R={(1,x),(2,y)} is a relation.",
          "A={1,2}, B={x,y}: A×B={(1,x),(1,y),(2,x),(2,y)}. R={(1,x),(2,y)} ist eine Relation.",
        ),
        takeaway: t(
          "Order matters in ordered pairs: (a,b) need not equal (b,a).",
          "Die Reihenfolge ist wichtig: (a,b) muss nicht gleich (b,a) sein.",
        ),
      },
      {
        title: t("Properties and equivalence", "Eigenschaften und Äquivalenz"),
        paragraphs: [
          t(
            "A relation R on A is reflexive if (a,a) ∈ R for every a; symmetric if aRb implies bRa; transitive if aRb and bRc imply aRc.",
            "Eine Relation R auf A ist reflexiv, wenn (a,a) ∈ R für jedes a gilt; symmetrisch, wenn aus aRb auch bRa folgt; transitiv, wenn aus aRb und bRc auch aRc folgt.",
          ),
          t(
            "An equivalence relation is reflexive, symmetric and transitive. It partitions A into equivalence classes.",
            "Eine Äquivalenzrelation ist reflexiv, symmetrisch und transitiv. Sie zerlegt A in Äquivalenzklassen.",
          ),
        ],
        example: t(
          "On integers, aRb if a−b is divisible by 3. This is an equivalence relation; the classes are residues 0, 1 and 2 modulo 3.",
          "Auf ganzen Zahlen gelte aRb, wenn a−b durch 3 teilbar ist. Das ist eine Äquivalenzrelation; die Klassen sind die Reste 0, 1 und 2 modulo 3.",
        ),
        takeaway: t(
          "Check each property separately; do not assume one implies another.",
          "Prüfe jede Eigenschaft einzeln; keine folgt automatisch aus einer anderen.",
        ),
      },
      {
        title: t("Functions and injectivity", "Funktionen und Injektivität"),
        paragraphs: [
          t(
            "A function f:A→B assigns exactly one output in B to every input in A. Different inputs may share an output.",
            "Eine Funktion f:A→B ordnet jedem Eingang in A genau einen Ausgang in B zu. Verschiedene Eingaben dürfen denselben Ausgang haben.",
          ),
          t(
            "Injective means different inputs have different outputs. Surjective means every element of B is reached. Bijective means both, and therefore an inverse function exists.",
            "Injektiv bedeutet: verschiedene Eingaben haben verschiedene Ausgaben. Surjektiv bedeutet: jedes Element von B wird erreicht. Bijektiv bedeutet beides; dann existiert eine Umkehrfunktion.",
          ),
        ],
        example: t(
          "f:ℤ→ℤ, f(n)=n+1 is bijective, with inverse f⁻¹(n)=n−1.",
          "f:ℤ→ℤ, f(n)=n+1 ist bijektiv, mit Umkehrfunktion f⁻¹(n)=n−1.",
        ),
        takeaway: t(
          "Always check the specified domain and codomain when judging surjectivity.",
          "Beachte bei der Surjektivität immer Definitions- und Zielmenge.",
        ),
      },
    ],
    exercises: [
      {
        question: t(
          "How many ordered pairs are in A×B if |A|=3 and |B|=4?",
          "Wie viele geordnete Paare hat A×B bei |A|=3 und |B|=4?",
        ),
        options: [t("7", "7"), t("12", "12"), t("16", "16"), t("24", "24")],
        answer: 1,
        explanation: t(
          "Each of 3 choices from A pairs with 4 choices from B: 3·4=12.",
          "Jede der 3 Möglichkeiten aus A wird mit 4 aus B kombiniert: 3·4=12.",
        ),
      },
      {
        question: t(
          "Which three properties define an equivalence relation?",
          "Welche drei Eigenschaften definieren eine Äquivalenzrelation?",
        ),
        options: [
          t(
            "Reflexive, symmetric, transitive",
            "Reflexiv, symmetrisch, transitiv",
          ),
          t(
            "Injective, symmetric, transitive",
            "Injektiv, symmetrisch, transitiv",
          ),
          t(
            "Reflexive, surjective, symmetric",
            "Reflexiv, surjektiv, symmetrisch",
          ),
          t(
            "Antisymmetric, injective, total",
            "Antisymmetrisch, injektiv, total",
          ),
        ],
        answer: 0,
        explanation: t(
          "An equivalence relation must be reflexive, symmetric and transitive.",
          "Eine Äquivalenzrelation muss reflexiv, symmetrisch und transitiv sein.",
        ),
      },
      {
        question: t(
          "A function is injective when…",
          "Eine Funktion ist injektiv, wenn …",
        ),
        options: [
          t("Every output is used", "Jeder Zielwert erreicht wird"),
          t("Every input has two outputs", "Jede Eingabe zwei Ausgaben hat"),
          t(
            "Different inputs have different outputs",
            "Verschiedene Eingaben verschiedene Ausgaben haben",
          ),
          t("Its domain is empty", "Ihre Definitionsmenge leer ist"),
        ],
        answer: 2,
        explanation: t(
          "Injectivity forbids two distinct inputs from mapping to the same output.",
          "Injektivität verbietet, dass zwei verschiedene Eingaben denselben Ausgang haben.",
        ),
      },
      {
        question: t(
          "Which function f:ℤ→ℤ is bijective?",
          "Welche Funktion f:ℤ→ℤ ist bijektiv?",
        ),
        options: [
          t("f(n)=n²", "f(n)=n²"),
          t("f(n)=2n", "f(n)=2n"),
          t("f(n)=n+3", "f(n)=n+3"),
          t("f(n)=|n|", "f(n)=|n|"),
        ],
        answer: 2,
        explanation: t(
          "Adding 3 is one-to-one and reaches every integer; its inverse subtracts 3.",
          "Die Addition von 3 ist eindeutig und erreicht jede ganze Zahl; die Umkehrfunktion subtrahiert 3.",
        ),
      },
    ],
  },
  {
    slug: "counting",
    title: t("Combinatorics & Counting", "Kombinatorik & Zählverfahren"),
    subtitle: t(
      "Count possibilities systematically instead of listing them one by one.",
      "Zähle Möglichkeiten systematisch statt sie einzeln aufzuschreiben.",
    ),
    duration: "35–45 min",
    sections: [
      {
        title: t(
          "Addition and multiplication rules",
          "Additions- und Multiplikationsregel",
        ),
        paragraphs: [
          t(
            "If disjoint choices can be made in a ways or b ways, there are a+b choices. If a task has two successive independent stages with a and b choices, there are a·b outcomes.",
            "Wenn sich disjunkte Möglichkeiten auf a oder b Arten wählen lassen, gibt es a+b Möglichkeiten. Hat ein Vorgang zwei aufeinanderfolgende unabhängige Stufen mit a und b Optionen, gibt es a·b Ergebnisse.",
          ),
          t(
            "Use addition for mutually exclusive alternatives and multiplication for successive choices.",
            "Nutze Addition für sich ausschließende Alternativen und Multiplikation für aufeinanderfolgende Entscheidungen.",
          ),
        ],
        example: t(
          "3 shirts and 2 trousers give 3·2=6 outfits.",
          "3 Hemden und 2 Hosen ergeben 3·2=6 Kombinationen.",
        ),
        takeaway: t(
          "Identify whether you are choosing 'either/or' or making sequential choices.",
          "Unterscheide zwischen 'entweder/oder' und aufeinanderfolgenden Entscheidungen.",
        ),
      },
      {
        title: t("Permutations and factorials", "Permutationen und Fakultäten"),
        paragraphs: [
          t(
            "The factorial n! = n·(n−1)·…·1 counts orderings of n distinct objects; 0! is defined as 1.",
            "Die Fakultät n! = n·(n−1)·…·1 zählt Anordnungen von n verschiedenen Objekten; 0! ist als 1 definiert.",
          ),
          t(
            "Ordered selections of k distinct items from n without replacement have n!/(n−k)! possibilities.",
            "Geordnete Auswahlen von k verschiedenen Elementen aus n ohne Zurücklegen haben n!/(n−k)! Möglichkeiten.",
          ),
        ],
        example: t(
          "Four distinct books can be arranged in 4!=24 ways.",
          "Vier verschiedene Bücher lassen sich auf 4!=24 Arten anordnen.",
        ),
        takeaway: t(
          "Order matters for permutations.",
          "Bei Permutationen ist die Reihenfolge wichtig.",
        ),
      },
      {
        title: t(
          "Combinations and binomial coefficients",
          "Kombinationen und Binomialkoeffizienten",
        ),
        paragraphs: [
          t(
            "When order does not matter, the number of k-element subsets of an n-element set is C(n,k)=n!/(k!(n−k)!).",
            "Wenn die Reihenfolge egal ist, ist die Anzahl der k-elementigen Teilmengen einer n-elementigen Menge C(n,k)=n!/(k!(n−k)!).",
          ),
          t(
            "A useful check is C(n,k)=C(n,n−k): choosing k elements is equivalent to choosing which n−k elements to leave out.",
            "Eine nützliche Kontrolle ist C(n,k)=C(n,n−k): k Elemente auszuwählen entspricht dem Weglassen von n−k Elementen.",
          ),
        ],
        example: t(
          "Choose 2 students from 5: C(5,2)=5!/(2!3!)=10.",
          "Wähle 2 Studierende aus 5: C(5,2)=5!/(2!3!)=10.",
        ),
        takeaway: t(
          "Ask whether swapping selected items changes the outcome.",
          "Frage dich, ob das Vertauschen ausgewählter Elemente das Ergebnis ändert.",
        ),
      },
    ],
    exercises: [
      {
        question: t(
          "Three starters and four main dishes give how many meals with one of each?",
          "Drei Vorspeisen und vier Hauptgerichte ergeben wie viele Menüs mit je einem Gericht?",
        ),
        options: [t("7", "7"), t("12", "12"), t("16", "16"), t("24", "24")],
        answer: 1,
        explanation: t(
          "Use the multiplication rule: 3·4=12.",
          "Mit der Multiplikationsregel: 3·4=12.",
        ),
      },
      {
        question: t(
          "How many ways can 5 distinct books be ordered?",
          "Auf wie viele Arten lassen sich 5 verschiedene Bücher anordnen?",
        ),
        options: [
          t("25", "25"),
          t("60", "60"),
          t("120", "120"),
          t("125", "125"),
        ],
        answer: 2,
        explanation: t("5!=5·4·3·2·1=120.", "5!=5·4·3·2·1=120."),
      },
      {
        question: t(
          "How many ways to choose 2 people from 6 if order does not matter?",
          "Wie viele Möglichkeiten gibt es, 2 Personen aus 6 ohne Reihenfolge zu wählen?",
        ),
        options: [t("12", "12"), t("15", "15"), t("30", "30"), t("36", "36")],
        answer: 1,
        explanation: t("C(6,2)=6·5/2=15.", "C(6,2)=6·5/2=15."),
      },
      {
        question: t(
          "Which formula counts ordered selections of 3 distinct objects from 5 without replacement?",
          "Welche Formel zählt geordnete Auswahlen von 3 verschiedenen Objekten aus 5 ohne Zurücklegen?",
        ),
        options: [
          t("5!/2!", "5!/2!"),
          t("5!/(3!2!)", "5!/(3!2!)"),
          t("5³", "5³"),
          t("3!", "3!"),
        ],
        answer: 0,
        explanation: t(
          "Ordered selection without replacement: 5!/(5−3)!=5!/2!=60.",
          "Geordnete Auswahl ohne Zurücklegen: 5!/(5−3)!=5!/2!=60.",
        ),
      },
    ],
  },
  {
    slug: "numbers",
    title: t(
      "Number Theory & Modular Arithmetic",
      "Zahlentheorie & Modulare Arithmetik",
    ),
    subtitle: t(
      "Explore divisibility, prime numbers, gcd and remainders.",
      "Entdecke Teilbarkeit, Primzahlen, ggT und Restklassen.",
    ),
    duration: "35–45 min",
    sections: [
      {
        title: t(
          "Divisibility and prime numbers",
          "Teilbarkeit und Primzahlen",
        ),
        paragraphs: [
          t(
            "We write a | b when b=a·k for some integer k. A prime number is an integer greater than 1 with exactly two positive divisors: 1 and itself.",
            "Wir schreiben a | b, wenn b=a·k für eine ganze Zahl k gilt. Eine Primzahl ist eine ganze Zahl größer als 1 mit genau zwei positiven Teilern: 1 und sich selbst.",
          ),
          t(
            "Every integer greater than 1 factors uniquely into primes, apart from the order of the factors.",
            "Jede ganze Zahl größer als 1 lässt sich bis auf die Reihenfolge eindeutig in Primfaktoren zerlegen.",
          ),
        ],
        example: t(
          "60=2²·3·5; therefore 3 | 60 but 7 ∤ 60.",
          "60=2²·3·5; daher gilt 3 | 60, aber 7 ∤ 60.",
        ),
        takeaway: t(
          "The number 1 is not prime.",
          "Die Zahl 1 ist keine Primzahl.",
        ),
      },
      {
        title: t("Greatest common divisor", "Größter gemeinsamer Teiler"),
        paragraphs: [
          t(
            "The greatest common divisor gcd(a,b) is the largest positive integer dividing both a and b.",
            "Der größte gemeinsame Teiler ggT(a,b) ist die größte positive ganze Zahl, die sowohl a als auch b teilt.",
          ),
          t(
            "The Euclidean algorithm repeatedly replaces (a,b) with (b,a mod b) until the remainder becomes zero.",
            "Der euklidische Algorithmus ersetzt (a,b) wiederholt durch (b,a mod b), bis der Rest null ist.",
          ),
        ],
        example: t(
          "gcd(48,18): 48=2·18+12, 18=1·12+6, 12=2·6+0; so gcd=6.",
          "ggT(48,18): 48=2·18+12, 18=1·12+6, 12=2·6+0; also ggT=6.",
        ),
        takeaway: t(
          "The last nonzero remainder is the gcd.",
          "Der letzte von null verschiedene Rest ist der ggT.",
        ),
      },
      {
        title: t("Congruences modulo n", "Kongruenzen modulo n"),
        paragraphs: [
          t(
            "a ≡ b (mod n) means that n divides a−b. Equivalently, a and b have the same remainder when divided by positive n.",
            "a ≡ b (mod n) bedeutet, dass n die Differenz a−b teilt. Gleichwertig haben a und b bei Division durch positives n denselben Rest.",
          ),
          t(
            "Congruences can be added and multiplied. This is the basis of cyclic counters, checksums, and parts of cryptography.",
            "Kongruenzen lassen sich addieren und multiplizieren. Das ist die Grundlage zyklischer Zähler, Prüfsummen und Teilen der Kryptografie.",
          ),
        ],
        example: t(
          "17 ≡ 2 (mod 5), because 17−2=15 is divisible by 5.",
          "17 ≡ 2 (mod 5), weil 17−2=15 durch 5 teilbar ist.",
        ),
        takeaway: t(
          "Modulo arithmetic works with remainder classes, not ordinary equality.",
          "Modulare Arithmetik arbeitet mit Restklassen, nicht mit gewöhnlicher Gleichheit.",
        ),
      },
    ],
    exercises: [
      {
        question: t("Which number is prime?", "Welche Zahl ist prim?"),
        options: [t("1", "1"), t("9", "9"), t("13", "13"), t("21", "21")],
        answer: 2,
        explanation: t(
          "13 has exactly the positive divisors 1 and 13.",
          "13 hat genau die positiven Teiler 1 und 13.",
        ),
      },
      {
        question: t("What is gcd(48,18)?", "Was ist ggT(48,18)?"),
        options: [t("3", "3"), t("6", "6"), t("9", "9"), t("12", "12")],
        answer: 1,
        explanation: t(
          "The Euclidean algorithm gives remainders 12, 6, 0; gcd=6.",
          "Der euklidische Algorithmus ergibt die Reste 12, 6, 0; ggT=6.",
        ),
      },
      {
        question: t("What is 23 mod 5?", "Was ist 23 mod 5?"),
        options: [t("2", "2"), t("3", "3"), t("4", "4"), t("5", "5")],
        answer: 1,
        explanation: t(
          "23=4·5+3, so the remainder is 3.",
          "23=4·5+3, also ist der Rest 3.",
        ),
      },
      {
        question: t(
          "Which congruence is true?",
          "Welche Kongruenz ist richtig?",
        ),
        options: [
          t("14 ≡ 1 (mod 4)", "14 ≡ 1 (mod 4)"),
          t("14 ≡ 2 (mod 4)", "14 ≡ 2 (mod 4)"),
          t("14 ≡ 3 (mod 4)", "14 ≡ 3 (mod 4)"),
          t("14 ≡ 0 (mod 4)", "14 ≡ 0 (mod 4)"),
        ],
        answer: 1,
        explanation: t(
          "14=3·4+2, so 14 and 2 have the same remainder modulo 4.",
          "14=3·4+2, also haben 14 und 2 denselben Rest modulo 4.",
        ),
      },
    ],
  },
  {
    slug: "graphs",
    title: t("Graph Theory & Trees", "Graphentheorie & Bäume"),
    subtitle: t(
      "Model connections, paths, networks and hierarchical structures.",
      "Modelliere Verbindungen, Wege, Netzwerke und Hierarchien.",
    ),
    duration: "35–45 min",
    sections: [
      {
        title: t("Vertices, edges and degree", "Knoten, Kanten und Grad"),
        paragraphs: [
          t(
            "An undirected graph G=(V,E) consists of vertices V and edges E connecting pairs of distinct vertices in a simple graph.",
            "Ein ungerichteter Graph G=(V,E) besteht aus Knoten V und Kanten E, die in einem einfachen Graphen Paare verschiedener Knoten verbinden.",
          ),
          t(
            "The degree of a vertex is the number of incident edges. In any finite undirected graph, the sum of all degrees equals 2|E| (handshaking lemma).",
            "Der Grad eines Knotens ist die Anzahl der angrenzenden Kanten. In jedem endlichen ungerichteten Graphen ist die Summe aller Grade gleich 2|E| (Handschlaglemma).",
          ),
        ],
        example: t(
          "A triangle has 3 vertices and 3 edges. Each vertex has degree 2; total degree 6=2·3.",
          "Ein Dreieck hat 3 Knoten und 3 Kanten. Jeder Knoten hat Grad 2; die Gradsumme ist 6=2·3.",
        ),
        takeaway: t(
          "Every undirected edge contributes two to the degree sum.",
          "Jede ungerichtete Kante trägt zwei zur Gradsumme bei.",
        ),
      },
      {
        title: t("Paths and connectivity", "Wege und Zusammenhang"),
        paragraphs: [
          t(
            "A path is a sequence of vertices connected by edges; in a simple path no vertex repeats. A graph is connected if a path exists between every pair of vertices.",
            "Ein Weg ist eine Folge von Knoten, die durch Kanten verbunden sind; in einem einfachen Weg wiederholt sich kein Knoten. Ein Graph ist zusammenhängend, wenn zwischen jedem Knotenpaar ein Weg existiert.",
          ),
          t(
            "Breadth-first search explores a graph layer by layer and finds shortest paths by edge count in unweighted graphs.",
            "Die Breitensuche durchsucht einen Graphen schichtweise und findet kürzeste Wege nach Kantenzahl in ungewichteten Graphen.",
          ),
        ],
        example: t(
          "In A—B—C, the shortest path from A to C uses two edges.",
          "In A—B—C benötigt der kürzeste Weg von A nach C zwei Kanten.",
        ),
        takeaway: t(
          "Path length in an unweighted graph counts edges.",
          "Die Weglänge in einem ungewichteten Graphen zählt Kanten.",
        ),
      },
      {
        title: t("Trees and spanning trees", "Bäume und Spannbäume"),
        paragraphs: [
          t(
            "A tree is a connected undirected graph with no cycles. Every tree with n≥1 vertices has exactly n−1 edges.",
            "Ein Baum ist ein zusammenhängender ungerichteter Graph ohne Zyklen. Jeder Baum mit n≥1 Knoten hat genau n−1 Kanten.",
          ),
          t(
            "A spanning tree of a connected graph includes all vertices and enough edges to remain connected without cycles.",
            "Ein Spannbaum eines zusammenhängenden Graphen enthält alle Knoten und genügend Kanten, um ohne Zyklen zusammenhängend zu bleiben.",
          ),
        ],
        example: t(
          "A tree with 8 vertices has 7 edges.",
          "Ein Baum mit 8 Knoten hat 7 Kanten.",
        ),
        takeaway: t(
          "Connected + acyclic characterizes a tree.",
          "Zusammenhängend + zyklenfrei kennzeichnet einen Baum.",
        ),
      },
    ],
    exercises: [
      {
        question: t(
          "What is the sum of degrees in an undirected graph with 7 edges?",
          "Wie groß ist die Gradsumme eines ungerichteten Graphen mit 7 Kanten?",
        ),
        options: [t("7", "7"), t("12", "12"), t("14", "14"), t("21", "21")],
        answer: 2,
        explanation: t(
          "Handshaking lemma: sum of degrees = 2·7=14.",
          "Handschlaglemma: Gradsumme = 2·7=14.",
        ),
      },
      {
        question: t(
          "How many edges does a tree with 9 vertices have?",
          "Wie viele Kanten hat ein Baum mit 9 Knoten?",
        ),
        options: [t("8", "8"), t("9", "9"), t("10", "10"), t("18", "18")],
        answer: 0,
        explanation: t(
          "A tree with n vertices has n−1 edges: 9−1=8.",
          "Ein Baum mit n Knoten hat n−1 Kanten: 9−1=8.",
        ),
      },
      {
        question: t(
          "Which algorithm finds shortest paths in an unweighted graph?",
          "Welcher Algorithmus findet kürzeste Wege in einem ungewichteten Graphen?",
        ),
        options: [
          t("Depth-first search", "Tiefensuche"),
          t("Breadth-first search", "Breitensuche"),
          t("Insertion sort", "Insertion Sort"),
          t("Binary search", "Binäre Suche"),
        ],
        answer: 1,
        explanation: t(
          "Breadth-first search visits vertices in increasing distance from the start.",
          "Die Breitensuche besucht Knoten in aufsteigender Entfernung vom Start.",
        ),
      },
      {
        question: t(
          "Which property is required for a tree?",
          "Welche Eigenschaft muss ein Baum haben?",
        ),
        options: [
          t("Contains a cycle", "Enthält einen Zyklus"),
          t("Has every possible edge", "Hat jede mögliche Kante"),
          t("Connected and acyclic", "Zusammenhängend und zyklenfrei"),
          t("Every vertex has degree 2", "Jeder Knoten hat Grad 2"),
        ],
        answer: 2,
        explanation: t(
          "An undirected tree is connected and contains no cycles.",
          "Ein ungerichteter Baum ist zusammenhängend und enthält keine Zyklen.",
        ),
      },
    ],
  },
  {
    slug: "exam",
    title: t(
      "Mixed Practice & Exam Preparation",
      "Gemischte Übungen & Prüfungsvorbereitung",
    ),
    subtitle: t(
      "Review every topic with a mixed original practice test.",
      "Wiederhole alle Themen mit einem gemischten selbst erstellten Übungstest.",
    ),
    duration: "40–60 min",
    sections: [
      {
        title: t(
          "How to use this practice test",
          "So nutzt du diesen Übungstest",
        ),
        paragraphs: [
          t(
            "Try every question without notes first. Write down the rule you use, not just your selected answer.",
            "Versuche jede Frage zuerst ohne Unterlagen. Schreibe die verwendete Regel auf, nicht nur die ausgewählte Antwort.",
          ),
          t(
            "This is original practice material, not a BFH exam or a prediction of the real exam. The current version is untimed and scores answers immediately.",
            "Dies sind eigene Übungsaufgaben, keine BFH-Prüfung und keine Vorhersage der echten Prüfung. Diese Version ist ohne Zeitlimit und zeigt die Bewertung sofort.",
          ),
        ],
        example: t(
          "After answering, explain why each incorrect option is wrong and revisit the linked topic.",
          "Erkläre nach jeder Antwort, warum die falschen Optionen nicht stimmen, und wiederhole das zugehörige Thema.",
        ),
        takeaway: t(
          "Aim for understanding and repeat weak topics before retaking the quiz.",
          "Ziel ist Verständnis: Wiederhole schwache Themen vor dem nächsten Versuch.",
        ),
      },
      {
        title: t("Revision checklist", "Wiederholungscheckliste"),
        paragraphs: [
          t(
            "Can you construct truth tables, simplify logical expressions, work with sets and functions, and write a short proof?",
            "Kannst du Wahrheitstabellen erstellen, logische Ausdrücke vereinfachen, mit Mengen und Funktionen arbeiten und einen kurzen Beweis schreiben?",
          ),
          t(
            "Can you count arrangements, calculate remainders and gcd, and recognize basic graph and tree properties?",
            "Kannst du Anordnungen zählen, Reste und ggT berechnen und grundlegende Eigenschaften von Graphen und Bäumen erkennen?",
          ),
        ],
        example: t(
          "Make a one-page summary with one rule and one worked example for each topic.",
          "Erstelle eine einseitige Zusammenfassung mit einer Regel und einem Beispiel pro Thema.",
        ),
        takeaway: t(
          "Practice across topics, not only one chapter at a time.",
          "Übe themenübergreifend, nicht nur kapitelweise.",
        ),
      },
    ],
    exercises: [
      {
        question: t(
          "If P is true and Q is false, what is P → Q?",
          "Wenn P wahr und Q falsch ist, was ist P → Q?",
        ),
        options: [
          t("True", "Wahr"),
          t("False", "Falsch"),
          t("Both", "Beides"),
          t("Undefined", "Undefiniert"),
        ],
        answer: 1,
        explanation: t(
          "An implication is false exactly when the premise is true and the conclusion false.",
          "Eine Implikation ist genau dann falsch, wenn die Voraussetzung wahr und die Folgerung falsch ist.",
        ),
      },
      {
        question: t(
          "How many subsets does a 3-element set have?",
          "Wie viele Teilmengen hat eine Menge mit 3 Elementen?",
        ),
        options: [t("3", "3"), t("6", "6"), t("8", "8"), t("9", "9")],
        answer: 2,
        explanation: t(
          "A set with n elements has 2ⁿ subsets; 2³=8.",
          "Eine Menge mit n Elementen hat 2ⁿ Teilmengen; 2³=8.",
        ),
      },
      {
        question: t(
          "Which property is NOT required for an equivalence relation?",
          "Welche Eigenschaft ist für eine Äquivalenzrelation NICHT erforderlich?",
        ),
        options: [
          t("Reflexivity", "Reflexivität"),
          t("Symmetry", "Symmetrie"),
          t("Transitivity", "Transitivität"),
          t("Injectivity", "Injektivität"),
        ],
        answer: 3,
        explanation: t(
          "Injectivity describes functions, not the defining conditions for equivalence relations.",
          "Injektivität beschreibt Funktionen und gehört nicht zu den definierenden Eigenschaften von Äquivalenzrelationen.",
        ),
      },
      {
        question: t(
          "What is the contrapositive of P → Q?",
          "Was ist die Kontraposition von P → Q?",
        ),
        options: [
          t("Q → P", "Q → P"),
          t("¬Q → ¬P", "¬Q → ¬P"),
          t("¬P → ¬Q", "¬P → ¬Q"),
          t("P → ¬Q", "P → ¬Q"),
        ],
        answer: 1,
        explanation: t(
          "Negate and reverse: ¬Q → ¬P.",
          "Negiere und vertausche: ¬Q → ¬P.",
        ),
      },
      {
        question: t(
          "How many unordered pairs can be chosen from 5 distinct objects?",
          "Wie viele ungeordnete Paare lassen sich aus 5 verschiedenen Objekten wählen?",
        ),
        options: [t("5", "5"), t("10", "10"), t("15", "15"), t("20", "20")],
        answer: 1,
        explanation: t("C(5,2)=5·4/2=10.", "C(5,2)=5·4/2=10."),
      },
      {
        question: t("What is 29 mod 6?", "Was ist 29 mod 6?"),
        options: [t("3", "3"), t("4", "4"), t("5", "5"), t("6", "6")],
        answer: 2,
        explanation: t(
          "29=4·6+5, so the remainder is 5.",
          "29=4·6+5, also ist der Rest 5.",
        ),
      },
      {
        question: t(
          "How many edges does a tree with 6 vertices have?",
          "Wie viele Kanten hat ein Baum mit 6 Knoten?",
        ),
        options: [t("4", "4"), t("5", "5"), t("6", "6"), t("12", "12")],
        answer: 1,
        explanation: t(
          "A tree has n−1 edges: 6−1=5.",
          "Ein Baum hat n−1 Kanten: 6−1=5.",
        ),
      },
      {
        question: t(
          "Which expression equals ¬(P ∨ Q)?",
          "Welcher Ausdruck entspricht ¬(P ∨ Q)?",
        ),
        options: [
          t("¬P ∧ ¬Q", "¬P ∧ ¬Q"),
          t("¬P ∨ ¬Q", "¬P ∨ ¬Q"),
          t("P ∧ Q", "P ∧ Q"),
          t("P → Q", "P → Q"),
        ],
        answer: 0,
        explanation: t(
          "De Morgan's law changes NOT(OR) to AND of the negated propositions.",
          "Nach De Morgan wird NICHT(ODER) zu UND der negierten Aussagen.",
        ),
      },
    ],
  },
];
