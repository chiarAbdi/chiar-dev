"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "LearnBlog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [menuPath, setMenuPath] = useState<string | null>(null);

  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  const open = menuPath === pathname;

  return (
    <header className="glass-nav fixed inset-x-0 top-0 z-50 border-b border-[var(--border)]">
      <nav className="container-main flex h-20 items-center justify-between">
        <Link href="/" className="font-mono text-xl font-bold tracking-tight">
          chiar<span className="text-[var(--accent)]">.dev</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-[var(--accent)] ${
                pathname === item.href
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle color theme"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="rounded-xl border border-[var(--border)] p-2.5"
          >
            <Moon size={18} className="dark:hidden" />
            <Sun size={18} className="hidden dark:block" />
          </button>

          <a
            href="https://github.com/chiarAbdi"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 rounded-xl bg-[var(--foreground)] px-4 py-2.5 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80 sm:flex"
          >
            GitHub <ArrowUpRight size={15} />
          </a>

          <button
            className="rounded-lg p-2 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setMenuPath(open ? null : pathname)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--background)] md:hidden"
          >
            <div className="container-main flex flex-col gap-1 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuPath(null)}
                  className="rounded-lg px-3 py-3 text-sm hover:bg-[var(--surface)]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
