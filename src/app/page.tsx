"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, X, ChevronRight } from "lucide-react";

// ─── Static data ──────────────────────────────────────────────────────────────
const TRACKS = [
  { slug: "backend", emoji: "⚙️", name: "Full Stack Engineer", phases: 6, time: "4–6 months", enrolled: "12K+", color: "#3B82F6", desc: "React, Next.js, Node.js, PostgreSQL, Docker" },
  { slug: "devops", emoji: "☁️", name: "DevOps Engineer", phases: 6, time: "5–7 months", enrolled: "8K+", color: "#A855F7", desc: "Linux, Docker, K8s, Terraform, GitOps, AWS" },
  { slug: "system-design", emoji: "🏗️", name: "System Design Specialist", phases: 6, time: "3–4 months", enrolled: "15K+", color: "#F97316", desc: "CAP, sharding, Kafka, CQRS, FAANG interview prep" },
  { slug: "genai", emoji: "✨", name: "Generative AI Engineer", phases: 6, time: "4–5 months", enrolled: "10K+", color: "#00FF7F", desc: "LLMs, RAG, fine-tuning, agents, LangChain" },
];

const PAIN_POINTS = [
  { icon: "😵", title: "YouTube rabbit holes", desc: "You watch tutorial after tutorial but never build anything real. No structure, no direction." },
  { icon: "🗺️", title: "No clear path", desc: "Hundreds of courses, zero sequence. You don't know what to learn next or why it matters." },
  { icon: "💼", title: "Not interview-ready", desc: "You've learned things but can't articulate it in interviews. Senior roles still feel out of reach." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Choose Your Track", desc: "Pick one of 4 engineering tracks built for the specific role you want to land." },
  { step: "02", title: "Follow the Phases", desc: "Work through 6 structured phases — from foundations to production-grade to interview prep." },
  { step: "03", title: "Get Hired", desc: "Complete milestones, build real projects, and walk into interviews with proof of skill." },
];

const TESTIMONIALS = [
  { handle: "@riya_devops", text: "Phase 3 of DevOps alone taught me more than 6 months of random YouTube. Got hired at a Series B startup.", avatar: "R" },
  { handle: "@mk_fullstack", text: "The Full Stack track is insane. The skill tags and milestone format keeps me focused every single day.", avatar: "M" },
  { handle: "@tanvi_ai", text: "I used the GenAI track to go from zero to building RAG pipelines in 8 weeks. The structure is everything.", avatar: "T" },
];

const FREE_FEATURES = [
  "All 4 tracks visible",
  "Phase structure & descriptions",
  "Phase 1 fully unlocked",
  "Progress tracking",
];
const PRO_FEATURES = [
  "Everything in Free",
  "All 6 phases unlocked",
  "All milestone details",
  "AI next-step nudges",
  "Completion certificates",
  "New tracks as released",
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">

      {/* ════════════════════════════════════════════════════
                HERO
            ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated grid */}
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon/5 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/20 bg-neon/5 text-xs font-semibold text-neon mb-8 animate-in fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
            Trusted by 128K+ engineers · @akashcodeofficial
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6 animate-in slide-up">
            Stop{" "}
            <span className="text-muted-foreground line-through decoration-danger/60">
              watching tutorials
            </span>
            <br />
            Start{" "}
            <span className="text-neon">becoming senior</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-in slide-up" style={{ animationDelay: "100ms" }}>
            Structured, phase-based roadmaps in Full Stack, DevOps, System Design, and GenAI — designed for junior engineers who are serious about leveling up in 12 months.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-in slide-up" style={{ animationDelay: "200ms" }}>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-7 py-3.5 btn-neon text-base font-semibold animate-neon-pulse"
            >
              Start Your Roadmap <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#tracks"
              className="inline-flex items-center gap-2 px-7 py-3.5 btn-ghost text-base"
            >
              Explore Tracks <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Social proof numbers */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm animate-in fade-in" style={{ animationDelay: "400ms" }}>
            {[
              { value: "128K+", label: "Instagram followers" },
              { value: "45K+", label: "Enrolled engineers" },
              { value: "40+", label: "Countries" },
              { value: "4", label: "Premium tracks" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-foreground font-display">{s.value}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
                THE PROBLEM
            ════════════════════════════════════════════════════ */}
      <section className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Sound familiar?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Why most junior engineers{" "}
              <span className="text-danger">stay junior</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PAIN_POINTS.map((p) => (
              <div key={p.title} className="p-6 rounded-xl border border-border bg-surface">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-display font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
                TRACKS
            ════════════════════════════════════════════════════ */}
      <section id="tracks" className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              4 tracks
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Pick your path to{" "}
              <span className="text-neon">senior</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRACKS.map((track) => (
              <div
                key={track.slug}
                className="relative p-6 rounded-xl border border-border bg-surface hover:bg-surface-raised hover:-translate-y-1 transition-all group cursor-pointer"
                style={{ borderLeftWidth: "3px", borderLeftColor: track.color }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{track.emoji}</span>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{track.name}</h3>
                      <p className="text-xs text-muted-foreground">{track.enrolled} enrolled</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 font-mono text-xs leading-relaxed">
                  {track.desc}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{track.phases} phases</span>
                  <span>·</span>
                  <span>{track.time}</span>
                </div>
                <Link
                  href="/onboarding"
                  className="absolute bottom-4 right-4 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0"
                  style={{ color: track.color }}
                >
                  Start Track <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
                HOW IT WORKS
            ════════════════════════════════════════════════════ */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Simple process
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              How it works
            </h2>
          </div>
          <div className="relative">
            {/* Connector */}
            <div className="absolute left-8 top-12 bottom-12 w-px bg-border hidden sm:block" />
            <div className="space-y-8">
              {HOW_IT_WORKS.map((step) => (
                <div key={step.step} className="flex items-start gap-6">
                  <div className="relative z-10 w-16 h-16 rounded-xl border border-border bg-surface flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-sm font-bold text-neon">{step.step}</span>
                  </div>
                  <div className="pt-3">
                    <h3 className="font-display font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
                FREE vs PRO
            ════════════════════════════════════════════════════ */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Start free. Upgrade when ready.
            </h2>
            <p className="text-muted-foreground text-sm">No credit card required to start.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Free */}
            <div className="p-6 rounded-xl border border-border bg-surface">
              <h3 className="font-display font-bold text-xl text-foreground mb-1">Free</h3>
              <p className="text-3xl font-bold text-foreground font-display mb-6">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              <div className="space-y-2.5 mb-6">
                {FREE_FEATURES.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                    {f}
                  </div>
                ))}
                {["Phases 2–6", "AI features", "Community"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-disabled">
                    <X className="w-4 h-4 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/onboarding" className="block w-full text-center py-2.5 btn-ghost text-sm font-semibold">
                Start Free
              </Link>
            </div>
            {/* Pro */}
            <div className="relative p-6 rounded-xl border border-neon/30 bg-surface shadow-neon-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-bold text-xl text-foreground">Pro</h3>
                  <span className="px-2 py-0.5 bg-neon/15 text-neon text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Popular
                  </span>
                </div>
                <p className="text-3xl font-bold text-foreground font-display mb-6">
                  $9<span className="text-sm font-normal text-muted-foreground">/mo</span>
                </p>
                <div className="space-y-2.5 mb-6">
                  {PRO_FEATURES.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-neon flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/pricing" className="block w-full text-center py-2.5 btn-neon text-sm font-semibold">
                  Start Pro →
                </Link>
                <p className="text-center text-xs text-muted-foreground mt-3">Cancel anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
                SOCIAL PROOF
            ════════════════════════════════════════════════════ */}
      <section className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">@akashcodeofficial</span> · 128K followers · Engineers in 40+ countries trust this brand
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.handle} className="p-5 rounded-xl border border-border bg-surface">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-neon font-bold text-sm font-display">
                    {t.avatar}
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{t.handle}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
                FINAL CTA
            ════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Your senior engineer journey starts{" "}
            <span className="text-neon">today</span>
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Free to start. No credit card. Just you and a clear path to where you want to be.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 btn-neon text-base font-semibold animate-neon-pulse"
          >
            Choose My Track <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
