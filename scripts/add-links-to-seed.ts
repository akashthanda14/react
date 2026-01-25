import fs from 'fs';
import path from 'path';

// The rbSheetDSA with both leetcodeUrl and gfgUrl
const rbSheetDSA: Record<string, Record<string, Array<{ title: string, leetcodeUrl: string, gfgUrl: string }>>> = {
    "Array": {
        "Two Pointer Technique": [
            { title: "Two Sum II - Input Array Is Sorted", leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", gfgUrl: "https://www.geeksforgeeks.org/problems/pair-with-given-sum-in-a-sorted-array4940/1" },
            { title: "3Sum", leetcodeUrl: "https://leetcode.com/problems/3sum/", gfgUrl: "https://www.geeksforgeeks.org/problems/triplet-sum-in-array-1587115621/1" },
            { title: "Container With Most Water", leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/", gfgUrl: "https://www.geeksforgeeks.org/problems/container-with-most-water-1587115620/1" },
            { title: "Sort Colors", leetcodeUrl: "https://leetcode.com/problems/sort-colors/", gfgUrl: "https://www.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4231/1" },
            { title: "Move Zeroes", leetcodeUrl: "https://leetcode.com/problems/move-zeroes/", gfgUrl: "https://www.geeksforgeeks.org/problems/move-zeroes/1" },
            { title: "Trapping Rain Water", leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/", gfgUrl: "https://www.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1" }
        ],
        "Prefix Sum Technique": [
            { title: "Subarray Sum Equals K", leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/", gfgUrl: "https://www.geeksforgeeks.org/problems/subarrays-with-sum-k/1" },
            { title: "Matrix Block Sum", leetcodeUrl: "https://leetcode.com/problems/matrix-block-sum/", gfgUrl: "https://www.geeksforgeeks.org/problems/sum-of-submatrix-within-given-boundaries/1" },
            { title: "Continuous Subarray Sum", leetcodeUrl: "https://leetcode.com/problems/continuous-subarray-sum/", gfgUrl: "https://www.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1" },
            { title: "Subarray Sums Divisible by K", leetcodeUrl: "https://leetcode.com/problems/subarray-sums-divisible-by-k/", gfgUrl: "https://www.geeksforgeeks.org/problems/sub-array-sum-divisible-by-k2617/1" },
            { title: "Find Pivot Index", leetcodeUrl: "https://leetcode.com/problems/find-pivot-index/", gfgUrl: "https://www.geeksforgeeks.org/problems/equilibrium-point-1587115620/1" },
            { title: "Maximum Size Subarray Sum Equals K", leetcodeUrl: "https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/", gfgUrl: "https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1" }
        ],
        "Sliding Window": [
            { title: "Find All Anagrams in a String", leetcodeUrl: "https://leetcode.com/problems/find-all-anagrams-in-a-string/", gfgUrl: "https://www.geeksforgeeks.org/problems/count-occurences-of-anagrams5839/1" },
            { title: "Sliding Window Maximum", leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/", gfgUrl: "https://www.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1" },
            { title: "Maximum Sum Subarray of Size K", leetcodeUrl: "https://leetcode.com/problems/maximum-average-subarray-i/", gfgUrl: "https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1" },
            { title: "Longest Substring Without Repeating Characters", leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", gfgUrl: "https://www.geeksforgeeks.org/problems/longest-distinct-characters-in-string5848/1" },
            { title: "Fruit Into Baskets", leetcodeUrl: "https://leetcode.com/problems/fruit-into-baskets/", gfgUrl: "https://www.geeksforgeeks.org/problems/fruit-into-baskets-1663137462/1" },
            { title: "Minimum Size Subarray Sum", leetcodeUrl: "https://leetcode.com/problems/minimum-size-subarray-sum/", gfgUrl: "https://www.geeksforgeeks.org/problems/smallest-subarray-with-sum-greater-than-x5651/1" }
        ],
        "Kadane Algorithm": [
            { title: "Maximum Subarray", leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/", gfgUrl: "https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1" },
            { title: "Maximum Product Subarray", leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/", gfgUrl: "https://www.geeksforgeeks.org/problems/maximum-product-subarray3604/1" },
            { title: "Maximum Sum Circular Subarray", leetcodeUrl: "https://leetcode.com/problems/maximum-sum-circular-subarray/", gfgUrl: "https://www.geeksforgeeks.org/problems/max-circular-subarray-sum-1587115620/1" },
            { title: "Best Time to Buy and Sell Stock", leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", gfgUrl: "https://www.geeksforgeeks.org/problems/stock-buy-and-sell-1587115621/1" },
            { title: "Maximum Average Subarray I", leetcodeUrl: "https://leetcode.com/problems/maximum-average-subarray-i/", gfgUrl: "https://www.geeksforgeeks.org/problems/maximum-average-subarray5859/1" }
        ]
    },
    "Strings": {
        "Two Pointer / Palindrome": [
            { title: "Valid Palindrome", leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/", gfgUrl: "https://www.geeksforgeeks.org/problems/palindrome-string0817/1" },
            { title: "Valid Palindrome II", leetcodeUrl: "https://leetcode.com/problems/valid-palindrome-ii/", gfgUrl: "https://www.geeksforgeeks.org/problems/valid-palindrome-ii/1" },
            { title: "Longest Palindromic Substring", leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/", gfgUrl: "https://www.geeksforgeeks.org/problems/longest-palindrome-in-a-string3411/1" },
            { title: "Palindromic Substrings", leetcodeUrl: "https://leetcode.com/problems/palindromic-substrings/", gfgUrl: "https://www.geeksforgeeks.org/problems/count-palindrome-sub-strings-of-a-string0652/1" },
            { title: "Palindrome Number", leetcodeUrl: "https://leetcode.com/problems/palindrome-number/", gfgUrl: "https://www.geeksforgeeks.org/problems/palindrome0746/1" }
        ],
        "Sliding Window (Strings)": [
            { title: "Minimum Window Substring", leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/", gfgUrl: "https://www.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1" },
            { title: "Longest Substring with At Most K Distinct Characters", leetcodeUrl: "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/", gfgUrl: "https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1" },
            { title: "Permutation in String", leetcodeUrl: "https://leetcode.com/problems/permutation-in-string/", gfgUrl: "https://www.geeksforgeeks.org/problems/check-if-string-is-rotated-by-two-places-1587115620/1" },
            { title: "Subarrays with K Different Integers", leetcodeUrl: "https://leetcode.com/problems/subarrays-with-k-different-integers/", gfgUrl: "https://www.geeksforgeeks.org/problems/subarrays-with-k-different-integers/1" },
            { title: "Longest Nice Substring", leetcodeUrl: "https://leetcode.com/problems/longest-nice-substring/", gfgUrl: "https://www.geeksforgeeks.org/problems/longest-nice-substring/1" }
        ]
    },
    "Binary Search": {
        "Classic Binary Search / Sorted Array": [
            { title: "Binary Search", leetcodeUrl: "https://leetcode.com/problems/binary-search/", gfgUrl: "https://www.geeksforgeeks.org/problems/binary-search-1587115620/1" },
            { title: "First Bad Version", leetcodeUrl: "https://leetcode.com/problems/first-bad-version/", gfgUrl: "https://www.geeksforgeeks.org/problems/find-first-bad-version/1" },
            { title: "Search in Rotated Sorted Array", leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/", gfgUrl: "https://www.geeksforgeeks.org/problems/search-in-a-rotated-array4618/1" },
            { title: "Find Minimum in Rotated Sorted Array", leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", gfgUrl: "https://www.geeksforgeeks.org/problems/minimum-element-in-a-sorted-and-rotated-array3611/1" },
            { title: "Find Peak Element", leetcodeUrl: "https://leetcode.com/problems/find-peak-element/", gfgUrl: "https://www.geeksforgeeks.org/problems/peak-element/1" }
        ],
        "Lower Bound / Upper Bound": [
            { title: "Find First and Last Position of Element", leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", gfgUrl: "https://www.geeksforgeeks.org/problems/first-and-last-occurrences-of-x3116/1" },
            { title: "Search Insert Position", leetcodeUrl: "https://leetcode.com/problems/search-insert-position/", gfgUrl: "https://www.geeksforgeeks.org/problems/search-insert-position-of-k-in-a-sorted-array/1" },
            { title: "Count Occurrences in Sorted Array", leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", gfgUrl: "https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1" },
            { title: "Ceiling in a Sorted Array", leetcodeUrl: "https://leetcode.com/problems/search-insert-position/", gfgUrl: "https://www.geeksforgeeks.org/problems/ceil-the-floor2802/1" },
            { title: "Floor in a Sorted Array", leetcodeUrl: "https://leetcode.com/problems/search-insert-position/", gfgUrl: "https://www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1" }
        ],
        "Binary Search on Answer": [
            { title: "Split Array Largest Sum", leetcodeUrl: "https://leetcode.com/problems/split-array-largest-sum/", gfgUrl: "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1" },
            { title: "Koko Eating Bananas", leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/", gfgUrl: "https://www.geeksforgeeks.org/problems/koko-eating-bananas/1" },
            { title: "Capacity To Ship Packages Within D Days", leetcodeUrl: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", gfgUrl: "https://www.geeksforgeeks.org/problems/capacity-to-ship-packages-within-d-days/1" },
            { title: "Median of a Sorted Matrix", leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", gfgUrl: "https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1" }
        ],
        "Search in 2D Matrix": [
            { title: "Search a 2D Matrix", leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/", gfgUrl: "https://www.geeksforgeeks.org/problems/search-in-a-matrix17201720/1" },
            { title: "Search a 2D Matrix II", leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix-ii/", gfgUrl: "https://www.geeksforgeeks.org/problems/search-in-a-matrix-1587115621/1" },
            { title: "Kth Smallest Element in a Sorted Matrix", leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", gfgUrl: "https://www.geeksforgeeks.org/problems/kth-element-in-matrix/1" }
        ]
    },
    "Stack": {
        "Monotonic Stack": [
            { title: "Next Greater Element I", leetcodeUrl: "https://leetcode.com/problems/next-greater-element-i/", gfgUrl: "https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1" },
            { title: "Next Greater Element II", leetcodeUrl: "https://leetcode.com/problems/next-greater-element-ii/", gfgUrl: "https://www.geeksforgeeks.org/problems/next-greater-element-2/1" },
            { title: "Daily Temperatures", leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/", gfgUrl: "https://www.geeksforgeeks.org/problems/stock-span-problem-1587115621/1" },
            { title: "Online Stock Span", leetcodeUrl: "https://leetcode.com/problems/online-stock-span/", gfgUrl: "https://www.geeksforgeeks.org/problems/stock-span-problem-1587115621/1" },
            { title: "Largest Rectangle in Histogram", leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/", gfgUrl: "https://www.geeksforgeeks.org/problems/maximum-rectangular-area-in-a-histogram-1587115620/1" },
            { title: "Maximal Rectangle", leetcodeUrl: "https://leetcode.com/problems/maximal-rectangle/", gfgUrl: "https://www.geeksforgeeks.org/problems/max-rectangle/1" },
            { title: "Asteroid Collision", leetcodeUrl: "https://leetcode.com/problems/asteroid-collision/", gfgUrl: "https://www.geeksforgeeks.org/problems/asteroid-collision/1" }
        ],
        "Expression Evaluation": [
            { title: "Basic Calculator I", leetcodeUrl: "https://leetcode.com/problems/basic-calculator/", gfgUrl: "https://www.geeksforgeeks.org/problems/basic-calculator/1" },
            { title: "Basic Calculator II", leetcodeUrl: "https://leetcode.com/problems/basic-calculator-ii/", gfgUrl: "https://www.geeksforgeeks.org/problems/basic-calculator-ii/1" },
            { title: "Evaluate Reverse Polish Notation", leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", gfgUrl: "https://www.geeksforgeeks.org/problems/evaluation-of-postfix-expression1733/1" },
            { title: "Decode String", leetcodeUrl: "https://leetcode.com/problems/decode-string/", gfgUrl: "https://www.geeksforgeeks.org/problems/decode-the-string2444/1" }
        ],
        "Stack Simulation": [
            { title: "Backspace String Compare", leetcodeUrl: "https://leetcode.com/problems/backspace-string-compare/", gfgUrl: "https://www.geeksforgeeks.org/problems/backspace-string-compare/1" },
            { title: "Remove All Adjacent Duplicates", leetcodeUrl: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/", gfgUrl: "https://www.geeksforgeeks.org/problems/remove-consecutive-duplicates-1587115620/1" },
            { title: "Make The String Great", leetcodeUrl: "https://leetcode.com/problems/make-the-string-great/", gfgUrl: "https://www.geeksforgeeks.org/problems/make-the-string-great/1" },
            { title: "Remove Adjacent Duplicates II", leetcodeUrl: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/", gfgUrl: "https://www.geeksforgeeks.org/problems/remove-all-adjacent-duplicates-in-string-ii/1" }
        ],
        "Parenthesis Problems": [
            { title: "Valid Parentheses", leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/", gfgUrl: "https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1" },
            { title: "Minimum Add to Make Parentheses Valid", leetcodeUrl: "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/", gfgUrl: "https://www.geeksforgeeks.org/problems/minimum-add-to-make-parentheses-valid/1" },
            { title: "Longest Valid Parentheses", leetcodeUrl: "https://leetcode.com/problems/longest-valid-parentheses/", gfgUrl: "https://www.geeksforgeeks.org/problems/longest-valid-parentheses5657/1" },
            { title: "Score of Parentheses", leetcodeUrl: "https://leetcode.com/problems/score-of-parentheses/", gfgUrl: "https://www.geeksforgeeks.org/problems/score-of-parentheses/1" }
        ],
        "Design Stack / Queue": [
            { title: "Min Stack", leetcodeUrl: "https://leetcode.com/problems/min-stack/", gfgUrl: "https://www.geeksforgeeks.org/problems/get-minimum-element-from-stack/1" },
            { title: "Implement Queue using Stacks", leetcodeUrl: "https://leetcode.com/problems/implement-queue-using-stacks/", gfgUrl: "https://www.geeksforgeeks.org/problems/queue-using-stack/1" },
            { title: "Implement Stack using Queues", leetcodeUrl: "https://leetcode.com/problems/implement-stack-using-queues/", gfgUrl: "https://www.geeksforgeeks.org/problems/stack-using-two-queues/1" }
        ]
    },
    "Linked List": {
        "Basic Linked List Operations": [
            { title: "Length of Linked List", leetcodeUrl: "https://leetcode.com/problems/middle-of-the-linked-list/", gfgUrl: "https://www.geeksforgeeks.org/problems/find-length-of-loop/1" },
            { title: "Search in Linked List", leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/", gfgUrl: "https://www.geeksforgeeks.org/problems/search-in-linked-list-1664434326/1" },
            { title: "Design Linked List", leetcodeUrl: "https://leetcode.com/problems/design-linked-list/", gfgUrl: "https://www.geeksforgeeks.org/problems/design-linked-list/1" }
        ],
        "Slow-Fast Pointer / Cycle Detection": [
            { title: "Linked List Cycle", leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/", gfgUrl: "https://www.geeksforgeeks.org/problems/detect-loop-in-linked-list/1" },
            { title: "Linked List Cycle II", leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle-ii/", gfgUrl: "https://www.geeksforgeeks.org/problems/remove-loop-in-linked-list/1" },
            { title: "Middle of the Linked List", leetcodeUrl: "https://leetcode.com/problems/middle-of-the-linked-list/", gfgUrl: "https://www.geeksforgeeks.org/problems/finding-middle-element-in-a-linked-list/1" },
            { title: "Palindrome Linked List", leetcodeUrl: "https://leetcode.com/problems/palindrome-linked-list/", gfgUrl: "https://www.geeksforgeeks.org/problems/check-if-linked-list-is-pallindrome/1" },
            { title: "Remove Nth Node From End", leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", gfgUrl: "https://www.geeksforgeeks.org/problems/nth-node-from-end-of-linked-list/1" }
        ],
        "Reversal Techniques": [
            { title: "Reverse Linked List", leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/", gfgUrl: "https://www.geeksforgeeks.org/problems/reverse-a-linked-list/1" },
            { title: "Reverse Linked List II", leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list-ii/", gfgUrl: "https://www.geeksforgeeks.org/problems/reverse-a-sublist-of-linked-list/1" },
            { title: "Reverse Nodes in k-Group", leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/", gfgUrl: "https://www.geeksforgeeks.org/problems/reverse-a-linked-list-in-groups-of-given-size/1" },
            { title: "Swap Nodes in Pairs", leetcodeUrl: "https://leetcode.com/problems/swap-nodes-in-pairs/", gfgUrl: "https://www.geeksforgeeks.org/problems/pairwise-swap-elements-of-a-linked-list-by-swapping-data/1" },
            { title: "Odd-Even Linked List", leetcodeUrl: "https://leetcode.com/problems/odd-even-linked-list/", gfgUrl: "https://www.geeksforgeeks.org/problems/rearrange-a-linked-list/1" },
            { title: "Rotate List", leetcodeUrl: "https://leetcode.com/problems/rotate-list/", gfgUrl: "https://www.geeksforgeeks.org/problems/rotate-a-linked-list/1" }
        ],
        "Merge / Sort/Reorder": [
            { title: "Merge Two Sorted Lists", leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/", gfgUrl: "https://www.geeksforgeeks.org/problems/merge-two-sorted-linked-lists/1" },
            { title: "Merge k Sorted Lists", leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/", gfgUrl: "https://www.geeksforgeeks.org/problems/merge-k-sorted-linked-lists/1" },
            { title: "Sort List", leetcodeUrl: "https://leetcode.com/problems/sort-list/", gfgUrl: "https://www.geeksforgeeks.org/problems/sort-a-linked-list/1" },
            { title: "Reorder List", leetcodeUrl: "https://leetcode.com/problems/reorder-list/", gfgUrl: "https://www.geeksforgeeks.org/problems/reorder-list/1" },
            { title: "Remove Duplicates from Sorted List", leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/", gfgUrl: "https://www.geeksforgeeks.org/problems/remove-duplicate-element-from-sorted-linked-list/1" }
        ],
        "Linked List + Stack": [
            { title: "Add Two Numbers", leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/", gfgUrl: "https://www.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1" },
            { title: "Add Two Numbers II", leetcodeUrl: "https://leetcode.com/problems/add-two-numbers-ii/", gfgUrl: "https://www.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1" },
            { title: "Next Greater Node in Linked List", leetcodeUrl: "https://leetcode.com/problems/next-greater-node-in-linked-list/", gfgUrl: "https://www.geeksforgeeks.org/problems/next-higher-node-in-linked-list/1" }
        ]
    }
};

// Build lookup map: normalized title -> {leetcodeUrl, gfgUrl}
function normalize(str: string): string {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const linkMap = new Map<string, { leetcodeUrl: string, gfgUrl: string }>();
for (const [, subtopics] of Object.entries(rbSheetDSA)) {
    for (const [, problems] of Object.entries(subtopics)) {
        for (const p of problems) {
            linkMap.set(normalize(p.title), { leetcodeUrl: p.leetcodeUrl, gfgUrl: p.gfgUrl });
        }
    }
}

// Read seed.ts and update
const seedPath = path.join(process.cwd(), 'prisma/seed.ts');
let content = fs.readFileSync(seedPath, 'utf-8');

// Pattern to match problem entries (with or without existing link field)
const problemRegex = /\{\s*title:\s*'([^']+)',\s*ref:\s*'([^']+)',\s*diff:\s*(Difficulty\.\w+),\s*companies:\s*\[([^\]]*)\](?:,\s*link:\s*'[^']*')?\s*\}/g;

let updatedContent = content.replace(problemRegex, (match, title, ref, diff, companies) => {
    const normalizedTitle = normalize(title);
    const links = linkMap.get(normalizedTitle);

    if (links) {
        return `{ title: '${title}', ref: '${ref}', diff: ${diff}, companies: [${companies}], leetcodeUrl: '${links.leetcodeUrl}', gfgUrl: '${links.gfgUrl}' }`;
    }
    return match;
});

fs.writeFileSync(seedPath, updatedContent);
console.log('✅ Updated seed.ts with leetcodeUrl and gfgUrl!');
console.log(`📊 Total links in map: ${linkMap.size}`);
