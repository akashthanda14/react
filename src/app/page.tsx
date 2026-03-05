"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const tracks = [
  {
    title: "Backend Engineering",
    desc: "APIs · Databases · Caching · Message Queues · Production Patterns",
    phases: 5, hours: 40, engineers: "2.4K",
    icon: "⚙️", color: "#00E599", href: "/learn/backend",
  },
  {
    title: "System Design",
    desc: "Scalability · Distributed Systems · Load Balancing · Architecture",
    phases: 5, hours: 35, engineers: "1.8K",
    icon: "🏗️", color: "#00D4FF", href: "/learn/system-design",
  },
  {
    title: "DevOps & Cloud",
    desc: "Docker · Kubernetes · AWS · CI/CD · Monitoring · Infrastructure",
    phases: 5, hours: 30, engineers: "1.2K",
    icon: "☁️", color: "#FF6B6B", href: "/learn/devops",
  },
  {
    title: "Generative AI",
    desc: "Prompt Engineering · RAG · Agents · LangChain · AI Architecture",
    phases: 5, hours: 25, engineers: "3.1K",
    icon: "🤖", color: "#C084FC", href: "/learn/genai",
  },
  {
    title: "Full Stack Frontend",
    desc: "React · Next.js · TypeScript · State Management · Performance",
    phases: 5, hours: 35, engineers: "1.6K",
    icon: "🖥️", color: "#FFB347", href: "/learn/foundations",
  },
];

const problems = [
  { icon: "🤯", title: "Tutorial hell is real", desc: "You've watched 200 videos but can't build a production app. Random tutorials without structure lead nowhere." },
  { icon: "🗺️", title: "No clear roadmap", desc: "You don't know what to learn next. Should you learn Docker or databases first? Nobody gives you a real sequence." },
  { icon: "😰", title: "Interview anxiety", desc: "System design rounds feel impossible. You know concepts but can't connect them under pressure." },
];

const howItWorks = [
  { step: "01", title: "Choose Your Track", desc: "Pick from 5 engineering tracks based on your career goal. Each track is structured into progressive phases." },
  { step: "02", title: "Complete Phases", desc: "Work through curated topics with resources, projects, and milestone checkpoints to validate your learning." },
  { step: "03", title: "Level Up & Get Hired", desc: "Build real skills that companies actually test for. Go from junior to senior-level confidence." },
];

const testimonials = [
  { name: "Priya M.", role: "Backend Developer at Flipkart", quote: "The roadmap gave me clarity I never had. I went from confused junior to confidently designing APIs in 3 months.", avatar: "PM" },
  { name: "Rahul K.", role: "DevOps Engineer at Razorpay", quote: "Akash's structured approach is exactly what YouTube tutorials lack. Phase-by-phase, I actually retained what I learned.", avatar: "RK" },
  { name: "Sneha T.", role: "Full Stack at Zerodha", quote: "The 1:1 mentorship sessions were game-changing. Real production experience from someone who's actually built at scale.", avatar: "ST" },
];

const blogs = [
  { title: "Why Redis Beats Memcached in Production", category: "Backend", date: "Feb 28, 2026", readTime: "6 min", excerpt: "A deep dive into persistence, data structures, and real-world tradeoffs at 100K+ req/sec." },
  { title: "Kafka Architecture: The Mental Model You Need", category: "System Design", date: "Feb 20, 2026", readTime: "8 min", excerpt: "Partitions, consumer groups, and offset management explained through a food delivery analogy." },
  { title: "Docker in 2026: What Changed and What Didn't", category: "DevOps", date: "Feb 12, 2026", readTime: "5 min", excerpt: "Container runtimes evolved. Docker's role shifted. Here's what you need for production." },
  { title: "From Generative AI to Agentic AI", category: "AI/ML", date: "Feb 5, 2026", readTime: "7 min", excerpt: "LangGraph, CrewAI, and the move from single-shot generation to autonomous reasoning." },
];

const stats = [
  { value: "128K+", label: "Instagram Followers" },
  { value: "20+", label: "Engineers Trained" },
  { value: "20", label: "Years Experience" },
  { value: "5", label: "Learning Tracks" },
];

