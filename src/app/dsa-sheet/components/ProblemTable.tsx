"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useDsaSheet } from "../context/DsaSheetContext";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import clsx from "clsx";

export function ProblemTable() {
  const { filteredProblems, toggleProblemStatus, selectedProblem, setSelectedProblem } = useDsaSheet();
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredProblems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-transparent">
      {/* Table Header */}
      <div className="flex w-full shrink-0 items-center border-b border-border bg-background/55 px-4 py-3 pr-[calc(1rem+8px)] text-xs font-semibold tracking-[0.16em] text-foreground/35 backdrop-blur-xl">
        <div className="w-[50px] shrink-0 flex justify-center text-center">Status</div>
        <div className="flex-1">Problem</div>
        <div className="w-[100px] shrink-0">Difficulty</div>
        <div className="w-[100px] shrink-0 text-left">Frequency</div>
        <div className="w-[40px] shrink-0"></div>
      </div>

      {/* Virtualized List Container */}
      <div 
        ref={parentRef} 
        className="relative min-h-0 flex-1 w-full overflow-auto custom-scrollbar bg-surface/40"
      >
        {filteredProblems.length === 0 ? (
          <div className="pointer-events-none absolute inset-0 flex h-full w-full flex-col items-center justify-center text-foreground/35">
            <p className="rounded-full border border-border bg-background/60 px-4 py-2 text-sm">
              No problems found matching your filters.
            </p>
          </div>
        ) : (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const problem = filteredProblems[virtualRow.index];
              const isSelected = selectedProblem?.id === problem.id;

              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className={clsx(
                    "group flex cursor-pointer items-center border-b border-border/70 px-4 transition-colors",
                    isSelected ? "bg-neon/8" : "hover:bg-surface-raised"
                  )}
                  onClick={() => setSelectedProblem(problem)}
                >
                  <div className="w-[50px] shrink-0 flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleProblemStatus(problem.id);
                      }}
                      className={clsx(
                        "flex h-6 w-6 items-center justify-center rounded-full transition-colors",
                        problem.isSolved
                          ? "bg-neon/12 text-neon hover:bg-neon/18"
                          : "shrink-0 bg-background/30 text-foreground/28 hover:bg-foreground/8 hover:text-foreground/65"
                      )}
                      title={problem.isSolved ? "Mark as unsolved" : "Mark as solved"}
                    >
                      {problem.isSolved ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="flex-1 min-w-0 pr-4">
                    <div className="truncate text-sm font-medium text-foreground/78 transition-colors group-hover:text-neon">
                      {problem.title}
                    </div>
                  </div>

                  <div className="w-[100px] shrink-0">
                    <span
                      className={clsx(
                        "rounded-md border px-2 py-1 text-xs font-medium",
                        problem.difficulty === "Easy" && "border-green-500/20 bg-green-500/10 text-green-400",
                        problem.difficulty === "Medium" && "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
                        problem.difficulty === "Hard" && "border-red-500/20 bg-red-500/10 text-red-400"
                      )}
                    >
                      {problem.difficulty}
                    </span>
                  </div>

                  <div className="w-[100px] shrink-0 flex items-center gap-1">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((bar) => (
                        <div
                          key={bar}
                          className={clsx(
                            "h-3 w-1.5 rounded-sm",
                            bar <= Math.ceil((problem.frequency / 100) * 5)
                              ? "bg-neon"
                              : "bg-foreground/8"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="w-[40px] shrink-0 flex justify-end text-foreground/22 group-hover:text-foreground/55">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
