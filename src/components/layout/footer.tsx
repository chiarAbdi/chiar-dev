import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="container-main py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight">
              chiar
              <span className="text-[var(--accent)]">.dev</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-[var(--muted)]">
              Building digital experiences. Learning without limits.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">Explore</h3>

            <nav className="flex flex-col items-start gap-3 text-sm text-[var(--muted)]">
              <Link href="/" className="hover:text-[var(--accent)]">
                Home
              </Link>
              <Link href="/about" className="hover:text-[var(--accent)]">
                About
              </Link>
              <Link href="/projects" className="hover:text-[var(--accent)]">
                Projects
              </Link>
              <Link href="/blog" className="hover:text-[var(--accent)]">
                LearnBlog
              </Link>
              <Link href="/contact" className="hover:text-[var(--accent)]">
                Contact
              </Link>
            </nav>
          </div>

          {/* External Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">Connect</h3>

            <div className="flex flex-col items-start gap-3 text-sm text-[var(--muted)]">
              <a
                href="https://github.com/chiarAbdi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[var(--accent)]"
              >
                GitHub
                <ExternalLink size={14} />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 hover:text-[var(--accent)]"
              >
                Get in touch
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center">
          <p>© 2026 chiar.dev. All rights reserved.</p>

          <a
            href="#top"
            className="inline-flex items-center gap-2 hover:text-[var(--accent)]"
          >
            Back to top
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
