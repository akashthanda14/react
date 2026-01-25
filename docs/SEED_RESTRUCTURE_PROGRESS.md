# Seed File Restructuring Progress

## Goal
Convert seed file from flat Topic → Problems to hierarchical Topic → Subtopic → Problems structure.

## Status

### ✅ Completed Topics:
1. **Array** - Converted with 4 subtopics:
   - Two Pointers
   - Prefix Sum
   - Sliding Window
   - Kadane Algorithm

2. **Strings** - Converted with 2 subtopics:
   - Palindrome
   - Pattern Matching

### ❌ Remaining Topics (Need Conversion):
3. Stack
4. Binary Search
5. Linked List
6. HashMap
7. Heap
8. Tree
9. Graph
10. Dynamic Programming
11. Greedy
12. Trie
13. Bit Manipulation

## Conversion Pattern

### Before (Old Format):
```typescript
{
  name: 'Stack',
  desc: 'Monotonic stack, expression evaluation',
  problems: [
    { title: 'Next Greater Element I', difficulty: Difficulty.EASY, desc: '...' },
    { title: 'Valid Parentheses', difficulty: Difficulty.EASY, desc: '...' },
  ]
}
```

### After (New Format):
```typescript
{
  name: 'Stack',
  desc: 'Stack data structure problems',
  subtopics: [
    {
      name: 'Monotonic Stack',
      desc: 'Maintain monotonic property using stack',
      problems: [
        { title: 'Next Greater Element I', difficulty: Difficulty.EASY, desc: '...' },
      ]
    },
    {
      name: 'Parentheses',
      desc: 'Matching and validation problems',
      problems: [
        { title: 'Valid Parentheses', difficulty: Difficulty.EASY, desc: '...' },
      ]
    }
  ]
}
```

## Recommended Subtopics Structure

### Stack:
- Monotonic Stack
- Expression Evaluation  
- Parentheses Matching
- Stack Design

### Binary Search:
- Classic Binary Search
- Search Bounds
- Search on Answer
- 2D Binary Search

### Linked List:
- Basic Operations
- Two Pointers (Slow-Fast)
- Reversal
- Merge & Sort
- Advanced (LRU/LFU Cache)

### HashMap:
- Frequency Counting
- Prefix Sum with Map
- Window with Map

### Heap:
- Top-K Problems
- K-way Merge
- Stream Simulation

### Tree:
- Traversals (BFS/DFS)
- Lowest Common Ancestor
- Binary Search Tree
- Path Problems
- Serialization

### Graph:
- BFS/DFS
- Topological Sort
- Union Find
- Shortest Path

### Dynamic Programming:
- 1D DP
- 2D/Grid DP
- Subsequences
- Intervals/Knapsack

### Greedy:
- Interval Scheduling
- Jump Games
- Optimal Selection

### Trie:
- Trie Implementation
- Word Problems
- Autocomplete

### Bit Manipulation:
- XOR Tricks
- Bit Counting
- Bitmasks

## Next Steps

1. Convert remaining 11 topics using the pattern above
2. Test seed file with: `npx tsx prisma/seed.ts`
3. Verify database has proper hierarchy: Topic → Subtopic → Problems
4. Update frontend to display subtopics

## Testing
```bash
# Clean and reseed database
npx prisma migrate reset --force
npx tsx prisma/seed.ts
```
