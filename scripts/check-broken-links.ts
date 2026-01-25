#!/usr/bin/env tsx

/**
 * Standalone script to check for broken links and export results
 * Usage: npm run check-links
 */

import { PrismaClient } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface LinkCheckResult {
    url: string;
    status: 'valid' | 'broken' | 'error';
    statusCode?: number;
    error?: string;
    problemTitle: string;
    problemId: string;
    platform: string;
    difficulty: string;
}

async function checkLink(url: string, timeout = 10000): Promise<Omit<LinkCheckResult, 'problemTitle' | 'problemId' | 'platform' | 'difficulty'>> {
    try {
        const response = await axios.head(url, {
            timeout,
            maxRedirects: 5,
            validateStatus: (status) => status < 500,
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        });

        if (response.status >= 200 && response.status < 400) {
            return { url, status: 'valid', statusCode: response.status };
        } else {
            return { url, status: 'broken', statusCode: response.status, error: `HTTP ${response.status}` };
        }
    } catch (error) {
        const axiosError = error as AxiosError;

        // Try GET request if HEAD fails
        if (axiosError.code === 'ERR_BAD_REQUEST' || axiosError.response?.status === 405) {
            try {
                const getResponse = await axios.get(url, {
                    timeout,
                    maxRedirects: 5,
                    validateStatus: (status) => status < 500,
                    headers: {
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    },
                });

                if (getResponse.status >= 200 && getResponse.status < 400) {
                    return { url, status: 'valid', statusCode: getResponse.status };
                }
            } catch (getError) {
                // Continue to error handling below
            }
        }

        return {
            url,
            status: 'error',
            statusCode: axiosError.response?.status,
            error: axiosError.message || 'Unknown error',
        };
    }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
    console.log('🔍 Starting link validation check...\n');

    try {
        await prisma.$connect();

        const problems = await prisma.problem.findMany({
            where: {
                OR: [
                    { leetcodeUrl: { not: null } },
                    { gfgUrl: { not: null } },
                ],
            },
            select: {
                id: true,
                title: true,
                leetcodeUrl: true,
                gfgUrl: true,
                difficulty: true,
            },
        });

        console.log(`📊 Found ${problems.length} problems with URLs\n`);

        const allResults: LinkCheckResult[] = [];
        const brokenLinks: LinkCheckResult[] = [];
        let checkedCount = 0;

        for (const problem of problems) {
            // Check LeetCode URL
            if (problem.leetcodeUrl) {
                checkedCount++;
                process.stdout.write(`\r[${checkedCount}/${problems.length * 2}] Checking: ${problem.title.substring(0, 40)}...`);

                const result = await checkLink(problem.leetcodeUrl);
                const enrichedResult: LinkCheckResult = {
                    ...result,
                    problemTitle: problem.title,
                    problemId: problem.id,
                    platform: 'LeetCode',
                    difficulty: problem.difficulty,
                };
                allResults.push(enrichedResult);
                if (result.status !== 'valid') {
                    brokenLinks.push(enrichedResult);
                }
                await delay(1000);
            }

            // Check GFG URL
            if (problem.gfgUrl) {
                checkedCount++;
                process.stdout.write(`\r[${checkedCount}/${problems.length * 2}] Checking: ${problem.title.substring(0, 40)}...`);

                const result = await checkLink(problem.gfgUrl);
                const enrichedResult: LinkCheckResult = {
                    ...result,
                    problemTitle: problem.title,
                    problemId: problem.id,
                    platform: 'GeeksforGeeks',
                    difficulty: problem.difficulty,
                };
                allResults.push(enrichedResult);
                if (result.status !== 'valid') {
                    brokenLinks.push(enrichedResult);
                }
                await delay(1000);
            }
        }

        console.log('\n');
        console.log('='.repeat(80));
        console.log('📋 LINK VALIDATION REPORT');
        console.log('='.repeat(80));
        console.log(`Total Links Checked: ${allResults.length}`);
        console.log(`✅ Valid Links: ${allResults.filter((r) => r.status === 'valid').length}`);
        console.log(`❌ Broken Links: ${brokenLinks.length}`);

        const leetcodeResults = allResults.filter((r) => r.platform === 'LeetCode');
        const gfgResults = allResults.filter((r) => r.platform === 'GeeksforGeeks');

        console.log(`\nLeetCode: ${leetcodeResults.filter((r) => r.status === 'valid').length}/${leetcodeResults.length} valid`);
        console.log(`GFG: ${gfgResults.filter((r) => r.status === 'valid').length}/${gfgResults.length} valid`);
        console.log('='.repeat(80));

        if (brokenLinks.length > 0) {
            console.log('\n🔴 BROKEN LINKS:\n');
            brokenLinks.forEach((link, index) => {
                console.log(`${index + 1}. [${link.platform}] ${link.problemTitle} (${link.difficulty})`);
                console.log(`   ID: ${link.problemId}`);
                console.log(`   URL: ${link.url}`);
                console.log(`   Status: ${link.statusCode || 'N/A'}`);
                console.log(`   Error: ${link.error || 'N/A'}`);
                console.log('');
            });

            // Export broken links to JSON file
            const outputDir = path.join(process.cwd(), 'reports');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const jsonFilePath = path.join(outputDir, `broken-links-${timestamp}.json`);
            const csvFilePath = path.join(outputDir, `broken-links-${timestamp}.csv`);

            // Export as JSON
            fs.writeFileSync(jsonFilePath, JSON.stringify(brokenLinks, null, 2));
            console.log(`\n💾 Broken links exported to: ${jsonFilePath}`);

            // Export as CSV
            const csvHeader = 'Platform,Problem Title,Difficulty,Problem ID,URL,Status Code,Error\n';
            const csvRows = brokenLinks.map(link =>
                `"${link.platform}","${link.problemTitle}","${link.difficulty}","${link.problemId}","${link.url}","${link.statusCode || 'N/A'}","${link.error || 'N/A'}"`
            ).join('\n');
            fs.writeFileSync(csvFilePath, csvHeader + csvRows);
            console.log(`💾 Broken links exported to: ${csvFilePath}`);

            // Export summary report
            const summaryPath = path.join(outputDir, `link-check-summary-${timestamp}.txt`);
            const summaryContent = `
LINK VALIDATION SUMMARY REPORT
Generated: ${new Date().toISOString()}
${'='.repeat(80)}

Total Links Checked: ${allResults.length}
Valid Links: ${allResults.filter((r) => r.status === 'valid').length}
Broken Links: ${brokenLinks.length}

Platform Breakdown:
- LeetCode: ${leetcodeResults.filter((r) => r.status === 'valid').length}/${leetcodeResults.length} valid
- GeeksforGeeks: ${gfgResults.filter((r) => r.status === 'valid').length}/${gfgResults.length} valid

Broken Links by Platform:
${Object.entries(
                brokenLinks.reduce((acc, link) => {
                    acc[link.platform] = (acc[link.platform] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>)
            ).map(([platform, count]) => `- ${platform}: ${count}`).join('\n')}

Broken Links by Difficulty:
${Object.entries(
                brokenLinks.reduce((acc, link) => {
                    acc[link.difficulty] = (acc[link.difficulty] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>)
            ).map(([difficulty, count]) => `- ${difficulty}: ${count}`).join('\n')}

${'='.repeat(80)}

DETAILED BROKEN LINKS:

${brokenLinks.map((link, index) => `
${index + 1}. [${link.platform}] ${link.problemTitle} (${link.difficulty})
   ID: ${link.problemId}
   URL: ${link.url}
   Status: ${link.statusCode || 'N/A'}
   Error: ${link.error || 'N/A'}
`).join('\n')}
`;
            fs.writeFileSync(summaryPath, summaryContent);
            console.log(`💾 Summary report exported to: ${summaryPath}\n`);
        } else {
            console.log('\n✨ All links are valid! No broken links found.\n');
        }

    } catch (error) {
        console.error('❌ Error during link validation:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
