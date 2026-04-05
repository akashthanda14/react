"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

// ─── Data ─────────────────────────────────────────────────────────────────────

const tracks = [
  {
    title: "Backend Engineering",
    desc: "APIs, databases, caching, message queues, and production patterns.",
    phases: 5, hours: 40,
    icon: "⚙️", accent: "#00E599", href: "/learn/backend",
    tags: ["Node.js", "PostgreSQL", "Redis"],
  },
  {
    title: "System Design",
    desc: "Scalability, distributed systems, load balancing, and architecture.",
    phases: 5, hours: 35,
    icon: "🏗️", accent: "#00D4FF", href: "/learn/system-design",
    tags: ["CAP Theorem", "Kafka", "CDN"],
  },
  {
    title: "DevOps & Cloud",
    desc: "Docker, Kubernetes, AWS, CI/CD pipelines, and monitoring.",
    phases: 5, hours: 30,
    icon: "☁️", accent: "#FF6B6B", href: "/learn/devops",
    tags: ["Docker", "AWS", "Terraform"],
  },
  {
    title: "Generative AI",
    desc: "Prompt engineering, RAG, autonomous agents, and AI architecture.",
    phases: 5, hours: 25,
    icon: "🤖", accent: "#C084FC", href: "/learn/genai",
    tags: ["LangChain", "RAG", "Agents"],
  },
  {
    title: "Full Stack Frontend",
    desc: "React, Next.js, TypeScript, state management, and performance.",
    phases: 5, hours: 35,
    icon: "🖥️", accent: "#FFB347", href: "/learn/foundations",
    tags: ["React", "Next.js", "TypeScript"],
  },
];

const dsaTopics = [
  { label: "Arrays & Hashing", count: 24, done: true },
  { label: "Two Pointers", count: 18, done: true },
  { label: "Sliding Window", count: 12, done: false },
  { label: "Binary Search", count: 20, done: false },
  { label: "Trees & Graphs", count: 35, done: false },
  { label: "Dynamic Programming", count: 40, done: false },
];

const blogs = [
  {
    title: "Why Redis Beats Memcached in Production",
    category: "Backend",
    date: "Feb 28, 2026",
    readTime: "6 min",
    excerpt: "A deep dive into persistence, data structures, and real-world tradeoffs at 100K+ req/sec.",
    accent: "#00E599",
  },
  {
    title: "Kafka Architecture: The Mental Model You Need",
    category: "System Design",
    date: "Feb 20, 2026",
    readTime: "8 min",
    excerpt: "Partitions, consumer groups, and offset management — explained simply.",
    accent: "#00D4FF",
  },
  {
    title: "From Generative AI to Agentic AI",
    category: "AI/ML",
    date: "Feb 5, 2026",
    readTime: "7 min",
    excerpt: "LangGraph, CrewAI, and the move from single-shot generation to autonomous reasoning.",
    accent: "#C084FC",
  },
];

const testimonials = [
  {
    name: "Priya M.",
    role: "Backend Developer",
    company: "Flipkart",
    quote: "The roadmap gave me clarity I never had. I went from a confused junior to confidently designing APIs in 3 months.",
    avatar: "PM",
    accent: "#00E599",
  },
  {
    name: "Rahul K.",
    role: "DevOps Engineer",
    company: "Razorpay",
    quote: "Akash's structured approach is exactly what YouTube tutorials lack. Phase-by-phase, I actually retained what I learned.",
    avatar: "RK",
    accent: "#00D4FF",
  },
  {
    name: "Sneha T.",
    role: "Full Stack Engineer",
    company: "Zerodha",
    quote: "The 1:1 mentorship was game-changing. Real production experience shared in a way that actually sticks.",
    avatar: "ST",
    accent: "#C084FC",
  },
  {
    name: "Arjun V.",
    role: "SDE-2",
    company: "Amazon",
    quote: "The DSA sheet is the most structured I've seen. Covered it in 6 weeks and cleared my FAANG interview.",
    avatar: "AV",
    accent: "#FFB347",
  },
];

const mentorshipSlots = [
  { title: "Resume Review", duration: "45 min", desc: "Get your resume reviewed and positioned for senior roles." },
  { title: "System Design Deep Dive", duration: "60 min", desc: "Work through real system design problems with live feedback." },
  { title: "Career Strategy", duration: "60 min", desc: "Build a roadmap tailored to your background and target companies." },
];

