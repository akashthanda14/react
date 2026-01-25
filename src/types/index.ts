/**
 * Difficulty levels for DSA problems
 */
export type Difficulty = "Easy" | "Medium" | "Hard";

/**
 * Topic categories for problems
 */
export type Topic =
  | "Arrays"
  | "Strings"
  | "LinkedList"
  | "Stack"
  | "Queue"
  | "Trees"
  | "Graphs"
  | "DynamicProgramming"
  | "Greedy"
  | "Backtracking"
  | "Sorting"
  | "Searching"
  | "Hashing"
  | "Math"
  | "BitManipulation";

/**
 * Status of problem completion
 */
export type ProblemStatus = "Not Started" | "In Progress" | "Solved";

/**
 * Problem interface
 */
export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topic: Topic[];
  description: string;
  examples: Example[];
  constraints: string[];
  companies: string[];
  status: ProblemStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Example interface for problem examples
 */
export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

/**
 * User interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

/**
 * User progress tracking
 */
export interface UserProgress {
  userId: string;
  problemId: string;
  status: ProblemStatus;
  solvedAt?: Date;
  notes?: string;
  isBookmarked: boolean;
}

/**
 * Dashboard statistics
 */
export interface DashboardStats {
  totalProblems: number;
  solvedProblems: number;
  inProgressProblems: number;
  easyProblems: number;
  mediumProblems: number;
  hardProblems: number;
  topicStats: Record<Topic, number>;
}
