#!/usr/bin/env tsx

/**
 * Script to verify what URLs are being passed to the UI components
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔍 Checking URLs passed to UI components\n');
    console.log('='.repeat(80));

    // Simulate what the page.tsx does
    const problems = await prisma.problem.findMany({
        where: {
            OR: [
                { gfgUrl: { not: null } },
                { leetcodeUrl: { not: null } },
            ],
        },
        select: {
            id: true,
            title: true,
            leetcodeUrl: true,
            gfgUrl: true,
        },
        take: 10,
    });

    console.log('\n📊 Sample of URLs being passed to UI:\n');

    problems.forEach((problem, index) => {
        console.log(`${index + 1}. ${problem.title}`);
        console.log(`   Database gfgUrl: ${problem.gfgUrl || 'NULL'}`);
        console.log(`   Database leetcodeUrl: ${problem.leetcodeUrl || 'NULL'}`);

        // Simulate what ProblemTable receives
        console.log(`   → UI will use for GFG: ${problem.gfgUrl || 'https://www.geeksforgeeks.org (FALLBACK)'}`);
        console.log(`   → UI will use for LC: ${problem.leetcodeUrl || 'NULL (icon disabled)'}`);

        // Check if fallback is being used
        if (!problem.gfgUrl) {
            console.log(`   ⚠️  WARNING: GFG URL is NULL - UI will show fallback homepage`);
        }
        if (!problem.leetcodeUrl) {
            console.log(`   ⚠️  WARNING: LeetCode URL is NULL - icon will be disabled`);
        }

        console.log('');
    });

    // Check for problems where gfgUrl is null
    const nullGfgCount = await prisma.problem.count({
        where: {
            gfgUrl: null,
        },
    });

    const nullLeetcodeCount = await prisma.problem.count({
        where: {
            leetcodeUrl: null,
        },
    });

    console.log('='.repeat(80));
    console.log('\n📈 NULL URL Statistics:');
    console.log(`Problems with NULL gfgUrl: ${nullGfgCount}`);
    console.log(`Problems with NULL leetcodeUrl: ${nullLeetcodeCount}`);

    if (nullGfgCount > 0) {
        console.log(`\n⚠️  ${nullGfgCount} problems will show GFG fallback homepage link`);
    }
    if (nullLeetcodeCount > 0) {
        console.log(`⚠️  ${nullLeetcodeCount} problems will have disabled LeetCode icon`);
    }

    // Check for problems where BOTH are null
    const bothNullCount = await prisma.problem.count({
        where: {
            AND: [
                { gfgUrl: null },
                { leetcodeUrl: null },
            ],
        },
    });

    if (bothNullCount > 0) {
        console.log(`\n❌ ${bothNullCount} problems have BOTH URLs as NULL!`);

        const bothNull = await prisma.problem.findMany({
            where: {
                AND: [
                    { gfgUrl: null },
                    { leetcodeUrl: null },
                ],
            },
            select: {
                id: true,
                title: true,
            },
            take: 5,
        });

        console.log('\nSample problems with both URLs null:');
        bothNull.forEach((p, i) => {
            console.log(`${i + 1}. ${p.title} (ID: ${p.id})`);
        });
    }

    console.log('='.repeat(80));

    await prisma.$disconnect();
}

main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});