// ─── useInView hook ───────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Section Label ─────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-mono text-[12px] font-semibold text-neon uppercase tracking-[0.15em] mb-3">
      {children}
    </span>
  );
}

// ─── LandingNav ───────────────────────────────────────────────────────────────

function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { label: "Roadmap", id: "roadmap" },
    { label: "DSA Sheet", id: "dsa" },
    { label: "Blog", id: "blog" },
    { label: "Mentorship", id: "mentorship" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
      aria-label="Site navigation"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-neon flex items-center justify-center font-mono font-black text-sm text-background shadow-neon-sm group-hover:shadow-neon-md transition-all">
            A
          </div>
          <span className="font-display font-bold text-[15px] text-foreground hidden sm:block">
            Akash Code <span className="text-neon">Official</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-0.5">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="px-3.5 py-2 text-[13px] font-medium text-foreground/50 hover:text-foreground rounded-lg transition-colors hover:bg-foreground/5"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="hidden sm:flex items-center gap-1">
          <ThemeToggle />
          <Link href="/auth/login"
            className="px-4 py-2 text-[13px] font-medium text-foreground/50 hover:text-foreground transition-colors rounded-lg hover:bg-foreground/5">
            Log in
          </Link>
          <Link href="/auth/register"
            className="px-4 py-1.5 text-[13px] font-semibold text-background bg-neon rounded-lg hover:bg-neon/90 transition-all shadow-neon-sm hover:shadow-neon-md active:scale-[0.98]">
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex sm:hidden items-center gap-1">
          <ThemeToggle />
          <button
            className="p-2 text-foreground/60 hover:text-foreground transition-colors rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 sm:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="fixed left-0 right-0 top-16 z-50 bg-surface border-b border-border sm:hidden animate-in slide-in-from-top duration-200">
            <div className="max-w-[1200px] mx-auto px-4 py-3 space-y-0.5">
              {links.map((l) => (
                <button key={l.id} onClick={() => { scrollTo(l.id); setMobileOpen(false); }}
                  className="w-full text-left px-4 py-3.5 rounded-xl text-[15px] font-medium text-foreground/60 hover:text-foreground hover:bg-surface-raised transition-colors">
                  {l.label}
                </button>
              ))}
              <div className="pt-3 pb-2 flex gap-3 border-t border-border mt-2">
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                  className="flex-1 py-2.5 text-center text-sm font-medium border border-border rounded-xl text-foreground/60 hover:text-foreground transition-colors">
                  Log in
                </Link>
                <Link href="/auth/register" onClick={() => setMobileOpen(false)}
                  className="flex-1 py-2.5 text-center text-sm font-semibold text-background bg-neon rounded-xl hover:bg-neon/90 transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-20 overflow-hidden text-center">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at center top, rgba(0,229,153,0.14) 0%, rgba(0,229,153,0.04) 45%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neon/20 bg-neon/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-dot-pulse" />
          <span className="text-[12px] text-neon font-mono font-medium uppercase tracking-wider">
            Trusted by 128K+ Engineers on Instagram
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-bold text-foreground leading-[1.06] tracking-[-0.03em] mb-6"
          style={{ fontSize: "clamp(46px, 6.5vw, 80px)" }}
        >
          Everything you need to
          <br />
          <span className="text-neon">land your dream role</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-foreground/50 leading-relaxed max-w-[540px] mx-auto mb-10">
          Structured roadmaps, a curated DSA sheet, in-depth engineering blogs,
          and 1:1 mentorship — all in one place.
        </p>

        {/* Pills showcasing offerings */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { label: "Engineering Roadmaps", color: "#00E599" },
            { label: "DSA Sheet", color: "#00D4FF" },
            { label: "Engineering Blog", color: "#C084FC" },
            { label: "1:1 Mentorship", color: "#FFB347" },
          ].map((pill) => (
            <span
              key={pill.label}
              className="px-3 py-1 rounded-full text-[12px] font-medium border"
              style={{ color: pill.color, borderColor: `${pill.color}33`, backgroundColor: `${pill.color}0d` }}
            >
              {pill.label}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/auth/register"
            className="w-full sm:w-auto px-8 py-3.5 text-[16px] font-bold text-background bg-neon rounded-xl hover:bg-neon/90 transition-all shadow-neon-md hover:shadow-neon-lg active:scale-[0.98] hover:-translate-y-0.5"
          >
            Start for Free →
          </Link>
          <button
            onClick={() => scrollTo("roadmap")}
            className="w-full sm:w-auto px-8 py-3.5 text-[16px] font-semibold text-foreground border border-border rounded-xl hover:border-neon/30 hover:bg-neon/5 hover:text-neon transition-all active:scale-[0.98]"
          >
            Explore Roadmaps
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-20" aria-hidden="true">
        <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

// ─── Roadmap Section ──────────────────────────────────────────────────────────

function RoadmapSection() {
  const { ref, inView } = useInView();

  return (
    <section id="roadmap" className="border-t border-border">
      <div ref={ref} className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24">
        {/* Header */}
        <div className={`max-w-[560px] mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Label>Engineering Roadmaps</Label>
          <h2 className="font-display font-bold text-foreground leading-tight mb-4" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
            Phase-based paths to
            <br />
            <span className="text-neon">senior-level thinking</span>
          </h2>
          <p className="text-[17px] text-foreground/45 leading-relaxed">
            5 specialization tracks, each broken into progressive phases with curated
            resources and milestone checkpoints. Free to start — no credit card needed.
          </p>
        </div>

        {/* Track grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map((t, i) => (
            <Link
              key={t.title}
              href={t.href}
              className={`group relative bg-surface border border-border rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:bg-surface-raised overflow-hidden ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: inView ? `${i * 60}ms` : "0ms" }}
            >
              {/* Hover glow border */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 0 1px ${t.accent}30` }}
              />

              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl">{t.icon}</span>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                  style={{ color: t.accent, borderColor: `${t.accent}33`, backgroundColor: `${t.accent}0d` }}>
                  FREE
                </span>
              </div>

              <h3 className="font-display font-bold text-[20px] text-foreground mb-2 group-hover:text-neon transition-colors">
                {t.title}
              </h3>
              <p className="text-[15px] text-foreground/40 leading-relaxed mb-5 flex-1">{t.desc}</p>

              <div className="flex gap-1.5 flex-wrap mb-5">
                {t.tags.map((tag) => (
                  <span key={tag} className="text-[12px] font-mono text-foreground/25 px-2 py-0.5 rounded-md bg-foreground/5">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3 text-[12px] font-mono text-foreground/25">
                  <span>{t.phases} phases</span>
                  <span className="w-px h-3 bg-border" />
                  <span>{t.hours}h</span>
                </div>
                <span className="text-xs font-semibold text-neon opacity-0 group-hover:opacity-100 transition-opacity">
                  Start →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DSA Sheet Section ────────────────────────────────────────────────────────

function DSASection() {
  const { ref, inView } = useInView();

  return (
    <section id="dsa" className="border-t border-border bg-surface/30">
      <div ref={ref} className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — copy */}
          <div>
            <Label>DSA Sheet</Label>
            <h2 className="font-display font-bold text-foreground leading-tight mb-5" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
              Crack interviews with a
              <br />
              <span className="text-neon">structured problem set</span>
            </h2>
            <p className="text-[17px] text-foreground/45 leading-relaxed mb-8">
              A hand-picked collection of 300+ problems organized by pattern and difficulty.
              Track your progress, mark problems solved, and build real pattern recognition —
              not just brute-force memorization.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {[
                { stat: "300+", label: "Curated problems" },
                { stat: "15+", label: "Problem patterns" },
                { stat: "3 tiers", label: "Easy · Medium · Hard" },
                { stat: "Auth", label: "Progress saved" },
              ].map((s) => (
                <div key={s.label} className="bg-surface border border-border rounded-xl p-4">
                  <div className="font-mono text-2xl font-bold text-neon mb-1">{s.stat}</div>
                  <div className="text-[13px] text-foreground/40">{s.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-7 py-3 text-[15px] font-bold text-background bg-neon rounded-xl hover:bg-neon/90 transition-all shadow-neon-sm hover:shadow-neon-md active:scale-[0.98]"
            >
              Start Solving
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Right — UI mockup */}
          <div className="relative">
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
              {/* Mockup header */}
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neon/40" />
                </div>
                <span className="font-mono text-[11px] text-foreground/25">DSA Sheet — Progress</span>
                <div className="text-[11px] font-mono text-neon">2/6 done</div>
              </div>

              {/* Progress bar */}
              <div className="px-5 py-3 border-b border-border">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-foreground/40 font-mono">Overall Progress</span>
                  <span className="text-[11px] text-foreground/40 font-mono">33%</span>
                </div>
                <div className="h-1.5 bg-foreground/8 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-neon rounded-full" />
                </div>
              </div>

              {/* Topic rows */}
              <div className="divide-y divide-border">
                {dsaTopics.map((topic) => (
                  <div key={topic.label} className="px-5 py-3.5 flex items-center justify-between group hover:bg-surface-raised transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                        topic.done ? "bg-neon/20 border border-neon/40" : "border border-border"
                      }`}>
                        {topic.done && (
                          <svg className="w-2.5 h-2.5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-[13px] font-medium ${topic.done ? "text-foreground/40 line-through" : "text-foreground/70"}`}>
                        {topic.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-foreground/25">{topic.count} problems</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Glow */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 pointer-events-none opacity-20"
              style={{ background: "radial-gradient(circle, #00E599 0%, transparent 70%)" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Blog Section ─────────────────────────────────────────────────────────────

function BlogSection() {
  const { ref, inView } = useInView();

  return (
    <section id="blog" className="border-t border-border">
      <div ref={ref} className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24">
        <div className={`flex items-end justify-between gap-4 mb-14 flex-wrap transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <Label>Engineering Blog</Label>
            <h2 className="font-display font-bold text-foreground leading-tight" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
              Deep dives, not surface-level takes
            </h2>
          </div>
          <Link href="/blog"
            className="text-[15px] font-semibold text-foreground/40 hover:text-neon transition-colors flex items-center gap-1.5 flex-shrink-0">
            All Posts
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {blogs.map((b, i) => (
            <article
              key={i}
              className={`group bg-surface border border-border rounded-2xl p-7 flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-raised hover:border-white/10 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wide"
                  style={{ color: b.accent, backgroundColor: `${b.accent}12`, border: `1px solid ${b.accent}22` }}>
                  {b.category}
                </span>
                <span className="text-[12px] font-mono text-foreground/20">{b.readTime} read</span>
              </div>

              <h3 className="font-display font-bold text-[18px] text-foreground leading-snug mb-3 flex-1 group-hover:text-neon transition-colors">
                {b.title}
              </h3>
              <p className="text-[14px] text-foreground/35 leading-relaxed mb-6">{b.excerpt}</p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-[12px] font-mono text-foreground/20">{b.date}</span>
                <span className="text-[12px] font-semibold text-neon opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">
                  Read →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Mentorship Section ───────────────────────────────────────────────────────

function MentorshipSection() {
  const { ref, inView } = useInView();

  return (
    <section id="mentorship" className="border-t border-border bg-surface/30">
      <div ref={ref} className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — session cards */}
          <div className="space-y-3 order-2 lg:order-1">
            {mentorshipSlots.map((slot, i) => (
              <div
                key={slot.title}
                className="bg-surface border border-border rounded-2xl p-6 hover:border-neon/20 hover:bg-surface-raised transition-all duration-200 group"
                style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display font-bold text-[19px] text-foreground group-hover:text-neon transition-colors">
                        {slot.title}
                      </h3>
                      <span className="text-[12px] font-mono text-foreground/30 px-2 py-0.5 rounded-full border border-border">
                        {slot.duration}
                      </span>
                    </div>
                    <p className="text-[15px] text-foreground/40 leading-relaxed">{slot.desc}</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}

            {/* Book CTA */}
            <div className="pt-2">
              <Link
                href="/auth/register"
                className="w-full flex items-center justify-center gap-2 py-3.5 text-[15px] font-bold text-background bg-neon rounded-xl hover:bg-neon/90 transition-all shadow-neon-sm hover:shadow-neon-md active:scale-[0.98]"
              >
                Book a Session
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right — copy */}
          <div className="order-1 lg:order-2">
            <Label>1:1 Mentorship</Label>
            <h2 className="font-display font-bold text-foreground leading-tight mb-5" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
              Real feedback from
              <br />
              <span className="text-neon">someone who&apos;s shipped</span>
            </h2>
            <p className="text-[17px] text-foreground/45 leading-relaxed mb-6">
              Skip the generic advice. Get direct, honest feedback on your resume,
              your system design thinking, or your career plan — tailored to where
              you actually are and where you want to go.
            </p>

            <div className="space-y-3">
              {[
                "Resume positioned for senior roles",
                "System design walkthroughs with live feedback",
                "Career strategy for FAANG and product companies",
                "Code review and architecture critique",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-neon/10 border border-neon/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[16px] text-foreground/60">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const { ref, inView } = useInView();

  return (
    <section className="border-t border-border">
      <div ref={ref} className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24">
        {/* Header */}
        <div className={`mb-14 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Label>Testimonials</Label>
          <h2 className="font-display font-bold text-foreground leading-tight" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
            Trusted by engineers in{" "}
            <span className="text-foreground/30">40+ countries</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`group bg-surface border border-border rounded-2xl p-7 flex flex-col hover:bg-surface-raised hover:border-white/10 transition-all duration-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: inView ? `${i * 70}ms` : "0ms" }}
            >
              {/* Large quote mark */}
              <div className="font-display text-5xl leading-none text-neon/10 group-hover:text-neon/20 transition-colors mb-4 select-none">
                &ldquo;
              </div>
              <p className="text-[15px] text-foreground/50 leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                  style={{ backgroundColor: `${t.accent}15`, color: t.accent }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-foreground leading-none mb-1">{t.name}</p>
                  <p className="text-[12px] text-foreground/30">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ────────────────────────────────────────────────────────────────

function CTABanner() {
  const { ref, inView } = useInView();

  return (
    <section className="border-t border-border">
      <div ref={ref} className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
        <div
          className={`relative rounded-2xl overflow-hidden border border-neon/15 bg-surface transition-all duration-700 ${
            inView ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
          }`}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,229,153,0.08) 0%, transparent 65%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 px-8 py-16 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neon/20 bg-neon/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-dot-pulse" />
              <span className="text-[12px] text-neon font-mono">Phase 1 is free on all tracks</span>
            </div>
            <h2
              className="font-display font-bold text-foreground mb-5 leading-tight"
              style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
            >
              Stop watching. Start building.
              <br />
              <span className="text-neon">Your roadmap starts today.</span>
            </h2>
            <p className="text-[17px] text-foreground/40 max-w-[420px] mx-auto mb-10 leading-relaxed">
              Join engineers who chose structured learning over tutorial hopping.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/auth/register"
                className="w-full sm:w-auto px-8 py-3.5 text-[16px] font-bold text-background bg-neon rounded-xl hover:bg-neon/90 transition-all shadow-neon-md hover:shadow-neon-lg active:scale-[0.98] hover:-translate-y-0.5"
              >
                Get Started — It&apos;s Free
              </Link>
              <Link href="/auth/login"
                className="w-full sm:w-auto px-8 py-3.5 text-[14px] font-medium text-foreground/40 hover:text-foreground transition-colors">
                Already have an account →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-neon flex items-center justify-center font-mono font-black text-sm text-background">A</div>
              <span className="font-display font-bold text-[15px] text-foreground">
                Akash Code <span className="text-neon">Official</span>
              </span>
            </div>
            <p className="text-sm text-foreground/30 leading-relaxed max-w-[280px] mb-5">
              Roadmaps, DSA sheet, engineering blogs, and 1:1 mentorship — everything to accelerate your engineering career.
            </p>
            <a href="https://www.instagram.com/akashcodeofficial" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-foreground/25 hover:text-neon transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @akashcodeofficial · 128K+
            </a>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-[11px] font-semibold text-foreground/20 uppercase tracking-[0.12em] mb-4">Learn</h3>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Roadmaps", id: "roadmap" },
                { label: "DSA Sheet", id: "dsa" },
                { label: "Blog", id: "blog" },
                { label: "1:1 Mentorship", id: "mentorship" },
              ].map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)}
                  className="text-left text-sm text-foreground/30 hover:text-foreground transition-colors w-fit">
                  {l.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-semibold text-foreground/20 uppercase tracking-[0.12em] mb-4">Company</h3>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Instagram", href: "https://www.instagram.com/akashcodeofficial", external: true },
              ].map((l) => (
                <Link key={l.label} href={l.href}
                  target={"external" in l ? "_blank" : undefined}
                  rel={"external" in l ? "noopener noreferrer" : undefined}
                  className="text-sm text-foreground/30 hover:text-foreground transition-colors w-fit">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-foreground/20">© {year} Akash Code Official. All rights reserved.</p>
          <p className="text-xs text-foreground/20">Built for engineers serious about leveling up.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <main>
        <Hero />
        <RoadmapSection />
        <DSASection />
        <BlogSection />
        <MentorshipSection />
        <Testimonials />
        <CTABanner />
      </main>
      <LandingFooter />
    </div>
  );
}
