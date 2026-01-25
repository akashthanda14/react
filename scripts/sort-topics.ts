import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const topicOrder = [
    "Array",
    "Strings",
    "Binary Search",
    "Stack",
    "Linked List",
    "Double Linked List",
    "HashMap",
    "Heap",
    "Recursion",
    "Backtracking",
    "Tree",
    "Binary Search Tree",
    "Graph",
    "Greedy",
    "Dynamic Programming",
    "Trie",
    "Bit Manipulation"
];

async function main() {
    console.log('🔄 Reordering topics in Pattern Wise Sheet...');

    const patternSheet = await prisma.sheet.findFirst({
        where: { name: 'Pattern Wise Sheet' }
    });

    if (!patternSheet) {
        console.error('❌ Pattern Wise Sheet not found.');
        return;
    }

    for (const [index, topicName] of topicOrder.entries()) {
        const result = await prisma.topic.updateMany({
            where: {
                name: topicName,
                sheetId: patternSheet.id
            },
            data: {
                order: index
            }
        });

        if (result.count > 0) {
            console.log(`  ✅ [${index}] ${topicName} sorted (Updated ${result.count} record(s))`);
        } else {
            console.warn(`  ⚠️ [${index}] ${topicName} NOT FOUND in Pattern Wise Sheet`);
        }
    }

    console.log('🏁 Topic reordering complete!');
}

main()
    .catch((e) => {
        console.error('❌ Error sorting topics:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
