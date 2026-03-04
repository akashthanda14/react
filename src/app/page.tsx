"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const roadmaps = [
  {
    id: 1,
    title: "Backend Engineering",
    desc: "APIs, databases, caching, message queues, and production patterns",
    topics: 24,
    hours: 40,
    level: "Beginner → Advanced",
    icon: "⚙️",
    color: "#00FF7F",
    popular: true,
  },
  {
    id: 2,
    title: "System Design",
    desc: "Scalability, distributed systems, load balancing, and architecture",
    topics: 20,
    hours: 35,
    level: "Intermediate",
    icon: "🏗️",
    color: "#00D4FF",
    popular: true,
  },
  {
    id: 3,
    title: "DevOps & Cloud",
    desc: "Docker, Kubernetes, AWS, CI/CD, monitoring, and infrastructure",
    topics: 18,
    hours: 30,
    level: "Beginner → Advanced",
    icon: "☁️",
    color: "#FF6B6B",
    popular: false,
  },
  {
    id: 4,
    title: "DSA for Interviews",
    desc: "Patterns, problem-solving strategies, and company-specific prep",
    topics: 30,
    hours: 50,
    level: "All Levels",
    icon: "🧩",
    color: "#FFB347",
    popular: false,
  },
  {
    id: 5,
    title: "Generative AI & LLMs",
    desc: "Prompt engineering, RAG, agents, LangChain, and AI architecture",
    topics: 15,
    hours: 25,
    level: "Intermediate",
    icon: "🤖",
    color: "#C084FC",
    popular: true,
  },
  {
    id: 6,
    title: "Microservices",
    desc: "Service mesh, event-driven design, gRPC, and distributed tracing",
    topics: 16,
    hours: 28,
    level: "Advanced",
    icon: "🔗",
    color: "#F472B6",
    popular: false,
  },
];

const blogs = [
  {
    id: 1,
    title: "Why Redis Beats Memcached in Production",
    category: "Backend",
    date: "Feb 28, 2026",
    readTime: "6 min",
    excerpt:
      "A deep dive into persistence, data structures, and real-world tradeoffs that matter when your cache layer handles 100K+ requests/sec.",
  },
  {
    id: 2,
    title: "Kafka Architecture: The Mental Model You Need",
    category: "System Design",
    date: "Feb 20, 2026",
    readTime: "8 min",
    excerpt:
      "Partitions, consumer groups, and offset management explained through a food delivery analogy that actually sticks.",
  },
  {
    id: 3,
    title: "Docker in 2026: What Changed and What Didn't",
    category: "DevOps",
    date: "Feb 12, 2026",
    readTime: "5 min",
    excerpt:
      "Container runtimes evolved. Docker's role shifted. Here's what you actually need to know for production workloads.",
  },
  {
    id: 4,
    title: "From Generative AI to Agentic AI: The Shift",
    category: "AI/ML",
    date: "Feb 5, 2026",
    readTime: "7 min",
    excerpt:
      "LangGraph, CrewAI, and the move from single-shot generation to autonomous multi-step reasoning systems.",
  },
];

const trainingPlans = [
  {
    name: "Starter",
    price: "₹2,999",
    duration: "/session",
    features: [
      "1-hour video call",
      "Resume & profile review",
      "Personalized roadmap",
      "Career direction clarity",
    ],
    cta: "Book Session",
    highlighted: false,
  },
  {
    name: "Pro Mentorship",
    price: "₹14,999",
    duration: "/month",
    features: [
      "4x 1-hour sessions/month",
      "Weekly code reviews",
      "System design mock interviews",
      "Private Slack access",
      "Project guidance",
    ],
    cta: "Start Mentorship",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    duration: "",
    features: [
      "Team training (5–20 engineers)",
      "Custom curriculum",
      "Architecture consulting",
      "Hands-on workshops",
      "Ongoing support",
    ],
    cta: "Contact Me",
    highlighted: false,
  },
];

const stats = [
  { value: "128K+", label: "Instagram Followers" },
  { value: "20+", label: "Engineers Trained" },
  { value: "20", label: "Years Experience" },
  { value: "500+", label: "Reels Published" },
];

