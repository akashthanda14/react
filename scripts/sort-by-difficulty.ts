import * as fs from 'fs';
import * as path from 'path';

const seedPath = path.join(__dirname, '../prisma/seed-lastminute.ts');
const content = fs.readFileSync(seedPath, 'utf8');

// Extract the problems array
const problemsStart = content.indexOf('const problems = [');
const problemsEnd = content.indexOf('    ];', problemsStart);
const beforeProblems = content.substring(0, problemsStart);
const afterProblems = content.substring(problemsEnd);

// Extract individual problem entries
const problemsSection = content.substring(problemsStart, problemsEnd);
const problemRegex = /\{ topic: '([^']+)', title: '([^']+)', leetcodeUrl: '([^']*)', gfgUrl: '([^']*)', diff: Difficulty\.([A-Z]+), companies: (\[[^\]]*\]) \}/g;

const problems: Array<{
    topic: string;
    title: string;
    leetcodeUrl: string;
    gfgUrl: string;
    diff: string;
    companies: string;
    raw: string;
}> = [];

let match;
while ((match = problemRegex.exec(problemsSection)) !== null) {
    problems.push({
        topic: match[1],
        title: match[2],
        leetcodeUrl: match[3],
        gfgUrl: match[4],
        diff: match[5],
        companies: match[6],
        raw: match[0]
    });
}

console.log(`Found ${problems.length} problems`);

// Group by topic
const topicGroups = new Map<string, typeof problems>();
for (const problem of problems) {
    if (!topicGroups.has(problem.topic)) {
        topicGroups.set(problem.topic, []);
    }
    topicGroups.get(problem.topic)!.push(problem);
}

// Sort each topic by difficulty: EASY → MEDIUM → HARD
const difficultyOrder = { 'EASY': 1, 'MEDIUM': 2, 'HARD': 3 };

for (const [_topic, probs] of topicGroups) {
    probs.sort((a, b) => {
        const diffA = difficultyOrder[a.diff as keyof typeof difficultyOrder] || 999;
        const diffB = difficultyOrder[b.diff as keyof typeof difficultyOrder] || 999;
        return diffA - diffB;
    });
}

// Reconstruct the problems array maintaining topic order
const topicOrder = Array.from(topicGroups.keys());
let newProblemsArray = '    const problems = [\n';

for (const topic of topicOrder) {
    const probs = topicGroups.get(topic)!;
    for (const prob of probs) {
        newProblemsArray += `        ${prob.raw},\n`;
    }
}

newProblemsArray += '    ];';

// Write back to file
const newContent = beforeProblems + newProblemsArray + afterProblems;
fs.writeFileSync(seedPath, newContent);

console.log('✅ Problems sorted by difficulty (Easy → Medium → Hard) within each topic');
console.log('\nSummary by topic:');
for (const [topic, probs] of topicGroups) {
    const easy = probs.filter(p => p.diff === 'EASY').length;
    const medium = probs.filter(p => p.diff === 'MEDIUM').length;
    const hard = probs.filter(p => p.diff === 'HARD').length;
    console.log(`  ${topic}: ${easy} Easy, ${medium} Medium, ${hard} Hard`);
}
