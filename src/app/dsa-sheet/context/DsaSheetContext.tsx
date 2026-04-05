"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { Problem, initialProblems, Difficulty } from "../data/mockData";

export interface Filters {
  difficulty: Difficulty | "All";
  topics: string[];
}

export interface DsaSheetContextType {
  problems: Problem[];
  filteredProblems: Problem[];
  selectedCompany: string | "All";
  searchQuery: string;
  filters: Filters;
  focusMode: boolean;
  selectedProblem: Problem | null;
  solvedCount: number;
  
  setProblems: React.Dispatch<React.SetStateAction<Problem[]>>;
  setSelectedCompany: (company: string | "All") => void;
  setSearchQuery: (query: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setFocusMode: (focused: boolean) => void;
  setSelectedProblem: (problem: Problem | null) => void;
  toggleProblemStatus: (id: string) => void;
  removeTopicFilter: (topic: string) => void;
}

const DsaSheetContext = createContext<DsaSheetContextType | undefined>(undefined);

export function DsaSheetProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<Problem[]>(initialProblems);
  const [selectedCompany, setSelectedCompany] = useState<string | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({ difficulty: "All", topics: [] });
  const [focusMode, setFocusMode] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  // Initialize solved states from local storage on mount
  useEffect(() => {
    try {
      const storedSolved = localStorage.getItem("dsa_solved_problems");
      if (storedSolved) {
        const solvedIds = JSON.parse(storedSolved) as string[];
        setProblems((prev) =>
          prev.map((p) => (solvedIds.includes(p.id) ? { ...p, isSolved: true } : p))
        );
      }
    } catch (error) {
      console.error("Failed to load solved state from localStorage", error);
    }
  }, []);

  // Update logic to local storage when solved state changes
  useEffect(() => {
    const solvedIds = problems.filter((p) => p.isSolved).map((p) => p.id);
    localStorage.setItem("dsa_solved_problems", JSON.stringify(solvedIds));
  }, [problems]);

  const toggleProblemStatus = (id: string) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isSolved: !p.isSolved } : p))
    );
  };

  const removeTopicFilter = (topic: string) => {
    setFilters((prev) => ({
      ...prev,
      topics: prev.topics.filter((t) => t !== topic),
    }));
  };

  // Performance Requirement: Memoize the filtered list
  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      // 1. Company Filter
      if (selectedCompany !== "All" && !p.companies.includes(selectedCompany)) {
        return false;
      }
      // 2. Search Query Filter
      if (searchQuery) {
        const queryLower = searchQuery.toLowerCase();
        if (!p.title.toLowerCase().includes(queryLower) && !p.id.includes(queryLower)) {
          return false;
        }
      }
      // 3. Difficulty Filter
      if (filters.difficulty !== "All" && p.difficulty !== filters.difficulty) {
        return false;
      }
      // 4. Topics Filter
      if (filters.topics.length > 0) {
        // Must contain at least one topic, or all topics? Usually "or" or "and". We'll do "and" for precise filtering.
        const hasAllTopics = filters.topics.every(topic => p.topics.includes(topic));
        if (!hasAllTopics) return false;
      }

      return true;
    });
  }, [problems, selectedCompany, searchQuery, filters]);

  const solvedCount = useMemo(() => {
    // If we want total solved overall, we count `problems`. If we want solved in current view, `filteredProblems`
    // The prompt says "Solved X / Total Y" usually meant for the entire set or current company set.
    return filteredProblems.filter(p => p.isSolved).length;
  }, [filteredProblems]);

  return (
    <DsaSheetContext.Provider
      value={{
        problems,
        filteredProblems,
        selectedCompany,
        searchQuery,
        filters,
        focusMode,
        selectedProblem,
        solvedCount,
        setProblems,
        setSelectedCompany,
        setSearchQuery,
        setFilters,
        setFocusMode,
        setSelectedProblem,
        toggleProblemStatus,
        removeTopicFilter
      }}
    >
      {children}
    </DsaSheetContext.Provider>
  );
}

export function useDsaSheet() {
  const context = useContext(DsaSheetContext);
  if (context === undefined) {
    throw new Error("useDsaSheet must be used within a DsaSheetProvider");
  }
  return context;
}