const consultItems = [
  {
    title: "Architecture Review",
    desc: "Get your existing system reviewed with actionable recommendations",
  },
  {
    title: "Tech Stack Decision",
    desc: "Choose the right technologies for your scale and team",
  },
  {
    title: "Scaling Strategy",
    desc: "Plan your system's growth path — caching, queues, sharding",
  },
  {
    title: "Interview Prep for Startups",
    desc: "Prepare for system design rounds at top companies",
  },
];

const NAV_SECTIONS = ["Roadmaps", "Training", "Consultation", "Blog"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Components ───────────────────────────────────────────────────────────────

function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  const handleNavClick = (item: string) => {
    setActive(item);
    setMobileOpen(false);
    scrollTo(item.toLowerCase());
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border"
      aria-label="Site navigation"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50 rounded-md"
        >
          <div
            aria-hidden="true"
            className="w-8 h-8 rounded-lg bg-neon flex items-center justify-center font-mono font-black text-sm text-background flex-shrink-0"
          >
            A
          </div>
          <span className="font-body font-bold text-base text-foreground">
            akashcode<span className="text-neon">.official</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_SECTIONS.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50 ${
                active === item
                  ? "text-neon bg-neon/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-raised"
              }`}
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => {
              setActive("Training");
              scrollTo("training");
            }}
            className="ml-3 px-5 py-2 text-sm font-semibold text-background bg-neon rounded-lg hover:bg-neon/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
          >
            Book 1:1
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex items-center justify-center w-11 h-11 rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-nav" className="sm:hidden bg-surface border-t border-border">
          <div className="px-3 py-2">
            {NAV_SECTIONS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-4 py-3.5 rounded-xl text-[15px] font-medium transition-colors ${
                  active === item
                    ? "text-neon bg-neon/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-surface-raised"
                }`}
              >
                {item}
              </button>
            ))}
            <div className="pt-2 pb-1">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  scrollTo("training");
                }}
                className="w-full py-3.5 text-[15px] font-semibold text-background bg-neon rounded-xl hover:bg-neon/90 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
              >
                Book 1:1 Session
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 pt-28 pb-20 overflow-hidden">
      {/* Grid pattern */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      {/* Neon glow orb */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,127,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-3xl w-full">
        {/* Social proof badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon/30 bg-neon/8 mb-8">
          <span className="w-2 h-2 rounded-full bg-neon animate-dot-pulse flex-shrink-0" aria-hidden="true" />
          <span className="text-[13px] text-neon font-mono font-medium">128K+ engineers learning daily</span>
        </div>

        <h1
          className="text-foreground mb-6 leading-[1.05] tracking-[-0.03em]"
          style={{
            fontSize: "clamp(38px, 7.5vw, 76px)",
            fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
            fontWeight: 400,
          }}
        >
          Learn to build
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #00FF7F, #00CC66, #00FFD5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "italic",
            }}
          >
            systems that scale
          </span>
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-[540px] mx-auto mb-10 font-body">
          Structured roadmaps, 1:1 mentorship, and hands-on training in backend engineering, system
          design, and DevOps — from someone who&apos;s been in production for 20 years.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            onClick={() => scrollTo("roadmaps")}
            className="px-8 py-4 text-[15px] font-bold text-background bg-neon rounded-xl hover:bg-neon/90 transition-all shadow-neon-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
          >
            Explore Roadmaps →
          </button>
          <button
            onClick={() => scrollTo("training")}
            className="px-8 py-4 text-[15px] font-semibold text-foreground border border-border rounded-xl hover:border-neon/30 hover:bg-neon/5 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
          >
            Book 1:1 Training
          </button>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section
      className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-20"
      aria-label="Platform statistics"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden border border-border">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`bg-surface px-6 py-8 text-center ${
              i < stats.length - 1 ? "border-r border-border last:border-r-0" : ""
            }`}
          >
            <div className="font-mono text-3xl font-bold text-neon mb-1">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Roadmaps() {
  return (
    <section id="roadmaps" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
      <div className="mb-12">
        <span className="font-mono text-xs font-semibold text-neon uppercase tracking-[0.1em]">
          Structured Learning
        </span>
        <h2
          className="font-display font-bold text-foreground mt-2 leading-tight"
          style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
        >
          Engineering Roadmaps
        </h2>
        <p className="text-base text-muted-foreground mt-3 max-w-[500px] leading-relaxed">
          Follow battle-tested learning paths designed from real production experience. No fluff, no
          filler — just the concepts that matter.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roadmaps.map((r) => (
          <div
            key={r.id}
            className="relative bg-surface border border-border rounded-2xl p-7 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-raised overflow-hidden"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = r.color + "55";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "";
            }}
          >
            {r.popular && (
              <div
                className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-[0.05em]"
                style={{ background: r.color + "20", color: r.color }}
              >
                Popular
              </div>
            )}

            <div className="text-3xl mb-4" aria-hidden="true">
              {r.icon}
            </div>
            <h3 className="font-display font-bold text-lg text-foreground mb-2">{r.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{r.desc}</p>

            <div className="flex gap-4 text-xs font-mono text-muted-foreground mb-6">
              <span>{r.topics} topics</span>
              <span aria-hidden="true">·</span>
              <span>{r.hours}h</span>
              <span aria-hidden="true">·</span>
              <span style={{ color: r.color }}>{r.level}</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm font-semibold" style={{ color: r.color }}>
                Start Learning →
              </span>
              <span className="text-xs font-mono text-muted-foreground">FREE</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Training() {
  return (
    <section id="training" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
      <div className="text-center mb-14">
        <span className="font-mono text-xs font-semibold text-neon uppercase tracking-[0.1em]">
          1:1 Mentorship
        </span>
        <h2
          className="font-display font-bold text-foreground mt-2 leading-tight"
          style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
        >
          Train with a Senior Engineer
        </h2>
        <p className="text-base text-muted-foreground mt-3 max-w-[500px] mx-auto leading-relaxed">
          Get personalized guidance from someone who&apos;s trained 20+ engineers across Japan and
          the US.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">
        {trainingPlans.map((plan, i) => (
          <div
            key={i}
            className={`relative flex flex-col rounded-2xl p-9 border transition-all ${
              plan.highlighted
                ? "border-neon/40 shadow-neon-md"
                : "border-border bg-surface"
            }`}
            style={
              plan.highlighted
                ? {
                    background: "linear-gradient(135deg, rgb(17,17,17) 0%, #0D1A12 100%)",
                    boxShadow:
                      "0 0 60px rgba(0,255,127,0.12), inset 0 1px 0 rgba(0,255,127,0.08)",
                  }
                : {}
            }
          >
            {plan.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-neon text-background text-[11px] font-mono font-black uppercase tracking-[0.08em] rounded-full whitespace-nowrap">
                Most Popular
              </div>
            )}

            <h3 className="font-display font-bold text-xl text-foreground mb-1">{plan.name}</h3>
            <div className="mt-3 mb-7">
              <span
                className="font-mono text-4xl font-bold"
                style={{ color: plan.highlighted ? "#00FF7F" : "rgb(var(--color-foreground))" }}
              >
                {plan.price}
              </span>
              {plan.duration && (
                <span className="text-sm text-muted-foreground ml-1.5">{plan.duration}</span>
              )}
            </div>

            <div className="flex-1 space-y-0 divide-y divide-border">
              {plan.features.map((f, j) => (
                <div key={j} className="flex items-center gap-2.5 py-3">
                  <span className="text-neon text-sm flex-shrink-0" aria-hidden="true">
                    ✓
                  </span>
                  <span className="text-sm text-foreground/70">{f}</span>
                </div>
              ))}
            </div>

            <button
              className={`mt-7 w-full py-3.5 rounded-xl text-[15px] font-bold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 ${
                plan.highlighted
                  ? "bg-neon text-background hover:bg-neon/90 focus-visible:ring-neon/50 shadow-neon-sm"
                  : "border border-border text-foreground hover:border-neon/30 hover:bg-neon/5 hover:text-neon focus-visible:ring-neon/30"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Consultation() {
  return (
    <section id="consultation" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
      <div className="relative bg-surface border border-border rounded-2xl overflow-hidden">
        {/* Subtle glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,255,127,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-0">
          {/* Left: copy */}
          <div className="p-8 sm:p-16 sm:border-r border-b sm:border-b-0 border-border">
            <span className="font-mono text-xs font-semibold text-neon uppercase tracking-[0.1em]">
              Architecture Consulting
            </span>
            <h2
              className="font-display font-bold text-foreground mt-3 leading-tight"
              style={{ fontSize: "clamp(24px, 4vw, 38px)" }}
            >
              Need help designing
              <br />
              your system?
            </h2>
            <p className="text-base text-muted-foreground mt-4 leading-relaxed">
              I&apos;ve built and reviewed architectures handling millions of users. Whether
              you&apos;re choosing between monolith and microservices, designing your data layer, or
              optimizing for scale — I can help you make the right call.
            </p>
          </div>

          {/* Right: items + CTA */}
          <div className="p-8 sm:p-16 flex flex-col gap-3">
            {consultItems.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-surface-raised border border-border">
                <h4 className="font-semibold text-[15px] text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
              </div>
            ))}

            <a
              href="mailto:akashcodeofficial@gmail.com"
              className="mt-2 flex items-center justify-center gap-2 py-4 px-7 bg-neon text-background rounded-xl text-[15px] font-bold hover:bg-neon/90 transition-all shadow-neon-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
            >
              Schedule a Consultation →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
      <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
        <div>
          <span className="font-mono text-xs font-semibold text-neon uppercase tracking-[0.1em]">
            Latest Articles
          </span>
          <h2
            className="font-display font-bold text-foreground mt-2 leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
          >
            Engineering Blog
          </h2>
        </div>
        <a
          href="#"
          className="text-sm font-semibold text-neon hover:text-neon/80 transition-colors"
        >
          View All Posts →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {blogs.map((b) => (
          <article
            key={b.id}
            className="bg-surface border border-border rounded-2xl p-7 cursor-pointer flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-raised hover:border-neon/30"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full bg-neon/10 text-neon text-[11px] font-mono font-semibold uppercase tracking-[0.05em]">
                {b.category}
              </span>
              <span className="text-xs font-mono text-muted-foreground">{b.readTime}</span>
            </div>
            <h3 className="font-display font-bold text-base text-foreground leading-snug mb-3">
              {b.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{b.excerpt}</p>
            <div className="mt-5 pt-4 border-t border-border text-xs font-mono text-muted-foreground">
              {b.date}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LandingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border" aria-label="Site footer">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand — 2 cols on mobile, 2 cols on sm+ */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-neon flex items-center justify-center font-mono font-black text-sm text-background flex-shrink-0">
                A
              </div>
              <span className="font-body font-bold text-base text-foreground">
                akashcode<span className="text-neon">.official</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
              Structured roadmaps and mentorship for engineers serious about production-grade
              systems.
            </p>
            <a
              href="https://www.instagram.com/akashcodeofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-5 text-xs text-muted-foreground hover:text-neon transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
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
            <nav className="flex flex-col gap-2.5" aria-label="Platform links">
              {[
                { label: "Roadmaps", action: () => scrollTo("roadmaps") },
                { label: "Training", action: () => scrollTo("training") },
                { label: "Blog", action: () => scrollTo("blog") },
              ].map((l) => (
                <button
                  key={l.label}
                  onClick={l.action}
                  className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <Link
                href="/auth/register"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Get Started
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Company
            </h3>
            <nav className="flex flex-col gap-2.5" aria-label="Company links">
              {[
                { label: "Pricing", href: "/pricing" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/akashcodeofficial",
                  external: true,
                },
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

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} akashcodeofficial. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for engineers serious about leveling up.
          </p>
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
        <Stats />
        <Roadmaps />
        <Training />
        <Consultation />
        <Blog />
      </main>
      <LandingFooter />
    </div>
  );
}
