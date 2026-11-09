"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { Language, Localized } from "@/lib/academy";
import { useLocalStorage } from "@/lib/use-local-storage";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  text: (en: string, de: string) => string;
};
const LanguageContext = createContext<LanguageContextValue | null>(null);
const titles: Record<string, Localized> = {
  "/": { en: "Chiar | Developer & IT", de: "Chiar | Entwicklung & IT" },
  "/about": { en: "About Chiar Abdi", de: "Über Chiar Abdi" },
  "/projects": { en: "Projects", de: "Projekte" },
  "/blog": { en: "LearnBlog", de: "LearnBlog" },
  "/contact": { en: "Contact", de: "Kontakt" },
  "/learn": { en: "Learning dashboard", de: "Lernübersicht" },
  "/learn/ict-siz": {
    en: "ICT Systems & Network",
    de: "ICT-Systeme & Netzwerke",
  },
  "/learn/math-from-zero": { en: "Math from Zero", de: "Mathe von Null" },
  "/learn/discrete-math/foundation": {
    en: "Discrete Mathematics",
    de: "Diskrete Mathematik",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Reuse the existing academy preference so returning learners keep their choice.
  const [saved, save] = useLocalStorage("chiar-academy-language");
  const [selected, setSelected] = useState<Language | null>(null);
  const language = selected ?? (saved === "de" ? "de" : "en");
  const pathname = usePathname();
  function setLanguage(next: Language) {
    setSelected(next);
    save(next);
  }
  useEffect(() => {
    document.documentElement.lang = language;
    if (titles[pathname])
      document.title = `${titles[pathname][language]}${pathname === "/" ? "" : " | chiar.dev"}`;
  }, [language, pathname]);
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        text: (en, de) => (language === "de" ? de : en),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useSiteLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is required");
  return context;
}

export function SiteText({ en, de }: Localized) {
  const { language } = useSiteLanguage();
  return <>{language === "de" ? de : en}</>;
}
