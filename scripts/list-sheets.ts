
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const sheets = await prisma.sheet.findMany({
        orderBy: { order: 'asc' }
    });
    console.log('Sheets found:', sheets);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
