"use client";

import { useState } from "react";
import { FilterBar } from "./FilterBar";
import { AccordionTableWrapper } from "./AccordionTableWrapper";
import { Topic } from "./AccordionTable";
import { StatsWrapper } from "./sheet/StatsWrapper";
import { Problem } from "./AccordionTable";

interface SheetStats {
  totalSolved: number;
  totalProblems: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  problems: Problem[];
}

interface SheetPageClientProps {
  topics: Topic[];
  blind75Topics: Topic[];
  blindSheetDescription?: string;
  isAuthenticated: boolean;
  userName?: string;
  loginStreak: number;
  patternStats: SheetStats;
  blind75Stats: SheetStats;
}

type SheetTab = "pattern" | "blind75";

export function SheetPageClient({
  topics,
  blind75Topics,
  blindSheetDescription,
  isAuthenticated,
  userName,
  loginStreak,
  patternStats,
  blind75Stats
}: SheetPageClientProps) {
  const [activeTab, setActiveTab] = useState<SheetTab>("pattern");
  const [expandedSubtopics, setExpandedSubtopics] = useState<Set<string>>(new Set());
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [highlightedProblemId, setHighlightedProblemId] = useState<string | null>(null);

  // Get current topics based on active tab
  const currentTopics = activeTab === "pattern" ? topics : blind75Topics;

  const handleSearchResultClick = (result: any) => {
    // Expand the subtopic when a search result is clicked
    const newExpandedSubtopics = new Set(expandedSubtopics);

    // Find the topic and subtopic IDs
    const topic = currentTopics.find((t) => t.title === result.topicName);
    if (topic && result.subtopicName) {
      const subtopic = topic.subtopics.find((s) => s.title === result.subtopicName);
      if (subtopic) {
        newExpandedSubtopics.add(subtopic.id);
      }
    }

    setExpandedSubtopics(newExpandedSubtopics);

    // Set highlighted problem
    setHighlightedProblemId(result.id);

    // Remove highlight after animation completes
    setTimeout(() => {
      setHighlightedProblemId(null);
    }, 3000);
  };


  const handleTabChange = (tab: SheetTab) => {
    setActiveTab(tab);

    // Reset expanded subtopics for both tabs - don't auto-expand
    setExpandedSubtopics(new Set());

    // Reset filters when switching tabs
    setSelectedTopics([]);
    setSelectedDifficulties([]);
    setSelectedCompanies([]);
    setHighlightedProblemId(null);
  };

  return (
    <>
      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-background p-1 rounded-xl border border-border/50 shadow-sm">
          <div className="grid grid-cols-2 gap-1.5">

            {/* Pattern-Wise Button */}
            <button
              onClick={() => handleTabChange("pattern")}
              className={`px-6 py-5 font-bold text-lg transition-all duration-200 rounded-lg relative ${activeTab === "pattern"
                ? "bg-emerald-100 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-400 border-2 border-emerald-300 dark:border-emerald-800/50 shadow-sm"
                : "text-muted hover:bg-accent hover:text-foreground"
                } `}
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Pattern-Wise
              </span>
              {activeTab === "pattern" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-150" />
              )}
            </button>

            {/* Blind 100 Button */}
            <button
              onClick={() => handleTabChange("blind75")}
              className={`px-6 py-5 font-bold text-lg transition-all duration-200 rounded-lg relative ${activeTab === "blind75"
                ? "bg-blue-100 text-blue-950 dark:bg-blue-950/30 dark:text-blue-400 border-2 border-blue-300 dark:border-blue-800/50 shadow-sm"
                : "text-muted hover:bg-accent hover:text-foreground"
                } `}
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Last Minute 100
              </span>
              {activeTab === "blind75" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-150" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Statistics - Only for logged in users */}
      {isAuthenticated && (
        <div className="mb-12">
          <div className="max-w-6xl mx-auto">
            <StatsWrapper
              initialTotalSolved={activeTab === "pattern" ? patternStats.totalSolved : blind75Stats.totalSolved}
              initialTotalProblems={activeTab === "pattern" ? patternStats.totalProblems : blind75Stats.totalProblems}
              initialEasySolved={activeTab === "pattern" ? patternStats.easySolved : blind75Stats.easySolved}
              initialEasyTotal={activeTab === "pattern" ? patternStats.easyTotal : blind75Stats.easyTotal}
              initialMediumSolved={activeTab === "pattern" ? patternStats.mediumSolved : blind75Stats.mediumSolved}
              initialMediumTotal={activeTab === "pattern" ? patternStats.mediumTotal : blind75Stats.mediumTotal}
              initialHardSolved={activeTab === "pattern" ? patternStats.hardSolved : blind75Stats.hardSolved}
              initialHardTotal={activeTab === "pattern" ? patternStats.hardTotal : blind75Stats.hardTotal}
              userName={userName}
              problems={activeTab === "pattern" ? patternStats.problems : blind75Stats.problems}
              loginStreak={loginStreak}
            />
          </div>
        </div>
      )}

      {/* Content with smooth transition */}
      <div
        key={activeTab}
        className="animate-in fade-in duration-200"
      >
        {/* Filter Bar */}
        <FilterBar
          topics={currentTopics}
          selectedTopics={selectedTopics}
          onTopicChange={setSelectedTopics}
          selectedDifficulties={selectedDifficulties}
          onDifficultyChange={setSelectedDifficulties}
          selectedCompanies={selectedCompanies}
          onCompanyChange={setSelectedCompanies}
          onSearchResultClick={handleSearchResultClick}
        />

        {/* Sheet Headings */}
        {activeTab === "pattern" && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Topics</h1>
            <p className="text-muted-foreground mt-1">Master data structures and algorithms topic by topic</p>
          </div>
        )}

        {activeTab === "blind75" && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Last Minute 100</h1>
            {blindSheetDescription && (
              <p className="text-muted-foreground mt-1">{blindSheetDescription}</p>
            )}
          </div>
        )}

        {/* Main Accordion Table */}
        <AccordionTableWrapper
          topics={currentTopics}
          isAuthenticated={isAuthenticated}
          expandedSubtopics={expandedSubtopics}
          setExpandedSubtopics={setExpandedSubtopics}
          selectedTopics={selectedTopics}
          selectedDifficulties={selectedDifficulties}
          selectedCompanies={selectedCompanies}
          highlightedProblemId={highlightedProblemId}
          showTopicHeadings={activeTab === "pattern"}
        />
      </div>
    </>
  );
}
