"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import { Card } from "./ui/Card";
import { Bookmark, NotebookPen, Youtube } from "lucide-react";
import { Difficulty, ProblemStatus } from "@prisma/client";
import { getProblemStatus } from "@/lib/stats";
import confetti from "canvas-confetti";
import { LeetCodeIcon } from "./LeetCodeIcon";
import { NotesModal } from "./NotesModal";
import { progressCache, bookmarksCache, notesCache, syncCache } from "@/lib/cache";
import { BatchProcessor } from "@/lib/debounce";

type ProblemWithRelations = {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  gfgUrl: string | null;
  sourcePlatform: string;
  leetcodeUrl: string | null;
  topic: {
    id: string;
    name: string;
    slug: string;
  } | null;
  subtopic?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  companyTags?: {
    company: {
      id: string;
      name: string;
      slug: string;
      logo: string;
    };
  }[];
  progress:
  | false
  | {
    status: ProblemStatus;
  }[];
};

export function ProblemTable({
  problems,
  isAuthenticated,
  highlightedProblemId,
}: {
  problems: ProblemWithRelations[];
  userId?: string;
  isAuthenticated?: boolean;
  highlightedProblemId?: string | null;
}) {
  const router = useRouter();

  // Local state for optimistic updates
  const [localProgress, setLocalProgress] = useState<Record<string, ProblemStatus>>({});

  // State for success animation (pulsing green background)
  const [successAnimationId, setSuccessAnimationId] = useState<string | null>(null);

  // State for bookmarks (saved problems)
  const [savedProblems, setSavedProblems] = useState<Record<string, boolean>>({});


  // State for notes
  const [problemNotes, setProblemNotes] = useState<Record<string, string>>({});
  const [notesModalState, setNotesModalState] = useState<{
    isOpen: boolean;
    problemId: string | null;
    problemTitle: string;
  }>({
    isOpen: false,
    problemId: null,
    problemTitle: "",
  });

  // Batch processor for progress updates
  const progressBatchRef = useRef<BatchProcessor<ProblemStatus> | null>(null);

  // Initialize batch processor
  if (!progressBatchRef.current && typeof window !== "undefined") {
    progressBatchRef.current = new BatchProcessor<ProblemStatus>(
      async (batch) => {
        // Convert batch to array for API call
        const updates = Array.from(batch.entries()).map(([problemId, status]) => ({
          problemId,
          status,
        }));

        // Send batch update to API
        try {
          const res = await fetch("/api/progress/batch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates), // Send array directly, not wrapped in object
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error("Batch update failed:", errorData);

            // If the API indicates we should sign out (user not found), do it
            if (errorData.signOut) {
              console.log("User account not found, signing out...");
              await signOut({ callbackUrl: window.location.origin + "/sheet" });
              return; // Don't throw error, user is being redirected
            }

            throw new Error(`Failed to update progress batch: ${errorData.error || res.statusText}`);
          }

          // Update sync timestamp
          syncCache.setLastSync();

          // Refresh in background (no transition needed - batched updates are fast!)
          router.refresh();
        } catch (error) {
          console.error("Batch update error:", error);
          throw error;
        }
      },
      2000 // 2 second debounce
    );
  }

  // Load cached data on mount (Aggressive Caching) - Only run once
  useEffect(() => {
    // Initialize bookmarks and notes from server-rendered problem data
    const initialBookmarks: Record<string, boolean> = {};
    const initialNotes: Record<string, string> = {};

    problems.forEach((problem: any) => {
      // Check if problem has bookmark/note data from server
      if (problem._isStarred) {
        initialBookmarks[problem.id] = true;
      }
      if (problem._hasNote) {
        initialNotes[problem.id] = ""; // Placeholder, will be loaded from API/cache
      }
    });

    // Load progress from cache
    const cachedProgress = progressCache.get();
    if (cachedProgress) {
      setLocalProgress(cachedProgress);
    }

    // Load bookmarks: Priority = cache > server data > API fetch
    const cachedBookmarks = bookmarksCache.get();
    if (cachedBookmarks && Object.keys(cachedBookmarks).length > 0) {
      setSavedProblems(cachedBookmarks);
    } else if (Object.keys(initialBookmarks).length > 0) {
      // Use server data if available
      setSavedProblems(initialBookmarks);
      bookmarksCache.set(initialBookmarks);
    } else if (isAuthenticated) {
      // Only fetch from API if we have no cached or server data
      fetch("/api/bookmarks")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.bookmarks) {
            setSavedProblems(data.bookmarks);
            bookmarksCache.set(data.bookmarks);
          }
        })
        .catch(err => console.error("❌ Failed to fetch bookmarks:", err));
    }

    // Load notes: Priority = cache > API fetch (always fetch to get actual content)
    const cachedNotes = notesCache.get();
    if (cachedNotes && Object.keys(cachedNotes).length > 0) {
      setProblemNotes(cachedNotes);
    } else if (Object.keys(initialNotes).length > 0) {
      // Use server data if available (though notes content needs API)
      setProblemNotes(initialNotes);
      // Still fetch actual content from API
      if (isAuthenticated) {
        fetch("/api/notes")
          .then(res => res.json())
          .then(data => {
            if (data.success && data.notes) {
              setProblemNotes(data.notes);
              notesCache.set(data.notes);
            }
          })
          .catch(err => console.error("❌ Failed to fetch notes:", err));
      }
    } else if (isAuthenticated) {
      // Only fetch from API if we have no cached data
      fetch("/api/notes")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.notes) {
            setProblemNotes(data.notes);
            notesCache.set(data.notes);
          }
        })
        .catch(err => console.error("❌ Failed to fetch notes:", err));
    }

    // Flush pending updates on page unload
    const handleBeforeUnload = () => {
      if (progressBatchRef.current) {
        // Use navigator.sendBeacon for reliable delivery
        const batch = progressBatchRef.current;
        if (batch.size > 0) {
          batch.forceFlush();
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); // Remove dependencies to prevent re-running

  // Sync cache to localStorage whenever state changes
  useEffect(() => {
    progressCache.set(localProgress);
  }, [localProgress]);

  useEffect(() => {
    bookmarksCache.set(savedProblems);
  }, [savedProblems]);

  useEffect(() => {
    notesCache.set(problemNotes);
  }, [problemNotes]);

  // Confetti celebration function
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#60a5fa', '#ffffff'], // Blue, Light Blue, White
    });
  };

  // Toggle bookmark
  const toggleBookmark = (problemId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // Optimistically update UI
    const newValue = !savedProblems[problemId];
    setSavedProblems(prev => ({
      ...prev,
      [problemId]: newValue
    }));

    // Update cache immediately
    bookmarksCache.toggle(problemId);

    // Save to backend (fire and forget - optimistic UI already updated)
    fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId, isBookmarked: newValue }),
    })
      .then(res => res.json())
      .then(data => console.log("✅ Bookmark saved to backend:", data))
      .catch(err => console.error("❌ Failed to save bookmark:", err));
  };

  // Open notes modal
  const openNotesModal = (problemId: string, problemTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const existingNote = problemNotes[problemId] || "";
    console.log("📝 Opening notes modal for:", problemId, "Existing note:", existingNote);

    setNotesModalState({
      isOpen: true,
      problemId,
      problemTitle,
    });
  };

  // Close notes modal
  const closeNotesModal = () => {
    setNotesModalState({
      isOpen: false,
      problemId: null,
      problemTitle: "",
    });
  };

  // Save note
  const saveNote = (note: string) => {
    if (notesModalState.problemId) {
      console.log("💾 Saving note for problem:", notesModalState.problemId, "Note:", note);

      setProblemNotes(prev => ({
        ...prev,
        [notesModalState.problemId!]: note,
      }));

      // Update cache immediately
      notesCache.update(notesModalState.problemId, note);

      // Save to backend (fire and forget - optimistic UI already updated)
      fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: notesModalState.problemId,
          notes: note
        }),
      })
        .then(res => res.json())
        .then(data => console.log("✅ Note saved to backend:", data))
        .catch(err => console.error("❌ Failed to save note:", err));

      // Close modal after saving
      closeNotesModal();
    }
  };

  // Batched update progress (10x fewer API calls!)
  const updateProgress = async (
    problemId: string,
    newStatus: "SOLVED" | "IN_PROGRESS" | "NOT_STARTED",
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    // Trigger confetti when marking as SOLVED
    if (newStatus === "SOLVED") {
      triggerConfetti();
      setSuccessAnimationId(problemId);
      // Remove success animation after 1 second
      setTimeout(() => {
        setSuccessAnimationId(null);
      }, 1000);
    }

    // Optimistically update the UI immediately
    setLocalProgress(prev => ({ ...prev, [problemId]: newStatus }));

    // Update cache immediately
    progressCache.update(problemId, newStatus);

    // Add to batch processor (will auto-flush after 2s of inactivity)
    if (progressBatchRef.current) {
      progressBatchRef.current.add(problemId, newStatus);
    }

    // Note: No direct API call here! Batch processor handles it.
    // This reduces API calls by ~10x by waiting for user to finish clicking
  };


  if (problems.length === 0) {
    return (
      <Card variant="default" className="border-border/50">
        <div className="p-16 text-center">
          <div className="text-foreground/40 text-6xl mb-6">📝</div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            No problems found
          </h3>
          <p className="text-lg text-foreground/60">
            Try adjusting your filters or search query
          </p>
        </div>
      </Card>
    );
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "text-blue-500 border-blue-500/30";
      case "MEDIUM":
        return "text-orange-500 border-orange-500/30";
      case "HARD":
        return "text-red-500 border-red-500/30";
      default:
        return "text-foreground/60 border-border/30";
    }
  };

  const getDifficultyLabel = (difficulty: Difficulty) => {
    return difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
  };

  return (
    <Card variant="default" className="border-border/50">
      <div className="divide-y divide-white/5">
        {problems.map((problem) => {
          // Use local optimistic state if available, otherwise use server state
          const serverStatus = getProblemStatus(problem.progress);
          const currentStatus = localProgress[problem.id] || serverStatus;
          const isChecked = currentStatus === "SOLVED";
          const isHighlighted = highlightedProblemId === problem.id;
          const isSuccessAnimating = successAnimationId === problem.id;

          return (
            <div
              key={problem.id}
              id={`problem-${problem.id}`}
              className={`group grid grid-cols-12 gap-4 p-4 transition-all hover:bg-white/5 border-b border-white/5 last:border-b-0 ${isHighlighted
                ? "animate-pulse bg-gradient-to-r from-neon/20 via-neon/10 to-transparent ring-2 ring-neon/50 shadow-lg shadow-neon/20"
                : ""
                } ${isSuccessAnimating
                  ? "bg-emerald-500/10 animate-pulse"
                  : ""
                }`}
            >
              {/* Column 1: Checkbox + Title + Companies (Span 6) */}
              <div className="col-span-12 md:col-span-6">
                <div className="flex items-center gap-3">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      if (!isAuthenticated) {
                        router.push("/auth/login");
                        return;
                      }
                      const newStatus = e.target.checked ? "SOLVED" : "NOT_STARTED";
                      updateProgress(problem.id, newStatus, e as any);
                    }}
                    className="h-5 w-5 flex-shrink-0 rounded border-border text-neon focus:ring-neon cursor-pointer bg-card"
                    title={
                      !isAuthenticated
                        ? "Login to track progress"
                        : isChecked
                          ? "Mark as Not Started"
                          : "Mark as Solved"
                    }
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* Title */}
                  <div className="font-medium text-sm md:text-base text-foreground truncate flex-shrink min-w-0">
                    {problem.title}
                  </div>
                </div>

                {/* Companies */}
                {problem.companyTags && problem.companyTags.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    {problem.companyTags.slice(0, 4).map((tag) => (
                      <div
                        key={tag.company.id}
                        className="group/tag flex items-center gap-1.5 bg-gradient-to-r from-muted/40 to-muted/20 hover:from-muted/60 hover:to-muted/40 border border-border/50 rounded-full px-2.5 py-1 transition-all duration-200 hover:scale-105 hover:shadow-sm"
                        title={tag.company.name}
                      >
                        <div className="w-4 h-4 rounded-full bg-background/50 flex items-center justify-center p-0.5">
                          {tag.company.logo && tag.company.logo.trim() !== '' ? (
                            <img
                              src={tag.company.logo}
                              alt={tag.company.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <span className="text-[8px] font-bold text-foreground/50">
                              {tag.company.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-medium text-foreground/70 group-hover/tag:text-foreground transition-colors">
                          {tag.company.name}
                        </span>
                      </div>
                    ))}
                    {problem.companyTags.length > 4 && (
                      <div className="flex items-center justify-center bg-muted/30 border border-border/50 rounded-full px-2 py-1">
                        <span className="text-[11px] font-medium text-muted-foreground">
                          +{problem.companyTags.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Column 2: Difficulty Badge (Span 2) */}
              <div className="hidden md:flex col-span-2 items-center">
                <span className={`px-3 py-1 text-sm font-medium border rounded-md ${getDifficultyColor(problem.difficulty)}`}>
                  {getDifficultyLabel(problem.difficulty)}
                </span>
              </div>

              {/* Column 3: Resources, Notes & Bookmark (Span 2) */}
              <div className="col-span-12 md:col-span-2 flex items-center justify-between md:justify-start gap-3">
                {/* Mobile: Difficulty + All four icons in single row */}
                <div className="flex md:hidden items-center gap-3">
                  <span className={`px-2 py-1 text-xs font-medium border rounded ${getDifficultyColor(problem.difficulty)}`}>
                    {getDifficultyLabel(problem.difficulty)}
                  </span>

                  {problem.gfgUrl ? (
                    <a
                      href={problem.gfgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 transition-colors rounded-md hover:bg-white/5 text-blue-600 hover:text-blue-500"
                      title="Practice on GeeksForGeeks"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/GeeksForGeeks_logo.png/1280px-GeeksForGeeks_logo.png"
                        alt="GeeksForGeeks"
                        className="h-5 w-5 object-contain"
                      />
                    </a>
                  ) : (
                    <span className="p-2 cursor-not-allowed opacity-30 select-none grayscale" title="GeeksForGeeks Link Unavailable">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/GeeksForGeeks_logo.png/1280px-GeeksForGeeks_logo.png"
                        alt="GeeksForGeeks"
                        className="h-5 w-5 object-contain"
                      />
                    </span>
                  )}

                  {/* YouTube Icon - Muted for future use */}
                  <span className="p-2 cursor-not-allowed opacity-30 select-none" title="Video Tutorial Coming Soon">
                    <Youtube className="h-5 w-5 text-red-600" />
                  </span>

                  <button
                    className={`p-2 transition-colors rounded-md hover:bg-white/5 ${problemNotes[problem.id]
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-foreground/40 hover:text-foreground"
                      }`}
                    title={problemNotes[problem.id] ? "Edit Notes" : "Add Notes"}
                    onClick={(e) => openNotesModal(problem.id, problem.title, e)}
                  >
                    <NotebookPen className="h-5 w-5" />
                  </button>

                  {problem.leetcodeUrl ? (
                    <a
                      href={problem.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-orange-700 hover:text-orange-600 transition-colors rounded-md hover:bg-white/5"
                      title="Practice on LeetCode"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LeetCodeIcon className="h-5 w-5" />
                    </a>
                  ) : (
                    <span className="p-2 text-foreground/20 cursor-not-allowed select-none" title="LeetCode Link Unavailable">
                      <LeetCodeIcon className="h-5 w-5 opacity-30 grayscale" />
                    </span>
                  )}

                  <button
                    className={`p-2 transition-colors rounded-md hover:bg-white/5 ${savedProblems[problem.id]
                      ? "text-yellow-500 hover:text-yellow-400"
                      : "text-foreground/40 hover:text-foreground"
                      }`}
                    title={savedProblems[problem.id] ? "Saved for Revision" : "Save for Revision"}
                    onClick={(e) => toggleBookmark(problem.id, e)}
                  >
                    <Bookmark
                      className={`h-5 w-5 ${savedProblems[problem.id] ? "fill-yellow-500" : ""}`}
                    />
                  </button>
                </div>

                {/* Desktop: GFG, Notes, Bookmark only */}
                <div className="hidden md:flex items-center gap-3">
                  {problem.gfgUrl ? (
                    <a
                      href={problem.gfgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 transition-colors rounded-md hover:bg-white/5 text-blue-600 hover:text-blue-500"
                      title="Practice on GeeksForGeeks"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/GeeksForGeeks_logo.png/1280px-GeeksForGeeks_logo.png"
                        alt="GeeksForGeeks"
                        className="h-5 w-5 object-contain"
                      />
                    </a>
                  ) : (
                    <span className="p-2 cursor-not-allowed opacity-30 select-none grayscale" title="GeeksForGeeks Link Unavailable">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/GeeksForGeeks_logo.png/1280px-GeeksForGeeks_logo.png"
                        alt="GeeksForGeeks"
                        className="h-5 w-5 object-contain"
                      />
                    </span>
                  )}

                  {/* YouTube Icon - Muted for future use */}
                  <span className="p-2 cursor-not-allowed opacity-30 select-none" title="Video Tutorial Coming Soon">
                    <Youtube className="h-5 w-5 text-red-600" />
                  </span>

                  <button
                    className={`p-2 transition-colors rounded-md hover:bg-white/5 ${problemNotes[problem.id]
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-foreground/40 hover:text-foreground"
                      }`}
                    title={problemNotes[problem.id] ? "Edit Notes" : "Add Notes"}
                    onClick={(e) => openNotesModal(problem.id, problem.title, e)}
                  >
                    <NotebookPen className="h-5 w-5" />
                  </button>

                  {problem.leetcodeUrl ? (
                    <a
                      href={problem.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-orange-700 hover:text-orange-600 transition-colors rounded-md hover:bg-white/5"
                      title="Practice on LeetCode"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LeetCodeIcon className="h-5 w-5" />
                    </a>
                  ) : (
                    <span className="p-2 text-foreground/20 cursor-not-allowed select-none" title="LeetCode Link Unavailable">
                      <LeetCodeIcon className="h-5 w-5 opacity-30 grayscale" />
                    </span>
                  )}
                </div>
              </div>

              {/* Column 4: Bookmark Button (Desktop only) */}
              <div className="hidden md:flex col-span-2 items-center justify-end">
                <button
                  className={`p-2 transition-colors rounded-md hover:bg-white/5 ${savedProblems[problem.id]
                    ? "text-yellow-500 hover:text-yellow-400"
                    : "text-foreground/40 hover:text-foreground"
                    }`}
                  title={savedProblems[problem.id] ? "Saved for Revision" : "Save for Revision"}
                  onClick={(e) => toggleBookmark(problem.id, e)}
                >
                  <Bookmark
                    className={`h-5 w-5 ${savedProblems[problem.id] ? "fill-yellow-500" : ""}`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notes Modal */}
      <NotesModal
        isOpen={notesModalState.isOpen}
        onClose={closeNotesModal}
        problemTitle={notesModalState.problemTitle}
        currentNote={notesModalState.problemId ? (problemNotes[notesModalState.problemId] || "") : ""}
        onSave={saveNote}
      />
    </Card>
  );
}