const NAV_SECTIONS = ["Tracks", "How It Works", "Pricing", "Blog"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── LandingNav ───────────────────────────────────────────────────────────────

function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (item: string) => {
    setMobileOpen(false);
    const ids: Record<string, string> = {
      "Tracks": "tracks",
      "How It Works": "how-it-works",
      "Pricing": "pricing",
      "Blog": "blog",
    };
    scrollTo(ids[item] || item.toLowerCase());
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border" aria-label="Site navigation">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-neon flex items-center justify-center font-mono font-black text-sm text-background flex-shrink-0">A</div>
          <span className="font-body font-bold text-base text-foreground">
            akashcode<span className="text-neon">.official</span>
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          {NAV_SECTIONS.map((item) => (
            <button key={item} onClick={() => handleNavClick(item)}
              className="px-4 py-2 text-sm font-medium text-foreground/50 hover:text-foreground rounded-full transition-colors">
              {item}
            </button>
          ))}
          <Link href="/auth/login" className="ml-3 px-4 py-2 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors">
            Log in
          </Link>
          <Link href="/auth/register"
            className="ml-1 px-5 py-2 text-sm font-semibold text-foreground border border-foreground/20 rounded-full hover:bg-foreground/5 transition-colors">
            Sign up
          </Link>
        </div>

        <button className="sm:hidden p-2 text-foreground/50 hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="sm:hidden bg-surface border-t border-border">
          <div className="px-3 py-2">
            {NAV_SECTIONS.map((item) => (
              <button key={item} onClick={() => handleNavClick(item)}
                className="w-full text-left px-4 py-3.5 rounded-xl text-[15px] font-medium text-foreground/60 hover:text-foreground hover:bg-surface-raised transition-colors">
                {item}
              </button>
            ))}
            <div className="pt-2 pb-1 flex gap-3">
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 text-center text-sm font-medium border border-border rounded-xl text-foreground/60 transition-colors">Log in</Link>
              <Link href="/auth/register" onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 text-center text-sm font-semibold text-foreground border border-foreground/20 rounded-xl transition-colors">Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-28 pb-20 overflow-hidden">
      {/* Grid + glow */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[700px] pointer-events-none" aria-hidden="true"
        style={{ background: "linear-gradient(180deg, rgba(0,229,153,0.08) 0%, rgba(0,229,153,0.15) 50%, transparent 100%)", filter: "blur(40px)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto w-full">
        <div className="max-w-[700px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon/30 bg-neon/8 mb-8">
            <span className="w-2 h-2 rounded-full bg-neon animate-dot-pulse" />
            <span className="text-[13px] text-neon font-mono font-medium uppercase tracking-wider">Trusted by 128K+ Engineers</span>
          </div>

          <h1 className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.02em]"
            style={{ fontSize: "clamp(38px, 6.5vw, 68px)" }}>
            Structured Roadmaps
            <br />
            for{" "}
            <span className="text-neon">Engineers Who Ship</span>
          </h1>

          <p className="text-base text-foreground/50 leading-relaxed max-w-[540px] mt-6 mb-10">
            Phase-based learning tracks in Backend, System Design, DevOps, and GenAI — built from 20 years of production experience. No fluff. Just what gets you hired.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link href="/auth/register"
              className="px-8 py-4 text-[15px] font-bold text-background bg-neon rounded-xl hover:bg-neon/90 transition-all shadow-neon-md active:scale-[0.98]">
              Start Your Roadmap →
            </Link>
            <button onClick={() => scrollTo("tracks")}
              className="px-8 py-4 text-[15px] font-semibold text-foreground border border-border rounded-xl hover:border-neon/30 hover:bg-neon/5 transition-all active:scale-[0.98]">
              Explore Tracks
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Bar + Stats ────────────────────────────────────────────────────────

function TrustAndStats() {
  return (
    <>
      {/* Company logos */}
      <section className="border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-center gap-x-12 gap-y-3 flex-wrap text-[12px] text-foreground/20 font-mono font-medium uppercase tracking-widest">
          <span className="text-foreground/15">Engineers from</span>
          {["Google", "Amazon", "Microsoft", "Meta", "Netflix", "Flipkart", "Razorpay", "Zerodha"].map((co) => (
            <span key={co} className="text-foreground/20">{co}</span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden border border-border">
          {stats.map((s, i) => (
            <div key={i} className={`bg-surface px-6 py-8 text-center ${i < stats.length - 1 ? "border-r border-border" : ""}`}>
              <div className="font-mono text-3xl font-bold text-neon mb-1">{s.value}</div>
              <div className="text-sm text-foreground/40">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ─── The Problem ──────────────────────────────────────────────────────────────

function Problem() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <span className="font-mono text-xs font-semibold text-neon uppercase tracking-[0.12em]">The Problem</span>
      <h2 className="font-display font-bold text-foreground mt-3 leading-tight" style={{ fontSize: "clamp(28px, 5vw, 44px)" }}>
        You&apos;re stuck. We&apos;ve been there.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
        {problems.map((p, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl p-8">
            <div className="text-3xl mb-4">{p.icon}</div>
            <h3 className="font-display font-bold text-lg text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-foreground/40 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Tracks ───────────────────────────────────────────────────────────────────

function Tracks() {
  return (
    <section id="tracks" className="max-w-[1200px] mx-auto px-6 py-20">
      <span className="font-mono text-xs font-semibold text-neon uppercase tracking-[0.12em]">Structured Learning</span>
      <h2 className="font-display font-bold text-foreground mt-3 mb-3 leading-tight" style={{ fontSize: "clamp(28px, 5vw, 44px)" }}>
        Choose your engineering path
      </h2>
      <p className="text-[15px] text-foreground/40 max-w-[500px] leading-relaxed mb-12">
        Battle-tested roadmaps from real production experience. Each track is structured into progressive phases with milestone checkpoints.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((t) => (
          <Link key={t.title} href={t.href}
            className="group bg-surface border border-border rounded-2xl p-8 transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-raised overflow-hidden">
            <div className="text-3xl mb-5">{t.icon}</div>
            <h3 className="font-display font-bold text-lg text-foreground mb-2">{t.title}</h3>
            <p className="text-sm text-foreground/40 leading-relaxed mb-6">{t.desc}</p>
            <div className="flex gap-4 text-[11px] font-mono text-foreground/20 mb-6">
              <span>{t.phases} phases</span><span>·</span><span>{t.hours}h</span><span>·</span>
              <span style={{ color: t.color }}>{t.engineers} enrolled</span>
            </div>
            <div className="flex items-center justify-between pt-5 border-t border-border">
              <span className="text-sm font-semibold text-neon group-hover:underline">Start Learning →</span>
              <span className="text-xs font-mono text-foreground/20">FREE</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {howItWorks.map((item) => (
          <div key={item.step} className="bg-surface border border-border rounded-2xl p-8">
            <div className="font-mono text-4xl font-bold text-neon/20 mb-3">{item.step}</div>
            <h3 className="font-display font-bold text-lg text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-foreground/40 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20 text-center">
      {/* Instagram badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface mb-6">
        <svg className="w-4 h-4 text-foreground/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
        <span className="text-sm text-foreground/50">@akashcodeofficial</span>
        <span className="text-sm text-foreground/30">· 128K+</span>
      </div>

      <h2 className="font-display font-bold text-foreground leading-tight mb-14" style={{ fontSize: "clamp(28px, 5vw, 44px)" }}>
        Trusted by engineers in 40+ countries
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-surface border border-border rounded-2xl p-8">
            <p className="text-sm text-foreground/50 leading-relaxed mb-8">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon/10 flex items-center justify-center text-xs font-bold text-neon">{t.avatar}</div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-foreground/30">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

function BlogSection() {
  return (
    <section id="blog" className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
        <div>
          <span className="font-mono text-xs font-semibold text-neon uppercase tracking-[0.12em]">Latest Articles</span>
          <h2 className="font-display font-bold text-foreground mt-2 leading-tight" style={{ fontSize: "clamp(28px, 5vw, 44px)" }}>
            Engineering Blog
          </h2>
        </div>
        <Link href="/blog" className="text-sm font-semibold text-neon hover:text-neon/80 transition-colors">
          View All Posts →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {blogs.map((b, i) => (
          <article key={i}
            className="bg-surface border border-border rounded-2xl p-7 cursor-pointer flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-raised hover:border-neon/30">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full bg-neon/10 text-neon text-[11px] font-mono font-semibold uppercase tracking-[0.05em]">{b.category}</span>
              <span className="text-xs font-mono text-foreground/20">{b.readTime}</span>
            </div>
            <h3 className="font-display font-bold text-base text-foreground leading-snug mb-3">{b.title}</h3>
            <p className="text-sm text-foreground/40 leading-relaxed flex-1">{b.excerpt}</p>
            <div className="mt-5 pt-4 border-t border-border text-xs font-mono text-foreground/20">{b.date}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── Pricing (1:1 Training) ──────────────────────────────────────────────────

function Pricing() {
  const plans = [
    {
      name: "Starter", price: "₹2,999", duration: "/session",
      features: ["1-hour video call", "Resume & profile review", "Personalized roadmap", "Career direction clarity"],
      cta: "Book Session", highlighted: false,
    },
    {
      name: "Pro Mentorship", price: "₹14,999", duration: "/month",
      features: ["4× 1-hour sessions/month", "Weekly code reviews", "System design mock interviews", "Private Slack access", "Project guidance"],
      cta: "Start Mentorship", highlighted: true,
    },
    {
      name: "Enterprise", price: "Custom", duration: "",
      features: ["Team training (5–20 engineers)", "Custom curriculum", "Architecture consulting", "Hands-on workshops", "Ongoing support"],
      cta: "Contact Me", highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="font-mono text-xs font-semibold text-neon uppercase tracking-[0.12em]">1:1 Mentorship</span>
        <h2 className="font-display font-bold text-foreground mt-2 leading-tight" style={{ fontSize: "clamp(28px, 5vw, 44px)" }}>
          Train with a Senior Engineer
        </h2>
        <p className="text-base text-foreground/40 mt-3 max-w-[500px] mx-auto leading-relaxed">
          Get personalized guidance from someone who&apos;s trained 20+ engineers across Japan and the US.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">
        {plans.map((plan, i) => (
          <div key={i}
            className={`relative flex flex-col rounded-2xl p-9 border transition-all ${plan.highlighted ? "border-neon/40 shadow-neon-md" : "border-border bg-surface"
              }`}
            style={plan.highlighted ? {
              background: "linear-gradient(135deg, rgb(17,17,17) 0%, #0D1A12 100%)",
              boxShadow: "0 0 60px rgba(0,229,153,0.08), inset 0 1px 0 rgba(0,229,153,0.06)",
            } : {}}>
            {plan.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-neon text-background text-[11px] font-mono font-black uppercase tracking-[0.08em] rounded-full whitespace-nowrap">Most Popular</div>
            )}
            <h3 className="font-display font-bold text-xl text-foreground mb-1">{plan.name}</h3>
            <div className="mt-3 mb-7">
              <span className="font-mono text-4xl font-bold" style={{ color: plan.highlighted ? "#00E599" : "rgb(var(--color-foreground))" }}>{plan.price}</span>
              {plan.duration && <span className="text-sm text-foreground/30 ml-1.5">{plan.duration}</span>}
            </div>
            <div className="flex-1 space-y-0 divide-y divide-border">
              {plan.features.map((f, j) => (
                <div key={j} className="flex items-center gap-2.5 py-3">
                  <span className="text-neon text-sm flex-shrink-0">✓</span>
                  <span className="text-sm text-foreground/50">{f}</span>
                </div>
              ))}
            </div>
            <button className={`mt-7 w-full py-3.5 rounded-xl text-[15px] font-bold transition-all active:scale-[0.98] ${plan.highlighted
                ? "bg-neon text-background hover:bg-neon/90 shadow-neon-sm"
                : "border border-border text-foreground hover:border-neon/30 hover:bg-neon/5 hover:text-neon"
              }`}>{plan.cta}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function LandingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-neon flex items-center justify-center font-mono font-black text-sm text-background">A</div>
              <span className="font-body font-bold text-base text-foreground">
                akashcode<span className="text-neon">.official</span>
              </span>
            </div>
            <p className="text-sm text-foreground/30 leading-relaxed max-w-[280px]">
              Structured roadmaps and mentorship for engineers serious about production-grade systems.
            </p>
            <a href="https://www.instagram.com/akashcodeofficial" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-5 text-xs text-foreground/25 hover:text-neon transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              @akashcodeofficial · 128K+
            </a>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold text-foreground/25 uppercase tracking-widest mb-4">Platform</h3>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: "Roadmaps", action: () => scrollTo("tracks") },
                { label: "Training", action: () => scrollTo("pricing") },
                { label: "Blog", action: () => scrollTo("blog") },
              ].map((l) => (
                <button key={l.label} onClick={l.action} className="text-left text-sm text-foreground/30 hover:text-foreground transition-colors">{l.label}</button>
              ))}
              <Link href="/auth/register" className="text-sm text-foreground/30 hover:text-foreground transition-colors">Get Started</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold text-foreground/25 uppercase tracking-widest mb-4">Company</h3>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: "Pricing", href: "/pricing" },
                { label: "Blog", href: "/blog" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Instagram", href: "https://www.instagram.com/akashcodeofficial", external: true },
              ].map((l) => (
                <Link key={l.label} href={l.href} target={'external' in l ? "_blank" : undefined} rel={'external' in l ? "noopener noreferrer" : undefined}
                  className="text-sm text-foreground/30 hover:text-foreground transition-colors">{l.label}</Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-foreground/20">© {year} akashcodeofficial. All rights reserved.</p>
          <p className="text-xs text-foreground/20">Built for engineers serious about leveling up.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <main>
        <Hero />
        <TrustAndStats />
        <Problem />
        <Tracks />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <BlogSection />
      </main>
      <LandingFooter />
    </div>
  );
}
