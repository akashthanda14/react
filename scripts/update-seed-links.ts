import fs from 'fs';
import path from 'path';

// Read seed.ts
const seedPath = path.join(process.cwd(), 'prisma/seed.ts');
let content = fs.readFileSync(seedPath, 'utf-8');

// Replace old 'link' field with 'leetcodeUrl' and 'gfgUrl'
// Pattern: link: 'https://leetcode.com/...'
const linkRegex = /,\s*link:\s*'(https:\/\/leetcode\.com[^']+)'/g;

let updatedContent = content.replace(linkRegex, (_match, url) => {
    return `, leetcodeUrl: '${url}', gfgUrl: ''`;
});

// Also handle any remaining link fields that might be GFG
const gfgLinkRegex = /,\s*link:\s*'(https:\/\/[^']*geeksforgeeks[^']+)'/g;
updatedContent = updatedContent.replace(gfgLinkRegex, (_match, url) => {
    return `, leetcodeUrl: '', gfgUrl: '${url}'`;
});

fs.writeFileSync(seedPath, updatedContent);
console.log('✅ Replaced all "link" fields with "leetcodeUrl" and "gfgUrl"!');
