"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, ArrowLeft } from "lucide-react";
import type { Localized } from "@/lib/academy";
import { useSiteLanguage } from "@/components/ui/language-provider";

export const useAcademyLanguage = useSiteLanguage;

export function Local({ text }: { text: Localized }) {
  const { language } = useSiteLanguage();
  return <>{text[language]}</>;
}

export function AcademyShell({ children }: { children: React.ReactNode }) {
  const { text } = useSiteLanguage();
  return (
    <div
      id="top"
      className="min-h-screen bg-[var(--background)] pt-20 text-[var(--foreground)]"
    >
      <div className="border-b border-[var(--border)] bg-[var(--surface)]/50">
        <div className="container-main flex flex-wrap items-center justify-between gap-4 py-5">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-semibold"
          >
            <GraduationCap
              className="text-[var(--accent)]"
              size={22}
              aria-hidden="true"
            />
            LearnBlog <span className="text-[var(--accent)]">Academy</span>
          </Link>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            {text("Learning dashboard", "Lernübersicht")}
          </Link>
        </div>
      </div>
      <div className="container-main py-10 sm:py-14">{children}</div>
      <div className="container-main flex items-center gap-2 border-t border-[var(--border)] py-7 text-xs text-[var(--muted)]">
        <BookOpen size={14} aria-hidden="true" />
        {text(
          "LearnBlog Academy · Independent preparation resource, not an official BFH course.",
          "LearnBlog Academy · Unabhängiges Vorbereitungsmaterial, kein offizieller BFH-Kurs.",
        )}
      </div>
    </div>
  );
}
