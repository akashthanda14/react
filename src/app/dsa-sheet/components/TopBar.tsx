"use client";

import { useState, useEffect } from "react";
import { useDsaSheet } from "../context/DsaSheetContext";
import { Search, Filter, Maximize2, Minimize2, X } from "lucide-react";
import { Difficulty } from "../data/mockData";
import clsx from "clsx";

const ALL_TOPICS = [
  "Array", "Hash Table", "Linked List", "Math", "String", "Sliding Window", 
  "Binary Search", "Divide and Conquer", "Dynamic Programming", "Recursion", 
  "Two Pointers", "Trie", "Sorting", "Backtracking", "Heap (Priority Queue)", 
  "Merge Sort", "Graph", "Tree", "Stack", "Queue", "Matrix"
];

export function TopBar() {
  const { 
    searchQuery, setSearchQuery, 
    filters, setFilters, removeTopicFilter,
    focusMode, setFocusMode,
    filteredProblems
  } = useDsaSheet();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  const handleDifficultyChange = (diff: Difficulty | "All") => {
    setFilters(prev => ({ ...prev, difficulty: diff }));
  };

  const handleTopicToggle = (topic: string) => {
    setFilters(prev => {
      const isSelected = prev.topics.includes(topic);
      if (isSelected) {
        return { ...prev, topics: prev.topics.filter(t => t !== topic) };
      } else {
        return { ...prev, topics: [...prev.topics, topic] };
      }
    });
  };

  return (
    <div className="w-full shrink-0 border-b border-border bg-background/70 p-4 backdrop-blur-xl sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
          <input
            type="text"
            placeholder="Search problems by name or ID (Cmd+K)"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="h-12 w-full rounded-2xl border border-border bg-surface pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground/20 focus:border-neon/40 focus:ring-2 focus:ring-neon/10"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 xl:justify-end">
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={clsx(
                "flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm transition-colors",
                filters.difficulty !== "All" || filters.topics.length > 0
                  ? "border-neon/30 bg-neon/10 text-neon"
                  : "border-border bg-surface text-foreground/65 hover:bg-surface-raised hover:text-foreground"
              )}
            >
              <Filter className="w-4 h-4" />
              Filters
              {(filters.topics.length > 0 || filters.difficulty !== "All") && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-neon text-[11px] font-bold text-background">
                  {filters.topics.length + (filters.difficulty !== "All" ? 1 : 0)}
                </span>
              )}
            </button>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-border bg-surface p-4 shadow-neon-lg">
                <div className="mb-4">
                  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/30">Difficulty</h4>
                  <div className="flex gap-2">
                    {["All", "Easy", "Medium", "Hard"].map((d) => (
                      <button
                        key={d}
                        onClick={() => handleDifficultyChange(d as Difficulty | "All")}
                        className={clsx(
                          "rounded-full border px-3 py-1 text-xs transition-colors",
                          filters.difficulty === d
                            ? d === "Easy" ? "border-green-500/30 bg-green-500/10 text-green-400"
                            : d === "Medium" ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                            : d === "Hard" ? "border-red-500/30 bg-red-500/10 text-red-400"
                            : "border-border bg-surface-raised text-foreground"
                            : "border-transparent bg-background/30 text-foreground/45 hover:border-border hover:bg-surface-raised"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/30">Topics</h4>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                    {ALL_TOPICS.map((t) => (
                      <button
                        key={t}
                        onClick={() => handleTopicToggle(t)}
                        className={clsx(
                          "rounded-md border px-2 py-1 text-xs transition-colors",
                          filters.topics.includes(t)
                            ? "border-neon/40 bg-neon/10 text-neon"
                            : "border-border bg-background/30 text-foreground/45 hover:bg-surface-raised hover:text-foreground"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setFocusMode(!focusMode)}
            className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground/65 transition-colors hover:bg-surface-raised hover:text-foreground"
            title="Toggle Focus Mode"
          >
            {focusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            {focusMode ? "Exit Focus" : "Focus Mode"}
          </button>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(filters.difficulty !== "All" || filters.topics.length > 0) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="mr-1 text-xs text-foreground/30">Active:</span>
          
          {filters.difficulty !== "All" && (
            <div className="flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-xs text-foreground/65">
              Diff: {filters.difficulty}
              <button onClick={() => setFilters(prev => ({ ...prev, difficulty: "All" }))} className="ml-1 hover:text-foreground">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {filters.topics.map(t => (
            <div key={t} className="flex items-center gap-1 rounded-md border border-neon/20 bg-neon/10 px-2 py-1 text-xs text-neon">
              {t}
              <button onClick={() => removeTopicFilter(t)} className="ml-1 hover:text-foreground">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          <div className="ml-auto text-xs text-foreground/35">
            Showing {filteredProblems.length} problems
          </div>
        </div>
      )}
    </div>
  );
}
