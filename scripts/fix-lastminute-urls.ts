
import * as fs from 'fs';
import * as path from 'path';

const seedPath = path.join(__dirname, '../prisma/seed.ts');
const lastMinutePath = path.join(__dirname, '../prisma/seed-lastminute.ts');

const seedContent = fs.readFileSync(seedPath, 'utf8');
const lastMinuteContent = fs.readFileSync(lastMinutePath, 'utf8');

// Regex to extract problem objects from seed.ts
// Format: { title: '...', ... leetcodeUrl: '...', gfgUrl: '...' }
const problemRegex = /{\s*title:\s*'([^']+)',[^}]*leetcodeUrl:\s*'([^']*)'[^}]*gfgUrl:\s*'([^']*)'[^}]*}/g;

const urlMap = new Map<string, { lc: string, gfg: string }>();

let match;
while ((match = problemRegex.exec(seedContent)) !== null) {
    const title = match[1].trim().toLowerCase();
    const lc = match[2];
    const gfg = match[3];
    urlMap.set(title, { lc, gfg });
}

console.log(`Found ${urlMap.size} problems in seed.ts`);

// Now parse lastminute problems
// We'll regex extract them too to reconstruct them
const lmProblemRegex = /{\s*topic:\s*'([^']+)',\s*title:\s*'([^']+)',\s*url:\s*'([^']*)',\s*diff:\s*Difficulty\.([A-Z]+),\s*companies:\s*\[([^\]]*)\]\s*}/g;

let newProblemsArray = "    const problems = [\n";
let lmCount = 0;

let lmMatch;
// We need to loop manually or split the file to find the array. 
// Simpler: Just Regex replace the whole array content in the file?
// No, the regex above matches individual lines. 

// Let's iterate over the matches in the file content
while ((lmMatch = lmProblemRegex.exec(lastMinuteContent)) !== null) {
    const topic = lmMatch[1];
    const title = lmMatch[2];
    const originalUrl = lmMatch[3];
    const diff = lmMatch[4];
    const companies = lmMatch[5]; // might be empty

    const lookup = urlMap.get(title.toLowerCase().trim());

    let leetcodeUrl = '';
    let gfgUrl = '';

    if (lookup) {
        leetcodeUrl = lookup.lc;
        gfgUrl = lookup.gfg;
    }

    // Fallback: If original URL was LC and we don't have it, keep it
    if (!leetcodeUrl && originalUrl.includes('leetcode.com')) {
        leetcodeUrl = originalUrl;
    }
    // Fallback: If original URL was GFG and we don't have it, keep it
    if (!gfgUrl && originalUrl.includes('geeksforgeeks')) {
        gfgUrl = originalUrl;
    }

    // Construct new object
    newProblemsArray += `        { topic: '${topic}', title: '${title}', leetcodeUrl: '${leetcodeUrl}', gfgUrl: '${gfgUrl}', diff: Difficulty.${diff}, companies: [${companies}] },\n`;
    lmCount++;
}
newProblemsArray += "    ];";

console.log(`Processed ${lmCount} problems for last-minute.`);

// Now we need to update the file content.
// 1. Replace the problems array definition.
// 2. Update the logic loop.

// 1. Replace Array
// We look for "const problems = [" down to "];"
// This is risky with regex. Ideally we locate the range.
const startIndex = lastMinuteContent.indexOf("const problems = [");
const endIndex = lastMinuteContent.indexOf("];", startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find problems array in lastminute file");
    process.exit(1);
}

let newContent = lastMinuteContent.substring(0, startIndex) + newProblemsArray + lastMinuteContent.substring(endIndex + 2);

// 2. Update Logic Loop
// We need to replace usage of `problem.url` with `problem.leetcodeUrl` and `problem.gfgUrl`
// And remove the `isGfg` logic mess.

export const oldLogic = `            // Find existing problem or create
            const isGfg = problem.url.includes('geeksforgeeks');
            let createdProblem = await prisma.problem.findFirst({
                where: {
                    OR: [
                        { title: problem.title },
                        { leetcodeUrl: problem.url }
                    ]
                }
            });

            if (createdProblem) {
                if (!createdProblem.leetcodeUrl && !isGfg) {
                    await prisma.problem.update({
                        where: { id: createdProblem.id },
                        data: { leetcodeUrl: problem.url }
                    });
                }
                if (!createdProblem.gfgUrl && isGfg) {
                    await prisma.problem.update({
                        where: { id: createdProblem.id },
                        data: { gfgUrl: problem.url }
                    });
                }
            } else {
                createdProblem = await prisma.problem.create({
                    data: {
                        title: problem.title,
                        difficulty: problem.diff,
                        leetcodeUrl: !isGfg ? problem.url : null,
                        gfgUrl: isGfg ? problem.url : null,
                    }
                });
            }`;

export const newLogic = `            // Find existing problem or create
            let createdProblem = await prisma.problem.findFirst({
                where: {
                    OR: [
                        { title: problem.title },
                        // Check both URLs if present
                        ...(problem.leetcodeUrl ? [{ leetcodeUrl: problem.leetcodeUrl }] : []),
                        ...(problem.gfgUrl ? [{ gfgUrl: problem.gfgUrl }] : [])
                    ]
                }
            });

            if (createdProblem) {
                // Update missing URLs if we have them
                const updateData: any = {};
                if (!createdProblem.leetcodeUrl && problem.leetcodeUrl) {
                    updateData.leetcodeUrl = problem.leetcodeUrl;
                }
                if (!createdProblem.gfgUrl && problem.gfgUrl) {
                    updateData.gfgUrl = problem.gfgUrl;
                }
                
                if (Object.keys(updateData).length > 0) {
                    await prisma.problem.update({
                        where: { id: createdProblem.id },
                        data: updateData
                    });
                }
            } else {
                createdProblem = await prisma.problem.create({
                    data: {
                        title: problem.title,
                        difficulty: problem.diff,
                        leetcodeUrl: problem.leetcodeUrl || null,
                        gfgUrl: problem.gfgUrl || null,
                    }
                });
            }`;

// We perform a loose replacement because whitespace might differ.
// Actually, it's safer to just write the file with the array replaced, 
// and then use 'replace_file_content' tool to update the logic block safely.
// OR, since I'm rewriting the file anyway, I can try to replace the block if I can match it.
// The block is quite large. Let's just output the array-replaced file first.

fs.writeFileSync(lastMinutePath, newContent);
console.log("Updated problems array in seed-lastminute.ts");
