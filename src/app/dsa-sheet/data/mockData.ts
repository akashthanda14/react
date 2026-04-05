export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  frequency: number; // 0 to 100
  topics: string[];
  companies: string[];
  isSolved: boolean;
}

const realProblems: Problem[] = [
  { id: "1", title: "Two Sum", difficulty: "Easy", frequency: 95, topics: ["Array", "Hash Table"], companies: ["Google", "Amazon", "Apple", "Microsoft"], isSolved: false },
  { id: "2", title: "Add Two Numbers", difficulty: "Medium", frequency: 85, topics: ["Linked List", "Math"], companies: ["Amazon", "Microsoft", "Bloomberg"], isSolved: false },
  { id: "3", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", frequency: 90, topics: ["Hash Table", "String", "Sliding Window"], companies: ["Amazon", "Bloomberg", "Google"], isSolved: false },
  { id: "4", title: "Median of Two Sorted Arrays", difficulty: "Hard", frequency: 70, topics: ["Array", "Binary Search", "Divide and Conquer"], companies: ["Google", "Amazon", "Microsoft"], isSolved: false },
  { id: "5", title: "Longest Palindromic Substring", difficulty: "Medium", frequency: 80, topics: ["String", "Dynamic Programming"], companies: ["Amazon", "Microsoft", "Google", "Facebook"], isSolved: false },
  { id: "6", title: "Zigzag Conversion", difficulty: "Medium", frequency: 30, topics: ["String"], companies: ["Amazon", "Apple"], isSolved: false },
  { id: "7", title: "Reverse Integer", difficulty: "Easy", frequency: 50, topics: ["Math"], companies: ["Bloomberg", "Apple"], isSolved: false },
  { id: "8", title: "String to Integer (atoi)", difficulty: "Medium", frequency: 60, topics: ["String", "Math"], companies: ["Amazon", "Microsoft", "Facebook"], isSolved: false },
  { id: "9", title: "Palindrome Number", difficulty: "Easy", frequency: 65, topics: ["Math"], companies: ["Amazon", "Facebook", "Microsoft"], isSolved: false },
  { id: "10", title: "Regular Expression Matching", difficulty: "Hard", frequency: 45, topics: ["String", "Dynamic Programming", "Recursion"], companies: ["Google", "Facebook"], isSolved: false },
  { id: "11", title: "Container With Most Water", difficulty: "Medium", frequency: 80, topics: ["Array", "Two Pointers"], companies: ["Amazon", "Bloomberg", "Microsoft"], isSolved: false },
  { id: "12", title: "Integer to Roman", difficulty: "Medium", frequency: 40, topics: ["Hash Table", "Math", "String"], companies: ["Google", "Amazon"], isSolved: false },
  { id: "13", title: "Roman to Integer", difficulty: "Easy", frequency: 75, topics: ["Hash Table", "Math", "String"], companies: ["Amazon", "Apple", "Microsoft"], isSolved: false },
  { id: "14", title: "Longest Common Prefix", difficulty: "Easy", frequency: 85, topics: ["String", "Trie"], companies: ["Amazon", "Google", "Facebook"], isSolved: false },
  { id: "15", title: "3Sum", difficulty: "Medium", frequency: 95, topics: ["Array", "Two Pointers", "Sorting"], companies: ["Amazon", "Facebook", "Bloomberg", "Microsoft"], isSolved: false },
  { id: "16", title: "3Sum Closest", difficulty: "Medium", frequency: 45, topics: ["Array", "Two Pointers", "Sorting"], companies: ["Amazon", "Bloomberg"], isSolved: false },
  { id: "17", title: "Letter Combinations of a Phone Number", difficulty: "Medium", frequency: 80, topics: ["Hash Table", "String", "Backtracking"], companies: ["Amazon", "Microsoft", "Facebook"], isSolved: false },
  { id: "18", title: "4Sum", difficulty: "Medium", frequency: 35, topics: ["Array", "Two Pointers", "Sorting"], companies: ["Amazon", "Google"], isSolved: false },
  { id: "19", title: "Remove Nth Node From End of List", difficulty: "Medium", frequency: 75, topics: ["Linked List", "Two Pointers"], companies: ["Amazon", "Facebook", "Microsoft"], isSolved: false },
  { id: "20", title: "Valid Parentheses", difficulty: "Easy", frequency: 99, topics: ["String", "Stack"], companies: ["Amazon", "Microsoft", "Bloomberg", "Facebook"], isSolved: false },
  { id: "21", title: "Merge Two Sorted Lists", difficulty: "Easy", frequency: 90, topics: ["Linked List", "Recursion"], companies: ["Amazon", "Microsoft", "Apple"], isSolved: false },
  { id: "22", title: "Generate Parentheses", difficulty: "Medium", frequency: 85, topics: ["String", "Dynamic Programming", "Backtracking"], companies: ["Amazon", "Microsoft", "Uber"], isSolved: false },
  { id: "23", title: "Merge k Sorted Lists", difficulty: "Hard", frequency: 85, topics: ["Linked List", "Divide and Conquer", "Heap (Priority Queue)", "Merge Sort"], companies: ["Amazon", "Facebook", "Google"], isSolved: false },
  { id: "24", title: "Swap Nodes in Pairs", difficulty: "Medium", frequency: 55, topics: ["Linked List", "Recursion"], companies: ["Amazon", "Microsoft"], isSolved: false },
  { id: "25", title: "Reverse Nodes in k-Group", difficulty: "Hard", frequency: 65, topics: ["Linked List", "Recursion"], companies: ["Amazon", "Microsoft", "Uber"], isSolved: false }
];

// Generate 75 more dummy problems to test virtualization
const dummyTopics = ["Array", "Graph", "DP", "String", "Tree", "Stack", "Queue", "Math", "Two Pointers", "Sorting", "Hash Table", "Binary Search", "Matrix"];
const dummyCompanies = ["Amazon", "Google", "Facebook", "Microsoft", "Apple", "Bloomberg", "Uber", "Netflix", "Atlassian", "TikTok"];
const dummyDifficulties: Difficulty[] = ["Easy", "Medium", "Hard"];

const generatedProblems: Problem[] = Array.from({ length: 75 }).map((_, i) => {
  const v = i + 26;
  
  // Deterministic topics based on index
  const numTopics = (i % 3) + 1;
  const topics = [
    dummyTopics[i % dummyTopics.length],
    dummyTopics[(i + 1) % dummyTopics.length],
    dummyTopics[(i + 2) % dummyTopics.length],
  ].slice(0, numTopics);
  
  // Deterministic companies
  const numCompanies = (i % 4) + 1;
  const companies = [
    dummyCompanies[i % dummyCompanies.length],
    dummyCompanies[(i + 2) % dummyCompanies.length],
    dummyCompanies[(i + 3) % dummyCompanies.length],
    dummyCompanies[(i + 4) % dummyCompanies.length],
  ].slice(0, numCompanies);

  return {
    id: v.toString(),
    title: `Mock Virtualized Problem ${v}`,
    difficulty: dummyDifficulties[i % dummyDifficulties.length] as Difficulty,
    frequency: (i * 7) % 100, // pseudo-random deterministic
    topics,
    companies,
    isSolved: false,
  };
});

export const initialProblems: Problem[] = [...realProblems, ...generatedProblems];
