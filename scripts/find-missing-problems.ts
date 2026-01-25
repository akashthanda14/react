import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findMissingProblems() {
    console.log('🔍 Finding missing problems in Last Minute 100 sheet...\n');

    // Expected problems from seed file
    const expectedProblems = [
        // HashMap - 5 problems
        'Subarray Sum Equals K',
        'Longest Substring with At Most K Distinct',
        'Find All Anagrams in a String',
        'Task Scheduler',
        'Top K Frequent Elements',

        // Graph - 9 problems  
        'Clone Graph',
        'Course Schedule',
        'Course Schedule II',
        'Number of Islands',
        'Surrounded Regions',
        'Word Ladder',
        'Accounts Merge',
        'Evaluate Division',
        'Pacific Atlantic Water Flow',
    ];

    const sheet = await prisma.sheet.findFirst({
        where: { name: 'Last Minute 100' }
    });

    if (!sheet) {
        console.log('❌ Sheet not found');
        return;
    }

    // Get all problems in the sheet
    const topics = await prisma.topic.findMany({
        where: { sheetId: sheet.id },
        include: {
            subtopics: {
                include: {
                    problems: {
                        include: {
                            problem: true
                        }
                    }
                }
            }
        }
    });

    const actualProblems = new Set<string>();
    for (const topic of topics) {
        for (const subtopic of topic.subtopics) {
            for (const p of subtopic.problems) {
                actualProblems.add(p.problem.title);
            }
        }
    }

    console.log('Expected problems to check:');
    for (const title of expectedProblems) {
        const found = actualProblems.has(title);
        console.log(`  ${found ? '✅' : '❌'} ${title}`);
    }
}

findMissingProblems()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
