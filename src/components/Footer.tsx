"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <span className="font-display text-base font-bold text-neon">
                akashcodeofficial
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
              Structured, phase-based roadmaps for engineers serious about leveling up.
            </p>
            <a
              href="https://www.instagram.com/akashcodeofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs text-muted-foreground hover:text-neon transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @akashcodeofficial · 128K+
            </a>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Platform
            </h3>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: "Choose a Track", href: "/onboarding" },
                { label: "My Roadmap", href: "/roadmap" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Profile", href: "/profile" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Company
            </h3>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: "Pricing", href: "/pricing" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Instagram", href: "https://www.instagram.com/akashcodeofficial", external: true },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} akashcodeofficial. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for engineers who are serious about leveling up.
          </p>
        </div>
      </div>
    </footer>
  );
}
