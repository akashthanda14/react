# Database Sync Guide: Docker (Dev) → Production

This guide explains how to sync your database schema and data from Docker (development) to Production.

## Prerequisites

Make sure your `.env` file contains both database URLs:

```env
# Development (Docker)
DOCKER_DATABASE_URL="postgresql://user:password@localhost:5432/dev_db"

# Production
DATABASE_URL="postgresql://user:password@production-host:5432/prod_db"
```

## Quick Sync (Recommended)

To sync everything (schema + data) from dev to production in one command:

```bash
npm run prod:sync
```

This will:
1. ✅ Generate Prisma Client
2. ✅ Deploy migrations to production
3. ✅ Seed main data (sheets, topics, problems)
4. ✅ Seed Last Minute 100 sheet
5. ✅ Verify sync completion

## Individual Operations

### 1. Deploy Schema Migrations Only

To only deploy schema changes to production:

```bash
npm run prod:migrate
```

This runs all pending migrations on the production database.

### 2. Seed Production Data Only

To only seed data (without schema changes):

```bash
npm run prod:seed
```

This will:
- Run `prisma/seed.ts` (main seed with sheets, topics, problems, company logos)
- Run `prisma/seed-lastminute.ts` (Last Minute 100 sheet)

### 3. View Production Data

To open Prisma Studio connected to production:

```bash
npm run prod:studio
```

This lets you view and manage production data in a GUI.

## Workflow Examples

### Scenario 1: First Time Production Setup

```bash
# 1. Deploy schema
npm run prod:migrate

# 2. Seed data
npm run prod:seed

# 3. Verify in Prisma Studio
npm run prod:studio
```

### Scenario 2: Schema Changed in Dev

```bash
# 1. Create migration in dev first
npm run db:migrate

# 2. Deploy to production
npm run prod:migrate
```

### Scenario 3: New Seed Data Added

```bash
# Just run the seed
npm run prod:seed
```

### Scenario 4: Complete Sync

```bash
# One command does it all
npm run prod:sync
```

## Important Notes

⚠️ **Safety Warnings:**
- All production scripts require confirmation before executing
- Always backup production data before running sync
- Test migrations in dev/staging first
- Seeds are idempotent (safe to run multiple times)

📝 **How It Works:**
- Your `schema.prisma` uses `DOCKER_DATABASE_URL` by default
- Production scripts override this with `DATABASE_URL` at runtime
- No need for separate schema files - easier to maintain!

🔍 **Verification:**
- After sync, check Prisma Studio: `npm run prod:studio`
- Verify all sheets, problems, and company logos are present
- Check that Last Minute 100 sheet exists with all 100 problems

## Troubleshooting

### Migration Conflicts

If you get migration conflicts:

```bash
# Reset production (⚠️ DESTRUCTIVE!)
DATABASE_URL=$DATABASE_URL npx prisma migrate reset

# Then sync again
npm run prod:sync
```

### Connection Issues

Verify your production DATABASE_URL:
- Check connection string format
- Ensure database exists
- Verify network access/firewall rules
- Test connection: `DATABASE_URL=$DATABASE_URL npx prisma db pull`

### Seed Failures

If seeding fails:
- Check if data already exists (seeds are idempotent)
- Verify schema is up to date: `npm run prod:migrate`
- Check seed script logs for specific errors

## Manual Override

If you need to run any Prisma command against production manually:

```bash
# Example: Push schema without migration
DATABASE_URL=$DATABASE_URL npx prisma db push

# Example: Pull current schema
DATABASE_URL=$DATABASE_URL npx prisma db pull

# Example: Reset database (⚠️ DESTRUCTIVE!)
DATABASE_URL=$DATABASE_URL npx prisma migrate reset
```

## Files Reference

- `scripts/sync-to-prod.sh` - Complete sync script
- `scripts/migrate-prod.sh` - Migration deployment only
- `scripts/seed-prod.sh` - Seeding only
- `scripts/studio-prod.sh` - Prisma Studio for production
- `prisma/seed.ts` - Main seed file
- `prisma/seed-lastminute.ts` - Last Minute 100 sheet seed
- `prisma/schema.prisma` - Single source of truth for schema
