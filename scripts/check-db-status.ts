
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const total = await prisma.problem.count();
    console.log(`Total problems in DB: ${total}`);

    const withLinks = await prisma.problem.count({
        where: {
            OR: [
                { NOT: { leetcodeUrl: null } },
                { NOT: { gfgUrl: null } }
            ]
        }
    });
    console.log(`Problems with at least one link: ${withLinks}`);

    if (total === withLinks) {
        console.log("All problems have links.");
    } else {
        const missing = await prisma.problem.findMany({
            where: {
                AND: [
                    { OR: [{ leetcodeUrl: null }, { leetcodeUrl: '' }] },
                    { OR: [{ gfgUrl: null }, { gfgUrl: '' }] }
                ]
            }
        });
        console.log("Problems missing links:");
        missing.forEach(p => console.log(`- ${p.title}`));
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
