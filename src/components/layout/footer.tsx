"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowUp, GitFork } from "lucide-react";
import { navigation, site } from "@/lib/site";
import { useSiteLanguage } from "@/components/ui/language-provider";

export function Footer() {
  const { language, text } = useSiteLanguage();
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="container-main py-10 sm:py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div>
            <Link href="/" className="font-mono text-xl font-bold">
              chiar<span className="text-[var(--accent)]">.dev</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--muted)]">
              {text(
                "Software, clear explanations and a little curiosity.",
                "Software, klare Erklärungen und eine Portion Neugier.",
              )}
            </p>
          </div>
          <nav
            aria-label={text("Footer navigation", "Navigation im Fußbereich")}
            className="flex flex-wrap gap-x-6 gap-y-3"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--muted)] hover:text-[var(--accent)]"
              >
                {item.label[language]}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)]">
          <p>
            © 2026 chiar.dev ·{" "}
            {text("Built with curiosity.", "Mit Neugier entwickelt.")}
          </p>
          <div className="flex gap-5">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"
            >
              <GitFork size={14} aria-hidden="true" />
              GitHub
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                })
              }
              className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"
            >
              {text("Back to top", "Nach oben")}
              <ArrowUp size={13} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
