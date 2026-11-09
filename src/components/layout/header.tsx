"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { navigation } from "@/lib/site";
import { useSiteLanguage } from "@/components/ui/language-provider";

export function Header() {
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const { language, setLanguage, text } = useSiteLanguage();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const open = menuPath === pathname;
  const active = (href: string) =>
    href === "/"
      ? pathname === "/"
      : href === "/blog"
        ? pathname.startsWith("/blog") || pathname.startsWith("/learn")
        : pathname.startsWith(href);
  return (
    <header className="glass-nav fixed inset-x-0 top-0 z-50 border-b border-[var(--border)]">
      <nav
        aria-label={text("Main navigation", "Hauptnavigation")}
        className="container-main flex h-20 items-center justify-between gap-3"
      >
        <Link
          href="/"
          aria-label="chiar.dev"
          className="shrink-0 font-mono text-lg sm:text-xl font-bold tracking-tight"
        >
          chiar<span className="text-[var(--accent)]">.dev</span>
        </Link>
        <div className="hidden items-center gap-5 lg:gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              className={`text-sm transition-colors hover:text-[var(--accent)] ${active(item.href) ? "font-medium text-[var(--accent)]" : "text-[var(--muted)]"}`}
            >
              {item.label[language]}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={text("Site language", "Sprache der Website")}
            className="flex rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1"
          >
            {(["en", "de"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                lang={lang}
                aria-label={lang === "en" ? "English" : "Deutsch"}
                aria-pressed={language === lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-lg px-2.5 py-1.5 font-mono text-[11px] font-semibold ${language === lang ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={text("Toggle color theme", "Farbschema wechseln")}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="rounded-xl border border-[var(--border)] p-2.5"
          >
            <Moon size={17} className="dark:hidden" aria-hidden="true" />
            <Sun size={17} className="hidden dark:block" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="rounded-lg p-2 md:hidden"
            aria-label={
              open
                ? text("Close menu", "Menü schließen")
                : text("Open menu", "Menü öffnen")
            }
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setMenuPath(open ? null : pathname)}
          >
            {open ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--background)] md:hidden"
          >
            <div className="container-main flex flex-col gap-1 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active(item.href) ? "page" : undefined}
                  onClick={() => setMenuPath(null)}
                  className={`rounded-xl px-3 py-3 text-sm hover:bg-[var(--surface)] ${active(item.href) ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}
                >
                  {item.label[language]}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
