"use client";

import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ProblemTable } from "./ProblemTable";
import { PreviewPanel } from "./PreviewPanel";

export function DsaDashboardLayout() {

  // Keyword shortcut for search focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[520px] w-[860px] pointer-events-none opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(0,229,153,0.14) 0%, rgba(0,229,153,0.05) 42%, transparent 72%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <header className="mb-4 flex flex-col gap-4 rounded-3xl border border-border bg-surface/90 px-5 py-5 shadow-neon-sm backdrop-blur-xl sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neon text-background shadow-neon-md">
              <span className="font-mono text-lg font-black">A</span>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-neon">
                  DSA Sheet
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-foreground/20 sm:inline-block" />
                <span className="hidden text-[12px] text-foreground/40 sm:inline">Structured practice for interviews</span>
              </div>
              <h1 className="font-display text-[28px] font-bold leading-tight text-foreground sm:text-[34px]">
                Solve faster with a <span className="text-neon">focused, searchable sheet</span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-auto">
            {[
              { value: "100+", label: "Problems" },
              { value: "15+", label: "Topics" },
              { value: "4", label: "Difficulty tiers" },
              { value: "Live", label: "Progress save" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-background/60 px-4 py-3 text-left">
                <div className="font-mono text-[22px] font-bold text-neon">{stat.value}</div>
                <div className="text-[12px] text-foreground/35">{stat.label}</div>
              </div>
            ))}
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="relative min-h-[calc(100vh-220px)] min-w-0 overflow-hidden rounded-3xl border border-border bg-surface/90 shadow-neon-sm backdrop-blur-xl">
            <TopBar />
            <div className="relative min-h-0 flex-1">
              <ProblemTable />
              <PreviewPanel />
            </div>
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
