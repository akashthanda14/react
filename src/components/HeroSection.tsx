"use client";

import Link from "next/link";

// ─── Component ────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-28 pb-20 overflow-hidden">
      {/* Grid + glow */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[700px] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,229,153,0.08) 0%, rgba(0,229,153,0.15) 50%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto w-full">
        <div className="max-w-[700px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon/30 bg-neon/8 mb-8">
            <span className="w-2 h-2 rounded-full bg-neon animate-dot-pulse" />
            <span className="text-[13px] text-neon font-mono font-medium uppercase tracking-wider">
              Trusted by 128K+ Engineers
            </span>
          </div>

          <h1
            className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.02em]"
            style={{ fontSize: "clamp(38px, 6.5vw, 68px)" }}
          >
            Structured Roadmaps
            <br />
            for{" "}
            <span className="text-neon">Engineers Who Ship</span>
          </h1>

          <p className="text-base text-foreground/50 leading-relaxed max-w-[540px] mt-6 mb-10">
            Phase-based learning tracks in Backend, System Design, DevOps, and GenAI — built from
            20 years of production experience. No fluff. Just what gets you hired.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/auth/register"
              className="px-8 py-4 text-[15px] font-bold text-background bg-neon rounded-xl hover:bg-neon/90 transition-all shadow-neon-md active:scale-[0.98]"
            >
              Start Your Roadmap →
            </Link>
            <button
              onClick={scrollToTracks}
              className="px-8 py-4 text-[15px] font-semibold text-foreground border border-border rounded-xl hover:border-neon/30 hover:bg-neon/5 transition-all active:scale-[0.98]"
            >
              Explore Tracks
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollToTracks() {
  document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth" });
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default HeroSection;
