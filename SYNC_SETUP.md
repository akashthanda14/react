# Database Sync Setup Complete! 🎉

## What Was Created

### 1. **Production Sync Scripts** (`scripts/`)
- ✅ `sync-to-prod.sh` - Complete sync (schema + data)
- ✅ `migrate-prod.sh` - Deploy migrations only
- ✅ `seed-prod.sh` - Seed data only  
- ✅ `studio-prod.sh` - Open Prisma Studio for production

### 2. **NPM Commands** (added to `package.json`)
```json
"prod:sync": "bash scripts/sync-to-prod.sh",      // Full sync
"prod:migrate": "bash scripts/migrate-prod.sh",   // Migrations only
"prod:seed": "bash scripts/seed-prod.sh",         // Seed only
"prod:studio": "bash scripts/studio-prod.sh"      // View prod data
```

### 3. **Documentation**
- ✅ `docs/DATABASE_SYNC.md` - Complete guide with workflows
- ✅ `docs/DB_COMMANDS.md` - Quick reference card

## How It Works

Your `.env` file should have:
```env
DOCKER_DATABASE_URL="postgresql://..."  # Dev (Docker)
DATABASE_URL="postgresql://..."         # Production
```

The `schema.prisma` uses `DOCKER_DATABASE_URL` by default:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DOCKER_DATABASE_URL")
}
```

**Production scripts override this at runtime** by setting `DATABASE_URL` environment variable, so you maintain **one schema file** for both environments.

## Quick Start - Sync to Production

### Option 1: Full Sync (Recommended)
```bash
npm run prod:sync
```
This will:
1. Deploy schema migrations
2. Seed main data (sheets, topics, problems, companies)
3. Seed Last Minute 100 sheet
4. Verify completion

### Option 2: Step by Step
```bash
# 1. Deploy schema
npm run prod:migrate

# 2. Seed data
npm run prod:seed

# 3. Verify
npm run prod:studio
```

## Safety Features

✅ **Confirmation prompts** - All scripts ask for confirmation before modifying production
✅ **Idempotent seeds** - Safe to run multiple times (won't duplicate data)
✅ **Clear logging** - See exactly what's happening at each step
✅ **No schema duplication** - One schema file, runtime environment switching

## What Gets Synced

When you run `npm run prod:seed`, it will seed:

### From `prisma/seed.ts`:
- 📊 All sheets (DSA topics)
- 📁 All topics and subtopics
- 📝 All problems with:
  - LeetCode/GFG URLs
  - Difficulty levels
  - Company tags with logos
- 🏢 Company tags with logos

### From `prisma/seed-lastminute.ts`:
- 📋 "Last Minute 100" sheet
- 💯 100 curated problems across all topics
- 🏢 Company associations

## Next Steps

1. **Verify your `.env` has both database URLs**
2. **Run the sync:**
   ```bash
   npm run prod:sync
   ```
3. **Verify in Prisma Studio:**
   ```bash
   npm run prod:studio
   ```

## Troubleshooting

If you encounter issues, see `docs/DATABASE_SYNC.md` for:
- Migration conflicts
- Connection issues
- Seed failures
- Manual override commands

## Development Workflow

**Making changes in dev:**
```bash
# 1. Make schema changes
# 2. Create migration
npm run db:migrate

# 3. Test in dev
npm run dev

# 4. When ready, sync to production
npm run prod:sync
```

---

📚 **Full Documentation:** `docs/DATABASE_SYNC.md`  
⚡ **Quick Reference:** `docs/DB_COMMANDS.md`
