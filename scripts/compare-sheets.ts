
import fs from 'fs';
import path from 'path';

function parseFile(filePath: string): { title: string, originalLine: string, topic: string }[] {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const problems: { title: string, originalLine: string, topic: string }[] = [];
    let currentTopic = '';

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Simple heuristic for topics: mixture of uppercase and no "—"
        // But headers in rbsheet.txt are like "ARRAY", "STRINGS", "BINARY SEARCH"
        // Also subheaders "1. Two-Pointer Technique"
        // Let's stick to the main CAPS headers if possible, or just use the last seen header.

        // In rbsheet, main headers are all caps, e.g. "ARRAY", "STRINGS". 
        // Subheaders usually start with number.
        // Problem lines usually have " — ".

        if (line.includes('—')) {
            const parts = line.split('—');
            const title = parts[0].trim().replace(/^\d+\.\s*/, ''); // Remove leading numbering "1. Jump Game"
            // Filter out things that look like descriptions or logic if they accidentally have em dashes, 
            // but the file format seems consistent for problems having "LC" or "GFG" or similar usually in 2nd part.
            // Let's blindly trust the separator for now.

            // Clean title: remove "1. ", "2. " etc if present at start
            problems.push({
                title: title,
                originalLine: line.trim(),
                topic: currentTopic
            });
        } else {
            // Check if it's a topic header
            // Heuristic: UPPERCASE words, maybe spaces, no lower case letters (except maybe 's' in plural? No, usually distinct)
            // rbsheet.txt headers: "ARRAY", "STRINGS", "BINARY SEARCH", "STACK", "LINKED LIST", "DOUBLE LINKED LIST", "HASHMAP", "HEAP", "Recursion" (Mixed case!), "BACKTRACKING", "TREE", "BST", "GRAPH", "GREEDY", "DYNAMIC PROGRAMMING (DP)", "TRIE", "BIT MANIPULATION"

            // Allow mixed case specific headers if they are known or look like headers
            if (/^[A-Z0-9\s\(\)]+$/.test(trimmed) && trimmed.length > 2) {
                currentTopic = trimmed;
            } else if (trimmed === 'Recursion') {
                currentTopic = 'RECURSION';
            }
        }
    }
    return problems;
}

function normalize(str: string): string {
    return str.toLowerCase()
        .replace(/[^a-z0-9]/g, '') // remove all non-alphanumeric chars
        .replace(/ii$/i, '2') // common variation
        .replace(/iii$/i, '3');
}

function main() {
    const blind100Path = path.join(process.cwd(), 'data/blind100.txt');
    const rbSheetPath = path.join(process.cwd(), 'data/rbsheet.txt');

    const blind100 = parseFile(blind100Path);
    const rbSheet = parseFile(rbSheetPath);

    const blind100Titles = new Set(blind100.map(p => normalize(p.title)));

    // Also add some variations manually if needed, or rely on normalization
    // There are duplicates in blind100 text file itself sometimes or similar names?

    console.log(`Loaded ${blind100.length} problems from Blind 100.`);
    console.log(`Loaded ${rbSheet.length} problems from RB Sheet.`);

    const missingInBlind100 = rbSheet.filter(p => !blind100Titles.has(normalize(p.title)));

    console.log(`\nFound ${missingInBlind100.length} problems in RB Sheet that are NOT in Blind 100.`);
    console.log(`(Duplicate names in RB Sheet preserved if distinct entries)\n`);

    // Group by topic
    const byTopic: Record<string, typeof missingInBlind100> = {};
    for (const p of missingInBlind100) {
        const t = p.topic || 'UNCATEGORIZED';
        if (!byTopic[t]) {
            byTopic[t] = [];
        }
        byTopic[t].push(p);
    }

    for (const [topic, problems] of Object.entries(byTopic)) {
        console.log(`### ${topic}`);
        // Filter duplicates within the same topic for cleaner output (by title)
        const seen = new Set();
        for (const p of problems) {
            const norm = normalize(p.title);
            if (!seen.has(norm)) {
                console.log(p.originalLine);
                seen.add(norm);
            }
        }
        console.log('\n');
    }
}

main();
