import Link from "next/link";

const footerLinks = {
  Platform: [
    { label: "Learning Tracks", href: "/learn" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Tracks: [
    { label: "Backend", href: "/learn/backend" },
    { label: "System Design", href: "/learn/system-design" },
    { label: "DevOps & Cloud", href: "/learn/devops" },
    { label: "GenAI", href: "/learn/genai" },
    { label: "Frontend", href: "/learn/foundations" },
  ],
  Company: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  Community: [
    { label: "Instagram", href: "https://www.instagram.com/akashcodeofficial", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-neon flex items-center justify-center">
                <span className="text-background font-display font-bold text-[11px]">A</span>
              </div>
              <span className="font-display text-sm font-bold text-foreground">
                Akash Code <span className="text-neon">Official</span>
              </span>
            </Link>
            <p className="text-xs text-foreground/40 leading-relaxed max-w-[200px]">
              Structured engineering tracks from real production experience.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[11px] font-semibold text-foreground/50 uppercase tracking-widest mb-4">
                {title}
              </h4>
              <nav className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    {...('external' in link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[13px] text-foreground/40 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-foreground/30">
            <span className="w-1.5 h-1.5 rounded-full bg-neon" />
            <span>All systems operational</span>
          </div>
          <p className="text-xs text-foreground/30">
            © {new Date().getFullYear()} Akash Code Official. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
