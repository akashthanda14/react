"use client";


import { useDsaSheet } from "../context/DsaSheetContext";
import { X, ExternalLink, Play, CheckCircle2, BookmarkPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export function PreviewPanel() {
  const { selectedProblem, setSelectedProblem, toggleProblemStatus } = useDsaSheet();

  return (
    <AnimatePresence>
      {selectedProblem && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 bottom-0 z-20 flex w-full max-w-md flex-col border-l border-border bg-surface/95 shadow-neon-lg backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-border p-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={clsx(
                  "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  selectedProblem.difficulty === "Easy" && "border-green-500/20 bg-green-500/10 text-green-400",
                  selectedProblem.difficulty === "Medium" && "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
                  selectedProblem.difficulty === "Hard" && "border-red-500/20 bg-red-500/10 text-red-400"
                )}>
                  {selectedProblem.difficulty}
                </span>
                <span className="text-xs text-foreground/30">ID: {selectedProblem.id}</span>
              </div>
              <h2 className="mt-1 text-lg font-bold leading-tight text-foreground">{selectedProblem.title}</h2>
            </div>
            <button 
              onClick={() => setSelectedProblem(null)}
              className="rounded-lg p-1 text-foreground/30 transition-colors hover:bg-foreground/8 hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar p-6">
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-neon px-4 py-3 text-sm font-bold text-background transition-all hover:bg-neon/90">
                <Play className="w-4 h-4" />
                Solve Now
              </button>
              <button 
                onClick={() => toggleProblemStatus(selectedProblem.id)}
                className={clsx(
                  "flex items-center justify-center rounded-2xl border px-4 py-3 text-sm font-medium transition-colors",
                  selectedProblem.isSolved
                    ? "border-neon/25 bg-neon/10 text-neon hover:bg-neon/15"
                    : "border-border bg-background/40 text-foreground/65 hover:bg-surface-raised hover:text-foreground"
                )}
                title={selectedProblem.isSolved ? "Mark as unsolved" : "Mark as solved"}
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center rounded-2xl border border-border bg-background/40 px-4 py-3 text-foreground/65 transition-colors hover:bg-surface-raised hover:text-foreground">
                <BookmarkPlus className="w-5 h-5" />
              </button>
            </div>

            {/* Topics */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-foreground/30">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProblem.topics.map(topic => (
                  <span key={topic} className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-foreground/65">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Companies */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-foreground/30">Companies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProblem.companies.map(company => (
                  <span key={company} className="rounded-full border border-neon/20 bg-neon/10 px-3 py-1 text-xs text-neon">
                    {company}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background/40 p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground/75">Why is this important?</h3>
              <p className="text-sm leading-relaxed text-foreground/40">
                This problem frequently appears in interviews for {selectedProblem.companies.slice(0, 2).join(" and ")}. 
                It thoroughly tests your understanding of {selectedProblem.topics[0]?.toLowerCase() || "core algorithms"}.
              </p>
            </div>

            <button className="group flex w-full items-center justify-center gap-2 py-3 text-sm text-foreground/40 transition-colors hover:text-neon">
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              View full solution & editorial
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
