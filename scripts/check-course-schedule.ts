import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCourseSchedule() {
    const problems = await prisma.problem.findMany({
        where: {
            title: {
                contains: 'Course Schedule'
            }
        }
    });

    console.log(`Found ${problems.length} problems with "Course Schedule" in title:\n`);
    for (const p of problems) {
        console.log(`  - "${p.title}" (ID: ${p.id})`);
        console.log(`    LeetCode: ${p.leetcodeUrl || 'N/A'}`);
        console.log(`    GFG: ${p.gfgUrl || 'N/A'}\n`);
    }
}

checkCourseSchedule()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
