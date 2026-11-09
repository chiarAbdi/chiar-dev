"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { BookOpen, GraduationCap, Languages, ArrowLeft } from "lucide-react";
import type { Language, Localized } from "@/lib/academy";

import { useLocalStorage } from "@/lib/use-local-storage";

type Context = {
  language: Language;
  setLanguage: (language: Language) => void;
};
const LanguageContext = createContext<Context | null>(null);
export function useAcademyLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("Academy language context missing");
  return context;
}
export function Local({ text }: { text: Localized }) {
  const { language } = useAcademyLanguage();
  return <>{text[language]}</>;
}
export function AcademyShell({ children }: { children: React.ReactNode }) {
  const [saved, save] = useLocalStorage("chiar-academy-language");
  const [selected, setSelected] = useState<Language | null>(null);
  const language = selected ?? (saved === "de" ? "de" : "en");
  function changeLanguage(next: Language) {
    setSelected(next);
    save(next);
  }
  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="border-b border-[var(--border)] bg-[var(--surface)]/50">
          <div className="container-main flex flex-wrap items-center justify-between gap-4 py-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold"
            >
              <GraduationCap className="text-[var(--accent)]" size={22} />{" "}
              LearnBlog <span className="text-[var(--accent)]">Academy</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="hidden items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--foreground)] sm:inline-flex"
              >
                <ArrowLeft size={14} /> chiar.dev
              </Link>
              <div
                className="flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--background)] p-1"
                aria-label="Lesson language"
              >
                <Languages size={15} className="mx-2 text-[var(--muted)]" />
                {(["en", "de"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => changeLanguage(lang)}
                    aria-pressed={language === lang}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${language === lang ? "bg-[var(--accent)] text-[#0b1020]" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="container-main py-10 sm:py-14">{children}</div>
        <div className="container-main flex items-center gap-2 border-t border-[var(--border)] py-7 text-xs text-[var(--muted)]">
          <BookOpen size={14} /> LearnBlog Academy · Independent preparation
          resource, not an official BFH course.
        </div>
      </div>
    </LanguageContext.Provider>
  );
}
